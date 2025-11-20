
'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MyQrCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
}

export function MyQrCodeDialog({ open, onOpenChange, user }: MyQrCodeDialogProps) {
  const qrData = `user:${user.username}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}&bgcolor=2C194B&color=F1E4FF&qzone=1`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs">
        <DialogHeader className="text-center items-center">
          <DialogTitle className="text-2xl">{user.name}</DialogTitle>
          <DialogDescription>@{user.username}</DialogDescription>
        </DialogHeader>
        <div className="relative flex justify-center items-center py-4 my-4">
          <div className="absolute w-[250px] h-[250px] bg-primary/20 blur-2xl animate-pulse"></div>
          <div className="relative w-[250px] h-[250px] p-4 bg-primary/10 rounded-2xl border-2 border-accent/50 flex items-center justify-center">
            <Image 
              src={qrCodeUrl}
              width={250}
              height={250}
              alt="Your QR Code"
              className="rounded-lg"
              data-ai-hint="QR code"
            />
            <div className="absolute">
              <Avatar className="h-16 w-16 border-4 border-background shadow-lg">
                <AvatarImage src={user.avatarUrl} alt={`@${user.username}`} data-ai-hint="user avatar"/>
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <p className="text-center text-muted-foreground text-sm">
            Others can scan this code to send you Gift Tokens.
        </p>
      </DialogContent>
    </Dialog>
  );
}
