'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [hoverState, setHoverState] = useState<'default' | 'pointer'>('default');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const moveCursor = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            // Direct transform for zero lag
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.closest('a') ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('button') ||
                target.getAttribute('role') === 'button';

            setHoverState(isClickable ? 'pointer' : 'default');
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', () => setIsVisible(false));

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', () => setIsVisible(false));
        };
    }, [isVisible]);

    return (
        <div
            ref={cursorRef}
            className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Core Dot (Always sharp) */}
            <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out
                ${hoverState === 'pointer' ? 'w-16 h-16 bg-[var(--gold)]/10 border border-[var(--gold)]' : 'w-3 h-3 bg-[var(--gold)]'}
            `} />

            {/* Inner hint for pointer */}
            <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[var(--gold)] rounded-full transition-all duration-200
                ${hoverState === 'pointer' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
            `} />
        </div>
    );
}
