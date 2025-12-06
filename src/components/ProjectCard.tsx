import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    liveLink?: string;
    thumbnails?: string[];
    image?: string; // Fallback
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = project.thumbnails && project.thumbnails.length > 0 ? project.thumbnails : (project.image ? [project.image] : []);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <a
                href={`/projects/${project.id}`}
                className="flex flex-col h-full glass-panel p-5 rounded-2xl hover:border-[var(--gold)] transition-all duration-300 group hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] relative overflow-hidden"
            >
                {/* Image Area */}
                <div className="h-48 w-full bg-gray-800 rounded-xl mb-5 overflow-hidden relative">
                    {images.length > 0 ? (
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={images[currentImageIndex]}
                                alt={project.title}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                            <span className="text-4xl font-bold opacity-20">{project.title[0]}</span>
                        </div>
                    )}

                    {/* Slideshow Indicator */}
                    {images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                            {images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-4 bg-[var(--gold)]' : 'w-1 bg-white/50'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient-gold transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold-light)] text-xs rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto flex justify-end">
                    <span className="flex items-center gap-2 text-[var(--gold)] font-bold text-sm tracking-wide group-hover:translate-x-1 transition-transform">
                        View Details <FaArrowRight />
                    </span>
                </div>
            </a>
        </motion.div>
    );
}
