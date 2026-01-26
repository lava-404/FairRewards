"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  TrendingUp,
  Lock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

import { AirdropRewardCard } from "@/components/features/AirdropRewarCard";
import { BalanceCard } from "@/components/features/BalanceCard";
import { SwapCard } from "@/components/features/SwapCard";
import { ChatRoomCard } from "@/components/features/ChatRoomCard";
import { getTier } from "@/lib/fairscore";

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

const TIER_STEPS = [
  { name: "Explorer", min: 0 },
  { name: "Builder", min: 500 },
  { name: "Trusted", min: 700 },
  { name: "Core", min: 850 },
];

/* ───────────────── Page ───────────────── */

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();

  const [data, setData] = useState<FairScaleResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ───────── Fetch FairScale ───────── */

  useEffect(() => {
    if (!connected || !publicKey) return;

    const fetchScore = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/fairscale?wallet=${publicKey.toBase58()}`
        );

        if (!res.ok) throw new Error("FairScale API failed");

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

  /* ───────── Guards ───────── */

  if (!connected) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Connect your wallet to view dashboard
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Fetching reputation…
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

  /* ───────── Derived values ───────── */

  const score = data.fairscore;
  const tier = getTier(score);

  const currentIndex = TIER_STEPS.findIndex(
    (t) => t.name === tier.stage
  );
  const currentStep = TIER_STEPS[currentIndex];
  const nextStep = TIER_STEPS[currentIndex + 1] ?? null;

  const progress = nextStep
    ? ((score - currentStep.min) /
        (nextStep.min - currentStep.min)) *
      100
    : 100;

  const COLOR_STYLES: Record<
    "bronze" | "silver" | "gold" | "diamond",
    { badge: string; bar: string }
  > = {
    bronze: {
      badge: "bg-amber-700/10 text-amber-500 border-amber-700/30",
      bar: "bg-amber-500",
    },
    silver: {
      badge: "bg-slate-400/10 text-slate-300 border-slate-400/30",
      bar: "bg-slate-300",
    },
    gold: {
      badge: "bg-yellow-400/10 text-yellow-300 border-yellow-400/30",
      bar: "bg-yellow-400",
    },
    diamond: {
      badge: "bg-cyan-400/10 text-cyan-300 border-cyan-400/30",
      bar: "bg-cyan-400",
    },
  };

  const colors = COLOR_STYLES[tier.level];

  /* ───────────────── Render ───────────────── */

  return (
    <main className="relative min-h-screen px-4 py-8 sm:px-6 sm:py-16">
      <div className="relative z-10 mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              FairRewards Dashboard
            </h1>
            <p className="text-sm text-gray-100">
              Your reputation shapes your access & rewards
            </p>
          </div>

          <div className={`inline-flex items-center gap-2.5 rounded-2xl px-5 py-2.5 text-sm font-semibold border ${colors.badge}`}>
            <ShieldCheck size={18} />
            {tier.level.toUpperCase()}
          </div>
        </section>

        {/* Score Card */}
        <section className="rounded-3xl border border-border-strong bg-card-background p-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase text-gray-400">Wallet</p>
              <p className="font-mono text-white">
                {`${data.wallet.slice(0, 8)}...${data.wallet.slice(-6)}`}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">FairScore</p>
              <p className="text-4xl font-bold text-white">{score}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">Multiplier</p>
              <p className="text-4xl font-bold text-white">
                {tier.multiplier}×
              </p>
            </div>
          </div>

          {nextStep && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Progress to {nextStep.name}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${colors.bar}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </section>
        <section>
          <h2 className="mb-6 text-xl font-semibold text-white flex items-center gap-2">
            Your Perks
            
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Perk
              icon={TrendingUp}
              title="Daily Points"
              value={`${10 * tier.multiplier} pts`}
              description="Earned every 24 hours"
              locked={false}
              color={tier.color}
            />
            <Perk
              icon={Sparkles}
              title="Community Drops"
              value={
                tier.multiplier > 1
                  ? "Boosted Allocation"
                  : "Standard"
              }
              description={tier.multiplier > 1 ? `${tier.multiplier}x allocation` : "Base allocation"}
              locked={false}
              color={tier.color}
            />
            <Perk
              icon={Lock}
              title="Premium Rooms"
              value={
                tier.stage === "Core"
                  ? "Full Access"
                  : "Locked"
              }
              description={tier.stage === "Core" ? "All rooms unlocked" : "Reach Core tier"}
              locked={tier.stage !== "Core"}
              color={tier.color}
            />
          </div>
        </section>
          


        {/* Actions */}
        <section className="grid gap-4 sm:grid-cols-2">
          <BalanceCard />
          <AirdropRewardCard multiplier={tier.multiplier} />
          <SwapCard multiplier={tier.multiplier} />
          <ChatRoomCard score={score} />
        </section>

        <section className="group relative overflow-hidden rounded-3xlborder border border-strong bg-card-background p-6 hover:border-slate-700 transition-all backdrop-blur-sm rounded-xl">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                Improve your tier
                <ArrowUpRight size={16} className="text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                Your FairScore improves with consistent on-chain activity and trusted behavior across Solana protocols. Build your reputation through verified transactions and community engagement.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


function Perk({
  icon: Icon,
  title,
  value,
  description,
  locked,
  color,
}: {
  icon: any;
  title: string;
  value: string;
  description: string;
  locked?: boolean;
  color: "bronze" | "silver" | "gold" | "diamond";
}) {
  const COLOR_STYLES = {
    bronze: {
      glow: "bg-amber-500",
      bgSoft: "bg-amber-500/10",
      text: "text-amber-400",
    },
    silver: {
      glow: "bg-slate-400",
      bgSoft: "bg-slate-400/10",
      text: "text-slate-300",
    },
    gold: {
      glow: "bg-yellow-400",
      bgSoft: "bg-yellow-400/10",
      text: "text-yellow-300",
    },
    diamond: {
      glow: "bg-cyan-400",
      bgSoft: "bg-cyan-400/10",
      text: "text-cyan-300",
    },
  } as const;

  const styles = COLOR_STYLES[color];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-all hover:scale-[1.02] ${
        locked
          ? "border-strong bg-slate-900/30 opacity-60"
          : "border-strong bg-card-background hover:border-slate-700 backdrop-blur-sm"
      }`}
    >
      {!locked && (
        <div
          className={`absolute top-0 right-0 w-32 h-32 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity ${styles.glow}`}
        />
      )}

      <div className="relative">
        <div
          className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${
            locked ? "bg-slate-800/50" : styles.bgSoft
          }`}
        >
          <Icon size={20} className={locked ? "text-slate-600" : "text-slate-300"} />
        </div>

        <p className="text-sm text-white mb-1">{title}</p>

        <p
          className={`text-lg font-bold mb-1 ${
            locked ? "text-slate-500" : styles.text
          }`}
        >
          {value}
        </p>

        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}
