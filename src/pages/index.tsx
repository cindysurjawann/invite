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
import AdminPage from '@/components/sections/AdminPage';
import GreeterPage from '@/components/sections/GreeterPage';
import { ThemeProvider } from '@/contexts/ThemeContext';
import CountdownTimer from '@/components/features/CountdownTimer';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { weddingConfig } from '@/config/wedding-config';

const ADMIN_GUEST_ID = '3512df82-6520-4c99-9d74-e07eddcef977';
const GREETER_GUEST_ID = '7aec1951-4f48-4a4d-b4d2-05a312d05b69';

const Home: NextPage = () => {
  const router = useRouter();
  const [guestName, setGuestName] = useState<string>('');
  const [guestId, setGuestId] = useState<string>('');
  const [guestWhatsapp, setGuestWhatsapp] = useState<string>('');
  const [previousRsvp, setPreviousRsvp] = useState<{
    attendance: string;
    numberOfGuests: number;
    wishes: string;
  } | null>(null);
  const [rsvpEmailSent, setRsvpEmailSent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGreeter, setIsGreeter] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const queryGuestId = router.query.guest;
    const legacyName = router.query.to;

    if (typeof queryGuestId === 'string') {
      if (queryGuestId === ADMIN_GUEST_ID) {
        setIsAdmin(true);
        setIsLoading(false);
        return;
      }

      if (queryGuestId === GREETER_GUEST_ID) {
        setIsGreeter(true);
        setIsLoading(false);
        return;
      }

      supabase
        .from('guests')
        .select('name, access_count, rsvp_attendance, rsvp_guests_count, rsvp_wishes, rsvp_whatsapp, rsvp_submitted_at, send_rsvp')
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
          setGuestWhatsapp(data.rsvp_whatsapp ?? '');
          setRsvpEmailSent(data.send_rsvp ?? false);
          if (data.rsvp_submitted_at) {
            setPreviousRsvp({
              attendance: data.rsvp_attendance ?? '',
              numberOfGuests: data.rsvp_guests_count ?? 1,
              wishes: data.rsvp_wishes ?? '',
            });
          }
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
      setIsBlocked(true);
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

  if (isAdmin) {
    return <AdminPage />;
  }

  if (isGreeter) {
    return <GreeterPage />;
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

  const liveStreamEnabled = weddingConfig.specialFeatures.liveStreaming.enabled;
  const giftRegistryEnabled = weddingConfig.specialFeatures.giftRegistry.enabled;

  const sectionIds = [
    'section-hero',
    'section-couple',
    'section-countdown',
    'section-event',
    'section-story',
    'section-gallery',
    ...(liveStreamEnabled ? ['section-livestream'] : []),
    'section-envelope',
    'section-rsvp',
    'section-guestbook',
    ...(giftRegistryEnabled ? ['section-registry'] : []),
  ];

  return (
    <ThemeProvider>
      <MainLayout guestName={guestName} sectionIds={sectionIds}>
        <Hero guestName={guestName} />
        <CoupleProfile />
        <CountdownTimer />
        <EventDetails />
        <StoryTimeline />
        <Gallery />
        {liveStreamEnabled && <LiveStreaming />}
        <DigitalEnvelope />
        <RSVP guestName={guestName} guestId={guestId} guestWhatsapp={guestWhatsapp} previousRsvp={previousRsvp} rsvpEmailSent={rsvpEmailSent} />
        <GuestBook />
        {giftRegistryEnabled && <GiftRegistry />}
      </MainLayout>
    </ThemeProvider>
  );
};

export default Home;
