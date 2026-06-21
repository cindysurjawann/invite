import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding-config';
import { supabase } from '@/lib/supabase';
import CandleLight from '../ui/CandleLight';

interface RSVPProps {
  guestName?: string;
  guestId?: string;
  guestWhatsapp?: string;
  previousRsvp?: {
    attendance: string;
    numberOfGuests: number;
    wishes: string;
  } | null;
}

export default function RSVP({ guestName, guestId, guestWhatsapp, previousRsvp }: RSVPProps) {
  const [formData, setFormData] = useState({
    name: guestName || '',
    attendance: previousRsvp?.attendance || '',
    numberOfGuests: previousRsvp?.numberOfGuests || 1,
    wishes: previousRsvp?.wishes || '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!previousRsvp) return;
    setFormData((prev) => ({
      ...prev,
      attendance: previousRsvp.attendance,
      numberOfGuests: previousRsvp.numberOfGuests,
      wishes: previousRsvp.wishes,
    }));
  }, [previousRsvp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (guestId) {
      await supabase
        .from('guests')
        .update({
          rsvp_attendance: formData.attendance,
          rsvp_guests_count: formData.numberOfGuests,
          rsvp_wishes: formData.wishes,
          rsvp_submitted_at: new Date().toISOString(),
        })
        .eq('id', guestId);

      if (!previousRsvp) {
        await supabase.functions.invoke('send-rsvp-email', {
          body: {
            guestId,
            guestName: formData.name,
            whatsapp: guestWhatsapp,
            attendance: formData.attendance,
            numberOfGuests: formData.numberOfGuests,
            wishes: formData.wishes,
          },
        });
      }

      setSubmitted(true);
    } else {
      const message = `*RSVP Wedding*%0AName: ${formData.name}%0AAttendance: ${formData.attendance}%0ANumber of Guests: ${formData.numberOfGuests}%0AWishes: ${formData.wishes}`;
      window.open(
        `https://wa.me/${weddingConfig.rsvp.whatsappNumber}?text=${message}`,
        '_blank'
      );
    }

    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem 1rem',
    borderRadius: '6px',
    background: 'rgba(255,252,245,0.88)',
    border: '1px solid rgba(160,108,24,0.35)',
    color: '#3b2608',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '0.9375rem',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.6875rem',
    fontWeight: '700',
    color: '#6b3e08',
    marginBottom: '0.4rem',
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
  };

  // Cylindrical gradient (top-to-bottom) to simulate 3D rod
  const scrollRollBar: React.CSSProperties = {
    height: '52px',
    background: 'linear-gradient(to bottom, #2c1600 0%, #6a3606 9%, #b46c18 20%, #e4bc58 36%, #f8e898 50%, #dcac3c 64%, #9a5c0e 80%, #582a04 91%, #2c1600 100%)',
    borderRadius: '50%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,245,180,0.25), inset 0 -1px 0 rgba(0,0,0,0.30)',
  };

  const scrollCapStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 33% 28%, #f8e898 0%, #d49418 45%, #7a480a 78%, #381a00 100%)',
    boxShadow: '0 4px 14px rgba(0,0,0,0.60), inset 0 1px 1px rgba(255,245,160,0.40)',
    zIndex: 3,
  };

  const scrollBody: React.CSSProperties = {
    background: 'linear-gradient(to right, #7a3e10 0%, #be7618 1.5%, #dcb048 3.5%, #f5e8c0 7%, #fdf8ee 13%, #fefcf2 50%, #fdf8ee 87%, #f5e8c0 93%, #dcb048 96.5%, #be7618 98.5%, #7a3e10 100%)',
    padding: '2.5rem 3rem',
    position: 'relative',
    zIndex: 1,
    boxShadow: '16px 0 26px rgba(0,0,0,0.24) inset, -16px 0 26px rgba(0,0,0,0.24) inset, 0 14px 20px rgba(0,0,0,0.12) inset, 0 -14px 20px rgba(0,0,0,0.12) inset',
  };

  return (
    <section className="relative overflow-hidden" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <CandleLight glowAt="40% 60%" intensity={0.16} />
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-4 text-white">RSVP</h2>
          <p className="text-white/75">Please confirm your attendance</p>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Scroll document wrapper */}
          <div style={{ display: 'flex', flexDirection: 'column', filter: 'drop-shadow(0 18px 44px rgba(0,0,0,0.52))' }}>

            {/* Top roll with golden caps */}
            <div style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}>
              <div style={scrollRollBar} />
              <div style={{ ...scrollCapStyle, left: '-10px' }} />
              <div style={{ ...scrollCapStyle, right: '-10px' }} />
            </div>

            {/* Scroll body */}
            <div style={scrollBody}>

              {/* Decorative header inside scroll */}
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <div style={{ color: '#b8780a', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'serif', marginBottom: '0.35rem' }}>~ Kindly Reply ~</div>
                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, #c8881a 20%, #c8881a 80%, transparent)' }} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    type="text"
                    required
                    style={inputStyle}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Will you attend?</label>
                  <select
                    required
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  >
                    <option value="" style={{ background: '#fdf8ef' }}>Select...</option>
                    <option value="Yes" style={{ background: '#fdf8ef' }}>Yes, I will attend</option>
                    <option value="No" style={{ background: '#fdf8ef' }}>Sorry, I can&apos;t attend</option>
                    <option value="Maybe" style={{ background: '#fdf8ef' }}>Maybe</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Number of Guests</label>
                  <select
                    required
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    value={formData.numberOfGuests}
                    onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
                  >
                    <option value={1} style={{ background: '#fdf8ef' }}>1 pax</option>
                    <option value={2} style={{ background: '#fdf8ef' }}>2 pax</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Wishes for the Couple</label>
                  <textarea
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    value={formData.wishes}
                    onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                  />
                </div>

                {/* Decorative divider */}
                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, #c8881a 30%, #c8881a 70%, transparent)', margin: '0.25rem 0' }} />

                {submitted ? (
                  <div
                    className="w-full py-3 px-6 text-center rounded font-medium text-sm"
                    style={{ background: 'rgba(139,98,30,0.12)', color: '#7a5210', border: '1px solid rgba(139,98,30,0.35)', fontFamily: 'serif', letterSpacing: '0.04em' }}
                  >
                    Thank you! Your RSVP has been received.
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 rounded transition-all font-semibold text-sm uppercase tracking-widest disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #a06820, #c89830, #a06820)', color: '#fdf8ef', boxShadow: '0 3px 10px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,245,180,0.25)' }}
                  >
                    {loading ? 'Sending...' : guestId ? 'Send RSVP' : 'Send RSVP via WhatsApp'}
                  </button>
                )}
              </form>
            </div>

            {/* Bottom roll with golden caps */}
            <div style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}>
              <div style={{ ...scrollRollBar, boxShadow: '0 -10px 30px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,245,180,0.25), inset 0 -1px 0 rgba(0,0,0,0.30)' }} />
              <div style={{ ...scrollCapStyle, left: '-10px' }} />
              <div style={{ ...scrollCapStyle, right: '-10px' }} />
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(200,150,30,0.45))' }} />
          <img src="/images/pattern/garden-wildflower.svg" alt="" className="w-7 h-7 opacity-60" />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(200,150,30,0.45))' }} />
        </div>
      </div>
    </section>
  );
}
