import { motion } from 'framer-motion';
import { scrollAnimation, viewportSettings } from '../animations/scrollAnimations';
import CandleLight from '../ui/CandleLight';

const verses = [
  {
    reference: '1 Corinthians 13:4–8',
    text: 'Love is patient and kind; love does not envy or boast; it is not arrogant or rude. It does not insist on its own way; it is not irritable or resentful; it does not rejoice at wrongdoing, but rejoices with the truth. Love bears all things, believes all things, hopes all things, endures all things.',
  }
];

const BibleVerses = () => {
  return (
    <motion.section
      className="relative py-6 overflow-hidden"
      variants={scrollAnimation}
      initial="offscreen"
      whileInView="onscreen"
      viewport={viewportSettings}
    >
      <CandleLight glowAt="50% 50%" intensity={0.18} />
      <div className="mx-auto px-6 max-w-md relative" style={{ zIndex: 2 }}>
        <div className="flex flex-col items-center gap-5">
          {/* Decorative garden ornament above verse */}
          <motion.img
            src="/images/pattern/garden-wildflower.svg"
            alt=""
            className="w-16 opacity-40"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />

          {verses.map((verse, i) => (
            <div key={verse.reference} className="flex flex-col items-center gap-5 w-full">
              <motion.blockquote
                className="text-center"
                variants={scrollAnimation}
                initial="offscreen"
                whileInView="onscreen"
                viewport={viewportSettings}
                transition={{ delay: i * 0.15 }}
              >
                <p className="text-white/85 text-xs italic leading-relaxed tracking-wide">
                  <span className="font-serif text-2xl leading-none text-[#c8961e]/70 not-italic align-bottom mr-0.5">"</span>
                  {verse.text}
                </p>
                <footer className="mt-2 text-[10px] font-medium tracking-widest uppercase text-[#c8961e]/80">
                  — {verse.reference}
                </footer>
              </motion.blockquote>

              {i < verses.length - 1 && (
                <div className="flex items-center gap-2 w-28">
                  <div className="flex-1 h-px bg-[#c8961e]/20" />
                  <svg className="w-2.5 h-3.5 text-[#c8961e]/30 flex-shrink-0" viewBox="0 0 12 16" fill="currentColor">
                    <rect x="5" y="0" width="2" height="16" />
                    <rect x="0" y="4" width="12" height="2" />
                  </svg>
                  <div className="flex-1 h-px bg-[#c8961e]/20" />
                </div>
              )}
            </div>
          ))}

          {/* Decorative divider */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <div className="flex-1 h-px bg-[#c8961e]/15" />
            <img src="/images/pattern/garden-rose.svg" alt="" className="w-6 opacity-30" />
            <div className="flex-1 h-px bg-[#c8961e]/15" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default BibleVerses;
