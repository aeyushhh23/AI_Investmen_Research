import { useEffect, useRef } from "react";

const CursorField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const pointer = {
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.45,
            targetX: window.innerWidth * 0.5,
            targetY: window.innerHeight * 0.45
        };
        let particles = [];
        let animationFrame;
        let isLight = document.documentElement.classList.contains("light");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const createParticles = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            const width = window.innerWidth;
            const height = window.innerHeight;
            const spacing = width < 768 ? 42 : 34;

            canvas.width = width * ratio;
            canvas.height = height * ratio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);

            particles = [];

            for (let y = -spacing; y < height + spacing; y += spacing) {
                for (let x = -spacing; x < width + spacing; x += spacing) {
                    particles.push({
                        x: x + (Math.random() - 0.5) * spacing * 0.65,
                        y: y + (Math.random() - 0.5) * spacing * 0.65,
                        seed: Math.random() * Math.PI * 2,
                        length: 1.4 + Math.random() * 2.5
                    });
                }
            }
        };

        const draw = (time = 0) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const activeRadius = Math.min(width, 560);
            const baseAlpha = isLight ? 0.15 : 0.12;
            const activeColor = isLight ? "37, 99, 235" : "96, 165, 250";
            const accentColor = isLight ? "124, 58, 237" : "34, 211, 238";

            pointer.x += (pointer.targetX - pointer.x) * 0.08;
            pointer.y += (pointer.targetY - pointer.y) * 0.08;

            context.clearRect(0, 0, width, height);
            context.lineCap = "round";

            particles.forEach((particle) => {
                const dx = pointer.x - particle.x;
                const dy = pointer.y - particle.y;
                const distance = Math.hypot(dx, dy);
                const influence = Math.max(0, 1 - distance / activeRadius);
                const idleAngle = particle.seed + time * 0.00018;
                const angle = Math.atan2(dy, dx) + Math.PI * 0.5;
                const blend = influence * influence;
                const rotation = idleAngle * (1 - blend) + angle * blend;
                const length = particle.length + blend * 10;
                const alpha = baseAlpha + blend * (isLight ? 0.75 : 0.65);
                const color = blend > 0.35 ? accentColor : activeColor;
                const drift = reducedMotion ? 0 : Math.sin(time * 0.001 + particle.seed) * 0.8;
                const centerX = particle.x + drift;
                const centerY = particle.y + Math.cos(time * 0.0008 + particle.seed) * 0.8;
                const half = length * 0.5;

                context.strokeStyle = `rgba(${color}, ${alpha})`;
                context.lineWidth = 1 + blend * 1.8;
                context.beginPath();
                context.moveTo(
                    centerX - Math.cos(rotation) * half,
                    centerY - Math.sin(rotation) * half
                );
                context.lineTo(
                    centerX + Math.cos(rotation) * half,
                    centerY + Math.sin(rotation) * half
                );
                context.stroke();
            });

            animationFrame = window.requestAnimationFrame(draw);
        };

        const handlePointerMove = (event) => {
            pointer.targetX = event.clientX;
            pointer.targetY = event.clientY;
        };

        const observer = new MutationObserver(() => {
            isLight = document.documentElement.classList.contains("light");
        });

        createParticles();
        draw();

        window.addEventListener("resize", createParticles);
        window.addEventListener("pointermove", handlePointerMove);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"]
        });

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", createParticles);
            window.removeEventListener("pointermove", handlePointerMove);
            observer.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="cursor-field-canvas"
        />
    );
};

export default CursorField;
