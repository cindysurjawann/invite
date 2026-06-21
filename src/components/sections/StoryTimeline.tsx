import { motion } from 'framer-motion';
import Image from 'next/image';
import { weddingConfig } from '@/config/wedding-config';
import CandleLight from '../ui/CandleLight';

export default function StoryTimeline() {
  return (
    <section className="relative py-20 overflow-hidden">
      <CandleLight glowAt="80% 50%" intensity={0.14} />
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.4 }}
          transition={{
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1],
            scale: { type: "spring", stiffness: 100, damping: 15 }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-4 text-white">Our Love Story</h2>
          <p className="text-white/80">{weddingConfig.couple.firstMeet}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {weddingConfig.couple.loveStory.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50, scale: 0.9, rotate: index % 2 === 0 ? -5 : 5 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1],
                scale: { type: "spring", stiffness: 80, damping: 12 },
                rotate: { type: "spring", stiffness: 60, damping: 10 }
              }}
              exit={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50, scale: 0.9, rotate: index % 2 === 0 ? -5 : 5 }}
              className="flex flex-col md:flex-row items-center gap-8 mb-16"
            >
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-[0_0_30px_rgba(200,150,30,0.10)]"
                  style={{ border: '1px solid rgba(200,150,30,0.15)' }}>
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle amber vignette on images */}
                  <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(30,80,30,0.06) 100%)' }} />
                </div>
              </div>

              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <div
                  className="relative p-6 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.90)',
                    border: '1px solid rgba(200,150,30,0.22)',
                    boxShadow: '0 4px 24px rgba(60,120,70,0.10)'
                  }}
                >
                  {/* Corner ornaments */}
                  <div className="absolute -top-3 -left-3 w-14 h-14 opacity-30 pointer-events-none">
                    <img src="/images/pattern/garden-rose.svg" alt="" className="w-full h-full" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-14 h-14 opacity-30 pointer-events-none rotate-180">
                    <img src="/images/pattern/garden-leaf.svg" alt="" className="w-full h-full" />
                  </div>

                  <span className="text-sm text-[#c8961e]/80 tracking-widest uppercase font-medium">{story.date}</span>
                  <h3 className="text-2xl font-serif mb-3 text-[#1c3d1c]">{story.title}</h3>
                  <p className="text-[#3d6b40] leading-relaxed">{story.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
