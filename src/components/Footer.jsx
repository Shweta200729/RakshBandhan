import React from 'react';

const Footer = () => {
    return (
        <footer className="relative w-full py-16 bg-[#050102] flex flex-col items-center justify-center text-center px-4 overflow-hidden z-20">

            {/* Top Gold Line */}
            <div className="w-[70vw] md:w-[50vw] h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-50 mb-12" />

            {/* Core Titles */}
            <h2 className="font-display tracking-[0.4em] md:tracking-[0.6em] text-[#FFD700] uppercase text-sm md:text-lg font-bold mb-5 drop-shadow-md">
                RAKSHA <span className="text-[#C9A84C] text-[0.8em] font-normal mx-2 md:mx-4">✦</span> BANDHAN
            </h2>

            <p className="font-serif italic text-xl md:text-2xl text-[#F7E7CE] opacity-90 mb-8 max-w-lg text-glow-gold">
                "Celebrating the bond that lasts forever."
            </p>

            {/* Small Indian Ornamental Pattern */}
            <div className="w-10 h-10 opacity-70 mb-8 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_5px_#C9A84C]">
                    <path d="M50 0 Q55 35 100 50 Q55 65 50 100 Q45 65 0 50 Q45 35 50 0 Z" fill="#C9A84C" />
                    <circle cx="50" cy="50" r="10" fill="#050102" stroke="#FFD700" strokeWidth="2" />
                    <circle cx="50" cy="50" r="3" fill="#D4145A" />
                </svg>
            </div>

            {/* Credits */}
            <p className="font-elegant tracking-wide text-xs md:text-sm text-[#F7E7CE] opacity-70 mb-3 uppercase">
                Made with <span className="text-[#D4145A] drop-shadow-[0_0_5px_#D4145A] text-lg leading-none inline-block align-middle mx-1">❤️</span> for siblings everywhere.
            </p>
            <p className="font-elegant tracking-widest text-[#C9A84C] opacity-50 text-[10px] md:text-xs uppercase mt-2">
                © 2026
            </p>

            {/* Ambient Background Glow */}
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[60vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-[100%] bg-[#C9A84C] blur-[100px] mix-blend-screen opacity-[0.06] pointer-events-none" />
        </footer>
    );
};

export default Footer;
