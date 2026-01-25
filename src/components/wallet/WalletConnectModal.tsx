"use client";

import { useWallet } from "@solana/wallet-adapter-react";

type Props = {
  onClose: () => void;
};

export default function WalletConnectModal({ onClose }: Props) {
  const {
    wallets,
    select,
    disconnect,
    publicKey,
    connected,
    connecting,
    wallet,
  } = useWallet();

  const address = publicKey?.toBase58();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#312f2c]/20">
      <div className="w-full max-w-lg rounded-2xl border border-border-low bg-card p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold">Wallet connection</p>
            <p className="text-sm text-muted">
              Choose a wallet to connect
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* Status */}
        <span className="mb-4 inline-block rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground/80">
          {connected ? "Connected" : "Not connected"}
        </span>

        {/* Wallet list */}
        <div className="grid gap-3 sm:grid-cols-2">
          {wallets.map((w) => (
            <button
              key={w.adapter.name}
              onClick={() => select(w.adapter.name)}
              disabled={connecting}
              className="group flex items-center justify-between rounded-xl border border-border-low bg-card px-4 py-3 text-left text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm disabled:opacity-60"
            >
              <span className="flex flex-col">
                <span className="text-base">
                  {w.adapter.name}
                </span>
                <span className="text-xs text-muted">
                  {connecting
                    ? "Connecting…"
                    : connected &&
                      wallet?.adapter.name === w.adapter.name
                    ? "Active"
                    : "Tap to connect"}
                </span>
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-border-low transition group-hover:bg-primary/80" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border-low pt-4 text-sm">
          <span className="rounded-lg border border-border-low bg-cream px-3 py-2 font-mono text-xs">
            {address ?? "No wallet connected"}
          </span>

          <button
            onClick={disconnect}
            disabled={!connected}
            className="rounded-lg border border-border-low bg-card px-3 py-2 font-medium transition hover:-translate-y-0.5 hover:shadow-sm disabled:opacity-60"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
