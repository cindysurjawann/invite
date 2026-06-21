import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface GuestResult {
  id: string;
  name: string;
  send_invitation: boolean | null;
  send_rsvp: boolean | null;
}

interface GuestRowState {
  sendInvitation: boolean;
  sendRsvp: boolean;
  isSubmitting: boolean;
  success: boolean;
}

const AdminPage = () => {
  const [searchWhatsapp, setSearchWhatsapp] = useState('');
  const [results, setResults] = useState<GuestResult[]>([]);
  const [rowState, setRowState] = useState<Record<string, GuestRowState>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchWhatsapp.trim()) return;

    setIsSearching(true);
    setSearched(false);
    setResults([]);
    setRowState({});

    const { data } = await supabase
      .from('guests')
      .select('id, name, send_invitation, send_rsvp')
      .ilike('rsvp_whatsapp', `%${searchWhatsapp.trim()}%`);

    setIsSearching(false);
    setSearched(true);

    if (!data || data.length === 0) return;

    setResults(data);
    const initialState: Record<string, GuestRowState> = {};
    for (const g of data) {
      initialState[g.id] = {
        sendInvitation: g.send_invitation ?? false,
        sendRsvp: g.send_rsvp ?? false,
        isSubmitting: false,
        success: false,
      };
    }
    setRowState(initialState);
  };

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
            Cari Guest (WhatsApp)
          </label>
          <input
            type="text"
            value={searchWhatsapp}
            onChange={(e) => setSearchWhatsapp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Masukkan nomor WhatsApp"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 mb-3"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full bg-gray-800 text-white py-2 rounded-md text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {isSearching ? 'Mencari...' : 'Search'}
          </button>
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
              <div className="mb-4 space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">ID</p>
                <p className="text-xs font-mono text-gray-600 break-all">{guest.id}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide mt-3">Nama</p>
                <p className="text-base font-semibold text-gray-800">{guest.name}</p>
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
