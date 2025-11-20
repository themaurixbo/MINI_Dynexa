
import Image from 'next/image';

export const Logo = (props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) => {
    const src = "https://firebasestorage.googleapis.com/v0/b/gift-token-tlaxb.firebasestorage.app/o/Logo%20Dynexa%20fondo%20transparente%20con%20nombre.png?alt=media&token=0e1e7fb4-0f8e-4243-b45f-79658b925dd1";
    return <Image src={src} alt="Dynexa Logo" width={200} height={80} data-ai-hint="logo" {...props} unoptimized />
};
