/**
 * useLenis – Smooth Scroll Hook
 * ──────────────────────────────
 * Initializes Lenis smooth scrolling and syncs it with GSAP ScrollTrigger.
 * Use this once in App.jsx. Child components can access the Lenis instance
 * via the returned ref or by importing useLenisScroll().
 */

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from '../utils/gsap';

// Singleton instance – accessible outside React tree
let lenisInstance = null;

export const getLenis = () => lenisInstance;

/**
 * Primary hook — initialize in App.jsx only.
 * @returns {React.RefObject} - ref holding the Lenis instance
 */
export const useLenis = () => {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisInstance = lenis;
        lenisRef.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // GSAP RAF loop
        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        // Refresh ScrollTrigger after Lenis is ready
        ScrollTrigger.refresh();

        return () => {
            lenis.destroy();
            lenisInstance = null;
        };
    }, []);

    return lenisRef;
};

/**
 * Helper hook — use in any component to scroll to a target.
 * @returns {{ scrollTo: Function }}
 */
export const useLenisScroll = () => {
    const scrollTo = (target, options = {}) => {
        if (!lenisInstance) return;
        lenisInstance.scrollTo(target, {
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            ...options,
        });
    };

    return { scrollTo };
};

export default useLenis;
