import { useRequestAirdrop } from "@/hooks/useRequestAirdrop";
import { Gift, Sparkles } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react"; 
import { useEffect, useState } from "react";

export function AirdropRewardCard({
  multiplier,
}: {
  multiplier: number;
}) {
  const baseReward = 0.02;
  const requestAirdrop = useRequestAirdrop();
  const [mounted, setMounted] = useState(false);
  const { publicKey, connected } = useWallet();
  const [ claiming, setClaiming ] = useState(false);
  const [ claimed, setClaimed ] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAirdrop = () => {
    if (!publicKey || claiming || claimed) return;

    setClaiming(true);

    requestAirdrop.mutate(
      {
        to: publicKey,
        amount: 1 + baseReward,
      },
      {
        onSuccess: () => {
          setClaimed(true);
        },
        onSettled: () => {
          setClaiming(false);
        },
      }
    );
  };

  if (!mounted) return null;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-strong bg-card-background p-4 sm:p-6 backdrop-blur-sm transition hover:border-slate-700">
      <div className="absolute bottom-0 left-0 h-32 w-32 sm:h-40 sm:w-40 bg-amber-500/10 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity" />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
            <Gift size={16} />
            Community Airdrop
          </h3>

          <span className="w-fit rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
            Reputation Based
          </span>
        </div>

        {/* Reward */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
          <p className="text-xs text-slate-400">Rewards: <span className="font-bold">1 SOL</span></p>
          <p className="text-lg sm:text-xl font-bold text-amber-400">
            +{baseReward} SOL
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Higher FairScore → higher reward
          </p>
        </div>

        {/* NFT Access Info */}
        <div className="flex gap-3 rounded-xl border border-strong bg-slate-900/40 px-4 py-3">
          <Sparkles
            size={16}
            className="mt-0.5 shrink-0 text-slate-400"
          />
          <p className="text-xs leading-relaxed text-slate-400">
            Wallets with higher FairScores receive{" "}
            <span className="font-medium text-white">
              priority access to NFT airdrops
            </span>{" "}
            and higher mint allocations.
          </p>
        </div>

        {/* Action */}
        <button
          onClick={handleAirdrop}
          disabled={!connected || claiming || claimed}
          className={`
            w-full rounded-xl py-3 text-sm font-semibold transition
            ${
              claimed
                ? "bg-emerald-500/10 text-emerald-400 cursor-not-allowed"
                : claiming
                ? "bg-amber-500/10 text-amber-300 cursor-wait"
                : connected
                ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                : "bg-slate-800/40 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          {!connected
            ? "Connect Wallet to Claim"
            : claimed
            ? "Reward Claimed ✓"
            : claiming
            ? "Claiming Reward…"
            : "Claim Airdrop"}
        </button>

      </div>
    </div>
  );
}
