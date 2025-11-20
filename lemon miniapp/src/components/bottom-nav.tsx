
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightLeft, Briefcase, Home, User, Trophy, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuestIcon } from "./quest-icon";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const userNavItems = [
  { href: "/missions", icon: Trophy, label: "Missions" },
  { href: "/transfer", icon: ArrowRightLeft, label: "Transfer" },
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/rewards", icon: ShoppingCart, label: "Marketplace" },
  { href: "/profile", icon: User, label: "Profile" },
];

const companyNavItems = [
    ...userNavItems,
    { href: "/company", icon: Briefcase, label: "Business" },
];


export function BottomNav() {
  const pathname = usePathname();
  const context = useContext(AppContext);
  const isCompanyPath = pathname.startsWith('/company');

  const navItems = isCompanyPath ? companyNavItems : userNavItems;

  const handleClick = (href: string) => {
    if (context) {
        if (href === '/rewards') {
            context.setShowWelcomeGift(true);
        }
    }
  };


  if (pathname.startsWith('/company')) {
     return (
        <nav className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-md backdrop-blur-lg rounded-full shadow-2xl border border-white/10">        <div className="flex items-center justify-around gap-2 px-6 py-3">
                {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                if (item.href !== '/company' && isCompanyPath) {
                    return null;
                }
                return (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 p-2 text-muted-foreground transition-colors hover:text-primary text-center",
                        isActive && "text-primary"
                    )}
                    >
                    <item.icon className="h-6 w-6" />
                    <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                );
                })}
            </div>
        </nav>
     );
  }

  const filteredNavItems = navItems.filter(item => item.href !== '/company');

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[95%] max-w-sm z-50">
        <nav className="bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
            <div className="mx-auto grid h-16 grid-cols-5 items-center justify-around px-2">
                {filteredNavItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => handleClick(item.href)}
                            className={cn(
                                "nav-item relative flex flex-col items-center justify-center gap-1 py-2 text-white/70 hover:text-white",
                                isActive && "text-white"
                            )}
                        >
                            <div className={cn(
                                "absolute inset-0 bg-white/10 rounded-full transition-all duration-300 scale-0 opacity-0",
                                isActive && "scale-100 opacity-100"
                            )}></div>
                            <item.icon className="h-6 w-6 z-10" />
                            <span className="text-[10px] font-medium z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    </div>
  );
}
