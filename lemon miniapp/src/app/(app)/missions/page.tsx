
'use client';

import { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Flame, QrCode, ScanLine, Share2, Star, Trophy } from "lucide-react";
import { ScrollArea } from '@/components/ui/scroll-area';
import { AppContext } from '@/context/AppContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from "lucide-react";
import { Confetti } from '@/components/confetti';
import { cn } from '@/lib/utils';
import { AppHeader } from '@/components/app-header';

const initialMissions = [
    { id: 1, title: 'First Scan', description: 'Make your first QR code scan at any partner store.', reward: 100, type: 'Scan QR', icon: QrCode, progress: 100, goal: 1, category: 'For You' },
    { id: 2, title: 'Coffee Lover', description: 'Visit Starbucks 3 times this week.', reward: 250, type: 'Visit', icon: Star, progress: 33, goal: 3, category: 'By Brand' },
    { id: 3, title: 'Share the Love', description: 'Refer a friend to the app.', reward: 500, type: 'Share', icon: Share2, progress: 0, goal: 1, category: 'Online' },
    { id: 4, title: 'Quick Survey', description: 'Tell us about your experience.', reward: 150, type: 'Survey', icon: ScanLine, progress: 0, goal: 1, category: 'Online' },
    { id: 5, title: 'Weekly Warrior', description: 'Complete 5 missions in one week.', reward: 1000, type: 'Challenge', icon: Trophy, progress: 60, goal: 5, category: 'For You' },
];

type Mission = typeof initialMissions[0];

export default function MissionsPage() {
    const context = useContext(AppContext);
    const [missions, setMissions] = useState<Mission[]>(initialMissions);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [claimedMission, setClaimedMission] = useState<Mission | null>(null);
    const [animatingOutId, setAnimatingOutId] = useState<number | null>(null);

    if (!context) {
        return null; // Or loading state
    }
    const { level, xp, streak } = context;
    const xpForNextLevel = 250 * Math.pow(1.5, level);

    const handleClaim = (mission: Mission) => {
        setClaimedMission(mission);
        setShowConfetti(true);
        setAnimatingOutId(mission.id);

        // In a real app, you'd update context/backend state here
        setTimeout(() => {
            setShowConfetti(false);
            setShowSuccess(true);
            setMissions(prevMissions => prevMissions.filter(m => m.id !== mission.id));
            setAnimatingOutId(null);
        }, 2500); // Sync with confetti and animation
    }

    const MissionCard = ({ mission }: { mission: Mission }) => (
        <div
            className={cn(
                "transition-all duration-500",
                animatingOutId === mission.id ? 'mission-card-exit' : 'mission-card-enter'
            )}
        >
            <Card className="bg-white/5">
                <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary rounded-lg">
                            <mission.icon className="h-6 w-6 text-secondary-foreground" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-white">{mission.title}</h3>
                                    <p className="text-sm text-white/70">{mission.description}</p>
                                </div>
                                <Badge variant="secondary" className="bg-[#ffc700]/10 text-[#ffc700] border-[#ffc700]/20 shrink-0">
                                    +{mission.reward} XP
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                                <Progress value={mission.progress} className="h-2 flex-1" />
                                <span className="text-xs text-white/70 font-medium">{Math.floor(mission.progress)}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <Badge variant="outline" className="capitalize text-white/80">{mission.type}</Badge>
                        {mission.progress >= 100 ? (
                            <Button size="sm" onClick={() => handleClaim(mission)}>
                                Claim Reward
                            </Button>
                        ) : (
                            <Button size="sm" variant="secondary" disabled>
                                In Progress
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <>
        <style>
            {`
            .mission-card-exit {
                opacity: 0;
                transform: translateX(-100%);
                max-height: 0;
                margin-bottom: 0 !important;
                padding: 0;
                overflow: hidden;
            }
            .mission-card-enter {
                max-height: 500px; /* Arbitrary large value */
            }
            .mission-list > * {
                transition: all 0.5s ease-in-out;
            }
            `}
        </style>
        {showConfetti && <Confetti />}
        <div className="flex flex-col h-full text-white">
            <AppHeader title="Missions" description="Complete tasks to earn rewards." />

            <main className="flex-1 flex flex-col overflow-hidden">
                <div className='px-6 space-y-4'>
                    <div className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                            <Flame className="h-6 w-6 text-accent" />
                            <span className="font-bold text-xl">{streak} Day Streak</span>
                        </div>
                        <p className="text-sm text-[#ffc700]">x1.2 Reward Multiplier</p>
                    </div>
                    <Card className="bg-white/5">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-semibold">Level {level}</p>
                                <p className="text-sm text-white/70">{xp.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP</p>
                            </div>
                            <Progress value={(xp / xpForNextLevel) * 100} />
                        </CardContent>
                    </Card>
                </div>
                
                <Tabs defaultValue="foryou" className="flex-1 flex flex-col mt-4">
                    <div className="px-6">
                    <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg h-auto p-1">
                        <TabsTrigger value="foryou" className="rounded-full data-[state=active]:bg-white/20 data-[state=active]:text-white">For You</TabsTrigger>
                        <TabsTrigger value="bybrand" className="rounded-full data-[state=active]:bg-white/20 data-[state=active]:text-white">By Brand</TabsTrigger>
                        <TabsTrigger value="online" className="rounded-full data-[state=active]:bg-white/20 data-[state=active]:text-white">Online</TabsTrigger>
                    </TabsList>
                    </div>
                    <ScrollArea className="flex-1 mt-4">
                        <div className="px-6 pb-6 space-y-4 mission-list">
                            <TabsContent value="foryou" className='space-y-4 mission-list'>
                                {missions.filter(m => m.category === 'For You').map(mission => <MissionCard key={mission.id} mission={mission} />)}
                            </TabsContent>
                            <TabsContent value="bybrand" className='space-y-4 mission-list'>
                                {missions.filter(m => m.category === 'By Brand').map(mission => <MissionCard key={mission.id} mission={mission} />)}
                            </TabsContent>
                            <TabsContent value="online" className='space-y-4 mission-list'>
                                {missions.filter(m => m.category === 'Online').map(mission => <MissionCard key={mission.id} mission={mission} />)}
                            </TabsContent>
                        </div>
                    </ScrollArea>
                </Tabs>
            </main>
        </div>
        <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
            <AlertDialogContent className="max-w-xs">
                <AlertDialogHeader className="items-center text-center">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                    <AlertDialogTitle>Mission Complete!</AlertDialogTitle>
                    <AlertDialogDescription>
                        You've earned +{claimedMission?.reward} XP. Keep it up!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="w-full">Awesome!</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
      </AlertDialog>
      </>
    );
}
