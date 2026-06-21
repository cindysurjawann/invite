import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollAnimation, viewportSettings } from '../animations/scrollAnimations';
import { supabase } from '@/lib/supabase';
import CandleLight from '../ui/CandleLight';

interface Wish {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export default function GuestBook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const wishesPerPage = 5;

  const totalPages = Math.ceil(totalCount / wishesPerPage);

  const formatDateWIB = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(/\./g, ':');
  };

  useEffect(() => {
    const fetchWishes = async () => {
      setLoading(true);
      const from = (currentPage - 1) * wishesPerPage;
      const to = currentPage * wishesPerPage - 1;

      const { data, count } = await supabase
        .from('guests')
        .select('id, name, rsvp_wishes, rsvp_submitted_at', { count: 'exact' })
        .not('rsvp_wishes', 'is', null)
        .order('rsvp_submitted_at', { ascending: false })
        .range(from, to);

      setWishes(
        (data || []).map((m) => ({
          id: m.id,
          name: m.name,
          message: m.rsvp_wishes,
          created_at: m.rsvp_submitted_at,
        }))
      );
      setTotalCount(count ?? 0);
      setLoading(false);
    };

    fetchWishes();
  }, [currentPage]);

  return (
    <section className="relative overflow-hidden" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <CandleLight glowAt="50% 85%" intensity={0.15} />
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <motion.div
          variants={scrollAnimation}
          initial="offscreen"
          whileInView="onscreen"
          viewport={viewportSettings}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-4 text-white">Wishes</h2>
          <p className="text-white/75">What our guests say</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c8961e] mx-auto" />
            </div>
          ) : wishes.length === 0 ? (
            <p className="text-center text-[#557558]">No wishes yet.</p>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="p-6 rounded-xl transition-shadow"
                    style={{
                      background: 'rgba(255, 255, 255, 0.88)',
                      border: '1px solid rgba(200,150,30,0.18)',
                      boxShadow: '0 2px 12px rgba(60,120,70,0.10)',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(200,150,30,0.25), rgba(232,192,196,0.20))',
                          border: '1px solid rgba(200,150,30,0.20)',
                        }}
                      >
                        <span className="font-medium text-lg" style={{ color: '#c8961e' }}>
                          {wish.name[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-[#1c3d1c]">{wish.name}</h3>
                          <span className="text-xs text-[#557558] ml-2 whitespace-nowrap">
                            {formatDateWIB(wish.created_at)}
                          </span>
                        </div>
                        <p className="text-[#3d6b40] whitespace-pre-line">{wish.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.80)',
                      border: '1px solid rgba(200,150,30,0.22)',
                      color: '#3d6b40',
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Previous</span>
                  </button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className="px-3 py-1 rounded-lg transition-colors text-sm"
                        style={currentPage === i + 1
                          ? { background: '#c8961e', color: '#1c3d1c', fontWeight: '600' }
                          : { background: 'rgba(255,255,255,0.80)', color: '#3d6b40', border: '1px solid rgba(200,150,30,0.22)' }
                        }
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.80)',
                      border: '1px solid rgba(200,150,30,0.22)',
                      color: '#3d6b40',
                    }}
                  >
                    <span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
