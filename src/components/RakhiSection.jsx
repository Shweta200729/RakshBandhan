import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';


// ==========================================
// SVG Assets
// ==========================================

const RakhiCenter = () => {
    // 16 point sunburst base
    const points = [];
    for (let i = 0; i < 32; i++) {
        let radius = i % 2 === 0 ? 120 : 100;
        let angle = (i * Math.PI) / 16;
        points.push(`${200 + radius * Math.cos(angle)},${200 + radius * Math.sin(angle)}`);
    }

    // Gold beaded ring
    const beadPoints = [];
    for (let i = 0; i < 36; i++) {
        let angle = (i * Math.PI) / 18;
        beadPoints.push(
            <circle key={i} cx={200 + 75 * Math.cos(angle)} cy={200 + 75 * Math.sin(angle)} r="4" fill="#FFD700" />
        );
    }

    // Lotus petals
    const petals = [];
    for (let i = 0; i < 8; i++) {
        let angle = (i * Math.PI) / 4;
        petals.push(
            <circle key={`petal${i}`} cx={200 + 40 * Math.cos(angle)} cy={200 + 40 * Math.sin(angle)} r="18" fill="url(#rubyGrad)" stroke="#C9A84C" strokeWidth="1" />
        );
    }

    return (
        <svg width="100%" height="100%" viewBox="0 0 400 400" className="drop-shadow-[0_20px_50px_rgba(201,168,76,0.3)]">
            <defs>
                <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="60%" stopColor="#C9A84C" />
                    <stop offset="100%" stopColor="#A07830" />
                </radialGradient>
                <radialGradient id="rubyGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FF4B4B" />
                    <stop offset="70%" stopColor="#6D0B2F" />
                    <stop offset="100%" stopColor="#110204" />
                </radialGradient>
                <filter id="goldGlow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Outer radiating aura (spinning in opposite direction via React if we wanted) */}
            <circle cx="200" cy="200" r="140" fill="transparent" stroke="url(#sunGrad)" strokeWidth="1" strokeDasharray="5 15" opacity="0.6" />

            {/* Base Gold Star */}
            <polygon points={points.join(' ')} fill="url(#sunGrad)" filter="url(#goldGlow)" />

            {/* Inner Velvet Base */}
            <circle cx="200" cy="200" r="90" fill="url(#rubyGrad)" stroke="#FFD700" strokeWidth="3" />

            {/* Gold Beads */}
            {beadPoints}

            {/* Lotus Petals */}
            {petals}

            {/* Center Diamonds */}
            <polygon points="200,165 235,200 200,235 165,200" fill="#FFF4D0" />
            <polygon points="200,170 230,200 200,230 170,200" fill="url(#rubyGrad)" />

            {/* Realism Highlights */}
            <path d="M190,180 Q200,175 210,180 Q205,190 190,180" fill="#FFFFFF" opacity="0.7" />
            <path d="M210,210 Q220,215 225,225" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.3" />
        </svg>
    )
};


const RakhiThreads = React.forwardRef((props, ref) => (
    <div ref={ref} className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[80px] pointer-events-none opacity-80 z-[15] overflow-visible">
        {/* Render a wide SVG taking horizontal space */}
        <svg w="100%" height="80" preserveAspectRatio="none" className="w-[200%] md:w-[150%] left-1/2 absolute -translate-x-1/2">
            <defs>
                <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="20%" stopColor="#8C1040" />
                    <stop offset="45%" stopColor="#C9A84C" />
                    <stop offset="55%" stopColor="#C9A84C" />
                    <stop offset="80%" stopColor="#8C1040" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
            <path d="M0,45 Q500,60 1000,45 T2000,45 T4000,45" stroke="url(#threadGrad)" strokeWidth="6" fill="none" />
            <path d="M0,35 Q400,20 1000,35 T3000,35 T5000,35" stroke="url(#threadGrad)" strokeWidth="4" fill="none" />

            {/* Fine gold woven detail */}
            <path d="M0,45 Q500,60 1000,45 T2000,45 T4000,45" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.7" />
        </svg>
    </div>
));


// ==========================================
// Main Component
// ==========================================
const RakhiSection = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const rakhiContainerRef = useRef(null);
    const threadsRef = useRef(null);
    const particlesRef = useRef(null);

    // Text blocks
    const headingRef = useRef(null);
    const captionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=150%", // Pins for 150% viewport
                    pin: true,
                    scrub: 1
                }
            });

            // 1. Background subtly shifts to deeper maroon
            tl.to(bgRef.current, { backgroundColor: '#1A0207', ease: 'none' }, 0);

            // 2. Rakhi explodes in size and stays centered
            tl.to(rakhiContainerRef.current, { scale: 2.2, opacity: 1, ease: 'power2.inOut' }, 0);

            // 3. Threads stretch and expand
            tl.to(threadsRef.current, { scaleX: 1.5, opacity: 0.5 }, 0);

            // 4. Texts spread apart vertically to frame the massive Rakhi
            tl.to(headingRef.current, { y: -150, opacity: 0, scale: 0.9 }, 0);
            tl.to(captionRef.current, { y: 150, opacity: 0, scale: 0.9 }, 0);

            // 5. Particles react heavily to the scroll (bursting upward)
            tl.to(particlesRef.current, { y: -250, opacity: 1 }, 0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="memories" ref={sectionRef} className="relative w-full h-[100vh] overflow-hidden text-center flex flex-col items-center justify-center">

            {/* Target for Background Shift */}
            <div ref={bgRef} className="absolute inset-0 z-0 bg-[#0A0205]" />

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 z-[1] pointer-events-none opacity-40 mix-blend-screen"
                style={{ background: 'radial-gradient(circle at center, rgba(201,168,76,0.2) 0%, transparent 60%)' }} />

            {/* Ambient Corner Patterns */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] opacity-10 bg-[radial-gradient(circle,rgba(201,168,76,1)_0%,transparent_60%)] -translate-x-[20%] -translate-y-[20%] pointer-events-none mix-blend-screen mix-blend-color-dodge bg-no-repeat" style={{ backgroundImage: "repeating-radial-gradient( circle at 0 0, transparent 0, #C9A84C 10px ), repeating-linear-gradient( #4A0820, #4A0820)" }} />

            {/* Golden Particles (Reacts to Scroll) */}
            <div ref={particlesRef} className="absolute inset-0 z-[5] pointer-events-none opacity-40">
                {[...Array(24)].map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-[#FFD700] mix-blend-screen blur-[1px]"
                        style={{
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.6 + 0.2,
                        }}
                    />
                ))}
            </div>

            {/* Main Visuals Container */}

            {/* The Threads */}
            <RakhiThreads ref={threadsRef} />

            {/* The Centerpiece Rakhi */}
            <div ref={rakhiContainerRef} className="relative z-[20] w-[50vw] md:w-[25vw] max-w-[300px] aspect-square flex items-center justify-center origin-center">

                {/* Framer motion handles the perpetual gentle float & rotate */}
                <motion.div className="w-full h-full"
                    animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <RakhiCenter />
                </motion.div>

            </div>


            {/* Content Foreground */}
            <div className="absolute inset-0 z-[25] flex flex-col justify-between pointer-events-none py-[15vh] px-6">

                {/* Heading Block */}
                <div ref={headingRef} className="flex flex-col items-center">
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gradient-gold leading-tight drop-shadow-xl text-glow-gold">
                        A thread.
                        <br />
                        <span className="italic">A promise.</span>
                        <br />
                        A lifetime.
                    </h2>
                </div>

                {/* Text Description Block */}
                <div ref={captionRef} className="w-full flex justify-center">
                    <p className="font-elegant italic text-2xl md:text-3xl text-[#F7E7CE] opacity-90 max-w-3xl leading-relaxed text-center"
                        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                        "A tiny thread carrying years of memories, countless fights, endless laughter, and a promise that distance can never break."
                    </p>
                </div>

            </div>

            {/* Ground Layers - Diyas & Red Glow (Stays Static with bottom during scroll) */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#110204] to-transparent z-[15] pointer-events-none flex justify-around items-end pb-4 opacity-50 px-10 border-t border-[#C9A84C]/10">
                <div className="w-6 h-6 rounded-full bg-[#FFD700] blur-xl opacity-70" />
                <div className="w-6 h-6 rounded-full bg-[#FFD700] blur-xl opacity-70" />
                <div className="w-6 h-6 rounded-full bg-[#FFD700] blur-xl opacity-70" />
            </div>

        </section>
    );
};

export default RakhiSection;
