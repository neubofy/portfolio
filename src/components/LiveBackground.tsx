'use client';

import { useEffect, useRef } from 'react';

export default function LiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let particles: Particle[] = [];
        let blobs: Blob[] = [];
        let animationFrameId: number;
        let mouse = { x: -1000, y: -1000 };

        // Liquid Mercury & Titanium Silver Palette
        const desktopColors = ['#E2E8F0', '#CBD5E1', '#94A3B8', '#C5A059', '#64748B', '#F1F5F9'];
        const mobileColors = ['#E2E8F0', '#1c1c1e', '#94A3B8'];

        const isMobile = width < 768;

        // Background Gradient Blobs
        class Blob {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor(color: string) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6); // Liquid movement
                this.vy = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6);
                this.size = isMobile ? Math.random() * 200 + 150 : Math.random() * 400 + 300; // Massive fluid shapes
                this.color = color;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < -250 || this.x > width + 250) this.vx *= -1;
                if (this.y < -250 || this.y > height + 250) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                // Ultra-soft blending for liquid effect
                const opacity = isMobile ? '10' : '20';
                gradient.addColorStop(0, this.color + opacity);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Particles (Metallic Flakes/Stars)
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseAlpha: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * (isMobile ? 0.1 : 0.3);
                this.vy = (Math.random() - 0.5) * (isMobile ? 0.1 : 0.3);
                this.size = Math.random() * 2 + 0.5;
                this.baseAlpha = Math.random() * 0.5 + 0.3; // Brighter flakes
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction only on desktop
                if (!isMobile) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        const angle = Math.atan2(dy, dx);
                        const force = (150 - distance) / 150;
                        this.vx += Math.cos(angle) * force * 0.02;
                        this.vy += Math.sin(angle) * force * 0.02;
                    }
                }

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Silver/White Metallic Sparkle
                ctx.fillStyle = `rgba(255, 255, 255, ${this.baseAlpha})`;
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            blobs = [];

            const particleCount = isMobile ? 40 : 100; // Dense metallic dust

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

            const colorsToUse = isMobile ? mobileColors : desktopColors;
            const blobCount = isMobile ? 4 : 8; // More overlaps for fluid feeling

            for (let i = 0; i < blobCount; i++) {
                blobs.push(new Blob(colorsToUse[i % colorsToUse.length]));
            }
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            blobs.forEach(blob => {
                blob.update();
                blob.draw();
            });

            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

                // Draw connections ONLY on Desktop. Mobile gets clean stars.
                if (!isMobile) {
                    for (let j = index + 1; j < particles.length; j++) {
                        const dx = particles[index].x - particles[j].x;
                        const dy = particles[index].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 150) {
                            ctx.beginPath();
                            ctx.lineWidth = 0.5;
                            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1500})`;
                            ctx.moveTo(particles[index].x, particles[index].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        init();
        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Force re-init to switch modes if crossing breakpoint
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" style={{ background: '#1c1c1e' }} />;
}
