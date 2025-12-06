'use client';

import { motion } from 'framer-motion';
import { FaReact, FaPython, FaNodeJs, FaGithub, FaAws, FaDocker, FaBrain, FaCode, FaRocket, FaPalette, FaGem, FaMagic } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiOpenai, SiTensorflow, SiPytorch, SiLangchain } from 'react-icons/si';

export default function BentoGrid() {
    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
                The <span className="text-gradient-gold">Perfectionist</span> Standard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[900px]">

                {/* 1. The Prodigy (Main About) - 2x2 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-2 md:row-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group border border-white/5 hover:border-[var(--gold)]/30 transition-all duration-500"
                >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--gold)] opacity-5 blur-[100px] rounded-full pointer-events-none" />

                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="p-3 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)]">
                                <FaBrain className="text-2xl" />
                            </span>
                            <h3 className="text-3xl font-bold text-white">AI-Native Architect</h3>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            Since <b>December 2022</b>, I have not just used AI; I have merged with it. I command the full potential of Artificial Intelligence with <b>human perfection</b> to build systems that were previously impossible.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            I am a <b>Vibe Coding Expert</b> with 3+ years of raw development experience. I know exactly where AI falters and where my expertise must intervene. The result? <b>Flawless, top-notch digital architectures.</b>
                        </p>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <div className="px-5 py-3 rounded-full bg-white/5 border border-white/5 text-sm font-mono text-[var(--gold)]">
                            #Perfectionist
                        </div>
                        <div className="px-5 py-3 rounded-full bg-white/5 border border-white/5 text-sm font-mono text-[var(--gold)]">
                            #ImageGeneration
                        </div>
                    </div>
                </motion.div>

                {/* 2. Timeline - 1x1 */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="glass-panel rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden hover:scale-[1.02] transition-transform"
                >
                    <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-2">AI Mastery Since</h4>
                    <span className="text-5xl font-bold text-[var(--gold)]">2022</span>
                    <span className="text-gray-300 mt-2">The Inception</span>
                </motion.div>

                {/* 3. Dedication - 1x1 */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-panel rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden hover:scale-[1.02] transition-transform"
                >
                    <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Commitment</h4>
                    <span className="text-6xl font-bold text-[var(--gold)]">100%</span>
                    <span className="text-gray-300 mt-2">Precision Rate</span>
                </motion.div>

                {/* 4. Vibe Coding (Philosophy) - 2x1 */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="md:col-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4 mb-4">
                        <FaGem className="text-3xl text-[var(--gold)]" />
                        <h3 className="text-2xl font-bold text-white">The "Vibe" Methodology</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                        It's not just about asking an LLM to write code. It's about <b>Prompt Engineering</b> at a master level. I orchestrate AI to verify logic, generate top-notch landing pages, and optimize visuals, while I ensure the structural integrity remains <b>world-class</b>.
                    </p>
                </motion.div>

                {/* 5. AI Stack (Wide) - 2x1 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="md:col-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden"
                >
                    <h3 className="text-xl font-bold text-gray-200 mb-6 flex items-center gap-2">
                        <SiOpenai className="text-[var(--gold)]" /> AI Command Center
                    </h3>
                    <div className="flex flex-wrap gap-6 text-4xl text-gray-500">
                        <SiOpenai className="hover:text-white transition-colors" title="OpenAI" />
                        <FaMagic className="hover:text-white transition-colors" title="Midjourney" />
                        <SiLangchain className="hover:text-white transition-colors" title="LangChain" />
                        <FaPalette className="hover:text-pink-500 transition-colors" title="Image Generation" />
                        <FaBrain className="hover:text-[var(--gold)] transition-colors" title="Prompt Engineering" />
                    </div>
                </motion.div>

                {/* 6. Web Stack (Wide) - 2x1 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="md:col-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden"
                >
                    <h3 className="text-xl font-bold text-gray-200 mb-6 flex items-center gap-2">
                        <FaRocket className="text-[var(--gold)]" /> High-Performance Delivery
                    </h3>
                    <div className="flex flex-wrap gap-6 text-4xl text-gray-500">
                        <FaReact className="hover:text-[#61DAFB] transition-colors" />
                        <SiNextdotjs className="hover:text-white transition-colors" />
                        <SiTailwindcss className="hover:text-[#38B2AC] transition-colors" />
                        <SiTypescript className="hover:text-[#3178C6] transition-colors" />
                        <FaNodeJs className="hover:text-[#339933] transition-colors" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
