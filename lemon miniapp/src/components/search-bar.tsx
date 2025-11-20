
'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchBar() {
  return (
    <div className="py-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for rewards..."
          className="w-full rounded-full bg-white/10 border-white/20 backdrop-blur-lg pl-10 h-12 placeholder:text-white/70"
        />
      </div>
    </div>
  );
}
