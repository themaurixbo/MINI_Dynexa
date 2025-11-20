
'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Users, Gift, TrendingUp, CheckCircle, Clock, LogOut, DollarSign } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const chartData = [
  { month: "January", redeemed: 1860 },
  { month: "February", redeemed: 3050 },
  { month: "March", redeemed: 2370 },
  { month: "April", redeemed: 730 },
  { month: "May", redeemed: 2090 },
  { month: "June", redeemed: 2140 },
];

const chartConfig = {
  redeemed: {
    label: "Redeemed",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const campaigns = [
    { name: "Summer Kick-off", status: "Active", redeemed: 1204, issued: 5000 },
    { name: "Holiday Special", status: "Active", redeemed: 340, issued: 2000 },
    { name: "Spring Sale", status: "Finished", redeemed: 2500, issued: 2500 },
];

export default function CompanyDashboardPage() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
    };

    return (
        <div className="flex flex-col h-full">
            <header className="p-6 flex justify-between items-center gap-4">
                <div className="flex-grow">
                    <h1 className="text-3xl font-bold">Business Dashboard</h1>
                    <p className="text-xs text-muted-foreground">Your campaign performance overview.</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Campaign
                    </Button>
                     <div className="mr-4">
                        <Button variant="outline" size="icon" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-6 space-y-6 pb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Budget</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$20,000.00 USDC</div>
                        <p className="text-xs text-muted-foreground">Remaining campaign budget</p>
                        <div className="flex items-center gap-2 mt-2">
                            <Image src="https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FBlack%20and%20Gold%20Elegant%20Modern%20Simple%20Casino%20Logo.png?alt=media&token=f74d0cfa-bc40-4b71-8a50-50ce87dd4d8c" alt="Mimic Logo" width={20} height={20} className="rounded-full" data-ai-hint="company logo"/>
                            <p className="text-xs text-muted-foreground">manage by <span className="font-semibold text-[#ffc700]">Mimic APY 2%</span></p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tokens Redeemed</CardTitle>
                            <Gift className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">10,293</div>
                            <p className="text-xs text-muted-foreground">+12.1% from last month</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Redemption Rate</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="redeemed" fill="var(--color-redeemed)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Campaigns</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Campaign</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Redeemed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {campaigns.map(c => (
                                <TableRow key={c.name}>
                                    <TableCell className="font-medium">{c.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={c.status === 'Active' ? 'default' : 'secondary'} className={c.status === 'Active' ? 'bg-green-500/20 text-green-700' : ''}>
                                            {c.status === 'Active' ? <Clock className="mr-1 h-3 w-3" /> : <CheckCircle className="mr-1 h-3 w-3" />}
                                            {c.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{c.redeemed.toLocaleString()}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
