"use client";

import { useEffect, useState } from "react";
import { Wallet, Coins } from "lucide-react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { getNetworkTokens, CURRENT_NETWORK } from "@/config/fairroom";

const { USDC } = getNetworkTokens();

export function BalanceCard() {
  const { publicKey, connected } = useWallet();

  const [mounted, setMounted] = useState(false);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // ─── prevent hydration mismatch ───────────────────────────
  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── fetch balances ───────────────────────────────────────
  useEffect(() => {
    if (!mounted || !connected || !publicKey) return;

    const fetchBalances = async () => {
      try {
        setLoading(true);

        const connection = new Connection(
          CURRENT_NETWORK.rpcEndpoint,
          "confirmed"
        );

        // ─── SOL balance ─────────────────────────
        const solLamports = await connection.getBalance(publicKey);
        setSolBalance(solLamports / LAMPORTS_PER_SOL);

        // ─── USDC balance (ATA) ──────────────────
        const usdcMint = new PublicKey(USDC.mint);
        const ata = await getAssociatedTokenAddress(
          usdcMint,
          publicKey,
          true // allow PDA / smart wallets
        );

        try {
          const accountInfo =
            await connection.getTokenAccountBalance(ata);

          setUsdcBalance(
            Number(accountInfo.value.amount) /
              10 ** USDC.decimals
          );
        } catch {
          // ATA does not exist
          setUsdcBalance(0);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [mounted, connected, publicKey]);

  // Don’t render until client is ready
  if (!mounted) {
    return null;
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-strong bg-card-background p-6 backdrop-blur-sm transition hover:border-slate-700">
      {/* ambient glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 bg-emerald-500/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-30" />

      <div className="relative space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Wallet size={16} />
          Wallet Balances
        </div>

        {/* Balances */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* SOL */}
          <div className="rounded-xl border border-border-low bg-slate-900/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">SOL Balance</span>
              <Coins size={14} className="text-slate-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-white">
              {loading || solBalance === null
                ? "—"
                : solBalance.toFixed(4)}
            </p>
          </div>

          {/* USDC */}
          <div className="rounded-xl border border-border-low bg-slate-900/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">USDC Balance</span>
              <Coins size={14} className="text-slate-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-white">
              {loading || usdcBalance === null
                ? "—"
                : usdcBalance.toFixed(2)}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Balances shown are from Solana devnet
        </p>
      </div>
    </div>
  );
}
