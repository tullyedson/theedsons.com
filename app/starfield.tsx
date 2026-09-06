'use client';

import { useEffect, useRef } from 'react';

type Star = { x: number; y: number; z: number; radius: number; phase: number; color: string };

const STAR_COLORS = ['34, 211, 238', '251, 55, 255', '255, 211, 90', '235, 243, 255'];

export function Starfield({ moving }: { moving: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    const scene = canvas?.parentElement;
    if (!canvas || !context || !scene) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let stars: Star[] = [];
    const pointer = { x: 0, y: 0 };
    const camera = { x: 0, y: 0 };
    let seed = 1987;

    function random() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    function draw(now: number) {
      if (!canvas || !context || !scene) return;
      frame = 0;
      const delta = lastTime ? Math.min((now - lastTime) / 1000, .05) : 0;
      lastTime = now;
      if (moving) elapsed += delta;
      camera.x += (pointer.x - camera.x) * Math.min(delta * 3, 1);
      camera.y += (pointer.y - camera.y) * Math.min(delta * 3, 1);
      const travel = moving ? delta * 22 : 0;

      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.z -= travel;
        if (star.z < 60) star.z += 1240;
        const scale = 500 / star.z;
        const x = width / 2 + star.x * scale + camera.x * scale * 11;
        const y = height / 2 + star.y * scale + camera.y * scale * 11;
        if (x < -60 || x > width + 60 || y < -60 || y > height + 60) continue;
        const radius = Math.min(star.radius * scale, 2.5);
        const alpha = Math.min(.95, (.35 + scale * .22) * (.8 + .2 * Math.sin(elapsed * 1.2 + star.phase)));
        context.fillStyle = `rgba(${star.color}, ${alpha * .12})`;
        context.beginPath();
        context.arc(x, y, radius * 3.5, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = `rgba(${star.color}, ${alpha})`;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      scene.style.setProperty('--look-x', `${moving ? camera.x * 9 : 0}px`);
      scene.style.setProperty('--look-y', `${moving ? camera.y * 6 : 0}px`);
      if (moving && !document.hidden) frame = requestAnimationFrame(draw);
    }

    function restart() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (!document.hidden) draw(performance.now());
    }

    function resize() {
      if (!canvas || !context || !scene) return;
      const rect = scene.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = Array.from({ length: width < 700 ? 100 : 240 }, (_, index) => ({
        x: (random() - .5) * width * 3,
        y: (random() - .5) * height * 3,
        z: 60 + random() * 1240,
        radius: .5 + random() * 1.2,
        phase: random() * Math.PI * 2,
        color: STAR_COLORS[index % STAR_COLORS.length],
      }));
      restart();
    }

    function move(event: PointerEvent) {
      if (!moving || event.pointerType === 'touch') return;
      const rect = scene?.getBoundingClientRect();
      if (!rect) return;
      pointer.x = (event.clientX - rect.left) / width - .5;
      pointer.y = (event.clientY - rect.top) / height - .5;
    }

    function leave() { pointer.x = 0; pointer.y = 0; }

    const observer = new ResizeObserver(resize);
    observer.observe(scene);
    scene.addEventListener('pointermove', move, { passive: true });
    scene.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', restart);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', restart);
      scene.style.removeProperty('--look-x');
      scene.style.removeProperty('--look-y');
    };
  }, [moving]);

  return <canvas ref={canvasRef} className="star-canvas" aria-hidden="true" />;
}
