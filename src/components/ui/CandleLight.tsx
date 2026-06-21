interface CandleLightProps {
  glowAt?: string;
  intensity?: number;
}

const FIREFLIES = [
  { top: '18%', left: '8%', delay: '0s', duration: '8s', size: 6 },
  { top: '62%', left: '85%', delay: '2.5s', duration: '10s', size: 5 },
  { top: '36%', left: '91%', delay: '4s', duration: '7s', size: 6 },
  { top: '77%', left: '17%', delay: '1s', duration: '9s', size: 5 },
  { top: '11%', left: '65%', delay: '3s', duration: '11s', size: 6 },
  { top: '50%', left: '3%', delay: '5.5s', duration: '8.5s', size: 5 },
  { top: '85%', left: '58%', delay: '6s', duration: '9.5s', size: 4 },
  { top: '28%', left: '46%', delay: '2s', duration: '12s', size: 4 },
];

export default function CandleLight({ glowAt = '50% 70%', intensity = 0.14 }: CandleLightProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Primary warm amber glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 55% at ${glowAt}, rgba(200,148,28,${intensity}) 0%, rgba(200,140,20,${intensity * 0.35}) 50%, transparent 75%)`
        }}
      />
      {/* Bright core */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 35% 28% at ${glowAt}, rgba(255,200,55,${intensity * 0.45}) 0%, transparent 60%)`
        }}
      />
      {/* Firefly sparks */}
      {FIREFLIES.map((f, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-firefly"
          style={{
            width: `${f.size}px`,
            height: `${f.size}px`,
            top: f.top,
            left: f.left,
            background: 'rgba(255, 218, 70, 0.85)',
            boxShadow: '0 0 5px 2px rgba(255, 200, 50, 0.55)',
            animationDuration: f.duration,
            animationDelay: f.delay,
          }}
        />
      ))}
    </div>
  );
}
