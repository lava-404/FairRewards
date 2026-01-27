
# 🌐 FairRewards

**Reputation-powered communities, rewards, and access — built on FairScale.**

FairRewards is a Web3-native platform that uses **on-chain reputation** to unlock communities, perks, and rewards.  
Instead of invites, follower counts, or paywalls, access is earned through **verifiable behavior**.

At the core of FairRewards lies **FairScale** — a reputation engine that scores wallets based on real on-chain activity.

---

## ✨ What Makes FairRewards Different?

- 🔐 **Reputation-gated access** (not money, not clout)
- 📊 **On-chain FairScore** for every wallet
- 🧠 **Smart caching** to avoid rate limits
- 💬 **Tier-based chat rooms**
- 🎁 **Rewards & multipliers based on trust**
- ⚡ Built on **Next.js App Router + Solana**

---

## 🧠 FairScale (Core Engine)

**FairScale** analyzes a wallet’s on-chain behavior and returns:

- `fairscore` – normalized reputation score
- `tier` – access tier (bronze → diamond)
- `badges` – earned behavioral achievements
- `breakdown` – base vs social contribution
- `features` – wallet activity metrics

This data directly powers:
- Dashboard tiers
- Reward multipliers
- Chat room access
- Perk eligibility

FairRewards **does not hardcode trust** — it reads it from the chain.

---

## 🧩 Project Structure

```

src/
├─ app/
│  ├─ api/
│  │  └─ fairscale/
│  │     └─ route.ts        # Cached FairScale proxy API
│  ├─ dashboard/
│  │  └─ page.tsx           # Reputation dashboard
│  ├─ communities/
│  │  └─ page.tsx           # Reputation-gated rooms
│  ├─ chats/
│  ├─ about/
│  ├─ layout.tsx
│  └─ page.tsx              # Landing page
│
├─ components/
│  ├─ features/
│  │  ├─ BalanceCard.tsx
│  │  ├─ AirdropRewardCard.tsx
│  │  ├─ SwapCard.tsx
│  │  └─ ChatRoomCard.tsx
│  ├─ wallet/
│  ├─ ui/
│
├─ lib/
│  └─ fairscore.ts          # Tier + multiplier logic
│
├─ hooks/
├─ config/
│
└─ globals.css

```

---

## 🔌 API Layer (FairScale Proxy)

To prevent **429 rate-limit errors**, FairRewards uses a **cached API proxy**.

### Endpoint
```

GET /api/fairscale?wallet=<SOLANA_WALLET>

````

### Features
- ⏱️ **5-minute in-memory cache per wallet**
- 🧠 Cache-aware responses
- ⚠️ Explicit fallback marking
- 🔐 API key stays server-side

### Response Shape
```json
{
  "wallet": "7xKXtg2...",
  "fairscore": 72.4,
  "tier": "gold",
  "badges": [],
  "breakdown": {
    "base": 58.1,
    "social": 36
  },
  "timestamp": "2026-01-21T13:13:53Z",
  "cached": true,
  "source": "fairscale"
}
````

---

## 📊 Dashboard Flow

1. User connects wallet (Solana Wallet Adapter)
2. Wallet address → `/api/fairscale`
3. Cached FairScale response returned
4. UI derives:

   * Tier
   * Multiplier
   * Progress to next tier
5. Dashboard renders:

   * FairScore
   * Tier badge
   * Perks
   * Actions
   * Chat access

---

## 🏆 Tier System

| Tier    | Score Range | Benefits                    |
| ------- | ----------- | --------------------------- |
| Bronze  | 0+          | Basic access                |
| Silver  | 400+        | Improved perks              |
| Gold    | 600+        | Boosted rewards             |
| Diamond | 800+        | Governance + premium access |

Each tier unlocks **multipliers**, **rooms**, and **features**.

---

## 💬 Reputation-Gated Communities

* Users only see rooms matching their tier
* Chat access is dynamic, not permanent
* No spam, no bots, no cold DMs
* Conversations stay **high-signal**

---

## 🧪 Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Solana Wallet Adapter**
* **Lucide Icons**
* **FairScale API**
* **In-memory server cache**

---

## 🛠 Environment Variables

Create `.env.local`:

```env
FAIRSCALE_API_KEY=your_fairscale_api_key
```

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Default:

```
http://localhost:3000
```

Custom port:

```bash
npm run dev -- -p 3001
```

---

## 🧭 Philosophy

> **Trust compounds.**
> Reputation should be earned quietly — and unlock access naturally.

FairRewards doesn’t sell access.
It measures behavior and lets trust speak for itself.

---

## 📜 License

MIT — build responsibly.

---

**Built with 🧠 by FairRewards**

```


