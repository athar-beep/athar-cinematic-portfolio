'use client';
import { useEffect, useRef, useState } from 'react';

export default function Preloader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef(null);
  const numRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const off = localStorage.getItem('athar-portfolio-motion') === 'off';
    const finish = () => {
      window.__preDone = true;
      window.dispatchEvent(new Event('preloader-done'));
      document.body.classList.remove('loading');
    };
    if (reduced || off) { setGone(true); finish(); return; }

    document.body.classList.add('loading');
    const DURATION = 1350;
    const t0 = performance.now();
    let raf;
    const step = now => {
      const t = Math.min(1, (now - t0) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      if (numRef.current) numRef.current.textContent = Math.round(eased * 100);
      if (barRef.current) barRef.current.style.transform = 'scaleX(' + eased + ')';
      if (t < 1) { raf = requestAnimationFrame(step); return; }
      if (rootRef.current) rootRef.current.classList.add('done');
      finish();
      setTimeout(() => setGone(true), 1000);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;
  return (
    <div id="preloader" ref={rootRef} aria-hidden="true">
      <div className="pre-center">
        <div className="pre-wm">ATHAR<span>.</span></div>
        <div className="pre-sub">HSE Professional — Portfolio</div>
        <div className="pre-track"><div className="pre-bar" ref={barRef}></div></div>
      </div>
      <div className="pre-num"><span ref={numRef}>0</span><em>%</em></div>
    </div>
  );
}
