import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from '../utils/gsap';

// ==========================================
// Timeline Data
// ==========================================
const timelineSteps = [
    {
        title: "Childhood",
        caption: "The one who stole your toys, but gave you the best memories.",
        colorHue: 0,
        src: "/images/childhood.png"
    },
    {
        title: "First Fight",
        caption: "Fierce enemies for five minutes, best friends forever after.",
        colorHue: 25,
        src: "/images/first-fight.jpg"
    },
    {
        title: "Partners in Crime",
        caption: "The person who knew every secret, and helped hide the evidence.",
        colorHue: 45,
        src: "/images/partners-in-crime.jpg"
    },
    {
        title: "Growing Up",
        caption: "Shared laughter, shared tears, and a bond that only grew stronger.",
        colorHue: 330,
        src: "/images/growing-up.png"
    },
    {
        title: "Different Paths",
        caption: "Miles apart, yet close at heart. The silent anchor in the chaos of life.",
        colorHue: 280,
        src: "/images/different-paths.jpg"
    },
    {
        title: "Still Together",
        caption: "The person who will always have your back, today and forever.",
        colorHue: 50,
        src: "/images/still-together.jpg"
    }
];

// Arched Royal Frame for Memories
const ImageBox = ({ item, index }) => (
    <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#110204] border border-[#C9A84C]/30 rounded-t-full shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(201,168,76,0.12)] flex items-center justify-center p-2 group transition-all duration-500 hover:border-[#FFD700]/70 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,215,0,0.25)]">
        {/* Inner arched frame */}
        <div className="w-full h-full border border-[#C9A84C]/20 rounded-t-full relative overflow-hidden bg-[#1A0508]">
            <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] saturate-[1.1] transition-transform duration-1000 ease-[0.25,0.46,0.45,0.94] group-hover:scale-108 group-hover:brightness-100"
                loading="lazy"
            />
            {/* Cinematic Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#110204]/90 via-transparent to-[#110204]/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[#6D0B2F]/15 mix-blend-color-burn pointer-events-none" />

            {/* Stage badge in arch */}
            <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-[#110204]/80 backdrop-blur-md border border-[#C9A84C]/30 text-[10px] font-display text-[#FFD700] tracking-wider uppercase shadow-md">
                0{index + 1}
            </div>
        </div>
    </div>
);

const TimelineNode = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <div className="timeline-node relative w-full flex justify-center items-center py-16 md:py-32">

            {/* Container for content */}
            <div className={`w-full max-w-5xl flex flex-col md:flex-row items-center gap-10 md:gap-20 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                {/* Image Side */}
                <div className="w-2/3 md:w-1/2 px-4 md:px-12">
                    <div className="image-frame relative">
                        <ImageBox item={item} index={index} />
                        {/* Decorative floating dots behind image */}
                        <div className="absolute -top-4 -right-4 w-2 h-2 rounded-full bg-[#FFD700] blur-[1px] opacity-60" />
                        <div className="absolute -bottom-8 -left-2 w-3 h-3 rounded-full bg-gradient-to-r from-[#D44E15] to-[#A81B0E] blur-[1px] opacity-80" />
                    </div>
                </div>

                {/* Text Side */}
                <div className={`content-text w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} px-6 md:px-0`}>

                    {/* Small decorative line/dot */}
                    <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className="w-12 h-px bg-gradient-to-r from-[#C9A84C] to-transparent" style={{ transform: isEven ? 'none' : 'rotate(180deg)' }} />
                        <span className="font-display text-xs text-[#C9A84C] tracking-[0.3em] uppercase">Stage 0{index + 1}</span>
                    </div>

                    <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gradient-gold leading-tight mb-6">
                        {item.title}
                    </h3>

                    <p className="font-elegant italic text-xl md:text-2xl text-[#F7E7CE] opacity-80 max-w-md">
                        "{item.caption}"
                    </p>
                </div>
            </div>

            {/* Center Node Dot for desktop timeline */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#110204] border-2 border-[#C9A84C] shadow-[0_0_15px_#C9A84C] hidden md:block z-20" />
        </div>
    );
};


const TimelineSection = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {

            // 1. Thread Animation (Fills up as you scroll through the timeline)
            gsap.to(lineRef.current, {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 20%",
                    end: "bottom 80%",
                    scrub: 1
                }
            });

            // 2. Animate nodes sequentially
            const nodes = gsap.utils.toArray('.timeline-node');

            nodes.forEach((node, i) => {
                const imageFrame = node.querySelector('.image-frame');
                const contentText = node.querySelector('.content-text');

                // The whole node fades/moves up
                gsap.fromTo(node,
                    { opacity: 0, y: 150 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: node,
                            start: "top 85%", // Trigger when the node is near the bottom of the viewport
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Give image and text a slight parallax / stagger for extra cinematic feel
                if (imageFrame && contentText) {
                    gsap.fromTo(imageFrame,
                        { scale: 0.9, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 1.5, ease: "slow(0.7, 0.7, false)", scrollTrigger: { trigger: node, start: "top 85%" } }
                    );

                    const isEven = i % 2 === 0;
                    gsap.fromTo(contentText,
                        { x: isEven ? -50 : 50, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: "power2.out", scrollTrigger: { trigger: node, start: "top 85%" } }
                    );
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="rakhi" ref={containerRef} className="relative w-full min-h-screen bg-[#0E0305] py-32 overflow-hidden border-t border-[#C9A84C]/20">

            {/* Background Texture & Vignette */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,2,5,0.9)_100%)]" />
                <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            </div>

            {/* Section Header */}
            <div className="relative z-10 w-full text-center px-4 mb-24 md:mb-40">
                <h2 className="font-display tracking-[0.3em] text-sm text-[#C9A84C] opacity-80 uppercase mb-4">
                    The Journey
                </h2>
                <h3 className="font-serif text-5xl md:text-7xl text-[#F7E7CE] text-glow-gold">
                    Before the <span className="text-gradient-gold italic font-bold">Rakhi...</span>
                </h3>
            </div>

            {/* The Cinematic Timeline Wrapper */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

                {/* Central Thread Line (Background) */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#330811] hidden md:block" />

                {/* Central Glowing Thread Line (Animated Foreground) */}
                <div
                    ref={lineRef}
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#C9A84C] via-[#FFD700] to-[#C9A84C] hidden md:block origin-top shadow-[0_0_10px_#FFD700]"
                    style={{ transform: 'scaleY(0)' }} // Start completely empty
                />

                {/* Timeline Nodes */}
                <div className="w-full flex flex-col">
                    {timelineSteps.map((step, idx) => (
                        <TimelineNode key={idx} item={step} index={idx} />
                    ))}
                </div>

            </div>

            {/* End Point Dot */}
            <div className="relative z-10 w-full flex justify-center mt-20">
                <div className="w-8 h-8 rounded-full border border-[#C9A84C]/50 flex items-center justify-center bg-[#0E0305]">
                    <div className="w-2 h-2 rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700]" />
                </div>
            </div>

        </section>
    );
};

export default TimelineSection;
