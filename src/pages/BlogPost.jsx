import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './BlogPost.css';

const POSTS_DATA = {
  'reusable-components-react': {
    title:'Building a Reusable Component Library in React',
    cat:'React', date:'April 10, 2026', readTime:'7 min read',
    content:[
      {type:'p',text:"After building component libraries for multiple enterprise projects — a Quotation System, a Delivery Portal, and a PMS — I've developed a clear set of principles for components that actually get reused."},
      {type:'h2',text:'Why reusability fails'},
      {type:'p',text:'Most component libraries fail not because the code is bad, but because the API is wrong. Components get props that are too specific to one use case, or too generic to be useful in any. The sweet spot is components that solve one problem extremely well.'},
      {type:'h2',text:'API design first'},
      {type:'p',text:'Before writing any JSX, write the usage. Sketch out how you want to call the component. If the usage looks clean, the implementation will follow naturally. If it looks messy, fix the API before you write the component.'},
      {type:'h2',text:'Custom hooks are your best friend'},
      {type:'p',text:'Logic that gets reused deserves a hook. In my projects, I extract data-fetching patterns, form state management, and AG-Grid configurations into custom hooks. This keeps components thin and the logic testable.'},
      {type:'h2',text:'Documentation is not optional'},
      {type:'p',text:'An undocumented component library will not be used. Even a simple README with usage examples is infinitely better than nothing. Use Storybook if the team will actually look at it — otherwise, colocated examples work fine.'},
    ],
  },
  'ag-grid-performance': {
    title:'AG-Grid Performance Tips for 100K Rows',
    cat:'Performance', date:'March 22, 2026', readTime:'6 min read',
    content:[
      {type:'p',text:'Working on the Quotation System at Proactive Data Systems, we had to display and manipulate thousands of rows of CRM data in AG-Grid without any lag. Here is what made the biggest difference.'},
      {type:'h2',text:'Enable Row Virtualisation'},
      {type:'p',text:'By default, AG-Grid renders all rows in the DOM. For large datasets, switch to the Server-Side Row Model or at minimum enable Row Virtualisation. This alone reduces DOM nodes from thousands to ~50.'},
      {type:'h2',text:'Freeze column definitions'},
      {type:'p',text:'Redefining columnDefs on every render triggers a full grid re-render. Move them outside the component or memoize with useMemo. This was our single biggest win — a 3× render speed improvement.'},
      {type:'h2',text:'Use valueFormatter, not cellRenderer'},
      {type:'p',text:'Cell renderers instantiate React components per cell. For simple formatting (currency, dates, percentages), use valueFormatter instead. Reserve cellRenderer for interactive cells that genuinely need React.'},
    ],
  },
};

const FALLBACK_POST = { title:'Blog Post', cat:'Writing', date:'2026', readTime:'5 min read', content:[{type:'p',text:'This post is coming soon!'}] };
const CAT_COLORS = { React:'cat-react', Performance:'cat-perf', Integration:'cat-ts', CSS:'cat-css', DevOps:'cat-test' };

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = POSTS_DATA[slug] || FALLBACK_POST;
  const heroRef = useScrollAnimation();
  const bodyRef = useScrollAnimation();
  useEffect(() => { window.scrollTo(0,0); }, [slug]);

  return (
    <main className="blog-post-page">
      <div className="bp-hero fade-up" ref={heroRef}>
        <div className="section-container">
          <button className="pd-back" onClick={()=>navigate('/blog')}>← Back to blog</button>
          <div className="bp-meta">
            <span className={`post-cat ${CAT_COLORS[post.cat]||'cat-react'}`}>{post.cat}</span>
            <span className="bp-date">{post.date}</span><span className="bp-sep">·</span><span className="bp-read">{post.readTime}</span>
          </div>
          <h1 className="bp-title">{post.title}</h1>
        </div>
      </div>
      <div className="section-container fade-up" ref={bodyRef}>
        <div className="bp-body">
          <article className="bp-content">
            {post.content.map((block,i)=>{
              if (block.type==='h2') return <h2 key={i} className="bp-h2">{block.text}</h2>;
              if (block.type==='p') return <p key={i} className="bp-p">{block.text}</p>;
              return null;
            })}
          </article>
          <div className="bp-sidebar">
            <div className="bp-author-card">
              <div className="author-avatar">HV</div>
              <div><div className="author-name">Harshita Verma</div><div className="author-role">Frontend Software Engineer</div></div>
            </div>
            <div className="bp-more"><div className="bp-more-title">More posts</div><Link to="/blog" className="bp-more-link">View all articles →</Link></div>
            <div className="bp-cta"><p>Want to work together?</p><Link to="/contact" className="btn-glow" style={{fontSize:'0.85rem',padding:'0.65rem 1.4rem'}}>Get in touch</Link></div>
          </div>
        </div>
      </div>
    </main>
  );
}
