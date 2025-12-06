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

        let mouse = { x: -1000, y: -1000 };

        const colors = ['#C5A059', '#22d3ee', '#8b5cf6', '#f43f5e', '#10b981', '#fbbf24']; // Gold, Cyan, Violet, Rose, Emerald, Amber

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
                this.vx = (Math.random() - 0.5) * 0.4; // Slower, smoother movement
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 300 + 200; // Large fluid spots
                this.color = color;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < -150 || this.x > width + 150) this.vx *= -1;
                if (this.y < -150 || this.y > height + 150) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, this.color + '44'); // Vibrant but transparent
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const blobs = colors.map(c => new Blob(c));

        // Tech Particles
        const particles: Particle[] = [];
        const particleCount = window.innerWidth < 768 ? 45 : 90; // Increased density

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                this.size = Math.random() * 3 + 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 250;

                if (distance < maxDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (maxDistance - distance) / maxDistance;
                    this.vx -= forceDirectionX * force * 0.6;
                    this.vy -= forceDirectionY * force * 0.6;
                }

                this.vx *= 0.98;
                this.vy *= 0.98;
                this.x += this.vx + ((Math.random() - 0.5) * 0.1);
                this.y += this.vy + ((Math.random() - 0.5) * 0.1);

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            blobs.forEach(blob => {
                blob.update();
                blob.draw();
            });

            particles.forEach((p, index) => {
                p.update();
                p.draw();

                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 180) { // Longer connections
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(197, 160, 89, ${0.2 - distance / 1000})`; // More visible Gold lines
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                const mdx = mouse.x - p.x;
                const mdy = mouse.y - p.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 250) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(197, 160, 89, ${0.4 - mDist / 1000})`; // Very strong mouse connection
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();

                    // Draw a small dot at mouse connection point on the particle
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = '#C5A059';
                    ctx.fill();
                }
            });

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        };

        const handleTouchEnd = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        init();
        animate();

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at center, #0a0a0a, #000000)' }}
        />
    );
}
