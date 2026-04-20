import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./Blog.css";

const POSTS = [
  {
    id: 1,
    slug: "reusable-components-react",
    cat: "React",
    title: "Building a Reusable Component Library in React",
    excerpt:
      "After building component libraries for multiple enterprise projects, here's what I've learned about API design, naming conventions, and making components that actually get reused.",
    date: "Apr 10, 2026",
    readTime: "7 min read",
    featured: true,
  },
  {
    id: 2,
    slug: "ag-grid-performance",
    cat: "Performance",
    title: "AG-Grid Performance Tips for 100K Rows",
    excerpt:
      "Handling massive datasets in AG-Grid without freezing the browser — virtual scrolling, row models, and the configuration settings that actually matter.",
    date: "Mar 22, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 3,
    slug: "redux-vs-context",
    cat: "React",
    title: "Redux vs Context API: When to Use What",
    excerpt:
      "After using both extensively in production apps, I have a clear mental model for which tool fits which problem. Here it is.",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 4,
    slug: "zoho-crm-react",
    cat: "Integration",
    title: "Integrating Zoho CRM with a React Frontend",
    excerpt:
      "Zoho's API documentation is... okay. Here's the practical guide I wish I had when I started — auth, pagination, error handling, and gotchas.",
    date: "Feb 10, 2026",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: 5,
    slug: "tailwind-vs-mui",
    cat: "CSS",
    title: "Tailwind CSS vs Material UI: A Production Perspective",
    excerpt:
      "I've shipped projects with both. The honest comparison — performance, DX, design consistency, and when each actually wins.",
    date: "Jan 25, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 6,
    slug: "ci-cd-react",
    cat: "DevOps",
    title: "Setting Up CI/CD for a React App in 2026",
    excerpt:
      "A practical walkthrough of the GitHub Actions pipeline I use across all my projects — lint, test, build, deploy, done.",
    date: "Jan 8, 2026",
    readTime: "9 min read",
    featured: false,
  },
];

const CAT_COLORS = {
  React: "cat-react",
  Performance: "cat-perf",
  Integration: "cat-ts",
  CSS: "cat-css",
  DevOps: "cat-test",
};

export default function Blog() {
  const pageRef = useScrollAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <main className="blog-page">
      {/* Single container — no gap-causing nested fade-up divs */}
      <div className="section-container blog-container fade-up" ref={pageRef}>
        {/* Heading */}
        <div className="blog-heading">
          <div className="section-tag">Writing</div>
          <h1 className="section-title blog-h1">
            Thoughts &amp; <span className="grad-text">Articles</span>
          </h1>
          <p className="section-sub">
            I write about React, performance, integrations, and the craft of
            building scalable frontend systems.
          </p>
        </div>

        {/* Featured post — immediately after heading, no padding gap */}
        {featured && (
          <div
            className="featured-post"
            onClick={() => navigate(`/blog/${featured.slug}`)}
            data-hover="true"
          >
            <div className="featured-label">Featured post</div>
            <div className="featured-body">
              <span
                className={`post-cat ${CAT_COLORS[featured.cat] || "cat-react"}`}
              >
                {featured.cat}
              </span>
              <h2 className="featured-title">{featured.title}</h2>
              <p className="featured-excerpt">{featured.excerpt}</p>
              <div className="post-meta">
                <span>{featured.date}</span>
                <span className="meta-dot">·</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
            <div className="featured-arrow">→</div>
          </div>
        )}

        {/* Post grid */}
        <div className="posts-grid">
          {rest.map((post, i) => (
            <article
              key={post.id}
              className="post-card"
              onClick={() => navigate(`/blog/${post.slug}`)}
              style={{ animationDelay: `${i * 0.08}s` }}
              data-hover="true"
            >
              <div className="post-card-top">
                <span
                  className={`post-cat ${CAT_COLORS[post.cat] || "cat-react"}`}
                >
                  {post.cat}
                </span>
                <span className="post-card-date">{post.date}</span>
              </div>
              <h3 className="post-card-title">{post.title}</h3>
              <p className="post-card-excerpt">{post.excerpt}</p>
              <div className="post-card-foot">
                <span className="post-read">{post.readTime}</span>
                <span className="post-link">Read →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
