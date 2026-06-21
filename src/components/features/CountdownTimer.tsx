import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/wedding-config';
import { activeTheme } from '../../config/theme-config';
import { scrollAnimation, viewportSettings } from '../animations/scrollAnimations';
import CandleLight from '../ui/CandleLight';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(weddingConfig.event.pemberkatan.date) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'days', value: timeLeft.days },
    { label: 'hours', value: timeLeft.hours },
    { label: 'minutes', value: timeLeft.minutes },
    { label: 'seconds', value: timeLeft.seconds },
  ];

  if (!weddingConfig.specialFeatures.countdownTimer) {
    return null;
  }

  return (
    <motion.div
      className="relative pt-8 pb-16 overflow-hidden"
      variants={scrollAnimation}
      initial="offscreen"
      whileInView="onscreen"
      viewport={viewportSettings}
    >
      <CandleLight glowAt="50% 65%" intensity={0.14} />
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <motion.h2
          variants={scrollAnimation}
          initial="offscreen"
          whileInView="onscreen"
          viewport={viewportSettings}
          className="text-center text-2xl md:text-3xl font-serif mb-8 text-white"
        >
          Counting Down to Our Special Day
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {timeUnits.map(({ label, value }, index) => (
            <motion.div
              key={label}
              variants={scrollAnimation}
              initial="offscreen"
              whileInView="onscreen"
              viewport={viewportSettings}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div
                className="rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 text-center"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(200,150,30,0.28)',
                  boxShadow: '0 4px 20px rgba(60,120,70,0.10)',
                }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-[#c8961e]">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base capitalize text-[#3d6b40]">
                  {label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
