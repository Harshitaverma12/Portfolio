import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './About.css';

const EXPERIENCE = [
  {
    date:'Jul 2023 — Present', role:'Frontend Software Engineer', company:'Proactive Data Systems',
    desc:'Architecting React-based enterprise solutions — Quotation System (Zoho CRM + AG-Grid), Delivery Management Portal (Business Central), Performance Management System (Zoho People), and Cisco Gold Audit Analytics Platform. Reduced manual errors by 70%, cut reporting effort by 40%, and achieved 30% faster incident response.',
  },
  {
    date:'Jan 2023 — Jun 2023', role:'Frontend Developer', company:'Corestrat',
    desc:'Spearheaded development of an E-learning Portal using React, improving onboarding speed by 50% and reducing manager oversight by 35%. Revamped company website with modular design, resulting in a 60% increase in engagement.',
  },
];

const EDUCATION = [
  { degree:'Master of Computer Applications (MCA)', school:'Christ (Deemed to be University)', year:'Jul 2021 – Jul 2023', score:'70.3%' },
  { degree:'Bachelor of Computer Applications (BCA)', school:'Banasthali Vidyapith', year:'Jul 2018 – May 2021', score:'84.0%' },
];

export default function About() {
  const heroRef = useScrollAnimation();
  const expRef = useScrollAnimation();
  const eduRef = useScrollAnimation();
  const valuesRef = useScrollAnimation();
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <main className="about-page">
      <div className="about-hero section-container fade-up" ref={heroRef}>
        <div className="section-tag">About</div>
        <h1 className="section-title about-h1">The engineer behind<br/><span className="grad-text">the code</span></h1>
        <div className="about-intro">
          <div className="about-avatar">
            <div className="avatar-ring"/>
            <div className="avatar-inner"><span className="avatar-initials">HV</span></div>
          </div>
          <div className="about-bio">
            <p>Hi, I'm Harshita — a Frontend Software Engineer with 3 years of experience architecting, developing, and optimizing scalable web applications using React.js, JavaScript (ES6+), and modern frontend ecosystems.</p>
            <p>I specialize in designing reusable component libraries, enhancing performance, and ensuring high code quality through testing and best practices. I'm experienced in RESTful integrations, CI/CD pipelines, and Agile delivery models.</p>
            <p>I'm adept at mentoring engineers, driving technical discussions, and collaborating cross-functionally to deliver high-impact user experiences. When I'm not building, I'm learning — the ecosystem never stops evolving and neither do I.</p>
            <div className="about-actions">
              <Link to="/contact" className="btn-glow">Work with me</Link>
              <Link to="/resume" className="btn-outline">View Resume →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container fade-up" ref={expRef}>
        <div className="section-tag">Journey</div>
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {EXPERIENCE.map((e,i)=>(
            <div key={i} className="tl-item">
              <div className="tl-dot"/>
              <div className="tl-date">{e.date}</div>
              <div className="tl-role">{e.role}</div>
              <div className="tl-co">{e.company}</div>
              <div className="tl-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-container fade-up" ref={eduRef}>
        <div className="section-tag">Education</div>
        <h2 className="section-title">Qualifications</h2>
        <div className="edu-grid">
          {EDUCATION.map((e,i)=>(
            <div key={i} className="edu-card" data-hover="true">
              <div className="edu-icon">◎</div>
              <div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-meta"><span>{e.year}</span><span className="edu-score">{e.score}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-container fade-up" ref={valuesRef}>
        <div className="section-tag">Approach</div>
        <h2 className="section-title">What I believe in</h2>
        <div className="values-grid">
          {[
            {icon:'◆',title:'Reusability first',desc:'I design component libraries and custom hooks that reduce duplication and scale across modules.'},
            {icon:'◇',title:'Performance matters',desc:'Bundle optimization, code splitting, and real-time sync improvements are part of every project I ship.'},
            {icon:'◈',title:'Agile & collaborative',desc:'I thrive in cross-functional teams, leading technical discussions and mentoring junior engineers.'},
            {icon:'◉',title:'User-centric thinking',desc:'Every feature I build starts with the end user — accessibility, usability, and engagement guide my decisions.'},
          ].map(v=>(
            <div key={v.title} className="value-card" data-hover="true">
              <div className="value-icon">{v.icon}</div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
