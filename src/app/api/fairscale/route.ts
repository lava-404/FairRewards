import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json({ error: "Missing wallet" }, { status: 400 });
  }

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
      throw new Error("FairScale API error");
    }

    const data = await res.json();

    return NextResponse.json({
      score: data.score,
      tier: data.tier, // if provided
    });
  } catch (err) {
    return NextResponse.json(
      {
        score: 870, // fallback for demo
        tier: "Core",
        demo: true,
      },
      { status: 200 }
    );
  }
}
