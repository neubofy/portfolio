'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { motion } from 'framer-motion';

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];

    link: string;
    thumbnail?: string;
    heroImage?: string;
    content?: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const masterRes = await fetch('/data/projects_master.json');
                const fileNames: string[] = await masterRes.json();

                const projectPromises = fileNames.map(async (fileName) => {
                    try {
                        const res = await fetch(`/data/projects/${fileName}.json`);
                        if (!res.ok) return null;
                        const data = await res.json();
                        return { ...data, id: fileName };
                    } catch { return null; }
                });

                const loadedProjects = (await Promise.all(projectPromises)).filter((p): p is Project => p !== null);
                setProjects(loadedProjects);
            } catch (err) {
                console.error("Failed to load projects:", err);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    return (
        <main className="min-h-screen bg-[#050507] text-white">
            <Navbar />

            <section className="pt-32 pb-12 px-4 md:px-20 max-w-7xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-bold mb-6"
                >
                    My <span className="text-gradient-gold">Archive</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 max-w-2xl mx-auto text-lg"
                >
                    Explore the complete collection of my AI experiments, web applications, and digital architectures.
                </motion.p>
            </section>

            <section className="pb-20 px-4 md:px-20 max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--gold)]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                )}
            </section>

            <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
                © {new Date().getFullYear()} Sohan Kumar. All rights reserved.
            </footer>
        </main>
    );
}
