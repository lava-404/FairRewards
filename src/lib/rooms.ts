// lib/rooms.ts
import { Crown, MessageCircle, Sparkles } from "lucide-react";

/**
 * These MUST match the "stage" returned by getTier()
 * (not bronze/silver/gold/diamond)
 */
export type RoomStage = "Explorer" | "Builder" | "Trusted" | "Core";

export type RoomAction = {
  icon: any;
  title: string;
  description: string;
  highlight?: boolean;
  href?: string
};

export type RoomConfig = {
  title: string;
  description: string;
  minStage: RoomStage;
  rules: readonly string[];
  actions: readonly RoomAction[];
};

export const ROOM_CONFIG: Record<RoomStage, RoomConfig> = {
  Explorer: {
    title: "The Commons",
    description:
      "An open space for new explorers to meet, learn, and build reputation.",
    minStage: "Explorer",
    rules: [
      "Introduce yourself",
      "Ask questions freely",
      "Spam reduces FairScore",
    ],
    actions: [
      {
        icon: MessageCircle,
        title: "Join Public Chat",
        description: "Meet other explorers",
        highlight: true,
      },
    ],
  },

  Builder: {
    title: "The Workshop",
    description:
      "A builders-only room focused on shipping, feedback, and collaboration.",
    minStage: "Builder",
    rules: [
      "Share what you’re building",
      "Give constructive feedback",
      "Low-effort spam is penalized",
    ],
    actions: [
      {
        icon: MessageCircle,
        title: "Join Builder Chat",
        description: "Discuss ideas & builds",
        highlight: true,
      },
      {
        icon: Sparkles,
        title: "Early Drops",
        description: "Builder-only perks",
      },
    ],
  },

  Trusted: {
    title: "The Council",
    description:
      "A private chamber for Trusted wallets. Conversations here shape access and influence.",
    minStage: "Trusted",
    rules: [
      "Discussions affect reputation",
      "Abuse has permanent impact",
      "Core members observe",
    ],
    actions: [
      {
        icon: MessageCircle,
        title: "Join Live Council. Click here to join the chats.",
        description: "High-signal discussions",
        highlight: true,
        href: "/chats/rooms"
      },
      {
        icon: Sparkles,
        title: "Council Signals",
        description: "Early insights",
      },
      {
        icon: Crown,
        title: "Path to Core",
        description: "Maintain score ≥ 850",
      },
    ],
  },

  Core: {
    title: "Inner Circle",
    description:
      "The highest tier. Governance, vision, and long-term influence.",
    minStage: "Core",
    rules: [
      "Governance-level discussions",
      "Shape future mechanics",
      "Highest trust responsibility",
    ],
    actions: [
      {
        icon: Crown,
        title: "Enter Inner Circle",
        description: "Elite-only access",
        highlight: true,
      },
    ],
  },
};
