'use client';
import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [msg, setMsg] = useState('');

  const submit = e => {
    e.preventDefault();
    if (!name.trim() || !mail.trim() || !msg.trim()) { alert('Please fill in your name, email and message.'); return; }
    const body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + mail + ')');
    location.href = 'mailto:muhammadatharhse@gmail.com?subject=' +
      encodeURIComponent('Portfolio inquiry from ' + name) + '&body=' + body;
  };

  return (
    <section id="contact">
      <div className="sec-head rv"><span className="sec-no">Let&rsquo;s Build</span></div>
      <div className="contact-big rv">A safer<br /><span className="outline">site</span><span className="acc">.</span></div>
      <div className="contact-grid">
        <div className="rv">
          <div className="crow"><div><small>Email</small><b>muhammadatharhse@gmail.com</b></div><a className="arrow" href="mailto:muhammadatharhse@gmail.com" aria-label="Email Athar">→</a></div>
          <div className="crow"><div><small>WhatsApp / Phone</small><b>+92 341 4826804</b></div><a className="arrow" href="https://wa.me/923414826804?text=Hello%20Athar%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20HSE%20opportunity." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Athar">→</a></div>
          <div className="crow"><div><small>LinkedIn</small><b>linkedin.com/in/muhammad-athar-ba35a1257</b></div><a className="arrow" href="https://www.linkedin.com/in/muhammad-athar-ba35a1257" target="_blank" rel="noopener noreferrer" aria-label="Athar on LinkedIn">→</a></div>
          <div className="crow"><div><small>Fiverr — SafetyWithAthar</small><b>fiverr.com/safetywithathar</b></div><a className="arrow" href="https://www.fiverr.com/safetywithathar" target="_blank" rel="noopener noreferrer" aria-label="Athar on Fiverr">→</a></div>
          <div className="crow"><div><small>Location</small><b>Marot, Punjab, Pakistan — open to Gulf relocation</b></div></div>
        </div>
        <form className="rv" id="cform" noValidate onSubmit={submit}>
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="e.g. Ahmed Khan" value={name} onChange={e => setName(e.target.value)} />
          <label htmlFor="cf-mail">Your email</label>
          <input id="cf-mail" name="email" type="email" required autoComplete="email" placeholder="you@company.com" value={mail} onChange={e => setMail(e.target.value)} />
          <label htmlFor="cf-msg">Message</label>
          <textarea id="cf-msg" name="message" required placeholder="Tell me about the role or project…" value={msg} onChange={e => setMsg(e.target.value)} />
          <button className="btn solid" type="submit">Send via Email →</button>
          <p className="form-note">This opens your email app with the message pre-filled — nothing is sent until you press send there.</p>
        </form>
      </div>
    </section>
  );
}
