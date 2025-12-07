'use client';

import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const testimonials = [
    // ... (keep data)
];

export default function Testimonials() {
    return (
        <section className="py-24 px-4 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">
                Trusted by <span className="text-gradient-gold">Innovators</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="h-full"
                    >
                        <TiltCard className="h-full">
                            <div className="glass-panel p-10 rounded-3xl flex flex-col justify-between h-full">
                                <p className="text-xl md:text-2xl text-gray-200 mb-8 italic leading-relaxed">
                                    "{t.quote}"
                                </p>
                                <div>
                                    <div className="text-[var(--gold)] font-bold text-lg">{t.author}</div>
                                    <div className="text-gray-500">{t.role}</div>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
