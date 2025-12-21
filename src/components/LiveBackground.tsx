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
        let animationFrameId: number;

        let mouse = { x: -1000, y: -1000 };

        // Configuration
        // Increased density for mobile as requested
        const particleCount = width < 768 ? 100 : 200;
        const particles: Particle[] = [];

        // Gold Palette - High Visibility Opaque
        const colors = [
            'rgba(212, 175, 55, 0.9)',   // Classic Gold
            'rgba(255, 233, 30, 0.9)',   // Bright Yellow Gold
            'rgba(218, 165, 32, 0.9)',   // Goldenrod
            'rgba(255, 215, 0, 0.9)',    // Pure Gold
        ];

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            angle: number;
            speed: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 3 + 1.5; // Slightly larger
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 0.5 + 0.2; // Slow float
            }

            update() {
                // Flow Field Logic (Simulated fluid)
                const scale = 0.002;
                const angle = (Math.cos(this.x * scale) + Math.sin(this.y * scale)) * Math.PI;

                this.vx += Math.cos(angle) * 0.02;
                this.vy += Math.sin(angle) * 0.02;

                // Limit speed
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > this.speed) {
                    this.vx = (this.vx / speed) * this.speed;
                    this.vy = (this.vy / speed) * this.speed;
                }

                // Interaction (Push/Float away)
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Increased interactive radius and force
                const interactRadius = width < 768 ? 150 : 250;

                if (dist < interactRadius) {
                    const force = (interactRadius - dist) / interactRadius;
                    const repulsionAngle = Math.atan2(dy, dx);
                    // Strong repulsion for high reactivity
                    this.vx += Math.cos(repulsionAngle) * force * 2.0;
                    this.vy += Math.sin(repulsionAngle) * force * 2.0;
                }

                this.x += this.vx;
                this.y += this.vy;

                // Wrap around
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

                // Strong Glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;

                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function init() {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            if (!ctx) return;
            // Trails
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slightly faster fade for clearer movement
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Connect nearby points
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    const connectDist = width < 768 ? 80 : 120; // Shorter connections on mobile to reduce clutter

                    if (dist < connectDist) {
                        ctx.beginPath();
                        // Much more visible lines
                        ctx.strokeStyle = `rgba(212, 175, 55, ${0.4 - dist / (connectDist * 2)})`;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        init();
        animate();

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

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchstart', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Deep Black base
    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" style={{ background: 'transparent' }} />;
}
