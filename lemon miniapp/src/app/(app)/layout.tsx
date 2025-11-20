import { BottomNav } from '@/components/bottom-nav';
import { AppProvider } from '@/context/AppContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
        <div 
          className="flex-1 flex flex-col overflow-hidden h-full"
          style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FBackground%20Dynexa.png?alt=media&token=0cba1f29-8e20-4923-b099-c915b27fc7ed')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <main className="flex-1 overflow-y-auto">
              {children}
          </main>
          <BottomNav />
        </div>
    </AppProvider>
  );
}
