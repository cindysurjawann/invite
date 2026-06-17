import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollAnimation, viewportSettings } from '../animations/scrollAnimations';
import { supabase } from '@/lib/supabase';
import { activeTheme } from '@/config/theme-config';

interface Wish {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export default function GuestBook() {
  const [allWishes, setAllWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const wishesPerPage = 5;

  const totalPages = Math.ceil(allWishes.length / wishesPerPage);
  const wishes = allWishes.slice(
    (currentPage - 1) * wishesPerPage,
    currentPage * wishesPerPage
  );

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
      const { data } = await supabase
        .from('guests')
        .select('id, name, rsvp_wishes, rsvp_submitted_at')
        .not('rsvp_wishes', 'is', null)
        .order('rsvp_submitted_at', { ascending: false });

      setAllWishes(
        (data || []).map((m) => ({
          id: m.id,
          name: m.name,
          message: m.rsvp_wishes,
          created_at: m.rsvp_submitted_at,
        }))
      );
      setLoading(false);
    };

    fetchWishes();
  }, []);

  return (
    <section className="py-20" style={{ backgroundColor: activeTheme.secondary }}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={scrollAnimation}
          initial="offscreen"
          whileInView="onscreen"
          viewport={viewportSettings}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-4 text-gray-800">Wishes</h2>
          <p className="text-gray-600">What our guests say</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto" />
            </div>
          ) : wishes.length === 0 ? (
            <p className="text-center text-gray-400">No wishes yet.</p>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {wishes.map((wish) => (
                  <div key={wish.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-medium text-lg">
                          {wish.name[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{wish.name}</h3>
                          <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                            {formatDateWIB(wish.created_at)}
                          </span>
                        </div>
                        <p className="text-gray-600 whitespace-pre-line">{wish.message}</p>
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
                    className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
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
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                        } transition-colors shadow-sm`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
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
