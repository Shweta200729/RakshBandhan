import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const DistanceSection = () => {
    const containerRef = useRef(null);
    const threadRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%", // Pin for a long sequence
                    pin: true,
                    scrub: 1.5
                }
            });

            // 1. Thread draws perfectly down the center across the entire scroll
            tl.to(threadRef.current, { scaleY: 1, ease: 'none', duration: 4 }, 0);

            // 2. Sequential fades for the split text (staggered mapping to scroll depth)

            // "Different dreams." (Triggers early, fades in from deep left)
            tl.fromTo('.msg-1',
                { x: -100, opacity: 0, filter: 'blur(10px)' },
                { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: "power2.out" },
                0.5
            );

            // "Different cities." (Triggers mid, fades in from deep right)
            tl.fromTo('.msg-2',
                { x: 100, opacity: 0, filter: 'blur(10px)' },
                { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: "power2.out" },
                1.5
            );

            // "Different lives." (Triggers late-mid, fades in from deep left)
            tl.fromTo('.msg-3',
                { x: -100, opacity: 0, filter: 'blur(10px)' },
                { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: "power2.out" },
                2.5
            );

            // 3. The Grand Reveal: "Still one bond." 
            // Placed dead center over the thread at the very end
            tl.fromTo('.msg-4',
                { opacity: 0, scale: 0.8, y: 50 },
                { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power4.out" },
                3.2
            );

            // Ignites the core background glow connecting the two worlds
            tl.to(glowRef.current, { opacity: 0.7, scale: 2, duration: 1, ease: "power2.out" }, 3.2);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[100vh] bg-[#050102] overflow-hidden border-t border-[rgba(201,168,76,0.05)]">

            {/* Visual Screen Splitting Backgrounds */}
            <div className="absolute inset-0 flex pointer-events-none z-0">
                {/* Sibling 1 Aura */}
                <div className="w-1/2 h-full bg-gradient-to-r from-[#2B0813]/40 to-transparent" />
                {/* Sibling 2 Aura */}
                <div className="w-1/2 h-full bg-gradient-to-l from-[#1C1605]/40 to-transparent" />
            </div>

            {/* Central Thread */}
            <div className="absolute inset-0 flex justify-center items-center z-[5] pointer-events-none">
                <div
                    ref={threadRef}
                    className="w-[2px] h-full bg-gradient-to-b from-transparent via-[#FFD700] to-transparent origin-top shadow-[0_0_20px_rgba(255,215,0,0.8)]"
                    style={{ transform: 'scaleY(0)' }} // Initial state hidden
                />
            </div>

            {/* Ambient Connection Glow (Activates at the end) */}
            <div
                ref={glowRef}
                className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vh] h-[30vh] rounded-full bg-[#FFD700] mix-blend-screen opacity-0 blur-[80px] pointer-events-none z-[4]"
            />

            {/* Cinematic Text Stage */}
            <div className="relative w-full h-full max-w-6xl mx-auto z-10 flex flex-col justify-evenly py-[10vh]">

                <div className="flex w-full items-center justify-start px-[5%] md:px-[15%]">
                    <h3 className="msg-1 font-serif text-4xl md:text-6xl text-[#F7E7CE] opacity-0 drop-shadow-xl italic">
                        "Different <span className="text-[#C9A84C]">dreams.</span>"
                    </h3>
                </div>

                <div className="flex w-full items-center justify-end px-[5%] md:px-[15%]">
                    <h3 className="msg-2 font-serif text-4xl md:text-6xl text-[#F7E7CE] opacity-0 drop-shadow-xl italic">
                        "Different <span className="text-[#C9A84C]">cities.</span>"
                    </h3>
                </div>

                <div className="flex w-full items-center justify-start px-[5%] md:px-[15%]">
                    <h3 className="msg-3 font-serif text-4xl md:text-6xl text-[#F7E7CE] opacity-0 drop-shadow-xl italic">
                        "Different <span className="text-[#C9A84C]">lives.</span>"
                    </h3>
                </div>

                <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center w-full">
                    <h2 className="msg-4 font-serif font-bold text-5xl md:text-[5rem] text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] via-[#F7E7CE] to-[#C9A84C] opacity-0 uppercase tracking-widest text-glow-gold">
                        Still one bond.
                    </h2>
                </div>

            </div>

        </section>
    );
};

export default DistanceSection;
