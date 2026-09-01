/**
 * GSAP + ScrollTrigger Utility
 * ─────────────────────────────
 * Central registration and helper functions for GSAP animations.
 * Import this once (in App.jsx) to register plugins globally.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { CustomEase } from 'gsap/CustomEase';

// ── Plugin Registration ──────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase);

// ── Custom Eases ─────────────────────────────────────────────────────────────
CustomEase.create('silkSmooth', 'M0,0 C0.25,0.46 0.45,0.94 1,1');
CustomEase.create('royalSpring', 'M0,0 C0.34,1.56 0.64,1 1,1');
CustomEase.create('expoOut', 'M0,0 C0.16,1 0.3,1 1,1');

// ── GSAP Default Config ──────────────────────────────────────────────────────
gsap.config({
    nullTargetWarn: false,
    trialWarn: false,
});

gsap.defaults({
    ease: 'silkSmooth',
    duration: 0.8,
});

// ── Helper: Fade In Up ───────────────────────────────────────────────────────
/**
 * Animate elements fading in from below on scroll.
 * @param {string|Element} targets - CSS selector or DOM element
 * @param {object} options         - Override defaults
 */
export const fadeInUp = (targets, options = {}) => {
    return gsap.fromTo(
        targets,
        { opacity: 0, y: 60, willChange: 'transform, opacity' },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'expoOut',
            stagger: 0.12,
            scrollTrigger: {
                trigger: targets,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            },
            ...options,
        }
    );
};

// ── Helper: Fade In ───────────────────────────────────────────────────────────
export const fadeIn = (targets, options = {}) => {
    return gsap.fromTo(
        targets,
        { opacity: 0 },
        {
            opacity: 1,
            duration: 1.0,
            ease: 'silkSmooth',
            scrollTrigger: {
                trigger: targets,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
            },
            ...options,
        }
    );
};

// ── Helper: Stagger Children ─────────────────────────────────────────────────
export const staggerChildren = (parent, childSelector, options = {}) => {
    return gsap.fromTo(
        `${parent} ${childSelector}`,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'expoOut',
            scrollTrigger: {
                trigger: parent,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            ...options,
        }
    );
};

// ── Helper: Parallax ──────────────────────────────────────────────────────────
export const parallax = (targets, speed = 0.3, options = {}) => {
    return gsap.to(targets, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: targets,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
        ...options,
    });
};

// ── Helper: Reveal Clip ───────────────────────────────────────────────────────
export const revealClip = (targets, direction = 'left', options = {}) => {
    const clipStart = {
        left: 'inset(0 100% 0 0)',
        right: 'inset(0 0 0 100%)',
        top: 'inset(100% 0 0 0)',
        bottom: 'inset(0 0 100% 0)',
    }[direction];

    return gsap.fromTo(
        targets,
        { clipPath: clipStart, opacity: 0 },
        {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 1.2,
            ease: 'expoOut',
            scrollTrigger: {
                trigger: targets,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
            },
            ...options,
        }
    );
};

// ── Helper: Scale In ──────────────────────────────────────────────────────────
export const scaleIn = (targets, options = {}) => {
    return gsap.fromTo(
        targets,
        { opacity: 0, scale: 0.85, transformOrigin: 'center center' },
        {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'royalSpring',
            scrollTrigger: {
                trigger: targets,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
            ...options,
        }
    );
};

// ── Helper: Horizontal Scroll ─────────────────────────────────────────────────
export const horizontalScroll = (container, inner, options = {}) => {
    const panels = gsap.utils.toArray(inner);
    const totalWidth = panels.reduce((acc, el) => acc + el.offsetWidth, 0);

    return gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => `+=${totalWidth}`,
        },
        ...options,
    });
};

// ── Refresh on resize ────────────────────────────────────────────────────────
export const refreshScrollTrigger = () => ScrollTrigger.refresh();

export { gsap, ScrollTrigger };
