'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--gold)]/10 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--gold)]/5 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            <motion.div style={{ y, opacity }} className="z-10 flex flex-col items-center">

                {/* Introduction Tag & Photo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 flex flex-col items-center gap-6"
                >
                    <a href="#contact" className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[var(--gold)]/20 p-1 group cursor-pointer overflow-hidden">
                        {/* Diamond Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 z-20 pointer-events-none" />

                        <div className="absolute inset-0 rounded-full bg-[var(--gold)] blur-[25px] opacity-20 animate-pulse group-hover:opacity-50 transition-opacity"></div>
                        <img
                            src="/images/myphoto.jpg"
                            alt="Sohan Kumar"
                            className="w-full h-full rounded-full object-cover transition-all duration-500 relative z-10"
                        />
                    </a>

                    <div className="px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 backdrop-blur-md">
                        <span className="text-[var(--gold)] text-xs md:text-sm font-mono tracking-[0.2em] uppercase">
                            Redefining Digital Intelligence
                        </span>
                    </div>
                </motion.div>

                {/* Massive Name - Diamond Effect */}
                <a href="#projects" className="block cursor-pointer group">
                    <h1 className="text-[12vw] leading-[0.9] font-black tracking-tighter text-white select-none relative z-20 transition-transform duration-500 group-hover:scale-105">
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-gray-400 group-hover:drop-shadow-[0_0_30px_rgba(197,160,89,0.5)] transition-all"
                        >
                            SOHAN
                        </motion.div>
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-transparent bg-clip-text bg-gradient-to-b from-[var(--gold)] to-[var(--gold-dark)] drop-shadow-[0_0_10px_rgba(197,160,89,0.2)] group-hover:drop-shadow-[0_0_40px_rgba(197,160,89,0.8)] transition-all"
                        >
                            KUMAR
                        </motion.div>
                    </h1>
                </a>

                {/* Professional Title */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-8 text-xl md:text-2xl text-gray-400 font-light tracking-wide max-w-2xl"
                >
                    18yo AI Generalist <span className="text-[var(--gold)] mx-2">•</span> Vibe Coding Expert <span className="text-[var(--gold)] mx-2">•</span> Digital Perfectionist
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <div className="text-[var(--gold)] text-[10px] uppercase tracking-[0.3em]">Scroll</div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--gold)] to-transparent" />
            </motion.div>
        </section>
    );
}
