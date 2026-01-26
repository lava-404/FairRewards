/**
 * Swap Completion API Route
 *
 * POST /api/swap/complete
 *
 * Secure SOL → USDC swap settlement:
 * 1. Verify SOL tx confirmation
 * 2. Verify SOL destination + amount
 * 3. Fetch SOL price
 * 4. Send USDC from pool to user ATA
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { CURRENT_NETWORK, getNetworkTokens } from '@/config/FairRewards'

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────
const { USDC } = getNetworkTokens()

const JUPITER_API = 'https://lite-api.jup.ag/swap/v1'
const SOL_MINT = 'So11111111111111111111111111111111111111112'
const JUPITER_USDC_MAINNET =
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'

const POOL_KEYPAIR_BASE64 = process.env.USDC_POOL_KEYPAIR?.trim()
const POOL_SOL_WALLET = process.env.NEXT_PUBLIC_USDC_POOL_WALLET?.trim()
const POOL_USDC_ACCOUNT = process.env.USDC_POOL_TOKEN_ACCOUNT?.trim()

if (!POOL_KEYPAIR_BASE64 || !POOL_SOL_WALLET || !POOL_USDC_ACCOUNT) {
  throw new Error('Pool environment variables missing')
}

interface CompleteSwapRequest {
  userWallet: string
  solAmount: number
  solTxSignature: string
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
async function getSOLPrice(): Promise<number> {
  const res = await fetch(
    `${JUPITER_API}/quote?inputMint=${SOL_MINT}&outputMint=${JUPITER_USDC_MAINNET}&amount=${LAMPORTS_PER_SOL}&slippageBps=50`
  )

  if (!res.ok) throw new Error('Failed to fetch price')

  const quote = await res.json()
  return Number(quote.outAmount) / 10 ** USDC.decimals
}

// ─────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { userWallet, solAmount, solTxSignature }: CompleteSwapRequest =
      await req.json()

    if (!userWallet || !solTxSignature || solAmount <= 0) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const connection = new Connection(
      CURRENT_NETWORK.rpcEndpoint,
      'confirmed'
    )

    const poolSolPubkey = new PublicKey(POOL_SOL_WALLET!)
    const poolTokenAccount = new PublicKey(POOL_USDC_ACCOUNT!)
    const userPubkey = new PublicKey(userWallet)
    const usdcMint = new PublicKey(USDC.mint)

    // ─── 1️⃣ Verify SOL tx confirmation ───────────────────────
    const status = await connection.getSignatureStatus(solTxSignature)
    if (!status.value || status.value.err) {
      return NextResponse.json(
        { error: 'SOL transaction not confirmed' },
        { status: 400 }
      )
    }

    // ─── 2️⃣ Verify SOL destination + amount ──────────────────
    const parsedTx = await connection.getParsedTransaction(
      solTxSignature,
      {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0, // fix: support v0 and legacy txs
      }
    )

    if (!parsedTx) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 400 }
      )
    }

    const expectedLamports = Math.floor(solAmount * LAMPORTS_PER_SOL)

    const validTransfer = parsedTx.transaction.message.instructions.some(
      (ix: any) =>
        ix.program === 'system' &&
        ix.parsed?.type === 'transfer' &&
        ix.parsed.info.destination === poolSolPubkey.toString() &&
        Number(ix.parsed.info.lamports) === expectedLamports
    )

    if (!validTransfer) {
      return NextResponse.json(
        { error: 'Invalid SOL transfer' },
        { status: 400 }
      )
    }

    // ─── 3️⃣ Calculate USDC output ────────────────────────────
    const solPrice = await getSOLPrice()
    const usdcAmount = solAmount * solPrice
    const usdcRaw = BigInt(
      Math.floor(usdcAmount * 10 ** USDC.decimals)
    )

    // ─── 4️⃣ Validate pool USDC token account ─────────────────
    const poolTokenInfo = await getAccount(connection, poolTokenAccount)

    if (poolTokenInfo.mint.toString() !== usdcMint.toString()) {
      return NextResponse.json(
        { error: 'Pool token account mint mismatch' },
        { status: 500 }
      )
    }

    // ─── 5️⃣ Build USDC transfer tx ───────────────────────────
    if (!POOL_KEYPAIR_BASE64) {
      throw new Error('POOL_KEYPAIR_BASE64 environment variable is not set');
    }
    const poolKeypair = Keypair.fromSecretKey(
      Buffer.from(POOL_KEYPAIR_BASE64, 'base64')
    );

    const userATA = await getAssociatedTokenAddress(
      usdcMint,
      userPubkey,
      true
    )

    const tx = new Transaction()

    // Create ATA if missing
    try {
      await getAccount(connection, userATA)
    } catch {
      tx.add(
        createAssociatedTokenAccountInstruction(
          poolKeypair.publicKey,
          userATA,
          userPubkey,
          usdcMint,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      )
    }

    // Transfer USDC
    tx.add(
      createTransferInstruction(
        poolTokenAccount,
        userATA,
        poolKeypair.publicKey,
        usdcRaw
      )
    )

    // ─── 6️⃣ Send transaction ────────────────────────────────
    const signature = await sendAndConfirmTransaction(
      connection,
      tx,
      [poolKeypair],
      { commitment: 'confirmed' }
    )

    return NextResponse.json({
      success: true,
      signature,
      solPrice,
      usdcAmount,
    })
  } catch (err) {
    console.error('Swap completion error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Swap failed' },
      { status: 500 }
    )
  }
}
