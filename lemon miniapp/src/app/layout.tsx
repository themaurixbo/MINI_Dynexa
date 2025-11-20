import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Gift Token',
  description: 'Your Rewards, Reimagined.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="flex items-center justify-center min-h-screen p-0 sm:p-4">
          <div 
            className="relative w-full sm:max-w-[420px] aspect-[9/16] bg-transparent shadow-2xl overflow-hidden flex flex-col sm:rounded-[2.5rem] sm:border-8 border-black"
            style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FBackground%20Dynexa.png?alt=media&token=0cba1f29-8e20-4923-b099-c915b27fc7ed')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
