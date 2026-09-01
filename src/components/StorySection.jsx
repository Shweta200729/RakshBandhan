import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from '../utils/gsap';

// ==========================================
// SVG & UI Assets
// ==========================================

const CurtainLeft = React.forwardRef((props, ref) => (
    <div ref={ref} className="absolute top-0 left-0 h-[105vh] w-[45vw] md:w-[35vw] origin-top-left z-[30]">
        <svg viewBox="0 0 100 200" preserveAspectRatio="none" className="w-full h-full drop-shadow-2xl">
            <defs>
                <linearGradient id="curtainGradL" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2B0D16" />
                    <stop offset="40%" stopColor="#6D0B2F" />
                    <stop offset="80%" stopColor="#8C1040" />
                    <stop offset="100%" stopColor="#110204" />
                </linearGradient>
            </defs>
            {/* Main drape */}
            <path d="M0,0 L100,0 Q80,80 30,120 Q10,160 0,200 Z" fill="url(#curtainGradL)" />
            {/* Fold line */}
            <path d="M20,0 Q15,80 0,110" stroke="#4A0820" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M40,0 Q35,80 10,130" stroke="#4A0820" strokeWidth="2" fill="none" opacity="0.4" />
            {/* Gold trim */}
            <path d="M100,0 Q80,80 30,120 Q10,160 0,200" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.8" />
        </svg>
    </div>
));

const CurtainRight = React.forwardRef((props, ref) => (
    <div ref={ref} className="absolute top-0 right-0 h-[105vh] w-[45vw] md:w-[35vw] origin-top-right z-[30]">
        <svg viewBox="0 0 100 200" preserveAspectRatio="none" className="w-full h-full drop-shadow-2xl">
            <defs>
                <linearGradient id="curtainGradR" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#2B0D16" />
                    <stop offset="40%" stopColor="#6D0B2F" />
                    <stop offset="80%" stopColor="#8C1040" />
                    <stop offset="100%" stopColor="#110204" />
                </linearGradient>
            </defs>
            <path d="M100,0 L0,0 Q20,80 70,120 Q90,160 100,200 Z" fill="url(#curtainGradR)" />
            <path d="M80,0 Q85,80 100,110" stroke="#4A0820" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M60,0 Q65,80 90,130" stroke="#4A0820" strokeWidth="2" fill="none" opacity="0.4" />
            {/* Gold trim */}
            <path d="M0,0 Q20,80 70,120 Q90,160 100,200" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.8" />
        </svg>
    </div>
));

const PalaceArchitecture = React.forwardRef((props, ref) => (
    <div ref={ref} className="absolute bottom-10 left-0 right-0 h-[60vh] flex items-end justify-center w-full gap-4 md:gap-16 z-[10] opacity-80 pointer-events-none">

        {/* Left Dome */}
        <div className="w-[20vw] md:w-64 h-[40vh] border-t border-l border-r border-[#C9A84C]/40 rounded-[50%_50%_0_0] bg-gradient-to-b from-[#2B0813] to-transparent relative shadow-[0_-10px_40px_rgba(201,168,76,0.05)]">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-gradient-to-t from-[#C9A84C] to-[#FFD700] rounded-t-full" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[70%] h-[70%] border-t border-[#A07830]/30 rounded-[50%_50%_0_0]" />
        </div>

        {/* Center Grand Dome */}
        <div className="w-[40vw] md:w-96 h-[55vh] border-t-2 border-l-2 border-r-2 border-[#C9A84C]/60 rounded-[50%_50%_0_0] bg-gradient-to-b from-[#4A0820] via-[#1A0508] to-transparent relative shadow-[0_0_60px_rgba(201,168,76,0.15)] flex justify-center">
            {/* Finial/Spire */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-1 h-6 bg-[#FFD700]" />
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#FFD700] to-[#A07830]" />
                <div className="w-2 h-4 bg-[#FFD700]" />
            </div>

            {/* Inner arches */}
            <div className="absolute top-12 w-[80%] h-[80%] border-t-2 border-[#C9A84C]/40 rounded-[50%_50%_0_0]" />
            <div className="absolute top-20 w-[60%] h-[60%] border-t border-[#C9A84C]/20 rounded-[50%_50%_0_0]" />

            {/* Small decorative lit windows */}
            <div className="absolute bottom-16 flex gap-4">
                <div className="w-4 h-8 rounded-t-full bg-[#FFD700] opacity-0 shadow-[0_0_15px_#FFD700] diya-glow" />
                <div className="w-4 h-8 rounded-t-full bg-[#FFD700] opacity-0 shadow-[0_0_15px_#FFD700] diya-glow" />
                <div className="w-4 h-8 rounded-t-full bg-[#FFD700] opacity-0 shadow-[0_0_15px_#FFD700] diya-glow" />
            </div>
        </div>

        {/* Right Dome */}
        <div className="w-[20vw] md:w-64 h-[40vh] border-t border-l border-r border-[#C9A84C]/40 rounded-[50%_50%_0_0] bg-gradient-to-b from-[#2B0813] to-transparent relative shadow-[0_-10px_40px_rgba(201,168,76,0.05)]">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-gradient-to-t from-[#C9A84C] to-[#FFD700] rounded-t-full" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[70%] h-[70%] border-t border-[#A07830]/30 rounded-[50%_50%_0_0]" />
        </div>
    </div>
));

const AnimatedDiyas = React.forwardRef((props, ref) => (
    <div ref={ref} className="absolute bottom-0 w-full h-[15vh] z-[40] flex items-end justify-between px-[10vw]">
        {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className="mb-2 relative flex flex-col items-center">
                {/* Glow */}
                <div className="absolute -top-8 w-16 h-16 rounded-full mix-blend-screen bg-[radial-gradient(circle,rgba(255,215,0,0.6)_0%,transparent_70%)] animate-pulse-gold" />
                {/* Flame */}
                <div className="w-2.5 h-4 bg-gradient-to-t from-[#FF8C00] to-[#FFD700] rounded-t-full rounded-b-sm z-10 blur-[0.5px] animate-flicker-flame" style={{ animationDelay: `${i * 0.2}s` }} />
                {/* Base */}
                <div className="w-8 h-2.5 bg-gradient-to-b from-[#C9A84C] to-[#6b4716] rounded-b-xl z-0" />
            </div>
        ))}
    </div>
));


const HangingGarlands = React.forwardRef((props, ref) => (
    <div ref={ref} className="absolute top-0 left-0 w-full flex justify-between px-4 md:px-[15vw] z-[35]">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="relative w-1 h-[20vh] md:h-[35vh]">
                <div className="absolute w-[1px] h-full bg-[#C9A84C]/30 left-1/2 -translate-x-1/2" />
                {[...Array(8)].map((_, j) => (
                    <div key={j} className="absolute left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full shadow-sm"
                        style={{
                            top: `${10 + j * 12}%`,
                            background: 'radial-gradient(circle at 30% 30%, #FFB300, #F57F17)',
                            animation: `float-flower 4s ease-in-out infinite alternate ${j * 0.1 + i * 0.2}s`
                        }}
                    />
                ))}
            </div>
        ))}
    </div>
));


// ==========================================
// Main Component
// ==========================================

const StorySection = () => {
    const sectionRef = useRef(null);

    // Layer Refs for Parallax and Animations
    const skyRef = useRef(null);
    const palaceRef = useRef(null);
    const curtainLeftRef = useRef(null);
    const curtainRightRef = useRef(null);
    const flowersRef = useRef(null);
    const diyasRef = useRef(null);
    const textRef = useRef(null);
    const bgGlowRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=120%", // Pin for 120% viewport height scroll distance
                    pin: true,
                    scrub: 1, // Smooth scrub
                }
            });

            // 1. Curtains open up and outward
            tl.to(curtainLeftRef.current, { x: "-60%", scale: 1.1, opacity: 0.8 }, 0);
            tl.to(curtainRightRef.current, { x: "60%", scale: 1.1, opacity: 0.8 }, 0);

            // 2. Palace scales up and moves up slightly (Parallax depth)
            tl.fromTo(palaceRef.current,
                { y: 50, scale: 0.9, opacity: 0 },
                { y: 0, scale: 1.05, opacity: 1 }, 0
            );

            // Light up palace windows
            tl.to('.diya-glow', { opacity: 1, stagger: 0.1 }, 0.2);

            // 3. Central glowing atmospheric light enhances
            tl.fromTo(bgGlowRef.current, { scale: 0.5, opacity: 0 }, { scale: 1.5, opacity: 0.2 }, 0);

            // 4. Sky moves at extreme slow varying speed (Parallax back)
            tl.to(skyRef.current, { y: "-15%", scale: 1.05 }, 0);

            // 5. Flowers cascade/drop down smoothly
            tl.fromTo(flowersRef.current, { y: "-50%", opacity: 0 }, { y: "0%", opacity: 1 }, 0.1);

            // 6. Diyas illuminate and scale up
            tl.fromTo(diyasRef.current, { y: 20, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1 }, 0.15);

            // 7. Text fades and moves into place
            tl.fromTo(textRef.current, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1 }, 0.2);

        }, sectionRef);

        return () => ctx.revert(); // Cleanup GSAP context on unmount
    }, []);

    return (
        <section id="story" ref={sectionRef} className="relative w-full h-[100vh] bg-[#1A0508] overflow-hidden">

            {/* CSS Keyframes injected here for local animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float-flower {
                    0% { transform: translate(-50%, 0) rotate(0deg); }
                    100% { transform: translate(-50%, -10px) rotate(15deg); }
                }
                @keyframes flicker-flame {
                    0%, 100% { transform: scaleY(1) rotate(-2deg); }
                    50% { transform: scaleY(1.1) rotate(2deg); opacity: 0.9; }
                }
            `}} />

            {/* Layer 1: Sky / Background */}
            <div ref={skyRef} className="absolute inset-0 z-0 origin-top">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A0508] via-[#0D0104] to-[#1A0508]" />

                {/* Central Soft Glow representing distant moonlight/citylight */}
                <div ref={bgGlowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[#FFD700] mix-blend-screen blur-[120px] pointer-events-none" />
            </div>

            {/* Layer 2: Palace Structure (Midground) */}
            <PalaceArchitecture ref={palaceRef} />

            {/* Content Text (Mid-Foreground) */}
            <div className="absolute inset-0 z-[25] flex flex-col items-center justify-center pointer-events-none mt-[-10vh]">
                <div ref={textRef} className="text-center px-4">
                    <p className="font-display tracking-[0.3em] text-[0.7rem] md:text-sm text-gradient-gold mb-4 uppercase">
                        Experience the Grandeur
                    </p>
                    <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] md:text-7xl lg:text-[5.5rem] leading-[1.1] text-gradient-gold">
                        Welcome to the<br />
                        <span className="italic font-bold text-[#F7E7CE] text-glow-gold drop-shadow-md">Celebration</span>
                    </h2>
                    <div className="w-16 md:w-32 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mt-6 glow-gold opacity-70" />
                </div>
            </div>

            {/* Layer 3: Curtains (Foreground Edges) */}
            <CurtainLeft ref={curtainLeftRef} />
            <CurtainRight ref={curtainRightRef} />

            {/* Layer 4: Flowers (Foreground Top) */}
            <HangingGarlands ref={flowersRef} />

            {/* Layer 5: Diyas (Foreground Bottom) */}
            <AnimatedDiyas ref={diyasRef} />

            {/* Pillar Frame (Absolute Foreground framing the scene) */}
            <div className="absolute inset-0 z-[45] flex justify-between pointer-events-none">
                {/* Left Pillar */}
                <div className="w-[5vw] md:w-[6vw] h-full bg-gradient-to-r from-[#0F0204] to-[#2B0813] border-r border-[#C9A84C]/40 shadow-[15px_0_40px_rgba(0,0,0,0.9)] flex justify-center">
                    <div className="w-[1px] h-full bg-[#FFD700]/20" />
                </div>
                {/* Right Pillar */}
                <div className="w-[5vw] md:w-[6vw] h-full bg-gradient-to-l from-[#0F0204] to-[#2B0813] border-l border-[#C9A84C]/40 shadow-[-15px_0_40px_rgba(0,0,0,0.9)] flex justify-center">
                    <div className="w-[1px] h-full bg-[#FFD700]/20" />
                </div>
            </div>

            {/* Subtle Gradient Overlay to blend visually with top and bottom bounds */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1A0508] to-transparent z-[50] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent z-[50] pointer-events-none" />

            {/* Ambient Golden Particles layered sparingly across the whole pinned scene */}
            <div className="absolute inset-0 z-[42] pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-gradient-to-tr from-[#FFD700] to-[#FFFFFF]"
                        style={{
                            width: `${Math.random() * 3 + 1.5}px`, height: `${Math.random() * 3 + 1.5}px`,
                            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.4 + 0.1,
                            animation: `float-flower ${Math.random() * 5 + 10}s linear infinite alternate`
                        }}
                    />
                ))}
            </div>

        </section>
    );
};

export default StorySection;
