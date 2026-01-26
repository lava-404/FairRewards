"use client";

import { ShieldCheck, Lock, TrendingUp, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-amber-500/7 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">
            About FairScale
          </p>

          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-extralight leading-[1.1] text-white mb-6">
            Access should be earned,
            <br />
            not requested.
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed font-light px-4">
            FairScale is a reputation system designed to unlock communities,
            rewards, and influence based on how you behave on-chain —
            not who you know, how much you pay, or how loud you are.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light px-4">
            Most online communities fail for the same reason:
            <br className="hidden sm:block" />
            access is either too open or artificially restricted.
          </p>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light px-4">
            FairScale introduces a middle ground —
            <span className="text-white"> reputation-gated access</span>.
            Your history, consistency, and behavior quietly determine
            what you unlock.
          </p>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light px-4">
            No applications. No moderators playing favorites.
            No paywalls pretending to equal quality.
          </p>
        </div>
      </section>

      {/* Why Reputation Gating */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-8 sm:mb-10 text-center lg:text-left">
            Why reputation-gated access works
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Reason
              icon={ShieldCheck}
              title="Trust compounds"
              text="Reputation grows through consistent behavior, making access feel natural and deserved."
            />
            <Reason
              icon={Lock}
              title="Spam stays out"
              text="Bad actors can't buy their way in. Low-effort behavior limits reach automatically."
            />
            <Reason
              icon={TrendingUp}
              title="Signal stays high"
              text="Rooms are filled with people at similar stages, intent, and momentum."
            />
            <Reason
              icon={Users}
              title="Communities self-balance"
              text="No heavy moderation needed. Reputation shapes participation organically."
            />
          </div>
        </div>
      </section>

      {/* How FairScale Measures */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-6 sm:mb-8 text-center lg:text-left">
            How FairScale does its job
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-gray-400 leading-relaxed font-light px-4 lg:px-0">
            <p>
              FairScale observes on-chain activity across supported networks
              and protocols to understand patterns —
              consistency, participation, and long-term behavior.
            </p>

            <p>
              It doesn't care about followers, clout, or hype cycles.
              It rewards reliability, contribution, and sustained presence.
            </p>

            <p>
              The result is a FairScore —
              a quiet signal that unlocks rooms, boosts rewards,
              and gradually increases influence as trust compounds.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white mb-6">
            Built for the long term
          </h3>

          <div className="space-y-6 px-4">
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              FairScale isn't about growth hacks or short-term engagement.
              It's about building spaces where people stay —
              because the quality holds.
            </p>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              If you show up consistently, behave well,
              and contribute over time,
              access unlocks itself.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Components ---------- */

function Reason({
  icon: Icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) {
  return (
    <div className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl hover:bg-white/[0.03] transition-colors duration-300">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
        <Icon size={18} className="text-gray-300" />
      </div>

      <h4 className="text-sm sm:text-base font-medium text-white mb-2">
        {title}
      </h4>

      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
        {text}
      </p>
    </div>
  );
}