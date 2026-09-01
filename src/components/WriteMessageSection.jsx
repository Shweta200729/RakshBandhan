import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WriteMessageSection = () => {
    const [message, setMessage] = useState('');
    const [isTied, setIsTied] = useState(false);

    const handleTieClick = () => {
        if (message.trim().length > 0) {
            setIsTied(true);
        }
    };

    return (
        <section className="relative w-full min-h-[90vh] bg-[#0A0205] flex flex-col items-center justify-center px-4 py-24 overflow-hidden border-t border-[rgba(201,168,76,0.1)]">

            {/* Ambient Background */}
            <div className={`absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(109,11,47,0.1)_0%,transparent_70%)] transition-all duration-1000 ${isTied ? 'opacity-100' : 'opacity-30'}`} />

            <AnimatePresence mode="wait">
                {!isTied ? (
                    <motion.div
                        key="input-stage"
                        className="relative z-10 w-full max-w-2xl flex flex-col items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-serif text-3xl md:text-5xl text-[#F7E7CE] text-glow-gold italic mb-10 text-center">
                            Write something for your sibling...
                        </h2>

                        <div className="w-full relative group">
                            <textarea
                                className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-[#C9A84C]/30 text-[#F7E7CE] font-elegant text-xl md:text-2xl p-4 focus:outline-none focus:border-[#FFD700] transition-colors resize-none mb-12 text-center shadow-inner placeholder:text-[#C9A84C]/30"
                                rows={4}
                                placeholder="Dear brother/sister..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            {/* Subtle gold glow behind textarea on focus */}
                            <div className="absolute inset-0 bg-[#FFD700]/5 blur-xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        </div>

                        <motion.button
                            onClick={handleTieClick}
                            disabled={message.trim() === ''}
                            className={`group relative overflow-hidden font-display tracking-[0.2em] px-10 py-4 uppercase text-sm font-bold flex items-center justify-center gap-4 rounded-full border ${message.trim() ? 'border-[#C9A84C] text-[#F7E7CE] cursor-pointer shadow-[0_0_20px_rgba(201,168,76,0.3)]' : 'border-[#C9A84C]/20 text-[#C9A84C]/40 cursor-not-allowed'} transition-all duration-500`}
                            whileHover={message.trim() ? { scale: 1.05, boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)' } : {}}
                            whileTap={message.trim() ? { scale: 0.95 } : {}}
                        >
                            Tie The Bond ❤️
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="tied-stage"
                        className="relative z-10 w-full max-w-4xl flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >

                        {/* Golden Particles Burst */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(40)].map((_, i) => (
                                <motion.div
                                    key={`part-${i}`}
                                    className="absolute rounded-full bg-[#FFD700]"
                                    style={{ width: Math.random() * 4 + 2 + 'px', height: Math.random() * 4 + 2 + 'px', top: '50%', left: '50%' }}
                                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                                    animate={{
                                        opacity: [1, 1, 0], scale: Math.random() * 1.5 + 0.5,
                                        x: (Math.random() - 0.5) * (window.innerWidth > 768 ? 800 : 350),
                                        y: (Math.random() - 0.5) * 800,
                                    }}
                                    transition={{ duration: Math.random() * 2 + 2, ease: "easeOut" }}
                                />
                            ))}
                        </div>

                        <h3 className="font-display tracking-[0.3em] text-[#C9A84C] text-xs md:text-sm uppercase mb-12 drop-shadow-md">
                            A message worth keeping forever.
                        </h3>

                        {/* Tied Message Card */}
                        <div className="relative p-10 md:p-16 min-w-[80vw] md:min-w-[500px]">

                            {/* Animated Thread Border (SVG) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_10px_#FFD700]">
                                <defs>
                                    <linearGradient id="threadGradForm" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#C9A84C" />
                                        <stop offset="50%" stopColor="#FFD700" />
                                        <stop offset="100%" stopColor="#C9A84C" />
                                    </linearGradient>
                                    {/* Rakhi knot glow */}
                                    <filter id="knotGlow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <motion.rect
                                    x="10" y="10" width="calc(100% - 20px)" height="calc(100% - 20px)"
                                    fill="none"
                                    stroke="url(#threadGradForm)"
                                    strokeWidth="4"
                                    strokeDasharray="2000"
                                    strokeLinecap="round"
                                    initial={{ strokeDashoffset: 2000 }}
                                    animate={{ strokeDashoffset: 0 }}
                                    transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
                                />

                                {/* Woven secondary red thread */}
                                <motion.rect
                                    x="10" y="10" width="calc(100% - 20px)" height="calc(100% - 20px)"
                                    fill="none"
                                    stroke="#D4145A"
                                    strokeWidth="1.5"
                                    strokeDasharray="20 10"
                                    initial={{ strokeDashoffset: -2000 }}
                                    animate={{ strokeDashoffset: 0 }}
                                    transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
                                />

                                {/* The Central Rakhi Knot (Reveals at the end of the draw) */}
                                <motion.circle
                                    cx="50%" cy="10" r="12" fill="#2B0813" stroke="#FFD700" strokeWidth="3" filter="url(#knotGlow)"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 3.2, type: "spring", bounce: 0.6 }}
                                />
                                <motion.circle
                                    cx="50%" cy="10" r="6" fill="#D4145A"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 3.4, type: "spring", bounce: 0.6 }}
                                />
                            </svg>

                            {/* Deep luxury card background */}
                            <div className="absolute top-[10px] left-[10px] right-[10px] bottom-[10px] bg-gradient-to-br from-[#110103]/90 to-[#2B0813]/90 backdrop-blur-md shadow-2xl z-0" />

                            <p className="relative font-serif italic text-2xl md:text-4xl text-[#F7E7CE] leading-relaxed text-center z-10 p-4">
                                "{message}"
                            </p>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default WriteMessageSection;
