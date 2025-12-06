'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import ProjectCard from '../ProjectCard';

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    image?: string;
    thumbnails?: string[];
}

export default function ProjectSlider() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('/data/projects.json')
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error("Failed to load projects:", err));
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    if (projects.length === 0) return null;

    // We want to show 1 big active card, but maybe hint at prev/next?
    // User asked for a basket where we can slide. 
    // Let's implement a standard carousel with a very premium feel.

    // Calculate distinct indices for a 3-card view logic if needed, but for smooth mobile/desktop 
    // a simple slider is best.

    return (
        <div className="relative w-full max-w-6xl mx-auto px-4">
            {/* Navigation - Absolute Center Y */}
            <button
                onClick={prevSlide}
                className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[var(--gold)]/20 bg-black/50 text-[var(--gold)] flex items-center justify-center hover:bg-[var(--gold)] hover:text-black transition-all z-20 backdrop-blur-md"
            >
                <FaArrowLeft />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[var(--gold)]/20 bg-black/50 text-[var(--gold)] flex items-center justify-center hover:bg-[var(--gold)] hover:text-black transition-all z-20 backdrop-blur-md"
            >
                <FaArrowRight />
            </button>

            {/* Slider Window */}
            <div className="overflow-hidden py-10"> {/* Padding for shadow/hover scaling */}
                <motion.div
                    className="flex"
                    animate={{ x: `-${currentIndex * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {projects.map((project, idx) => (
                        <div key={project.id} className="min-w-full md:min-w-[50%] lg:min-w-[33.33%] px-4">
                            <ProjectCard project={project} index={idx} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* View All Button - Centered Below */}
            <div className="text-center mt-12">
                <a href="/projects" className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--gold)] text-black font-bold rounded-full hover:bg-[var(--gold-light)] transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] transform hover:-translate-y-1">
                    View All Projects <FaArrowRight />
                </a>
            </div>
        </div>
    );
}
