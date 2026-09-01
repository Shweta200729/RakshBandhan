/**
 * Navbar.jsx — Premium Responsive Floating Navbar
 * ────────────────────────────────────────────────
 * • Desktop: Logo left | Nav links right
 * • Mobile: Logo left | Interactive Gold "Menu" Button right
 * • Fullscreen animated luxury mobile menu with all section links
 * • Lenis smooth scrolling integration
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenisScroll } from '../hooks/useLenis';

// ── Navigation Links ──────────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: 'The Story', desc: 'Origins & Legends', href: '#story' },
    { label: 'The Journey', desc: 'Growing Up Together', href: '#rakhi' },
    { label: 'Memories', desc: 'Timeless Bonds', href: '#memories' },
    { label: 'Gallery', desc: 'Photo Collection', href: '#gallery' },
    { label: 'Gift Box', desc: 'A Little Surprise', href: '#celebration' },
    { label: 'Send Wish', desc: 'Tie a Sacred Thread', href: '#wishes' },
];

const EXPO = [0.16, 1, 0.3, 1];
const SILK = [0.25, 0.46, 0.45, 0.94];

// ── Gold Ornament Icon ────────────────────────────────────────────────────────
const GoldOrnament = () => (
    <svg width="28" height="28" viewBox="0 0 36 36" aria-hidden="true" className="shrink-0">
        <defs>
            <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A07830" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#C9A84C" />
            </linearGradient>
        </defs>
        <circle cx="18" cy="18" r="16" fill="none" stroke="url(#navGold)" strokeWidth="0.8" strokeDasharray="3 3.5" opacity="0.7" />
        <circle cx="18" cy="18" r="11" fill="none" stroke="url(#navGold)" strokeWidth="1" opacity="0.6" />
        {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
                <circle
                    key={deg}
                    cx={18 + 16 * Math.cos(rad)}
                    cy={18 + 16 * Math.sin(rad)}
                    r="1.4"
                    fill="#FFD700"
                />
            );
        })}
        <circle cx="18" cy="18" r="4" fill="#6D0B2F" stroke="url(#navGold)" strokeWidth="1.2" />
        <circle cx="16.5" cy="16.5" r="1.2" fill="rgba(255,255,255,0.7)" />
    </svg>
);

// ── Animated Hamburger Bars (Icon Only) ───────────────────────────────────────
const HamburgerBars = ({ isOpen }) => (
    <div className="w-5 h-3.5 flex flex-col justify-between items-center shrink-0 pointer-events-none">
        <motion.span
            className="block h-[1.5px] w-5 bg-[#FFD700] rounded-full origin-center"
            animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EXPO }}
        />
        <motion.span
            className="block h-[1.5px] w-3.5 bg-[#FFD700] rounded-full origin-center"
            animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
        />
        <motion.span
            className="block h-[1.5px] w-5 bg-[#FFD700] rounded-full origin-center"
            animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EXPO }}
        />
    </div>
);

// ── Fullscreen Mobile Menu Drawer ─────────────────────────────────────────────
const MobileMenuDrawer = ({ isOpen, onClose, onNavigate }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const itemVariants = {
        hidden: { opacity: 0, y: 25, scale: 0.95 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: 0.1 + i * 0.06, duration: 0.5, ease: EXPO },
        }),
        exit: (i) => ({
            opacity: 0,
            y: 15,
            transition: { delay: i * 0.03, duration: 0.25, ease: SILK },
        }),
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#0C0205]/98 backdrop-blur-2xl px-6 py-8 overflow-y-auto"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: SILK }}
                >
                    {/* Background Festive Glow */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(109,11,47,0.3)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

                    {/* Top Bar inside Drawer */}
                    <div className="relative z-10 flex items-center justify-between border-b border-[#C9A84C]/20 pb-4">
                        <div className="flex items-center gap-2.5">
                            <GoldOrnament />
                            <span className="font-serif tracking-[0.2em] text-sm font-semibold bg-gradient-to-r from-[#FFFDF0] via-[#FFD700] to-[#C9A84C] bg-clip-text text-transparent">
                                RAKSHA ✦ BANDHAN
                            </span>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#FFD700]/40 bg-[#1A0508] text-[#FFD700] active:scale-90 transition-transform shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                            aria-label="Close menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Items List */}
                    <nav className="relative z-10 flex flex-col gap-2 my-auto py-6">
                        {NAV_LINKS.map((link, i) => (
                            <motion.button
                                key={link.href}
                                custom={i}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onClick={() => onNavigate(link.href)}
                                className="group w-full flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-[#FFD700]/30 hover:bg-[#1A0508]/60 active:bg-[#250710] transition-all duration-300 text-left"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <span className="font-display text-xs tracking-widest text-[#FFD700]/70 font-bold">
                                            0{i + 1}
                                        </span>
                                        <span className="font-serif text-2xl sm:text-3xl text-[#FFF8F0] group-hover:text-[#FFD700] transition-colors font-medium">
                                            {link.label}
                                        </span>
                                    </div>
                                    <span className="font-elegant italic text-sm text-[#C9A84C]/80 mt-1 pl-7">
                                        {link.desc}
                                    </span>
                                </div>

                                <div className="w-8 h-8 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#FFD700] opacity-60 group-hover:opacity-100 group-hover:border-[#FFD700] group-hover:translate-x-1 transition-all">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </motion.button>
                        ))}
                    </nav>

                    {/* Footer inside Drawer */}
                    <div className="relative z-10 text-center border-t border-[#C9A84C]/20 pt-4">
                        <p className="font-elegant italic text-sm text-[#F7E7CE]/70">
                            "A sacred thread that ties hearts together forever."
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ── Main Navbar Component ─────────────────────────────────────────────────────
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollTo } = useLenisScroll();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavigate = useCallback((href) => {
        setMobileOpen(false);
        setTimeout(() => {
            const el = document.querySelector(href);
            if (el) {
                scrollTo(el, { offset: -70 });
            }
        }, mobileOpen ? 300 : 0);
    }, [scrollTo, mobileOpen]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <>
            <motion.header
                role="banner"
                className="fixed top-0 left-0 right-0 z-[9990] px-4 sm:px-8 lg:px-12 py-3 sm:py-4 pointer-events-none"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: EXPO }}
            >
                <div
                    className={`max-w-6xl mx-auto flex items-center justify-between h-14 sm:h-16 px-5 sm:px-8 rounded-full pointer-events-auto transition-all duration-500 ${
                        scrolled
                            ? 'bg-[#100306]/85 backdrop-blur-xl border border-[#C9A84C]/35 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(201,168,76,0.12)]'
                            : 'bg-[#100306]/50 backdrop-blur-md border border-[#C9A84C]/20 shadow-[0_6px_20px_rgba(0,0,0,0.4)]'
                    }`}
                >
                    {/* ── Brand / Logo ────────────────────────────────────────── */}
                    <button
                        onClick={() => scrollTo(0)}
                        className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
                        aria-label="Raksha Bandhan Home"
                    >
                        <GoldOrnament />
                        <span className="font-serif tracking-[0.18em] sm:tracking-[0.22em] text-xs sm:text-sm lg:text-base font-semibold bg-gradient-to-r from-[#FFFDF0] via-[#FFD700] to-[#C9A84C] bg-clip-text text-transparent group-hover:brightness-125 transition-all select-none whitespace-nowrap">
                            RAKSHA ✦ BANDHAN
                        </span>
                    </button>

                    {/* ── Desktop Navigation Links ────────────────────────────── */}
                    <nav
                        role="navigation"
                        aria-label="Main navigation"
                        className="hidden md:flex items-center gap-6 lg:gap-8"
                    >
                        {NAV_LINKS.map((link, i) => (
                            <button
                                key={link.href}
                                onClick={() => handleNavigate(link.href)}
                                className="group relative py-1 font-elegant italic text-sm lg:text-base font-medium text-[#F7E7CE]/90 hover:text-[#FFD700] transition-colors cursor-pointer"
                            >
                                <span>{link.label}</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}
                    </nav>

                    {/* ── Mobile Hamburger Menu Button (Icon Only) ─────────────── */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#FFD700]/50 bg-[#1A0508]/90 text-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.2)] active:scale-90 transition-all cursor-pointer"
                        aria-label="Open mobile navigation menu"
                    >
                        <HamburgerBars isOpen={mobileOpen} />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Fullscreen Drawer */}
            <MobileMenuDrawer
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                onNavigate={handleNavigate}
            />
        </>
    );
};

export default Navbar;

