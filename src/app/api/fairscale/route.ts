// app/api/fairscale/route.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * ─────────────────────────────────────────────
 * In-memory cache (per wallet)
 * NOTE: resets on server restart (OK for now)
 * ─────────────────────────────────────────────
 */
const cache = new Map<
  string,
  {
    data: FairscaleResponse;
    expiresAt: number;
  }
>();

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Shape returned to frontend
 * (mirrors FairScale, no guessing)
 */
type FairscaleResponse = {
  wallet: string;
  fairscore: number;
  fairscore_base: number;
  social_score: number;
  tier: string;
  badges: any[];
  actions?: any[];
  features?: Record<string, number>;
  timestamp?: string;

  /** meta */
  source: "fairscale" | "cache" | "fallback";
  cached?: boolean;
  demo?: boolean;
  error?: string;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");
  const twitter = searchParams.get("twitter"); // optional

  if (!wallet) {
    return NextResponse.json(
      { error: "Missing wallet parameter" },
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
      source: "cache",
    });
  }

  /**
   * ─────────────────────────────────────────────
   * 2️⃣ Build FairScale request URL
   * ─────────────────────────────────────────────
   */
  const params = new URLSearchParams({ wallet });
  if (twitter) params.set("twitter", twitter);

  const url = `https://api.fairscale.xyz/score?${params.toString()}`;

  /**
   * ─────────────────────────────────────────────
   * 3️⃣ Fetch from FairScale
   * ─────────────────────────────────────────────
   */
  try {
    if (!process.env.FAIRSCALE_API_KEY) {
      throw new Error("FAIRSCALE_API_KEY is missing");
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.FAIRSCALE_API_KEY}`,
        Accept: "application/json",
      },
      // IMPORTANT: disable Next fetch cache
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `FairScale failed (${res.status}): ${text}`
      );
    }

    const raw = await res.json();

    /**
     * ─────────────────────────────────────────────
     * 4️⃣ Normalize (NO hardcoding)
     * ─────────────────────────────────────────────
     */
    const data: FairscaleResponse = {
      wallet: raw.wallet,
      fairscore: raw.fairscore,
      fairscore_base: raw.fairscore_base,
      social_score: raw.social_score,
      tier: raw.tier,
      badges: raw.badges ?? [],
      actions: raw.actions ?? [],
      features: raw.features ?? {},
      timestamp: raw.timestamp,
      source: "fairscale",
    };

    /**
     * ─────────────────────────────────────────────
     * 5️⃣ Cache it
     * ─────────────────────────────────────────────
     */
    cache.set(wallet, {
      data,
      expiresAt: Date.now() + CACHE_TTL,
    });

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("❌ FairScale error:", err.message);

    /**
     * ─────────────────────────────────────────────
     * 6️⃣ Fallback (clearly marked)
     * ─────────────────────────────────────────────
     */
    const fallback: FairscaleResponse = {
      wallet,
      fairscore: 72.4,
      fairscore_base: 58,
      social_score: 14.4,
      tier: "gold",
      badges: [],
      features: {},
      demo: true,
      source: "fallback",
      error: err.message,
    };

    return NextResponse.json(fallback, { status: 200 });
  }
}
