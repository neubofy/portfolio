'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
    return (
        <section className="py-32 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto glass-panel p-12 md:p-20 rounded-[3rem] relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">
                    Ready to <span className="text-gradient-gold">Transcend?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    The difference between good and legendary is the code we write today. Let's build your vision.
                </p>
                <Link
                    href="#contact"
                    className="inline-block px-10 py-5 bg-[var(--gold)] text-black text-xl font-bold rounded-full hover:scale-105 transition-transform"
                >
                    Start the Journey
                </Link>
            </motion.div>
        </section>
    );
}
