import { motion } from 'framer-motion';
import Image from 'next/image';
import { weddingConfig } from '@/config/wedding-config';
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import CandleLight from '../ui/CandleLight';

export default function EventDetails() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const events = [
    { title: 'Holy Matrimony', details: weddingConfig.event.pemberkatan },
    { title: 'Reception', details: weddingConfig.event.reception }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <CandleLight glowAt="30% 80%" intensity={0.15} />
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="relative rounded-lg p-6 max-w-2xl mx-auto"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(200,150,30,0.25)',
            }}
          >
            <h2 className="text-4xl font-serif mb-4 text-[#1c3d1c]">Save the Date</h2>
            <p className="text-[#3d6b40]">We invite you to celebrate our special day</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 rounded-lg overflow-hidden"
              style={{
                minHeight: '400px',
                background: 'rgba(255, 255, 255, 0.90)',
                border: '1px solid rgba(200,150,30,0.25)',
                boxShadow: '0 8px 32px rgba(60,120,70,0.12), 0 0 0 1px rgba(200,150,30,0.10)',
              }}
            >
              {/* Corner ornament — Holy Matrimony card */}
              {event.title === 'Holy Matrimony' && (
                <>
                  <div className="absolute -top-5 -left-5 w-24 h-24 opacity-35 pointer-events-none">
                    <Image src="/images/pattern/garden-rose.svg" alt="" fill className="object-contain" />
                  </div>
                  <div className="absolute -bottom-5 -right-5 w-24 h-24 opacity-35 pointer-events-none rotate-180">
                    <Image src="/images/pattern/garden-leaf.svg" alt="" fill className="object-contain" />
                  </div>
                </>
              )}

              {/* Corner ornament — Reception card */}
              {event.title === 'Reception' && (
                <>
                  <div className="absolute -top-5 -left-5 w-24 h-24 opacity-35 pointer-events-none">
                    <Image src="/images/pattern/garden-wildflower.svg" alt="" fill className="object-contain" />
                  </div>
                  <div className="absolute -bottom-5 -right-5 w-24 h-24 opacity-35 pointer-events-none rotate-180">
                    <Image src="/images/pattern/garden-rose.svg" alt="" fill className="object-contain" />
                  </div>
                </>
              )}

              <h3 className="text-2xl font-serif mb-6 text-center text-[#1c3d1c]">{event.title}</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CalendarIcon className="w-6 h-6 flex-shrink-0" style={{ color: '#c8961e' }} />
                  <div>
                    <p className="font-medium text-[#1c3d1c]">{formatDate(event.details.date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ClockIcon className="w-6 h-6 flex-shrink-0" style={{ color: '#c8961e' }} />
                  <div>
                    <p className="font-medium text-[#1c3d1c]">{event.details.time} WIB</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPinIcon className="w-6 h-6 flex-shrink-0" style={{ color: '#c8961e' }} />
                  <div>
                    <p className="font-medium text-[#1c3d1c]">{event.details.venue}</p>
                    <p className="text-[#557558]">{event.details.address}</p>
                  </div>
                </div>

                {event.details.dresscode && (
                  <div className="text-center mt-6">
                    <p className="text-sm text-[#557558]">Dress Code</p>
                    <p className="font-medium text-[#1c3d1c]">{event.details.dresscode}</p>
                  </div>
                )}

                <a
                  href={event.details.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center font-medium py-3 rounded-lg transition-colors mt-6"
                  style={{
                    background: 'rgba(200,150,30,0.12)',
                    color: '#c8961e',
                    border: '1px solid rgba(200,150,30,0.30)',
                  }}
                >
                  View Location
                </a>

                <button
                  onClick={() => {
                    const icsContent = [
                      'BEGIN:VCALENDAR',
                      'VERSION:2.0',
                      'PRODID:-//Wedding//Invitation//EN',
                      'BEGIN:VEVENT',
                      `UID:${Date.now()}@wedding`,
                      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
                      `DTSTART:${new Date(`${event.details.date}T${event.details.time}`).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
                      `SUMMARY:${event.title} - ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}`,
                      `DESCRIPTION:${event.details.venue}\\n${event.details.address}`,
                      `LOCATION:${event.details.venue}, ${event.details.address}`,
                      'END:VEVENT',
                      'END:VCALENDAR'
                    ].join('\n');

                    const blob = new Blob([icsContent], { type: 'text/calendar' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${event.title.replace(' ', '_')}_${weddingConfig.couple.groom.name}_${weddingConfig.couple.bride.name}.ics`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="block w-full text-center font-semibold text-lg py-4 px-6 rounded-lg transition-all duration-200 mt-4 relative z-10 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    background: '#c8961e',
                    color: '#0e1a12',
                    border: '1px solid rgba(200,150,30,0.6)',
                    boxShadow: '0 4px 15px rgba(200,150,30,0.20)',
                  }}
                >
                  Save to Calendar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
