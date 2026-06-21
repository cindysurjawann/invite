import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  HeartIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  PhotoIcon,
  GiftIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { activeTheme } from '@/config/theme-config';

const NAV_ITEMS = [
  { id: 'section-hero',     label: 'Home',    Icon: HomeIcon },
  { id: 'section-couple',   label: 'Couple',  Icon: HeartIcon },
  { id: 'section-event',    label: 'Event',   Icon: CalendarDaysIcon },
  { id: 'section-story',    label: 'Story',   Icon: BookOpenIcon },
  { id: 'section-gallery',  label: 'Gallery', Icon: PhotoIcon },
  { id: 'section-envelope', label: 'Gift',    Icon: GiftIcon },
  { id: 'section-rsvp',     label: 'RSVP',    Icon: EnvelopeIcon },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('section-hero');
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [mounted]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <AnimatePresence>
      {mounted && (
        <motion.nav
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ position: 'fixed', bottom: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 50, pointerEvents: 'none' }}
          aria-label="Section navigation"
        >
          <div
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              padding: '8px 10px',
              borderRadius: '9999px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: `1px solid ${activeTheme.accent}55`,
            }}
          >
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const isActive = activeSection === id;
              return (
                <div key={id} style={{ position: 'relative' }}>
                  <motion.button
                    onClick={() => scrollTo(id)}
                    onMouseEnter={() => setTooltip(id)}
                    onMouseLeave={() => setTooltip(null)}
                    onFocus={() => setTooltip(id)}
                    onBlur={() => setTooltip(null)}
                    whileTap={{ scale: 0.85 }}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '9999px',
                      border: 'none',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'background-color 0.3s',
                      backgroundColor: isActive ? activeTheme.primary : 'transparent',
                    }}
                    aria-label={label}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <Icon
                      style={{
                        width: '17px',
                        height: '17px',
                        color: isActive ? '#fff' : `${activeTheme.text}80`,
                        transition: 'color 0.3s',
                        strokeWidth: isActive ? 2.2 : 1.7,
                        flexShrink: 0,
                      }}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-ring"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '9999px',
                          boxShadow: `0 0 0 2px ${activeTheme.primary}55`,
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {tooltip === id && (
                      <motion.span
                        key="tip"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: 'absolute',
                          top: '-36px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          whiteSpace: 'nowrap',
                          fontSize: '10px',
                          fontWeight: 500,
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          pointerEvents: 'none',
                          background: activeTheme.primary,
                          color: '#fff',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
