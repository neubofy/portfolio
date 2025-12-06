'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingActions() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000); // Disappear after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[9990] pointer-events-none">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.5 } }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="bg-neutral-900/90 backdrop-blur-md border border-[var(--gold)]/30 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-3 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[var(--gold)]/5 animate-pulse" />
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <div>
                            <p className="text-white text-xs font-bold tracking-wide">Available for Hire</p>
                            <p className="text-[10px] text-[var(--gold)]">Accepting New Projects</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
