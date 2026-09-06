'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Starfield } from './starfield';

function subscribeMotionPreference(onChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function reducedMotionPreference() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
function serverMotionPreference() { return true; }

function OrbitMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.3" />
      <ellipse cx="20" cy="20" rx="19" ry="6.5" transform="rotate(-35 20 20)" stroke="currentColor" strokeWidth="1.3" />
      <path d="M16 15h8M16 20h6M16 25h8M16 15v10" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function CosmicScene() {
  const reducedMotion = useSyncExternalStore(subscribeMotionPreference, reducedMotionPreference, serverMotionPreference);
  const [paused, setPaused] = useState(false);
  const [jumping, setJumping] = useState(false);
  const [hasJumped, setHasJumped] = useState(false);
  const warpStarted = useRef<number | null>(null);
  const jumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const motionEnabled = !paused && !reducedMotion;

  useEffect(() => () => {
    if (jumpTimer.current !== null) clearTimeout(jumpTimer.current);
  }, []);

  function takeTheScenicRoute() {
    if (jumping) return;
    setHasJumped(true);
    if (!motionEnabled) return;
    warpStarted.current = performance.now();
    setJumping(true);
    jumpTimer.current = setTimeout(() => {
      setJumping(false);
      warpStarted.current = null;
      jumpTimer.current = null;
    }, 3600);
  }

  return (
    <main className="cosmos" data-motion={motionEnabled ? 'on' : 'off'} data-warp={jumping && motionEnabled ? 'true' : 'false'}>
      <div className="space-art" aria-hidden="true">
        <Image src="/cosmic-horizon.webp" alt="" fill unoptimized priority sizes="100vw" />
      </div>
      <div className="space-atmosphere" aria-hidden="true" />
      <Starfield moving={motionEnabled} warpStarted={warpStarted} />
      <div className="orbital-guide guide-one" aria-hidden="true" />
      <div className="orbital-guide guide-two" aria-hidden="true" />

      <header className="site-header">
        <Link className="family-brand" href="/" aria-label="The Edsons home">
          <OrbitMark className="brand-mark" />
          <span>THE EDSONS<span className="brand-caption">A FAMILY PRODUCTION</span></span>
        </Link>
        <div className="header-right">
          <span className="home-signal"><span />TRANSMITTING FROM EARTH</span>
          <button className="motion-toggle" type="button" aria-pressed={!motionEnabled} aria-label={reducedMotion ? 'Animation paused by your device settings' : motionEnabled ? 'Pause animation' : 'Resume animation'} title={reducedMotion ? 'Reduced motion is enabled on your device' : motionEnabled ? 'Pause animation' : 'Resume animation'} disabled={reducedMotion} onClick={() => setPaused(!paused)}>
            {motionEnabled ? <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10" /></svg> : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5 8 5-8 5Z" /></svg>}
          </button>
        </div>
      </header>

      <section className="hero" aria-labelledby="family-name">
        <p className="eyebrow"><span />ONE FAMILY. AN ENTIRE UNIVERSE.<span /></p>
        <h1 id="family-name" aria-label="The Edsons"><span className="title-prelude">The</span><span className="family-name">Edsons</span></h1>
        <div className="hero-message">
          <p className="message">Nothing to see here yet.</p>
          <p className="message-aside">Move along. Or stay for the view.</p>
        </div>
        <div className="jump-control">
          <button className="warp-button" type="button" onClick={takeTheScenicRoute} disabled={jumping} aria-label="Do not press: take a trip through the stars">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z" stroke="currentColor" strokeWidth="1.2" /><path d="m19 3 .5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3Z" fill="currentColor" /></svg>
            <span>{jumping ? 'Taking the scenic route' : 'Do not press'}</span>
            <span className="button-arrow" aria-hidden="true">↗</span>
          </button>
          <p className="jump-caption" aria-live="polite" aria-atomic="true">{jumping ? 'Please keep your hands inside the universe.' : hasJumped ? 'Yep. Still nothing here. Nice trip, though.' : 'You know you want to.'}</p>
        </div>
      </section>

      <div className="horizon-marker" aria-hidden="true"><span />YOU ARE HOME<span /></div>

      <footer className="site-footer">
        <div className="footer-coordinate"><span className="tiny-cross" aria-hidden="true">+</span><span>SOMEWHERE IN THE<span className="footer-strong">SPACE-TIME CONTINUUM</span></span></div>
        <span className="footer-middle">A little chaos. A lot of love.</span>
        <span className="footer-address">THEEDSONS.COM<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 16 16 4M4 4h12v12" /></svg></span>
      </footer>
    </main>
  );
}
