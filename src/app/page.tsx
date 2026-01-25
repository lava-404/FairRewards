"use client";

import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/app-hero";
import FeaturesSection from "@/components/FeaturesSection";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export default function Home() {
  const {
    wallets,
    select,
    disconnect,
    publicKey,
    connected,
    connecting,
  } = useWallet();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🚫 Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const address = publicKey?.toBase58();

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <HeroSection />

        {/* Example wallet UI (optional) */}
        <div className="mt-6">
          {!connected ? (
            <div className="flex gap-2">
              {wallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => select(wallet.adapter.name)}
                  disabled={connecting}
                  className="rounded-lg border px-4 py-2 text-sm"
                >
                  Connect {wallet.adapter.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs">
                {address?.slice(0, 6)}…{address?.slice(-4)}
              </span>
              <button
                onClick={disconnect}
                className="rounded-lg border px-3 py-1 text-xs"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      <AboutSection />
      <FeaturesSection />
    </>
  );
}
