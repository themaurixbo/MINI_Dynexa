
'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const ConfettiPiece = ({ id }: { id: number }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 10 + 5;
    const rotation = Math.random() * 360;
    const delay = Math.random() * 2;
    const duration = Math.random() * 3 + 2;
    const colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    setStyle({
      left: `${x}vw`,
      top: `-20px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      transform: `rotate(${rotation}deg)`,
      animation: `fall ${duration}s ${delay}s linear forwards`,
      opacity: 1,
    });
  }, []);

  return <div style={style} className="absolute" />;
};

export const Confetti = () => {
    const [pieces, setPieces] = useState<number[]>([]);

    useEffect(() => {
        const newPieces = Array.from({ length: 150 }, (_, i) => i);
        setPieces(newPieces);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-hidden">
            <style>
                {`
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                `}
            </style>
            {pieces.map((id) => <ConfettiPiece key={id} id={id} />)}
        </div>
    );
};
