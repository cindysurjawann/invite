import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/wedding-config';
import { scrollAnimation, viewportSettings } from '../animations/scrollAnimations';

interface HeroProps {
  guestName?: string;
}

export default function Hero({ guestName }: HeroProps) {
  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20"
      variants={scrollAnimation}
      initial="offscreen"
      whileInView="onscreen"
      viewport={viewportSettings}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/background/garden.png')] bg-cover bg-center bg-no-repeat">
        {/* Very subtle daytime overlay — reduced so bg shows through */}
        <div className="absolute inset-0 bg-black/18" />
        {/* Warm amber lantern glow at center */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 52%, rgba(200,150,30,0.22) 0%, transparent 65%)' }}
        />

        {/* Floating Garden Ornaments */}
        <motion.img
          src="/images/pattern/garden-rose.svg"
          alt=""
          className="absolute top-[10%] left-[5%] w-16 md:w-20 opacity-75 z-20"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -38, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        <motion.img
          src="/images/pattern/garden-leaf.svg"
          alt=""
          className="absolute top-[18%] right-[8%] w-20 md:w-24 opacity-70 z-20"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -28, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1 }}
        />
        <motion.img
          src="/images/pattern/garden-wildflower.svg"
          alt=""
          className="absolute bottom-[15%] left-[12%] w-24 md:w-28 opacity-72 z-20"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -45, 0], rotate: [0, 18, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2 }}
        />
        <motion.img
          src="/images/pattern/garden-rose.svg"
          alt=""
          className="absolute top-[6%] right-[22%] w-12 md:w-14 opacity-60 z-20 scale-x-[-1]"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -22, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.img
          src="/images/pattern/garden-leaf.svg"
          alt=""
          className="absolute bottom-[6%] right-[6%] w-16 md:w-20 opacity-65 z-20"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -32, 0], rotate: [0, -14, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 }}
        />
        {/* Extra rose bottom-right area */}
        <motion.img
          src="/images/pattern/garden-wildflower.svg"
          alt=""
          className="absolute top-[35%] left-[2%] w-14 opacity-50 z-20"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden rounded-2xl p-6"
          style={{
            background: 'rgba(255, 255, 255, 0.70)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(200, 150, 30, 0.35)',
            boxShadow: '0 0 80px rgba(200, 150, 30, 0.18), inset 0 0 40px rgba(200, 150, 30, 0.06)'
          }}
        >
          {/* Corner decoration */}
          <div className="absolute -bottom-6 -right-6 w-18 opacity-55 animate-float-slow">
            <img src="/images/pattern/garden-rose.svg" alt="" className="w-16" />
          </div>
          <div className="absolute -top-6 -left-6 w-18 opacity-45 animate-float-slow" style={{ animationDelay: '2s' }}>
            <img src="/images/pattern/garden-leaf.svg" alt="" className="w-16" />
          </div>

          {/* Amber glow */}
          <div className="absolute inset-0 rounded-2xl animate-glow pointer-events-none" />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#f0d060]/30 top-[10%] left-[5%] animate-petal-float-1" />
            <div className="absolute w-1 h-1 rounded-full bg-[#e8c0c4]/25 top-[20%] left-[20%] animate-petal-float-2" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#f0d060]/25 top-[15%] right-[10%] animate-petal-float-3" />
            <div className="absolute w-1 h-1 rounded-full bg-[#e8c0c4]/20 bottom-[10%] left-[15%] animate-petal-float-4" />
          </div>

          {guestName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#1c3d1c]/85 text-xl mb-6 font-light"
            >
              Dear {guestName},
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#1c3d1c]/75 text-xl mb-4 font-light tracking-wide"
          >
            You are invited to our wedding.
          </motion.p>

          <motion.div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-4xl md:text-6xl font-serif text-[#1c3d1c]"
            >
              {weddingConfig.couple.groom.name}
            </motion.h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 100 }}
              className="text-2xl md:text-3xl text-[#c8961e]"
            >
              &
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="text-4xl md:text-6xl font-serif text-[#1c3d1c]"
            >
              {weddingConfig.couple.bride.name}
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-[#c8961e] text-lg mt-4 tracking-wider font-light"
          >
            {new Date(weddingConfig.event.pemberkatan.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#c8961e]/70"
      >
        <div className="animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </motion.section>
  );
}
