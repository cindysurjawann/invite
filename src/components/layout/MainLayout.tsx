import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../config/wedding-config';
import MusicPlayer from '../features/MusicPlayer';
import Footer from './Footer';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { ErrorBoundary } from 'react-error-boundary';
import BibleVerses from '../sections/BibleVerses';
import SectionNav from '../navigation/SectionNav';
import FloatingFlowers from '../ui/FloatingFlowers';

interface MainLayoutProps {
  children: React.ReactNode;
  guestName?: string;
  sectionIds?: string[];
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" className="p-8 text-center bg-[#edf5e4]">
      <h2 className="text-2xl font-bold text-[#1c3d1c] mb-4">Something went wrong</h2>
      <p className="text-[#1c3d1c]/80">{error.message}</p>
    </div>
  );
}

export default function MainLayout({ children, guestName, sectionIds }: MainLayoutProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [_isLoading, setIsLoading] = useState(true);

  const handleStartExperience = () => {
    setHasInteracted(true);
    setIsPlaying(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasInteracted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [hasInteracted]);

  if (!hasInteracted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-[url('/images/background/garden.png')] bg-cover bg-center">
        {/* Floating ornament top-left */}
        <motion.img
          src="/images/pattern/garden-rose.svg"
          alt=""
          className="absolute top-[8%] left-[4%] w-16 md:w-20 opacity-50 pointer-events-none"
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        {/* Floating ornament top-right */}
        <motion.img
          src="/images/pattern/garden-leaf.svg"
          alt=""
          className="absolute top-[5%] right-[6%] w-14 md:w-18 opacity-45 pointer-events-none"
          animate={{ y: [0, -14, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1 }}
        />
        {/* Floating ornament bottom-right */}
        <motion.img
          src="/images/pattern/garden-wildflower.svg"
          alt=""
          className="absolute bottom-[10%] right-[5%] w-20 md:w-24 opacity-50 pointer-events-none"
          animate={{ y: [0, -20, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 9, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2 }}
        />
        {/* Floating ornament bottom-left */}
        <motion.img
          src="/images/pattern/garden-rose.svg"
          alt=""
          className="absolute bottom-[8%] left-[8%] w-14 opacity-40 pointer-events-none scale-x-[-1]"
          animate={{ y: [0, -12, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.5 }}
        />

        <div className="relative z-10 text-center p-8 max-w-xl mx-auto">
          <motion.div
            className="relative p-8 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(200, 150, 30, 0.30)',
              boxShadow: '0 0 60px rgba(200, 150, 30, 0.12), inset 0 0 30px rgba(200, 150, 30, 0.04)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Amber glow inside card */}
            <div className="absolute inset-0 rounded-2xl animate-glow pointer-events-none" />

            {/* Corner rose decorations */}
            <img
              src="/images/pattern/garden-rose.svg"
              alt=""
              className="absolute -top-3 -left-3 w-12 opacity-40 pointer-events-none"
            />
            <img
              src="/images/pattern/garden-rose.svg"
              alt=""
              className="absolute -bottom-3 -right-3 w-12 opacity-40 pointer-events-none rotate-180"
            />

            <h3 className="text-lg text-[#1c3d1c]/80 mb-4 font-light tracking-wider">
              {guestName ? `Dear ${guestName},` : 'You are invited to our wedding.'}
            </h3>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1c3d1c] mb-6 leading-tight">
              {guestName ? `We are getting married!` : `${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}`}
            </h1>
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStartExperience}
              className="relative w-full px-8 py-5 rounded-full overflow-hidden font-semibold tracking-widest text-sm uppercase text-white animate-btn-glow"
              style={{
                background: 'linear-gradient(135deg, #b8841a 0%, #e8c050 45%, #c8961e 100%)',
              }}
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 pointer-events-none animate-btn-shimmer"
                style={{
                  background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.38) 50%, transparent 80%)',
                  width: '60%',
                }}
              />
              {/* Envelope icon + label */}
              <span className="relative flex items-center justify-center gap-3">
                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                  <rect x="0.75" y="0.75" width="18.5" height="13.5" rx="1.75" stroke="white" strokeWidth="1.5"/>
                  <path d="M1.5 1.5L10 8.5L18.5 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Open Invitation
              </span>
            </motion.button>
            {guestName && (
              <p className="text-xs text-[#1c3d1c]/50 mt-3 font-light italic">
                We apologize if there is any error in the spelling of your name.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Head>
        <title>{`${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name} Wedding`}</title>
        <meta name="description" content={`Wedding invitation for ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}`} />
      </Head>

      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <div className="relative overflow-x-hidden">

        {/* Fixed full-page garden background */}
        <div className="fixed inset-0 bg-[url('/images/background/garden.png')] bg-cover bg-center z-0" />
        {/* Readability overlay */}
        <div className="fixed inset-0 bg-black/30 z-0" />

        {/* Enchanted Garden Pattern Background */}
        <div
          className="fixed inset-0 bg-[url('/images/pattern/garden-pattern.svg')] bg-repeat bg-[length:200px] opacity-10 animate-move-bg z-10"
          style={{ mixBlendMode: 'multiply' }}
        />

        {/* Floating Flowers */}
        <FloatingFlowers />

        {/* Main Content */}
        <div className="relative z-30">
          {React.Children.map(children, (child, index) => (
            <section id={sectionIds?.[index]} className="relative">
              {child}
            </section>
          ))}
          <div>
            <BibleVerses />
          </div>
          <Footer />
        </div>
      </div>
      <SectionNav />
    </ErrorBoundary>
  );
}
