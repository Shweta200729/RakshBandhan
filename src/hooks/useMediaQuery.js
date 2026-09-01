/**
 * useMediaQuery – Responsive breakpoint hook
 * ──────────────────────────────────────────
 */

import { useState, useEffect } from 'react';

export const BREAKPOINTS = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    xxl: '(min-width: 1536px)',
};

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches
    );

    useEffect(() => {
        const mq = window.matchMedia(query);
        const handler = (e) => setMatches(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [query]);

    return matches;
};

export const useIsMobile = () => !useMediaQuery(BREAKPOINTS.md);
export const useIsTablet = () => useMediaQuery(BREAKPOINTS.md) && !useMediaQuery(BREAKPOINTS.lg);
export const useIsDesktop = () => useMediaQuery(BREAKPOINTS.lg);

export default useMediaQuery;
