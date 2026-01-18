import { useEffect, useRef } from 'react';

const MouseParticles = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const particlesRef = useRef([]);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#E30A17'];

        // Google Antigravity uses a dense cluster (approx 500-1000 for high quality)
        const particleCount = 450;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            // Poisson-like distribution using concentric rings and noise
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.pow(Math.random(), 0.5) * 280; // Denser toward center

            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: 0,
                vy: 0,
                baseRadius: radius,
                baseAngle: angle,
                seed: Math.random() * 100,
                color: colors[i % colors.length],
                size: 1 + Math.random() * 1.2,
                friction: 0.92 + Math.random() * 0.04, // Varied friction for "lag" effect
                phase: Math.random() * Math.PI * 2
            });
        }
        particlesRef.current = particles;

        const onMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            timeRef.current += 0.016;
            const t = timeRef.current;

            particlesRef.current.forEach((p) => {
                // 1. Vortex calculation (Math.atan2 + offset rotation)
                const vortexSpeed = 0.15;
                const rotation = t * vortexSpeed + Math.sin(t + p.seed * 0.1) * 0.2;

                // Ring displacement (as found in uRingPos shader logic)
                const ringDisplacement = Math.sin(t * 2 + p.phase) * 6;
                const currentRadius = p.baseRadius + ringDisplacement;
                const currentAngle = p.baseAngle + rotation;

                // 2. Target Position (Relative to cursor)
                const targetX = mouseRef.current.x + Math.cos(currentAngle) * currentRadius;
                const targetY = mouseRef.current.y + Math.sin(currentAngle) * currentRadius;

                // 3. Physics: Smooth Step / Easing
                // Equivalent to uRingDisplacement and uPushProgress in original source
                const dx = targetX - p.x;
                const dy = targetY - p.y;

                p.vx += dx * 0.04; // Attraction strength
                p.vy += dy * 0.04;

                p.vx *= p.friction;
                p.vy *= p.friction;

                p.x += p.vx;
                p.y += p.vy;

                // 4. Orientation: Align Dash with velocity/vortex
                // The original uses a custom shader rotation, we simulate with atan2
                const dirX = p.x - mouseRef.current.x;
                const dirY = p.y - mouseRef.current.y;
                const angleToCenter = Math.atan2(dirY, dirX);

                // 5. Render: Elongated Dash (Dashes)
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(angleToCenter + Math.PI / 2); // Perpendicular to radius

                // Opacity based on distance and seed (flicker/glow effect)
                const opacity = 0.4 + Math.sin(t * 3 + p.seed) * 0.2;
                ctx.globalAlpha = Math.max(0.2, opacity);

                ctx.beginPath();
                ctx.moveTo(0, -p.size * 2.2);
                ctx.lineTo(0, p.size * 2.2);
                ctx.strokeStyle = p.color;
                ctx.lineWidth = p.size;
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.restore();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default MouseParticles;
