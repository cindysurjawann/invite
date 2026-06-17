import type { NextPage } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/sections/Hero';
import CoupleProfile from '@/components/sections/CoupleProfile';
import StoryTimeline from '@/components/sections/StoryTimeline';
import EventDetails from '@/components/sections/EventDetails';
import Gallery from '@/components/sections/Gallery';
import DigitalEnvelope from '@/components/sections/DigitalEnvelope';
import GuestBook from '@/components/sections/GuestBook';
import RSVP from '@/components/sections/RSVP';
import LiveStreaming from '@/components/sections/LiveStreaming';
// import ShareButton from '@/components/features/ShareButton';
import GiftRegistry from '@/components/sections/GiftRegistry';
import { ThemeProvider } from '@/contexts/ThemeContext';
import CountdownTimer from '@/components/features/CountdownTimer';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

const Home: NextPage = () => {
  const router = useRouter();
  const [guestName, setGuestName] = useState<string>('');
  const [guestId, setGuestId] = useState<string>('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const queryGuestId = router.query.guest;
    const legacyName = router.query.to;

    if (typeof queryGuestId === 'string') {
      supabase
        .from('guests')
        .select('name, access_count')
        .eq('id', queryGuestId)
        .single()
        .then(({ data }) => {
          if (!data?.name) {
            setIsBlocked(true);
            setIsLoading(false);
            return;
          }
          setGuestName(data.name);
          setGuestId(queryGuestId);
          supabase
            .from('guests')
            .update({
              accessed_at: new Date().toISOString(),
              access_count: (data.access_count ?? 0) + 1,
            })
            .eq('id', queryGuestId)
            .then(() => {});
          setIsLoading(false);
        });
    } else if (typeof legacyName === 'string') {
      setGuestName(decodeURIComponent(legacyName));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (isBlocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
        <p className="text-4xl mb-4">🔒</p>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Link Tidak Valid</h1>
        <p className="text-gray-500">Undangan ini tidak ditemukan. Silakan hubungi pengantin untuk mendapatkan link yang benar.</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <MainLayout guestName={guestName}>
        <Hero guestName={guestName} />
        <CoupleProfile />
        <CountdownTimer />
        <EventDetails />
        <StoryTimeline />
        <Gallery />
        <LiveStreaming />
        <DigitalEnvelope />
        <RSVP guestName={guestName} guestId={guestId} />
        <GuestBook />
        <GiftRegistry />
      </MainLayout>
    </ThemeProvider>
  );
};

export default Home;
