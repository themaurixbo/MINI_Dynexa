
'use client';

import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/AppContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, ArrowDownToLine, ChevronRight, Gift } from "lucide-react";
import { QrScannerDialog } from '@/components/qr-scanner-dialog';
import { MyQrCodeDialog } from '@/components/my-qr-code-dialog';
import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { authenticate, TransactionResult } from '@lemoncash/mini-app-sdk';


export default function DashboardPage() {
    
    const context = useContext(AppContext);
    const router = useRouter();
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [isMyQrOpen, setIsMyQrOpen] = useState(false);
const [wallet, setWallet] = useState<string | undefined>(undefined);

  const handleAuthentication = async () => {
    const result = await authenticate();
    if (result.result === TransactionResult.SUCCESS) {
      setWallet(result.data.wallet);
    }
    };

    useEffect(() => {
        handleAuthentication();
    }, []);

    if (!context) {
        return null; // or a loading spinner
    }

    const { balance, transactions } = context;
    const earnedTokensCount = transactions.filter(t => t.type === 'earn').length;
    
    const handleRedeemClick = () => {
        router.push('/rewards');
    };

    return (
        <>
        <div className="flex flex-col h-full">
            <AppHeader />

            <main className="flex-1 overflow-y-auto px-6 space-y-8 pb-6">
                
                <Card className="w-full bg-transparent border-none shadow-none">
                    <CardContent className="p-0">
                        <div className="flex justify-between items-center">
                            <div className="text-left">
                                <h2 className="text-4xl font-bold text-white whitespace-nowrap">
                                   {balance.toFixed(2)} DXA
                                </h2>
                                <div className="flex items-center gap-2 text-base text-white/80 mt-1">
                                    <span>≈ ${balance.toFixed(2)} USDC</span>
                                    <Image 
                                        src="https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FName%3DUSD%20Coin%20(USDC).png?alt=media&token=fcab8575-838c-4bdd-96b8-78298ef02efc"
                                        alt="USDC icon"
                                        width={16}
                                        height={16}
                                        data-ai-hint="coin"
                                    />
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <Image
                                    src="https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FMonedas.png?alt=media&token=f0b31c38-8b17-4e77-86a5-d0b9aed13eb8"
                                    alt="Coins"
                                    width={100}
                                    height={60}
                                    data-ai-hint="gold coins"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="glass" className="h-16 text-base" onClick={() => setIsScannerOpen(true)}>
                        <Send className="mr-2 h-5 w-5" />
                        Send
                    </Button>
                    <Button variant="glass" className="h-16 text-base" onClick={() => setIsMyQrOpen(true)}>
                        <ArrowDownToLine className="mr-2 h-5 w-5" />
                        Receive
                    </Button>
                </div>
                
                <Card className="w-full btn-glass cursor-pointer" onClick={() => router.push('/missions')}>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-black/20 rounded-lg">
                           <Gift className="h-6 w-6 text-white/80" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white">Gift Tokens Earned</h3>
                            <p className="text-sm text-white/70">You have earned {earnedTokensCount} tokens. See the details!</p>
                        </div>
                        <ChevronRight className="h-6 w-6 text-white/70" />
                    </CardContent>
                </Card>

                <Card className="btn-glass text-white border shadow-lg">
                    <CardHeader>
                        <CardTitle>Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {transactions.slice(0, 5).map((transaction, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="p-3 rounded-full bg-black/20 mr-4">
                                        <transaction.icon className="h-5 w-5 text-white/80" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{transaction.description}</p>
                                        <p className="text-sm text-white/70 capitalize">{transaction.type} &bull; {transaction.date}</p>
                                    </div>
                                    <p className={`font-semibold shrink-0 ${transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                        {transaction.amount}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

            </main>
            <QrScannerDialog open={isScannerOpen} onOpenChange={setIsScannerOpen} />
            <MyQrCodeDialog open={isMyQrOpen} onOpenChange={setIsMyQrOpen} user={{ name: "Andre Larrea", username: "THE4NDYKRONOX", avatarUrl: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FDynexa%20Logo%20D%20transparente.png?alt=media&token=cab2d8ec-401e-4f09-9326-93a6fec11fca" }} />
        </div>
        </>
    );
}
