import { useEffect, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./Resume.css";

export default function Resume() {
  const heroRef = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Harshita_Verma_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="resume-page">
      <div className="resume-hero section-container fade-up" ref={heroRef}>
        <div className="resume-hero-left">
          <div className="section-tag">Resume</div>
          <h1 className="section-title resume-h1">
            My <span className="grad-text">Resume</span>
          </h1>
          <p className="section-sub" style={{ marginBottom: "2rem" }}>
            3 years of frontend engineering experience — React.js, JavaScript
            ES6+, enterprise integrations, and high-impact product delivery.
          </p>
          <div className="resume-actions">
            <button className="btn-glow resume-dl-btn" onClick={handleDownload}>
              <span className="dl-icon">↓</span>
              Download PDF
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Open in new tab ↗
            </a>
          </div>

          <div className="resume-highlights">
            <div className="rh-item">
              <span className="rh-icon">◆</span>
              <div>
                <div className="rh-label">Current role</div>
                <div className="rh-val">
                  Software Engineer @ Proactive Data Systems
                </div>
              </div>
            </div>
            <div className="rh-item">
              <span className="rh-icon">◈</span>
              <div>
                <div className="rh-label">Experience</div>
                <div className="rh-val">3 Years — Frontend Development</div>
              </div>
            </div>
            <div className="rh-item">
              <span className="rh-icon">◉</span>
              <div>
                <div className="rh-label">Education</div>
                <div className="rh-val">MCA — Christ University (70.3%)</div>
              </div>
            </div>
            <div className="rh-item">
              <span className="rh-icon">◇</span>
              <div>
                <div className="rh-label">Contact</div>
                <div className="rh-val">
                  <a
                    href="mailto:harshitaverma0526@gmail.com"
                    className="rh-link"
                  >
                    harshitaverma0526@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="resume-hero-right">
          <div className="resume-quick-stats">
            {[
              { num: "11+", label: "Projects shipped" },
              { num: "3yr", label: "Experience" },
              { num: "70%", label: "Error reduction" },
              { num: "60%", label: "Faster systems" },
            ].map((s) => (
              <div key={s.label} className="rqs-card">
                <div className="rqs-num">{s.num}</div>
                <div className="rqs-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
