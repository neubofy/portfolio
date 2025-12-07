import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    liveLink?: string;
    thumbnail?: string;
    gallery?: string[];
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    // Strictly use the thumbnail for the card view
    const image = project.thumbnail || "";

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
                {/* Image Area - Single Thumbnail Only, No Cropping */}
                <div className="w-full h-auto bg-gray-800 rounded-xl mb-5 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                    {image ? (
                        <img
                            src={image}
                            alt={project.title}
                            className="w-full h-auto object-contain"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                            <span className="text-4xl font-bold opacity-20">{project.title[0]}</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
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
