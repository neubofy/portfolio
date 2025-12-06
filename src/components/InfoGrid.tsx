'use client';

import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaClock, FaUniversity, FaBolt, FaInfinity, FaCheckCircle } from 'react-icons/fa';

export default function InfoGrid() {
    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">

                {/* 1. Global Reach */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="col-span-2 glass-panel p-8 rounded-3xl flex flex-col justify-between min-h-[250px] relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-50 transition-opacity">
                        <FaGlobeAmericas className="text-9xl text-[var(--gold)]" />
                    </div>
                    <div>
                        <h3 className="text-gray-400 font-mono text-sm tracking-widest uppercase mb-2">Global Impact</h3>
                        <p className="text-3xl font-bold text-white max-w-xs">
                            Clients in <span className="text-[var(--gold)]">3 Continents</span> trusting my architecture.
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/5">USA</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/5">Europe</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/5">Asia</span>
                    </div>
                </motion.div>

                {/* 2. Rapid Delivery */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="col-span-1 glass-panel p-6 rounded-3xl flex flex-col gap-4 items-center justify-center text-center group hover:border-[var(--gold)]/50 transition-colors"
                >
                    <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] text-xl group-hover:scale-110 transition-transform">
                        <FaBolt />
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-white">48h</h4>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">MVP Turnaround</p>
                    </div>
                </motion.div>

                {/* 3. Availability */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="col-span-1 glass-panel p-6 rounded-3xl flex flex-col gap-4 items-center justify-center text-center group hover:border-green-500/50 transition-colors"
                >
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 text-xl group-hover:scale-110 transition-transform">
                        <FaCheckCircle />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white">Available</h4>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">For Commissions</p>
                    </div>
                </motion.div>

                {/* 4. Education */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="col-span-2 md:col-span-1 glass-panel p-6 rounded-3xl flex flex-col justify-center relative overflow-hidden group hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FaUniversity className="text-2xl text-[var(--gold)]" />
                        <h3 className="text-lg font-bold text-white">100% Self-Taught</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        No degrees, just raw documentation and endless hunger. My teacher was the internet, my exam is your project.
                    </p>
                </motion.div>

                {/* 5. Uptime */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="col-span-2 md:col-span-3 glass-panel p-8 rounded-3xl flex items-center justify-between relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 max-w-lg">
                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <FaInfinity className="text-[var(--gold)]" /> The Perfectionist Promise
                        </h3>
                        <p className="text-gray-400">
                            I don't just write code; I craft systems that endure. Every line is optimized for infinite scalability and zero technical debt.
                        </p>
                    </div>
                    <div className="relative z-10 hidden md:block">
                        <div className="px-6 py-2 border border-[var(--gold)] text-[var(--gold)] rounded-full text-sm font-bold uppercase tracking-widest">
                            Top 1% Talent
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
