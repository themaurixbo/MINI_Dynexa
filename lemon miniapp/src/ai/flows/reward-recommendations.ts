// reward-recommendations.ts
'use server';
/**
 * @fileOverview Recommends rewards to users based on their transaction history and profile.
 *
 * - getRewardRecommendations - A function that returns reward recommendations.
 * - RewardRecommendationsInput - The input type for the getRewardRecommendations function.
 * - RewardRecommendationsOutput - The return type for the getRewardRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewardRecommendationsInputSchema = z.object({
  transactionHistory: z.string().describe('The user transaction history.'),
  profile: z.string().describe('The user profile data.'),
  rewardCatalog: z.string().describe('Available rewards in the catalog.'),
});
export type RewardRecommendationsInput = z.infer<typeof RewardRecommendationsInputSchema>;

const RewardRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('Personalized reward recommendations for the user.'),
});
export type RewardRecommendationsOutput = z.infer<typeof RewardRecommendationsOutputSchema>;

export async function getRewardRecommendations(input: RewardRecommendationsInput): Promise<RewardRecommendationsOutput> {
  return rewardRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewardRecommendationsPrompt',
  input: {schema: RewardRecommendationsInputSchema},
  output: {schema: RewardRecommendationsOutputSchema},
  prompt: `You are a reward recommendation expert. Analyze the user's transaction history and profile to provide personalized reward recommendations from the reward catalog. The currency is USDC.

Transaction History: {{{transactionHistory}}}
Profile: {{{profile}}}
Reward Catalog: {{{rewardCatalog}}}

Based on this information, recommend the best rewards for the user:
`,
});

const rewardRecommendationsFlow = ai.defineFlow(
  {
    name: 'rewardRecommendationsFlow',
    inputSchema: RewardRecommendationsInputSchema,
    outputSchema: RewardRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
