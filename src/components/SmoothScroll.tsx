'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';

function Preloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[10000] bg-[#050507] flex items-center justify-center"
        >
            <div className="flex flex-col items-center">
                {/* Luxury Loader */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="w-24 h-24 rounded-full border border-[var(--gold)]/20 border-t-[var(--gold)] animate-spin-slow flex items-center justify-center"
                >
                    <div className="w-16 h-16 rounded-full bg-[var(--gold)]/10 blur-md" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-xl font-[var(--font-mono)] text-[var(--gold)] tracking-[0.2em] uppercase"
                >
                    Loading Experience
                </motion.h2>
            </div>
        </motion.div>
    );
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Fake loading time for assets (or could wait for window.onload)
        const timer = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0); // Reset scroll
        }, 2000);

        return () => {
            lenis.destroy();
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <Preloader key="preloader" />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {children}
            </motion.div>
        </>
    );
}
