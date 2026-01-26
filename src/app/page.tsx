"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Sparkles,
  Check,
  Zap,
  Lock,
  TrendingUp,
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { usePathname, useRouter } from "next/navigation";
import WalletConnectModal from "@/components/wallet/WalletConnectModal";

/* ───────────────────────── PAGE ───────────────────────── */

export default function Home() {
  const [mounted, setMounted] = useState(false);
  


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  

  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <Spacer />

      <HowItWorks />
      <Divider />

      <About />
      <Philosophy />

      <Features />
      <CTA />
      <ClosingSpacer />
    </main>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const { connected } = useWallet();

  const [open, setOpen] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState(false);

  useEffect(() => {
    if (connected && pendingRedirect) {
      setOpen(false);
      setPendingRedirect(false);
      router.push("/dashboard");
    }
  }, [connected, pendingRedirect, router]);
  const handleEnter = () => {
    if (connected) {
      router.push("/dashboard");
    } else {
      setPendingRedirect(true);
      setOpen(true);
    }
  };
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  return (
    <section className="relative w-full overflow-hidden">
      {/* Background blobs */}
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-5xl flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 sm:px-4 py-1.5 backdrop-blur-xl animate-fade-in">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-medium text-gray-400 tracking-wide">
            Reputation-First Communities
          </span>
        </div>

        <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.15] tracking-tight animate-fade-in-up">
          <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent font-extralight">
            Find Your Vibe.
          </span>
          <br />
          <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent font-extralight">
            Meet People on Your Level.
          </span>
        </h1>

        <p className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 px-4 font-light animate-fade-in-up" style={{animationDelay: "0.1s"}}>
          FairRewards helps you connect with like-minded builders, learners, and
          creatives, using on-chain reputation to create safer, higher-quality
          communities.
        </p>

        <div className="mt-7 sm:mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center px-4 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
          <button onClick={() => setOpen(true)}  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 sm:px-8 py-3 text-sm font-medium text-black transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] hover:pointer-cursor">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">Connect Wallet</span>
            <ArrowRight
              size={16}
              className="relative group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>

          <button
            onClick={handleEnter}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-6 sm:px-8 py-3 text-sm font-medium text-gray-300 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.02] active:scale-[0.98] hover:cursor-pointer"
          >
            <span className="relative">Enter FairRewards</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:gap-4 px-4 animate-fade-in-up" style={{animationDelay: "0.3s"}}>
          <span className="flex items-center justify-center gap-1.5">
            <div className="h-1 w-1 rounded-full bg-gray-600" />
            Connect wallet, find your people
          </span>
          <span className="hidden sm:inline text-gray-700">|</span>
          <span className="flex items-center justify-center gap-1.5">
            <div className="h-1 w-1 rounded-full bg-gray-600" />
            See how rooms are matched by vibe & trust
          </span>
        </div>

        <p className="mt-10 sm:mt-12 max-w-md text-xs leading-relaxed text-gray-600 font-light px-4 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
          Powered by reputation, not followers.
          <br />
          No DMs. No spam. Just real connections.
        </p>
      </div>

      {open && <WalletConnectModal onClose={() => setOpen(false)} />}

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70vh] sm:h-[80vh]">
        <div
          className="absolute inset-0 animate-grid-fade"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(25,25,25) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(25,25,25) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 55% at 50% 100%, #000 35%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse 85% 55% at 50% 100%, #000 35%, transparent 75%)",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes grid-fade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-grid-fade {
          animation: grid-fade 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────── HOW IT WORKS ─────────────────────── */

function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  // 🔽 scroll when visiting /how-it-works
  useEffect(() => {
    if (pathname === "/how-it-works") {
      const el = document.getElementById("how-it-works");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname]);

  const steps = [
    {
      step: "01",
      title: "Connect your wallet",
      desc: "FairRewards reads on-chain activity to understand how you behave — not who you know.",
      icon: Lock,
      color: "emerald",
    },
    {
      step: "02",
      title: "Build reputation",
      desc: "Consistent, trusted activity improves your FairScore over time.",
      icon: TrendingUp,
      color: "amber",
    },
    {
      step: "03",
      title: "Enter matched rooms",
      desc: "Access communities that match your level — no invites or paywalls.",
      icon: Zap,
      color: "blue",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16"
    >
      <div className="text-center mb-10 sm:mb-12">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-600 mb-3 font-medium">
          How It Works
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white">
          Three steps to better communities
        </h2>
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((item, i) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={item.step}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-b transition-opacity duration-500 blur-xl ${
                  item.color === "emerald"
                    ? "from-emerald-500/20"
                    : item.color === "amber"
                    ? "from-amber-500/20"
                    : "from-blue-500/20"
                } to-transparent ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />

              <div
                className={`relative p-5 sm:p-7 rounded-2xl border bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-xl transition-all duration-500 ${
                  isHovered
                    ? "border-white/20 translate-y-[-4px]"
                    : "border-white/5"
                }`}
              >
                {/* Step number */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-4xl sm:text-6xl font-extralight text-white/5 transition-all duration-500 group-hover:text-white/10">
                  {item.step}
                </div>

                <div
                  className={`mb-4 sm:mb-5 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 ${
                    isHovered ? "scale-110 bg-white/10" : ""
                  }`}
                >
                  <Icon size={20} className="text-gray-300" />
                </div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-medium mb-2">
                  Step {item.step}
                </p>
                <h3 className="text-lg sm:text-xl font-light text-white mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────────────────── ABOUT ───────────────────────── */

function About() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-white/[0.01] rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-medium mb-3">
          About FairRewards
        </p>
        <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-tight px-4">
          Communities feel better
          <br />
          when everyone belongs.
        </h2>

        <div className="mt-7 sm:mt-10 space-y-4 sm:space-y-6 px-4">
          <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed">
            FairRewards is built for people who want meaningful conversations, not
            noise.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed">
            Reputation shapes access — helping communities stay relevant and
            respectful.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
          {["No spam", "Real people", "Trusted network", "Organic growth"].map(
            (item) => (
              <div
                key={item}
                className="group flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.05] hover:scale-105"
              >
                <Check size={12} className="sm:w-3.5 sm:h-3.5 text-emerald-500 transition-transform group-hover:scale-110" />
                <span className="text-[11px] sm:text-xs text-gray-400 font-light">{item}</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── PHILOSOPHY ─────────────────────── */

function Philosophy() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="group relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 sm:p-10 md:p-14 text-center backdrop-blur-xl transition-all hover:border-white/20 hover:shadow-[0_0_80px_rgba(255,255,255,0.05)]">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 sm:w-20 sm:h-20 border-t-2 border-l-2 border-white/20 rounded-tl-2xl sm:rounded-tl-3xl transition-all group-hover:w-16 group-hover:h-16 sm:group-hover:w-24 sm:group-hover:h-24" />
        <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-20 sm:h-20 border-b-2 border-r-2 border-white/20 rounded-br-2xl sm:rounded-br-3xl transition-all group-hover:w-16 group-hover:h-16 sm:group-hover:w-24 sm:group-hover:h-24" />
        
        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed font-light px-2">
          FairRewards is built on the idea that{" "}
          <span className="text-white font-normal bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            trust compounds
          </span>
          .
          <br className="hidden sm:block" />
          Reputation should be earned quietly — and unlock access naturally.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────── FEATURES ─────────────────────── */

function Features() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const items = [
    {
      icon: ShieldCheck,
      title: "Reputation-first access",
      description:
        "Rooms aren't open to everyone by default. Access is shaped by on-chain activity.",
    },
    {
      icon: Users,
      title: "Matched by level",
      description:
        "Join spaces where people share similar experience and intent.",
    },
    {
      icon: Sparkles,
      title: "Designed for real interaction",
      description:
        "No DMs. No follower chasing. Just shared spaces that feel natural.",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((f, i) => {
            const isHovered = hoveredFeature === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-2xl bg-white/5 blur-xl transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`} />
                
                <div className={`relative rounded-2xl border bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-xl p-5 sm:p-6 transition-all duration-500 ${
                  isHovered ? "border-white/20 translate-y-[-4px]" : "border-white/5"
                }`}>
                  <div className={`mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-500 ${
                    isHovered ? "scale-110 bg-white/10 border-white/20" : ""
                  }`}>
                    <f.icon size={18} className="sm:w-5 sm:h-5 text-gray-300" />
                  </div>
                  <h3 className="text-sm sm:text-base font-light text-gray-100 mb-2">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── TRUST METRICS ─────────────────────── */

/* ─────────────────────── CTA ─────────────────────── */

function CTA() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white mb-4 sm:mb-6 leading-tight">
          Ready to find your community?
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mb-7 sm:mb-10 max-w-xl mx-auto font-light leading-relaxed px-4">
          Join FairRewards today and connect with people who share your values and
          vision.
        </p>
        <button className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 sm:px-10 py-3 sm:py-4 text-sm font-medium text-black transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative">Get Started</span>
          <ArrowRight
            size={16}
            className="relative group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>
    </section>
  );
}

/* ───────────────────────── UTILS ───────────────────────── */

const Spacer = () => <div className="h-12 sm:h-16" />;
const ClosingSpacer = () => <div className="h-20 sm:h-32" />;
const Divider = () => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);