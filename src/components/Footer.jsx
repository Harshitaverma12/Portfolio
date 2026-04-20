import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">Harshita<span>.</span>dev</Link>
          <p className="footer-tagline">Frontend Engineer crafting scalable React experiences.</p>
          <a
            href="/resume.pdf"
            download="Harshita_Verma_Resume.pdf"
            className="footer-resume-btn"
          >
            ↓ Download Resume
          </a>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4>Navigate</h4>
            <Link to="/">Home</Link>
            <Link to="/work">Work</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="https://www.linkedin.com/in/harshita-verma-335b671b5/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:harshitaverma0526@gmail.com">Email</a>
            <a href="tel:+917268003334">+91-7268003334</a>
          </div>
          <div className="footer-col">
            <h4>More</h4>
            <Link to="/blog">Blog</Link>
            <Link to="/resume">View Resume</Link>
            <a href="/resume.pdf" download="Harshita_Verma_Resume.pdf">Download CV</a>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} Harshita Verma — Built with React &amp; lots of coffee</span>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/harshita-verma-335b671b5/" target="_blank" rel="noopener noreferrer">LI</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GH</a>
          <a href="mailto:harshitaverma0526@gmail.com">EM</a>
        </div>
      </div>
    </footer>
  );
}
