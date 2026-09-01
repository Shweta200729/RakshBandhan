/**
 * cn – ClassName utility (like clsx + tailwind-merge)
 * ─────────────────────────────────────────────────────
 */
export const cn = (...classes) =>
    classes.filter(Boolean).join(' ').trim();

/**
 * clamp – Clamp a number between min and max
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * lerp – Linear interpolation
 */
export const lerp = (a, b, t) => a + (b - a) * t;

/**
 * mapRange – Map a value from one range to another
 */
export const mapRange = (val, inMin, inMax, outMin, outMax) =>
    outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);

/**
 * formatDate – Format a date for display
 */
export const formatDate = (date) =>
    new Intl.DateTimeFormat('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric',
    }).format(new Date(date));

/**
 * throttle – Throttle a function call
 */
export const throttle = (fn, limit) => {
    let lastFn, lastRan;
    return (...args) => {
        if (!lastRan) {
            fn(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    fn(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

/**
 * debounce – Debounce a function call
 */
export const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};

/**
 * splitChars – Split a string into an array of characters for text animation
 */
export const splitChars = (text) =>
    [...text].map((char, i) => ({ char, i }));

/**
 * randomBetween – Generate a random number between min and max
 */
export const randomBetween = (min, max) =>
    Math.random() * (max - min) + min;

/**
 * noop – No-operation function
 */
export const noop = () => { };
