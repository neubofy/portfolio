'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

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
                            Pawan Washudev
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl pt-32 px-6 md:hidden flex flex-col items-center gap-8 border-t border-[var(--glass-border)]"
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
                        <div className="w-12 h-1 bg-[var(--gold)] rounded-full mt-4" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
