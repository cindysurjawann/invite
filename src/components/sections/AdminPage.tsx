import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { weddingConfig } from '@/config/wedding-config';

interface GuestResult {
  id: string;
  name: string;
  send_invitation: boolean | null;
  send_rsvp: boolean | null;
  rsvp_whatsapp: string | null;
  no_angpao: string | null;
}

interface GuestRowState {
  sendInvitation: boolean;
  sendRsvp: boolean;
  isSubmitting: boolean;
  success: boolean;
}

const AdminPage = () => {
  const [searchName, setSearchName] = useState('');
  const [suggestions, setSuggestions] = useState<Pick<GuestResult, 'id' | 'name'>[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [results, setResults] = useState<GuestResult[]>([]);
  const [rowState, setRowState] = useState<Record<string, GuestRowState>>({});
  const [searched, setSearched] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<Record<string, boolean>>({});

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsFetching(true);
    const { data } = await supabase
      .from('guests')
      .select('id, name')
      .ilike('name', `%${query.trim()}%`)
      .limit(10);
    setIsFetching(false);
    if (data && data.length > 0) {
      setSuggestions(data);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchName(val);
    setSearched(false);
    setResults([]);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const handleSelectSuggestion = async (guest: Pick<GuestResult, 'id' | 'name'>) => {
    setSearchName(guest.name);
    setShowSuggestions(false);
    setSuggestions([]);

    const { data } = await supabase
      .from('guests')
      .select('id, name, send_invitation, send_rsvp, rsvp_whatsapp, no_angpao')
      .eq('id', guest.id)
      .single();

    setSearched(true);
    if (!data) {
      setResults([]);
      setRowState({});
      return;
    }

    setResults([data]);
    setRowState({
      [data.id]: {
        sendInvitation: data.send_invitation ?? false,
        sendRsvp: data.send_rsvp ?? false,
        isSubmitting: false,
        success: false,
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (guestId: string) => {
    setRowState((prev) => ({
      ...prev,
      [guestId]: { ...prev[guestId], isSubmitting: true, success: false },
    }));

    const state = rowState[guestId];

    const { error } = await supabase
      .from('guests')
      .update({
        send_invitation: state.sendInvitation,
        send_rsvp: state.sendRsvp,
      })
      .eq('id', guestId);

    setRowState((prev) => ({
      ...prev,
      [guestId]: {
        ...prev[guestId],
        isSubmitting: false,
        success: !error,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Admin</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cari Guest (Nama)
          </label>
          <div ref={containerRef} className="relative">
            <input
              type="text"
              value={searchName}
              onChange={handleInputChange}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Ketik nama guest..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {isFetching && (
              <span className="absolute right-3 top-2.5 text-xs text-gray-400">Mencari...</span>
            )}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-52 overflow-y-auto">
                {suggestions.map((s) => (
                  <li
                    key={s.id}
                    onMouseDown={() => handleSelectSuggestion(s)}
                    className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {searched && results.length === 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
            Guest tidak ditemukan.
          </div>
        )}

        {results.map((guest) => {
          const state = rowState[guest.id];
          if (!state) return null;
          return (
            <div key={guest.id} className="bg-white rounded-lg shadow p-6 mb-4">
              <div className="mb-4 space-y-3">
                <div>
                  <p className="text-[10px] font-semibold text-black-400 uppercase tracking-widest mb-1">Link Invitation</p>
                  <div className="flex items-center gap-2 bg-gray-300 rounded px-2 py-1.5">
                    <p className="text-xs font-mono text-gray-700 break-all flex-1">{`https://invitation-vincen-cindy.vercel.app/?guest=${guest.id}`}</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(`https://invitation-vincen-cindy.vercel.app/?guest=${guest.id}`)}
                      className="shrink-0 text-xs px-2 py-1 bg-white hover:bg-gray-200 text-gray-600 border border-gray-200 rounded transition-colors"
                      title="Copy link"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-black-400 uppercase tracking-widest mb-1">Message Template</p>
                  <div className="flex items-start gap-2 bg-gray-300 rounded px-2 py-1.5">
                    <p className={`text-xs font-mono text-gray-700 flex-1 whitespace-pre-wrap${expandedMessages[guest.id] ? '' : ' line-clamp-3'}`}>{`Dear, ${guest.name}\n---------------------------\nDengan penuh rasa bahagia, kami ingin mengundang kamu/Anda untuk hadir dan menjadi bagian dari hari pernikahan kami pada ${new Date(weddingConfig.event.reception.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.\n\nSilakan kunjungi tautan undangan digital di bawah ini untuk informasi lengkap mengenai acara kami:\n🔗 https://invitation-vincen-cindy.vercel.app/?guest=${guest.id}\n\nMohon kesediaannya untuk mengisi RSVP pada link tersebut untuk mendapatkan QR Code yang akan digunakan sebagai akses masuk ke venue acara nanti.\n\nKehadiran serta doa restu di hari bahagia kami akan sangat berarti. Terima kasih banyak.\n\nSalam hangat,\nVincen & Cindy`}</p>
                    <div className="shrink-0 flex flex-col gap-1">
                      <button
                        onClick={() => setExpandedMessages(prev => ({ ...prev, [guest.id]: !prev[guest.id] }))}
                        className="text-xs px-2 py-1 bg-white hover:bg-gray-200 text-gray-600 border border-gray-200 rounded transition-colors"
                      >
                        {expandedMessages[guest.id] ? 'Less' : 'More'}
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(`Dear, ${guest.name}\n---------------------------\nDengan penuh rasa bahagia, kami ingin mengundang kamu/Anda untuk hadir dan menjadi bagian dari hari pernikahan kami pada ${new Date(weddingConfig.event.reception.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.\n\nSilakan kunjungi tautan undangan digital di bawah ini untuk informasi lengkap mengenai acara kami:\n🔗 https://invitation-vincen-cindy.vercel.app/?guest=${guest.id}\n\nMohon kesediaannya untuk *mengisi RSVP pada link tersebut* untuk mendapatkan *QR Code* yang akan digunakan sebagai akses masuk ke venue acara nanti.\n\nKehadiran serta doa restu di hari bahagia kami akan sangat berarti. Terima kasih banyak.\n\nSalam hangat,\nVincen & Cindy`)}
                        className="text-xs px-2 py-1 bg-white hover:bg-gray-200 text-gray-600 border border-gray-200 rounded transition-colors"
                        title="Copy message"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-black-400 uppercase tracking-widest mb-1">Nama</p>
                  <div className="flex items-center gap-2 bg-gray-300 rounded px-2 py-1.5">
                    <p className="text-xs font-mono text-gray-700">{guest.name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-black-400 uppercase tracking-widest mb-1">Whatsapp No</p>
                  <div className="flex items-center gap-2 bg-gray-300 rounded px-2 py-1.5">
                    <p className="text-xs font-mono text-gray-700">{guest.rsvp_whatsapp ?? '-'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-black-400 uppercase tracking-widest mb-1">Angpao No</p>
                  <div className="flex items-center gap-2 bg-gray-300 rounded px-2 py-1.5">
                    <p className="text-xs font-mono text-gray-700">{guest.no_angpao ?? '-'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={state.sendInvitation}
                    onChange={(e) =>
                      setRowState((prev) => ({
                        ...prev,
                        [guest.id]: { ...prev[guest.id], sendInvitation: e.target.checked, success: false },
                      }))
                    }
                    className="w-4 h-4 accent-gray-700"
                  />
                  <span className="text-sm text-gray-700">Send Invitation</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={state.sendRsvp}
                    onChange={(e) =>
                      setRowState((prev) => ({
                        ...prev,
                        [guest.id]: { ...prev[guest.id], sendRsvp: e.target.checked, success: false },
                      }))
                    }
                    className="w-4 h-4 accent-gray-700"
                  />
                  <span className="text-sm text-gray-700">Send RSVP</span>
                </label>
              </div>

              <button
                onClick={() => handleSubmit(guest.id)}
                disabled={state.isSubmitting}
                className="w-full bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {state.isSubmitting ? 'Menyimpan...' : 'Submit'}
              </button>

              {state.success && (
                <p className="mt-3 text-sm text-green-600 font-medium text-center">
                  Update berhasil
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPage;
