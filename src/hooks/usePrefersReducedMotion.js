/**
 * usePrefersReducedMotion
 * Returns true if the user has requested reduced motion via OS settings.
 * Use this in any component that has heavy animation to conditionally scale back.
 */
import { useState, useEffect } from 'react';

export const usePrefersReducedMotion = () => {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = (e) => setReducedMotion(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return reducedMotion;
};
