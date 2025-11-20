
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { X, Gift, Sparkles } from 'lucide-react';
import { Confetti } from './confetti';

interface GiftWonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const giftOptions = [
    { name: "Amazon Voucher", href: "/rewards" },
    { name: "Trip to Uyuni, Bolivia", href: "/rewards" },
    { name: "Nike Credit", href: "/rewards" },
];

export function GiftWonDialog({ open, onOpenChange }: GiftWonDialogProps) {
  const router = useRouter();

  const handleSelectReward = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-0 border-0 bg-transparent shadow-2xl">
        {open && <Confetti />}
        <div className="relative bg-card rounded-2xl overflow-hidden text-center">
            <DialogHeader className='absolute top-0 left-0 w-full h-full sr-only'>
                <DialogTitle>You Won a Gift Token!</DialogTitle>
                <DialogDescription>
                    A promotional dialog to award the user with a gift token and present them with options.
                </DialogDescription>
            </DialogHeader>

            <button
                onClick={() => onOpenChange(false)}
                className="absolute top-3 right-3 z-10 p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                aria-label="Close"
            >
                <X className="h-4 w-4" />
            </button>
            <div className="p-6 pt-10">
                <div className="mx-auto bg-primary/10 text-primary h-20 w-20 mb-4 rounded-full flex items-center justify-center border-4 border-card shadow-lg">
                    <Gift className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">You Won a Gift Token!</h2>
                <p className="text-muted-foreground mt-2 mb-6">
                    As a thank you for being a valued user, please choose one of these free rewards.
                </p>
                <div className='space-y-3'>
                    {giftOptions.map(reward => (
                        <button key={reward.name} onClick={() => handleSelectReward(reward.href)} className="w-full text-left p-3 border border-border rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-4">
                           <div className="p-2 bg-secondary rounded-md">
                             <Sparkles className="h-5 w-5 text-secondary-foreground" />
                           </div>
                           <div className="flex-1">
                                <p className="font-semibold">{reward.name}</p>
                           </div>
                        </button>
                    ))}
                </div>
                <Button onClick={() => onOpenChange(false)} variant="ghost" className="w-full mt-6 text-muted-foreground">Claim Later</Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
