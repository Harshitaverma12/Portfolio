import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ParticleCanvas from './components/ParticleCanvas';
import Home from './pages/Home';
import Work from './pages/Work';
import Skills from './pages/Skills';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Resume from './pages/Resume';
import NotFound from './pages/NotFound';
import './styles/globals.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <Cursor />
      <ParticleCanvas />
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/work"       element={<Work />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/skills"     element={<Skills />} />
        <Route path="/about"      element={<About />} />
        <Route path="/blog"       element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact"    element={<Contact />} />
        <Route path="/resume"     element={<Resume />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}
