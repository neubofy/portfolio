'use client';

import { motion } from 'framer-motion';

const steps = [
    {
        num: "01",
        title: "Discovery",
        desc: "Decoding the vision. I dive deep into the core problem to identify where AI can truly amplify human potential.",
        color: "border-blue-400"
    },
    {
        num: "02",
        title: "Blueprint",
        desc: "Architecting the neural mesh. I design scalable, fault-tolerant systems where code and models coexist seamlessly.",
        color: "border-[var(--gold)]"
    },
    {
        num: "03",
        title: "Neural Integration",
        desc: "The 'Vibe' Phase. Fusing LLMs, RAG pipelines, and logic into a cohesive digital organism.",
        color: "border-purple-400"
    },
    {
        num: "04",
        title: "Deployment",
        desc: "Launching into reality. Optimized, secure, and ready to scale from user one to one million.",
        color: "border-green-400"
    }
];

export default function Process() {
    return (
        <section className="py-24 px-4 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">
                The <span className="text-gradient-gold">Vibe Architecture</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`glass-panel p-8 rounded-3xl relative border-t-4 ${step.color} hover:-translate-y-2 transition-transform duration-300 group`}
                    >
                        <span className="absolute top-2 right-4 text-7xl font-bold text-white/5 group-hover:text-white/10 transition-colors pointer-events-none font-sans">
                            {step.num}
                        </span>
                        <div className="pt-4">
                            <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {step.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
