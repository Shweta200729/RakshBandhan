import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveGift = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (!isOpen) setIsOpen(true);
    };

    return (
        <section id="celebration" className="relative w-full min-h-[100vh] bg-[#050102] flex flex-col items-center justify-center overflow-hidden border-t border-[#C9A84C]/10">

            {/* Ambient Background Spotlights */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full mix-blend-screen pointer-events-none blur-[120px] transition-all duration-1000 ${isOpen ? 'bg-[radial-gradient(circle,rgba(201,168,76,0.35)_0%,transparent_60%)]' : 'bg-[radial-gradient(circle,rgba(109,11,47,0.2)_0%,transparent_60%)]'}`} />

            {/* Instruction Title */}
            <motion.div
                className="absolute top-[20%] text-center z-50 pointer-events-none"
                animate={isOpen ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="font-serif text-3xl md:text-5xl text-[#C9A84C] text-glow-gold drop-shadow-lg italic">
                    A little surprise...
                </h2>
                <p className="font-display text-xs tracking-widest uppercase text-[#F7E7CE] opacity-60 mt-4 animate-pulse">
                    Click to Open
                </p>
            </motion.div>

            {/* Stage wrapper for the 3D Box */}
            <div className="relative mt-20 md:mt-32 cursor-pointer group" onClick={handleOpen}>

                {/* 1. Magic Burst Elements (Appear when open) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
                    <AnimatePresence>
                        {isOpen && [...Array(40)].map((_, i) => (
                            <motion.div
                                key={`part-${i}`}
                                className="absolute rounded-full"
                                style={{
                                    width: Math.random() * 4 + 2 + 'px',
                                    height: Math.random() * 4 + 2 + 'px',
                                    background: Math.random() > 0.5 ? '#FFD700' : '#FFF4D0',
                                    top: '50%', left: '50%',
                                    boxShadow: '0 0 10px #FFD700'
                                }}
                                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                                animate={{
                                    opacity: [1, 1, 0],
                                    scale: Math.random() * 1.5 + 0.5,
                                    x: (Math.random() - 0.5) * (window.innerWidth > 768 ? 600 : 300),
                                    y: (Math.random() - 0.8) * 800,
                                }}
                                transition={{
                                    duration: Math.random() * 1.5 + 1.5,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Flower bursts */}
                    <AnimatePresence>
                        {isOpen && [...Array(12)].map((_, i) => (
                            <motion.div
                                key={`flow-${i}`}
                                className="absolute"
                                style={{
                                    width: '15px', height: '15px',
                                    background: 'radial-gradient(circle, #FFB300 0%, #D44E15 100%)',
                                    borderRadius: '100% 0 100% 0',
                                    top: '50%', left: '50%',
                                }}
                                initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
                                animate={{
                                    opacity: [1, 1, 0],
                                    scale: Math.random() * 1.5 + 1,
                                    x: (Math.random() - 0.5) * (window.innerWidth > 768 ? 700 : 350),
                                    y: (Math.random() - 0.8) * 600,
                                    rotate: Math.random() * 720
                                }}
                                transition={{
                                    duration: Math.random() * 2 + 2,
                                    ease: "easeOut",
                                    delay: 0.1
                                }}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* 2. Message Card (Inside the Box) */}
                <motion.div
                    className="absolute bottom-10 left-1/2 w-[85vw] md:w-[45vw] max-w-[500px] bg-[#FFF8E7] rounded-md shadow-2xl p-8 md:p-12 z-10 border border-[#C9A84C] flex flex-col items-center justify-center text-center origin-bottom"
                    initial={{ y: 0, scale: 0.2, opacity: 0, x: '-50%' }}
                    animate={isOpen ? { y: window.innerWidth > 768 ? -220 : -180, scale: 1, opacity: 1, x: '-50%' } : { y: 0, scale: 0.2, opacity: 0, x: '-50%' }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <div className="absolute top-4 w-12 h-12 opacity-10">
                        {/* Watermark mandala/flower */}
                        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="#C9A84C" strokeWidth="2" fill="none" /><path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="#C9A84C" strokeWidth="2" /></svg>
                    </div>
                    <p className="font-serif italic text-2xl md:text-3xl text-[#4A0820] leading-snug drop-shadow-sm mt-4">
                        "The best gift isn't wrapped.
                        <br /><br />
                        It's having a sibling who makes life brighter."
                    </p>
                    <div className="mt-8 font-display tracking-widest text-[#C9A84C] text-[10px] uppercase font-bold">
                        Happy Raksha Bandhan
                    </div>
                </motion.div>

                {/* 3. Box Back Wall (Hidden inside, visible only when lid flies off) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 md:w-80 h-40 bg-gradient-to-t from-[#110103] to-[#2B0813] z-0" />

                {/* 4. Box Front Base (z-20 so card rises from behind it) */}
                <motion.div
                    className="relative w-64 md:w-80 h-48 md:h-56 bg-gradient-to-br from-[#6D0B2F] to-[#2B0813] rounded-b-lg border-x-2 border-b-2 border-t border-[#FFD700]/60 shadow-[0_30px_60px_rgba(0,0,0,0.9)] z-20 flex justify-center items-center overflow-hidden"
                    animate={isOpen ? { scale: 0.95 } : { scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Golden Ribbon Vertical */}
                    <div className="absolute h-full w-8 bg-gradient-to-r from-[#A07830] via-[#FFD700] to-[#A07830] shadow-lg" />
                    {/* Golden Ribbon Horizontal */}
                    <div className="absolute w-full h-8 bg-gradient-to-b from-[#A07830] via-[#FFD700] to-[#A07830] shadow-lg" />

                    {/* Center Motif */}
                    <div className="absolute w-12 h-12 bg-[#2B0813] border-2 border-[#FFD700] rounded-full flex items-center justify-center shadow-inner">
                        <div className="w-6 h-6 bg-[#FFD700] rounded-full rotate-45 transform" />
                    </div>
                </motion.div>

                {/* 5. Box Lid (z-30) */}
                <motion.div
                    className="absolute -top-[20px] left-1/2 -translate-x-1/2 w-72 md:w-88 h-[50px] md:h-[60px] bg-gradient-to-r from-[#8C1040] via-[#D4145A] to-[#8C1040] border-2 border-[#FFD700] rounded-t-md rounded-b-sm shadow-2xl z-30 overflow-hidden origin-bottom-left"
                    initial={{ y: 0, rotate: 0, opacity: 1, x: '-50%' }}
                    whileHover={!isOpen ? { y: -5, x: '-50%' } : {}}
                    animate={isOpen ? { y: -200, x: -300, rotate: -45, opacity: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeIn" }}
                >
                    {/* Lid Ribbon Vertical */}
                    <div className="absolute h-full w-8 bg-gradient-to-r from-[#A07830] via-[#FFD700] to-[#A07830] left-1/2 -translate-x-1/2" />

                    {/* Lid highlight */}
                    <div className="absolute top-0 w-full h-2 bg-gradient-to-b from-white/30 to-transparent" />
                </motion.div>

                {/* Overlap fix shadow fake lid cast */}
                <motion.div
                    className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-64 md:w-80 h-4 bg-black/50 blur-[4px] z-[25]"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                />
            </div>

        </section>
    );
};

export default InteractiveGift;
