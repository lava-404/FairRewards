import { NextRequest, NextResponse } from "next/server";

/**
 * Simple in-memory cache
 * key   -> wallet address
 * value -> cached response + expiry
 */
const cache = new Map<
  string,
  {
    data: FairscaleResponse;
    expiresAt: number;
  }
>();

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

type FairscaleResponse = {
  wallet: string;
  fairscore: number;
  tier: string;
  badges: any[];
  breakdown?: {
    base: number;
    social: number;
  };
  timestamp?: string;
  cached?: boolean;
  demo?: boolean;
  source: "fairscale" | "cache" | "fallback";
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json(
      { error: "Missing wallet" },
      { status: 400 }
    );
  }

  /**
   * ─────────────────────────────────────────────
   * 1️⃣ Serve from cache if valid
   * ─────────────────────────────────────────────
   */
  const cached = cache.get(wallet);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json({
      ...cached.data,
      cached: true,
    });
  }

  /**
   * ─────────────────────────────────────────────
   * 2️⃣ Fetch from FairScale API
   * ─────────────────────────────────────────────
   */
  console.log("API KEY PRESENT:", !!process.env.FAIRSCALE_API_KEY);
  try {
    const res = await fetch(
      `https://api.fairscale.xyz/score?wallet=${wallet}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FAIRSCALE_API_KEY}`,
        },
      }
    );


    if (!res.ok) {
      const text = await res.text();
      console.error("FairScale ERROR:", res.status, text);
      throw new Error(`FairScale API error ${res.status}`);
    }
    

    const raw = await res.json();

    /**
     * ✅ Normalize response for frontend
     * (NO hardcoding here)
     */
    const data: FairscaleResponse = {
      wallet: raw.wallet,
      fairscore: raw.fairscore,
      tier: raw.tier, // ← comes directly from FairScale
      badges: raw.badges ?? [],
      breakdown: {
        base: raw.fairscore_base,
        social: raw.social_score,
      },
      timestamp: raw.timestamp,
      source: "fairscale"
    };

    /**
     * ─────────────────────────────────────────────
     * 3️⃣ Cache result
     * ─────────────────────────────────────────────
     */
    cache.set(wallet, {
      data,
      expiresAt: Date.now() + CACHE_TTL,
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error("FairScale fetch failed:", err);

    /**
     * ─────────────────────────────────────────────
     * 4️⃣ Fallback (ONLY when API fails)
     * ─────────────────────────────────────────────
     * This is intentionally marked as demo
     */
    const fallback: FairscaleResponse = {
      wallet,
      fairscore: 78.4,
      tier: "gold",
      badges: [],
      demo: true,
      source: "fallback"
    };

    return NextResponse.json(fallback, { status: 200 });
  }
}
