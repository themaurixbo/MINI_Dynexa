
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Gift, Sparkles, X } from 'lucide-react';
import { Confetti } from './confetti';

interface Reward {
  id: number;
  name: string;
  cost?: number;
  description?: string;
  image: string;
  hint: string;
}

interface WelcomeGiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRedeem: (reward: Reward, isGift: boolean) => void;
}

const welcomeRewards: Reward[] = [
    { id: 4, name: "Burger King Whopper Jr.", cost: 12, image: "https://picsum.photos/400/300?random=15", hint: "burger" },
    { id: 10, name: "Trip to Uyuni, Bolivia", description: "A once-in-a-lifetime funded trip.", image: "https://picsum.photos/400/300?random=13", hint: "salt flats" },
    { id: 7, name: "Nike Credit", cost: 1500, image: "https://picsum.photos/400/300?random=4", hint: "sports apparel" },
];

export function WelcomeGiftDialog({ open, onOpenChange, onRedeem }: WelcomeGiftDialogProps) {

  const handleSelectReward = (reward: Reward) => {
    onRedeem(reward, true);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-0 border-0 bg-transparent shadow-2xl">
        {open && <Confetti />}
        <div className="relative btn-glass rounded-2xl overflow-hidden text-center">
            <button 
                onClick={() => onOpenChange(false)}
                className="absolute top-3 right-3 z-10 p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
            <div className="p-6 pt-10">
                <div className="mx-auto bg-primary/10 text-primary h-20 w-20 mb-4 rounded-full flex items-center justify-center border-4 border-card shadow-lg">
                    <Gift className="h-10 w-10" />
                </div>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-foreground">A Welcome Gift For You!</DialogTitle>
                  <DialogDescription className="text-white/70 mt-2 mb-6">
                      To get you started, please choose one of these free rewards.
                  </DialogDescription>
                </DialogHeader>
                <div className='space-y-3'>
                    {welcomeRewards.map(reward => (
                        <button key={reward.id} onClick={() => handleSelectReward(reward)} className="w-full text-left p-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-4 bg-white/5">
                           <div className="p-2 bg-secondary rounded-md">
                             <Sparkles className="h-5 w-5 text-secondary-foreground" />
                           </div>
                           <div className="flex-1">
                                <p className="font-semibold text-white">{reward.name}</p>
                                <div className="flex items-baseline gap-2">
                                    {reward.cost ? (
                                        <>
                                            <p className="text-sm text-green-400 font-bold">50% OFF</p>
                                            <p className="text-sm font-bold text-white">${reward.cost / 2}</p>
                                            <p className="text-xs text-white/70 line-through">${reward.cost}</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-green-400 font-bold">Free Reward</p>
                                    )}
                                </div>
                           </div>
                        </button>
                    ))}
                </div>
                <Button onClick={() => onOpenChange(false)} variant="ghost" className="w-full mt-6 text-white/70">Maybe later</Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
