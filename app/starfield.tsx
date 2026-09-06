'use client';

import { useEffect, useRef, type RefObject } from 'react';

type Star = { x: number; y: number; z: number; radius: number; phase: number };

const WARP_DURATION = 3600;

export function Starfield({ moving, warpStarted }: { moving: boolean; warpStarted: RefObject<number | null> }) {
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
      const warpAge = warpStarted.current === null ? WARP_DURATION : now - warpStarted.current;
      const warp = moving && warpAge >= 0 && warpAge < WARP_DURATION ? Math.pow(Math.sin(warpAge / WARP_DURATION * Math.PI), 2) : 0;
      const travel = moving ? delta * (12 + warp * 1800) : 0;

      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.z -= travel;
        if (star.z < 60) star.z += 1240;
        const scale = 500 / star.z;
        const x = width / 2 + star.x * scale + camera.x * scale * 11;
        const y = height / 2 + star.y * scale + camera.y * scale * 11;
        if (x < -60 || x > width + 60 || y < -60 || y > height + 60) continue;
        const radius = Math.min(star.radius * scale, 2.2);
        const alpha = Math.min(.85, (.25 + scale * .22) * (.8 + .2 * Math.sin(elapsed * .6 + star.phase)));
        context.strokeStyle = `rgba(183, 224, 249, ${alpha})`;
        context.fillStyle = `rgba(211, 236, 255, ${alpha})`;

        if (warp > .025) {
          const previousScale = 500 / (star.z + travel * 3);
          context.lineWidth = Math.max(.6, radius * .75);
          context.beginPath();
          context.moveTo(width / 2 + star.x * previousScale + camera.x * previousScale * 11, height / 2 + star.y * previousScale + camera.y * previousScale * 11);
          context.lineTo(x, y);
          context.stroke();
        } else {
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
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
      stars = Array.from({ length: width < 700 ? 100 : 240 }, () => ({
        x: (random() - .5) * width * 3,
        y: (random() - .5) * height * 3,
        z: 60 + random() * 1240,
        radius: .3 + random() * 1.2,
        phase: random() * Math.PI * 2,
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
  }, [moving, warpStarted]);

  return <canvas ref={canvasRef} className="star-canvas" aria-hidden="true" />;
}
