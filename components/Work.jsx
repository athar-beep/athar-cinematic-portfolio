'use client';
import { useMemo, useRef, useState } from 'react';
import { PROJECTS } from '../app/data';

const CATS = ['All', 'HSE', 'Web', 'App'];
const PAGE = 4;

export default function Work() {
  const [cat, setCat] = useState('All');
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(PAGE);
  const [selected, setSelected] = useState(null);
  const dlgRef = useRef(null);
  const lastFocus = useRef(null);

  const list = useMemo(() => PROJECTS.filter(p =>
    (cat === 'All' || p.cat === cat) &&
    (p.title + ' ' + p.summary + ' ' + p.tools.join(' ')).toLowerCase().includes(query)
  ), [cat, query]);

  const openDlg = (p, el) => {
    lastFocus.current = el;
    setSelected(p);
    requestAnimationFrame(() => dlgRef.current && dlgRef.current.showModal());
  };
  const closeDlg = () => {
    dlgRef.current && dlgRef.current.close();
    if (lastFocus.current) lastFocus.current.focus();
  };

  return (
    <>
      <div className="work-tools rv">
        <input id="workSearch" type="search" placeholder="Search projects…" aria-label="Search projects"
          value={query} onChange={e => { setQuery(e.target.value.trim().toLowerCase()); setShown(PAGE); }} />
        <div id="filters" role="group" aria-label="Filter projects">
          {CATS.map(c => (
            <button key={c} type="button" className={'fchip' + (cat === c ? ' on' : '')}
              onClick={() => { setCat(c); setShown(PAGE); }}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid" id="workGrid">
        {list.slice(0, shown).map(p => (
          <button className="card" type="button" key={p.id} aria-label={'Open project: ' + p.title}
            onClick={e => openDlg(p, e.currentTarget)}>
            <div className="cover" style={{ background: p.grad }}>
              <span className="cat">{p.cat}</span><span className="yr">{p.year}</span>
              <span className="big" dangerouslySetInnerHTML={{ __html: p.big }} />
            </div>
            <div className="body">
              <h3>{p.title}</h3><p>{p.summary}</p>
              <div className="tags">{p.tools.slice(0, 3).map(t => <span key={t}>{t}</span>)}</div>
              <div className="go">View Project →</div>
            </div>
          </button>
        ))}
      </div>
      <p id="emptyWork" style={{ display: list.length ? 'block' : 'none' }}>
        No projects match that search yet.
      </p>
      {list.length > shown && (
        <button id="loadMore" type="button" onClick={() => setShown(shown + PAGE)}>Load More</button>
      )}

      <dialog id="dlg" ref={dlgRef} aria-labelledby="dlgTitle" onClick={e => { if (e.target === dlgRef.current) closeDlg(); }}>
        {selected && (
          <>
            <div className="dlg-cover" style={{ background: selected.grad }}>
              <span className="big" dangerouslySetInnerHTML={{ __html: selected.big }} />
              <button id="dlgClose" type="button" aria-label="Close project details" onClick={closeDlg}>✕</button>
            </div>
            <div className="dlg-body">
              <h3 id="dlgTitle">{selected.title}</h3>
              <div className="meta">{selected.cat} · {selected.year} · {selected.role}</div>
              <p>{selected.desc}</p>
              <div className="tags">{selected.tools.map(t => <span key={t}>{t}</span>)}</div>
              <div className="dlg-links">
                {selected.live && <a className="btn solid" href={selected.live} target="_blank" rel="noopener noreferrer">Visit Live →</a>}
              </div>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
