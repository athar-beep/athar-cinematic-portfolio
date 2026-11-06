'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const MOTION_KEY = 'athar-portfolio-motion';

export default function Effects() {
  const cvRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- motion state + lenis ---------- */
    let motionOn = localStorage.getItem(MOTION_KEY) !== 'off';
    let lenis = null, lenisRaf = 0;
    const startLenis = () => {
      if (!fine || reduced || lenis) return;
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.0 });
      const loop = time => { if (lenis) lenis.raf(time); lenisRaf = requestAnimationFrame(loop); };
      lenisRaf = requestAnimationFrame(loop);
      if (!window.__preDone) lenis.stop();
    };
    const stopLenis = () => {
      if (lenisRaf) cancelAnimationFrame(lenisRaf);
      if (lenis) { lenis.destroy(); lenis = null; }
    };
    const apply = () => {
      document.body.classList.toggle('motion-off', !motionOn);
      window.dispatchEvent(new CustomEvent('motion-state', { detail: { on: motionOn } }));
      if (motionOn) startLenis(); else stopLenis();
    };
    const onPreDone = () => { if (lenis) lenis.start(); };
    window.addEventListener('preloader-done', onPreDone);
    apply();

    /* ---------- swarm particles ---------- */
    const cv = cvRef.current;
    const ctx = cv.getContext('2d');
    const size = () => { cv.width = innerWidth; cv.height = innerHeight; };
    size();
    window.addEventListener('resize', size);
    let parts = [], running = false;
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const t = Date.now() / 380;
      parts = parts.filter(p => p.life > 0);
      for (const p of parts) {
        p.vx += Math.cos(t + p.ph) * 0.05;
        p.vy += Math.sin(t * 1.3 + p.ph) * 0.05;
        p.vx *= 0.965; p.vy *= 0.965;
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(227,43,60,' + (p.life * 0.9).toFixed(3) + ')';
        ctx.fill();
      }
      if (parts.length) requestAnimationFrame(tick);
      else { running = false; ctx.clearRect(0, 0, cv.width, cv.height); }
    };
    const burst = (x, y) => {
      for (let i = 0; i < 150; i++) {
        const a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 3.4;
        parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1,
          decay: 0.004 + Math.random() * 0.008, size: 1 + Math.random() * 2.4, ph: Math.random() * Math.PI * 2 });
      }
      if (!running) { running = true; requestAnimationFrame(tick); }
    };
    const onToggle = e => {
      motionOn = !motionOn;
      localStorage.setItem(MOTION_KEY, motionOn ? 'on' : 'off');
      apply();
      if (e.detail) burst(e.detail.x, e.detail.y);
    };
    window.addEventListener('motion-toggle', onToggle);

    /* ---------- reveals + stagger ---------- */
    const counts = new Map();
    document.querySelectorAll('.rv').forEach(el => {
      const p = el.parentElement;
      const n = (counts.get(p) || 0);
      counts.set(p, n + 1);
      el.style.transitionDelay = Math.min(n * 70, 350) + 'ms';
    });
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));

    /* ---------- progress bar ---------- */
    const onScroll = () => {
      const h = document.documentElement;
      const bar = document.getElementById('progress');
      if (bar) bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- active nav ---------- */
    const navIO = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) document.querySelectorAll('nav.desktop a').forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }), { rootMargin: '-40% 0px -55% 0px' });
    ['work', 'craft', 'journey', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) navIO.observe(el);
    });

    /* ---------- smooth anchors via lenis ---------- */
    const onClick = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || !lenis) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -60, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    /* ---------- magnetic buttons + card tilt + cursor (desktop) ---------- */
    let cleanupFx = () => {};
    if (fine && !reduced) {
      const mags = [...document.querySelectorAll('[data-magnetic]')];
      const magHandlers = mags.map(el => {
        const move = e => {
          if (!motionOn) return;
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          el.style.transition = 'transform .25s cubic-bezier(.22,1,.36,1)';
          el.style.transform = 'translate(' + dx * 0.28 + 'px,' + dy * 0.28 + 'px)';
        };
        const leave = () => { el.style.transform = 'translate(0,0)'; };
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', leave);
        return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
      });

      let tiltCard = null;
      const onMove = e => {
        const card = e.target.closest ? e.target.closest('.card') : null;
        if (tiltCard && tiltCard !== card) {
          tiltCard.style.transform = '';
          tiltCard.style.transition = '';
          tiltCard = null;
        }
        if (!card || !motionOn) return;
        tiltCard = card;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.transition = 'transform .18s ease-out, border-color .3s';
        card.style.transform = 'perspective(900px) rotateX(' + ((0.5 - py) * 5).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * 5).toFixed(2) + 'deg) translateY(-4px)';
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
      };
      document.addEventListener('pointermove', onMove);

      const dot = document.createElement('div'); dot.className = 'cursor-dot';
      const ring = document.createElement('div'); ring.className = 'cursor-ring';
      document.body.appendChild(dot); document.body.appendChild(ring);
      let mx = -100, my = -100, rx = -100, ry = -100, cursorRaf = 0;
      const onMouse = e => { mx = e.clientX; my = e.clientY; };
      const cursorLoop = () => {
        rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
        cursorRaf = requestAnimationFrame(cursorLoop);
      };
      cursorRaf = requestAnimationFrame(cursorLoop);
      document.addEventListener('mousemove', onMouse);
      const onOver = e => {
        const hot = e.target.closest && e.target.closest('a, button, .card, input, textarea, .ba, .fchip');
        ring.classList.toggle('grow', !!hot);
      };
      document.addEventListener('mouseover', onOver);

      cleanupFx = () => {
        magHandlers.forEach(fn => fn());
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('mousemove', onMouse);
        document.removeEventListener('mouseover', onOver);
        cancelAnimationFrame(cursorRaf);
        dot.remove(); ring.remove();
      };
    }

    return () => {
      window.removeEventListener('motion-toggle', onToggle);
      window.removeEventListener('preloader-done', onPreDone);
      window.removeEventListener('resize', size);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick);
      io.disconnect(); navIO.disconnect();
      stopLenis();
      cleanupFx();
    };
  }, []);

  return <canvas id="swarm" ref={cvRef} aria-hidden="true" />;
}
