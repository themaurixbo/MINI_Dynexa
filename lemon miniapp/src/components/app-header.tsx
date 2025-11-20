
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { NotificationsSheet } from '@/components/notifications-sheet';

interface AppHeaderProps {
    title?: string;
    description?: string;
}

export function AppHeader({ title, description }: AppHeaderProps) {
    const router = useRouter();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    return (
        <>
            <header className="p-6">
                <div className="flex justify-end items-center">
                    <div className="flex items-center gap-4">
                        <Bell onClick={() => setIsNotificationsOpen(true)} className="h-6 w-6 text-white/80 cursor-pointer" />
                        <div onClick={() => router.push('/profile')} className="cursor-pointer">
                            <Avatar>
                                <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FDynexa%20Logo%20D%20transparente.png?alt=media&token=cab2d8ec-401e-4f09-9326-93a6fec11fca" alt="@THE4NDYKRONOX" data-ai-hint="user avatar" />
                                <AvatarFallback>AL</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </header>
            <NotificationsSheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen} />
        </>
    )
}
