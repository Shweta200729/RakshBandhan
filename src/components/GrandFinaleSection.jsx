import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenisScroll } from '../hooks/useLenis';

const SILK = [0.25, 0.46, 0.45, 0.94];

// Premium Button Copied & adapted from Hero for visual consistency
const PremiumCTA = ({ onClick, children }) => {
    return (
        <motion.button
            onClick={onClick}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="group relative overflow-hidden font-display tracking-[0.3em] text-[#F7E7CE] px-8 py-5 md:px-12 md:py-6 uppercase text-sm font-bold flex items-center justify-center gap-4 border border-[#C9A84C]/60 rounded-md shadow-[0_10px_30px_rgba(201,168,76,0.3)] bg-gradient-to-r from-[#2B0813] to-[#4A0820]"
            variants={{
                initial: { scale: 1 },
                hover: {
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(201, 168, 76, 0.6)',
                    borderColor: 'rgba(255, 215, 0, 1)',
                    transition: { duration: 0.4, ease: "easeOut" }
                },
                tap: { scale: 0.95 }
            }}
        >
            {/* Shimmer effect track */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
                style={{
                    background: 'linear-gradient(120deg, transparent 0%, transparent 20%, rgba(255, 215, 0, 0.4) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 215, 0, 0.4) 55%, transparent 80%, transparent 100%)',
                    width: '300%',
                    left: '-100%',
                }}
                variants={{
                    initial: { x: '-50%' },
                    hover: { x: '100%', transition: { duration: 1.2, ease: "easeInOut" } }
                }}
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#FFF4D0] drop-shadow-md tracking-[0.3em]">
                {children}
            </span>
        </motion.button>
    );
};

const GrandFinaleSection = () => {
    const containerRef = useRef(null);
    const imagesRef = useRef(null);
    const { scrollTo } = useLenisScroll();
    const [celebrated, setCelebrated] = useState(false);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom bottom",
                    scrub: 1.2,
                }
            });

            // Parallax entrance of the grand images
            tl.fromTo('.finale-img-left', { y: 200, opacity: 0, rotation: -10 }, { y: 0, opacity: 0.6, rotation: -5, ease: 'power2.out' }, 0);
            tl.fromTo('.finale-img-right', { y: 250, opacity: 0, rotation: 10 }, { y: 20, opacity: 0.6, rotation: 5, ease: 'power2.out' }, 0);
            tl.fromTo('.finale-img-center', { y: 300, opacity: 0, scale: 0.8 }, { y: 0, opacity: 0.8, scale: 1, ease: 'power2.out' }, 0.2);

            // Text entrance
            tl.fromTo('.finale-text', { y: 50, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 0.4);
            tl.fromTo('.finale-cta', { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out' }, 0.6);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleCelebrateClick = () => {
        setCelebrated(true);
        // Scroll to the very top smoothly after an epic firework effect
        setTimeout(() => {
            scrollTo(0);
            setTimeout(() => setCelebrated(false), 2000);
        }, 1500);
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-[110vh] overflow-hidden flex flex-col items-center justify-center bg-[#050102]">

            {/* Cinematic Slow Panning Palace Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    className="w-[110%] h-[110%] bg-cover bg-center opacity-30 mix-blend-luminosity"
                    // Elegant Rajasthan Palace arches interior
                    style={{ backgroundImage: `url(https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2000&auto=format&fit=crop)` }}
                    animate={{ x: ['-2%', '0%', '-2%'], y: ['-2%', '0%', '-2%'], scale: [1, 1.05, 1] }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                />
                {/* Royal Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050102] via-[#2B0813]/60 to-[#1A0508]/90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(201,168,76,0.1)_0%,transparent_70%)]" />
            </div>

            {/* Floating FX Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {/* Particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div key={`fp-${i}`} className="absolute rounded-full bg-[#FFD700] mix-blend-screen"
                        style={{ width: Math.random() * 3 + 1 + 'px', height: Math.random() * 3 + 1 + 'px', top: Math.random() * 100 + '%', left: Math.random() * 100 + '%' }}
                        animate={{ y: [0, -200], opacity: [0, 0.7, 0] }}
                        transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: 'linear' }}
                    />
                ))}
                {/* Marigold Petals */}
                {[...Array(15)].map((_, i) => (
                    <motion.div key={`petal-${i}`} className="absolute"
                        style={{ width: '12px', height: '12px', background: 'radial-gradient(circle, #FFB300 0%, #D44E15 100%)', borderRadius: '100% 0 100% 0', top: '-10%', left: Math.random() * 100 + '%' }}
                        animate={{ y: ['0vh', '120vh'], x: [0, Math.random() * 100 - 50], rotate: [0, 360], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: Math.random() * 5, ease: 'linear' }}
                    />
                ))}
            </div>

            {/* Collage Assets Wrapper */}
            <div ref={imagesRef} className="absolute inset-0 z-[15] pointer-events-none flex justify-center items-center opacity-30 mt-[-10vh]">

                {/* Left: Gifts & Sweets */}
                <div className="finale-img-left absolute left-[5%] md:left-[15%] w-[40vw] md:w-[25vw] h-[60vh] rounded-t-full border border-[#C9A84C]/30 overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800)' }} />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Right: Family Atmosphere */}
                <div className="finale-img-right absolute right-[5%] md:right-[15%] w-[40vw] md:w-[25vw] h-[50vh] rounded-[40px] border border-[#C9A84C]/30 overflow-hidden shadow-2xl mt-20">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800)' }} />
                    <div className="absolute inset-0 bg-[#2B0813]/40 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Center: Rakhi & Diyas (Most Prominent) */}
                <div className="finale-img-center absolute w-[60vw] md:w-[30vw] h-[70vh] rounded-t-full rounded-b-full border-2 border-[#C9A84C]/50 overflow-hidden shadow-[0_0_50px_rgba(201,168,76,0.3)]">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800)' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0205] via-transparent to-transparent" />
                </div>
            </div>


            {/* Foreground Content (CTA) */}
            <div className="relative z-[25] flex flex-col items-center mt-[20vh] text-center px-4">
                <div className="finale-text mb-12">
                    <h3 className="font-display text-sm md:text-md tracking-[0.4em] text-[#C9A84C] uppercase mb-6 drop-shadow-md">
                        A bond for eternity
                    </h3>
                    <h2 className="font-serif text-6xl md:text-[7rem] text-[#F7E7CE] text-glow-gold leading-[1.1] italic">
                        Today, We <br />
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] via-[#FFFFFF] to-[#C9A84C] not-italic drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                            Celebrate Us.
                        </span>
                    </h2>
                </div>

                <div className="finale-cta">
                    <PremiumCTA onClick={handleCelebrateClick}>
                        Celebrate The Bond →
                    </PremiumCTA>
                </div>
            </div>

            {/* Massive End Screen Confetti Burst FX */}
            <AnimatePresence>
                {celebrated && (
                    <motion.div className="fixed inset-0 z-[100] pointer-events-none flex justify-center items-center overflow-hidden">
                        <div className="absolute inset-0 bg-[#FFD700] mix-blend-overlay opacity-20" />
                        {[...Array(60)].map((_, i) => (
                            <motion.div
                                key={`burst-${i}`}
                                className="absolute bg-[#FFD700] shadow-[0_0_15px_#FFD700]"
                                style={{ width: Math.random() * 6 + 4 + 'px', height: Math.random() * 15 + 5 + 'px' }}
                                initial={{ top: '50%', left: '50%', scale: 0, rotate: 0 }}
                                animate={{
                                    top: `${Math.random() * 150 - 25}%`, left: `${Math.random() * 150 - 25}%`,
                                    scale: Math.random() * 2 + 1, rotate: Math.random() * 720, opacity: [1, 1, 0]
                                }}
                                transition={{ duration: Math.random() * 1.5 + 1, ease: 'easeOut' }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default GrandFinaleSection;
