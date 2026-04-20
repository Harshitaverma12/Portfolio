import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="nf-code">404</div>
      <h1 className="nf-title">Page not found</h1>
      <p className="nf-sub">Looks like this page took a coffee break. Let's get you back on track.</p>
      <div className="nf-actions">
        <Link to="/" className="btn-glow">Go home</Link>
        <Link to="/work" className="btn-outline">View work</Link>
      </div>
    </main>
  );
}
