import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./BlogPost.css";

const POSTS_DATA = {
  /* ─── 1. Reusable Component Library ─────────────────────── */
  "reusable-components-react": {
    title: "Building a Reusable Component Library in React",
    cat: "React",
    date: "April 10, 2026",
    readTime: "7 min read",
    content: [
      {
        type: "p",
        text: "After building component libraries for multiple enterprise projects — a Quotation System, a Delivery Portal, and a PMS — I've developed a clear set of principles for components that actually get reused across modules, teams, and codebases.",
      },
      { type: "h2", text: "Why most component libraries fail" },
      {
        type: "p",
        text: "Most component libraries fail not because the code is bad, but because the API is wrong. Components get props that are too specific to one use case, or too generic to be useful in any. The sweet spot is a component that solves one problem extremely well, with a clean, predictable interface.",
      },
      { type: "h2", text: "API design first — always" },
      {
        type: "p",
        text: "Before writing a single line of JSX, write the usage. Sketch out how you want to call the component in the consuming file. If the import and props look clean and readable, the implementation will follow naturally. If the usage looks messy, fix the API before you write the component — not after.",
      },
      { type: "h2", text: "Composition over configuration" },
      {
        type: "p",
        text: "One of the biggest mistakes I see is trying to handle every variant through props — isLarge, isPrimary, hasIcon, withBorder. This creates an explosion of boolean props and complex internal logic. Prefer composition instead: let consumers slot in children, pass render props, or compose multiple small components together. The result is far more flexible and far easier to read.",
      },
      { type: "h2", text: "Custom hooks are your best friend" },
      {
        type: "p",
        text: "Logic that gets reused deserves a hook. In my projects, I extract data-fetching patterns, form state management, and AG-Grid configurations into custom hooks. This keeps components thin, the logic portable, and the whole thing unit-testable without needing to mount a component at all.",
      },
      { type: "h2", text: "Strict TypeScript contracts" },
      {
        type: "p",
        text: "Every component in a shared library should have a fully typed props interface. No 'any', no optional props that silently do nothing. TypeScript turns your component API into living documentation — autocomplete tells consumers exactly what they can pass. When I introduced strict typing to our Quotation System components, the number of integration bugs dropped significantly.",
      },
      { type: "h2", text: "Documentation is not optional" },
      {
        type: "p",
        text: "An undocumented component library will not get used — developers will just rewrite things from scratch rather than dig through source code. Even a simple README with usage examples is infinitely better than nothing. Use Storybook if the team will actually open it; otherwise, colocated usage examples in the component folder work perfectly well.",
      },
      { type: "h2", text: "Versioning and change management" },
      {
        type: "p",
        text: "Once a component library is being consumed across multiple modules, breaking changes are costly. Treat your component APIs like public APIs — communicate changes clearly, deprecate before removing, and keep a changelog. This discipline pays off enormously as teams grow.",
      },
    ],
  },

  /* ─── 2. AG-Grid Performance ─────────────────────────────── */
  "ag-grid-performance": {
    title: "AG-Grid Performance Tips for 100K Rows",
    cat: "Performance",
    date: "March 22, 2026",
    readTime: "6 min read",
    content: [
      {
        type: "p",
        text: "Working on the Quotation System at Proactive Data Systems, we had to display and manipulate thousands of rows of CRM data in AG-Grid without any lag. After a lot of profiling and experimentation, here's what actually made the biggest difference — no theory, just production-tested fixes.",
      },
      { type: "h2", text: "Enable Row Virtualisation" },
      {
        type: "p",
        text: "By default, AG-Grid renders all visible rows in the DOM. For large datasets, switch to the Server-Side Row Model or at minimum enable Row Virtualisation. This reduces active DOM nodes from thousands down to roughly 50 at any given time, which is the single biggest performance lever available.",
      },
      { type: "h2", text: "Freeze your column definitions" },
      {
        type: "p",
        text: "Redefining columnDefs on every render triggers a full grid re-render — AG-Grid treats it as a completely new column configuration. Move your column definitions outside the component entirely, or memoize with useMemo and an empty dependency array. This was our single biggest win, delivering roughly a 3x improvement in render speed on our largest grids.",
      },
      { type: "h2", text: "Use valueFormatter instead of cellRenderer" },
      {
        type: "p",
        text: "Cell renderers instantiate full React components for every cell in the visible viewport. For simple display formatting — currency, dates, percentages, status labels — use valueFormatter instead. It runs as a pure function with no React overhead. Reserve cellRenderer for cells that genuinely need interactivity: buttons, dropdowns, or complex custom UI.",
      },
      { type: "h2", text: "Debounce filter and sort events" },
      {
        type: "p",
        text: "If you're fetching data from the server on every filter or sort change, add a debounce of 300–400ms before firing the API call. Users type faster than servers respond, and without debouncing you'll fire 10 requests for a single search term. AG-Grid's onFilterChanged and onSortChanged callbacks are the right hooks for this.",
      },
      { type: "h2", text: "Immutable data and deltaRowDataMode" },
      {
        type: "p",
        text: "When updating grid data, pass the new array reference and enable deltaRowDataMode. This tells AG-Grid to diff the old and new datasets and only re-render changed rows, rather than destroying and recreating the entire row set. Combined with stable row IDs via getRowId, this makes live data updates essentially flicker-free.",
      },
      { type: "h2", text: "Suppress unnecessary recalculations" },
      {
        type: "p",
        text: "Turn off features you don't need: suppressColumnVirtualisation should stay off unless you have very few columns, but suppressRowHoverHighlight, suppressCellFocus, and disabling animations can all reduce the per-frame work significantly on slower hardware. Profile first with Chrome DevTools, then turn things off methodically.",
      },
    ],
  },

  /* ─── 3. Redux vs Context API ────────────────────────────── */
  "redux-vs-context": {
    title: "Redux vs Context API: When to Use What",
    cat: "React",
    date: "February 28, 2026",
    readTime: "5 min read",
    content: [
      {
        type: "p",
        text: "After using both extensively across enterprise applications — the PMS, the Delivery Portal, the PO Approval System — I've built a clear mental model for which tool belongs in which situation. The short answer: most apps don't need Redux. But some absolutely do. Here's exactly how to tell the difference.",
      },
      { type: "h2", text: "What Context API is actually good at" },
      {
        type: "p",
        text: "Context is excellent for state that is read frequently but written rarely: the current user, the theme, the locale, feature flags, authentication status. It was designed for this — sharing a value deep in a component tree without prop-drilling. When the state changes infrequently and the consumers just need to read it, Context is clean, simple, and requires zero dependencies.",
      },
      { type: "h2", text: "Where Context falls apart" },
      {
        type: "p",
        text: "Context has one serious flaw: every component that consumes a context re-renders whenever any value in that context changes, even if the specific value they use hasn't changed. In our PMS application, we made the mistake of putting too much server state into a single context. Every API response caused unnecessary re-renders across the entire tree, and the UI started feeling sluggish. The fix was splitting contexts and moving to React Query for server state — but Redux would have solved it too.",
      },
      { type: "h2", text: "When Redux is the right call" },
      {
        type: "p",
        text: "Redux earns its place in three scenarios: complex state that many parts of the app read and write concurrently, state that needs to be updated in response to actions from many sources, and situations where you need a full audit trail of state changes for debugging. The Redux DevTools time-travel debugger is genuinely invaluable when chasing subtle bugs in complex workflows — something Context simply cannot match.",
      },
      { type: "h2", text: "Redux Toolkit changed the calculus" },
      {
        type: "p",
        text: "The old complaints about Redux — boilerplate, too many files, action creators for everything — are largely solved by Redux Toolkit. createSlice and createAsyncThunk reduce the code to a fraction of what it used to be. If you're still avoiding Redux because of the old patterns, give RTK a fresh look. It's a dramatically better experience.",
      },
      { type: "h2", text: "The rule I follow" },
      {
        type: "p",
        text: "My rule: use Context for UI state (theme, sidebar open/closed, modal visibility) and authentication. Use React Query or SWR for server state (API data, loading states, caching). Reach for Redux only when you have genuinely complex client-side business logic that doesn't come from the server and is shared across many parts of the app. Most projects never hit that threshold — but enterprise apps often do.",
      },
      { type: "h2", text: "The real answer" },
      {
        type: "p",
        text: "The best state management solution is the simplest one that solves your actual problem. Don't install Redux as a default — but don't dismiss it either. Know both tools deeply, and you'll always know which one to reach for.",
      },
    ],
  },

  /* ─── 4. Zoho CRM + React ────────────────────────────────── */
  "zoho-crm-react": {
    title: "Integrating Zoho CRM with a React Frontend",
    cat: "Integration",
    date: "February 10, 2026",
    readTime: "8 min read",
    content: [
      {
        type: "p",
        text: "I spent months integrating Zoho CRM into a React-based Quotation System at Proactive Data Systems. Zoho's API documentation is functional, but it leaves a lot of gaps around authentication flows, pagination edge cases, and error handling patterns. This is the guide I wish I'd had from day one.",
      },
      { type: "h2", text: "Authentication: OAuth 2.0 the right way" },
      {
        type: "p",
        text: "Zoho uses OAuth 2.0 with a self-client or server-based authorization flow. For React apps, never expose your client secret in frontend code. The correct pattern is a thin backend (Node.js, serverless function, or your existing API) that handles the token exchange and stores the refresh token securely. Your React app calls your backend, which calls Zoho — never Zoho directly from the browser.",
      },
      { type: "h2", text: "Token refresh and expiry" },
      {
        type: "p",
        text: "Zoho access tokens expire after one hour. Build an Axios interceptor that catches 401 responses, automatically calls your refresh endpoint, and retries the failed request. Without this, your users will hit mysterious 'unauthorized' errors mid-session. The interceptor pattern keeps this logic in one place and completely transparent to every API call in your app.",
      },
      { type: "h2", text: "Fetching records: pagination and rate limits" },
      {
        type: "p",
        text: "Zoho's API returns a maximum of 200 records per request. If you need more, you must implement cursor-based pagination using the more_records flag and the per_page and page parameters. Additionally, Zoho enforces rate limits — 5000 API calls per day on most plans. Cache aggressively: store fetched records in React Query with a reasonable stale time, and avoid refetching on every component mount.",
      },
      { type: "h2", text: "Pre-filling forms from CRM deal data" },
      {
        type: "p",
        text: "In our Quotation System, the primary use case was loading a Zoho Deal and pre-populating an MUI form. The key insight: Zoho field names use snake_case with module prefixes (e.g. Deal_Name, Account_Name, Amount). Map them explicitly to your form state in a dedicated transformer function rather than spreading the Zoho response directly — this decouples your form from Zoho's schema and makes future changes much easier.",
      },
      { type: "h2", text: "Handling Zoho API errors gracefully" },
      {
        type: "p",
        text: "Zoho returns errors in a non-standard format — a data array with code and message fields rather than a standard HTTP error body. Write a dedicated error parser that normalizes Zoho errors into your app's error format. Common errors to handle explicitly: INVALID_TOKEN (trigger a refresh), INVALID_DATA (show field-specific validation messages), and LIMIT_REACHED (show a friendly rate limit warning).",
      },
      { type: "h2", text: "Bi-directional sync: writing back to Zoho" },
      {
        type: "p",
        text: "Writing back to Zoho requires PUT requests to the /crm/v3/Deals/{id} endpoint with only the changed fields in the body. Use optimistic updates in your UI — update the local state immediately and roll back on failure. This makes the app feel instant even on slower connections. Add a visual indicator (a subtle 'syncing' badge on the record) so users know the save is in progress.",
      },
      { type: "h2", text: "Testing Zoho integrations" },
      {
        type: "p",
        text: "Mock the Zoho API responses using MSW (Mock Service Worker) in development and tests. This lets your team work without hitting rate limits, test error states that are hard to reproduce with the real API, and run CI tests without Zoho credentials. Define your mock handlers to match the exact Zoho response schema, and your tests will accurately reflect real-world behavior.",
      },
    ],
  },

  /* ─── 5. Tailwind vs MUI ─────────────────────────────────── */
  "tailwind-vs-mui": {
    title: "Tailwind CSS vs Material UI: A Production Perspective",
    cat: "CSS",
    date: "January 25, 2026",
    readTime: "6 min read",
    content: [
      {
        type: "p",
        text: "I've shipped production applications with both Tailwind CSS and Material UI — sometimes on the same project. After years of using both in real enterprise contexts, I have strong opinions about when each one wins. This isn't a benchmark — it's a developer experience report from the trenches.",
      },
      { type: "h2", text: "The core philosophical difference" },
      {
        type: "p",
        text: "Tailwind is a set of low-level utility classes — it gives you the primitives and trusts you to build the design. Material UI is a component system — it gives you pre-built components that implement Google's Material Design spec. This difference in philosophy drives everything else: bundle size, design consistency, customizability, and the kind of applications each one is suited for.",
      },
      { type: "h2", text: "When Tailwind wins" },
      {
        type: "p",
        text: "Tailwind is the right call when you have a custom design system that doesn't map to Material Design, or when you're working directly with a Figma spec where the designer has defined their own tokens. Tailwind's utility classes give you exact control without fighting a component library's default styles. It also produces much smaller CSS bundles in production thanks to its purge step — only the classes you actually use get included. For marketing pages, portfolios, and custom product UIs, Tailwind is my default.",
      },
      { type: "h2", text: "When Material UI wins" },
      {
        type: "p",
        text: "MUI wins on internal tools, admin dashboards, and enterprise applications where design velocity matters more than visual uniqueness. The component library covers nearly every UI pattern you'll need — data tables, date pickers, dialogs, autocomplete, stepper — all with built-in accessibility, keyboard navigation, and RTL support. In our PMS and Attendance Application, using MUI let us move extremely fast without reinventing components that are genuinely hard to build correctly.",
      },
      { type: "h2", text: "Bundle size and performance" },
      {
        type: "p",
        text: "MUI v5 ships with emotion as its CSS-in-JS engine, which adds to your runtime bundle and has a non-zero cost at render time. Tailwind, being utility-first, adds almost nothing at runtime — styles are just classes. For performance-critical public-facing pages, this matters. For internal dashboards where the initial load is a one-time cost per session, it's largely irrelevant.",
      },
      { type: "h2", text: "Theming and customization" },
      {
        type: "p",
        text: "Both support theming, but in completely different ways. MUI's theme system is deeply integrated — you can override every component's default styles through a centralized theme object, which is powerful but can be complex to get right. Tailwind's theme is a config file where you define your design tokens (colors, spacing, fonts), and they flow through as utility classes. I find Tailwind's approach more transparent — you always know exactly which token maps to which output.",
      },
      { type: "h2", text: "The combination that works best" },
      {
        type: "p",
        text: "On several projects I've used both together: MUI for complex interactive components (autocomplete, date picker, data table) and Tailwind for layout, spacing, and custom sections. This hybrid approach is underrated. You get MUI's accessibility and complex component logic for free, while keeping the layout flexibility that Tailwind excels at. Just make sure to configure your Tailwind important strategy to avoid specificity conflicts with MUI's emotion styles.",
      },
      { type: "h2", text: "My recommendation" },
      {
        type: "p",
        text: "Custom product or marketing site → Tailwind. Internal tool or data-heavy dashboard → MUI. Complex application needing both fast development and custom design → use both strategically. The worst outcome is choosing one for dogmatic reasons and spending weeks fighting it. Know both, pick the right tool for the context.",
      },
    ],
  },

  /* ─── 6. CI/CD for React ─────────────────────────────────── */
  "ci-cd-react": {
    title: "Setting Up CI/CD for a React App in 2026",
    cat: "DevOps",
    date: "January 8, 2026",
    readTime: "9 min read",
    content: [
      {
        type: "p",
        text: "A proper CI/CD pipeline is one of the highest-leverage investments you can make in a frontend project. Once it's in place, every push gets linted, tested, and deployed automatically — catching bugs before they reach users and eliminating the anxiety of manual deployments. Here's the exact pipeline setup I use across all my React projects.",
      },
      { type: "h2", text: "The pipeline overview" },
      {
        type: "p",
        text: "The pipeline has four stages that run on every push and pull request: lint, test, build, and deploy. Each stage must pass before the next one runs. On pull requests, it runs lint, test, and build but skips the deploy stage. On merges to main, it runs all four. This keeps the main branch always deployable and catches issues at the PR stage, not in production.",
      },
      { type: "h2", text: "Stage 1: Lint with ESLint and Prettier" },
      {
        type: "p",
        text: "The first gate is linting. I run ESLint with the react-hooks plugin and Prettier for formatting checks. Critically, Prettier runs in check mode (not write mode) — the pipeline fails if any file isn't formatted correctly. This enforces consistent code style without manual review comments, and it runs in under 10 seconds on most projects. Fail fast, fix locally.",
      },
      { type: "h2", text: "Stage 2: Unit and integration tests" },
      {
        type: "p",
        text: "Tests run with Vitest (or Jest for older setups) and React Testing Library. I configure a coverage threshold — typically 70% line coverage minimum — so the pipeline fails if coverage drops below the bar. MSW (Mock Service Worker) handles API mocking in tests, which means tests run fast without network calls and work identically on every machine regardless of environment.",
      },
      { type: "h2", text: "Stage 3: Production build" },
      {
        type: "p",
        text: "The build stage runs the production build (npm run build) and checks the output bundle size using a tool like bundlesize or size-limit. I set a maximum bundle size budget (typically 200KB for the main chunk) that fails the pipeline if exceeded. This is the single best guard against bundle bloat sneaking in through a poorly-considered dependency install.",
      },
      { type: "h2", text: "Stage 4: Deploy to Vercel" },
      {
        type: "p",
        text: "On main branch merges, the build artifact gets deployed automatically via Vercel's GitHub integration. Preview deployments are created automatically for every pull request — each PR gets its own URL that the team can review before merging. No more 'let me deploy this to staging so you can check it' messages in Slack. The preview URL is posted directly to the PR by the GitHub bot.",
      },
      { type: "h2", text: "Environment variables and secrets" },
      {
        type: "p",
        text: "Never store secrets in your repository. Use GitHub Actions secrets for CI/CD credentials and Vercel's environment variable system for runtime variables. In the workflow file, reference secrets as ${{ secrets.MY_SECRET }}. For React-specific environment variables, prefix them with REACT_APP_ (or VITE_ for Vite projects) and add them to both your .env.example file and your Vercel project settings.",
      },
      { type: "h2", text: "Caching dependencies for speed" },
      {
        type: "p",
        text: "Without caching, npm install runs from scratch on every pipeline execution, which can take 2–3 minutes. Add a cache step using actions/cache with a key based on the hash of your package-lock.json file. When the lockfile hasn't changed, dependencies restore from cache in under 10 seconds. This alone typically cuts pipeline time in half.",
      },
      { type: "h2", text: "Notifications and monitoring" },
      {
        type: "p",
        text: "Configure Slack or email notifications for failed pipelines so the team knows immediately when main is broken. GitHub's branch protection rules should require all CI checks to pass before a PR can be merged — this prevents bypassing the pipeline under deadline pressure, which is exactly when bugs are most likely to slip through. The discipline of a green pipeline is what makes fast, confident deployments possible.",
      },
    ],
  },
};

const FALLBACK_POST = {
  title: "Blog Post",
  cat: "Writing",
  date: "2026",
  readTime: "5 min read",
  content: [{ type: "p", text: "This post is coming soon!" }],
};

const CAT_COLORS = {
  React: "cat-react",
  Performance: "cat-perf",
  Integration: "cat-ts",
  CSS: "cat-css",
  DevOps: "cat-test",
};

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = POSTS_DATA[slug] || FALLBACK_POST;
  const heroRef = useScrollAnimation();
  const bodyRef = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <main className="blog-post-page">
      <div className="bp-hero fade-up" ref={heroRef}>
        <div className="section-container">
          <button className="pd-back" onClick={() => navigate("/blog")}>
            ← Back to blog
          </button>
          <div className="bp-meta">
            <span className={`post-cat ${CAT_COLORS[post.cat] || "cat-react"}`}>
              {post.cat}
            </span>
            <span className="bp-date">{post.date}</span>
            <span className="bp-sep">·</span>
            <span className="bp-read">{post.readTime}</span>
          </div>
          <h1 className="bp-title">{post.title}</h1>
        </div>
      </div>

      <div className="section-container fade-up" ref={bodyRef}>
        <div className="bp-body">
          <article className="bp-content">
            {post.content.map((block, i) => {
              if (block.type === "h2")
                return (
                  <h2 key={i} className="bp-h2">
                    {block.text}
                  </h2>
                );
              if (block.type === "p")
                return (
                  <p key={i} className="bp-p">
                    {block.text}
                  </p>
                );
              return null;
            })}
          </article>

          <div className="bp-sidebar">
            <div className="bp-author-card">
              <div className="author-avatar">HV</div>
              <div>
                <div className="author-name">Harshita Verma</div>
                <div className="author-role">Frontend Software Engineer</div>
              </div>
            </div>
            <div className="bp-more">
              <div className="bp-more-title">More posts</div>
              <Link to="/blog" className="bp-more-link">
                View all articles →
              </Link>
            </div>
            <div className="bp-cta">
              <p>Want to work together?</p>
              <Link
                to="/contact"
                className="btn-glow"
                style={{ fontSize: "0.85rem", padding: "0.65rem 1.4rem" }}
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
