
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Share2, QrCode, CheckCircle2, Clock, Award, Users } from 'lucide-react';
import { MyQrCodeDialog } from './my-qr-code-dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface ReferralDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const referralCode = "ANDRE-42X";
const referralLink = `https://giftoken.app/join?ref=${referralCode}`;

const referrals = [
    { name: 'John Doe', status: 'QUALIFIED' },
    { name: 'Jane Smith', status: 'REWARDED' },
    { name: 'Sam Wilson', status: 'PENDING' },
];

const statusConfig = {
    PENDING: { icon: Clock, color: 'text-amber-500', label: 'Pending' },
    QUALIFIED: { icon: CheckCircle2, color: 'text-blue-500', label: 'Qualified' },
    REWARDED: { icon: Award, color: 'text-green-500', label: 'Rewarded' },
};

export function ReferralDialog({ open, onOpenChange }: ReferralDialogProps) {
  const { toast } = useToast();
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} Copied!`,
      description: `Your ${type.toLowerCase()} is ready to be shared.`,
    });
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me on Gift Token!',
          text: `Use my code ${referralCode} to sign up and get a reward!`,
          url: referralLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
          variant: 'destructive',
          title: 'Sharing Failed',
          description: 'Could not open native share dialog.',
        });
      }
    } else {
      handleCopy(referralLink, 'Referral Link');
    }
  };

  const qualifiedReferrals = referrals.filter(r => r.status === 'REWARDED').length;

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Refer a Friend, Earn Rewards</DialogTitle>
          <DialogDescription className="text-center">
            Share your code and earn 10 USDC for every friend who signs up and makes a transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 p-4 rounded-lg bg-primary/10 text-center">
            <p className="text-sm text-primary font-medium">Your Referral Code</p>
            <div className="flex items-center justify-center gap-2 mt-1">
                <p className="text-2xl font-bold tracking-widest text-primary">{referralCode}</p>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => handleCopy(referralCode, 'Referral Code')}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>

        <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Your Invitation Link</p>
            <div className="flex gap-2">
                <Input readOnly value={referralLink} className="bg-muted" />
                <Button variant="secondary" onClick={() => handleCopy(referralLink, 'Referral Link')}>Copy</Button>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-4">
            <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4"/>
                Share
            </Button>
            <Button variant="outline" onClick={() => setIsQrCodeOpen(true)}>
                <QrCode className="mr-2 h-4 w-4"/>
                Show QR
            </Button>
        </div>

        <Separator />

        <div className="mt-4">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
                <Users className="h-5 w-5"/>
                Your Referrals ({qualifiedReferrals}/{referrals.length})
            </h3>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                {referrals.map((referral, index) => {
                    const config = statusConfig[referral.status as keyof typeof statusConfig];
                    return (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                            <p className="font-medium text-secondary-foreground">{referral.name}</p>
                            <Badge variant="outline" className={`capitalize border-0 ${config.color} bg-current/10`}>
                                <config.icon className={`mr-1.5 h-3 w-3 ${config.color}`} />
                                {config.label}
                            </Badge>
                        </div>
                    );
                })}
            </div>
        </div>

      </DialogContent>
    </Dialog>
    <MyQrCodeDialog 
        open={isQrCodeOpen} 
        onOpenChange={setIsQrCodeOpen} 
        user={{ name: "Referral Code", username: referralCode, avatarUrl: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FDynexa%20Logo%20D%20transparente.png?alt=media&token=cab2d8ec-401e-4f09-9326-93a6fec11fca" }} 
    />
    </>
  );
}
