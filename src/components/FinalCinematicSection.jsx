import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

// Minimalist Elegant Rakhi (Line-art glowing variant)
const EndingRakhi = React.forwardRef((props, ref) => (
    <div ref={ref} className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center opacity-0 scale-50 z-20">

        {/* Core Rotating Mandala */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center mix-blend-screen"
        >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_#FFD700]">
                {/* Outer Sunburst */}
                <path d="M50,0 L53,35 L85,15 L65,47 L100,50 L65,53 L85,85 L53,65 L50,100 L47,65 L15,85 L35,53 L0,50 L35,47 L15,15 L47,35 Z" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="0.5" />
                <path d="M50,10 L54,38 L80,20 L62,46 L90,50 L62,54 L80,80 L54,62 L50,90 L46,62 L20,80 L38,54 L10,50 L38,46 L20,20 L46,38 Z" fill="rgba(255,215,0,0.1)" stroke="#FFD700" strokeWidth="1" />
                {/* Inner Velvet Circular Core */}
                <circle cx="50" cy="50" r="18" fill="#6D0B2F" stroke="#FFD700" strokeWidth="2" />
                {/* Center Gem */}
                <circle cx="50" cy="50" r="5" fill="#FFF4D0" />
            </svg>
        </motion.div>

        {/* Pulsing Light inside the Rakhi */}
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-8 h-8 rounded-full bg-[#FFD700] blur-md pointer-events-none"
        />

    </div>
));

const FinalCinematicSection = () => {
    const containerRef = useRef(null);
    const threadPathRef = useRef(null);
    const rakhiRef = useRef(null);
    const bgGlowRef = useRef(null);

    const [pathReady, setPathReady] = useState(false);

    useEffect(() => {
        // Setup GSAP paths drawing
        if (threadPathRef.current) {
            const length = threadPathRef.current.getTotalLength();
            gsap.set(threadPathRef.current, { strokeDasharray: length, strokeDashoffset: length });
            setPathReady(true);
        }

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=400%", // Very long final scrub holding stage
                    pin: true,
                    scrub: 1.2
                }
            });

            // 1. Thread draws slowly across the horizontal screen
            tl.to(threadPathRef.current, { strokeDashoffset: 0, duration: 4, ease: "none" }, 0);

            // 2. Initial Message Series
            tl.fromTo('.msg-1', { opacity: 0, y: 30, filter: 'blur(5px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, 0.5);
            tl.to('.msg-1', { opacity: 0, y: -30, filter: 'blur(5px)', duration: 0.8 }, 1.5); // Fast exit

            tl.fromTo('.msg-2', { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 2.0);

            // Allow msg-2 to rest momentarily, then fade it up and away slightly
            tl.to('.msg-2', { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" }, 2.8);

            // 3. Final Massive Reveal Layout

            // Rakhi spins into the center axis
            tl.fromTo(rakhiRef.current,
                { opacity: 0, scale: 0, rotation: -90, y: 50 },
                { opacity: 1, scale: 1, rotation: 0, y: 0, duration: 1, ease: "back.out(1.5)" },
                3.1
            );

            // Epic Glow behind the Rakhi activates
            tl.to(bgGlowRef.current, { opacity: 0.4, scale: 2, duration: 1.5, ease: 'power2.out' }, 3.1);

            // Main Banner Header
            tl.fromTo('.msg-main',
                { opacity: 0, scale: 0.9, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
                3.3
            );

            // Credits/Poem block entering below
            tl.fromTo('.msg-credits',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1 },
                3.7
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#050102] overflow-hidden flex flex-col items-center justify-center border-t border-[rgba(201,168,76,0.1)]">

            {/* Deep Maroon Void Background Base */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0205] to-[#050102] pointer-events-none" />

            {/* Glowing Golden Thread Horizon */}
            <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-[120%] h-full -ml-[10%] drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">
                    <defs>
                        <linearGradient id="threadGradEnd" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="30%" stopColor="#C9A84C" />
                            <stop offset="50%" stopColor="#FFD700" />
                            <stop offset="70%" stopColor="#C9A84C" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <path
                        ref={threadPathRef}
                        d="M0,50 Q25,45 50,50 T100,50"
                        stroke="url(#threadGradEnd)"
                        strokeWidth={pathReady ? "0.2" : "0"}
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* Woven thin accent strand */}
                    <path
                        d="M0,50 Q25,45 50,50 T100,50"
                        stroke="#FFD700"
                        strokeWidth="0.05"
                        strokeDasharray="0.5 0.5"
                        fill="none"
                        className="mix-blend-screen opacity-50"
                    />
                </svg>
            </div>

            {/* Stage Central Glow (Connected to the Rakhi) */}
            <div
                ref={bgGlowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[35vw] h-[35vw] md:w-[20vw] md:h-[20vw] rounded-full bg-[#FFD700] mix-blend-screen pointer-events-none blur-[90px] opacity-0 z-[4]"
            />


            {/* Sequence Texts Container (Absolute centered stack) */}
            <div className="relative w-full h-full flex flex-col justify-center items-center z-[15] pointer-events-none px-4">

                {/* 1. First Transient Message */}
                <div className="msg-1 absolute w-full text-center">
                    <p className="font-serif italic text-[#C9A84C] opacity-90 text-3xl md:text-5xl lg:text-6xl drop-shadow-md">
                        Some bonds are tied by a thread.
                    </p>
                </div>

                {/* 2. Second Holding Message */}
                <div className="msg-2 absolute w-full text-center mt-8">
                    <h3 className="font-serif italic text-[#F7E7CE] text-glow-gold text-4xl md:text-6xl lg:text-[4.5rem] tracking-wide">
                        Some are tied by a lifetime.
                    </h3>
                </div>

                {/* 3. The Grand Assembly (Rakhi + Header + Message) */}
                <div className="absolute top-[20%] w-full flex flex-col items-center">

                    {/* Central Animated Rakhi Component */}
                    <EndingRakhi ref={rakhiRef} />

                    <div className="msg-main text-center mt-12 md:mt-16 w-full">
                        <h1 className="font-serif font-bold text-4xl md:text-[5rem] lg:text-[6.5rem] text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] via-[#FFFFFF] to-[#C9A84C] drop-shadow-[0_0_20px_rgba(201,168,76,0.6)] leading-none mb-2">
                            HAPPY<br className="md:hidden" /> RAKSHABANDHAN <span className="inline-block scale-[0.6] -translate-y-2 text-[#D4145A]">❤️</span>
                        </h1>
                    </div>

                    <div className="msg-credits text-center mt-14 md:mt-16 flex flex-col gap-3 md:gap-4 w-full">
                        <p className="font-elegant tracking-[0.2em] text-[#C9A84C] text-sm md:text-xl uppercase opacity-80 decoration-[#C9A84C]/30 border-b border-[#C9A84C]/20 border-dashed pb-3 md:pb-4 mx-auto inline-block min-w-[250px]">
                            To every brother.
                        </p>
                        <p className="font-elegant tracking-[0.2em] text-[#C9A84C] text-sm md:text-xl uppercase opacity-80 decoration-[#C9A84C]/30 border-b border-[#C9A84C]/20 border-dashed pb-3 md:pb-4 mx-auto inline-block min-w-[250px]">
                            To every sister.
                        </p>
                        <p className="font-elegant tracking-[0.2em] text-[#F7E7CE] text-sm md:text-xl uppercase opacity-90 mx-auto inline-block text-glow-gold">
                            To every beautiful memory.
                        </p>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default FinalCinematicSection;
