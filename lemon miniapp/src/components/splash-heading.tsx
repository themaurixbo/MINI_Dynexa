
'use client';

export function SplashHeading() {
  return (
    <h1
      className="text-gradient splash-heading splash-heading-underline font-semibold uppercase"
      style={{
        fontSize: 'clamp(14px, 1.9vh, 18px)',
        letterSpacing: '0.12em',
        lineHeight: 1.2,
        textShadow: '0 0 18px rgba(139, 92, 246, .25)',
        backgroundSize: '200% 200%',
      }}
    >
      GAMIFICATION
    </h1>
  );
}
