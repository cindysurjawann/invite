import { useState } from 'react';
import Image from 'next/image';
import { weddingConfig } from '@/config/wedding-config';
import CandleLight from '@/components/ui/CandleLight';

export default function DigitalEnvelope() {
  const [copiedText, setCopiedText] = useState<string>('');

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <section
      className="relative py-8 md:py-20 overflow-hidden"
    >
      <CandleLight glowAt="60% 55%" intensity={0.17} />
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-6 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-serif mb-2 md:mb-4 text-white">
            Digital Envelope
          </h2>
          <p className="text-white/75 text-xs md:text-base">Your blessings mean a lot to us</p>
        </div>

        <div className="max-w-lg mx-auto">
          <div
            className="relative p-6 md:p-10 rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.90)',
              border: '1px solid rgba(200,150,30,0.25)',
              boxShadow: '0 8px 32px rgba(60,120,70,0.10)',
            }}
          >
            {/* Corner garden ornaments */}
            <div className="absolute -top-4 -left-4 w-20 h-20 opacity-35 pointer-events-none">
              <Image src="/images/pattern/garden-rose.svg" alt="" fill className="object-contain" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-35 pointer-events-none rotate-180">
              <Image src="/images/pattern/garden-wildflower.svg" alt="" fill className="object-contain" />
            </div>

            <h3 className="text-xl md:text-2xl font-serif mb-6 text-center text-[#1c3d1c]">
              Bank Transfer
            </h3>
            <div className="space-y-4">
              {weddingConfig.digitalEnvelope.banks.map((bank, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg"
                  style={{
                    background: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(200,150,30,0.18)',
                  }}
                >
                  <p className="font-medium text-lg mb-1 text-[#1c3d1c]">{bank.name}</p>
                  <p className="font-mono text-[#3d6b40] mb-1">{bank.accountNumber}</p>
                  <p className="text-sm text-[#557558] mb-3">a.n {bank.accountHolder}</p>
                  <button
                    onClick={() => handleCopy(bank.accountNumber)}
                    className="w-full py-2 px-4 rounded-lg transition-all font-medium text-sm"
                    style={{
                      background: copiedText === bank.accountNumber ? 'rgba(200,150,30,0.25)' : 'rgba(200,150,30,0.12)',
                      color: '#c8961e',
                      border: '1px solid rgba(200,150,30,0.25)',
                    }}
                  >
                    {copiedText === bank.accountNumber ? '✓ Copied!' : 'Copy Number'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
