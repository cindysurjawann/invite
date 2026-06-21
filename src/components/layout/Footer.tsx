import { weddingConfig } from '@/config/wedding-config';

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-6 pb-4"
      style={{
        background: 'linear-gradient(to bottom, #2a4e2e, #1a3520)',
        borderTop: '2px solid rgba(200,150,30,0.55)',
      }}
    >
      {/* Warm candle glow from top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(200,148,28,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Garden ornaments — corners */}
      <div className="absolute top-0 left-0 w-16 h-16 opacity-20 pointer-events-none">
        <img src="/images/pattern/garden-rose.svg" alt="" className="w-full h-full" />
      </div>
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-20 pointer-events-none"
        style={{ transform: 'scaleX(-1)' }}
      >
        <img src="/images/pattern/garden-leaf.svg" alt="" className="w-full h-full" />
      </div>

      <div className="relative container mx-auto px-4 text-center">
        {/* Label */}
        {/* Couple names */}
        <h3 className="text-xl md:text-2xl font-serif mb-2" style={{ color: 'rgba(255,255,255,0.88)' }}>
          {weddingConfig.couple.groom.name}
          <span className="mx-3 text-[#c8961e]">&</span>
          {weddingConfig.couple.bride.name}
        </h3>

        {/* Gold divider */}
        <div className="flex items-center gap-3 max-w-xs mx-auto mb-2">
          <div className="flex-1 h-px" style={{ background: 'rgba(200,150,30,0.40)' }} />
          <img src="/images/pattern/garden-wildflower.svg" alt="" className="w-4 h-4 opacity-60" />
          <div className="flex-1 h-px" style={{ background: 'rgba(200,150,30,0.40)' }} />
        </div>

        {/* Wedding date + Copyright */}
        <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>
          {new Date(weddingConfig.event.pemberkatan.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
          © {new Date().getFullYear()} · Made with ♥
        </p>
      </div>
    </footer>
  );
}
