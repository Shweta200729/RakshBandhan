import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const cinematicScenes = [
    {
        phrase: "WE FIGHT.",
        subtitle: "From petty quarrels to endless laughs, our bond was forged in love.",
        tag: "Chapter I",
        img: "/images/we-fight.jpg"
    },
    {
        phrase: "WE LAUGH.",
        subtitle: "The pure, radiant joy that turns ordinary moments into golden memories.",
        tag: "Chapter II",
        img: "/images/we-laugh.jpg"
    },
    {
        phrase: "WE TEASE.",
        subtitle: "Unmatched banter and inside jokes that only we will ever understand.",
        tag: "Chapter III",
        img: "/images/we-tease.jpg"
    },
    {
        phrase: "WE PROTECT.",
        subtitle: "An unspoken sacred shield, standing strong through every storm.",
        tag: "Chapter IV",
        img: "/images/we-protect.jpg"
    },
    {
        phrase: "WE BELONG.",
        subtitle: "Bound by blood, blessed by love — today, tomorrow, and forever.",
        tag: "The Eternal Bond",
        img: "/images/we-belong.jpg"
    }
];

const CinematicTypography = () => {
    const containerRef = useRef(null);
    const bgGlowRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=550%", // Pinned for 5.5 screens for smooth narrative pacing
                    pin: true,
                    scrub: 1.2,
                }
            });

            const bgImages = gsap.utils.toArray('.cinematic-bg-layer');
            const textScenes = gsap.utils.toArray('.cinematic-text-layer');
            const stepDots = gsap.utils.toArray('.step-dot');

            cinematicScenes.forEach((_, i) => {
                const isLast = i === cinematicScenes.length - 1;
                const isFirst = i === 0;

                // 1. Initial State for first scene
                if (isFirst) {
                    gsap.set(bgImages[0], { opacity: 1, scale: 1 });
                    gsap.set(textScenes[0], { opacity: 1, y: 0, scale: 1 });
                    gsap.set(stepDots[0], { scale: 1.4, opacity: 1, backgroundColor: '#FFD700' });
                }

                // 2. Transition into Scene (if not first)
                if (!isFirst) {
                    const prevIndex = i - 1;

                    // Transition timeline point
                    tl.add(`scene-${i}`);

                    // Fade out previous background & text
                    tl.to(bgImages[prevIndex], {
                        opacity: 0,
                        scale: 1.08,
                        duration: 1.8,
                        ease: "power2.inOut"
                    }, `scene-${i}`);

                    tl.to(textScenes[prevIndex], {
                        opacity: 0,
                        y: -80,
                        scale: 0.95,
                        duration: 1.2,
                        ease: "power2.in"
                    }, `scene-${i}`);

                    tl.to(stepDots[prevIndex], {
                        scale: 1,
                        opacity: 0.4,
                        backgroundColor: '#C9A84C',
                        duration: 0.6
                    }, `scene-${i}`);

                    // Fade in current background & text
                    tl.fromTo(bgImages[i],
                        { opacity: 0, scale: 1.12 },
                        { opacity: 1, scale: 1.02, duration: 2, ease: "power2.out" },
                        `scene-${i}`
                    );

                    tl.fromTo(textScenes[i],
                        { opacity: 0, y: 80, scale: 1.05 },
                        { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: "power3.out" },
                        `scene-${i}+=0.3`
                    );

                    tl.to(stepDots[i], {
                        scale: 1.4,
                        opacity: 1,
                        backgroundColor: '#FFD700',
                        duration: 0.6
                    }, `scene-${i}`);
                }

                // 3. Hold frame so viewer absorbs the moment
                tl.to({}, { duration: isLast ? 3.5 : 2 });
            });

            // Finale Glow expansion
            tl.fromTo(bgGlowRef.current,
                { opacity: 0, scale: 0.6 },
                { opacity: 0.7, scale: 1.4, duration: 3, ease: "power2.out" },
                "-=3"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-[#050102] overflow-hidden flex flex-col items-center justify-center border-t border-[#C9A84C]/15"
        >

            {/* 1. Stack of Background Image Layers */}
            {cinematicScenes.map((scene, index) => (
                <div
                    key={index}
                    className={`cinematic-bg-layer absolute inset-0 w-full h-full pointer-events-none will-change-transform will-change-opacity ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Real User Image */}
                    <img
                        src={scene.img}
                        alt={scene.phrase}
                        className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.1] saturate-[1.15]"
                        loading={index <= 1 ? "eager" : "lazy"}
                    />

                    {/* Rich Festive Film Gradients and Vignette Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120206] via-transparent to-[#120206]/90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#120206]/85 via-transparent to-[#120206]/85" />
                    <div className="absolute inset-0 bg-[#3B0716]/30 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-radial from-transparent via-[#0A0205]/40 to-[#0A0205]/90" />
                </div>
            ))}

            {/* Ambient Gold Radial Glow (Expands in finale) */}
            <div
                ref={bgGlowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] rounded-full mix-blend-screen pointer-events-none blur-[120px] z-10 opacity-0"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, rgba(109, 11, 47, 0.2) 45%, transparent 70%)'
                }}
            />

            {/* 2. Central Typography Narrative Layer */}
            <div className="relative w-full h-full flex items-center justify-center z-20 px-4 md:px-8 text-center">
                {cinematicScenes.map((scene, index) => {
                    const isLast = index === cinematicScenes.length - 1;

                    return (
                        <div
                            key={index}
                            className={`cinematic-text-layer absolute flex flex-col items-center justify-center max-w-4xl px-4 pointer-events-none will-change-transform will-change-opacity ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {/* Chapter Pill Badge */}
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#1A0508]/75 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
                                <span className="font-display text-[10px] md:text-xs tracking-[0.35em] text-[#FFD700] uppercase font-semibold">
                                    {scene.tag}
                                </span>
                            </div>

                            {/* Main Hero Headline */}
                            {isLast ? (
                                <h1
                                    className="font-serif font-black text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD700] to-[#C9A84C] mb-4 drop-shadow-[0_10px_35px_rgba(255,215,0,0.5)] leading-none"
                                >
                                    {scene.phrase}
                                </h1>
                            ) : (
                                <h2
                                    className="font-serif italic font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] text-[#FFF8F0] tracking-wide uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)] mb-4 leading-none"
                                >
                                    {scene.phrase}
                                </h2>
                            )}

                            {/* Poetic Subtitle */}
                            <p className="font-elegant italic text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F7E7CE]/90 max-w-2xl mx-auto drop-shadow-md leading-relaxed tracking-wide">
                                "{scene.subtitle}"
                            </p>

                            {/* Decorative Gold Filament Divider */}
                            <div className="w-32 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-8 opacity-70" />
                        </div>
                    );
                })}
            </div>

            {/* 3. Right-Side Chapter Stepper Indicator */}
            <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-4 pointer-events-none">
                {cinematicScenes.map((_, index) => (
                    <div
                        key={index}
                        className="step-dot w-2 h-2 rounded-full bg-[#C9A84C] opacity-40 transition-all duration-300 shadow-[0_0_8px_rgba(255,215,0,0.4)]"
                    />
                ))}
            </div>

            {/* Top & Bottom Seamless Transition Gradients */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-bg-primary)] to-transparent pointer-events-none z-30" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent pointer-events-none z-30" />
        </section>
    );
};

export default CinematicTypography;

