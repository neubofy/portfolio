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
        const particleCount = width < 768 ? 60 : 150;
        const particles: Particle[] = [];

        // Gold Palette
        const colors = [
            'rgba(212, 175, 55, 0.6)',   // Classic Gold
            'rgba(255, 223, 0, 0.6)',    // Bright Gold
            'rgba(184, 134, 11, 0.6)',   // Dark Gold
            'rgba(205, 127, 50, 0.5)',   // Bronze
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
                this.size = Math.random() * 3 + 1; // Varying size
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 0.5 + 0.2; // Slow float
            }

            update() {
                // Flow Field Logic (Simulated fluid)
                // Use position to determine angle (Pseudo-perlin)
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

                // Mouse Interaction (Push/Float away)
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    const repulsionAngle = Math.atan2(dy, dx);
                    this.vx += Math.cos(repulsionAngle) * force * 0.5;
                    this.vy += Math.sin(repulsionAngle) * force * 0.5;
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

                // Glow effect for "Floating"
                ctx.shadowBlur = 10;
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
            // Trails for fluid effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Very long trails -> Fluid sheet
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Connect nearby points to form "Surface"
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 - dist / 500})`; // Faint connections
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

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Deep Black base
    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" style={{ background: '#000000' }} />;
}
