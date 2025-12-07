'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    liveLink?: string;
    thumbnails?: string[];
    image?: string;
}

const ProjectPanel = ({ project }: { project: Project }) => {
    const img = (project.thumbnails && project.thumbnails[0]) || project.image || "";

    return (
        <div className="relative h-[400px] w-[350px] md:h-[500px] md:w-[700px] flex-shrink-0 group overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 transition-all duration-500 hover:border-[var(--gold)]/30">
            {/* Background Image with Darkening */}
            <div className="absolute inset-0">
                {img ? (
                    <img
                        src={img}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-50"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-black" />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-[var(--gold)] border border-[var(--gold)]/20 rounded-full bg-black/50 backdrop-blur-md">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                        {project.title}
                    </h3>

                    <p className="text-gray-400 max-w-lg mb-6 line-clamp-2 md:line-clamp-none opacity-80 group-hover:opacity-100 transition-opacity">
                        {project.description}
                    </p>

                    <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        <a href={`/projects/${project.id}`} className="group/btn flex items-center gap-2 text-white font-bold border-b border-[var(--gold)] pb-1">
                            Explore Case Study
                            <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform text-[var(--gold)]" />
                        </a>
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                                <FaExternalLinkAlt /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Hover number */}
            <div className="absolute top-8 right-8 text-8xl font-black text-white/5 pointer-events-none select-none group-hover:text-[var(--gold)]/10 transition-colors duration-500">
                {project.id}
            </div>
        </div>
    );
};

export default function ProjectShowcase() {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/data/projects.json')
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error(err));
    }, []);

    // Transform scroll progress to horizontal movement
    // Transform scroll progress to horizontal movement
    // Increased range to ensure all 3 items are viewed
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

    return (
        <section id="projects" ref={targetRef} className="relative h-[150vh] bg-[#050507]">
            {/* Sticky Container with Constrained Width */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden max-w-7xl mx-auto border-x border-white/5 bg-[#050507]">

                {/* Title Section (Static) */}
                <div className="absolute top-10 left-4 md:left-20 z-10 p-4">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-2">
                        Selected <span className="text-gradient-gold">Works</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md">
                        A curated top 3 collection.
                    </p>
                </div>

                {/* Horizontal Scrolling Track */}
                <motion.div style={{ x }} className="flex gap-8 md:gap-16 pl-[5vw]">
                    {/* Spacer for title */}
                    <div className="w-[80vw] md:w-[35vw] flex-shrink-0" />

                    {projects.slice(0, 3).map((project) => (
                        <ProjectPanel key={project.id} project={project} />
                    ))}
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    style={{ scaleX: scrollYProgress }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--gold)] origin-left"
                />
            </div>
        </section>
    );
}
