"use client";

import { useEffect, useRef } from "react";
import styles from "./fluid-particles-background.module.css";

interface FluidParticlesBackgroundProps {
  particleCount?: number;
  noiseIntensity?: number;
  particleSize?: { min: number; max: number };
  className?: string;
}

// Perlin flow field from the user-supplied Fluid Particles Background.
function createNoise() {
  const permutation = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
    36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,
    234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,
    134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,
    230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,
    1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130,
    116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250,
    124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,
    47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
    154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,
    108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34,
    242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,
    239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121,
    50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,
    141, 128, 195, 78, 66, 215, 61, 156, 180,
  ];

  const p = new Uint16Array(512);
  for (let i = 0; i < 256; i++) p[256 + i] = p[i] = permutation[i];

  function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(t: number, a: number, b: number) {
    return a + t * (b - a);
  }

  function grad(hash: number, x: number, y: number, z: number) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  return {
    perlin3: (x: number, y: number, z: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;

      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);

      const u = fade(x);
      const v = fade(y);
      const w = fade(z);

      const A = p[X] + Y;
      const AA = p[A] + Z;
      const AB = p[A + 1] + Z;
      const B = p[X + 1] + Y;
      const BA = p[B] + Z;
      const BB = p[B + 1] + Z;

      return lerp(
        w,
        lerp(
          v,
          lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z)),
        ),
        lerp(
          v,
          lerp(
            u,
            grad(p[AA + 1], x, y, z - 1),
            grad(p[BA + 1], x - 1, y, z - 1),
          ),
          lerp(
            u,
            grad(p[AB + 1], x, y - 1, z - 1),
            grad(p[BB + 1], x - 1, y - 1, z - 1),
          ),
        ),
      );
    },
  };
}

const noise = createNoise();

type Particle = {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  speed: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

export function FluidParticlesBackground({
  particleCount = 1600,
  noiseIntensity = 0.0025,
  particleSize,
  className = "",
}: FluidParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const count = Math.round(clamp(particleCount, 0, 2200));
  const noiseScale = clamp(noiseIntensity, 0.0005, 0.02);
  const minSize = clamp(particleSize?.min ?? 0.6, 0.25, 2);
  const maxSize = clamp(particleSize?.max ?? 1.4, minSize, 3);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let visible = false;
    let primary = "#0066cc";
    let particles: Particle[] = [];

    function seedParticle(particle: Particle, randomAge = false) {
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.maxLife = 8 + Math.random() * 8;
      particle.life = randomAge ? Math.random() * particle.maxLife : 0;
      particle.size = minSize + Math.random() * (maxSize - minSize);
      particle.speed = 28 + Math.random() * 16;
    }

    function draw(delta: number) {
      if (!context || !width || !height) return;
      // Fade to transparency so the existing white canvas and blue aura show through.
      context.globalCompositeOperation = "destination-out";
      context.globalAlpha = 1 - Math.exp(-delta * 3.8);
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      context.fillStyle = primary;

      for (const particle of particles) {
        particle.life += delta;
        if (particle.life > particle.maxLife) seedParticle(particle);
        const angle = noise.perlin3(
          particle.x * noiseScale,
          particle.y * noiseScale,
          elapsed * 0.035,
        ) * Math.PI * 4;
        particle.x += Math.cos(angle) * particle.speed * delta;
        particle.y += Math.sin(angle) * particle.speed * delta;
        if (particle.x < 0) particle.x += width;
        if (particle.x > width) particle.x -= width;
        if (particle.y < 0) particle.y += height;
        if (particle.y > height) particle.y -= height;
        context.globalAlpha = Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.23;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    }

    function shouldAnimate() {
      return visible && !document.hidden && !motionPreference.matches && count > 0;
    }

    function animate(time: number) {
      frame = 0;
      if (!shouldAnimate()) return;
      // Render at 30 fps; speed remains consistent on high-refresh-rate screens.
      if (!lastTime || time - lastTime >= 1000 / 30 - 1) {
        const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.07) : 1 / 30;
        lastTime = time;
        elapsed += delta;
        draw(delta);
      }
      frame = window.requestAnimationFrame(animate);
    }

    function syncPlayback() {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (shouldAnimate()) frame = window.requestAnimationFrame(animate);
    }

    function resize() {
      if (!canvas || !context) return;
      // Observe the hero's actual size, not the full browser window.
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      primary = getComputedStyle(canvas).getPropertyValue("--primary").trim() || "#0066cc";
      const responsiveCount = Math.round(count * Math.min(1, width * height / 700000));
      particles = Array.from({ length: responsiveCount }, () => {
        const particle: Particle = { x: 0, y: 0, size: 0, life: 0, maxLife: 0, speed: 0 };
        seedParticle(particle, true);
        return particle;
      });
      // A short warm-up gives the first paint a settled texture, even with reduced motion.
      for (let step = 0; step < 16; step++) draw(1 / 30);
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    motionPreference.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    resize();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionPreference.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [count, noiseScale, minSize, maxSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className}`}
      aria-hidden="true"
    />
  );
}