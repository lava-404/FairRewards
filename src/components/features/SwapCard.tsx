"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRightLeft } from "lucide-react";
import {
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  Connection,
  TransactionMessage,
  VersionedTransaction,
  Transaction,
} from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { CURRENT_NETWORK, getNetworkTokens } from "@/config/FairRewards";
import { useTransactionToast } from "../use-transaction-toast";
import {createTransaction} from "@/hooks/useRequestAirdrop"

type TxState =
  | "idle"
  | "quoting"
  | "swapping"
  | "confirming"
  | "success"
  | "error";

type Quote = {
  rate: number;
  usdcAmount: number;
};

const tokens = getNetworkTokens()

export const USDC_CONFIG = {
  symbol: tokens.USDC.symbol,
  mintAddress: tokens.USDC.mint,
  decimals: tokens.USDC.decimals,

  // this must be your pool’s real USDC token account
  poolWallet:
  process.env.NEXT_PUBLIC_USDC_POOL_WALLET || '',

}

export function SwapCard({ multiplier }: { multiplier: number }) {
  const [mounted, setMounted] = useState(false);
  const [solAmount, setSolAmount] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [txState, setTxState] = useState<TxState>("idle");
  const [error, setError] = useState<string | null>(null);
  const transactionToast = useTransactionToast()
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const baseCashback = 0.01;
  const cashback = (baseCashback * multiplier).toFixed(3);

  // ─── hydration guard ─────────────────────────
  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Fetch SOL → USDC quote ──────────────────
  const fetchQuote = useCallback(async (amount: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      setQuote(null);
      return;
    }

    try {
      setTxState("quoting");

      const res = await fetch("/api/swap");
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to fetch price");
      }

      const sol = parseFloat(amount);

      setQuote({
        rate: data.solPrice,
        usdcAmount: sol * data.solPrice,
      });

      setTxState("idle");
    } catch {
      setQuote(null);
      setTxState("error");
      setError("Failed to fetch price");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => fetchQuote(solAmount), 400);
    return () => clearTimeout(t);
  }, [solAmount, fetchQuote, mounted]);

  // ─── Execute swap ────────────────────────────
  const handleSwap = async () => {
    if (!mounted || !publicKey || !quote || !solAmount) return;
  
    try {
      setTxState("swapping");
      setError(null);
  
      // ❗ IMPORTANT: destination should come from backend in prod
      const poolSolWalletStr = new PublicKey(USDC_CONFIG.poolWallet)
      if (!poolSolWalletStr) {
        throw new Error("Pool wallet not configured");
      }
  
      const poolSolWallet = new PublicKey(poolSolWalletStr);
  
      const lamports = Math.floor(
        parseFloat(solAmount) * LAMPORTS_PER_SOL
      );
  
      /*// 1️⃣ Create SOL transfer instruction (SAME AS WORKING CODE)
      const ix = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: poolSolWallet,
        lamports,
      });
  
      // 2️⃣ Build *plain* legacy transaction (NO v0 / message)
      const tx = new Transaction().add(ix);
      tx.feePayer = publicKey;
  
      const latestBlockhash = await connection.getLatestBlockhash();
      tx.recentBlockhash = latestBlockhash.blockhash;
  
      // 3️⃣ Wallet signs & sends (THIS is the magic)
      const signature = await sendTransaction(tx, connection);
  
      setTxState("confirming");
  
      await connection.confirmTransaction(
        {
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed"
      ); */

      // 1️⃣ Build transaction using helper
      const { transaction, latestBlockhash } = await createTransaction({
        publicKey,
        destination: poolSolWallet,
        amount: parseFloat(solAmount),
        connection,
      });

      // 2️⃣ Wallet signs & sends (VersionedTransaction)
      const signature = await sendTransaction(transaction, connection);

      setTxState("confirming");

      // 3️⃣ Confirm
      await connection.confirmTransaction(
        {
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed"
      );

  
      // 4️⃣ Backend releases USDC (+ reward)
      const res = await fetch("/api/swap/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userWallet: publicKey.toString(),
          solAmount: parseFloat(solAmount),
          solTxSignature: signature,
        }),
      });
  
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Swap failed");
      }
  
      setTxState("success");
      transactionToast(data.signature)
      setSolAmount("");
      setQuote(null);
    } catch (err) {
      setTxState("error");
      setError(err instanceof Error ? err.message : "Swap failed");
    }
  };
  
  if (!mounted) return null;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-strong bg-card-background p-4 sm:p-6 backdrop-blur-sm transition hover:border-slate-700">
      <div className="relative space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
            <ArrowRightLeft size={16} />
            Swap SOL → USDC
          </h3>

          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            FairScore Boosted
          </span>
        </div>

        {/* Swap UI */}
        <div className="space-y-3">
          {/* SOL INPUT */}
          <div className="flex items-end justify-between rounded-xl border border-border-low bg-slate-900/60 p-4">
            <input
              value={solAmount}
              onChange={(e) => setSolAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl font-semibold outline-none placeholder:text-muted"
            />
            <div className="ml-3 rounded-lg bg-slate-800/60 px-3 py-1.5 text-sm font-medium text-white">
              SOL
            </div>
          </div>

          {/* USDC OUTPUT */}
          <div className="flex items-end justify-between rounded-xl border border-border-low bg-slate-900/60 p-4">
            <input
              readOnly
              value={quote ? quote.usdcAmount.toFixed(4) : ""}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl font-semibold outline-none placeholder:text-muted"
            />
            <div className="ml-3 rounded-lg bg-slate-800/60 px-3 py-1.5 text-sm font-medium text-white">
              USDC
            </div>
          </div>
        </div>

        {/* Cashback */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <p className="text-xs text-slate-400">Estimated cashback (USDC)</p>
          <p className="text-lg font-bold text-emerald-400">
            +{cashback} USDC
          </p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Action */}
        <button
          onClick={handleSwap}
          disabled={!quote || txState !== "idle"}
          className="w-full rounded-xl bg-emerald-500/10 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50"
        >
          {txState === "quoting"
            ? "Fetching price…"
            : txState === "swapping"
            ? "Sign SOL transaction…"
            : txState === "confirming"
            ? "Confirming…"
            : "Swap SOL → USDC"}
        </button>
      </div>
    </div>
  );
}


