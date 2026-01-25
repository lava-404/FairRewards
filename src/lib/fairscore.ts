// src/lib/fairscore.ts

export type TierLevel = "Bronze" | "Silver" | "Gold" | "Diamond";
export type TierStage = "Explorer" | "Builder" | "Trusted" | "Core";

export const TIER_STEPS = [
  {
    stage: "Explorer",
    level: "bronze",
    min: 0,
    multiplier: 1,
    color: "bronze",
    room: "The Commons",
  },
  {
    stage: "Builder",
    level: "silver",
    min: 500,
    multiplier: 1.5,
    color: "silver",
    room: "The Workshop",
  },
  {
    stage: "Trusted",
    level: "gold",
    min: 700,
    multiplier: 2,
    color: "gold",
    room: "The Council",
  },
  {
    stage: "Core",
    level: "diamond",
    min: 850,
    multiplier: 2.5,
    color: "diamond",
    room: "Inner Circle",
  },
] as const;

export type Tier = (typeof TIER_STEPS)[number];

/**
 * Returns the current tier derived from score
 */
export function getTier(score: number): Tier {
  return (
    [...TIER_STEPS]
      .reverse()
      .find((tier) => score >= tier.min) ?? TIER_STEPS[0]
  );
}

/**
 * Returns the next tier the user is progressing toward
 */
export function getNextTier(score: number): Tier | null {
  const index = TIER_STEPS.findIndex((t) => score < t.min);
  return index === -1 ? null : TIER_STEPS[index];
}
