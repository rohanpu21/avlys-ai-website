"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./gateway-flow.module.css";

export type GatewayFlowProps = {
  speed?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
};

type Point = { x: number; y: number };
type FlowPath = {
  points: [Point, Point, Point, Point];
  phase: number;
  speed: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : minimum));
}

function getBezierPoint(t: number, [p0, p1, p2, p3]: FlowPath["points"]): Point {
  const u = 1 - t;
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

/** The supplied Gateway Flow's converging paths, rendered with Avlys tokens. */
export default function GatewayFlow({
  speed = 0.65,
  density = 1,
  strokeWidth = 1,
  opacity = 1,
  className,
  style,
}: GatewayFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const safeSpeed = clamp(speed, 0, 3);
  const safeDensity = clamp(density, 0.25, 2);
  const safeStrokeWidth = clamp(strokeWidth, 0.25, 3);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let visible = false;
    let paths: FlowPath[] = [];
    let primary = "";
    let ink = "";
    // Cache the dotted paths; only the small moving particles repaint each frame.
    const pathLayer = document.createElement("canvas");
    const pathContext = pathLayer.getContext("2d");
    if (!pathContext) return;

    function draw() {
      if (!context || !width || !height) return;
      context.clearRect(0, 0, width, height);
      context.drawImage(pathLayer, 0, 0, width, height);

      paths.forEach((path, index) => {
        const t = (path.phase + elapsed * path.speed * safeSpeed) % 1;
        const point = getBezierPoint(t, path.points);
        const tail = getBezierPoint(Math.max(0, t - 0.016), path.points);
        context.globalAlpha = 0.68;
        context.strokeStyle = index % 5 === 0 ? ink : primary;
        context.lineWidth = 1.5 * safeStrokeWidth;
        context.beginPath();
        context.moveTo(tail.x, tail.y);
        context.lineTo(point.x, point.y);
        context.stroke();
        context.globalAlpha = 0.9;
        context.fillStyle = primary;
        context.fillRect(point.x - 1.25, point.y - 1.25, 2.5, 2.5);
      });
      context.globalAlpha = 1;
    }

    function shouldAnimate() {
      return visible && !document.hidden && !motionPreference.matches && safeSpeed > 0;
    }

    function animate(time: number) {
      frame = 0;
      if (!shouldAnimate()) return;
      // Time-based movement stays consistent on both 60 Hz and 120 Hz displays.
      elapsed += lastTime ? Math.min(time - lastTime, 50) / 1000 : 0;
      lastTime = time;
      draw();
      frame = window.requestAnimationFrame(animate);
    }

    function syncPlayback() {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (shouldAnimate()) frame = window.requestAnimationFrame(animate);
      else draw();
    }

    function resize() {
      if (!canvas || !context || !pathContext) return;
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = pathLayer.width = Math.round(width * dpr);
      canvas.height = pathLayer.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      pathContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      const tokens = getComputedStyle(canvas);
      primary = tokens.getPropertyValue("--primary").trim() || "#0066cc";
      ink = tokens.getPropertyValue("--ink").trim() || "#1d1d1f";
      const count = Math.round((width < 640 ? 36 : 64) * safeDensity);
      const perSide = Math.ceil(count / 2);

      paths = Array.from({ length: count }, (_, index) => {
        const isLeft = index % 2 === 0;
        const startY = (Math.floor(index / 2) / (perSide - 1)) * height * 1.4 - height * 0.2;
        const points: FlowPath["points"] = [
          { x: isLeft ? -10 : width + 10, y: startY },
          { x: width * (isLeft ? 0.23 : 0.77), y: startY },
          { x: width * (isLeft ? 0.38 : 0.62), y: height * 0.5 },
          { x: width * 0.5, y: height * 0.5 },
        ];
        const curve = new Path2D();
        curve.moveTo(points[0].x, points[0].y);
        curve.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
        pathContext.globalAlpha = index % 5 === 0 ? 0.13 : 0.23;
        pathContext.strokeStyle = index % 5 === 0 ? ink : primary;
        pathContext.lineWidth = safeStrokeWidth;
        pathContext.setLineDash([1, 5]);
        pathContext.stroke(curve);
        return { points, phase: (index * 0.61803398875) % 1, speed: 0.075 + (index % 7) * 0.008 };
      });
      draw();
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
  }, [safeSpeed, safeDensity, safeStrokeWidth]);

  return (
    <div className={`${styles.flow} ${className ?? ""}`} style={style}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={styles.canvas}
        style={{ opacity: clamp(opacity, 0, 1) }}
      />
    </div>
  );
}
