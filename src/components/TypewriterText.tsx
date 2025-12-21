
// src/components/TypewriterText.tsx

'use client';

import { motion, Variants } from 'framer-motion';

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
}

export default function TypewriterText({ text, className = "", delay = 0, speed = 0.02 }: TypewriterTextProps) {
    const letters = Array.from(text);

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: speed, delayChildren: delay * i }
        })
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            display: "inline-block",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            } as const
        },
        hidden: {
            opacity: 0,
            display: "none",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            } as const
        }
    };

    return (
        <motion.span
            style={{ overflow: "hidden", display: "inline-block" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index} style={{ whiteSpace: 'pre' }}>
                    {letter}
                </motion.span>
            ))}
        </motion.span>
    );
}
