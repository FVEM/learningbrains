import { useState, useEffect, useRef } from 'react';
import { useCountUp } from './useCountUp';

export const AnimatedCount = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    // Only count up when it becomes visible
    const count = useCountUp(isVisible ? end : 0, duration);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                // Once triggered, we don't need to observe anymore
                if (elementRef.current) observer.unobserve(elementRef.current);
            }
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) observer.unobserve(elementRef.current);
        };
    }, []);

    return (
        <span ref={elementRef}>
            {prefix}{count}{suffix}
        </span>
    );
};
