import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/work',    label: 'Work' },
    { to: '/skills',  label: 'Skills' },
    { to: '/about',   label: 'About' },
    { to: '/blog',    label: 'Blog' },
    { to: '/resume',  label: 'Resume' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">
        Harshita<span className="logo-accent">.</span>dev
        <span className="logo-ping" />
      </Link>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={() => setMenuOpen(false)}
            >
              {l.label === 'Resume' ? (
                <span className="nav-resume-label">
                  {l.label}
                  <span className="nav-resume-badge">PDF</span>
                </span>
              ) : l.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <a
          href="/resume.pdf"
          download="Harshita_Verma_Resume.pdf"
          className="nav-dl-btn"
          title="Download Resume"
          onClick={() => setMenuOpen(false)}
        >
          ↓ Resume
        </a>
        <button
          className="nav-btn"
          onClick={() => { navigate('/contact'); setMenuOpen(false); }}
        >
          Hire me →
        </button>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
