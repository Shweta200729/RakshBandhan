/**
 * LoadingScreen.jsx
 * ──────────────────
 * Premium cinematic loading screen for Rakshabandhan.
 * Animation sequence:
 *   1. Dark → golden particle appears
 *   2. Particle expands → glowing thread traces Rakhi SVG
 *   3. Center jewel pulses in
 *   4. "Preparing a celebration of togetherness..." fades in
 *   5. "Welcome ❤️" replaces it
 *   6. Whole screen fades out
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Shared eases ──────────────────────────────────────────────────────────────
const EXPO = [0.16, 1, 0.3, 1];
const SILK = [0.25, 0.46, 0.45, 0.94];

// ── Particle positions (radiating from center) ────────────────────────────────
const PARTICLES = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const radius = 28 + Math.random() * 90;
    return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        size: 1.5 + Math.random() * 2.5,
        delay: 0.6 + Math.random() * 1.0,
        duration: 1.5 + Math.random() * 1.5,
    };
});

// ── Ornamental petal path (one petal of the Rakhi) ────────────────────────────
// Six-petal Rakhi drawn as a single SVG path using arcs
const RAKHI_R = 80;   // outer ring radius
const JEWEL_R = 18;   // center jewel radius
const SVG_SIZE = 220;
const CX = SVG_SIZE / 2;
const CY = SVG_SIZE / 2;

// Build six petals
const buildPetalPath = () => {
    const petals = 6;
    let d = '';
    for (let i = 0; i < petals; i++) {
        const a0 = (i / petals) * Math.PI * 2 - Math.PI / 2;
        const a1 = ((i + 0.5) / petals) * Math.PI * 2 - Math.PI / 2;
        const a2 = ((i + 1) / petals) * Math.PI * 2 - Math.PI / 2;
        const pr = RAKHI_R * 0.52;
        const px0 = CX + Math.cos(a0) * pr;
        const py0 = CY + Math.sin(a0) * pr;
        const cx1 = CX + Math.cos(a0) * RAKHI_R;
        const cy1 = CY + Math.sin(a0) * RAKHI_R;
        const cx2 = CX + Math.cos(a1) * RAKHI_R;
        const cy2 = CY + Math.sin(a1) * RAKHI_R;
        const px2 = CX + Math.cos(a2) * pr;
        const py2 = CY + Math.sin(a2) * pr;

        if (i === 0) d += `M ${px0} ${py0} `;
        d += `Q ${cx1} ${cy1} ${cx2} ${cy2} Q ${cx2} ${cy2} ${px2} ${py2} `;
    }
    d += 'Z';
    return d;
};

const PETAL_PATH = buildPetalPath();

// Ring path (main circular thread)
const RING_PATH = `M ${CX} ${CY - RAKHI_R}
  A ${RAKHI_R} ${RAKHI_R} 0 1 1 ${CX - 0.001} ${CY - RAKHI_R} Z`;

// ── Phase timings (seconds) ───────────────────────────────────────────────────
// Total loading time ≈ 3.8s
const T = {
    particleIn: 0.0,
    ringStart: 0.6,
    petalStart: 1.3,
    jewel: 1.9,
    text1: 2.2,
    text2: 3.0,
    exit: 3.7,
};

// ── Component ─────────────────────────────────────────────────────────────────
const LoadingScreen = ({ onComplete }) => {
    const [phase, setPhase] = useState('particle'); // particle → ring → text1 → text2 → exit

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase('ring'), T.ringStart * 1000),
            setTimeout(() => setPhase('petal'), T.petalStart * 1000),
            setTimeout(() => setPhase('jewel'), T.jewel * 1000),
            setTimeout(() => setPhase('text1'), T.text1 * 1000),
            setTimeout(() => setPhase('text2'), T.text2 * 1000),
            setTimeout(() => setPhase('exit'), T.exit * 1000),
            setTimeout(() => onComplete?.(), (T.exit + 0.9) * 1000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    key="loading"
                    className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        background: 'radial-gradient(ellipse 120% 100% at 50% 50%, #2B0D16 0%, #1A0508 55%, #0D0204 100%)',
                        zIndex: 9999,
                    }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: phase === 'exit' ? 0 : 1 }}
                    transition={{ duration: 0.85, ease: SILK }}
                    onAnimationComplete={() => { if (phase === 'exit') setPhase('done'); }}
                >
                    {/* ── Ornamental background pattern ─────────────────────────── */}
                    <OrnamentalPattern />

                    {/* ── Main Rakhi SVG area ───────────────────────────────────── */}
                    <div className="relative flex items-center justify-center" style={{ width: SVG_SIZE, height: SVG_SIZE }}>

                        {/* Ambient glow behind SVG */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)',
                                filter: 'blur(20px)',
                            }}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: phase === 'particle' ? 0 : 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: EXPO }}
                        />

                        {/* Floating particles */}
                        {PARTICLES.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute rounded-full"
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    left: '50%',
                                    top: '50%',
                                    background: 'radial-gradient(circle, #FFD700 0%, #C9A84C 60%, transparent 100%)',
                                    boxShadow: `0 0 ${p.size * 3}px rgba(201,168,76,0.8)`,
                                }}
                                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                animate={
                                    phase !== 'particle'
                                        ? { opacity: [0, 0.9, 0.5], x: p.x, y: p.y, scale: 1 }
                                        : {}
                                }
                                transition={{ delay: p.delay * 0.5, duration: p.duration * 0.6, ease: EXPO }}
                            />
                        ))}

                        {/* SVG Rakhi */}
                        <svg
                            width={SVG_SIZE}
                            height={SVG_SIZE}
                            viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
                            style={{ position: 'absolute', top: 0, left: 0 }}
                        >
                            <defs>
                                {/* Gold gradient for ring */}
                                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#A07830" />
                                    <stop offset="40%" stopColor="#FFD700" />
                                    <stop offset="70%" stopColor="#C9A84C" />
                                    <stop offset="100%" stopColor="#E2C07B" />
                                </linearGradient>
                                {/* Glow filter */}
                                <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                {/* Jewel gradient */}
                                <radialGradient id="jewelGrad" cx="40%" cy="35%" r="60%">
                                    <stop offset="0%" stopColor="#FFF8F0" />
                                    <stop offset="40%" stopColor="#FFD700" />
                                    <stop offset="100%" stopColor="#6D0B2F" />
                                </radialGradient>
                            </defs>

                            {/* Outer decorative ring (thin) */}
                            {phase !== 'particle' && (
                                <motion.circle
                                    cx={CX} cy={CY} r={RAKHI_R + 10}
                                    fill="none"
                                    stroke="rgba(201,168,76,0.20)"
                                    strokeWidth="0.5"
                                    strokeDasharray="4 6"
                                    initial={{ opacity: 0, rotate: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    style={{ transformOrigin: `${CX}px ${CY}px` }}
                                />
                            )}

                            {/* Main ring – drawn with pathLength */}
                            <motion.circle
                                cx={CX} cy={CY} r={RAKHI_R}
                                fill="none"
                                stroke="url(#goldGrad)"
                                strokeWidth="2.5"
                                filter="url(#goldGlow)"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={
                                    phase === 'ring' || phase === 'petal' ||
                                        phase === 'jewel' || phase === 'text1' ||
                                        phase === 'text2' || phase === 'exit'
                                        ? { pathLength: 1, opacity: 1 }
                                        : { pathLength: 0, opacity: 0 }
                                }
                                transition={{ duration: 0.9, ease: EXPO }}
                            />

                            {/* Six petals */}
                            <motion.path
                                d={PETAL_PATH}
                                fill="rgba(201,168,76,0.07)"
                                stroke="url(#goldGrad)"
                                strokeWidth="1.2"
                                filter="url(#goldGlow)"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={
                                    phase === 'petal' || phase === 'jewel' ||
                                        phase === 'text1' || phase === 'text2' || phase === 'exit'
                                        ? { pathLength: 1, opacity: 1, scale: 1 }
                                        : { pathLength: 0, opacity: 0, scale: 0.8 }
                                }
                                transition={{ duration: 0.8, ease: EXPO }}
                                style={{ transformOrigin: `${CX}px ${CY}px` }}
                            />

                            {/* Inner small ring */}
                            {(phase === 'jewel' || phase === 'text1' || phase === 'text2' || phase === 'exit') && (
                                <motion.circle
                                    cx={CX} cy={CY} r={JEWEL_R + 6}
                                    fill="none"
                                    stroke="rgba(201,168,76,0.35)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, ease: EXPO }}
                                />
                            )}

                            {/* Center jewel gem */}
                            {(phase === 'jewel' || phase === 'text1' || phase === 'text2' || phase === 'exit') && (
                                <>
                                    {/* Glow ring behind jewel */}
                                    <motion.circle
                                        cx={CX} cy={CY} r={JEWEL_R + 2}
                                        fill="rgba(201,168,76,0.12)"
                                        filter="url(#goldGlow)"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                                        style={{ transformOrigin: `${CX}px ${CY}px` }}
                                    />
                                    {/* Jewel */}
                                    <motion.circle
                                        cx={CX} cy={CY} r={JEWEL_R}
                                        fill="url(#jewelGrad)"
                                        stroke="url(#goldGrad)"
                                        strokeWidth="1.5"
                                        filter="url(#goldGlow)"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                                        style={{ transformOrigin: `${CX}px ${CY}px` }}
                                    />
                                    {/* Star pattern inside jewel */}
                                    {[0, 60, 120].map((deg) => (
                                        <motion.line
                                            key={deg}
                                            x1={CX} y1={CY - JEWEL_R + 5}
                                            x2={CX} y2={CY + JEWEL_R - 5}
                                            stroke="rgba(255,255,255,0.25)"
                                            strokeWidth="0.8"
                                            strokeLinecap="round"
                                            style={{ transformOrigin: `${CX}px ${CY}px`, rotate: `${deg}deg` }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.4 }}
                                        />
                                    ))}
                                </>
                            )}

                            {/* Initial center particle (seed dot) */}
                            <motion.circle
                                cx={CX} cy={CY} r={4}
                                fill="#FFD700"
                                filter="url(#goldGlow)"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={
                                    phase === 'particle'
                                        ? { scale: 1, opacity: 1 }
                                        : phase === 'jewel' || phase === 'text1' || phase === 'text2' || phase === 'exit'
                                            ? { scale: 0, opacity: 0 }
                                            : { scale: 1.5, opacity: 0.6 }
                                }
                                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                                style={{ transformOrigin: `${CX}px ${CY}px` }}
                            />
                        </svg>
                    </div>

                    {/* ── Typography ────────────────────────────────────────────── */}
                    <div className="mt-8 flex flex-col items-center gap-3" style={{ minHeight: '80px' }}>
                        <AnimatePresence mode="wait">
                            {phase === 'text1' && (
                                <motion.p
                                    key="text1"
                                    className="font-elegant text-center px-6"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                                        fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
                                        color: 'var(--color-champagne)',
                                        letterSpacing: '0.06em',
                                        fontStyle: 'italic',
                                        lineHeight: 1.5,
                                    }}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.7, ease: EXPO }}
                                >
                                    Preparing a celebration of togetherness...
                                </motion.p>
                            )}
                            {(phase === 'text2' || phase === 'exit') && (
                                <motion.div
                                    key="text2"
                                    className="flex flex-col items-center gap-2"
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.65, ease: EXPO }}
                                >
                                    <p
                                        className="font-display text-center"
                                        style={{
                                            fontFamily: "'Cinzel', Georgia, serif",
                                            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                                            background: 'linear-gradient(135deg,#A07830,#FFD700,#E2C07B)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            letterSpacing: '0.2em',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Welcome
                                    </p>
                                    <motion.span
                                        style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', lineHeight: 1 }}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity, ease: SILK }}
                                    >
                                        ❤️
                                    </motion.span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Progress bar */}
                        <motion.div
                            className="mt-4"
                            style={{ width: 'clamp(120px, 30vw, 200px)', height: '1px', background: 'rgba(201,168,76,0.15)', borderRadius: '1px' }}
                        >
                            <motion.div
                                style={{
                                    height: '100%',
                                    borderRadius: '1px',
                                    background: 'linear-gradient(90deg, #A07830, #FFD700, #C9A84C)',
                                    boxShadow: '0 0 8px rgba(201,168,76,0.6)',
                                    originX: 0,
                                }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: T.exit - 0.2, ease: SILK }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ── Ornamental Background Pattern ─────────────────────────────────────────────
const OrnamentalPattern = () => (
    <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
    >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="ornament" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                    {/* Diamond */}
                    <polygon points="40,4 76,40 40,76 4,40"
                        fill="none" stroke="#C9A84C" strokeWidth="0.5" />
                    {/* Inner diamond */}
                    <polygon points="40,16 64,40 40,64 16,40"
                        fill="none" stroke="#C9A84C" strokeWidth="0.3" />
                    {/* Corner dots */}
                    <circle cx="40" cy="4" r="1.5" fill="#C9A84C" />
                    <circle cx="76" cy="40" r="1.5" fill="#C9A84C" />
                    <circle cx="40" cy="76" r="1.5" fill="#C9A84C" />
                    <circle cx="4" cy="40" r="1.5" fill="#C9A84C" />
                    {/* Center cross */}
                    <line x1="40" y1="22" x2="40" y2="58" stroke="#C9A84C" strokeWidth="0.3" />
                    <line x1="22" y1="40" x2="58" y2="40" stroke="#C9A84C" strokeWidth="0.3" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ornament)" />
        </svg>
    </div>
);

export default LoadingScreen;
