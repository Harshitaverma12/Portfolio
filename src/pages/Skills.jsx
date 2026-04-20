import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Skills.css';

const SKILLS = [
  { icon:'⚛', name:'React.js & Next.js', desc:'Architecting scalable SPAs and SSR apps with reusable component libraries, custom hooks, Context API, and modern React patterns.', tags:['Hooks','Context API','Next.js','Custom Hooks'], level:95, cls:'si1' },
  { icon:'◈', name:'JavaScript ES6+', desc:'Deep expertise in modern JS — async/await, closures, destructuring, modules, and performance-optimized code patterns.', tags:['ES6+','Async/Await','Webpack','Babel'], level:93, cls:'si2' },
  { icon:'✦', name:'UI Libraries & CSS', desc:'Pixel-perfect responsive UIs with Tailwind CSS, Material UI, Ant Design, Bootstrap, SASS, and Flexbox/Grid layouts.', tags:['Tailwind','MUI','ANTD','SASS'], level:92, cls:'si3' },
  { icon:'◎', name:'State Management', desc:'Complex state with Redux (Toolkit), React Query, and Context API across large-scale enterprise applications.', tags:['Redux','Redux Toolkit','React Query','Context API'], level:90, cls:'si4' },
  { icon:'⬡', name:'Data Visualization', desc:'Recharts, Chart.js, and HighCharts for dashboards. AG-Grid and React-Table-Next for high-performance data tables with virtual scrolling.', tags:['Recharts','HighCharts','Chart.js','AG-Grid'], level:88, cls:'si5' },
  { icon:'▲', name:'APIs & Real-time', desc:'RESTful API integrations, Axios for HTTP, Socket.io and WebSocket for real-time features across attendance, monitoring, and collaboration tools.', tags:['REST APIs','Axios','Socket.io','WebSocket'], level:87, cls:'si6' },
  { icon:'◷', name:'Angular & Node.js', desc:'Frontend development with Angular for enterprise integrations and Node.js for full-stack feature delivery.', tags:['Angular','Node.js','Express','Bootstrap'], level:76, cls:'si7' },
  { icon:'◑', name:'DevOps & Cloud', desc:'GitHub/GitLab version control, CI/CD pipeline setup, Docker containerization, AWS basics, and Postman for API testing.', tags:['Git','CI/CD','Docker','AWS'], level:74, cls:'si8' },
];

const TOOLS = [
  {name:'Figma',cat:'Design'},{name:'VS Code',cat:'Editor'},{name:'GitHub',cat:'Version Control'},
  {name:'GitLab',cat:'Version Control'},{name:'Postman',cat:'API Testing'},{name:'Chrome DevTools',cat:'Debug'},
  {name:'AG-Grid',cat:'Data Tables'},{name:'Zoho CRM',cat:'CRM'},{name:'Zoho People',cat:'HR Platform'},
  {name:'Business Central',cat:'ERP'},{name:'HubSpot',cat:'CRM'},{name:'WordPress',cat:'CMS'},
  {name:'Docker',cat:'DevOps'},{name:'AWS',cat:'Cloud'},{name:'Cisco DNA-C',cat:'Network'},
];

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => {
        el.classList.add('visible');
        const b = el.querySelector('.sk-fill');
        if (b) b.classList.add('animate');
      }, index * 100);
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [index]);

  const onMouseMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
    e.currentTarget.style.setProperty('--my', ((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
  };

  return (
    <div ref={ref} className="sk-card fade-up" onMouseMove={onMouseMove} data-hover="true">
      <div className={`sk-icon ${skill.cls}`}>{skill.icon}</div>
      <div className="sk-name">{skill.name}</div>
      <div className="sk-desc">{skill.desc}</div>
      <div className="sk-tags">{skill.tags.map(t => <span key={t} className="sk-tag">{t}</span>)}</div>
      <div className="sk-bar"><div className="sk-fill" style={{ width:`${skill.level}%` }}/><span className="sk-pct">{skill.level}%</span></div>
    </div>
  );
}

export default function Skills() {
  const heroRef = useScrollAnimation();
  const toolsRef = useScrollAnimation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="skills-page">
      <div className="section-container fade-up" ref={heroRef}>
        <div className="section-tag">Expertise</div>
        <h1 className="section-title skills-h1">Tech <span className="grad-text">Stack</span></h1>
        <p className="section-sub">Technologies and tools I've used across 3 years of building production-grade React applications.</p>
        <div className="skills-grid">
          {SKILLS.map((s, i) => <SkillCard key={s.name} skill={s} index={i}/>)}
        </div>
      </div>

      <div className="section-container fade-up" ref={toolsRef}>
        <div className="section-tag">Toolbox</div>
        <h2 className="section-title">Tools I use daily</h2>
        <div className="tools-grid">
          {TOOLS.map(t => (
            <div key={t.name} className="tool-chip" data-hover="true">
              <span className="tool-name">{t.name}</span>
              <span className="tool-cat">{t.cat}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
