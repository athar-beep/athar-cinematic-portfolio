'use client';
import { useEffect, useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [motionOn, setMotionOn] = useState(true);

  useEffect(() => {
    const onState = e => setMotionOn(e.detail.on);
    window.addEventListener('motion-state', onState);
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('motion-state', onState); document.removeEventListener('keydown', onKey); };
  }, []);

  const toggleMotion = e => {
    const r = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(new CustomEvent('motion-toggle', { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }));
  };

  return (
    <>
      <header>
        <a className="wordmark" href="#top">ATHAR<span>.</span></a>
        <nav className="desktop" aria-label="Primary">
          <a href="#work">Work</a><a href="#craft">Craft</a><a href="#journey">Journey</a><a href="#contact">Contact</a>
        </nav>
        <div className="head-actions">
          <button id="motionBtn" type="button" aria-pressed={motionOn} onClick={toggleMotion}
            style={motionOn ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>Motion</button>
          <a className="cta-small" href="#contact" data-magnetic>Hire Me</a>
          <button id="burger" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <i></i><i></i><i></i>
          </button>
        </div>
      </header>
      <div id="mobileMenu" className={open ? 'open' : ''}>
        <a href="#work" onClick={() => setOpen(false)}><span>01</span>Work</a>
        <a href="#craft" onClick={() => setOpen(false)}><span>02</span>Craft</a>
        <a href="#journey" onClick={() => setOpen(false)}><span>03</span>Journey</a>
        <a href="#contact" onClick={() => setOpen(false)}><span>04</span>Contact</a>
      </div>
    </>
  );
}
