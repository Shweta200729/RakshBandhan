import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const ThreadNode = ({ text, top, isLeft, cx }) => {
    return (
        <div className={`absolute -translate-y-1/2 flex items-center gap-4 md:gap-8 z-30 group`}
            style={{
                top: top,
                left: isLeft ? 'auto' : `calc(${cx} + 15px)`,
                right: isLeft ? `calc(${100} - ${cx} + 15px)` : 'auto'
            }}>

            {/* Text Content */}
            <div className="flex flex-col items-start message-content transition-all duration-500 ease-out translate-y-4 opacity-70 group-hover:opacity-100 group-hover:translate-y-0 cursor-default">
                <p className={`font-elegant italic text-[#F7E7CE] text-xl md:text-3xl max-w-[200px] md:max-w-xs ${isLeft ? 'text-right' : 'text-left'}`}>
                    {text}
                </p>
                <div className={`w-0 h-px bg-gradient-to-r from-[#C9A84C] to-transparent mt-2 transition-all duration-700 ease-in-out group-hover:w-full ${isLeft ? 'rotate-180 self-end' : ''}`} />
            </div>

            {/* Focus Glow Ring (appears around the invisible path point on hover) */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#C9A84C]/40 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 bg-[radial-gradient(circle,rgba(255,215,0,0.2)_0%,transparent_60%)] mix-blend-screen pointer-events-none ${isLeft ? '-right-[8px]' : '-left-[38px]'}`} />

            {/* Core interaction dot to trigger hover easily */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full cursor-crosshair z-40 ${isLeft ? '-right-[21px]' : '-left-[21px]'}`} />
        </div>
    );
};

const ThreadSection = () => {
    const sectionRef = useRef(null);
    const maroonPathRef = useRef(null);
    const goldPathRef = useRef(null);
    const goldTwistRef = useRef(null);

    const [pathReady, setPathReady] = useState(false);

    useEffect(() => {
        // Setup GSAP paths drawing
        const setupPath = (pathObj) => {
            if (!pathObj) return;
            const length = pathObj.getTotalLength();
            gsap.set(pathObj, { strokeDasharray: length, strokeDashoffset: length });
            return length;
        };

        const setupTwist = (pathObj) => {
            if (!pathObj) return;
            const length = pathObj.getTotalLength();
            // Dashed pattern for golden wrapper wire
            gsap.set(pathObj, { strokeDasharray: `20 ${length}`, strokeDashoffset: length });
            return length;
        }

        const lenMaroon = setupPath(maroonPathRef.current);
        const lenGold = setupPath(goldPathRef.current);
        const lenTwist = setupTwist(goldTwistRef.current);

        if (lenMaroon && lenGold) setPathReady(true);

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom 80%",
                    scrub: 1.5
                }
            });

            // Draw the paths down the screen
            tl.to(maroonPathRef.current, { strokeDashoffset: 0, ease: 'none' }, 0);
            tl.to(goldPathRef.current, { strokeDashoffset: 0, ease: 'none' }, 0);
            tl.to(goldTwistRef.current, { strokeDashoffset: 0, ease: 'none' }, 0);

            // Stagger messages fade in as the scroll hits their section
            const msgs = gsap.utils.toArray('.message-content');
            msgs.forEach((msg, i) => {
                gsap.fromTo(msg,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 0.7, y: 0, ease: 'power2.out', scrollTrigger: {
                            trigger: sectionRef.current,
                            start: `top+=${(i + 1) * 15}% 60%`,
                            toggleActions: 'play none none reverse'
                        }
                    });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="celebration" ref={sectionRef} className="relative w-full h-[250vh] bg-[#0A0205] border-t border-[#C9A84C]/20 overflow-hidden">

            {/* Ambient Lighting & Noise */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-x-0 h-full bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,2,5,0.95)_100%)]" />
            </div>

            {/* Title fixed at top while scrolling? Or just standard flow. Let's make it standard flow at the top. */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 text-center z-20 w-[90%]">
                <h3 className="font-serif text-4xl md:text-6xl text-[#F7E7CE] text-glow-gold tracking-wide">
                    Ties that <span className="text-gradient-gold italic font-bold drop-shadow-md">Bind</span>
                </h3>
                <p className="font-elegant text-lg md:text-xl text-[#C9A84C] opacity-60 mt-4 tracking-widest uppercase">
                    Two threads, one destiny
                </p>
            </div>

            {/* SVG SVG Canvas */}
            <div className="absolute inset-0 z-[10] pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_15px_#C9A84C]">
                    <defs>
                        <linearGradient id="maroonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2B0D16" />
                            <stop offset="20%" stopColor="#8C1040" />
                            <stop offset="50%" stopColor="#D4145A" />
                            <stop offset="80%" stopColor="#8C1040" />
                            <stop offset="100%" stopColor="#2B0D16" />
                        </linearGradient>
                        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#A07830" />
                            <stop offset="20%" stopColor="#FFD700" />
                            <stop offset="50%" stopColor="#FFF4D0" />
                            <stop offset="80%" stopColor="#FFD700" />
                            <stop offset="100%" stopColor="#A07830" />
                        </linearGradient>
                        <filter id="threadGlow">
                            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* The Paths (Using X: 0-100, Y: 0-100 coordinate space) */}
                    {/* Path 1: Maroon (Sibling 1) */}
                    <path
                        ref={maroonPathRef}
                        className="transition-all duration-300 pointer-events-none"
                        d="M20,0 C60,20  80,30  50,50 C20,70  40,80  80,100"
                        stroke="url(#maroonGrad)"
                        strokeWidth={pathReady ? "1.2" : "0"}
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        ref={goldTwistRef}
                        className="transition-all duration-300 pointer-events-none mix-blend-screen"
                        d="M20,0 C60,20  80,30  50,50 C20,70  40,80  80,100"
                        stroke="#FFD700"
                        strokeWidth={pathReady ? "0.4" : "0"}
                        fill="none"
                    />

                    {/* Path 2: Gold (Sibling 2) */}
                    <path
                        ref={goldPathRef}
                        className="transition-all duration-300 pointer-events-none"
                        d="M80,0 C40,20  20,30  50,50 C80,70  60,80  20,100"
                        stroke="url(#goldGrad)"
                        strokeWidth={pathReady ? "0.8" : "0"}
                        filter="url(#threadGlow)"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Central Rakhi Knot at exactly X:50, Y:50 */}
                    <circle cx="50" cy="50" r="1.5" fill="#C9A84C" filter="url(#threadGlow)"
                        className="origin-center animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx="50" cy="50" r="1" fill="#FFD700" />
                    <circle cx="50" cy="50" r="0.5" fill="#FF4B4B" />
                </svg>
            </div>

            {/* Interactive Message Nodes along the SVG coordinates */}
            {/* Note: SVG Y is mapped 0-100%, and X is mapped 0-100vw */}

            <ThreadNode text="Thanks for always being there." top="25%" cx="70%" isLeft={true} />
            <ThreadNode text="My forever partner in crime." top="35%" cx="27%" isLeft={false} />

            {/* The Rakhi central joint */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30 pointer-events-none">
                <p className="font-display tracking-[0.4em] text-xs text-[#FFD700] uppercase mt-12 bg-[#0A0205]/60 px-4 py-2 border border-[#C9A84C]/30 rounded-full">
                    The Divine Bond
                </p>
            </div>

            <ThreadNode text="No matter how much we fight..." top="65%" cx="70%" isLeft={true} />
            <ThreadNode text="...you're still my person." top="75%" cx="30%" isLeft={false} />


            {/* Closing Gradient to blend with whatever comes next or footer */}
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent z-[20] pointer-events-none" />

        </section>
    );
};

export default ThreadSection;
