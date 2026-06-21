import Image from 'next/image';
import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/wedding-config';
import { Instagram, Facebook, Twitter } from '../shared/SocialIcons';
import { activeTheme } from '../../config/theme-config';
import { scrollAnimation, viewportSettings } from '../animations/scrollAnimations';
import CandleLight from '../ui/CandleLight';

type ThemeStyle = React.CSSProperties & {
  '--theme-primary': string;
  '--theme-accent': string;
}

const PhotoContainer = ({ photo, name }: {
  photo: string;
  name: string;
}) => {
  const themeStyle: ThemeStyle = {
    '--theme-primary': activeTheme.primary,
    '--theme-accent': activeTheme.accent,
  };

  return (
    <div className="relative mx-auto mb-6 w-72 h-72 md:w-80 md:h-80">
      {/* Circular border rings */}
      <div
        className="absolute inset-0 rounded-full border-2 border-[#c8961e]/60
          before:absolute before:inset-[-12px] before:rounded-full before:border-2
          before:border-dashed before:border-[#e8c0c4]/40
          after:absolute after:inset-[-24px] after:rounded-full after:border-2
          after:border-[#c8961e]/20 photo-frame-animation"
        style={themeStyle}
      />

      {/* Garden botanical frame */}
      <div className="absolute inset-[-46px] z-20 pointer-events-none">
        {/* Top-left: rose */}
        <motion.div
          className="absolute top-0 left-0 w-[84px] h-[100px]"
          animate={{ rotate: [-4, 0, -4], scale: [1, 1.04, 1] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        >
          <div className="relative w-full h-full">
            <Image src="/images/pattern/garden-rose.svg" alt="" fill className="object-contain" />
          </div>
        </motion.div>

        {/* Top-right: rose (mirrored horizontally) */}
        <div className="absolute top-0 right-0 w-[84px] h-[100px]" style={{ transform: 'scaleX(-1)' }}>
          <motion.div
            className="relative w-full h-full"
            animate={{ rotate: [-4, 0, -4], scale: [1, 1.04, 1] }}
            transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 }}
          >
            <Image src="/images/pattern/garden-rose.svg" alt="" fill className="object-contain" />
          </motion.div>
        </div>

        {/* Bottom-left: leaf (flipped upward) */}
        <div className="absolute bottom-0 left-[8px] w-[68px] h-[90px]" style={{ transform: 'scaleX(-1) rotate(180deg)' }}>
          <motion.div
            className="relative w-full h-full"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.6 }}
          >
            <Image src="/images/pattern/garden-leaf.svg" alt="" fill className="object-contain" />
          </motion.div>
        </div>

        {/* Bottom-right: leaf (flipped upward) */}
        <div className="absolute bottom-0 right-[8px] w-[68px] h-[90px]" style={{ transform: 'rotate(180deg)' }}>
          <motion.div
            className="relative w-full h-full"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 9, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2.2 }}
          >
            <Image src="/images/pattern/garden-leaf.svg" alt="" fill className="object-contain" />
          </motion.div>
        </div>

        {/* Top-center: wildflower cluster */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[92px] h-[72px]"
          animate={{ scale: [1, 1.05, 1], y: [0, -2, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.4 }}
        >
          <div className="relative w-full h-full">
            <Image src="/images/pattern/garden-wildflower.svg" alt="" fill className="object-contain" />
          </div>
        </motion.div>
      </div>

      {/* Photo circle */}
      <div
        className="absolute inset-4 rounded-full overflow-hidden
          shadow-[0_0_30px_rgba(200,150,30,0.15)]
          transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(200,150,30,0.25)]
          before:absolute before:inset-0 before:z-10 before:rounded-full
          before:shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]"
      >
        <div className="relative w-full h-full">
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover rounded-full transition-all duration-300 hover:scale-110 object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default function CoupleProfile() {
  return (
    <motion.section
      className="relative py-20 overflow-hidden"
      variants={scrollAnimation}
      initial="offscreen"
      whileInView="onscreen"
      viewport={viewportSettings}
    >
      <CandleLight glowAt="75% 25%" intensity={0.16} />
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-16">
          <div
            className="relative rounded-lg p-6 max-w-2xl mx-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(200, 150, 30, 0.25)',
            }}
          >
            <p className="text-[#1c3d1c] text-lg font-medium leading-relaxed">By the grace of God and with thankful hearts</p>
            <p className="mt-4 text-[#1c3d1c]/80 leading-relaxed">We would like to invite you to share in the joy of our wedding as we celebrate the sacred union of marriage.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <motion.div
            className="text-center relative"
            variants={scrollAnimation}
            initial="offscreen"
            whileInView="onscreen"
            viewport={viewportSettings}
          >
            <PhotoContainer
              photo={weddingConfig.couple.groom.photo.url}
              name={weddingConfig.couple.groom.fullName}
            />
            <h3 className="text-3xl font-serif mb-4 mt-14 text-white">{weddingConfig.couple.groom.fullName}</h3>
            <p className="text-white/80 mb-4">{weddingConfig.couple.groom.parents}</p>
            <p className="text-white/70 mb-4">{weddingConfig.couple.groom.about}</p>
            <div className="flex justify-center gap-4">
              {weddingConfig.couple.groom.socialMedia?.instagram && (
                <Instagram url={weddingConfig.couple.groom.socialMedia.instagram} />
              )}
              {weddingConfig.couple.groom.socialMedia?.facebook && (
                <Facebook url={weddingConfig.couple.groom.socialMedia.facebook} />
              )}
              {weddingConfig.couple.groom.socialMedia?.twitter && (
                <Twitter url={weddingConfig.couple.groom.socialMedia.twitter} />
              )}
            </div>
          </motion.div>

          <motion.div
            className="text-center relative"
            variants={scrollAnimation}
            initial="offscreen"
            whileInView="onscreen"
            viewport={viewportSettings}
          >
            <PhotoContainer
              photo={weddingConfig.couple.bride.photo.url}
              name={weddingConfig.couple.bride.fullName}
            />
            <h3 className="text-3xl font-serif mb-4 mt-14 text-white">{weddingConfig.couple.bride.fullName}</h3>
            <p className="text-white/80 mb-4">{weddingConfig.couple.bride.parents}</p>
            <p className="text-white/70 mb-4">{weddingConfig.couple.bride.about}</p>
            <div className="flex justify-center gap-4">
              {weddingConfig.couple.bride.socialMedia.instagram && (
                <Instagram url={weddingConfig.couple.bride.socialMedia.instagram} />
              )}
              {weddingConfig.couple.bride.socialMedia.facebook && (
                <Facebook url={weddingConfig.couple.bride.socialMedia.facebook} />
              )}
              {weddingConfig.couple.bride.socialMedia.twitter && (
                <Twitter url={weddingConfig.couple.bride.socialMedia.twitter} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

