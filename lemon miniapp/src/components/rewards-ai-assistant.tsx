
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getRecommendationsAction } from '@/actions/get-recommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function RewardsAiAssistant() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setRecommendations('');
    
    const result = await getRecommendationsAction();

    if (result.success && result.recommendations) {
      setRecommendations(result.recommendations);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Could not get recommendations.',
      });
    }
    setLoading(false);
  };

  return (
    <div className="py-4 space-y-4">
      <Card className="btn-glass text-white border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles />
            <span>AI Rewards Assistant</span>
          </CardTitle>
          <CardDescription>
            Not sure what to get? Ask our AI for personalized recommendations based on your activity!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Button variant="glass" type="submit" disabled={loading} className="w-full">
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get AI Recommendations
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {loading && (
         <div className="text-center p-4">
            <Loader className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Finding the best rewards for you...</p>
        </div>
      )}

      {recommendations && (
        <Card className="animate-in fade-in">
          <CardHeader>
            <CardTitle>Here are your recommendations!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>{recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
