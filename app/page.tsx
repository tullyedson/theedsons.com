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
        <p className="message">Nothing to see here yet move along...</p>
        <div className="signal" aria-hidden="true"><span /><span /><span /></div>
      </section>

      <p className="coordinates" aria-hidden="true">EST. SOMEWHERE IN THE SPACE-TIME CONTINUUM</p>
    </main>
  );
}
