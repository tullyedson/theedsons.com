'use client';

import { useState, useSyncExternalStore } from 'react';
import { Starfield } from './starfield';

function subscribeMotionPreference(onChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function reducedMotionPreference() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
function serverMotionPreference() { return true; }

export default function CosmicScene() {
  const reducedMotion = useSyncExternalStore(subscribeMotionPreference, reducedMotionPreference, serverMotionPreference);
  const [paused, setPaused] = useState(false);
  const motionEnabled = !paused && !reducedMotion;

  return (
    <main className="cosmos" data-motion={motionEnabled ? 'on' : 'off'}>
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />
      <div className="grid-floor" aria-hidden="true" />
      <Starfield moving={motionEnabled} />
      <div className="scanlines" aria-hidden="true" />

      <section className="hero" aria-labelledby="message">
        <div className="orbit orbit-outer" aria-hidden="true"><span /></div>
        <div className="orbit orbit-inner" aria-hidden="true"><span /></div>
        <h1 id="message" aria-label="nothing to see here move along.">
          <span className="headline-line headline-first" data-text="nothing" aria-hidden="true"><span>nothing</span></span>{' '}
          <span className="headline-line" data-text="to see here" aria-hidden="true"><span>to see here</span></span>{' '}
          <span className="headline-line headline-last" data-text="move along." aria-hidden="true"><span>move along.</span></span>
        </h1>
        <div className="flare" aria-hidden="true" />
      </section>

      <button className="motion-toggle" type="button" aria-pressed={!motionEnabled} aria-label={reducedMotion ? 'Animation paused by your device settings' : motionEnabled ? 'Pause animation' : 'Resume animation'} disabled={reducedMotion} onClick={() => setPaused((value) => !value)}>
        {motionEnabled ? <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10" /></svg> : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5 8 5-8 5Z" /></svg>}
      </button>
    </main>
  );
}
