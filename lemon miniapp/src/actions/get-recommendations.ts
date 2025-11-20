
'use server';
import { getRewardRecommendations } from '@/ai/flows/reward-recommendations';

export async function getRecommendationsAction(): Promise<{ success: boolean; recommendations?: string; error?: string; }> {
    // In a real application, you would fetch this data based on the logged-in user.
    const transactionHistory = `
- 2023-10-26: -500 USDC, Redeemed Amazon Voucher
- 2023-10-25: +50 USDC, Purchase at Starbucks
- 2023-10-24: -150 USDC, Netflix Subscription
- 2023-10-22: -75 USDC, Sent to @jane_doe
- 2023-10-20: +200 USDC, Welcome Bonus
- 2023-10-15: +70 USDC, Purchase at Nike
- 2023-10-12: +30 USDC, Purchase at a local coffee shop
`;
    const profile = `
- Name: Andre Larrea
- Age: 32
- Location: San Francisco, CA
- Interests: Technology, Coffee, Fitness, Movies
- Joined: 2023-10-20
`;
    const rewardCatalog = `
- 500 USDC: $5 Amazon Voucher
- 600 USDC: $5 Starbucks Gift Card
- 1000 USDC: 1 Month Netflix Subscription
- 1500 USDC: $10 Nike Store Credit
- 2000 USDC: 1 Month Spotify Premium
- 2500 USDC: $20 Uber Credit
- 5000 USDC: $50 Airbnb Voucher
`;

    try {
        const result = await getRewardRecommendations({ transactionHistory, profile, rewardCatalog });
        return { success: true, recommendations: result.recommendations };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to get recommendations from AI.' };
    }
}
