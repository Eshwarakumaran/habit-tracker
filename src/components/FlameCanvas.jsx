import { useEffect, useRef } from 'react';

export default function FlameCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles array
    const particles = [];
    const maxParticles = 65;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.size = Math.random() * 4 + 1.5;
        this.speedY = Math.random() * 1.8 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.colorHue = Math.random() > 0.3 ? Math.random() * 30 + 10 : Math.random() * 20 + 190; // Orange/red or rare blue soul ember
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.02) * 0.3;
        this.opacity -= 0.003;
        this.size *= 0.992;

        if (this.y < -10 || this.opacity <= 0 || this.size < 0.5) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.colorHue}, 100%, 55%, ${this.opacity})`;
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = `hsla(${this.colorHue}, 100%, 50%, ${this.opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bottom ambient hellfire gradient
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 250);
      gradient.addColorStop(0, 'rgba(255, 50, 0, 0.08)');
      gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.03)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height - 250, canvas.width, 250);

      // Draw top subtle vignette glow
      const topGrad = ctx.createLinearGradient(0, 0, 0, 150);
      topGrad.addColorStop(0, 'rgba(255, 30, 0, 0.04)');
      topGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, canvas.width, 150);

      // Update and draw embers
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="flame-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
