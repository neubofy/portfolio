'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // Import Portal
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start py-6 px-6 md:px-12 pointer-events-none"
            >
                {/* 1. Identity Pill (Left) */}
                <div className="pointer-events-auto">
                    <div className="glass-panel px-6 py-2 rounded-full border border-[var(--glass-border)] backdrop-blur-xl shadow-lg flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--gold)]">
                            <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <button
                            onClick={scrollToTop}
                            className="text-[var(--gold)] font-bold text-2xl hover:text-white transition-colors"
                        >
                            Sohan Kumar
                        </button>
                    </div>
                </div>

                {/* 2. Navigation Pill (Right) */}
                <div className="pointer-events-auto">
                    <div className="glass-panel px-6 py-3 rounded-full border border-[var(--glass-border)] backdrop-blur-xl shadow-lg flex items-center">

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-white hover:text-[var(--gold)] transition-colors text-xl font-bold">
                                Home
                            </Link>
                            <Link href="/projects" className="text-white hover:text-[var(--gold)] transition-colors text-xl font-bold">
                                Projects
                            </Link>
                            <Link href="#contact" className="text-white hover:text-[var(--gold)] transition-colors text-xl font-bold">
                                Contact
                            </Link>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden text-white text-xl"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay - Portal to Body to fix positioning issues */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop - Click to Close */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm md:hidden"
                            />

                            {/* Menu Popup */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                                exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                                transition={{ type: "spring", duration: 0.3 }}
                                className="fixed top-1/2 left-1/2 z-[9999] w-[85vw] max-w-sm bg-black border border-[var(--gold)] rounded-2xl flex flex-col items-center gap-8 py-12 shadow-2xl md:hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-bold text-white hover:text-[var(--gold)]"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/projects"
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-bold text-white hover:text-[var(--gold)]"
                                >
                                    Projects
                                </Link>
                                <Link
                                    href="#contact"
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-bold text-white hover:text-[var(--gold)]"
                                >
                                    Contact
                                </Link>
                                <div className="w-12 h-1 bg-[var(--gold)] rounded-full mt-2" />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
