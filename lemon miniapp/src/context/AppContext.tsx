
'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { Coffee, ShoppingCart, Send, PartyPopper, Gift } from 'lucide-react';

interface Transaction {
    type: string;
    description: string;
    amount: string;
    icon: React.ElementType;
    color: string;
    date: string;
}

interface AppContextType {
    balance: number;
    tokenBalance: number;
    transactions: Transaction[];
    updateBalance: (newBalance: number) => void;
    updateTokenBalance: (newBalance: number) => void;
    addTransaction: (newTransaction: Omit<Transaction, 'date'>) => void;
    level: number;
    xp: number;
    streak: number;
    missionsCompleted: number;
    showWelcomeGift: boolean;
    setShowWelcomeGift: (show: boolean) => void;
}

const initialTransactions: Transaction[] = [
    { type: 'earn', description: 'Reward from Starbucks', amount: '+5 USDC', icon: Coffee, color: 'text-green-500', date: 'Oct 26' },
    { type: 'spend', description: 'Hipermaxi Market', amount: '-9.99 USDC', icon: ShoppingCart, color: 'text-red-500', date: 'Oct 25' },
    { type: 'transfer', description: 'Sent to @jane_doe', amount: '-7 USDC', icon: Send, color: 'text-red-500', date: 'Oct 24' },
    { type: 'redeem', description: 'Redeemed Amazon Voucher', amount: '-50 USDC', icon: ShoppingCart, color: 'text-red-500', date: 'Oct 22' },
    { type: 'earn', description: 'Welcome Bonus', amount: '+5 USDC', icon: PartyPopper, color: 'text-green-500', date: 'Oct 20' },
    { type: 'earn', description: 'Feedback reward', amount: '+2 USDC', icon: Gift, color: 'text-green-500', date: 'Oct 19' },
];

const calculateInitialTokenBalance = (transactions: Transaction[]): number => {
    return transactions.filter(t => t.type === 'earn').length;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [balance, setBalance] = useState(560.75);
    const [tokenBalance, setTokenBalance] = useState(() => calculateInitialTokenBalance(initialTransactions));
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [level, setLevel] = useState(5);
    const [xp, setXp] = useState(1250);
    const [streak, setStreak] = useState(4);
    const [missionsCompleted, setMissionsCompleted] = useState(23);
    const [showWelcomeGift, setShowWelcomeGift] = useState(false);

    const updateBalance = (newBalance: number) => {
        setBalance(newBalance);
    };

    const updateTokenBalance = (newTokenBalance: number) => {
        setTokenBalance(newTokenBalance);
    };

    const addTransaction = (newTransaction: Omit<Transaction, 'date'>) => {
        const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        setTransactions(prevTransactions => [{...newTransaction, date }, ...prevTransactions]);
        if(newTransaction.type === 'earn') {
            setTokenBalance(prev => prev + 1);
        }
    };

    return (
        <AppContext.Provider value={{ 
            balance, 
            tokenBalance, 
            transactions, 
            updateBalance, 
            updateTokenBalance, 
            addTransaction,
            level,
            xp,
            streak,
            missionsCompleted,
            showWelcomeGift,
            setShowWelcomeGift,
        }}>
            {children}
        </AppContext.Provider>
    );
};
