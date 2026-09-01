/**
 * Framer Motion – Shared Animation Variants
 * ──────────────────────────────────────────
 * Reusable motion variants to keep animations consistent across the site.
 * Import specific variants into components as needed.
 */

// ── Easings ────────────────────────────────────────────────────────────────────
export const EASES = {
    silk: [0.25, 0.46, 0.45, 0.94],
    spring: [0.34, 1.56, 0.64, 1],
    expo: [0.16, 1, 0.3, 1],
    smooth: [0.43, 0.13, 0.23, 0.96],
};

// ── Viewport Settings ─────────────────────────────────────────────────────────
export const VIEWPORT = {
    once: true,
    margin: '-80px',
};

// ── Fade In Up ────────────────────────────────────────────────────────────────
export const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASES.expo },
    },
};

// ── Fade In ───────────────────────────────────────────────────────────────────
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1.0, ease: EASES.silk },
    },
};

// ── Fade In Down ──────────────────────────────────────────────────────────────
export const fadeInDown = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASES.expo },
    },
};

// ── Fade In Left ──────────────────────────────────────────────────────────────
export const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: EASES.expo },
    },
};

// ── Fade In Right ─────────────────────────────────────────────────────────────
export const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: EASES.expo },
    },
};

// ── Scale In ──────────────────────────────────────────────────────────────────
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: EASES.spring },
    },
};

// ── Scale In Rotate ───────────────────────────────────────────────────────────
export const scaleInRotate = {
    hidden: { opacity: 0, scale: 0.5, rotate: -15 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.8, ease: EASES.spring },
    },
};

// ── Container – Stagger Children ─────────────────────────────────────────────
export const staggerContainer = (stagger = 0.1, delayChildren = 0.2) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: stagger,
            delayChildren: delayChildren,
        },
    },
});

// ── Blur In ───────────────────────────────────────────────────────────────────
export const blurIn = {
    hidden: { opacity: 0, filter: 'blur(12px)', scale: 1.02 },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        transition: { duration: 1.0, ease: EASES.expo },
    },
};

// ── Slide Up Reveal (clip-path) ───────────────────────────────────────────────
export const slideUpReveal = {
    hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    visible: {
        clipPath: 'inset(0% 0 0 0)',
        opacity: 1,
        transition: { duration: 1.0, ease: EASES.expo },
    },
};

// ── Rotate In ─────────────────────────────────────────────────────────────────
export const rotateIn = {
    hidden: { opacity: 0, rotate: -10, transformOrigin: 'center bottom' },
    visible: {
        opacity: 1,
        rotate: 0,
        transition: { duration: 0.9, ease: EASES.spring },
    },
};

// ── Hover Scale ───────────────────────────────────────────────────────────────
export const hoverScale = {
    rest: { scale: 1, transition: { duration: 0.3, ease: EASES.silk } },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: EASES.silk } },
};

// ── Hover Lift (scale + shadow) ───────────────────────────────────────────────
export const hoverLift = {
    rest: { y: 0, scale: 1, transition: { duration: 0.3, ease: EASES.silk } },
    hover: { y: -6, scale: 1.02, transition: { duration: 0.3, ease: EASES.silk } },
};

// ── Gold Shimmer Button ───────────────────────────────────────────────────────
export const goldButton = {
    rest: { scale: 1, boxShadow: '0 0 12px rgba(201, 168, 76, 0.25)' },
    hover: { scale: 1.04, boxShadow: '0 0 30px rgba(201, 168, 76, 0.60)' },
    tap: { scale: 0.97 },
};

// ── Page Transition ───────────────────────────────────────────────────────────
export const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: EASES.silk } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

// ── Text Character Reveal (split by char) ─────────────────────────────────────
export const charVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASES.expo },
    },
};

export const textRevealContainer = (stagger = 0.04) => ({
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
});
