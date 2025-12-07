'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    liveLink?: string;
    thumbnail?: string;
    heroImage?: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    // Parallax effect for the card image
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Create a "floating in river" parallax feel
    // Odd items float one way, even items another, or just subtle different speeds
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    const img = project.thumbnail || "";

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity }}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-6xl mx-auto mb-32 last:mb-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Image Section - Floating Animation */}
            <motion.div
                style={{ y }}
                className="w-full md:w-3/5 aspect-video relative rounded-3xl overflow-hidden group shadow-2xl border border-white/10"
            >
                {img ? (
                    <img
                        src={img}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-black" />
                )}

                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                {/* Floating ID Tag */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-mono text-[var(--gold)]">
                    PROJECT_0{index + 1}
                </div>
            </motion.div>

            {/* Content Section */}
            <div className="w-full md:w-2/5 md:py-10 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                        {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-[var(--gold)] border border-[var(--gold)]/20 rounded-full bg-[var(--gold)]/5">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {project.title}
                    </h3>

                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        {project.description}
                    </p>

                    <div className="flex justify-center md:justify-start items-center gap-6">
                        <a href={`/projects/${project.id}`} className="group flex items-center gap-3 text-white font-bold text-lg border-b-2 border-[var(--gold)] pb-1 hover:text-[var(--gold)] transition-colors">
                            View Case Study <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2">
                                <FaExternalLinkAlt /> Live
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default function ProjectShowcase() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/data/projects.json')
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <section id="projects" className="relative py-32 bg-transparent overflow-hidden">
            {/* Background elements for 'river' feel */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--gold)]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[30vw] h-[30vw] bg-purple-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black text-white mb-6"
                    >
                        Selected <span className="text-gradient-gold">Works</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A curated selection of projects that define our digital craftsmanship.
                    </p>
                </div>

                {/* Vertical List "Floating in River" */}
                <div className="flex flex-col">
                    {projects.slice(0, 3).map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 text-center">
                    <a
                        href="/projects"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-[var(--gold)]/10 hover:border-[var(--gold)]/50 transition-all duration-300"
                    >
                        <span className="text-white font-medium tracking-wide group-hover:text-[var(--gold)] transition-colors">
                            Explore All Projects
                        </span>
                        <FaArrowRight className="text-white/50 group-hover:text-[var(--gold)] transition-colors" />
                    </a>
                </div>
            </div>
        </section>
    );
}
