'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

// Stylish 404 Page Matching "Midnight Luxury" Branding
export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-[var(--gold)]/30">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[var(--gold)]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
            </div>

            <div className="relative z-10 text-center px-6">

                {/* Animated Glitch 404 */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <h1 className="text-[150px] md:text-[250px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-[150px] md:text-[250px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-[var(--gold)] to-transparent opacity-20 blur-sm animate-pulse">
                            404
                        </h1>
                    </div>

                    {/* Overlay Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--gold)] text-6xl animate-bounce">
                        <FaExclamationTriangle />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 tracking-tight">
                        System Malfunction
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto mb-10 text-lg">
                        The neural pathway you requested does not exist or has been severed. Return to the mainframe to re-establish connection.
                    </p>

                    <Link
                        href="/"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--gold)] text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <FaHome className="relative z-10" />
                        <span className="relative z-10 uppercase tracking-wider text-sm">Return Home</span>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Code Lines */}
            <div className="absolute bottom-10 left-10 font-mono text-xs text-white/20 hidden md:block">
                <p>ERROR_CODE: 0x404_PAGE_NOT_FOUND</p>
                <p>STATUS: DISCONNECTED</p>
            </div>

        </main>
    );
}
