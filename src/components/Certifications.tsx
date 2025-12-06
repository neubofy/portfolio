'use client';

import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaStar, FaCertificate, FaDownload } from 'react-icons/fa';
import Image from 'next/image';

const achievements = [
    {
        title: "Global AI Hackathon Winner",
        year: "2024",
        org: "TechCrunch Disrupt",
        icon: <FaTrophy className="text-yellow-400" />,
        description: "Built 'NeuralOne', a self-correcting LLM agent."
    },
    {
        title: "Top 1% Developer",
        year: "2023",
        org: "Upwork Global",
        icon: <FaStar className="text-[var(--gold)]" />,
        description: "Rated 'Expert-Vetted' for Full Stack Architecture."
    },
    {
        title: "Open Source Hero",
        year: "2022-2024",
        org: "GitHub",
        icon: <FaMedal className="text-blue-400" />,
        description: "Contributed to core React & Next.js libraries."
    }
];

const certifications = [
    {
        title: "Certified AI Architect",
        issuer: "Google Cloud",
        date: "Dec 2023",
        image: "/images/certificates/ai-architect.png"
    },
    {
        title: "Advanced Machine Learning",
        issuer: "Stanford Online",
        date: "Aug 2023",
        image: "/images/certificates/ai-architect.png" // Reusing placeholder
    },
    {
        title: "Solutions Architect Professional",
        issuer: "AWS",
        date: "June 2023",
        image: "/images/certificates/ai-architect.png" // Reusing placeholder
    }
];

export default function Certifications() {
    return (
        <section className="py-32 px-4 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Proof of <span className="text-gradient-gold">Mastery</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Recognition is just a byproduct of obsession. Here are the milestones of my journey.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* 1. Achievements Column */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <FaTrophy className="text-[var(--gold)]" /> Major Achievements
                    </h3>
                    <div className="space-y-6">
                        {achievements.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:border-[var(--gold)]/50 transition-colors group"
                            >
                                <div className="p-3 bg-white/5 rounded-xl text-2xl group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white group-hover:text-[var(--gold)] transition-colors">{item.title}</h4>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 my-1 font-mono uppercase tracking-wide">
                                        <span>{item.org}</span>
                                        <span className="w-1 h-1 bg-gray-500 rounded-full" />
                                        <span>{item.year}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2. Certifications Column */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <FaCertificate className="text-[var(--gold)]" /> Verified Certifications
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                        {certifications.map((cert, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="glass-panel p-4 rounded-2xl group relative overflow-hidden"
                            >
                                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 border border-white/5">
                                    <Image
                                        src={cert.image}
                                        alt={cert.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button className="px-6 py-2 bg-[var(--gold)] text-black font-bold rounded-full text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            <FaDownload /> View Credential
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h4 className="text-lg font-bold text-white">{cert.title}</h4>
                                        <p className="text-sm text-[var(--gold)]">{cert.issuer}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono">{cert.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
