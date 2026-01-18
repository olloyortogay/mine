import { useTranslation } from 'react-i18next';
import { motion, useMotionValue } from 'framer-motion';

const PowerUp = () => {
    const { t } = useTranslation();
    const originalCards = t('powerup.cards', { returnObjects: true });

    // Create a massive list of cards to simulate infinity
    // Multiplying/Looping the array ensures users can drag for a very long time
    const REPEAT_COUNT = 100;
    const infiniteCards = Array(REPEAT_COUNT).fill(originalCards).flat();

    // Set explicit card width + gap tailored to the design
    const CARD_WIDTH = 350;
    const GAP = 24;
    const TOTAL_ITEM_WIDTH = CARD_WIDTH + GAP;

    // Calculate start position to be in the "middle" of this massive list
    const START_INDEX = Math.floor((originalCards.length * REPEAT_COUNT) / 2);

    // Calculate initial X offset to center the middle item on the screen
    // We use a safe default for window.innerWidth (1200) for SSR/initial render consistency
    const INITIAL_X = -(START_INDEX * TOTAL_ITEM_WIDTH) + (typeof window !== 'undefined' ? window.innerWidth / 2 : 600) - (CARD_WIDTH / 2);

    const x = useMotionValue(INITIAL_X);

    return (
        <section id="powerup" className="py-24 bg-dark dark:bg-[#2b0505] text-white text-center overflow-hidden transition-colors duration-300">
            <div className="container mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-md text-white">{t('powerup.title')}</h2>
                    <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-80 leading-relaxed mb-8">{t('powerup.desc')}</p>
                </motion.div>
            </div>

            {/* Draggable Slider - Infinite & Loop Feel */}
            <div className="overflow-visible cursor-grab active:cursor-grabbing w-full">
                <motion.div
                    className="flex gap-6 w-max"
                    style={{ x }}
                    drag="x"
                    // Removed constraints to allow free movement in both directions
                    dragElastic={0.05}
                    dragMomentum={true}
                >
                    {infiniteCards.map((card, idx) => {
                        const originalIdx = idx % originalCards.length;
                        const categoryImages = [
                            "https://loremflickr.com/800/500/books,library,study", // Grammatika
                            "https://loremflickr.com/800/500/dictionary,notebook", // Lug'at
                            "https://loremflickr.com/800/500/people,talking,coffee", // So'zlashuv
                            "https://loremflickr.com/800/500/turkey,istanbul,culture", // Madaniyat
                            "https://loremflickr.com/800/500/fun,party,happy"  // O'yin-kulgi
                        ];

                        return (
                            <motion.div
                                key={idx}
                                className="w-[300px] md:w-[350px] flex-shrink-0 text-left bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm"
                            >
                                <h3 className="text-2xl font-bold mb-4 text-white">{card.title}</h3>

                                {/* Improved Image with Multi-Source Fallback */}
                                <div className="relative h-48 w-full rounded-2xl mb-6 overflow-hidden shadow-2xl border border-white/5 bg-[#450a0a]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20 animate-pulse"></div>
                                    <img
                                        src={categoryImages[originalIdx]}
                                        alt={card.title}
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 relative z-10"
                                        onError={(e) => {
                                            // Agar LoremFlickr ham ishlamasa, Unsplash-ga o'tish
                                            if (!e.target.src.includes('unsplash')) {
                                                e.target.src = `https://images.unsplash.com/photo-1543269865-cbf427ffebad?auto=format&fit=crop&q=60&w=800`;
                                            } else {
                                                e.target.style.opacity = '0';
                                            }
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none"></div>
                                </div>

                                <p className="text-gray-300 font-light leading-relaxed text-lg">
                                    {card.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default PowerUp;
