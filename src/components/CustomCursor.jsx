import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [cursorVariant, setCursorVariant] = useState('default');
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Mouse coordinates (immediate for center dot, sprung for smooth trailing ring)
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { stiffness: 600, damping: 30, mass: 0.4 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const lastPos = useRef({ x: -100, y: -100 });

    const updateVariantUnderCursor = useCallback((x, y) => {
        if (x < 0 || y < 0) return;
        const target = document.elementFromPoint(x, y);
        if (!target) return;

        const isButton = target.closest('button') || target.closest('a') || target.closest('[role="button"]') || target.closest('.cursor-pointer');
        const isImage = target.closest('img') || target.closest('.image-frame') || target.closest('.gallery-card');
        const isText = target.closest('h1') || target.closest('h2') || target.closest('h3');
        const isInteractive = target.closest('textarea') || target.closest('input') || target.closest('.pulse-dot');

        if (isButton || isInteractive) {
            setCursorVariant('button');
        } else if (isImage) {
            setCursorVariant('image');
        } else if (isText) {
            setCursorVariant('text');
        } else {
            setCursorVariant('default');
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 || 'ontouchstart' in window) {
            setIsMobile(true);
            return;
        }

        const handlePointerMove = (e) => {
            const { clientX, clientY } = e;
            lastPos.current = { x: clientX, y: clientY };

            mouseX.set(clientX);
            mouseY.set(clientY);

            if (!isVisible) setIsVisible(true);

            updateVariantUnderCursor(clientX, clientY);
        };

        const handleScroll = () => {
            if (lastPos.current.x >= 0 && lastPos.current.y >= 0) {
                if (!isVisible) setIsVisible(true);
                updateVariantUnderCursor(lastPos.current.x, lastPos.current.y);
            }
        };

        const handleMouseLeave = (e) => {
            // Only hide if the cursor actually exited the viewport
            if (!e.relatedTarget && !e.toElement) {
                setIsVisible(false);
            }
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener('mousemove', handlePointerMove, { passive: true });
        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('wheel', handleScroll, { passive: true });
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleScroll);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible, mouseX, mouseY, updateVariantUnderCursor]);

    if (isMobile) return null;

    // Follower ring animation variants (scaling/styling only — coordinates handled by motion values)
    const ringVariants = {
        default: {
            width: 28,
            height: 28,
            borderColor: 'rgba(255, 215, 0, 0.65)',
            backgroundColor: 'rgba(255, 215, 0, 0.04)',
            boxShadow: '0 0 12px rgba(255, 215, 0, 0.35)',
            scale: 1,
        },
        button: {
            width: 52,
            height: 52,
            borderColor: 'rgba(255, 215, 0, 0.95)',
            backgroundColor: 'rgba(255, 215, 0, 0.12)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), inset 0 0 10px rgba(255, 215, 0, 0.2)',
            scale: 1.15,
        },
        image: {
            width: 64,
            height: 64,
            borderColor: 'rgba(201, 168, 76, 0.8)',
            backgroundColor: 'rgba(201, 168, 76, 0.1)',
            boxShadow: '0 0 25px rgba(201, 168, 76, 0.4)',
            scale: 1.1,
        },
        text: {
            width: 36,
            height: 36,
            borderColor: 'rgba(255, 215, 0, 0.5)',
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
            boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
            scale: 1.05,
        },
    };

    return (
        <>
            {/* Global style override safely stripping default cursors while component is active */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (pointer: fine) {
                    *, *::before, *::after {
                        cursor: none !important;
                    }
                }
            `}} />

            {/* Smooth Outer Follower Ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[999999] rounded-full border border-solid"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                }}
                variants={ringVariants}
                animate={cursorVariant}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            />

            {/* Instant Central Gold Dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[999999] w-2 h-2 rounded-full bg-[#FFD700]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                    boxShadow: '0 0 8px rgba(255, 215, 0, 1), 0 0 16px rgba(201, 168, 76, 0.8)',
                }}
                transition={{ duration: 0.15 }}
            />
        </>
    );
};

export default CustomCursor;

