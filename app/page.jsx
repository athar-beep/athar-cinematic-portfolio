import Preloader from '../components/Preloader';
import Effects from '../components/Effects';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Work from '../components/Work';
import BeforeAfter from '../components/BeforeAfter';
import Craft from '../components/Craft';
import Journey from '../components/Journey';
import Contact from '../components/Contact';
import { TOOLS, MARQUEE } from './data';

const H2 = { fontFamily: "'Anton',sans-serif", fontSize: 'clamp(38px,6.4vw,84px)', lineHeight: 0.98, textTransform: 'uppercase' };
const H2S = { fontFamily: "'Anton',sans-serif", fontSize: 'clamp(30px,4.6vw,56px)', textTransform: 'uppercase' };
const OUTLINE = { color: 'transparent', WebkitTextStroke: '2px var(--ink)' };

export default function Page() {
  const mq = [...MARQUEE, ...MARQUEE];
  return (
    <>
      <div id="progress" />
      <Preloader />
      <Effects />
      <Header />
      <main id="top">
        <Hero />
        <div className="marquee" aria-hidden="true">
          <div className="track">
            {mq.map((m, i) => (
              <span key={i} style={{ display: 'contents' }}>
                <span>{m}</span><span className="sep">✦</span>
              </span>
            ))}
          </div>
        </div>

        <section id="work">
          <div className="sec-head rv"><span className="sec-no">01 / Selected Work</span></div>
          <h2 className="rv" style={H2}>Work that <span style={OUTLINE}>speaks</span>.</h2>
          <p className="sec-sub rv">Real projects, real documents, real sites. Filter by type or search — open any card for the full story.</p>
          <Work />

          <div className="sec-head rv" style={{ marginTop: 'clamp(56px,9vh,90px)' }}><span className="sec-no">Built With</span></div>
          <h2 className="rv" style={H2S}>The tools I <span style={{ color: 'var(--accent)' }}>trust</span>.</h2>
          <div className="tools-strip">
            {TOOLS.map(([n, s]) => (
              <div className="tool rv" key={n}>{n}<small>{s}</small></div>
            ))}
          </div>

          <div className="sec-head rv" style={{ marginTop: 'clamp(56px,9vh,90px)' }}><span className="sec-no">Design Under the Hood</span></div>
          <h2 className="rv" style={H2S}>From wireframe. <span style={OUTLINE}>To live</span>.</h2>
          <p className="sec-sub rv">One page. Every layer of thinking. Drag to see a grey-box wireframe become a finished, live interface.</p>
          <BeforeAfter />
        </section>

        <Craft />
        <Journey />
        <Contact />
      </main>
      <footer>
        <span className="wm">ATHAR<span>.</span></span>
        <p>© 2026 Muhammad Athar · HSE Professional · Built with discipline — like everything on my sites.</p>
        <a className="top" href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
