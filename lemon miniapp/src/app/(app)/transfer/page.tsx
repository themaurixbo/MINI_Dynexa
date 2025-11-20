
'use client';

import { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Send, CheckCircle2, Gift, ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { QrScannerDialog } from '@/components/qr-scanner-dialog';
import { AppContext } from '@/context/AppContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AppHeader } from '@/components/app-header';

const tokens = [
    { id: 'gift-token', name: 'GiftToken', description: 'Your loyalty & reward token' },
    { id: 'usdc', name: 'USDC', description: 'A stablecoin pegged to the US Dollar' },
];

const cryptoCurrencies = [
    { id: 'flare', name: 'Flare Token' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'bitcoin', name: 'Bitcoin' },
]

export default function TransferPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | undefined>();
  const [selectedGiftToken, setSelectedGiftToken] = useState<string | undefined>();
  const context = useContext(AppContext);

  const earnedTokens = context ? context.transactions.filter(t => t.type === 'earn') : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle transfer would go here
    setShowSuccess(true);
  };

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle swap would go here
    // For now, we can just log it
    console.log("Swapping tokens");
  };

  return (
    <>
      <div className="flex flex-col h-full text-white">
        <AppHeader title="Transfer & Swap" description="Send or exchange your Gift Tokens." />

        <ScrollArea className="flex-1">
          <main className="px-6 pb-6 space-y-6">
            <Card className="bg-white/5">
              <CardHeader>
                <CardTitle>Send Gift Token</CardTitle>
                <CardDescription className="text-white/70">Enter recipient details and amount to send.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipientId">Recipient ID or QR</Label>
                    <div className="flex gap-2">
                      <Input id="recipientId" placeholder="@username or wallet_id" required />
                      <Button variant="outline" size="icon" type="button" onClick={() => setShowScanner(true)}>
                        <QrCode className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="token">Token</Label>
                    <Select onValueChange={setSelectedToken} value={selectedToken}>
                      <SelectTrigger id="token" placeholder="Select a token">
                          <SelectValue placeholder="Select a token to transfer" />
                      </SelectTrigger>
                      <SelectContent>
                          {tokens.map(token => (
                              <SelectItem key={token.id} value={token.id}>
                                <div className="flex items-center gap-3">
                                  <Gift className="h-5 w-5" />
                                  <div>
                                      <p className="font-semibold">{token.name}</p>
                                      <p className="text-xs text-muted-foreground">{token.description}</p>
                                  </div>
                                </div>
                              </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedToken === 'usdc' && (
                      <div className="space-y-2 animate-in fade-in">
                          <Label htmlFor="amount">Amount (USDC)</Label>
                          <Input id="amount" type="number" placeholder="0.00" required />
                      </div>
                  )}

                  {selectedToken === 'gift-token' && (
                      <div className="space-y-2 animate-in fade-in">
                          <Label htmlFor="giftToken">Select Gift Token</Label>
                          <Select onValueChange={setSelectedGiftToken} value={selectedGiftToken}>
                              <SelectTrigger id="giftToken" placeholder="Select a gift token">
                                  <SelectValue placeholder="Select a gift token to transfer" />
                              </SelectTrigger>
                              <SelectContent>
                                  {earnedTokens.map((token, index) => (
                                      <SelectItem key={`${token.description}-${index}`} value={`${token.description}-${index}`}>
                                        <div className="flex items-center gap-3">
                                          <token.icon className="h-5 w-5" />
                                          <div>
                                              <p className="font-semibold">{token.description}</p>
                                              <p className="text-xs text-muted-foreground">{token.amount}</p>
                                          </div>
                                        </div>
                                      </SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                      </div>
                  )}

                  <Button type="submit" className="w-full" size="lg" variant="glass">
                    <Send className="mr-2 h-4 w-4" />
                    Send Gift Tokens
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5">
              <CardHeader>
                <CardTitle>Swap Gift Tokens</CardTitle>
                <CardDescription className="text-white/70">Exchange your Gift Tokens for other cryptocurrencies projects.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSwap} className="space-y-4">
                  <div className="grid grid-cols-5 gap-2 items-center">
                    <div className="col-span-2 space-y-1">
                      <Label htmlFor="from-token">From</Label>
                      <Select>
                          <SelectTrigger id="from-token">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usdc">USDC</SelectItem>
                          <SelectItem value="gift-token">Gift Tokens</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1 text-center pt-6">
                        <ArrowRightLeft className="h-5 w-5 mx-auto text-white/70" />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label htmlFor="to-crypto">To</Label>
                      <Select>
                        <SelectTrigger id="to-crypto">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {cryptoCurrencies.map(crypto => (
                            <SelectItem key={crypto.id} value={crypto.id}>{crypto.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="swap-amount">Amount</Label>
                    <Input id="swap-amount" type="number" placeholder="0.00" />
                  </div>
                  <Button type="submit" className="w-full" size="lg" variant="glass">
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Swap Gift Tokens
                  </Button>
                </form>
              </CardContent>
            </Card>
          </main>
        </ScrollArea>
      </div>

      <QrScannerDialog 
        open={showScanner} 
        onOpenChange={setShowScanner}
      />

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-xs">
          <AlertDialogHeader className="items-center text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <AlertDialogTitle>Transfer Successful!</AlertDialogTitle>
            <AlertDialogDescription>
              You have successfully sent Gift Tokens.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full">Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

    
