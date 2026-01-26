"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ShieldCheck, BadgeCheck } from "lucide-react";

/* ───────────────── Types ───────────────── */

type Badge = {
  id: string;
  label: string;
  description: string;
  tier: string;
};

type FairScaleResponse = {
  wallet: string;
  fairscore: number;
  tier: string;
  badges: Badge[];
  breakdown?: {
    base: number;
    social: number;
  };
  timestamp?: string;
  demo?: boolean;
};

/* ───────────────── Page ───────────────── */

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();

  const [data, setData] = useState<FairScaleResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connected || !publicKey) return;

    const fetchScore = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/fairscale?wallet=${publicKey.toBase58()}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch FairScale data");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError("Could not load FairScale data");
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [connected, publicKey]);

  /* ───────────────── States ───────────────── */

  if (!connected) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-400">
        Connect your wallet to view your FairScale dashboard
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-400">
        Fetching your reputation…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-red-400">
        {error}
      </div>
    );
  }

  /* ───────────────── UI ───────────────── */

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-white">
            FairScale Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Your on-chain reputation overview
          </p>
        </div>

        {/* Core Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="FairScore" value={data.fairscore.toFixed(1)} />
          <Stat label="Tier" value={data.tier.toUpperCase()} />
          <Stat
            label="Wallet"
            value={`${data.wallet.slice(0, 6)}…${data.wallet.slice(-4)}`}
          />
        </div>

        {/* Score Breakdown */}
        {data.breakdown && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <p className="mb-4 text-sm font-medium text-white">
              Score Breakdown
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Stat label="Base Score" value={data.breakdown.base} />
              <Stat label="Social Score" value={data.breakdown.social} />
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
            <ShieldCheck size={16} />
            Badges
          </div>

          {data.badges.length === 0 ? (
            <p className="text-sm text-slate-400">
              No badges earned yet
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {data.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="rounded-lg border border-slate-700 bg-slate-800/40 p-4"
                >
                  <div className="flex items-center gap-2">
                    <BadgeCheck
                      size={14}
                      className="text-emerald-400"
                    />
                    <p className="text-sm font-medium text-white">
                      {badge.label}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Meta */}
        {data.timestamp && (
          <p className="text-xs text-slate-500">
            Last updated:{" "}
            {new Date(data.timestamp).toLocaleString()}
            {data.demo && " · demo mode"}
          </p>
        )}
      </div>
    </main>
  );
}

/* ───────────────── Helper ───────────────── */

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}
