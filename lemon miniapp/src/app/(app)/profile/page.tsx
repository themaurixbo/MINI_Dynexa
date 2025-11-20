
'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Bell, LifeBuoy, LogOut } from "lucide-react";

const brands = [
  { name: 'Starbucks', progress: 75, level: 3, logoUrl: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2Flogo%20sturbucks.jpg?alt=media&token=f161dc2c-95e8-4020-aca6-5240788f4637", hint: "coffee shop logo" },
  { name: 'Nike', progress: 40, level: 2, logoUrl: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2F995a4e69-4c85-455d-b556-c43ab3a232c0.jpg?alt=media&token=dbb3d2df-a9c6-4468-b1ad-d75231aea19e", hint: "sports apparel logo" },
  { name: 'Amazon', progress: 90, level: 5, logoUrl: "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Cupones%2Flogo%20amazon.png?alt=media&token=beef1ee3-4e5a-409a-9149-5ea10ccbc596", hint: "ecommerce logo" },
];

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd also clear any session/token here
    router.push('/');
  };

  return (
    <div className="flex flex-col h-full text-white">
      <header className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4 border-4 border-white/20 shadow-lg">
            <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FDynexa%20Logo%20D%20transparente.png?alt=media&token=cab2d8ec-401e-4f09-9326-93a6fec11fca" alt="@THE4NDYKRONOX" data-ai-hint="user avatar"/>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">Andre Larrea</h1>
          <p className="text-white/70">@THE4NDYKRONOX</p>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 space-y-6 pb-6">
        <Card className="btn-glass">
          <CardHeader>
            <CardTitle>Brand Progress</CardTitle>
            <CardDescription className="text-white/70">Your loyalty levels with your favorite brands.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {brands.map(brand => (
              <div key={brand.name} className="flex items-center gap-4">
                <Image src={brand.logoUrl} alt={brand.name} width={40} height={40} className="rounded-full" data-ai-hint={brand.hint} />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold">{brand.name}</p>
                    <p className="text-xs font-medium text-white/70">Level {brand.level}</p>
                  </div>
                  <Progress value={brand.progress} className="h-2 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="btn-glass">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-white/10 p-0">
            <div className="flex items-center p-4">
              <Bell className="w-5 h-5 mr-4 text-white/70" />
              <div className="flex-1">
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-white/70">For transactions and rewards</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center p-4">
              <LifeBuoy className="w-5 h-5 mr-4 text-white/70" />
              <div className="flex-1">
                <h3 className="font-medium">Support Center</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-white/70" />
            </div>
            <div className="flex items-center p-4">
              <Shield className="w-5 h-5 mr-4 text-white/70" />
              <div className="flex-1">
                <h3 className="font-medium">Privacy & Security</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-white/70" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="btn-glass">
            <CardContent className="p-0">
                <Button onClick={handleLogout} variant="ghost" className="w-full justify-start p-4 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut className="w-5 h-5 mr-4" />
                  <span className="font-medium">Log Out</span>
                </Button>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
