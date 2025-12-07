'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const terminalLines = [
    "> INITIALIZING_NEURAL_UPLINK...",
    "> CONNECTING_TO_MAINFRAME...",
    "> LOADING_ASSETS: [██████████] 100%",
    "> ACCESS_GRANTED: WELCOME_USER"
];

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [terminalIndex, setTerminalIndex] = useState(0);

    // Initial load timer
    useEffect(() => {
        // Pseudo-terminal typing effect
        const lineTimer = setInterval(() => {
            setTerminalIndex((prev) => {
                if (prev < terminalLines.length) return prev + 1;
                clearInterval(lineTimer);
                return prev;
            });
        }, 800);

        const exitTimer = setTimeout(() => {
            setIsLoading(false);
        }, 4000); // 4 seconds total duration

        return () => {
            clearInterval(lineTimer);
            clearTimeout(exitTimer);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050507] text-white overflow-hidden cursor-wait"
                >
                    {/* Background Grid & Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                    <div className="absolute inset-0 bg-black/60 pointer-events-none" />

                    {/* Main Content Container */}
                    <div className="relative z-10 flex flex-col items-center gap-10">

                        {/* 1. THE LOGO - User's Photo with Cybernetic Rings */}
                        <div className="relative w-32 h-32 md:w-40 md:h-40">
                            {/* Spinning Cyber Rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 rounded-full border border-dashed border-[var(--gold)]/30"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-2 rounded-full border border-[var(--gold)]/20 border-t-transparent border-l-transparent"
                            />

                            {/* The Photo Logo */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full rounded-full overflow-hidden border-2 border-[var(--gold)] shadow-[0_0_30px_rgba(212,175,55,0.3)] relative z-20"
                            >
                                <img
                                    src="/images/myphoto.jpg"
                                    alt="Pawan Washudev"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Ping Effect */}
                            <motion.div
                                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-full bg-[var(--gold)]/20 z-10"
                            />
                        </div>

                        {/* 2. TERMINAL COMMANDS */}
                        <div className="font-mono text-xs md:text-sm text-[var(--gold)] bg-black/50 p-6 rounded-lg border border-white/10 backdrop-blur-md w-[300px] md:w-[400px] min-h-[140px] shadow-2xl relative overflow-hidden">
                            {/* Scanline overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />

                            <div className="flex flex-col gap-2">
                                {terminalLines.slice(0, terminalIndex + 1).map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-green-500">➜</span>
                                        <span className={i === terminalLines.length - 1 ? "animate-pulse" : "opacity-70"}>
                                            {line}
                                        </span>
                                    </motion.div>
                                ))}
                                {/* Blinking Cursor */}
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block w-2 h-4 bg-[var(--gold)] align-middle ml-1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom System Status */}
                    <div className="absolute bottom-10 left-0 w-full text-center">
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">
                            System_Status: <span className="text-green-400">Online</span>
                        </p>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
