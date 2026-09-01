import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

// ==========================================
// Scene Components (Built with CSS/SVG)
// ==========================================

const AbstractRangoli = React.forwardRef((props, ref) => {
    const petals = [];
    for (let i = 0; i < 24; i++) {
        petals.push(
            <div key={i} className="absolute inset-0 border border-[#C9A84C]/20 mix-blend-screen"
                style={{
                    transform: `rotate(${i * 15}deg) scaleY(0.4) scaleX(0.05)`,
                    background: i % 2 === 0 ? 'rgba(201,168,76,0.05)' : 'rgba(109,11,47,0.1)',
                    borderRadius: '50%'
                }}
            />
        );
    }
    return (
        <div ref={ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] max-w-[800px] max-h-[800px] flex items-center justify-center opacity-0 scale-50">
            {petals}
            <div className="absolute w-[80%] h-[80%] border border-[#C9A84C]/30 rounded-full" />
            <div className="absolute w-[60%] h-[60%] border border-[#FFD700]/20 rounded-full border-dashed" />
            <div className="absolute w-[40%] h-[40%] border-2 border-[#6D0B2F]/40 rounded-full" />
        </div>
    );
});

const RakhiThali = React.forwardRef((props, ref) => (
    <div ref={ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] md:w-[25vw] md:h-[25vw] max-w-[450px] max-h-[450px] rounded-full border-4 border-[#C9A84C] bg-gradient-to-br from-[#2B0813] to-[#0A0205] shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_10px_20px_rgba(201,168,76,0.3)] opacity-0 scale-[0.8] flex items-center justify-center">

        {/* Inner Plate Rim */}
        <div className="absolute w-[92%] h-[92%] border-2 border-[#FFD700]/40 rounded-full drop-shadow-md" />

        {/* Central Rakhi Miniature */}
        <div className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#6D0B2F] to-[#FF4B4B] border border-[#FFD700] shadow-[0_0_15px_#FFD700] flex items-center justify-center z-20">
            <div className="w-1/2 h-1/2 bg-[#FFF4D0] rounded-full shadow-inner" />
        </div>

        {/* Small Bowls (Katoris) around the Thali */}

        {/* Sweets Bowl */}
        <div className="sweet-katori absolute top-[15%] left-[20%] w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#C9A84C] bg-gradient-to-b from-[#110204] to-[#C9A84C]/20 shadow-lg flex items-center justify-center overflow-hidden">
            {/* Abstract Laddoos */}
            <div className="w-4 h-4 bg-[#FFB300] rounded-full absolute top-2 left-2 drop-shadow-md" />
            <div className="w-4 h-4 bg-[#F57F17] rounded-full absolute bottom-2 left-4 drop-shadow-md" />
            <div className="w-4 h-4 bg-[#FFB300] rounded-full absolute top-4 right-2 drop-shadow-md" />
        </div>

        {/* Kumkum/Roli Bowl */}
        <div className="kumkum-katori absolute top-[15%] right-[20%] w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#C9A84C] bg-gradient-to-b from-[#110204] to-[#C9A84C]/20 shadow-lg flex items-center justify-center overflow-hidden">
            <div className="w-6 h-6 bg-[#D4145A] rounded-full blur-[1px]" />
        </div>

        {/* Rice/Akshat Bowl */}
        <div className="rice-katori absolute bottom-[20%] left-[25%] w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#C9A84C] bg-gradient-to-b from-[#110204] to-[#C9A84C]/20 shadow-lg flex items-center justify-center overflow-hidden">
            <div className="w-6 h-6 bg-[#F7E7CE] rounded-full blur-[1px] opacity-80" />
        </div>

    </div>
));


const GiftBox = ({ bg, delay, rotate, xOff, yOff, left }) => (
    <div className={`gift-box absolute ${left ? 'left-[5vw] md:left-[20vw]' : 'right-[5vw] md:right-[20vw]'} top-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 opacity-0`}
        style={{ transform: `rotate(${rotate}deg) translate(${xOff}px, ${yOff}px)` }}
    >
        <div className={`w-full h-full ${bg} border border-[#FFD700]/30 shadow-2xl relative flex items-center justify-center overflow-hidden`}>
            <div className="w-full h-2 bg-gradient-to-r from-[#A07830] via-[#FFD700] to-[#A07830] absolute" />
            <div className="h-full w-2 bg-gradient-to-b from-[#A07830] via-[#FFD700] to-[#A07830] absolute" />
            <div className="w-8 h-8 border-2 border-[#FFD700] absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-60" />
        </div>
    </div>
);

const FestivalCandle = ({ x, y }) => (
    <div className="festival-diya absolute opacity-0 z-30 flex flex-col items-center" style={{ left: x, top: y }}>
        <div className="w-12 h-12 absolute -top-6 rounded-full mix-blend-screen bg-[radial-gradient(circle,rgba(255,215,0,0.5)_0%,transparent_60%)] animate-pulse-gold" />
        <div className="w-2.5 h-4 bg-gradient-to-t from-[#FF8C00] to-[#FFD700] rounded-t-full rounded-b-sm z-10 blur-[0.5px] animate-flicker-flame" />
        <div className="w-8 h-8 bg-gradient-to-b from-[#FFD700] to-[#8C6239] rounded-b-full rounded-t-md z-0 shadow-xl" />
        <div className="w-12 h-12 absolute -bottom-4 border-b-2 border-[#FFD700]/20 rounded-full" />
    </div>
);

// ==========================================
// Main Build Sequence Component
// ==========================================

const FestiveSceneSection = () => {
    const containerRef = useRef(null);

    const rangoliRef = useRef(null);
    const thaliRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {

            // Scrub timeline for the sequence
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=350%", // Long pinning duration to allow peaceful assembly
                    pin: true,
                    scrub: 1.2
                }
            });

            // 1. Rangoli blooms and slowly rotates
            tl.to(rangoliRef.current, { scale: 1, opacity: 0.4, rotation: 60, duration: 2, ease: "power2.out" }, 0);

            // 2. Thali gracefully lowers into the center
            tl.to(thaliRef.current, { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }, 0.5);

            // 3. Diyas illuminate around the thali
            tl.fromTo('.festival-diya',
                { y: 30, scale: 0 },
                { opacity: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.3, ease: "elastic.out(1)" },
                1.2
            );

            // 4. Gift boxes slide horizontally into the scene
            tl.fromTo('.gift-box',
                { x: (i, t) => i % 2 === 0 ? -100 : 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power2.out" },
                1.5
            );

            // 5. Ambient glowing light intensifies beautifully
            tl.fromTo('.ambient-glow', { opacity: 0 }, { opacity: 0.5, duration: 2 }, 2.0);

            // 6. Slowly continue rotating rangoli through remainder of scroll
            tl.to(rangoliRef.current, { rotation: 120, duration: 2 }, 2.0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="festive" ref={containerRef} className="relative w-full h-[100vh] bg-[#0A0205] overflow-hidden border-t border-[#C9A84C]/10 flex flex-col items-center justify-center">

            {/* Ambient Base Light */}
            <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full mix-blend-screen pointer-events-none blur-[100px] bg-[radial-gradient(circle,rgba(201,168,76,0.3)_0%,transparent_60%)] z-[1]" />

            {/* The Text Layer (Header) */}
            <div className="absolute top-[8%] md:top-[12%] text-center z-50 w-full px-4">
                <h3 className="font-display text-[#C9A84C] tracking-[0.4em] uppercase text-xs mb-3 opacity-90">
                    The Essence
                </h3>
                <h2 className="font-serif text-4xl md:text-6xl text-[#F7E7CE] text-glow-gold">
                    Festive <span className="italic text-gradient-gold">Traditions</span>
                </h2>
            </div>

            {/* Floating Soft Particles (Unpinned Parallax Overlay) */}
            <div className="absolute inset-0 z-40 pointer-events-none opacity-60">
                {[...Array(15)].map((_, i) => (
                    <motion.div key={`fp-${i}`} className="absolute rounded-full bg-[#FFD700]"
                        style={{
                            width: Math.random() * 3 + 2 + 'px', height: Math.random() * 3 + 2 + 'px',
                            top: Math.random() * 100 + '%', left: Math.random() * 100 + '%',
                            filter: 'blur(1px)'
                        }}
                        animate={{
                            y: [0, Math.random() * -100 - 50],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{ duration: Math.random() * 8 + 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                ))}

                {/* Floating Marigold Petals */}
                {[...Array(8)].map((_, i) => (
                    <motion.div key={`mp-${i}`} className="absolute drop-shadow-md"
                        style={{
                            width: Math.random() * 8 + 8 + 'px', height: Math.random() * 6 + 6 + 'px',
                            background: 'linear-gradient(135deg, #FFB300 0%, #D44E15 100%)',
                            borderRadius: '100% 0 100% 0',
                            top: -20, left: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: ['0vh', '110vh'],
                            x: [0, Math.random() * 80 - 40],
                            rotate: [0, 360],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, delay: Math.random() * 10, ease: 'linear' }}
                    />
                ))}
            </div>

            {/* Core Scene Elements */}
            <div className="relative w-full h-[60vh] max-w-5xl mx-auto z-[10] mt-10">

                <AbstractRangoli ref={rangoliRef} />

                {/* 4 Diyas surrounding the central plate */}
                <FestivalCandle x="35%" y="15%" />
                <FestivalCandle x="65%" y="15%" />
                <FestivalCandle x="25%" y="75%" />
                <FestivalCandle x="75%" y="75%" />

                {/* Gifts on outer perimeter */}
                <GiftBox left={true} bg="bg-gradient-to-br from-[#1A0508] to-[#4A0820]" rotate={-15} xOff={0} yOff={-40} />
                <GiftBox left={false} bg="bg-gradient-to-br from-[#110204] to-[#2B0813]" rotate={10} xOff={0} yOff={60} />
                <GiftBox left={false} bg="bg-gradient-to-br from-[#4A0820] to-[#1A0508]" rotate={-5} xOff={20} yOff={-80} />

                <RakhiThali ref={thaliRef} />

            </div>

            {/* Bottom Blending Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent pointer-events-none z-[50]" />

        </section>
    );
};

export default FestiveSceneSection;
