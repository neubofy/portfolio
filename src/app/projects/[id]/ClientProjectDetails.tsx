'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProjectSection {
    title?: string;
    content: string;
    images?: string[];
    imageStyle?: 'slider' | 'grid';
}

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    liveLink?: string;
    thumbnails?: string[];
    image?: string;
    sections?: ProjectSection[];
    content?: string;
}

function ImageCarousel({ images }: { images: string[] }) {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % images.length);
    const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

    if (images.length === 0) return null;

    return (
        <div className="my-8 relative group rounded-xl overflow-hidden border border-[var(--gold)]/20 bg-black/50 aspect-video">
            <AnimatePresence mode="wait">
                <motion.img
                    key={current}
                    src={images[current]}
                    alt={`Slide ${current}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                />
            </AnimatePresence>

            {images.length > 1 && (
                <>
                    <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-[var(--gold)] hover:text-black transition-all opacity-0 group-hover:opacity-100">
                        <FaChevronLeft />
                    </button>
                    <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-[var(--gold)] hover:text-black transition-all opacity-0 group-hover:opacity-100">
                        <FaChevronRight />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`h-2 w-2 rounded-full transition-all ${current === idx ? 'bg-[var(--gold)] w-4' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function ClientProjectDetails({ id }: { id: string }) {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/projects.json')
            .then((res) => res.json())
            .then((data: Project[]) => {
                const found = data.find((p) => p.id === id);
                setProject(found || null);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load project:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--gold)]"></div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">Project Not Found</h1>
            </div>
        )
    }

    const headerImage = (project.thumbnails && project.thumbnails[0]) || project.image;

    return (
        <main className="min-h-screen bg-[#030303] text-white">
            <Navbar />

            {/* Header Image */}
            <section className="h-[50vh] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[var(--gold)]/5 z-0" />
                {headerImage && (
                    <div className="absolute inset-0 opacity-50 bg-black">
                        <img src={headerImage} alt={project.title} className="w-full h-full object-cover opacity-60 blur-sm" />
                    </div>
                )}
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-4"
                    >
                        {project.title}
                    </motion.h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-1 bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold-light)] text-sm rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 px-4 md:px-20 max-w-4xl mx-auto">
                {project.sections ? (
                    project.sections.map((section, idx) => (
                        <div key={idx} className="mb-16">
                            {section.title && <h2 className="text-3xl font-bold text-gray-200 mb-6 border-b border-[var(--gold)]/20 pb-2">{section.title}</h2>}

                            <article className="prose prose-invert prose-lg prose-headings:text-[var(--gold)] prose-a:text-[var(--gold-light)] prose-strong:text-white marker:text-[var(--gold)] max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                                    p: ({ node, ...props }) => <div className="text-gray-300 leading-relaxed mb-6" {...props} />,
                                }}>
                                    {section.content}
                                </ReactMarkdown>
                            </article>

                            {section.images && section.images.length > 0 && (
                                <ImageCarousel images={section.images} />
                            )}
                        </div>
                    ))
                ) : (
                    <article className="prose prose-invert prose-lg prose-headings:text-[var(--gold)] prose-a:text-[var(--gold-light)] prose-strong:text-white marker:text-[var(--gold)] max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                            p: ({ node, ...props }) => <div className="text-gray-300 leading-relaxed mb-6" {...props} />,
                        }}>
                            {project.content || project.description}
                        </ReactMarkdown>
                    </article>
                )}

                <div className="mt-12 pt-12 border-t border-white/10 flex justify-between items-center">
                    <a href="/" className="text-gray-400 hover:text-white transition-colors">← Back to Home</a>
                    {project.liveLink && project.liveLink !== "#" && (
                        <a href={project.liveLink} target="_blank" className="bg-[var(--gold)] text-black px-8 py-3 rounded-full font-bold hover:bg-[var(--gold-light)] transition-colors">
                            Visit Live Site
                        </a>
                    )}
                </div>
            </section>
        </main>
    );
}
