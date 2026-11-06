import { JOURNEY } from '../app/data';

const H2 = { fontFamily: "'Anton',sans-serif", fontSize: 'clamp(38px,6.4vw,84px)', lineHeight: 0.98, textTransform: 'uppercase' };
const OUTLINE = { color: 'transparent', WebkitTextStroke: '2px var(--ink)' };

export default function Journey() {
  return (
    <section id="journey">
      <div className="sec-head rv"><span className="sec-no">03 / The Journey</span></div>
      <h2 className="rv" style={H2}>Keep learning.<br /><span style={OUTLINE}>Keep protecting</span>.</h2>
      <p className="sec-sub rv">Experience &amp; milestones — every role earned on site, in the dust, with real crews and real consequences.</p>
      <div className="timeline">
        {JOURNEY.map(([when, role, org, desc]) => (
          <div className="tl-item rv" key={role + org}>
            <div className="when">{when}</div>
            <div>
              <h3>{role}</h3>
              <div className="org">{org}</div>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="miles">
        <div className="mile rv"><b>Certified<i>.</i></b><span>NEBOSH IGC with Credit · IOSH · OSHA 30-Hour · Highfield First Aid &amp; Risk Assessment</span></div>
        <div className="mile rv"><b>Site-tested<i>.</i></b><span>Highways, buildings &amp; a fertilizer plant — 180 personnel, zero shortcuts</span></div>
        <div className="mile rv"><b>Gulf-ready<i>.</i></b><span>Passport valid to 2035 · Immediate notice period · Ready to relocate</span></div>
      </div>
    </section>
  );
}
