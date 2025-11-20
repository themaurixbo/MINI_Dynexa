
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Gift, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const allNotifications = [
    { icon: Gift, title: "Reward Claimed!", description: "You claimed a 50% off coupon for Burger King.", time: "2h ago" },
    { icon: UserPlus, title: "New Referral", description: "Jane Smith used your referral code.", time: "1d ago" },
    { icon: Gift, title: "Mission Complete!", description: "You earned +1000 XP for completing 'Weekly Warrior'.", time: "3d ago" },
    { icon: UserPlus, title: "New Referral", description: "John Doe used your referral code.", time: "5d ago" },
];

const recentNotifications = [
    { icon: Gift, title: "Reward Claimed!", description: "You claimed a 50% off coupon for Burger King.", time: "2h ago" },
    { icon: UserPlus, title: "New Referral", description: "Jane Smith used your referral code.", time: "1d ago" },
];


const NotificationItem = ({ icon: Icon, title, description, time }: { icon: React.ElementType, title: string, description: string, time: string }) => (
    <div className="flex items-start gap-4 p-4">
        <div className="p-2 bg-secondary rounded-full">
            <Icon className="h-5 w-5 text-secondary-foreground" />
        </div>
        <div className="flex-1">
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <p className="text-xs text-muted-foreground">{time}</p>
    </div>
);

export function NotificationsSheet({ open, onOpenChange }: NotificationsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0">
        <SheetHeader className="p-4 relative text-center border-b">
          <SheetTitle className="text-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Notifications</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="all" className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg h-auto p-1">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-white/20 data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="recent" className="rounded-full data-[state=active]:bg-white/20 data-[state=active]:text-white">Recent</TabsTrigger>
            </TabsList>
          </div>
          <Separator className="mt-4"/>
          <TabsContent value="all" className="m-0">
            <div className="divide-y">
              {allNotifications.map((notification, index) => (
                  <NotificationItem key={index} {...notification} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recent" className="m-0">
            <div className="divide-y">
              {recentNotifications.map((notification, index) => (
                <NotificationItem key={index} {...notification} />
              ))}
            </div>
            {recentNotifications.length === 0 && (
                <p className="text-muted-foreground text-center p-8">No recent notifications.</p>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
