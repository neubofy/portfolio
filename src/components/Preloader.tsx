'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["Innovation", "Precision", "Intelligence", "Pawan Washudev"];

export default function Preloader() {
    const [index, setIndex] = useState(0);
    const [counter, setCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Counter Animation
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev < 100) return prev + 1;
                clearInterval(interval);
                return 100;
            });
        }, 20); // 20ms * 100 = 2000ms total duration

        // Word Cycle
        const wordInterval = setInterval(() => {
            setIndex((prev) => {
                if (prev < words.length - 1) return prev + 1;
                return prev;
            });
        }, 400);

        // Exit Trigger
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => {
            clearInterval(interval);
            clearInterval(wordInterval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#1c1c1e] text-white overflow-hidden"
                >
                    {/* Background Noise for Texture */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-noise"></div>

                    <div className="relative flex flex-col items-center justify-center w-full h-full">

                        {/* Central Word Reveal */}
                        <div className="h-20 overflow-hidden text-center flex items-center justify-center">
                            <motion.p
                                key={index}
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                exit={{ y: "-100%", opacity: 0 }}
                                transition={{ duration: 0.4, ease: "backOut" }}
                                className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                            >
                                {words[index]}
                            </motion.p>
                        </div>

                        {/* Counter (Bottom Right) */}
                        <div className="absolute bottom-10 right-10 text-9xl font-bold text-[var(--gold)] opacity-20 select-none">
                            {counter}%
                        </div>

                        {/* Loading Line */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                            <motion.div
                                className="h-full bg-[var(--gold)]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.2, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
