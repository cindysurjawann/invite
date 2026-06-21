import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <motion.div
      className="relative flex flex-col items-center py-5 px-4 overflow-visible"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Top wave line — path draws in on scroll */}
      <svg
        className="w-full max-w-sm h-5 mb-2"
        viewBox="0 0 400 20"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0,10 Q50,2 100,10 Q150,18 200,10 Q250,2 300,10 Q350,18 400,10"
          stroke="rgba(200,150,30,0.4)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>

      {/* Central botanical composition */}
      <motion.div
        className="relative flex items-center justify-center gap-2 my-1"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ambient golden glow */}
        <div className="absolute w-20 h-20 rounded-full bg-[#c8961e]/15 blur-2xl pointer-events-none" />

        {/* Left leaf */}
        <motion.img
          src="/images/pattern/garden-leaf.svg"
          alt=""
          className="w-8 h-8 opacity-55 scale-x-[-1] flex-shrink-0"
          animate={{ rotate: [-6, 6, -6], y: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        {/* Left rose */}
        <motion.img
          src="/images/pattern/garden-rose.svg"
          alt=""
          className="w-7 h-7 opacity-60 scale-x-[-1] flex-shrink-0"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.4 }}
        />

        {/* Center wildflower — larger, glowing */}
        <motion.img
          src="/images/pattern/garden-wildflower.svg"
          alt=""
          className="w-14 h-14 opacity-80 flex-shrink-0 relative z-10"
          animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />

        {/* Right rose */}
        <motion.img
          src="/images/pattern/garden-rose.svg"
          alt=""
          className="w-7 h-7 opacity-60 flex-shrink-0"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.7 }}
        />
        {/* Right leaf */}
        <motion.img
          src="/images/pattern/garden-leaf.svg"
          alt=""
          className="w-8 h-8 opacity-55 flex-shrink-0"
          animate={{ rotate: [6, -6, 6], y: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.9 }}
        />
      </motion.div>

      {/* Bottom wave line — inverted, delayed */}
      <svg
        className="w-full max-w-sm h-5 mt-2"
        viewBox="0 0 400 20"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0,10 Q50,18 100,10 Q150,2 200,10 Q250,18 300,10 Q350,2 400,10"
          stroke="rgba(200,150,30,0.4)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
        />
      </svg>

      {/* Centered accent dots */}
      <motion.div
        className="flex items-center gap-1.5 mt-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="w-1 h-1 rounded-full bg-[#c8961e]/35" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#c8961e]/55" />
        <div className="w-1 h-1 rounded-full bg-[#c8961e]/35" />
      </motion.div>
    </motion.div>
  );
}
