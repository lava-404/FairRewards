"use client";

import { MessageCircle, ArrowRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock getTier function for demo
const getTier = (score: number) => {
  if (score >= 800) return { level: "diamond" as const, stage: "Diamond" };
  if (score >= 600) return { level: "gold" as const, stage: "Gold" };
  if (score >= 400) return { level: "silver" as const, stage: "Silver" };
  return { level: "bronze" as const, stage: "Bronze" };
};

export function ChatRoomCard({
  score = 650,
}: {
  score: number;
}) {
  const router = useRouter();
  const tier = getTier(score);

  const COLOR_STYLES: Record<
    "bronze" | "silver" | "gold" | "diamond",
    { glow: string; soft: string; text: string; border: string; accent: string }
  > = {
    bronze: {
      glow: "bg-amber-500/10",
      soft: "bg-amber-500/5",
      text: "text-amber-400",
      border: "border-amber-500/20",
      accent: "bg-amber-500/10",
    },
    silver: {
      glow: "bg-slate-400/10",
      soft: "bg-slate-400/5",
      text: "text-slate-300",
      border: "border-slate-400/20",
      accent: "bg-slate-400/10",
    },
    gold: {
      glow: "bg-yellow-400/10",
      soft: "bg-yellow-400/5",
      text: "text-yellow-300",
      border: "border-yellow-400/20",
      accent: "bg-yellow-400/10",
    },
    diamond: {
      glow: "bg-cyan-400/10",
      soft: "bg-cyan-400/5",
      text: "text-cyan-300",
      border: "border-cyan-400/20",
      accent: "bg-cyan-400/10",
    },
  };

  const colors = COLOR_STYLES[tier.level];

  return (
    <div
      onClick={() => router.push("/chats")}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-strong bg-card-background p-4 sm:p-6 backdrop-blur-sm transition hover:border-slate-700"
    >
      {/* ambient glow */}
      <div
        className={`pointer-events-none absolute bottom-0 left-0 h-32 w-32 sm:h-40 sm:w-40 blur-3xl opacity-0 transition-opacity group-hover:opacity-30 ${colors.glow}`}
      />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
            <MessageCircle size={16} />
            FairRewards Chat
          </h3>

          <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${colors.accent} ${colors.text}`}>
            {tier.level.toUpperCase()} tier access
          </span>
        </div>

        {/* Main CTA */}
        <div
          className={`rounded-xl border px-4 py-3 ${colors.border} ${colors.soft}`}
        >
          <p className="text-xs text-slate-400">Your access</p>
          <p className="text-lg sm:text-xl font-bold text-white">
            {tier.stage} Room
          </p>
          <p className="mt-1 text-xs text-slate-500">
            High-signal discussions matched to your reputation
          </p>
        </div>

        {/* Room Info */}
        <div className="flex gap-3 rounded-xl border border-strong bg-slate-900/40 px-4 py-3">
          <Users
            size={16}
            className="mt-0.5 shrink-0 text-slate-400"
          />
          <p className="text-xs leading-relaxed text-slate-400">
            Connect with members of similar reputation for{" "}
            <span className="font-medium text-white">
              quality conversations
            </span>{" "}
            and collaborative discussions.
          </p>
        </div>

        {/* Action */}
        <button
          className={`
            w-full rounded-xl py-3 text-sm font-semibold transition flex items-center justify-center gap-2
            ${colors.accent} ${colors.text} hover:opacity-80
          `}
        >
          Enter Room
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// Demo
export default function Demo() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-md">
        <ChatRoomCard score={650} />
      </div>
    </div>
  );
}