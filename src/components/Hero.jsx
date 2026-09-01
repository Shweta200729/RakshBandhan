import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/hero-bg.png';
import { useLenisScroll } from '../hooks/useLenis';

const EXPO = [0.16, 1, 0.3, 1];
const SILK = [0.25, 0.46, 0.45, 0.94];

// Premium Shimmer Button
const PremiumButton = ({ onClick, children, enterDelay = 0.6 }) => {
    return (
        <motion.button
            onClick={onClick}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="group relative overflow-hidden font-display tracking-widest text-[#F7E7CE] px-8 py-4 sm:px-10 sm:py-5 uppercase text-xs sm:text-sm font-semibold flex items-center justify-center gap-3"
            style={{
                background: 'rgba(20, 5, 10, 0.65)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(201,168,76,0.4)',
                borderRadius: '4px',
                boxShadow: '0 8px 32px rgba(10, 2, 5, 0.5), inset 0 1px 0 rgba(201,168,76,0.2)',
                cursor: 'pointer'
            }}
            variants={{
                initial: { opacity: 0, y: 30, scale: 1 },
                hover: {
                    scale: 1.02,
                    boxShadow: '0 0 25px rgba(201, 168, 76, 0.45)',
                    borderColor: 'rgba(201, 168, 76, 0.9)',
                    transition: { duration: 0.4, ease: "easeOut" }
                },
                tap: { scale: 0.98 }
            }}
            transition={{ duration: 0.8, ease: SILK, delay: enterDelay }} // This is for the entrance animation
        >
            {/* Shimmer effect track */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(120deg, transparent 0%, transparent 20%, rgba(201, 168, 76, 0.15) 45%, rgba(255, 215, 0, 0.4) 50%, rgba(201, 168, 76, 0.15) 55%, transparent 80%, transparent 100%)',
                    width: '300%',
                    left: '-100%',
                }}
                variants={{
                    initial: { x: '-50%' },
                    hover: { x: '100%', transition: { duration: 1.2, ease: "easeInOut" } }
                }}
            />

            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#FFD700]">
                {children}
            </span>

            <motion.span
                className="relative z-10 text-[1.2em] text-[#C9A84C]"
                variants={{
                    initial: { x: 0, color: '#C9A84C' },
                    hover: { x: 6, color: '#FFD700', transition: { duration: 0.3, ease: 'easeOut' } }
                }}
            >
                →
            </motion.span>
        </motion.button>
    );
};

// --- Decorative Elements ---
const SmokeGlow = () => (
    <div className="absolute inset-0 z-[1] pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        <motion.div
            className="absolute -bottom-[10%] -left-[10%] w-[60vh] h-[60vh] rounded-full blur-[80px]"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)' }}
            animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
            className="absolute -bottom-[5%] -right-[10%] w-[50vh] h-[50vh] rounded-full blur-[80px]"
            style={{ background: 'radial-gradient(circle, rgba(168,27,14,0.15) 0%, transparent 70%)' }}
            animate={{ x: [0, -30, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
    </div>
);

const DecorativeLux = ({ isMobile }) => {
    const pCount = isMobile ? 8 : 25; // Golden particles
    const petalCount = isMobile ? 4 : 12; // Falling petals
    const diyas = isMobile ? [10, 90] : [15, 30, 70, 85]; // X percentages for diyas
    const marigolds = isMobile ? [5, 95] : [6, 18, 82, 94];

    return (
        <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">

            {/* Traditional Decorative Corner Patterns */}
            <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-30 mix-blend-screen">
                <div className="absolute top-0 left-0 w-full h-full border-t border-l border-[#C9A84C] rounded-br-[100%]" />
                <div className="absolute top-2 left-2 w-[90%] h-[90%] border-t border-l border-[#A07830] rounded-br-[85%]" />
                <div className="absolute top-5 left-5 w-[75%] h-[75%] border-t border-l border-[rgba(255,215,0,0.3)] rounded-br-[70%]" />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-30 mix-blend-screen">
                <div className="absolute top-0 right-0 w-full h-full border-t border-r border-[#C9A84C] rounded-bl-[100%]" />
                <div className="absolute top-2 right-2 w-[90%] h-[90%] border-t border-r border-[#A07830] rounded-bl-[85%]" />
                <div className="absolute top-5 right-5 w-[75%] h-[75%] border-t border-r border-[rgba(255,215,0,0.3)] rounded-bl-[70%]" />
            </div>

            {/* Hanging Marigolds */}
            {marigolds.map((x, i) => (
                <motion.div key={`mg-${i}`} className="absolute top-0 origin-top flex flex-col items-center"
                    style={{ left: `${x}%`, width: 14 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0, rotate: [-1 + (i % 2), 1.5 - (i % 2), -0.5, -1 + (i % 2)] }}
                    transition={{
                        opacity: { duration: 1.5, delay: 2 + i * 0.2 },
                        y: { duration: 1.5, delay: 2 + i * 0.2, ease: "easeOut" },
                        rotate: { duration: 7 + (i % 3), repeat: Infinity, ease: 'easeInOut' }
                    }}
                >
                    <div className="w-[1px] h-[30vh] md:h-[40vh] bg-gradient-to-b from-[#C9A84C] to-transparent opacity-40 absolute z-0" />
                    {[...Array(isMobile ? 8 : 14)].map((_, j) => (
                        <div key={j} className="relative z-10 w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full mt-2.5 md:mt-3 shadow-md"
                            style={{
                                background: j % 2 === 0 ? 'radial-gradient(circle at 30% 30%, #FFB300, #F57F17)' : 'radial-gradient(circle at 30% 30%, #F57F17, #E65100)',
                                opacity: 1 - (j * (isMobile ? 0.08 : 0.05))
                            }}
                        />
                    ))}
                </motion.div>
            ))}

            {/* Glowing Diyas */}
            {diyas.map((x, i) => (
                <div key={`diya-${i}`} className="absolute bottom-[2%] flex flex-col items-center" style={{ left: `${x}%` }}>
                    <motion.div className="w-12 h-12 absolute -top-4 rounded-full mix-blend-screen"
                        style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 60%)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0.9, 0.5, 0.7], scale: [1, 1, 1.1, 0.95, 1] }}
                        transition={{
                            opacity: { times: [0, 0.2, 0.5, 0.8, 1], duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 2 + i * 0.3 },
                            scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 2 + i * 0.3 }
                        }}
                    />
                    <motion.div className="w-2 h-3.5 bg-gradient-to-t from-[#FF8C00] to-[#FFD700] rounded-t-full rounded-b-sm z-10 blur-[0.5px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scaleY: [1, 1.15, 0.9, 1.05], rotate: [-2, 3, -1, 0], x: [0, 1, -1, 0] }}
                        transition={{
                            opacity: { duration: 1.5, delay: 2.5 + i * 0.2 },
                            scaleY: { duration: 0.15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                            rotate: { duration: 0.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                            x: { duration: 0.3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                        }}
                    />
                    <motion.div className="w-6 h-2 bg-gradient-to-b from-[#C9A84C] to-[#8C6239] rounded-b-xl z-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, delay: 2 + i * 0.2 }}
                    />
                </div>
            ))}

            {/* Golden Particles */}
            {[...Array(pCount)].map((_, i) => (
                <motion.div key={`p-${i}`} className="absolute rounded-full bg-[#FFD700]"
                    style={{
                        width: Math.random() * 2 + 1 + 'px',
                        height: Math.random() * 2 + 1 + 'px',
                        top: (Math.random() * 80 + 20) + '%',
                        left: Math.random() * 100 + '%',
                        filter: 'blur(0.5px)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                        y: [0, Math.random() * -100 - 50],
                        x: [0, Math.random() * 40 - 20],
                        opacity: [0, Math.random() * 0.5 + 0.1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 15 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 15, // Starts a bit late to let sequence breathe
                        ease: 'linear'
                    }}
                />
            ))}

            {/* Falling Petals */}
            {[...Array(petalCount)].map((_, i) => (
                <motion.div key={`petal-${i}`} className="absolute"
                    style={{
                        width: Math.random() * 7 + 6 + 'px',
                        height: Math.random() * 5 + 4 + 'px',
                        background: 'linear-gradient(135deg, #EF6C00 0%, #B71C1C 100%)',
                        borderRadius: '100% 0 100% 0', // Leaf shape
                        top: -20,
                        left: Math.random() * 100 + '%',
                        opacity: 0,
                        boxShadow: 'inset 1px 1px 2px rgba(255,215,0,0.2)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                        y: ['0vh', '110vh'],
                        x: [0, Math.random() * 200 - 100],
                        rotate: [0, Math.random() * 720],
                        opacity: [0, 0.7, 0.7, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 15, // Slow float down
                        repeat: Infinity,
                        delay: Math.random() * 15,
                        ease: 'linear'
                    }}
                />
            ))}
        </div>
    );
};

const Hero = () => {
    const { scrollTo } = useLenisScroll();

    // Scroll to next section softly using premium Lenis
    const handleScrollEvent = () => {
        const nextSection = document.getElementById('story');
        if (nextSection) {
            scrollTo(nextSection, { offset: -80 });
        } else {
            // fallback if section doesn't exist yet
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        }
    };

    // Responsive state for decorations
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Very subtle parallax effect on scroll
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    return (
        <section ref={containerRef} className="relative w-full h-[100vh] min-h-[100vh] overflow-hidden flex flex-col items-center justify-center bg-[#1A0508]">
            {/* Background Image Setup */}
            <motion.div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat w-full h-[115%]"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundPosition: 'center 40%',
                    y: yBg
                }}
                initial={{ opacity: 0, scale: 1.08 }} // starts slightly dark and scaled
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.5, ease: 'easeOut' }} // cinematic slow fade and scale
            />

            {/* Premium Overlays */}
            {/* 1. Deep Maroon / Burgundy base multiply to create atmosphere */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(10,2,5,0.4)] via-[rgba(74,8,32,0.45)] to-[rgba(10,2,5,0.95)] mix-blend-multiply" />

            <SmokeGlow />

            {/* 2. Radial vignette for cinematic centered lighting */}
            <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,2,5,0.85)_100%)] pointer-events-none" />

            {/* 3. Golden warm glow near the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 z-[3] bg-gradient-to-t from-[rgba(201,168,76,0.15)] to-transparent mix-blend-overlay pointer-events-none opacity-50" />

            <DecorativeLux isMobile={isMobile} />

            {/* Content Container */}
            <div className="relative z-[10] flex flex-col items-center text-center px-4 md:px-8 max-w-7xl mx-auto w-full pt-16">

                {/* Main Heading Text */}
                <motion.h1
                    className="font-serif leading-[0.9] text-[clamp(4.5rem,15vw,12rem)] md:text-[10rem] flex flex-col uppercase m-0 p-0 text-glow-gold text-[#F7E7CE]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: SILK, delay: 1.0 }}
                >
                    <span className="block font-medium tracking-tight">Raksha</span>
                    <span className="block -mt-4 sm:-mt-6 md:-mt-10 text-gradient-gold italic font-bold pr-2 md:pr-4">Bandhan</span>
                </motion.h1>

                {/* Divider Line */}
                <motion.div
                    className="w-16 md:w-32 h-px mt-8 sm:mt-12 mb-6 sm:mb-10 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent glow-gold opacity-70"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.0, delay: 1.5, ease: EXPO }}
                />

                {/* Subtitle */}
                <motion.p
                    className="font-elegant italic text-xl sm:text-2xl md:text-[2.2rem] text-gradient-royal tracking-wide mb-12 sm:mb-16 opacity-95 max-w-2xl mx-auto drop-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: EXPO, delay: 2.0 }}
                >
                    "A celebration of love, laughter &amp; forever."
                </motion.p>

                {/* Shimmer Button Container using its own Entrance Animation defined closely in PremiumButton component */}
                <PremiumButton onClick={handleScrollEvent} enterDelay={2.6}>
                    Enter the Celebration
                </PremiumButton>

            </div>

            {/* Scroll Indicator at the bottom */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[12] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 3.2 }}
            >
                <motion.div
                    className="w-[1px] h-12 bg-gradient-to-b from-[#C9A84C] to-transparent opacity-60"
                    animate={{ height: ["0px", "48px", "48px"], y: [0, 0, 10], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            {/* Smooth gradient transition to next section at the very bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-40 z-[11] bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent pointer-events-none" />

            {/* Subtle Grain Texture Overlay for cinematic feel */}
            <div className="absolute inset-0 z-[15] pointer-events-none opacity-[0.035] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </section>
    );
};

export default Hero;
