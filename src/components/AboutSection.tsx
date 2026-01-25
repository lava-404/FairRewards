"use client";

export default function AboutSection() {
  return (
    <section className="relative w-full bg-background py-20 sm:py-24 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          {/* Eyebrow with animated underline */}
          <div className="inline-flex flex-col items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              About FairRoom
            </p>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          </div>

          {/* Heading with gradient accent */}
          <h2 className="mt-6 text-balance text-3xl font-medium leading-snug tracking-tight sm:text-4xl">
            Communities feel better
            <br />
            <span className="relative inline-block">
              when everyone belongs.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 300 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 5.5C50 2.5 150 1 299 5.5"
                  stroke="rgb(107, 114, 128)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              </svg>
            </span>
          </h2>

          {/* Body with enhanced spacing and subtle card effect */}
          <div className="mt-8 space-y-5">
            <p className="text-pretty text-sm leading-relaxed text-gray-400 sm:text-base transition-opacity hover:text-gray-300">
              FairRoom is built for people who want meaningful conversations, not
              noise. Instead of open invites and follower counts, access is shaped
              by reputation — helping communities stay respectful, relevant, and
              genuinely social.
            </p>

            <p className="text-pretty text-sm leading-relaxed text-gray-400 sm:text-base transition-opacity hover:text-gray-300">
              Whether you're learning, building, or just exploring, FairRoom helps
              you meet people who are at a similar stage — so interactions feel
              natural, not forced.
            </p>
          </div>

          {/* Decorative dots */}
          <div className="mt-10 flex items-center justify-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-500"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-500/60"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-500/30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}