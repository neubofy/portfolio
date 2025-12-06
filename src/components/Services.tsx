'use client';

import { motion } from 'framer-motion';
import { FaCode, FaRobot, FaLayerGroup, FaArrowRight } from 'react-icons/fa';

const capabilities = [
    {
        icon: <FaRobot />,
        title: "AI & Automation",
        description: "I build intelligent agents that work while you sleep.",
        details: ["Custom LLM Agents", "RAG Pipelines", "Workflow Automation", "Fine-Tuning Models"],
        highlight: "border-[var(--gold)]/20"
    },
    {
        icon: <FaCode />,
        title: "Full Stack Engineering",
        description: "Scalable, high-performance web architectures.",
        details: ["Next.js 14 / React", "Scalable APIs", "Database Design", "Real-time Systems"],
        highlight: "border-blue-500/20"
    },
    {
        icon: <FaLayerGroup />,
        title: "Digital Product Design",
        description: "Interfaces that feel like magic, not just software.",
        details: ["Glassmorphism", "Micro-Interactions", "Framer Motion", "3D Web Elements"],
        highlight: "border-purple-500/20"
    }
];

export default function Services() {
    return (
        <section className="py-32 px-4 max-w-7xl mx-auto relative">
            <div className="mb-20">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Engineering <span className="text-gradient-gold">Reality</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl">
                    I don't just offer services; I provide **architectural solutions** to complex problems.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {capabilities.map((cap, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`glass-panel p-10 rounded-3xl group transition-all duration-500 hover:-translate-y-2 border-t ${cap.highlight} hover:border-[var(--gold)]`}
                    >
                        {/* Icon Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl text-[var(--gold)] group-hover:scale-110 group-hover:bg-[var(--gold)] group-hover:text-black transition-all duration-300">
                                {cap.icon}
                            </div>
                            <span className="text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                                0{index + 1}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4">{cap.title}</h3>
                        <p className="text-gray-400 mb-8 min-h-[3rem]">{cap.description}</p>

                        {/* List */}
                        <ul className="space-y-3 mb-8 border-t border-white/5 pt-8">
                            {cap.details.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-2 text-[var(--gold)] font-bold text-sm tracking-wide group-hover:gap-4 transition-all cursor-pointer">
                            Learn More <FaArrowRight />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
