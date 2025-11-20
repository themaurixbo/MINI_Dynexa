
'use client';

import * as React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, ShoppingCart, Lock, Gift, Building, Info, Star, Eye, EyeOff } from "lucide-react";
import { Confetti } from '@/components/confetti';
import { AppContext } from '@/context/AppContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WelcomeGiftDialog } from '@/components/welcome-gift-dialog';
import { RewardsAiAssistant } from '@/components/rewards-ai-assistant';
import { SearchBar } from '@/components/search-bar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AppHeader } from '@/components/app-header';

interface Reward {
  id: number;
  name: string;
  cost?: number;
  description?: string;
  image: string;
  hint: string;
  brand?: string;
  tier?: 'Gold' | 'Platinum' | 'Silver';
  usage?: 'In-store only' | 'Online only';
}

const featuredRewards: Reward[] = [
  { id: 1, name: "Exclusive Offer", description: "Your next Nike gear is on us.", image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2FNike%20Promotion.webp?alt=media&token=f07bb040-85bc-4230-b61f-0ff267362794", hint: "shoe store", cost: 1500 },
  { id: 2, name: "Limited Time", description: "Get a free first ride with Uber.", image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2FUber%20promotion.jpg?alt=media&token=a59127a0-92d5-4c68-b1a2-542dc0a58e41", hint: "city street", cost: 2500 },
  { id: 3, name: "Prime Special", description: "Enjoy a free coffee on us.", image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2FPromotion%20coffee%20photo.jpg?alt=media&token=a9f3cf0b-1679-4122-a2c6-7201716bfa76", hint: "coffee beans", cost: 600 },
];

const rewards: Reward[] = [
  { id: 4, name: "Whopper Jr.", brand: "Burger King", cost: 12, image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2FBurger%20King%20cupon.png?alt=media&token=08e8c3b0-0d5f-4b94-8c26-463393c8191d", hint: "burger" },
  { id: 5, name: "Latte Coffee", brand: "Starbucks", cost: 13, image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2FCaffe%20latte%20Starbucks.webp?alt=media&token=082279ab-4334-4385-9296-ec804305f1b1", hint: "coffee shop" },
  { id: 6, name: "30 USDC Cupon", brand: "Hipermaxi", cost: 30, image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2FHipermaxi%20cupon.png?alt=media&token=2082c2cd-baa7-4417-8fca-fd4f1db8228e", hint: "supermarket" },
  { id: 7, name: "Running Shoes", brand: "Nike", cost: 32, image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2F995a4e69-4c85-455d-b556-c43ab3a232c0.jpg?alt=media&token=dbb3d2df-a9c6-4468-b1ad-d75231aea19e", hint: "sports apparel" },
  { id: 8, name: "10 USDC Cupon", brand: "Farmacorp", cost: 10, image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2FFarmacorp%20logo.jpg?alt=media&token=feb5a114-d234-4f10-aa67-a5ba292dce1e", hint: "pharmacy" },
  { id: 9, name: "One Ride", brand: "Uber", cost: 10, image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2FUber%20logo.jpg?alt=media&token=9bec16b7-594b-439d-8298-fc7ea87253b6", hint: "ride share" },
];

const untransferableRewards: Reward[] = [
    { id: 10, name: "Trip to Uyuni, Bolivia", cost: 5000, description: "A once-in-a-lifetime funded trip.", image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2FUyuni%20trip.jpg?alt=media&token=bacabd99-ca3a-4f27-8317-5ffd2b40439a", hint: "salt flats", brand: "Boa", tier: "Platinum", usage: "In-store only" },
    { id: 11, name: "500GB Data", cost: 450, description: "Stay connected on us.", image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2Ftigo%20Megas.png?alt=media&token=48f5e268-d864-460e-92aa-3c01b0b2dce1", hint: "mobile data", brand: "Tigo", tier: "Silver", usage: "Online only" },
    { id: 12, name: "5 Days All-Inclusive in Miami", cost: 8000, description: "Enjoy a luxury stay in sunny Miami.", image: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2FMiami%20trip.jpg?alt=media&token=f90411bf-c1b4-44a2-a6be-1bc23ee143e0", hint: "miami beach", brand: "Boa", tier: "Gold", usage: "In-store only" },
];


export default function RewardsPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const context = React.useContext(AppContext);

  const [selectedReward, setSelectedReward] = React.useState<Reward | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [isGift, setIsGift] = React.useState(false);
  const [isUntransferable, setIsUntransferable] = React.useState(false);
  const [unwrappedStates, setUnwrappedStates] = React.useState<Record<number, boolean>>({});

  const wrapTimers = React.useRef<Record<number, NodeJS.Timeout>>({});

  React.useEffect(() => {
    return () => {
      // Cleanup timers when the component unmounts
      Object.values(wrapTimers.current).forEach(clearTimeout);
    };
  }, []);

  const handleToggleWrapped = (rewardId: number) => {
    // Clear any existing timer for this card
    if (wrapTimers.current[rewardId]) {
      clearTimeout(wrapTimers.current[rewardId]);
      delete wrapTimers.current[rewardId];
    }

    const isCurrentlyUnwrapped = unwrappedStates[rewardId];

    setUnwrappedStates(prev => ({
      ...prev,
      [rewardId]: !isCurrentlyUnwrapped
    }));

    // If we are unwrapping it, set a timer to re-wrap
    if (!isCurrentlyUnwrapped) {
      wrapTimers.current[rewardId] = setTimeout(() => {
        setUnwrappedStates(prev => ({ ...prev, [rewardId]: false }));
      }, 20000); // 20 seconds
    }
  };


  if (!context) {
    return null; // Or a loading spinner
  }

  const { showWelcomeGift, setShowWelcomeGift } = context;

  const handleRedeemClick = (reward: Reward, isGiftRedemption = false, isUntransferableRedemption = false) => {
    setSelectedReward(reward);
    setIsGift(isGiftRedemption);
    setIsUntransferable(isUntransferableRedemption);
    setShowConfirmDialog(true);
  };

  const handleConfirmRedemption = () => {
    if (context && selectedReward) {
        if (selectedReward.cost && !isGift && !isUntransferable) {
            context.updateBalance(context.balance - selectedReward.cost);
            context.addTransaction({
                type: 'redeem',
                description: `Redeemed ${selectedReward.name}`,
                amount: `-${selectedReward.cost} USDC`,
                icon: ShoppingCart,
                color: 'text-red-500',
            });
        } else {
             // It's an untransferable token or a free gift, treat it as an "earn" action
            context.addTransaction({
                type: isUntransferable ? 'redeem' : 'earn',
                description: `Redeemed ${selectedReward.name}`,
                amount: isGift ? 'Welcome Gift' : 'Untransferable',
                icon: Gift,
                color: 'text-green-500',
            });
        }
    }

    setShowConfirmDialog(false);
    setShowConfetti(true);
    setTimeout(() => {
        setShowSuccessDialog(true);
        setShowConfetti(false);
        setIsGift(false); // Reset gift status
        setIsUntransferable(false); // Reset untransferable status
    }, 2000); // Show confetti for 2 seconds
  };

  return (
    <>
      <div className="flex flex-col h-full text-white">
        {showConfetti && <Confetti />}
        
        <AppHeader title="Marketplace" description="Spend your USDC on great rewards." />

        <ScrollArea className="flex-1">
          <div className="px-6">
            <SearchBar />
            <RewardsAiAssistant />

            <Card className="my-4 btn-glass text-white border shadow-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FDYNEXA%20fondo%20facebook.png?alt=media&token=64d95ead-6b65-4634-9b72-c2a66b61117e"
                    alt="Dynexa Facebook background"
                    width={800}
                    height={300}
                    className="w-full h-auto object-cover"
                    data-ai-hint="promotional banner"
                />
            </Card>

            <div>
                <h2 className="text-xl font-semibold mb-4 mt-2">Featured Gift Tokens</h2>
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                    align: "start",
                    loop: true,
                    }}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    className="w-full mb-8"
                >
                    <CarouselContent>
                    {featuredRewards.map((offer) => (
                        <CarouselItem key={offer.id} className="basis-4/5">
                        <Card className="relative text-white overflow-hidden bg-white/5" onClick={() => handleRedeemClick(offer)}>
                            <Image
                            src={offer.image}
                            alt={offer.description || offer.name}
                            width={600}
                            height={400}
                            data-ai-hint={offer.hint}
                            className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50" />
                            <CardContent className="absolute inset-0 p-4 flex flex-col justify-end">
                            <h3 className="font-bold text-lg">{offer.name}</h3>
                            <p className="text-sm">{offer.description}</p>
                            </CardContent>
                        </Card>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                </Carousel>
            </div>
        
            <div>
                <h2 className="text-xl font-semibold mb-4">All Gift Tokens</h2>
                <div className="grid grid-cols-2 gap-4">
                    {rewards.map((reward) => (
                    <Card key={reward.id} className="flex flex-col bg-white/5">
                        <CardHeader className="p-0">
                        <Image
                            src={reward.image}
                            alt={reward.name}
                            width={400}
                            height={300}
                            data-ai-hint={reward.hint}
                            className="rounded-t-lg aspect-[4/3] object-cover"
                        />
                        </CardHeader>
                        <CardContent className="p-3 flex-1">
                            <h3 className="font-semibold text-sm leading-tight">{reward.name}</h3>
                            {reward.brand && <p className="text-xs text-white/70">{reward.brand}</p>}
                            <p className="text-white font-bold text-sm mt-1">{reward.cost} USDC</p>
                        </CardContent>
                        <CardFooter className="p-3 pt-0">
                        <Button variant="glass" className="w-full" onClick={() => handleRedeemClick(reward)}>Redeem</Button>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
            </div>

            <div className="pb-6 mt-8">
                <h2 className="text-xl font-semibold mb-2">Untransferable Gift Tokens</h2>
                <Alert className="mb-4 btn-glass">
                  <Info className="h-4 w-4 text-[#ffc700]" />
                  <AlertTitle className="text-[#ffc700]">How They Work</AlertTitle>
                  <AlertDescription className="text-white/70">
                    Untransferable tokens hide their true value, can only be used with the partner brand, and cannot be converted to USDC.
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-2 gap-4">
                    {untransferableRewards.map((reward) => {
                      const isUnwrapped = unwrappedStates[reward.id];
                      return (
                        <Card key={reward.id} className="flex flex-col bg-white/5">
                            <CardHeader className="p-0">
                            <Image
                                src={reward.image}
                                alt={reward.name}
                                width={400}
                                height={300}
                                data-ai-hint={reward.hint}
                                className="rounded-t-lg aspect-[4/3] object-cover"
                            />
                            </CardHeader>
                            <CardContent className="p-3 flex-1">
                                <div className="flex items-center text-white/70 text-xs mb-1">
                                    <Building className="h-3 w-3 mr-1.5" />
                                    <span>{reward.brand}</span>
                                </div>
                                <h3 className="font-semibold text-sm leading-tight">{reward.name}</h3>
                                <div className={cn("flex items-center text-white/70 text-sm mt-2 transition-all duration-200", isUnwrapped && "blur-0 opacity-100", !isUnwrapped && "blur-sm opacity-50")}>
                                    {isUnwrapped ? (
                                      <p className="text-white font-bold text-sm">≈ {reward.cost} USDC</p>
                                    ) : (
                                      <>
                                        <Lock className="h-3 w-3 mr-1.5" />
                                        <span>Untransferable Value</span>
                                      </>
                                    )}
                                </div>
                                {reward.tier && (
                                    <Badge variant="secondary" className="mt-2 capitalize bg-amber-500/10 text-amber-600 border-amber-500/20">
                                      <Star className="h-3 w-3 mr-1"/>{reward.tier} Tier
                                    </Badge>
                                )}
                            </CardContent>
                            <CardFooter className="p-3 pt-0 flex gap-2">
                                <Button variant={isUnwrapped ? "secondary" : "outline"} size="sm" className="w-full" onClick={() => handleToggleWrapped(reward.id)}>
                                  {isUnwrapped ? <EyeOff /> : <Eye />}
                                  {isUnwrapped ? 'Rewrap' : 'Wrap'}
                                </Button>
                                <Button variant="glass" className="w-full" size="sm" onClick={() => handleRedeemClick(reward, false, true)}>Redeem</Button>
                            </CardFooter>
                        </Card>
                      )
                    })}
                </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Redemption</AlertDialogTitle>
            <AlertDialogDescription>
                {isUntransferable ? (
                <>
                You are about to redeem an Untransferable Gift Token: <strong>{selectedReward?.name}</strong>.
                <br /><br />
                The value is hidden and can only be used with <strong>{selectedReward?.brand}</strong>. This action will generate a secure, one-time QR code to present at the point of sale.
                </>
              ) : (
                <>
                  Are you sure you want to redeem "{selectedReward?.name}"?
                  {selectedReward?.cost && !isGift && ` This will cost ${selectedReward.cost} USDC.`}
                  {isGift && " This special reward is free!"}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRedemption}>
                {isUntransferable ? 'Generate Secure QR' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-xs">
          <AlertDialogHeader className="items-center text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <AlertDialogTitle>Redemption Successful!</AlertDialogTitle>
            <AlertDialogDescription>
              You have successfully redeemed your reward. Enjoy!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full" onClick={() => setShowSuccessDialog(false)}>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <WelcomeGiftDialog 
        open={showWelcomeGift} 
        onOpenChange={setShowWelcomeGift} 
        onRedeem={handleRedeemClick} 
      />
    </>
  );
}

    