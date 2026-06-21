import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding-config';
import { useRouter } from 'next/router';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import CandleLight from '../ui/CandleLight';

export default function Gallery() {
  const { basePath } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  const slides = weddingConfig.gallery.prewedding.map(photo => ({
    src: `${basePath}${photo.url}`,
    alt: photo.caption,
  }));

  return (
    <section className="relative py-20 overflow-hidden">
      <CandleLight glowAt="20% 80%" intensity={0.14} />
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-4 text-white">
            Pre-Wedding Photos
          </h2>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md text-xl select-none font-bold transition-all"
            style={{ background: '#c8961e', color: '#0e1a12' }}
            aria-label="Previous photos"
          >
            ‹
          </button>

          <div
            ref={scrollRef}
            className="flex gap-2 sm:gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
          >
            {weddingConfig.gallery.prewedding.map((photo, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[47%] sm:w-[31%] lg:w-[23%] aspect-square rounded-lg overflow-hidden cursor-pointer group"
                style={{
                  scrollSnapAlign: 'start',
                  border: '1px solid rgba(200,150,30,0.12)',
                }}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              >
                <Image
                  src={`${basePath}${photo.url}`}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 640px) 47vw, (max-width: 1024px) 31vw, 23vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 4}
                  loading={index < 4 ? "eager" : "lazy"}
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENDPzE2O0FBNi5QREZXUFM4UjdqWGB2foVzfHJUQkhzkWNY2ff/2wBDARUXFx4aHR4eHUJBOEFCWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                {/* Subtle dark overlay on hover for enchanted feel */}
                <div className="absolute inset-0 bg-[#0e1a12]/0 group-hover:bg-[#0e1a12]/20 transition-all duration-300" />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md text-xl select-none font-bold transition-all"
            style={{ background: '#c8961e', color: '#0e1a12' }}
            aria-label="Next photos"
          >
            ›
          </button>
        </div>

        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={photoIndex}
          slides={slides}
          carousel={{ finite: true, preload: 2, imageFit: 'contain' }}
          controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
            iconClose: () => <div className="p-2">✕</div>
          }}
          animation={{ swipe: 150 }}
          styles={{
            container: { backgroundColor: 'rgba(10,20,10,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
            icon: { color: '#c8961e', filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' }
          }}
        />
      </div>
    </section>
  );
}
