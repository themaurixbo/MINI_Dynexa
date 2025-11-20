# MINI_Dynexa
# DYNEXA Lemon Rewards – MiniApp + Scroll + Mimic

> Web3 rewards layer for local merchants in Argentina: a Lemon Mini App that turns everyday payments into gamified GiftTokens on Scroll, with on-chain automation powered by Mimic.

---

## What it does

**DYNEXA Lemon Rewards** is a Web3 rewards infrastructure designed for **local merchants and everyday users** in Argentina & LATAM.

- Merchants fund reward campaigns in ARS/crypto through **Lemon**.
- The funds are bridged to **Scroll** and stored in a per-merchant reward pool.
- Each payment made with Lemon at a participating merchant automatically mints **GiftTokens** (cashback) on Scroll to the user.
- Users can see their balances and missions in a **Lemon Mini App**, redeem rewards in-store, and even send GiftTokens to friends.
- Dynexa’s treasury for each campaign can be **automated via Mimic**, allowing merchants to earn yield on idle reward funds with one click.

The result: a **simple consumer experience** that hides all blockchain complexity, while leveraging Scroll + Mimic under the hood.

---

## Tracks & Bounties

This project is built for:

- **Main track:** MiniApps + UX  
- **Bounties:**
  - Lemon – Best Mini App in Lemon  
  - Scroll – Deploy on Scroll  
  - Scroll – Best Crypto Consumer App  
  - Mimic – Best Use Case with Mimic SDK (App / Mini App integration – option b)

---

## The problem it solves

- Traditional loyalty points in LATAM are **closed, illiquid and local**, often devalued by inflation.
- Small merchants cannot afford to build their own reward infrastructure.
- Users don’t understand Web3 tools or self-custody, yet they already use apps like Lemon every day.

**DYNEXA** provides:

- A **shared, interoperable reward layer** for local merchants.  
- Rewards backed by crypto on Scroll (protecting value better than points in pure fiat).  
- A UX that feels like a normal cashback mini app inside Lemon – no wallet setup, seed phrases or gas concepts.

---

## High-level architecture

### Components

- **Lemon Mini App (frontend)**
  - Built with Lemon Mini App SDK (web view).
  - Shows GiftToken balances, missions and available rewards.
  - Calls Dynexa Backend API; no direct blockchain interactions.

- **Dynexa Backend API**
  - Handles merchant onboarding, campaign configuration and event webhooks from Lemon.
  - Calculates reward amounts and interacts with smart contracts on Scroll.
  - Exposes a simple JSON API to the Mini App and to the merchant dashboard.
  - Integrates with **Mimic SDK** to create and manage automation tasks for each campaign treasury.

- **Scroll smart contracts**
  - `MerchantRegistry`: on-chain registry of merchants.
  - `GiftToken` (ERC-20): per-merchant (or per campaign) token representing user rewards.
  - `CampaignManager`: configuration of cashback rules and campaign parameters.
  - `RewardEngine`: validates campaigns and mints GiftTokens according to purchases.
  - `RedemptionManager`: burns GiftTokens on redemption and emits auditable events.
  - `TreasuryVault`: holds the funds backing each campaign and exposes hooks for Mimic tasks.

- **Mimic**
  - A set of TypeScript tasks that interact with `TreasuryVault`.
  - Can automatically move funds from the vault to a yield strategy and back, based on simple rules.

---

## Call flows

### 1. Merchant onboarding

1. Merchant registers via the Dynexa dashboard.
2. Backend validates info and calls `MerchantRegistry.registerMerchant(owner, offchainId)` on Scroll.
3. `merchantId` is returned and stored in backend DB.
4. Merchant is now ready to create campaigns and fund them.

### 2. Funding a campaign

1. Merchant chooses a campaign in Dynexa dashboard and clicks **“Fund Rewards”**.
2. Backend triggers a payment / transfer via Lemon API.
3. Once Lemon confirms, backend bridges/mirrors that amount to Scroll.
4. Backend calls `TreasuryVault.deposit(merchantId, campaignId, amount)`.
5. The vault updates the on-chain balance of the reward pool.

### 3. Payment → GiftToken minting (cashback)

1. User pays with Lemon at a registered merchant.
2. Lemon sends a webhook to Dynexa Backend with `merchantId`, user identifier and amount.
3. Backend reads campaign rules from `CampaignManager.getCampaign(campaignId)`.
4. Backend computes `tokensToMint` and calls:

   ```solidity
   RewardEngine.rewardUser(campaignId, userAddress, purchaseAmount);
