// app.jsx — main blog application
// Renders the page shell, theme controller, sidebar widgets, and the page
// router. Pulls post / project / uses / friends / seed-guest data from window.*
// (set by posts.jsx) since each <script type="text/babel"> file gets its own
// scope after Babel transpiles it.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "sepia",
  "displayFont": "Pixelify Sans",
  "decor": true,
  "bg3d": true,
  "showAscii": true
}/*EDITMODE-END*/;

const THEMES = [
  { value: "sepia",    label: "sepia"    },
  { value: "terminal", label: "terminal" },
  { value: "web1",     label: "web 1.0"  },
  { value: "notepad",  label: "notepad"  },
];

const DISPLAY_FONTS = [
  { value: "Pixelify Sans",               label: "pixelify"   },
  { value: "Press Start 2P",              label: "press start"},
  { value: "VT323",                       label: "VT323"      },
  { value: "JetBrains Mono",              label: "jetbrains"  },
];

const SITE_LAST_UPDATED = "2026-08-25";

// ── small helpers ─────────────────────────────────────────────────────────
function fmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  return `${String(d).padStart(2,"0")} ${months[m-1]} ${y}`;
}

// ── nav ───────────────────────────────────────────────────────────────────
const NAV = [
  { id: "projects", label: "projects", icon: "projects" },
  { id: "blog",     label: "blog",     icon: "posts"    },
];

function Nav({ page, onNav }) {
  return (
    <nav className="nav" aria-label="Primary">
      {NAV.map((n) => (
        <button
          key={n.id}
          type="button"
          aria-current={page === n.id ? "page" : undefined}
          onClick={() => onNav(n.id)}
        >
          <PixelIcon name={n.icon} size={16} palette={{"1":"currentColor","2":"var(--paper-2)","3":"var(--accent)"}} />
          {n.label}
        </button>
      ))}
    </nav>
  );
}

// ── titlebar ──────────────────────────────────────────────────────────────
function Titlebar() {
  return (
    <header className="titlebar">
      <div>
        <h1>Jacob<span>/</span></h1>
      </div>
      <div className="meta">
        <div><b>last updated</b></div>
        <div>{SITE_LAST_UPDATED}</div>
        <div style={{ marginTop: 6 }}><b>est.</b> 2017</div>
        <div>v.05 (handwritten)</div>
      </div>
    </header>
  );
}

// ── sidebar widgets ───────────────────────────────────────────────────────
function NowWidget() {
  return (
    <div className="card">
      <div className="lbl"><PixelIcon name="star" size={12} color="var(--accent)" /> now</div>
      <div>
        <div className="now-line"><PixelIcon name="projects" size={14} /><b>building</b><span>PhantomPilot</span></div>
        <div className="now-line"><PixelIcon name="posts"    size={14} /><b>reading</b><span>logs</span></div>
        <div className="now-line">
          <PixelIcon name="cassette" size={14} />
          <b>playing</b>
          <span><span className="eq" aria-hidden="true"><i/><i/><i/><i/></span> lofi to debug to</span>
        </div>
      </div>
    </div>
  );
}

function FeedsCard() {
  return (
    <div className="card">
      <div className="lbl"><PixelIcon name="links" size={12} color="var(--accent)" /> elsewhere</div>
      <ul className="feed-list">
        <li><PixelIcon name="gh"   size={14} /><a href="https://github.com/JacobTheJacobs" target="_blank" rel="noopener noreferrer">github / @JacobTheJacobs</a></li>
      </ul>
    </div>
  );
}

function ContributingCard() {
  const items = window.CONTRIBUTIONS || [];
  if (!items.length) return null;
  return (
    <div className="card">
      <div className="lbl"><PixelIcon name="projects" size={12} color="var(--accent)" /> contributing to</div>
      <ul className="feed-list">
        {items.map((c) => (
          <li key={c.name}>
            <PixelIcon name="gh" size={14} />
            <a href={c.href} target="_blank" rel="noopener noreferrer">{c.owner}/{c.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="side">
      <NowWidget />
      <ContributingCard />
      <FeedsCard />
    </aside>
  );
}

// ── pages ─────────────────────────────────────────────────────────────────
function ProjectCard({ p, eager }) {
  return (
    <div className="project">
      {p.underConstruction && <span className="badge-uc">⚠ under construction</span>}
      {p.img && (
        <img className="pcover" src={p.img} alt={`${p.name} cover`} width="600" height="240"
          loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />
      )}
      <div className="pname"><PixelIcon name="projects" size={20} color="var(--accent)" />{p.name}</div>
      <div className="pmeta">
        <span>{p.kind}</span>
        {p.year && <><span>·</span><span>{p.year}</span></>}
      </div>
      <p>{p.desc}</p>
      <div className="links">
        {(p.links || [{ label: p.linkLabel || "readme →", href: p.href }]).map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href && l.href !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function ProjectSection({ title, items, top }) {
  if (!items || !items.length) return null;
  return (
    <>
      <div className="pagehead" style={top ? undefined : { marginTop: 40 }}>
        <h2>{title}</h2>
      </div>
      <div className="projects">
        {items.map((p, i) => <ProjectCard key={p.name} p={p} eager={top && i < 2} />)}
      </div>
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <ProjectSection title="Corporate projects" items={window.COMPANY_PROJECTS} top />
      <ProjectSection title="AI" items={window.AI_PROJECTS} />
      <ProjectSection title="Publications" items={window.PUBLICATION_PROJECTS} />
      <ProjectSection title="macOS tools" items={window.MACOS_PROJECTS} />
      <ProjectSection title="Three.js" items={window.THREEJS_PROJECTS} />
      <ProjectSection title="Experiments" items={window.EXPERIMENT_PROJECTS} />
    </>
  );
}


// ── blog ──────────────────────────────────────────────────────────────────
// Reads the Clawpit RSS feed at load time. The desk publishes every day and
// the feed is CORS-open, so the list here stays current without a redeploy.
function feedText(item, tag) {
  const el = item.querySelector(tag);
  return el ? el.textContent.trim() : "";
}

function BlogPage() {
  const feed = window.BLOG_FEED;
  const [state, setState] = React.useState({ status: "loading", items: [] });

  React.useEffect(() => {
    let alive = true;
    fetch(feed.rss, { cache: "no-cache" })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then((xml) => {
        const doc = new DOMParser().parseFromString(xml, "application/xml");
        if (doc.querySelector("parsererror")) throw new Error("unreadable feed");
        const items = Array.from(doc.querySelectorAll("item")).slice(0, 15).map((it) => ({
          title: feedText(it, "title"),
          link:  feedText(it, "link"),
          cat:   feedText(it, "category"),
        }));
        if (alive) setState({ status: items.length ? "ok" : "empty", items });
      })
      .catch(() => { if (alive) setState({ status: "error", items: [] }); });
    return () => { alive = false; };
  }, [feed.rss]);

  return (
    <>
      <div className="pagehead">
        <h2>blog</h2>
        <a className="crumb" href={feed.home} target="_blank" rel="noopener noreferrer">{feed.name} →</a>
      </div>
      {state.status === "loading" && <p style={{ fontSize: 13 }}>loading the feed…</p>}

      {(state.status === "error" || state.status === "empty") && (
        <p style={{ fontSize: 13 }}>
          The feed did not load.{" "}
          <a href={feed.home} target="_blank" rel="noopener noreferrer">Read it on {feed.name} →</a>
        </p>
      )}

      {state.status === "ok" && (
        <div className="posts">
          {state.items.map((it) => (
            <a
              key={it.link}
              className="post-row"
              href={it.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <span className="date">{(it.cat || "post").toLowerCase()}</span>
              <span className="title">{it.title}</span>
              <span className="tags">read →</span>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

// ── footer ────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div>
        <div>
          no analytics · no js trackers ·{" "}
          <a href="https://github.com/JacobTheJacobs/features" target="_blank" rel="noopener noreferrer">view source</a>
        </div>
        <div style={{ marginTop: 4, opacity: .8 }}>
          © 2017–{year} Jacob · text licensed CC BY-SA · code MIT
        </div>
      </div>
      <div className="badges" aria-label="88x31 badges">
        <span className="badge88 web">made with<br/>HTML</span>
        <span className="badge88">best<br/><b>viewed</b><br/>w/ eyes</span>
        <span className="badge88 alt">runs on<br/><b>caffeine</b></span>
      </div>
    </footer>
  );
}

// ── tweaks panel ──────────────────────────────────────────────────────────
function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme">
        <TweakRadio
          label="Palette"
          value={t.theme}
          options={THEMES}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakSelect
          label="Display font"
          value={t.displayFont}
          options={DISPLAY_FONTS}
          onChange={(v) => setTweak("displayFont", v)}
        />
      </TweakSection>
      <TweakSection label="Decoration">
        <TweakToggle
          label="Marquee + blink"
          value={t.decor}
          onChange={(v) => setTweak("decor", v)}
        />
        <TweakToggle
          label="Pixel scenery"
          value={t.bg3d}
          onChange={(v) => setTweak("bg3d", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ── App ───────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // "projects" | "blog" — kept in the hash so a page is linkable and survives reload
  const [page, setPage] = React.useState(
    () => (window.location.hash.replace("#", "") === "blog" ? "blog" : "projects")
  );

  React.useEffect(() => {
    const onHash = () => setPage(window.location.hash.replace("#", "") === "blog" ? "blog" : "projects");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // sync theme + display font to <html>/<body>
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
    document.documentElement.style.setProperty("--display", `"${t.displayFont}", monospace`);
    document.body.classList.toggle("no-decor", !t.decor);
    // notify bg3d so it can re-read --accent
    if (window.bg3d) window.bg3d.refreshTheme();
  }, [t.theme, t.displayFont, t.decor]);

  // boot / toggle three.js background
  React.useEffect(() => {
    if (t.bg3d && window.bg3d) {
      window.bg3d.start();
      window.bg3d.setEnabled(true);
    } else if (window.bg3d) {
      window.bg3d.setEnabled(false);
    }
  }, [t.bg3d]);

  // scroll to top on page change
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [page]);

  const onNav = (id) => { window.location.hash = id === "blog" ? "blog" : ""; setPage(id); };

  const body = page === "blog" ? <BlogPage /> : <ProjectsPage />;

  return (
    <div className="shell">
      <Titlebar />
      <Nav page={page} onNav={onNav} />
      <div className="grid">
        <main className="content">{body}</main>
        <Sidebar />
      </div>
      <Footer />
      <Tweaks t={t} setTweak={setTweak} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
