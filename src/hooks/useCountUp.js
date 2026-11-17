import { useState, useEffect } from 'react';

const easeOutExpo = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const useCountUp = (end, duration = 2000) => {
    const isBotOrPrerender = typeof navigator !== 'undefined' && navigator.webdriver;
    const [count, setCount] = useState(isBotOrPrerender ? end : 0);

    useEffect(() => {
        if (isBotOrPrerender) {
            setCount(end);
            return;
        }
        let startTime = null;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;

            // Calculate current value based on ease-out function
            const timeRatio = Math.min(progress / duration, 1);
            const easeRatio = easeOutExpo(timeRatio);
            const currentCount = Math.round(easeRatio * end);

            setCount(currentCount);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end); // Ensure it ends exactly on the target number
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration, isBotOrPrerender]);

    return count;
};
