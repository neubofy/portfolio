'use client';

import { motion } from 'framer-motion';

export default function ScrollingMarquee() {
    const marqueeVariants: any = {
        animate: {
            x: [0, -1000],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <div className="relative w-full overflow-hidden bg-[var(--gold)]/5 py-4 border-y border-[var(--gold)]/10 backdrop-blur-sm">
            <motion.div
                className="flex whitespace-nowrap gap-10"
                variants={marqueeVariants}
                animate="animate"
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-4xl md:text-6xl font-bold text-transparent px-4" style={{ WebkitTextStroke: "1px rgba(197, 160, 89, 0.4)" }}>
                        AI ARCHITECT • VIBE CODING • AUTOMATION • WEB 3.0 • DIGITAL CRAFTSMAN •
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
