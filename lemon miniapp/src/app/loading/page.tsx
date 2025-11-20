
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoadingPage() {
  const router = useRouter();
  const newLogoSrc = "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FDynexa%20Logo%20D%20transparente.png?alt=media&token=cab2d8ec-401e-4f09-9326-93a6fec11fca";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/dashboard');
    }, 2500); 

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col h-full w-full items-center justify-between text-center p-6 sm:p-8 animate-in fade-in duration-500">
        <div className="w-full pt-12">
            <Image
                src={newLogoSrc}
                alt="Dynexa Logo"
                width={120}
                height={120}
                className="mx-auto animate-breathing"
                data-ai-hint="logo"
                unoptimized
            />
        </div>
        <div className="flex-grow flex items-center justify-center">
            <div
                className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                style={{ color: '#ffc700' }}
                role="status"
            >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
        </div>
        <div className="h-24" />
    </div>
  );
}
