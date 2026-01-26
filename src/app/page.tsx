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
        

      <AboutSection />
      <FeaturesSection />
    </div>
    </>
  );
}
