const stars = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  left: `${(index * 47) % 101}%`,
  top: `${(index * 73) % 97}%`,
  delay: `${(index % 12) * -0.43}s`,
  duration: `${2.4 + (index % 7) * 0.38}s`,
  size: `${1 + (index % 4)}px`,
}));

export default function Home() {
  return (
    <main className="cosmos">
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />
      <div className="grid-floor" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="starfield" aria-hidden="true">
        {stars.map((star) => (
          <i key={star.id} style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay, animationDuration: star.duration }} />
        ))}
      </div>

      <section className="hero" aria-labelledby="family-name">
        <div className="orbit orbit-outer" aria-hidden="true"><span /></div>
        <div className="orbit orbit-inner" aria-hidden="true"><span /></div>
        <p className="eyebrow">An Edson Family Production</p>
        <h1 id="family-name" data-text="The Edsons"><span>The Edsons</span></h1>
        <div className="flare" aria-hidden="true" />
        <p className="message">Nothing to see here move along...</p>
        <div className="signal" aria-hidden="true"><span /><span /><span /></div>
      </section>

      <nav className="site-links" aria-label="Explore more">
        <a className="arcade-link" href="https://astersarcade.com/" aria-label="Visit Aster's Arcade" title="Aster's Arcade">
          <svg viewBox="0 0 32 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 3h19l-2 8 2 12 3 4v10H4V27l3-4V3Z" />
            <path d="M7 9h17M7 23h19M4 27h25" />
            <path d="M10 12h11l2 8H10Z" />
            <path d="M11 24v2m7-1h1m3 0h1M14 31h5v3h-5Z" />
            <circle cx="11" cy="22.5" r="1.5" />
          </svg>
        </a>
        <a className="resume-link" href="/resume/professional.html">Professional resume</a>
        <a className="resume-link resume-link-insane" href="/resume/insane.html">Insane resume</a>
      </nav>
    </main>
  );
}
