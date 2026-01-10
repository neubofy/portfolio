'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaChevronLeft } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import styles from './styles.module.css';

/**
 * AIMERS - Custom Project Component
 * 
 * This is YOUR playground! You have complete design freedom here.
 * 
 * QUICK START:
 * 1. Edit this file to create your unique design
 * 2. Add custom CSS in styles.module.css
 * 3. Import any components you need
 * 
 * AVAILABLE TO YOU:
 * - framer-motion for animations
 * - All existing components (Navbar, TiltCard, etc.)
 * - Tailwind CSS classes
 * - Custom CSS modules
 */
export default function AimersProject() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] text-white">
            <Navbar />

            {/* 🎨 HERO SECTION - Customize this! */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Animated Background */}
                <div className={styles.heroBackground}>
                    <div className={styles.gradientOrb1} />
                    <div className={styles.gradientOrb2} />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Tags */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {['AI', 'Machine Learning', 'React'].map((tag) => (
                                <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title - Make it YOURS */}
                        <h1 className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                            AIMERS
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
                            A revolutionary AI platform that redefines how we interact with machine learning.
                        </p>

                        {/* CTA Button */}
                        <motion.a
                            href="https://aimers.example.com"
                            target="_blank"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all"
                        >
                            Visit Live <FaExternalLinkAlt />
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* 📸 GALLERY SECTION - Add your screenshots */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-5xl font-bold text-center mb-16"
                    >
                        Project <span className="text-purple-400">Highlights</span>
                    </motion.h2>

                    {/* Grid of images - Add your own! */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="aspect-video bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-white/10 flex items-center justify-center"
                            >
                                <span className="text-gray-500">Screenshot {i}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 📝 CONTENT SECTION - Tell your story */}
            <section className="py-32 px-6 bg-white text-black">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-5xl font-bold mb-10">The Vision</h2>
                        <p className="text-xl leading-relaxed text-gray-700 mb-8">
                            Write anything you want here. This is YOUR custom content section.
                            You can add images, videos, code blocks, or any HTML element.
                        </p>

                        {/* Example: Custom Code Block */}
                        <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto mb-8">
                            <pre>{`// Your custom code example
const ai = new AIModel('aimers');
const result = await ai.predict(data);
console.log(result);`}</pre>
                        </div>

                        <p className="text-xl leading-relaxed text-gray-700">
                            Add more sections, change colors, add animations - the sky is the limit!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER NAV */}
            <section className="py-16 px-6 bg-[#0a0a0a]">
                <div className="max-w-4xl mx-auto text-center">
                    <a href="/projects" className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-lg font-bold group">
                        <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
                    </a>
                </div>
            </section>
        </main>
    );
}
