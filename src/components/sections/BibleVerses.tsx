import { motion } from 'framer-motion';
import { scrollAnimation, viewportSettings } from '../animations/scrollAnimations';

const BibleVerses = () => {
  return (
    <motion.section
      className="py-16 bg-wedding-primary relative overflow-hidden"
      variants={scrollAnimation}
      initial="offscreen"
      whileInView="onscreen"
      viewport={viewportSettings}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={scrollAnimation}
          initial="offscreen"
          whileInView="onscreen"
          viewport={viewportSettings}
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg"
            variants={scrollAnimation}
            initial="offscreen"
            whileInView="onscreen"
            viewport={viewportSettings}
          >
            <h3 className="text-xl font-semibold text-wedding-text mb-4">
              1 Corinthians 13:4-8
            </h3>
            <p className="text-wedding-text/80 leading-relaxed mb-4">
              "Love is patient and kind; love does not envy or boast; it is not arrogant or rude. It does not insist on its own way; it is not irritable or resentful; it does not rejoice at wrongdoing, but rejoices with the truth. Love bears all things, believes all things, hopes all things, endures all things. Love never ends. As for prophecies, they will pass away; as for tongues, they will cease; as for knowledge, it will pass away"
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg"
            variants={scrollAnimation}
            initial="offscreen"
            whileInView="onscreen"
            viewport={viewportSettings}
          >
            <h3 className="text-xl font-semibold text-wedding-text mb-4">
              Proverbs 3:3-6
            </h3>
            <p className="text-wedding-text/80 leading-relaxed mb-4">
              "Let not steadfast love and faithfulness forsake you; bind them around your neck; write them on the tablet of your heart. So you will find favor and good success in the sight of God and man. Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BibleVerses;