"use client";

import { ShieldCheck, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Reputation-first access",
    description:
      "Rooms aren't open to everyone by default. Access is shaped by on-chain activity, helping reduce spam and improve trust.",
  },
  {
    icon: Users,
    title: "Matched by level",
    description:
      "Join spaces where people share similar experience, intent, and momentum — making conversations feel more relevant.",
  },
  {
    icon: Sparkles,
    title: "Designed for real interaction",
    description:
      "No DMs, no follower chasing. FairRoom focuses on shared spaces where conversations happen naturally.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative w-full bg-background py-20 sm:py-24 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex flex-col items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              How it works
            </p>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          </div>

          <h2 className="mt-6 text-balance text-3xl font-medium leading-snug tracking-tight sm:text-4xl">
            Built around trust,
            <br />
            <span className="relative inline-block">
              not attention.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 5.5C40 2.5 100 1 199 5.5"
                  stroke="rgb(107, 114, 128)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl border border-gray-800 bg-black/40 p-6 transition-all duration-300 hover:border-gray-700 hover:bg-black/60 hover:shadow-lg hover:shadow-gray-900/20 hover:-translate-y-1"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-800/0 via-gray-800/0 to-gray-700/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              <div className="relative">
                {/* Icon with background glow */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800/50 ring-1 ring-gray-700/50 mb-4 transition-all duration-300 group-hover:bg-gray-700/50 group-hover:ring-gray-600/50">
                  <feature.icon
                    size={20}
                    className="text-gray-300 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-sm font-medium text-gray-200 transition-colors duration-300 group-hover:text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                  {feature.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"></div>
                <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-gray-600 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-12 flex items-center justify-center gap-1.5">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-gray-700"></div>
          <div className="h-1 w-1 rounded-full bg-gray-600"></div>
          <div className="h-px w-16 bg-gray-700"></div>
          <div className="h-1 w-1 rounded-full bg-gray-600"></div>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-gray-700"></div>
        </div>
      </div>
    </section>
  );
}