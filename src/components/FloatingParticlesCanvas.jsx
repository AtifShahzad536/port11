import React, { useEffect, useRef } from "react";

export const FloatingParticlesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle Classes (Hearts & Rose Petals)
    const particles = [];
    const numParticles = 45;

    class RomanticParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 20;
        this.size = Math.random() * 16 + 10;
        this.speedY = -(Math.random() * 0.8 + 0.3);
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.type = Math.random() > 0.4 ? "heart" : "petal"; // 60% hearts, 40% petals
        this.color = Math.random() > 0.3 ? "#E11D48" : "#FB7185";
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.rotation += this.rotationSpeed;

        if (this.y < -30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.type === "heart") {
          // Draw Red/Pink Heart
          ctx.fillStyle = this.color;
          const s = this.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.6, 0, s * 1.4);
          ctx.bezierCurveTo(s * 1.2, s * 0.6, s, -s * 0.5, 0, s * 0.3);
          ctx.fill();
        } else {
          // Draw Falling Rose Petal
          ctx.fillStyle = "#BE123C";
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.7, this.size * 0.35, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new RomanticParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
    />
  );
};
