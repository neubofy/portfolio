'use client';

import { motion } from 'framer-motion';
import { FaReact, FaPython, FaNodeJs, FaGithub, FaAws, FaDocker, FaBrain, FaCode, FaRocket, FaPalette, FaGem, FaMagic } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiOpenai, SiTensorflow, SiPytorch, SiLangchain } from 'react-icons/si';
import TiltCard from './TiltCard';

export default function BentoGrid() {
    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
                The <span className="text-gradient-gold">Perfectionist</span> Standard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[1200px]">

                {/* 1. The Prodigy (Main About) - 2x2 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-2 md:row-span-2 h-full"
                >
                    <TiltCard className="glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group border border-white/5 hover:border-[var(--gold)]/30 transition-all duration-500 h-full">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--gold)] opacity-5 blur-[100px] rounded-full pointer-events-none" />

                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="p-3 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)]">
                                    <FaBrain className="text-2xl" />
                                </span>
                                <h3 className="text-3xl font-bold text-white">The Vibe Coder</h3>
                            </div>
                            <p className="text-gray-300 text-xl leading-relaxed mb-6">
                                I don't write code—I <b>orchestrate AI</b> to build it. As an <b>AI-First Developer</b>, I focus on what truly matters: <b>innovative logic, unique ideas, and absolute perfection</b>. The syntax? AI handles that.
                            </p>
                            <p className="text-gray-300 text-xl leading-relaxed">
                                While others debate languages and frameworks, I'm <b>shipping production-ready apps</b>—leveraging multiple AI models, ensuring security standards, and building with cutting-edge tech. <b>Speed without compromise.</b>
                            </p>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <div className="px-5 py-3 rounded-full bg-white/5 border border-white/5 text-sm font-mono text-[var(--gold)]">
                                #VibeCoder
                            </div>
                            <div className="px-5 py-3 rounded-full bg-white/5 border border-white/5 text-sm font-mono text-[var(--gold)]">
                                #AIFirst
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* 2. Timeline - 1x1 */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="h-full"
                >
                    <TiltCard className="glass-panel rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden hover:scale-[1.02] transition-transform h-full">
                        <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-2">AI Mastery Since</h4>
                        <span className="text-5xl font-bold text-[var(--gold)]">2022</span>
                        <span className="text-gray-300 mt-2">The Inception</span>
                    </TiltCard>
                </motion.div>

                {/* 3. Dedication - 1x1 */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-full"
                >
                    <TiltCard className="glass-panel rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden hover:scale-[1.02] transition-transform h-full">
                        <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Commitment</h4>
                        <span className="text-6xl font-bold text-[var(--gold)]">100%</span>
                        <span className="text-gray-300 mt-2">Precision Rate</span>
                    </TiltCard>
                </motion.div>

                {/* 4. Vibe Coding (Philosophy) - 2x1 */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="md:col-span-2 h-full"
                >
                    <TiltCard className="glass-panel rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-4 mb-4">
                            <FaGem className="text-3xl text-[var(--gold)]" />
                            <h3 className="text-2xl font-bold text-white">The "Vibe" Philosophy</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            I harness AI like a <b>power tool</b>—not a crutch. Multiple models cross-checking each other, security audits automated, latest libraries always. I focus on the <b>vision and architecture</b>; AI accelerates the execution. Result? <b>World-class products, shipped fast.</b>
                        </p>
                    </TiltCard>
                </motion.div>

                {/* 5. AI Stack (Wide) - 2x1 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="md:col-span-2 h-full"
                >
                    <TiltCard className="glass-panel rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden h-full">
                        <h3 className="text-xl font-bold text-gray-200 mb-6 flex items-center gap-2">
                            <SiOpenai className="text-[var(--gold)]" /> AI Command Center
                        </h3>
                        <div className="flex flex-wrap gap-4 text-gray-300">
                            {["OpenAI", "Midjourney", "LangChain", "Image Generation", "Prompt Engineering"].map((tech) => (
                                <span key={tech} className="text-xl border-b border-[var(--gold)]/30 pb-1">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </TiltCard>
                </motion.div>

                {/* 6. Web Stack (Wide) - 2x1 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="md:col-span-2 h-full"
                >
                    <TiltCard className="glass-panel rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden h-full">
                        <h3 className="text-xl font-bold text-gray-200 mb-6 flex items-center gap-2">
                            <FaRocket className="text-[var(--gold)]" /> High-Performance Delivery
                        </h3>
                        <div className="flex flex-wrap gap-4 text-gray-300">
                            {["React", "Next.js", "Vite", "Kotlin", "React Native", "n8n", "RAG"].map((tech) => (
                                <span key={tech} className="text-xl border-b border-blue-400/30 pb-1">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </TiltCard>
                </motion.div>

            </div>
        </section>
    );
}
