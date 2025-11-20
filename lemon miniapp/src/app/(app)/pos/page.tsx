'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PosPage() {
    const [scanned, setScanned] = useState(false);

    const handleScan = () => {
        setScanned(true);
        setTimeout(() => setScanned(false), 3000); // Reset after 3 seconds
    };

    return (
        <div className="flex flex-col h-full bg-primary text-primary-foreground">
            <header className="p-6">
                <h1 className="text-3xl font-bold text-center">POS Lite</h1>
            </header>
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="text-center w-full">
                    {!scanned ? (
                        <>
                            <p className="mb-8 text-lg opacity-80">
                                Scan a customer's QR code to validate and redeem.
                            </p>
                            <Button
                                onClick={handleScan}
                                className="h-64 w-64 rounded-full bg-white/20 hover:bg-white/30 text-white flex-col gap-4 text-lg font-semibold shadow-2xl animate-pulse"
                            >
                                <QrCode className="h-24 w-24" />
                                Scan & Validate
                            </Button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in-90">
                            <CheckCircle2 className="h-40 w-40 text-green-400 mb-4" />
                            <h2 className="text-4xl font-bold">Gift Token Valid!</h2>
                            <p className="mt-2 text-lg opacity-80">
                                500 USDC have been successfully redeemed.
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <footer className="p-4 text-center text-sm opacity-60">
                <p>Gift Token POS</p>
            </footer>
        </div>
    );
}
