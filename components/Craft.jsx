import { SKILLS, TOOLKIT, EDUCATION, PROCESS } from '../app/data';

const H2 = { fontFamily: "'Anton',sans-serif", fontSize: 'clamp(38px,6.4vw,84px)', lineHeight: 0.98, textTransform: 'uppercase' };
const OUTLINE = { color: 'transparent', WebkitTextStroke: '2px var(--ink)' };

export default function Craft() {
  return (
    <section id="craft">
      <div className="sec-head rv"><span className="sec-no">02 / Behind the Craft</span></div>
      <h2 className="rv" style={H2}>More than checklists.<br /><span style={OUTLINE}>Safety that works</span>.</h2>
      <div className="about-grid">
        <div className="rv">
          <p className="lead">I&rsquo;m Athar, a <b>NEBOSH IGC (Credit)</b> safety professional from Punjab, Pakistan. I&rsquo;ve kept construction crews safe with <b>NESPAK</b> and <b>M. Siddique Ch &amp; Co</b> — where our HSE team of four officers and a manager covered <b>180 personnel across four sites</b>.</p>
          <p className="more">My craft is the unglamorous work that prevents the worst day of someone&rsquo;s life: spotting the hazard before it bites, writing the JSA a crew actually follows, running a permit-to-work system with no shortcuts, and documenting everything so it survives any client audit. I completed a 3.5-month HSE training tour at an FFC fertilizer plant, and I&rsquo;m now aiming at the Gulf — the same standard, a bigger stage.</p>
          <div className="mini-head">Expertise &amp; Skills</div>
          <div className="chips">{SKILLS.map(s => <span key={s}>{s}</span>)}</div>
        </div>
        <div className="rv">
          <div className="mini-head">Education &amp; Certifications</div>
          <div>
            {EDUCATION.map(([n, d, y]) => (
              <div className="edu-item" key={n}>
                <div><b>{n}</b><small>{d}</small></div>
                <span className="yr">{y}</span>
              </div>
            ))}
          </div>
          <div className="mini-head">Creative &amp; Tech Toolkit</div>
          <div className="chips">{TOOLKIT.map(s => <span key={s}>{s}</span>)}</div>
        </div>
      </div>

      <div className="mini-head rv" style={{ marginTop: 44 }}>From Hazard to Control — My Process</div>
      <div className="process">
        {PROCESS.map(([t, d], i) => (
          <div className="step rv" key={t}>
            <div className="n">0{i + 1}</div><h4>{t}</h4><p>{d}</p>
          </div>
        ))}
      </div>

      <div className="big-quote rv">
        <div className="q">&ldquo;From hazard spotting<br />and permits, <span className="it">to documentation</span><br /><em>that passes any audit.</em>&rdquo;</div>
        <span className="sig">— Athar</span>
      </div>
    </section>
  );
}
