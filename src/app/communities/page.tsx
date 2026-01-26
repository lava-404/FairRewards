"use client";

import { ArrowRight, ShieldCheck, Users, Crown, Sparkles, LucideIcon } from "lucide-react";
import { useState } from "react";

export default function CommunitiesPage() {
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(25,25,25) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(25,25,25) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            WebkitMaskImage:
              "radial-gradient(ellipse 100% 100% at 50% 50%, #000 0%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 100% 100% at 50% 50%, #000 0%, transparent 80%)",
          }}
        />
      </div>

      {/* HERO */}
      <section className="relative z-10 px-4 sm:px-6 pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 sm:px-4 py-1.5 backdrop-blur-xl animate-fade-in">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-medium text-gray-400 tracking-wide">
              Reputation-Powered Access
            </span>
          </div>

          <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-[1.15] tracking-tight animate-fade-in-up">
            <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
              Reputation-powered
            </span>
            <br />
            <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
              communities
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 px-4 font-light max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: "0.1s"}}>
            FairScale unlocks private, high-signal communities using your
            on-chain reputation. No invites. No paywalls. Just earned access.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            <button className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 sm:px-8 py-3 text-sm font-medium text-black transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">View your access</span>
              <ArrowRight
                size={16}
                className="relative group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>

            <button className="w-full sm:w-auto group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-6 sm:px-8 py-3 text-sm font-medium text-gray-300 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.02] active:scale-[0.98]">
              <span className="relative">Learn how FairScore works</span>
            </button>
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-10 sm:mb-14 md:mb-16">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-600 mb-3 font-medium">
              Your Gateway
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white mb-3 sm:mb-4">
              Rooms, not groups
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              Each room is gated by reputation — not money or clout.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <RoomCard
              title="Explorer"
              description="Open discussions, learning, discovery."
              level="Bronze"
              accent="amber"
              image="/explorer.png"
              hoveredRoom={hoveredRoom}
              setHoveredRoom={setHoveredRoom}
              index={0}
            />
            <RoomCard
              title="Builder"
              description="Shipping, feedback, collaboration."
              level="Silver"
              accent="slate"
              image="/builder.png"
              hoveredRoom={hoveredRoom}
              setHoveredRoom={setHoveredRoom}
              index={1}
            />
            <RoomCard
              title="Trusted"
              description="High-signal conversations and early access."
              level="Gold"
              accent="yellow"
              image="/trusted.png"
              hoveredRoom={hoveredRoom}
              setHoveredRoom={setHoveredRoom}
              index={2}
            />
            <RoomCard
              title="Core"
              description="Governance, vision, long-term influence."
              level="Diamond"
              accent="cyan"
              image="/core.png"
              hoveredRoom={hoveredRoom}
              setHoveredRoom={setHoveredRoom}
              index={3}
            />
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-10 sm:mb-14 text-center mx-auto">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-600 mb-3 font-medium">
              Benefits
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white mb-3 sm:mb-4">
              Reputation earns real advantages
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              FairScore directly affects what you unlock and earn.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <PerkCard
              icon={Sparkles}
              title="Boosted allocations"
              description="Higher FairScore increases drops, rewards, and perks."
              delay="0s"
            />
            <PerkCard
              icon={ShieldCheck}
              title="Access-based privileges"
              description="Private rooms, gated tools, early product access."
              delay="0.1s"
            />
            <PerkCard
              icon={Crown}
              title="Governance influence"
              description="Top tiers help shape protocol decisions and rules."
              delay="0.2s"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 sm:p-10 md:p-14 backdrop-blur-xl text-center transition-all hover:border-white/20 hover:shadow-[0_0_80px_rgba(255,255,255,0.05)]">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-l-2 border-white/20 rounded-tl-3xl transition-all group-hover:w-20 group-hover:h-20 sm:group-hover:w-24 sm:group-hover:h-24" />
            <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-r-2 border-white/20 rounded-br-3xl transition-all group-hover:w-20 group-hover:h-20 sm:group-hover:w-24 sm:group-hover:h-24" />
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 sm:mb-5 leading-tight">
              Your reputation already exists
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-400 font-light leading-relaxed mb-7 sm:mb-9">
              FairScale simply measures it. Connect your wallet and see what
              access you've already earned.
            </p>

            <button className="group/btn relative inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 sm:px-8 py-3 text-sm font-medium hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative">Enter FairScale</span>
              <ArrowRight
                size={16}
                className="relative group-hover/btn:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </section>

      <div className="h-20 sm:h-32" />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.08); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 10s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

/* ---------- Components ---------- */

type AccentColor = "amber" | "slate" | "yellow" | "cyan";

interface RoomCardProps {
  title: string;
  description: string;
  level: string;
  accent: AccentColor;
  image: string;
  hoveredRoom: number | null;
  setHoveredRoom: (index: number | null) => void;
  index: number;
}

function RoomCard({ 
  title, 
  description, 
  level, 
  accent, 
  image, 
  hoveredRoom, 
  setHoveredRoom, 
  index 
}: RoomCardProps) {
  const ACCENT_COLORS: Record<AccentColor, {
    glow: string;
    border: string;
    text: string;
  }> = {
    amber: {
      glow: "bg-amber-400",
      border: "group-hover:border-amber-500/30",
      text: "group-hover:text-amber-400"
    },
    slate: {
      glow: "bg-slate-400",
      border: "group-hover:border-slate-500/30",
      text: "group-hover:text-slate-400"
    },
    yellow: {
      glow: "bg-yellow-400",
      border: "group-hover:border-yellow-500/30",
      text: "group-hover:text-yellow-400"
    },
    cyan: {
      glow: "bg-cyan-400",
      border: "group-hover:border-cyan-500/30",
      text: "group-hover:text-cyan-400"
    },
  };

  const isHovered = hoveredRoom === index;
  const colors = ACCENT_COLORS[accent];

  return (
    <div
      onMouseEnter={() => setHoveredRoom(index)}
      onMouseLeave={() => setHoveredRoom(null)}
      className="group relative"
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl ${colors.glow} blur-2xl transition-opacity duration-500 ${
          isHovered ? "opacity-20" : "opacity-0"
        }`}
      />

      <div className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-xl transition-all duration-500 ${
        isHovered ? `${colors.border} translate-y-[-6px] shadow-[0_20px_60px_rgba(0,0,0,0.4)]` : "border-white/5"
      }`}>
        {/* Image with overlay */}
        <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={`${title} room`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-70" : "opacity-50"
          }`} />
          
          {/* Tier badge on image */}
          <div className="absolute top-3 right-3">
            <div className={`rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 transition-all duration-500 ${
              isHovered ? "bg-white/10" : ""
            }`}>
              <p className={`text-[10px] uppercase tracking-wider transition-colors duration-500 ${
                isHovered ? colors.text : "text-gray-400"
              }`}>
                {level}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 className={`text-lg sm:text-xl font-light mb-2 transition-colors duration-500 ${
            isHovered ? "text-white" : "text-gray-200"
          }`}>
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
            {description}
          </p>

          {/* Animated underline */}
          <div className={`mt-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`} />
        </div>
      </div>
    </div>
  );
}

interface PerkCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: string;
}

function PerkCard({ icon: Icon, title, description, delay }: PerkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative animate-fade-in-up"
      style={{animationDelay: delay}}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl bg-white/5 blur-xl transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className={`relative rounded-2xl border bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 ${
        isHovered ? "border-white/20 translate-y-[-4px]" : "border-white/5"
      }`}>
        <div className={`mb-4 sm:mb-5 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 ${
          isHovered ? "scale-110 bg-white/10 border-white/20" : ""
        }`}>
          <Icon size={20} className="text-gray-300" />
        </div>

        <h3 className={`text-base sm:text-lg font-light mb-2 transition-colors duration-500 ${
          isHovered ? "text-white" : "text-gray-200"
        }`}>
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}