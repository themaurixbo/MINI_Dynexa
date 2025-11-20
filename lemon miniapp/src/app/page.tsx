'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';
import { Logo } from '@/components/logo';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Simulate login and redirect to the loading screen
    router.push('/loading');
  };

  const handleBusinessLogin = () => {
    router.push('/company');
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 flex items-center justify-center text-center px-4">
        <div className="w-48 animate-in fade-in-0 delay-150 duration-500 motion-safe:animate-logoFloat">
          <Logo />
        </div>
      </div>
      <div className="p-8 rounded-t-3xl">
        <div className="space-y-3">
          <Button onClick={handleLogin} variant="glass" className="w-full h-14 text-base font-semibold">
            <Image 
                src="https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2F2.png?alt=media&token=3cb3e8a6-9753-4acd-9786-963d6509c6a9"
                alt="Lemon Icon"
                width={24}
                height={24}
                className="mr-3"
                data-ai-hint="company logo"
            />
            Continue with LEMON
          </Button>
        </div>
        <div className="flex justify-center items-center gap-2 mt-4">
          <p className="text-xs text-muted-foreground">Powered by</p>
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2F1.png?alt=media&token=933df489-b919-4def-81c6-e2d9c416dd7b"
            alt="Lemon Logo"
            width={16}
            height={16}
            data-ai-hint="company logo"
          />
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2F3.png?alt=media&token=6149b10e-8bce-48bc-80b7-c4d12dabb294"
            alt="New Company Logo"
            width={16}
            height={16}
            data-ai-hint="company logo"
          />
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/botones%2FBlack%20and%20Gold%20Elegant%20Modern%20Simple%20Casino%20Logo.png?alt=media&token=f74d0cfa-bc40-4b71-8a50-50ce87dd4d8c"
            alt="New Company Logo"
            width={16}
            height={16}
            data-ai-hint="company logo"
          />
        </div>

        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground">Or</span>
            </div>
        </div>
        
        <Button onClick={handleBusinessLogin} variant="glass" className="w-full h-14 text-base font-semibold">
            <Briefcase className="mr-3 h-5 w-5" />
            Affiliate company
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-6 px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
