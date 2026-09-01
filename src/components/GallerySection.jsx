import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ===============================================
// Placeholder Data (Easy to swap with real photos)
// ===============================================
const MEMORIES = [
    {
        id: 1,
        category: "City Lights",
        caption: "Under the golden arches of the Taj Mahal Palace.",
        src: "/images/taj-palace.jpg"
    },
    {
        id: 2,
        category: "Pure Blessing",
        caption: "A gentle heart that fills every single moment with pure happiness.",
        src: "/images/pure-blessing.png"
    },
    {
        id: 3,
        category: "We Fight",
        caption: "Fierce arguments, followed by unbreakable support.",
        src: "/images/we-fight.jpg"
    },
    {
        id: 4,
        category: "We Laugh",
        caption: "Dressed in celebration, smiling from the soul.",
        src: "/images/we-laugh.jpg"
    },
    {
        id: 5,
        category: "We Tease",
        caption: "Exploring city horizons, sharing unspoken jokes.",
        src: "/images/we-tease.jpg"
    },
    {
        id: 6,
        category: "We Protect",
        caption: "Sweet moments of celebration and eternal promise.",
        src: "/images/we-protect.jpg"
    },
    {
        id: 7,
        category: "Still Together",
        caption: "Side by side, walking through every chapter of life.",
        src: "/images/still-together.jpg"
    },
    {
        id: 8,
        category: "We Belong",
        caption: "By the endless sea with those who mean the entire world.",
        src: "/images/we-belong.jpg"
    }
];

const GalleryCard = ({ mem }) => {
    return (
        <div className="gallery-card relative w-full mb-8 break-inside-avoid overflow-hidden rounded-sm group cursor-pointer shadow-lg bg-[#110204]">

            {/* The Image (Zooms slowly on hover) */}
            <div className="w-full h-full overflow-hidden transition-all duration-700 ease-out group-hover:scale-[1.01] group-hover:-translate-y-2">
                <img
                    src={mem.src}
                    alt={mem.category}
                    className="w-full h-auto object-cover transform transition-transform duration-1000 ease-[0.25,0.46,0.45,0.94] group-hover:scale-110"
                    loading="lazy"
                />
            </div>

            {/* Card Lift & Border Container (Detached from image scale to maintain crisp border) */}
            <div className="absolute inset-0 border border-transparent transition-all duration-500 ease-out group-hover:border-[#C9A84C] group-hover:-translate-y-2 pointer-events-none z-20" />

            {/* Subtly Blurred Dark Overlay */}
            <div className="absolute inset-0 bg-[#1A0508]/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out pointer-events-none z-10 group-hover:-translate-y-2" />

            {/* Hover Caption Content */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-700 ease-[0.25,0.46,0.45,0.94] pointer-events-none group-hover:-translate-y-2">
                <span className="font-display text-[0.65rem] md:text-xs tracking-[0.3em] text-[#FFD700] uppercase mb-4 opacity-80 decoration-[#C9A84C]/50 border-b border-[#C9A84C]/30 pb-2">
                    {mem.category}
                </span>
                <p className="font-serif italic text-xl md:text-3xl lg:text-4xl text-[#F7E7CE] drop-shadow-xl text-glow-gold">
                    {mem.caption}
                </p>
            </div>

        </div>
    );
};

const GallerySection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Stagger entrance animations for each card smoothly
            const cards = gsap.utils.toArray('.gallery-card');

            cards.forEach((card) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 80, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%", // Trigger when top of card hits 85% depth of viewport
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="gallery" ref={sectionRef} className="relative w-full min-h-screen bg-[#0A0205] py-32 px-4 md:px-8 lg:px-16 border-t border-[#C9A84C]/10">

            {/* Section Header */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
                <h3 className="font-display text-sm tracking-[0.35em] text-[#C9A84C] opacity-80 uppercase mb-4">
                    The Collection
                </h3>
                <h2 className="font-serif text-5xl md:text-7xl lg:text-[5rem] text-[#F7E7CE] leading-tight text-glow-gold">
                    Unspoken <span className="text-gradient-gold italic font-bold">Memories</span>
                </h2>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mt-8 opacity-60" />
            </div>

            {/* Masonry Layout Container */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 w-full max-w-[1600px] mx-auto z-10 relative">
                {MEMORIES.map((mem, index) => (
                    <GalleryCard key={mem.id} mem={mem} />
                ))}
            </div>

            {/* Subtle background gradient to tie it cleanly */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent pointer-events-none z-0" />
        </section>
    );
};

export default GallerySection;
