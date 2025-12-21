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
// Top Gallery Component - Shows items in a grid/slider
// Mobile Optimized: Horizontal Scroll Snap, No Auto-Slide to prevent glitches
// Top Gallery Component - Shows items in a grid/slider
// Mobile Optimized: Horizontal Scroll Snap, Uniform Aspect Ratio
// Top Gallery Component - Shows items in a grid/slider
// Mobile Optimized: Horizontal Scroll Snap, Uniform Aspect Ratio
function TopGallery({ items }: { items: string[] }) {
    if (!items || items.length === 0) return null;

    return (
        <section className="py-20 border-b border-white/5 bg-[#050507]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-white/10 flex-1" />
                    <h3 className="text-sm font-medium text-[var(--gold)] uppercase tracking-[0.2em]">Gallery Highlights</h3>
                    <div className="h-px bg-white/10 flex-1" />
                </div>

                {/* Responsive Gallery Container */}
                <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none pb-8 md:pb-0 no-scrollbar items-center">
                    {items.map((item, idx) => (
                        <div
                            key={`${item}-${idx}`}
                            className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 group bg-black w-full md:w-auto md:min-w-0 flex-shrink-0 snap-center"
                        >
                            <MediaItem src={item} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Reusing MediaGallery for inner sections
// Updated for Light Theme Compatibility (Dark borders)
function SectionMediaGallery({ images, style }: { images?: string[], style?: 'slider' | 'grid' }) {
    if (!images || images.length === 0) return null;

    // Grid implementation
    if (style === 'grid' || images.length <= 1) {
        return (
            <div className={`my-12 grid grid-cols-1 ${images.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                {images.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-black/10 shadow-lg group relative aspect-video bg-black">
                        <MediaItem src={img} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
                    </div>
                ))}
            </div>
        )
    }

    // Basic Slider for sections
    return (
        <div className="my-12 flex gap-6 overflow-x-auto snap-x pb-6 no-scrollbar">
            {images.map((img, idx) => (
                <div key={idx} className="w-full md:min-w-[45%] md:w-auto rounded-xl overflow-hidden border border-black/10 snap-center shrink-0 shadow-lg aspect-video bg-black">
                    <MediaItem src={img} className="w-full h-full object-contain" />
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
        const fetchProject = async () => {
            try {
                // 1. Try fetching individual file (New System)
                const res = await fetch(`/data/projects/${id}.json`);
                if (res.ok) {
                    const data = await res.json();
                    setProject(data);
                    setLoading(false);
                    return;
                }

                // 2024-12-21 Fallback: Check legacy projects.json for backward compatibility (e.g. id "1", "2")
                console.warn(`Project file /data/projects/${id}.json not found. Trying legacy fallback.`);
                const legacyRes = await fetch('/data/projects.json');
                if (legacyRes.ok) {
                    const legacyData: Project[] = await legacyRes.json();
                    const found = legacyData.find(p => p.id === id);
                    if (found) {
                        setProject(found);
                        setLoading(false);
                        return;
                    }
                }
                throw new Error(`Project '${id}' not found. Checked: /data/projects/${id}.json and legacy /data/projects.json`);

            } catch (err: any) {
                console.error("Failed to load project:", err);
                setProject(null);
                setLoading(false);
                // Allow UI to show error if needed, but for now just logging.
                // We'll update the render to show the ID that failed.
            }
        };

        if (id) fetchProject();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#050507] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Matrix / Cyberpunk Loading Effect */}
            <div className="flex flex-col items-center gap-8 z-10">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-4 border-t-[var(--gold)] border-r-[var(--gold)]/30 border-b-[var(--gold)]/10 border-l-[var(--gold)]/60 rounded-full"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-[var(--gold)] font-mono text-sm tracking-[0.3em] uppercase"
                >
                    Extracting Project Data...
                </motion.div>
                <div className="flex gap-1 h-1">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ scaleY: [1, 2.5, 1], backgroundColor: ["#333", "#d4af37", "#333"] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                            className="w-1 h-full bg-gray-800"
                        />
                    ))}
                </div>
            </div>

            {/* Background Data Stream Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)] blur-[120px]" />
            </div>
        </div>
    );
    if (!project) return (
        <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white gap-4">
            <h2 className="text-3xl font-bold">Project Not Found</h2>
            <p className="text-gray-400">Could not load project ID: <span className="text-[var(--gold)] font-mono">{String(id)}</span></p>
            <a href="/projects" className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">Back to Archive</a>
        </div>
    );

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
            {/* White Marble Theme Transformation */}
            <section className="relative z-10 py-32 px-4 md:px-0 bg-[#f8f9fa] text-black">
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-diamond.png")', backgroundSize: '200px' }}></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Render standard sections */}
                    {project.sections?.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="mb-32 last:mb-0 border-l-4 border-black/10 pl-6 md:pl-12 relative"
                        >
                            {/* Decorative line dot */}
                            <div className="absolute left-[-2px] top-0 w-4 h-4 rounded-full bg-black -translate-x-[6px] border-4 border-white" />

                            {section.title && (
                                <h2 className="text-5xl md:text-7xl font-bold text-black mb-10 font-[family-name:var(--font-patrick)]">
                                    {section.title}
                                </h2>
                            )}

                            {/* Markdown Content - High Contrast Light Mode */}
                            <div className="font-[family-name:var(--font-patrick)] text-[#1a1a1a] text-2xl leading-loose">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        // Force Override for Tables - Responsive Wrapper
                                        table: ({ node, ...props }) => (
                                            <div className="w-full overflow-x-auto my-8 rounded-lg border border-gray-200 shadow-sm">
                                                <table className="w-full text-left border-collapse bg-white min-w-[600px] font-sans text-base" {...props} />
                                            </div>
                                        ),
                                        thead: ({ node, ...props }) => <thead className="bg-[#f8f9fa] border-b-2 border-gray-300" {...props} />,
                                        tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-200" {...props} />,
                                        tr: ({ node, ...props }) => <tr className="hover:bg-gray-50 transition-colors" {...props} />,
                                        th: ({ node, ...props }) => <th className="px-6 py-4 font-black uppercase text-sm tracking-wider text-black border-r border-gray-200 last:border-r-0" {...props} />,
                                        td: ({ node, ...props }) => <td className="px-6 py-4 text-gray-700 border-r border-gray-200 last:border-r-0 font-medium" {...props} />,

                                        // Typography Overrides
                                        h1: ({ node, ...props }) => <h1 className="text-5xl md:text-6xl font-bold mb-8 mt-14 text-black" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-4xl md:text-4xl font-bold mb-6 mt-12 text-black border-b-2 border-black/10 pb-2 inline-block" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-3xl font-bold mb-5 mt-10 text-black" {...props} />,
                                        p: ({ node, ...props }) => <p className="mb-6" {...props} />,
                                        a: ({ node, ...props }) => <a className="text-[#d4af37] font-bold underline decoration-[#d4af37]/30 hover:bg-[#d4af37]/10 transition-colors rounded px-1 -mx-1" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 marker:text-[#d4af37]" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
                                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-[#d4af37] bg-white/50 p-6 my-8 rounded-r-xl text-3xl text-gray-800" {...props} />,
                                    }}
                                >
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
                                            className="px-8 py-3 bg-black text-white rounded-full hover:bg-[#333] transition-all shadow-lg hover:shadow-xl text-sm font-bold flex items-center gap-3 group transform hover:-translate-y-1"
                                        >
                                            {link.label} <FaExternalLinkAlt className="text-xs group-hover:scale-110 transition-transform text-[#d4af37]" />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}

                    <div className="mt-32 pt-16 border-t border-black/10 text-center">
                        <a href="/projects" className="inline-flex items-center gap-3 text-gray-500 hover:text-black transition-colors text-lg font-bold group">
                            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Gallery
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
