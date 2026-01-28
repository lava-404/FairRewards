"use client";

import { ShieldCheck, Lock, TrendingUp, Users } from "lucide-react";

export default function AboutPage() {
  // Inject keyframe animations
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes floatIn {
        from {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
        opacity: 0;
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
        opacity: 0;
      }

      .animate-float-in {
        animation: floatIn 1s ease-out forwards;
        opacity: 0;
      }
    `;
    if (!document.head.querySelector('#float-animations')) {
      style.id = 'float-animations';
      document.head.appendChild(style);
    }
  }
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Enhanced ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-[120px] animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/4 -left-48 w-[450px] h-[450px] bg-emerald-500/12 rounded-full blur-[100px] animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 -right-48 w-[450px] h-[450px] bg-emerald-500/12 rounded-full blur-[100px] animate-pulse" 
             style={{ animationDuration: '12s', animationDelay: '4s' }} />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Hero - Enhanced */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-float-in">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">
              About FairScale
            </p>
          </div>

          <h1 className="text-balance text-4xl sm:text-6xl lg:text-7xl font-extralight leading-[1.08] text-white mb-8 animate-float-in" 
              style={{ animationDelay: '0.15s' }}>
            Access should be <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">earned</span>,
            <br />
            not requested.
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-base sm:text-sm lg:text-lg text-gray-400 leading-relaxed font-light animate-float-in" 
             style={{ animationDelay: '0.3s' }}>
            FairScale is a reputation system designed to unlock communities,
            rewards, and influence based on how you behave on-chain —
            not who you know, how much you pay, or how loud you are.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      

      {/* Why Reputation Gating - Enhanced */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center lg:text-center mb-12 sm:mb-16 animate-float-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white mb-4">
              Why reputation-gated access works
            </h2>
            
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Reason
              icon={ShieldCheck}
              title="Trust compounds"
              text="Reputation grows through consistent behavior, making access feel natural and deserved."
              delay="0s"
            />
            <Reason
              icon={Lock}
              title="Spam stays out"
              text="Bad actors can't buy their way in. Low-effort behavior limits reach automatically."
              delay="0.1s"
            />
            <Reason
              icon={TrendingUp}
              title="Signal stays high"
              text="Rooms are filled with people at similar stages, intent, and momentum."
              delay="0.2s"
            />
            <Reason
              icon={Users}
              title="Communities self-balance"
              text="No heavy moderation needed. Reputation shapes participation organically."
              delay="0.3s"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* How FairScale Measures - Enhanced */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center lg:text-left mb-10 sm:mb-14 animate-float-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white mb-4">
              How FairScale does its job
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400/50 to-amber-400/50 mx-auto lg:mx-0 rounded-full" />
          </div>

          <div className="space-y-6 text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed font-light">
            <div className="relative pl-6 border-l-2 border-emerald-500/20 animate-float-in" style={{ animationDelay: '0.1s' }}>
              <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-emerald-500/50" />
              <p>
                FairScale observes on-chain activity across supported networks
                and protocols to understand patterns —
                <span className="text-gray-300"> consistency, participation, and long-term behavior</span>.
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-amber-500/20 animate-float-in" style={{ animationDelay: '0.25s' }}>
              <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-amber-500/50" />
              <p>
                It doesn't care about followers, clout, or hype cycles.
                It rewards <span className="text-gray-300">reliability, contribution, and sustained presence</span>.
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-emerald-500/20 animate-float-in" style={{ animationDelay: '0.4s' }}>
              <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-emerald-500/50" />
              <p>
                The result is a <span className="font-medium text-white">FairScore</span> —
                a quiet signal that unlocks rooms, boosts rewards,
                and gradually increases influence as trust compounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing - Enhanced */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative animate-float-in" style={{ animationDelay: '0.1s' }}>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-full blur-3xl" />
            
            <h3 className="relative text-3xl sm:text-4xl lg:text-5xl font-extralight text-white mb-10">
              Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">long term</span>
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed font-light animate-float-in" style={{ animationDelay: '0.25s' }}>
              FairScale isn't about growth hacks or short-term engagement.
              <br className="hidden sm:block" />
              It's about building spaces where people stay —
              <span className="text-gray-300"> because the quality holds</span>.
            </p>

            <div className="flex items-center justify-center py-3 animate-float-in" style={{ animationDelay: '0.35s' }}>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            <div className="inline-block p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm animate-float-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed font-light">
                If you show up consistently, behave well,
                and contribute over time,
                <br />
                <span className="text-white font-normal">access unlocks itself</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </main>
  );
}

/* ---------- Components ---------- */

function Reason({
  icon: Icon,
  title,
  text,
  delay = "0s"
}: {
  icon: any;
  title: string;
  text: string;
  delay?: string;
}) {
  return (
    <div 
      className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10 animate-float-in"
      style={{ animationDelay: delay }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-amber-500/0 group-hover:from-emerald-500/5 group-hover:to-amber-500/5 transition-all duration-500 pointer-events-none" />
      
      <div className="relative">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 group-hover:border-emerald-400/30 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-500">
          <Icon size={20} className="text-gray-300 group-hover:text-emerald-400 transition-colors duration-500" />
        </div>

        <h4 className="text-base sm:text-lg font-medium text-white mb-3 group-hover:text-emerald-50 transition-colors duration-300">
          {title}
        </h4>

        <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
          {text}
        </p>
      </div>
    </div>
  );
}