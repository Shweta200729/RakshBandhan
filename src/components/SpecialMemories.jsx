import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';

const SPECIAL_MEMORIES = [
    {
        id: 1,
        src: '/images/taj-palace.jpg',
        tag: 'ICONIC MOMENTS',
        caption: 'Standing proud beneath the golden lights of Mumbai.'
    },
    {
        id: 2,
        src: '/images/pure-blessing.png',
        tag: 'PURE BLESSING',
        caption: 'The sweetest smile and gentlest warmth in our world.'
    },
    {
        id: 3,
        src: '/images/we-protect.jpg',
        tag: 'SACRED PROMISE',
        caption: 'Through every shared celebration and quiet vow.'
    },
    {
        id: 4,
        src: '/images/we-laugh.jpg',
        tag: 'RADIANT SMILES',
        caption: 'Pure laughter, brighter than festive lights.'
    }
];

const TiltCard = ({ item, isMobile, index }) => {
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, margin: "-100px" });

    // Framer motion values for 3D physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Apply spring physics so the tilt feels natural and heavy, not overly responsive
    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25 });

    // Subtle 3D rotation limits (max 8 degrees tilt)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    // Light reflection moves opposite to the cursor
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "150%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "150%"]);

    // Inner image parallax moves slightly to create depth illusion
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-3%", "3%"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-3%", "3%"]);

    const handleMouseMove = (e) => {
        if (isMobile || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        // Mouse position relative to the card geometry
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Compute percentages from -0.5 to 0.5
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        // Return organically to neutral zero position
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ perspective: "1000px" }} className="w-full">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-[55vh] md:h-[62vh] rounded-xl overflow-hidden border border-[#C9A84C]/30 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(201,168,76,0.1)] group transition-all duration-500"
                style={{
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                    transformStyle: "preserve-3d"
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={!isMobile && {
                    boxShadow: '0 30px 60px -10px rgba(255, 215, 0, 0.25), 0 0 30px rgba(201, 168, 76, 0.3)',
                    borderColor: 'rgba(255, 215, 0, 0.8)'
                }}
            >
                {/* Image Layer - scaled slightly so we don't reveal edges when it shifts */}
                <motion.div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-108"
                    style={{
                        backgroundImage: `url(${item.src})`,
                        x: isMobile ? 0 : imageX,
                        y: isMobile ? 0 : imageY,
                        scale: 1.08
                    }}
                />

                {/* Ambient Warm Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0205]/95 via-[#0A0205]/35 to-[#0A0205]/20 pointer-events-none z-[5]" />

                {/* Light Reflection/Glare Effect Layer */}
                {!isMobile && (
                    <motion.div
                        className="absolute w-[200%] h-[200%] z-20 pointer-events-none mix-blend-overlay opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.7) 0%, transparent 60%)',
                            left: glareX,
                            top: glareY,
                        }}
                    />
                )}

                {/* Floating Content/Text Layer positioned in 3D Space (translated Z axis) */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
                    <motion.div
                        style={{ z: isMobile ? 0 : 50 }}
                        className="relative"
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-[#1A0508]/80 backdrop-blur-md border border-[#FFD700]/40 font-display tracking-[0.35em] text-[#FFD700] uppercase text-[9px] md:text-[10px] mb-3 font-semibold shadow-md">
                            {item.tag}
                        </span>
                        <h3 className="font-serif italic text-2xl md:text-[1.8rem] text-[#F7E7CE] leading-snug drop-shadow-xl text-glow-gold">
                            "{item.caption}"
                        </h3>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

const SpecialMemories = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="memories" className="relative w-full min-h-screen bg-[#0A0205] py-24 md:py-32 pt-16 px-4 md:px-8 lg:px-12 z-20 border-t border-[#C9A84C]/15 overflow-hidden">

            {/* Center Title */}
            <div className="text-center mb-16 md:mb-20">
                <span className="font-display text-xs tracking-[0.35em] text-[#C9A84C] uppercase block mb-3 opacity-90">
                    Sacred Highlights
                </span>
                <h2 className="font-serif text-5xl md:text-[4.5rem] text-[#F7E7CE] text-glow-gold">
                    Timeless <span className="italic text-gradient-gold">Bonds</span>
                </h2>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-6 opacity-70" />
            </div>

            {/* Grid layout ensuring massive beautiful Feature Cards */}
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
                {SPECIAL_MEMORIES.map((item, index) => (
                    <TiltCard key={item.id} item={item} isMobile={isMobile} index={index} />
                ))}
            </div>

        </section>
    );
};

export default SpecialMemories;

