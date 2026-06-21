import { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

type ActiveMenu = 'search' | 'checkin';

interface GuestSimple {
  id: string;
  name: string;
  no_angpao: string | null;
}

// ── Search Guest tab ──────────────────────────────────────────────────────────

const SearchGuest = () => {
  const [searchName, setSearchName] = useState('');
  const [suggestions, setSuggestions] = useState<Pick<GuestSimple, 'id' | 'name'>[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [result, setResult] = useState<GuestSimple | null>(null);
  const [searched, setSearched] = useState(false);

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
    setResult(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const handleSelectSuggestion = async (guest: Pick<GuestSimple, 'id' | 'name'>) => {
    setSearchName(guest.name);
    setShowSuggestions(false);
    setSuggestions([]);

    const { data } = await supabase
      .from('guests')
      .select('id, name, no_angpao')
      .eq('id', guest.id)
      .single();

    setSearched(true);
    setResult(data ?? null);
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

  return (
    <>
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

      {searched && !result && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
          Guest tidak ditemukan.
        </div>
      )}

      {result && (
        <div className="bg-white rounded-lg shadow p-6 space-y-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Nama</p>
            <div className="bg-gray-100 rounded px-3 py-2">
              <p className="text-sm font-medium text-gray-800">{result.name}</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">No. Angpao</p>
            <div className="bg-gray-100 rounded px-3 py-2">
              <p className="text-sm font-mono text-gray-800">{result.no_angpao ?? '-'}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ── Guest Check In tab ────────────────────────────────────────────────────────

type ScanState = 'idle' | 'scanning' | 'loading' | 'success' | 'error';

const GuestCheckIn = () => {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [scannedGuest, setScannedGuest] = useState<GuestSimple | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const scannerRef = useRef<InstanceType<typeof import('html5-qrcode').Html5Qrcode> | null>(null);
  const scannerDivId = 'greeter-qr-reader';
  const isStartingRef = useRef(false);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();
        // state 2 = SCANNING, state 3 = PAUSED
        if (state === 2 || state === 3) {
          await scannerRef.current.stop();
        }
      } catch {
        // ignore stop errors
      }
      scannerRef.current = null;
    }
    isStartingRef.current = false;
  }, []);

  const handleScanSuccess = useCallback(async (decodedText: string) => {
    await stopScanner();
    setScanState('loading');

    const id = decodedText.trim();
    const { data } = await supabase
      .from('guests')
      .select('id, name, no_angpao')
      .eq('id', id)
      .single();

    if (!data) {
      setErrorMsg(`ID tidak ditemukan: ${id}`);
      setScanState('error');
    } else {
      setScannedGuest(data);
      setScanState('success');
    }
  }, [stopScanner]);

  const startScanner = useCallback(async () => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;
    setScanState('scanning');
    setScannedGuest(null);
    setErrorMsg('');

    const { Html5Qrcode } = await import('html5-qrcode');
    scannerRef.current = new Html5Qrcode(scannerDivId);

    try {
      await scannerRef.current.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        handleScanSuccess,
        () => {},
      );
    } catch {
      setErrorMsg('Kamera tidak bisa diakses. Pastikan izin kamera diberikan.');
      setScanState('error');
      scannerRef.current = null;
    }
    isStartingRef.current = false;
  }, [handleScanSuccess]);

  const handleReset = useCallback(async () => {
    await stopScanner();
    setScanState('idle');
    setScannedGuest(null);
    setErrorMsg('');
  }, [stopScanner]);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  return (
    <div className="space-y-4">
      {/* Scanner viewport — always mounted so Html5Qrcode can find the div */}
      <div
        id={scannerDivId}
        className={`rounded-lg overflow-hidden bg-gray-900 ${scanState === 'scanning' ? 'block' : 'hidden'}`}
        style={{ minHeight: 280 }}
      />

      {scanState === 'idle' && (
        <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm text-center">Tekan tombol di bawah untuk membuka kamera dan scan barcode / QR Code tamu.</p>
          <button
            onClick={startScanner}
            className="w-full bg-gray-800 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            Mulai Scan
          </button>
        </div>
      )}

      {scanState === 'scanning' && (
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Batal
          </button>
        </div>
      )}

      {scanState === 'loading' && (
        <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Mengambil data tamu...</p>
        </div>
      )}

      {scanState === 'success' && scannedGuest && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="text-center py-4">
            <p className="text-2xl font-bold text-gray-800">Welcome,</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{scannedGuest.name}</p>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">No. Angpao</p>
            <div className="bg-gray-100 rounded px-3 py-3">
              <p className="text-xl font-mono font-bold text-gray-800 text-center">{scannedGuest.no_angpao ?? '-'}</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-full bg-gray-800 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            Scan Berikutnya
          </button>
        </div>
      )}

      {scanState === 'error' && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600 text-center">
            {errorMsg}
          </div>
          <button
            onClick={handleReset}
            className="w-full bg-gray-800 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}
    </div>
  );
};

// ── Root component ────────────────────────────────────────────────────────────

const GreeterPage = () => {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('search');

  const menus: { key: ActiveMenu; label: string }[] = [
    { key: 'search', label: 'Search Guest' },
    { key: 'checkin', label: 'Guest Check In' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Greeter</h1>

        <div className="flex gap-1 bg-white rounded-lg shadow p-1 mb-6">
          {menus.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveMenu(m.key)}
              className={`flex-1 text-xs font-medium py-2 px-2 rounded-md transition-colors ${
                activeMenu === m.key
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {activeMenu === 'search' && <SearchGuest />}
        {activeMenu === 'checkin' && <GuestCheckIn />}
      </div>
    </div>
  );
};

export default GreeterPage;
