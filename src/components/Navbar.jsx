/**
 * Navbar.jsx — Premium Floating Navbar
 * ──────────────────────────────────────
 * • Desktop: Logo left | Nav links right
 * • Transparent → glass + blur + gold border on scroll
 * • Mobile: logo + hamburger → animated fullscreen overlay menu
 * • Smooth scroll to sections via Lenis
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLenisScroll } from '../hooks/useLenis';

// ── Nav links ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: 'The Story', href: '#story' },
    { label: 'Rakhi', href: '#rakhi' },
    { label: 'Memories', href: '#memories' },
    { label: 'Celebration', href: '#celebration' },
];

// ── Eases ─────────────────────────────────────────────────────────────────────
const EXPO = [0.16, 1, 0.3, 1];
const SILK = [0.25, 0.46, 0.45, 0.94];

// ── Gold ornament SVG (decorative ring around logo dot) ───────────────────────
const GoldOrnament = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"
        style={{ position: 'absolute', left: '-6px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <defs>
            <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A07830" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#C9A84C" />
            </linearGradient>
        </defs>
        {/* Outer dashed ring */}
        <circle cx="18" cy="18" r="16" fill="none"
            stroke="url(#navGold)" strokeWidth="0.6" strokeDasharray="3 3.5" opacity="0.7" />
        {/* Inner solid ring */}
        <circle cx="18" cy="18" r="11" fill="none"
            stroke="url(#navGold)" strokeWidth="0.8" opacity="0.5" />
        {/* Four cardinal dots */}
        {[0, 90, 180, 270].map((deg) => {
            const r = 16;
            const rad = (deg * Math.PI) / 180;
            return (
                <circle key={deg}
                    cx={18 + r * Math.cos(rad)} cy={18 + r * Math.sin(rad)}
                    r="1.2" fill="#FFD700" opacity="0.9" />
            );
        })}
        {/* Center gem */}
        <circle cx="18" cy="18" r="3.5" fill="#6D0B2F" stroke="url(#navGold)" strokeWidth="1" />
        <circle cx="16.5" cy="16.5" r="1" fill="rgba(255,255,255,0.4)" />
    </svg>
);

// ── Hamburger Icon ────────────────────────────────────────────────────────────
const HamburgerIcon = ({ isOpen }) => (
    <div className="relative w-6 h-5 flex flex-col justify-between cursor-pointer" aria-label="Toggle menu">
        {[0, 1, 2].map((i) => (
            <motion.span
                key={i}
                className="block h-px rounded-full origin-center"
                style={{ background: 'var(--color-gold)' }}
                animate={
                    isOpen
                        ? i === 0 ? { rotate: 45, y: 9, width: '100%' }
                            : i === 1 ? { opacity: 0, scaleX: 0 }
                                : { rotate: -45, y: -9, width: '100%' }
                        : {
                            rotate: 0, y: 0, opacity: 1, scaleX: 1,
                            width: i === 1 ? '70%' : '100%'
                        }
                }
                transition={{ duration: 0.4, ease: EXPO }}
            />
        ))}
    </div>
);

// ── Mobile Menu Overlay ───────────────────────────────────────────────────────
const MobileMenu = ({ isOpen, onClose, onNavigate }) => {
    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const linkVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: (i) => ({
            opacity: 1, x: 0,
            transition: { delay: 0.15 + i * 0.08, duration: 0.6, ease: EXPO },
        }),
        exit: (i) => ({
            opacity: 0, x: -20,
            transition: { delay: i * 0.04, duration: 0.3, ease: SILK },
        }),
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex flex-col"
                    style={{ zIndex: 9998, background: 'rgba(10,2,5,0.97)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: SILK }}
                >
                    {/* Background ornamental pattern */}
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }} aria-hidden="true">
                        <svg width="100%" height="100%">
                            <defs>
                                <pattern id="mbOrn" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <polygon points="30,3 57,30 30,57 3,30"
                                        fill="none" stroke="#C9A84C" strokeWidth="0.4" />
                                    <circle cx="30" cy="3" r="1" fill="#C9A84C" />
                                    <circle cx="57" cy="30" r="1" fill="#C9A84C" />
                                    <circle cx="30" cy="57" r="1" fill="#C9A84C" />
                                    <circle cx="3" cy="30" r="1" fill="#C9A84C" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#mbOrn)" />
                        </svg>
                    </div>

                    {/* Ambient glow */}
                    <div className="absolute pointer-events-none"
                        style={{
                            top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
                            width: '60vw', height: '60vw', maxWidth: '400px', maxHeight: '400px',
                            background: 'radial-gradient(circle, rgba(109,11,47,0.3) 0%, transparent 70%)',
                            filter: 'blur(40px)',
                        }} />

                    {/* Nav links */}
                    <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-8">
                        {/* Decorative top line */}
                        <motion.div
                            className="divider-gold mb-10"
                            style={{ width: '120px' }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: EXPO }}
                        />

                        {NAV_LINKS.map((link, i) => (
                            <motion.button
                                key={link.href}
                                custom={i}
                                variants={linkVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onClick={() => onNavigate(link.href)}
                                className="group relative py-3 text-center"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
                            >
                                {/* Number */}
                                <span
                                    className="font-display block mb-1"
                                    style={{
                                        fontFamily: "'Cinzel', serif",
                                        fontSize: '0.65rem',
                                        letterSpacing: '0.3em',
                                        color: 'var(--color-gold)',
                                        opacity: 0.7,
                                    }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                {/* Link text */}
                                <span
                                    className="font-serif block"
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: 'clamp(2rem, 8vw, 3.2rem)',
                                        fontWeight: 500,
                                        color: 'var(--color-champagne)',
                                        lineHeight: 1.1,
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    <motion.span
                                        style={{ display: 'inline-block' }}
                                        whileHover={{ color: '#FFD700', x: 8 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {link.label}
                                    </motion.span>
                                </span>
                                {/* Hover underline */}
                                <motion.div
                                    className="divider-gold mt-1 mx-auto"
                                    style={{ width: 0 }}
                                    whileHover={{ width: '60px' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                        ))}

                        {/* Bottom divider */}
                        <motion.div
                            className="divider-gold mt-10"
                            style={{ width: '120px' }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ delay: 0.5, duration: 0.6, ease: EXPO }}
                        />

                        {/* Tagline */}
                        <motion.p
                            className="font-elegant text-center mt-4"
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontStyle: 'italic',
                                fontSize: '0.9rem',
                                color: 'var(--color-text-muted)',
                                letterSpacing: '0.06em',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            A Bond of Love &amp; Protection
                        </motion.p>
                    </nav>
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

    // Scroll detection
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Navigate to section
    const handleNavigate = useCallback((href) => {
        setMobileOpen(false);
        setTimeout(() => {
            const el = document.querySelector(href);
            if (el) scrollTo(el, { offset: -80 });
        }, mobileOpen ? 400 : 0);
    }, [scrollTo, mobileOpen]);

    // Close menu on resize to desktop
    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <>
            {/* ── Navbar bar ──────────────────────────────────────────────── */}
            <motion.header
                role="banner"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9990,
                    padding: '0 clamp(1.5rem, 4vw, 4rem)',
                }}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, ease: EXPO, delay: 0.2 }}
            >
                {/* Glass pill container */}
                <motion.div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '64px',
                        margin: '12px 0',
                        padding: '0 1.75rem',
                        borderRadius: '50px',
                        transition: 'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
                        ...(scrolled ? {
                            background: 'rgba(14, 4, 8, 0.72)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: '1px solid rgba(201,168,76,0.22)',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.1)',
                        } : {
                            background: 'transparent',
                            backdropFilter: 'none',
                            border: '1px solid transparent',
                            boxShadow: 'none',
                        }),
                    }}
                >
                    {/* ── Logo ──────────────────────────────────────────────── */}
                    <button
                        onClick={() => scrollTo(0)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        aria-label="Back to top"
                    >
                        <div style={{ position: 'relative', paddingLeft: '36px', display: 'flex', alignItems: 'center' }}>
                            <GoldOrnament />
                            <motion.span
                                style={{
                                    fontFamily: "'Cinzel', Georgia, serif",
                                    fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                                    letterSpacing: '0.22em',
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, #A07830 0%, #FFD700 50%, #C9A84C 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    userSelect: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                                whileHover={{ letterSpacing: '0.28em' }}
                                transition={{ duration: 0.4, ease: SILK }}
                            >
                                RAKSHA&nbsp;✦&nbsp;BANDHAN
                            </motion.span>
                        </div>
                    </button>

                    {/* ── Desktop nav links ──────────────────────────────────── */}
                    <nav
                        role="navigation"
                        aria-label="Main navigation"
                        style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
                        className="hidden md:flex"
                    >
                        {NAV_LINKS.map((link, i) => (
                            <DesktopLink key={link.href} link={link} index={i} onNavigate={handleNavigate} />
                        ))}
                    </nav>

                    {/* ── Mobile hamburger ───────────────────────────────────── */}
                    <motion.button
                        className="md:hidden"
                        onClick={() => setMobileOpen((v) => !v)}
                        style={{
                            background: 'none', border: 'none',
                            cursor: 'pointer', padding: '8px',
                            zIndex: 9999,
                        }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                    >
                        <HamburgerIcon isOpen={mobileOpen} />
                    </motion.button>
                </motion.div>
            </motion.header>

            {/* Mobile menu overlay */}
            <MobileMenu
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                onNavigate={handleNavigate}
            />
        </>
    );
};

// ── Desktop Nav Link ──────────────────────────────────────────────────────────
const DesktopLink = ({ link, index, onNavigate }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.button
            onClick={() => onNavigate(link.href)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                padding: '4px 0',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
                fontStyle: 'italic',
                letterSpacing: '0.05em',
                color: hovered ? 'var(--color-gold-light)' : 'var(--color-champagne)',
                transition: 'color 0.3s ease',
                fontWeight: 500,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.07, duration: 0.6, ease: EXPO }}
            whileTap={{ scale: 0.96 }}
        >
            {link.label}
            {/* Underline */}
            <motion.span
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
                    transform: 'translateX(-50%)',
                }}
                animate={{ width: hovered ? '100%' : '0%', opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.35, ease: SILK }}
            />
        </motion.button>
    );
};

export default Navbar;
