import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Work.css';

const ALL_PROJECTS = [
  {
    id:'01', cat:'HR Tech', title:'Employee Management System',
    desc:'Scalable React-based PMS streamlining end-to-end employee appraisal lifecycle with multi-level evaluation workflows, KRA goal management, self & team appraisal modules, and approval dashboards.',
    stack:['React','Redux','Ant Design','HighCharts','React Query','Tailwind CSS'],
    year:'2024', slug:'ems', bg:'bg1',
  },
  {
    id:'02', cat:'HR Tech', title:'Attendance Application',
    desc:'React-based Attendance Management System digitizing employee attendance, leave tracking, and work hours. Real-time check-in/check-out with selfie verification, JWT auth, and Excel export.',
    stack:['React','Ant Design','Tailwind CSS','Axios','XLSX'],
    year:'2024', slug:'attendance', bg:'bg2',
  },
  {
    id:'03', cat:'Finance', title:'PO Approval System',
    desc:'Purchase Order Approval Portal with interactive dashboard, animated pending PO counter, approve/reject workflows, delegate with searchable employee selection, and JWT-based session management.',
    stack:['React','Ant Design','Tailwind CSS','Axios','REST APIs'],
    year:'2024', slug:'po-approval', bg:'bg3',
  },
  {
    id:'04', cat:'Analytics', title:'Managed Services Dashboard',
    desc:'React.js dashboard for managed service providers with role-based access for four user types, real-time data visualization using Recharts, and Excel/PDF export for network & collaboration management.',
    stack:['React','Recharts','Ant Design','Tailwind CSS','Axios'],
    year:'2024', slug:'managed-services', bg:'bg4',
  },
  {
    id:'05', cat:'CRM & ERP', title:'Quotation System',
    desc:'React project integrating Zoho CRM to pre-fill MUI forms for structured deal tracking. Export/re-import via Excel, AG-Grid for deal monitoring, and unit tests via React Testing Library.',
    stack:['React','MUI','AG-Grid','Zoho CRM','React Context','ANTD'],
    year:'2023', slug:'quotation-system', bg:'bg5',
  },
  {
    id:'06', cat:'Network Monitoring', title:'Proactive Enterprise Monitoring',
    desc:'Monitors VIP users\' network connectivity via Cisco DNA-C, categorizing status as good/poor/bad with detailed 5-minute interval graphs and proactive ticketing for issue resolution.',
    stack:['React','Highcharts','Material UI','Tailwind CSS','JavaScript'],
    year:'2023', slug:'enterprise-monitoring', bg:'bg6',
  },
  {
    id:'07', cat:'Logistics', title:'Delivery System',
    desc:'React portal integrating with Microsoft Business Central for real-time delivery management. Users update delivery dates via MUI components, reducing manual errors and improving logistics communication.',
    stack:['React','Material UI','SASS','Business Central','JavaScript'],
    year:'2023', slug:'delivery-portal', bg:'bg1',
  },
  {
    id:'08', cat:'IoT / Hardware', title:'Cisco Touch Customization',
    desc:'Cisco Macro (JavaScript + XML) adding Teams call option on Cisco Touch panels. Multiple call modes for PWC and outsourced customers based on video ID, tenant domain, or meeting credentials.',
    stack:['JavaScript','XML','Cisco Macros'],
    year:'2023', slug:'cisco-touch', bg:'bg2',
  },
  {
    id:'09', cat:'E-Learning', title:'E-Learning Portal',
    desc:'React-based knowledge-sharing platform for onboarding and self-paced learning with progress tracking and assessments. Reduced manager onboarding effort and enhanced cross-functional skill building.',
    stack:['React','Material UI','CSS3','Flexbox'],
    year:'2023', slug:'elearning', bg:'bg3',
  },
  {
    id:'10', cat:'Web / CMS', title:'Corestrat Website',
    desc:'Revamped company website with modular design, added product content, and integrated website forms with HubSpot for proper visitor data collection. Led to 60% increase in engagement.',
    stack:['WordPress','HubSpot','CSS3'],
    year:'2023', slug:'corestrat-website', bg:'bg4',
  },
  {
    id:'11', cat:'Integration', title:'HubSpot & HnT Integration',
    desc:'Integrated HubSpot\'s hiring form with an Angular-based platform. Allows job applicants to take role-specific tests, view results, and receive email notifications for interviews if they pass.',
    stack:['Angular','WordPress','HubSpot','Bootstrap','CSS3'],
    year:'2023', slug:'hubspot-integration', bg:'bg5',
  },
];

export default function Work() {
  const heroRef = useScrollAnimation();
  const gridRef = useScrollAnimation();
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="work-page">
      <div className="work-hero section-container fade-up" ref={heroRef}>
        <div className="section-tag">Portfolio</div>
        <h1 className="section-title work-h1">All <span className="grad-text">Projects</span></h1>
        <p className="section-sub">
          3 years of shipping production-grade applications across HR tech, analytics, CRM, logistics, IoT, and e-learning.
        </p>
      </div>

      <div className="work-grid-wrap section-container fade-up" ref={gridRef}>
        <div className="work-grid">
          {ALL_PROJECTS.map((p, i) => (
            <article
              key={p.id}
              className={`work-card ${p.bg}`}
              onClick={() => navigate(`/work/${p.slug}`)}
              style={{ animationDelay: `${i * 0.07}s` }}
              data-hover="true"
            >
              <div className="wcard-top">
                <span className="wcard-num">{p.id}</span>
                <span className="wcard-year">{p.year}</span>
              </div>
              <div className="wcard-body">
                <span className="wcard-cat">{p.cat}</span>
                <h2 className="wcard-title">{p.title}</h2>
                <p className="wcard-desc">{p.desc}</p>
              </div>
              <div className="wcard-foot">
                <div className="wcard-stack">
                  {p.stack.slice(0, 4).map(s => <span key={s} className="wcard-tag">{s}</span>)}
                </div>
                <span className="wcard-arrow">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
