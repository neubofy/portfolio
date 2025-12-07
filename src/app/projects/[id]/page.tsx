'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from "@/components/Navbar";
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectSection {
    title?: string;
    content: string;
    images?: string[];
    imageStyle?: 'slider' | 'grid';
    links?: { label: string; url: string; }[];
}

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    liveLink?: string;
    thumbnail?: string;
    heroImage?: string;
    gallery?: string[];
    // Backwards compatibility
    thumbnails?: string[];
    image?: string;
    sections?: ProjectSection[];
    content?: string;
}

// Helper to check for video extensions
const isVideo = (url: string) => {
    return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
};

function MediaItem({ src, className, autoPlay = true }: { src: string; className?: string; autoPlay?: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (autoPlay && videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, [autoPlay]);

    if (isVideo(src)) {
        return (
            <div className={`relative ${className} bg-black`}>
                <video
                    ref={videoRef}
                    src={src}
                    className="w-full h-full object-cover"
                    controls={false}
                    muted
                    loop
                    playsInline
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                <div className="absolute top-2 right-2 text-white/50 text-xs bg-black/50 px-2 py-1 rounded">Video</div>
            </div>
        );
    }
    return <img src={src} alt="Media content" className={className} />;
}

// Top Gallery Component - Shows 3 items, slides if more
// Mobile Optimized: Horizontal Scroll Snap
function TopGallery({ items }: { items: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCount = 3;
    const shouldSlide = items.length > 1;

    useEffect(() => {
        if (!shouldSlide) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [shouldSlide, items.length]);

    if (!items || items.length === 0) return null;

    // Create a circular array for infinite feel when mapping
    const displayItems = shouldSlide
        ? [...items, ...items, ...items].slice(currentIndex, currentIndex + visibleCount)
        : items;

    return (
        <section className="py-20 border-b border-white/5 bg-[#050507]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-white/10 flex-1" />
                    <h3 className="text-sm font-medium text-[var(--gold)] uppercase tracking-[0.2em]">Gallery Highlights</h3>
                    <div className="h-px bg-white/10 flex-1" />
                </div>

                {/* Responsive Gallery Container: Mobile Slider / Desktop Grid */}
                {/* Mobile: overflow-x-auto with snap-x. Desktop: grid */}
                <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none pb-8 md:pb-0 no-scrollbar touch-pan-x min-h-[40vh] items-center">
                    <AnimatePresence mode="popLayout">
                        {displayItems.map((item, idx) => (
                            <motion.div
                                key={`${item}-${idx}-${currentIndex}`}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 group bg-[#0a0a0a] min-w-[85vw] md:min-w-0 flex-shrink-0 snap-center"
                            >
                                <MediaItem src={item} className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

// Reusing MediaGallery for inner sections if needed
function SectionMediaGallery({ images, style }: { images?: string[], style?: 'slider' | 'grid' }) {
    if (!images || images.length === 0) return null;

    // Grid implementation for sections - Responsive
    if (style === 'grid' || images.length <= 1) {
        return (
            <div className={`my-12 grid grid-cols-1 ${images.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                {images.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-white/10 shadow-lg group relative">
                        <MediaItem src={img} className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                    </div>
                ))}
            </div>
        )
    }

    // Basic Slider for sections
    return (
        <div className="my-12 flex gap-6 overflow-x-auto snap-x pb-6 no-scrollbar">
            {images.map((img, idx) => (
                <div key={idx} className="min-w-[85%] md:min-w-[45%] rounded-xl overflow-hidden border border-white/10 snap-center shrink-0 shadow-lg">
                    <MediaItem src={img} className="w-full h-auto object-contain" />
                </div>
            ))}
        </div>
    )
}

export default function ProjectDetails() {
    const { id } = useParams();
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

    if (loading) return <div className="min-h-screen bg-[#030303] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[var(--gold)]"></div></div>;
    if (!project) return <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">Project Not Found</div>;

    // Support new and old fields
    const bgImage = project.heroImage || project.image || (project.thumbnails ? project.thumbnails[0] : "") || "";
    const galleryItems = project.gallery || project.thumbnails || [];

    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-[var(--gold)]/30 font-sans">
            <Navbar />

            {/* 1. HERO HEADER - Immersive Center Overlay */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    {bgImage && (
                        <motion.div
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            className="w-full h-full"
                        >
                            <img src={bgImage} className="w-full h-full object-cover blur-[2px]" alt="" />
                            <div className="absolute inset-0 bg-black/40" />
                        </motion.div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-black/80" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-4 py-2 text-xs font-bold border border-[var(--gold)]/40 text-[var(--gold)] bg-black/50 backdrop-blur-md rounded-full uppercase tracking-widest font-mono shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9] drop-shadow-2xl">
                            {project.title.toUpperCase()}
                        </h1>

                        <p className="text-xl md:text-3xl text-gray-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow-lg">
                            {project.description}
                        </p>

                        {project.liveLink && (
                            <motion.a
                                href={project.liveLink}
                                target="_blank"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--gold)] text-black font-extrabold text-lg rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] hover:bg-[#ffe16b] transition-all"
                            >
                                Visit Live Project <FaExternalLinkAlt />
                            </motion.a>
                        )}
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                    <div className="w-1 h-12 rounded-full bg-gradient-to-b from-[var(--gold)] to-transparent" />
                </motion.div>
            </section>

            {/* 2. TOP PHOTOS GALLERY */}
            {galleryItems && galleryItems.length > 0 && (
                <TopGallery items={galleryItems} />
            )}

            {/* 3. ABOUT / SECTIONS (Super Power Markdown) */}
            <section className="relative z-10 py-32 px-4 md:px-0 bg-[#030303]">
                <div className="max-w-4xl mx-auto">
                    {/* Render standard sections */}
                    {project.sections?.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="mb-32 last:mb-0 border-l border-white/10 pl-8 md:pl-12 relative"
                        >
                            {/* Decorative line dot */}
                            <div className="absolute left-[-1px] top-0 w-2 h-2 rounded-full bg-[var(--gold)] -translate-x-[3px]" />

                            {section.title && (
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight">
                                    {section.title}
                                </h2>
                            )}

                            {/* Markdown Content - The "Super Power" Part */}
                            <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
                                prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                                prose-h1:text-5xl prose-h2:text-3xl prose-h3:text-2xl
                                prose-p:text-gray-400 prose-p:leading-relaxed
                                prose-a:text-[var(--gold)] prose-a:underline prose-a:decoration-[var(--gold)]/30 prose-a:underline-offset-4 hover:prose-a:decoration-[var(--gold)]
                                prose-strong:text-white prose-strong:font-black
                                prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-400 prose-li:marker:text-[var(--gold)]
                                prose-blockquote:border-l-[var(--gold)] prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
                            ">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {section.content}
                                </ReactMarkdown>
                            </div>

                            {/* Section Specific Media */}
                            <SectionMediaGallery images={section.images} style={section.imageStyle} />

                            {/* Links for this section */}
                            {section.links && section.links.length > 0 && (
                                <div className="flex flex-wrap gap-4 mt-8">
                                    {section.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            className="px-6 py-3 border border-white/10 bg-white/5 text-white rounded-lg hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all text-sm font-semibold flex items-center gap-3 group"
                                        >
                                            {link.label} <FaExternalLinkAlt className="text-xs group-hover:scale-110 transition-transform" />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}

                    <div className="mt-32 pt-16 border-t border-white/10">
                        <a href="/projects" className="inline-flex items-center gap-3 text-gray-500 hover:text-[var(--gold)] transition-colors text-lg font-medium group">
                            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Gallery
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
