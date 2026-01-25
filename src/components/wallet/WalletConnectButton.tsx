"use client";

import { useState } from "react";
import WalletConnectModal from "./WalletConnectModal";

export default function WalletConnectButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-border-low bg-card px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-sm"
      >
        Connect Wallet
      </button>

      {open && <WalletConnectModal onClose={() => setOpen(false)} />}
    </>
  );
}
