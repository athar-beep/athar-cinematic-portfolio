'use client';
import { useEffect, useRef } from 'react';

export default function BeforeAfter() {
  const boxRef = useRef(null);
  const wrapRef = useRef(null);
  const handleRef = useRef(null);
  const drag = useRef(false);

  const set = clientX => {
    const box = boxRef.current, wrap = wrapRef.current, handle = handleRef.current;
    if (!box || !wrap || !handle) return;
    const r = box.getBoundingClientRect();
    let pct = (clientX - r.left) / r.width;
    pct = Math.max(0.02, Math.min(0.98, pct));
    wrap.style.width = (pct * 100) + '%';
    const layer = wrap.querySelector('.layer');
    if (layer) layer.style.width = r.width + 'px';
    handle.style.left = (pct * 100) + '%';
  };
  const init = () => {
    const box = boxRef.current, wrap = wrapRef.current;
    if (!box || !wrap) return;
    const layer = wrap.querySelector('.layer');
    if (layer) layer.style.width = box.getBoundingClientRect().width + 'px';
  };

  useEffect(() => {
    init();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  const heroSize = { fontSize: 'clamp(30px,5.4vw,64px)' };
  return (
    <>
      <div className="ba rv" ref={boxRef} aria-label="Before and after slider: drag to compare wireframe and final design"
        onPointerDown={e => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); set(e.clientX); }}
        onPointerMove={e => { if (drag.current) set(e.clientX); }}
        onPointerUp={() => { drag.current = false; }}
        onPointerCancel={() => { drag.current = false; }}>
        <div className="layer final">
          <div className="mock-nav"><i style={{ background: '#e32b3c' }}></i><i></i><i></i></div>
          <div className="mock-hero" style={heroSize}>Safety<br /><span style={{ color: 'var(--accent)' }}>First.</span></div>
          <div className="bar acc" style={{ width: 150, height: 15, marginTop: 20 }}></div>
          <div className="bar" style={{ width: 'min(420px,80%)', height: 11, marginTop: 14 }}></div>
          <div className="bar" style={{ width: 'min(340px,66%)', height: 11, marginTop: 9 }}></div>
          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            <div className="bar acc" style={{ width: 118, height: 34, borderRadius: 999 }}></div>
            <div className="bar" style={{ width: 118, height: 34, borderRadius: 999 }}></div>
          </div>
        </div>
        <div className="wire-wrap" ref={wrapRef}>
          <div className="layer wire">
            <div className="mock-nav"><i></i><i></i><i></i></div>
            <div className="mock-hero" style={heroSize}>Safety<br />First.</div>
            <div className="bar" style={{ width: 150, height: 15, marginTop: 20 }}></div>
            <div className="bar" style={{ width: 'min(420px,80%)', height: 11, marginTop: 14 }}></div>
            <div className="bar" style={{ width: 'min(340px,66%)', height: 11, marginTop: 9 }}></div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <div className="bar" style={{ width: 118, height: 34, borderRadius: 999 }}></div>
              <div className="bar" style={{ width: 118, height: 34, borderRadius: 999 }}></div>
            </div>
          </div>
        </div>
        <span className="tag l">Wireframe</span>
        <span className="tag r">Final Design</span>
        <div className="handle" ref={handleRef} style={{ left: '50%' }}></div>
      </div>
      <p className="ba-note">Drag to see the process · Drag / Scroll</p>
    </>
  );
}
