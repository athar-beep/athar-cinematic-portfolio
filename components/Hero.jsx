'use client';
import { useEffect, useRef } from 'react';
import { CV_URL } from '../app/data';

export default function Hero() {
  const h1Ref = useRef(null);
  const portraitRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const motionOff = document.body.classList.contains('motion-off');

      /* headline rows rise */
      if (h1Ref.current) {
        h1Ref.current.querySelectorAll('.row > span').forEach((s, i) => {
          if (motionOff) return;
          s.style.transform = 'translateY(112%)';
          s.style.transition = 'transform .95s cubic-bezier(.22,1,.36,1) ' + (0.1 + i * 0.13) + 's';
          requestAnimationFrame(() => requestAnimationFrame(() => { s.style.transform = 'translateY(0)'; }));
        });
      }
      /* portrait reveal */
      const fig = portraitRef.current;
      if (fig && !motionOff) {
        fig.style.opacity = '0';
        fig.style.transform = 'translateY(28px) scale(.975)';
        fig.style.transition = 'opacity 1s cubic-bezier(.22,1,.36,1) .4s, transform 1s cubic-bezier(.22,1,.36,1) .4s';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          fig.style.opacity = '1';
          fig.style.transform = 'translateY(0) scale(1)';
        }));
      }
      /* count-up stats */
      if (statsRef.current && !motionOff) {
        statsRef.current.querySelectorAll('.count').forEach(el => {
          const to = parseFloat(el.dataset.to);
          const dec = parseInt(el.dataset.dec || '0', 10);
          const D = 1400, t0 = performance.now() + 450;
          const stepFn = now => {
            const t = Math.min(1, Math.max(0, (now - t0) / D));
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = (to * eased).toFixed(dec);
            if (t < 1) requestAnimationFrame(stepFn);
            else el.textContent = to.toFixed(dec);
          };
          requestAnimationFrame(stepFn);
        });
      }
    };
    if (window.__preDone) start();
    else window.addEventListener('preloader-done', start);
    return () => window.removeEventListener('preloader-done', start);
  }, []);

  return (
    <div className="hero">
      <div className="hero-top">
        <span>HSE Professional · Safety Officer</span>
        <span className="avail"><b>●</b> Available for Gulf Roles</span>
      </div>
      <div className="hero-grid">
        <span className="hello">Hello, I&rsquo;m Athar</span>
        <h1 className="mega" ref={h1Ref} aria-label="Safety First">
          <span className="row"><span>SAFETY</span></span>
          <span className="row"><span className="outline">FIRST</span><span className="dot">.</span></span>
        </h1>
        <figure className="portrait" ref={portraitRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/profile-photo.jpg" alt="Portrait of Muhammad Athar, HSE professional" width="330" height="440" />
          <figcaption><span>Muhammad Athar</span><b>NEBOSH IGC</b></figcaption>
        </figure>
      </div>
      <div className="hero-sub">
        <div className="tag">Preventing incidents.<br /><em>Protecting people.</em></div>
        <p>I turn high-risk construction sites into controlled, compliant workplaces — risk assessments, permit-to-work systems and HSE documentation that stand up to any audit, from the first toolbox talk to final handover.</p>
      </div>
      <div className="hero-ctas">
        <a className="btn solid" href="#work" data-magnetic>See My Work</a>
        <a className="btn ghost" href={CV_URL} target="_blank" rel="noopener noreferrer" data-magnetic>Download CV</a>
      </div>
      <div className="hero-stats" ref={statsRef}>
        <div className="hstat"><b><span className="count" data-to="2.7" data-dec="1">2.7</span><i>+</i></b><span>Years on construction sites</span></div>
        <div className="hstat"><b><span className="count" data-to="180">180</span><i>+</i></b><span>Personnel covered across 4 sites</span></div>
        <div className="hstat"><b><span className="count" data-to="7">7</span></b><span>Professional certifications</span></div>
        <div className="hstat"><b>PK <i>→</i> GULF</b><span>Based in Pakistan · Ready to relocate</span></div>
      </div>
      <div className="scroll-hint">Scroll to discover &nbsp;·&nbsp; Selected work / 2024–2026</div>
    </div>
  );
}
