import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './ProjectDetail.css';

const PROJECTS_DATA = {
  'ems': {
    title: 'Employee Management System',
    cat: 'HR Tech', year: '2024', role: 'Frontend Software Engineer',
    duration: 'Ongoing', company: 'Proactive Data Systems',
    stack: ['React', 'JavaScript', 'Redux', 'React Query', 'Ant Design', 'Material UI', 'HighCharts', 'Recharts', 'Tailwind CSS', 'Axios', 'XLSX'],
    liveUrl: '#', githubUrl: '#',
    overview: 'Developed a scalable React-based Performance Management System (PMS) to streamline the end-to-end employee appraisal lifecycle for employees, managers, and HR teams. The system handles multi-level evaluation workflows, real-time goal tracking, and consolidated performance dashboards.',
    challenge: 'The organization managed performance reviews through spreadsheets and email chains, making it impossible to track KRA progress in real time, enforce approval workflows, or get a unified view of team performance.',
    solution: 'Implemented a multi-level evaluation workflow with Redux for state management and React Query for server state. Built a goal management module enabling employees to manage KRAs, create custom goals, and track real-time weightage calculations, along with an approval workflow for goal validation. Introduced a "Not Applicable (NA)" feature with manager override, and designed self and team appraisal modules supporting ratings, feedback, and comparisons.',
    results: [
      'Streamlined end-to-end appraisal lifecycle for 150+ employees',
      'Goal import feature reduced setup time by 65%',
      'Real-time KRA tracking with weightage calculations',
      'Role-based access implemented across 5 user tiers',
      'Approval dashboards with drill-down insights for managers',
    ],
    accent: 'var(--accent)', bg: 'linear-gradient(135deg, #0d0820, #0c1a3a)',
  },
  'attendance': {
    title: 'Attendance Application',
    cat: 'HR Tech', year: '2024', role: 'Frontend Software Engineer',
    duration: 'Ongoing', company: 'Proactive Data Systems',
    stack: ['React', 'JavaScript', 'Ant Design', 'Tailwind CSS', 'Figma', 'Axios', 'XLSX', 'REST APIs'],
    liveUrl: '#', githubUrl: '#',
    overview: 'Developed a React-based Attendance Management System to digitize employee attendance, leave tracking, and work hours across multiple roles. The system provides full visibility into workforce attendance patterns and automates previously manual HR processes.',
    challenge: 'Employee attendance was tracked manually using registers and Excel sheets. There was no real-time visibility into who was present, no digital leave management, and no way to verify attendance integrity — leading to disputes and payroll errors.',
    solution: 'Built role-based dashboards for Admin, Managers, and Engineers with dynamic navigation. Created a real-time check-in/check-out system with selfie verification and persistent working-hour timer. Implemented JWT-based authentication with auto logout for session control. Designed attendance and leave reports with color-coded insights and Excel export. Added regularization requests and direct call logging with approval tracking.',
    results: [
      'Digitized attendance for 200+ employees',
      'Secure JWT authentication with auto-logout session control',
      'Role-based dashboards for Admin, Manager, and Engineer roles',
      'Excel export for payroll integration',
      'Reduced attendance disputes by 80%',
    ],
    accent: 'var(--accent3)', bg: 'linear-gradient(135deg, #060e14, #0d2218)',
  },
  'po-approval': {
    title: 'PO Approval System',
    cat: 'Finance', year: '2024', role: 'Frontend Software Engineer',
    duration: 'Ongoing', company: 'Proactive Data Systems',
    stack: ['React', 'JavaScript', 'Ant Design', 'Tailwind CSS', 'Figma', 'Axios', 'XLSX', 'REST APIs'],
    liveUrl: '#', githubUrl: '#',
    overview: 'Developed a Purchase Order (PO) Approval Portal to streamline the review and decision-making process for procurement. The portal provides finance and operations teams a centralized, auditable interface for managing PO approvals.',
    challenge: 'PO approvals were handled via email threads and manual sign-off sheets, with no audit trail. Urgent POs would get lost in inboxes, causing procurement delays and compliance issues during audits.',
    solution: 'Designed an interactive dashboard with personalized greetings and an animated pending PO counter. Built a data table displaying key PO details with actions: approve, reject (with mandatory comments and audit trail), and delegate using searchable employee selection. Enabled real-time updates for accurate status visibility. Created a detailed modal with vendor info, payment terms, line-item insights, and margin calculations. Implemented JWT-based authentication and custom session management with auto logout at midnight.',
    results: [
      'Full audit trail for every PO action',
      'Delegate feature reduced approval bottlenecks by 50%',
      'Real-time status visibility for procurement team',
      'JWT-based auth with auto-logout for compliance',
      'Reduced average PO approval time from 3 days to 4 hours',
    ],
    accent: 'var(--accent2)', bg: 'linear-gradient(135deg, #1a0810, #220d28)',
  },
  'managed-services': {
    title: 'Managed Services Dashboard',
    cat: 'Analytics', year: '2024', role: 'Lead Frontend Developer',
    duration: '5 months', company: 'Proactive Data Systems',
    stack: ['React', 'JavaScript', 'Recharts', 'Ant Design', 'Tailwind CSS', 'Figma', 'Axios', 'XLSX', 'REST APIs'],
    liveUrl: '#', githubUrl: '#',
    overview: 'Developed a React.js dashboard for managed service providers featuring role-based access for four user types. The platform provides centralized, real-time visibility into network infrastructure and collaboration tools for IT managed service teams.',
    challenge: 'Service teams were using 4–5 separate tools to monitor network health, track incidents, and report SLA compliance. There was no single pane of glass, causing slow incident detection and manual reporting overhead.',
    solution: 'Implemented dynamic navigation with role-based access for four user roles. Built RESTful API integration with token authentication, real-time data visualization using Recharts, and Excel/PDF export functionality. Constructed responsive UI components with Ant Design and Tailwind CSS. Centralized service monitoring reduced incident resolution time through real-time alerting.',
    results: [
      'Role-based access for 4 distinct user types',
      'Real-time dashboards with Recharts visualizations',
      'Excel/PDF export for SLA reporting',
      'Reduced incident resolution time by 30%',
      'Single pane of glass for 500+ monitored devices',
    ],
    accent: 'var(--accent4)', bg: 'linear-gradient(135deg, #1a1005, #0f1008)',
  },
  'quotation-system': {
    title: 'Quotation System',
    cat: 'CRM & ERP', year: '2023', role: 'Frontend Software Engineer',
    duration: 'Ongoing', company: 'Proactive Data Systems',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Material UI', 'ANTD', 'React Context', 'AG-Grid', 'React-Table-Next', 'Zoho CRM'],
    liveUrl: '#', githubUrl: '#',
    overview: 'Developed a React project integrating Zoho CRM to pre-fill MUI forms for structured deal tracking. The system allows users to submit, edit, export, and re-import data via React-Table-Next and Excel. An AG-Grid table centralizes deal monitoring and quotation standardization.',
    challenge: 'The sales team was creating quotations manually in spreadsheets with no CRM link, leading to stale data, duplicate entries, and no audit trail on deal changes.',
    solution: 'Integrated Zoho CRM API to auto-populate form fields from CRM deal data. Built AG-Grid table for high-performance deal monitoring with virtual scrolling. Implemented Excel export/import flow using react-table-next. Added unit tests with React Testing Library and end-to-end client tests for regression prevention.',
    results: [
      '60% improvement in data standardization',
      'Reusable component library adopted across 3 other modules',
      'Real-time CRM sync eliminated duplicate data entry',
      'Unit & E2E tests covering critical workflows',
      'Reduced quotation turnaround time by 45%',
    ],
    accent: 'var(--accent)', bg: 'linear-gradient(135deg, #0d0820, #0c1a3a)',
  },
  'enterprise-monitoring': {
    title: 'Proactive Enterprise Monitoring',
    cat: 'Network Monitoring', year: '2023', role: 'Frontend Developer',
    duration: '4 months', company: 'Proactive Data Systems',
    stack: ['React', 'Tailwind CSS', 'Highcharts', 'Material UI', 'JavaScript', 'Cisco DNA-C API'],
    liveUrl: '#', githubUrl: '#',
    overview: 'This project monitors VIP users\' network connectivity via Cisco DNA-C, categorizing network status as good, poor, or bad. It includes detailed 5-minute interval graphs and ticketing for proactive issue resolution, giving IT teams a clear picture of network health for critical users.',
    challenge: 'Prior to this system, there was no efficient method to assess network stability for VIP users. Issues were only discovered reactively when a VIP user complained — by which time meetings had already been disrupted.',
    solution: 'Built a React dashboard consuming Cisco DNA-C APIs to continuously poll VIP user device health. Implemented Highcharts for 5-minute interval time-series graphs with color-coded status (good/poor/bad). Built an integrated ticketing module for proactive issue escalation when metrics fall below threshold.',
    results: [
      'Proactive monitoring for VIP network users',
      '5-minute interval granularity for rapid issue detection',
      'Automated ticketing on threshold breaches',
      'Significantly enhanced client efficiency in network management',
      'Reduced VIP-reported incidents by 60%',
    ],
    accent: 'var(--accent3)', bg: 'linear-gradient(135deg, #051a1a, #080f18)',
  },
  'delivery-portal': {
    title: 'Delivery System',
    cat: 'Logistics', year: '2023', role: 'Frontend Software Engineer',
    duration: '3 months', company: 'Proactive Data Systems',
    stack: ['React', 'JavaScript', 'Material UI', 'SASS', 'Microsoft Business Central API', 'REST APIs'],
    liveUrl: '#', githubUrl: '#',
    overview: 'React portal integrating with Microsoft Business Central for real-time delivery management. Users update delivery dates via MUI components, improving communication and reducing errors across sales and logistics teams.',
    challenge: 'Sales and logistics teams were coordinating deliveries over phone calls and emails with no shared system. Manual data entry errors were causing wrong delivery dates to be communicated to customers.',
    solution: 'Built a React portal with direct Business Central API integration for live delivery data. Implemented MUI date-picker components for easy delivery date updates with real-time sync back to ERP. Added confirmation workflows to prevent accidental date changes.',
    results: [
      '70% reduction in manual data entry errors',
      'Real-time delivery visibility for sales & logistics teams',
      'Direct Business Central integration for live ERP sync',
      'Reduced customer complaints about delivery dates by 55%',
    ],
    accent: 'var(--accent2)', bg: 'linear-gradient(135deg, #0a1a10, #080e18)',
  },
  'cisco-touch': {
    title: 'Cisco Touch Customization',
    cat: 'IoT / Hardware', year: '2023', role: 'Frontend Developer',
    duration: '3 months', company: 'Proactive Data Systems',
    stack: ['JavaScript', 'XML', 'Cisco Macros', 'HTML5'],
    liveUrl: '#', githubUrl: '#',
    overview: 'Developed a Cisco Macro (JavaScript + XML) to add a Teams call option on Cisco Touch panels, enabling seamless call joining. Implemented multiple call modes for PWC and outsourced customers based on video ID, tenant domain, or meeting credentials.',
    challenge: 'Cisco Touch panels in conference rooms only supported native Cisco calls. Users couldn\'t join Microsoft Teams meetings directly from the panel, forcing them to use personal devices and causing friction during client meetings.',
    solution: 'Built a JavaScript + XML Cisco Macro that detects customer type (PWC vs outsourced) and presents the appropriate call mode. Implemented three call flows: video ID-based, tenant domain-based, and full credential-based Teams joining.',
    results: [
      'Teams call joining directly from Cisco Touch panels',
      'Improved accessibility and UX for 100+ users',
      'Three call modes for different customer configurations',
      'Zero support tickets related to room join issues post-launch',
      'Consistent experience across 25+ conference rooms',
    ],
    accent: 'var(--accent)', bg: 'linear-gradient(135deg, #1a0510, #0f0810)',
  },
  'elearning': {
    title: 'E-Learning Portal',
    cat: 'E-Learning', year: '2023', role: 'Frontend Developer',
    duration: '6 months', company: 'Corestrat',
    stack: ['React', 'Material UI', 'CSS3', 'Flexbox', 'Node.js', 'REST APIs'],
    liveUrl: '#', githubUrl: '#',
    overview: 'Created a React-based knowledge-sharing platform for onboarding and self-paced learning, featuring progress tracking and assessments. The portal streamlines knowledge transfer and reduces manager dependency during employee onboarding.',
    challenge: 'Employee onboarding was inconsistent and heavily manager-dependent. New hires had no structured learning path, causing longer ramp-up times and inconsistent knowledge across the team.',
    solution: 'Built a React LMS with structured course modules, progress tracking, quizzes, and completion indicators. Integrated with the backend REST API for content management and user progress persistence. Designed a clean, responsive UI with Material UI components.',
    results: [
      '50% improvement in onboarding speed',
      '35% decrease in manager oversight during onboarding',
      'Self-paced learning accessible to all employees',
      'Course completion rate of 87% in first quarter',
      'Scaled to 200+ employees',
    ],
    accent: 'var(--accent3)', bg: 'linear-gradient(135deg, #060e14, #0d2218)',
  },
  'corestrat-website': {
    title: 'Corestrat Website',
    cat: 'Web / CMS', year: '2023', role: 'Frontend Developer',
    duration: '2 months', company: 'Corestrat',
    stack: ['WordPress', 'HubSpot', 'CSS3', 'HTML5'],
    liveUrl: 'https://corestrat.ai', githubUrl: '#',
    overview: 'The Corestrat website was initially lacking content related to the products the company offers. Added comprehensive product and service content and integrated website forms with HubSpot for proper visitor data collection and lead management.',
    challenge: 'The website had very limited product information, causing potential clients to leave without understanding the company\'s offerings. Contact form submissions were not being captured in any CRM, losing valuable leads.',
    solution: 'Added structured product and service pages with a content-focused UX strategy. Connected all website contact forms with HubSpot CRM using the HubSpot Forms API, ensuring all lead data is properly captured and routed to the sales team.',
    results: [
      '60% increase in website engagement',
      'All contact forms integrated with HubSpot CRM',
      'Complete product/service content coverage',
      'Improved lead capture and routing to sales',
    ],
    accent: 'var(--accent2)', bg: 'linear-gradient(135deg, #1a1005, #0f1008)',
  },
  'hubspot-integration': {
    title: 'HubSpot & HnT Integration',
    cat: 'Integration', year: '2023', role: 'Frontend Developer',
    duration: '2 months', company: 'Corestrat',
    stack: ['Angular', 'WordPress', 'HubSpot', 'Bootstrap', 'CSS3', 'HTML5'],
    liveUrl: '#', githubUrl: '#',
    overview: 'Integrated HubSpot\'s hiring form with an Angular-based Hire & Train (HnT) platform to connect with Corestrat\'s website. The platform allows job applicants to take role-specific tests, view their results, and receive email notifications for interviews if they pass.',
    challenge: 'The hiring process was disjointed — applications came in through email, tests were sent manually, and there was no automated way to notify candidates of results or schedule interviews.',
    solution: 'Built an Angular-based candidate flow that integrates with HubSpot\'s form API. When a candidate applies via the website, their data flows into HubSpot and triggers the HnT test platform. Results are automatically evaluated and interview notifications sent via email for passing candidates.',
    results: [
      'Fully automated hiring funnel from application to interview invite',
      'Role-specific test assignment based on HubSpot data',
      'Automated email notifications for pass/fail outcomes',
      'Reduced manual HR effort in screening by 70%',
    ],
    accent: 'var(--accent4)', bg: 'linear-gradient(135deg, #0a1a0a, #0d2a1a)',
  },
};

const FALLBACK = {
  title: 'Project', cat: 'Case Study', year: '2024', role: 'Frontend Engineer',
  duration: '3 months', company: '',
  stack: ['React', 'JavaScript'],
  liveUrl: '#', githubUrl: '#',
  overview: 'Details for this project are coming soon.',
  challenge: 'Details coming soon.',
  solution: 'Details coming soon.',
  results: ['Coming soon'],
  accent: 'var(--accent)', bg: 'linear-gradient(135deg, #111124, #0d1020)',
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS_DATA[slug] || FALLBACK;
  const heroRef = useScrollAnimation();
  const bodyRef = useScrollAnimation();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  return (
    <main className="project-detail">
      <div className="pd-hero fade-up" ref={heroRef} style={{ background: project.bg }}>
        <div className="pd-hero-inner section-container">
          <button className="pd-back" onClick={() => navigate('/work')}>← Back to work</button>
          <div className="pd-meta-top">
            <span className="pd-cat">{project.cat}</span>
            <span className="pd-year">{project.year}</span>
          </div>
          <h1 className="pd-title">{project.title}</h1>
          <div className="pd-meta-row">
            <div className="pd-meta-item"><span className="pm-label">Role</span><span className="pm-val">{project.role}</span></div>
            {project.company && <div className="pd-meta-item"><span className="pm-label">Company</span><span className="pm-val">{project.company}</span></div>}
            <div className="pd-meta-item"><span className="pm-label">Duration</span><span className="pm-val">{project.duration}</span></div>
          </div>
          <div className="pd-stack">
            {project.stack.map(s => <span key={s} className="pd-tag">{s}</span>)}
          </div>
        </div>
      </div>

      <div className="section-container fade-up" ref={bodyRef}>
        <div className="pd-body">
          <div className="pd-content">
            <section className="pd-section">
              <h2 className="pd-section-title">Overview</h2>
              <p className="pd-text">{project.overview}</p>
            </section>
            <section className="pd-section">
              <h2 className="pd-section-title">The Challenge</h2>
              <p className="pd-text">{project.challenge}</p>
            </section>
            <section className="pd-section">
              <h2 className="pd-section-title">The Solution</h2>
              <p className="pd-text">{project.solution}</p>
            </section>
          </div>
          <div className="pd-sidebar">
            <div className="pd-results-card">
              <h3 className="pd-results-title">Key Results</h3>
              <ul className="pd-results-list">
                {project.results.map((r, i) => (
                  <li key={i} className="pd-result-item">
                    <span className="result-check">✓</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="pd-nav">
          <Link to="/work" className="btn-outline">← All projects</Link>
          <Link to="/contact" className="btn-glow">Start a project →</Link>
        </div>
      </div>
    </main>
  );
}
