// posts.jsx — project data.
// Exposed on window so app.jsx can read it after Babel transpiles each file
// in its own scope.

const AI_PROJECTS = [
  {
    name: "Antigravity CLI Copilot",
    slug: "antigravity-cli-copilot",
    kind: "vs code extension",
    what: "Google's Antigravity CLI, driven from a VS Code side panel.",
    problem: "The CLI is good; living in a terminal beside your editor is not. Answers scroll away, generated images never render at all, and typing a follow-up while it works cancels the turn you were waiting on.",
    shots: ["images/shots/antigravity-marketplace.webp"],
    desc: "Google's Antigravity CLI inside VS Code \u2014 streaming replies, live tool rows, generated images rendered inline, and follow-ups queued instead of cancelling the turn.",
    href: "https://marketplace.visualstudio.com/items?itemName=jacobthejacobs.antigravity-chat",
    linkLabel: "Marketplace \u2192",
    img: "images/antigravity-copilot.svg",
  },
  {
    name: "Claw Mate",
    slug: "claw-mate",
    kind: "desktop AI pet",
    what: "A desktop pet that watches your coding agents.",
    problem: "Agents run for a long time and then quietly wait for a yes. You either babysit the window or find out ten minutes later that nothing has moved.",
    shots: ["images/shots/clawmate-store.webp"],
    desc: "A desktop AI pet that connects with Claude Code, Codex, and OpenClaw to understand what your agents are doing and surface approvals when needed.",
    img: "images/claw-mate-studio.webp",
    links: [
      { label: "Microsoft Store →", href: "https://apps.microsoft.com/detail/9njh9x9kdg5p" },
      { label: "Studio →", href: "https://claw-mate-studio.web.app/" },
    ],
  },
  {
    name: "Grok CLI Copilot",
    slug: "grok-cli-copilot",
    kind: "vs code extension",
    what: "The local Grok CLI, driven from a VS Code side panel.",
    problem: "A terminal agent cannot see your editor, and you cannot see its work. Context gets pasted by hand, edits land somewhere you have to go looking for, and the session dies with the tab.",
    shots: ["images/shots/grok-marketplace.webp"],
    desc: "An AI coding copilot for VS Code powered by the local Grok CLI — chat, agentic edits, slash commands, file & folder context, @-mentions, image paste, and live sessions in a focused sidebar.",
    href: "https://marketplace.visualstudio.com/items?itemName=jacobthejacobs.grok-cli-copilot",
    linkLabel: "Marketplace →",
    img: "images/grok-cli-copilot.webp",
  },
  {
    name: "TradingAgents Control Room",
    slug: "tradingagents-control-room",
    kind: "multi-agent \u00b7 react + phaser",
    what: "A multi-agent trading floor you can watch work.",
    problem: "A multi-agent system reports a verdict and hides the argument that produced it. When the answer is wrong, you have no idea which step to distrust.",
    desc: "A multi-agent trading floor you can watch \u2014 AI analysts debate a stock live in pixel art, running analysts \u2192 bull/bear debate \u2192 trader \u2192 risk \u2192 decision. React + Phaser front end, FastAPI back end, market data from the Fin-Node CDN.",
    href: "https://github.com/JacobTheJacobs/TradingAgents-Control-Room",
    linkLabel: "GitHub \u2192",
    img: "images/tradingagents-control-room.webp",
    shots: ["images/shots/tradingagents-floor.webp", "images/shots/tradingagents-report.webp"],
  },
  {
    name: "PhantomPilot",
    slug: "phantompilot",
    kind: "android · ai agent",
    what: "An agent that operates an Android phone by looking at it.",
    problem: "Phone automation expects an API for every app, so it breaks on anything you did not plan for \u2014 and most of what people actually do on a phone exposes nothing to automate.",
    shots: ["images/shots/phantompilot-settings.webp", "images/shots/phantompilot-task.webp"],
    desc: "An autonomous AI agent that operates your Android phone for you — it reads the screen, plans the steps, and ghost-taps through real apps to complete tasks hands-free.",
    links: [],
    img: "images/phantompilot.svg",
    underConstruction: true,
  },
  {
    name: "Browser SDK",
    slug: "browser-sdk",
    kind: "web scraping · playwright",
    what: "Browser automation that finds elements by sight, not by selector.",
    problem: "Selectors rot the moment a page ships a redesign, and hosted scrapers send whatever you are looking at through someone else's cloud.",
    desc: "A local, private web-scraping & browser-automation SDK — drives a real Chrome through Playwright with humanized clicks and typing, using a UI vision model (Fara-7B) to locate elements by pixel and a planner (Qwen3.5) to decide each step, with a shared JSONL scratchpad so long scrape/research runs keep their memory.",
    links: [],
    img: "images/browser-sdk.svg",
    underConstruction: true,
  },
];

const PUBLICATION_PROJECTS = [
  {
    name: "Clawpit",
    slug: "clawpit",
    kind: "agentic newsroom \u00b7 AI desk",
    what: "An AI news desk, run end to end by agents.",
    problem: "Model launches get covered by repeating the announcement. What shipped alongside it \u2014 the model card, the paper, the release notes \u2014 is where the actual change is, and almost nobody reads it.",
    shots: ["images/shots/clawpit-article.webp"],
    desc: "An agent-run AI news desk in English \u2014 models, labs, research and what the release notes left out, filed under Models, Agents, Security, Hardware, Labs, Products, Research and Policy. Its feed is what the blog page here reads.",
    href: "https://www.clawpit.io/clawpit",
    linkLabel: "Read \u2192",
    img: "images/clawpit.webp",
  },
  {
    name: "Fin-node",
    slug: "fin-node",
    kind: "agentic newsroom \u00b7 markets",
    what: "A markets desk, run end to end by agents.",
    problem: "Market news arrives as a wall of tickers and no story: prices with no account of what moved them, or who it costs.",
    shots: ["images/shots/finnode-article.webp"],
    desc: "An agent-run finance publication \u2014 markets, earnings, deals and the economy, written and published end to end by agents, with a live ticker, section feeds and RSS. It also serves the market data behind TradingAgents Control Room.",
    href: "https://www.fin-node.net/finance",
    linkLabel: "Read \u2192",
    img: "images/fin-node.webp",
  },
];

const DESKTOP_PROJECTS = [
  {
    name: "Egret",
    slug: "egret",
    kind: "linux \u00b7 network monitor",
    what: "Little Snitch's question, asked on Linux: who is this process talking to?",
    problem: "Linux will let any binary open a socket and tell you nothing about it \u2014 not which process, not whether that executable came from your package manager or appeared last Tuesday.",
    desc: "An outbound network monitor and policy engine for Linux \u2014 attributes every socket to its process, checks the binary's provenance, and matches ordered rules over process, domain, address, port and zone. FastAPI backend with a React web UI and a C++/Qt6 tray client.",
    links: [],
    img: "images/egret.webp",
    shots: ["images/shots/egret-rules.webp", "images/shots/egret-enforcement.webp"],
    underConstruction: true,
  },
  {
    name: "Llama Menu",
    slug: "llama-menu",
    kind: "macOS menu bar \u00b7 llama.cpp",
    what: "Local llama.cpp, run from the macOS menu bar.",
    problem: "Loading a GGUF means guessing a context size, learning you guessed wrong from a crash, and guessing again.",
    desc: "A macOS menu bar control for local llama.cpp \u2014 runs GGUF models at the largest context your Mac can actually hold, sized from real GGUF metadata rather than guesswork.",
    href: "https://github.com/JacobTheJacobs/llamacpp-menubar",
    linkLabel: "GitHub \u2192",
    img: "images/llama-menu.svg",
  },
  {
    name: "Hermes Menu",
    slug: "hermes-menu",
    kind: "macOS menu bar \u00b7 gateway",
    what: "The Hermes gateway, run from the macOS menu bar.",
    problem: "A gateway running under launchd is either up or lying to you, and the CLI's own output is a poor way to tell which.",
    desc: "A macOS menu bar control for the Hermes gateway \u2014 start it, stop it, and watch it, with status read straight from launchd instead of scraped from CLI output.",
    href: "https://github.com/JacobTheJacobs/hermes-menubar",
    linkLabel: "GitHub \u2192",
    img: "images/hermes-menu.svg",
  },
];

const THREEJS_PROJECTS = [
  {
    name: "Corporate Brawl",
    direct: true,
    desc: "A Three.js browser game with chaotic office-brawl gameplay.",
    href: "https://corporate-brawl.web.app/",
    linkLabel: "Live Demo →",
    img: "images/corporate-brawl.svg",
  },
  {
    name: "Floor Planner",
    direct: true,
    desc: "A browser-based 2D/3D floor planner — lay out rooms, place items, switch between 2D and 3D views, and save floors locally.",
    href: "https://floorplan-29233.web.app/",
    linkLabel: "Live Demo →",
    img: "images/floor-planner.webp",
  },
];

const EXPERIMENT_PROJECTS = [
  {
    name: "VocalWake",
    slug: "vocalwake",
    kind: "android \u00b7 alarm clock",
    what: "An alarm you have to talk your way out of.",
    problem: "Dismissing an alarm takes one thumb and no consciousness, which is exactly why it wakes nobody.",
    shots: ["images/shots/vocalwake-home.webp", "images/shots/vocalwake-editor.webp"],
    desc: "An Android alarm clock you have to talk your way out of \u2014 set a wake phrase or a longer passage, and the alarm only clears once you recite it. On-device speech recognition, word-by-word feedback, a rehearsal mode, and an accuracy threshold you pick yourself. Heading for Google Play.",
    links: [],
    img: "images/vocalwake.webp",
    underConstruction: true,
  },
  {
    name: "Israel News MCP",
    slug: "israel-news-mcp",
    kind: "mcp server · typescript",
    what: "Israeli newspapers, as one MCP tool.",
    problem: "Asking an assistant what the Israeli press is saying means seven RSS feeds in two languages, each with its own shape and none of them queryable.",
    desc: "A Model Context Protocol (MCP) server that aggregates Israeli newspaper RSS feeds — query major Hebrew & English outlets (Ynet, Walla, Haaretz, TheMarker, Globes, Calcalist, Jerusalem Post) and filter by source, section, language, keyword, and publication date, returning structured articles to any MCP client like Claude.",
    href: "https://github.com/JacobTheJacobs/israel-newspapers-rss-mcp",
    linkLabel: "GitHub →",
    img: "images/israel-news-mcp.svg",
  },
  {
    name: "PixelBoy",
    slug: "pixelboy",
    kind: "react · pixel editor",
    what: "An 8-bit sprite editor with animation, in a tab.",
    problem: "Spriting means a desktop app and usually a licence, for work that is a grid, a palette and a timeline.",
    shots: ["images/shots/pixelboy-app.webp"],
    desc: "An 8-bit retro pixel sprite editor (React + Vite) — frame-by-frame animation with drag-to-reorder, live preview, a 60+ color palette, move/mirror tools, and PNG spritesheet export.",
    href: "https://pixel-boy-studio.web.app/",
    linkLabel: "Live Demo →",
    img: "images/pixelboy.webp",
  },
  {
    name: "Alexa NFT Trending",
    slug: "alexa-nft-trending",
    kind: "alexa skill · C#",
    what: "Trending NFTs, read out loud.",
    problem: "Checking what is moving meant opening a dashboard \u2014 a lot of screen for one number.",
    desc: "An Amazon Alexa skill that reports the top trending NFTs by voice. .NET/C# backend, no personal data collected.",
    href: "https://github.com/JacobTheJacobs/AlexaNftTrending",
    linkLabel: "GitHub →",
    img: "images/alexa-nft.svg",
  },
];

const COMPANY_PROJECTS = [
  {
    name: "DataLive™",
    slug: "datalive",
    kind: "android · MSD Animal Health",
    what: "Live herd monitoring for MSD Animal Health.",
    problem: "Herd health data lands in sensors and spreadsheets, in an office, on a screen nobody standing in a barn is looking at. By the time a pattern gets noticed, the animal has been off for days.",
    shots: ["images/shots/datalive-play.webp"],
    desc: "An Android app for MSD Animal Health — live dairy/livestock monitoring with health metrics, rumination tracking, and farm analytics dashboards.",
    href: "https://play.google.com/store/apps/details?id=com.msd.ah.datalive&hl=en",
    linkLabel: "Google Play →",
    img: "images/datalive-play.webp",
  },
  {
    name: "Jane",
    slug: "jane",
    kind: "medical cannabis · web",
    what: "One system across Israel's medical cannabis ecosystem.",
    problem: "A prescription in Israel's medical cannabis system crosses four kinds of organisation \u2014 the patient, the pharmacy, the producer, the distributor \u2014 and each of them keeps its own stock, its own paperwork and its own phone calls. Nobody in that chain can see the rest of it.",
    desc: "A platform for Jane, connecting Israel\u2019s medical cannabis ecosystem \u2014 patients, pharmacies, producers and distributors on one system, serving over 200K people a month.",
    href: "http://jane.co.il/",
    linkLabel: "Visit Site →",
    img: "images/jane.svg",
  },
];

window.AI_PROJECTS = AI_PROJECTS;
window.PUBLICATION_PROJECTS = PUBLICATION_PROJECTS;
window.DESKTOP_PROJECTS = DESKTOP_PROJECTS;
window.THREEJS_PROJECTS = THREEJS_PROJECTS;
window.EXPERIMENT_PROJECTS = EXPERIMENT_PROJECTS;
window.COMPANY_PROJECTS = COMPANY_PROJECTS;

const CONTRIBUTIONS = [
  {
    name: "RAG_Techniques",
    owner: "NirDiamant",
    href: "https://github.com/NirDiamant/RAG_Techniques",
    desc: "advanced retrieval-augmented generation, one runnable notebook per method",
  },
  {
    name: "Agent_Memory_Techniques",
    owner: "NirDiamant",
    href: "https://github.com/NirDiamant/Agent_Memory_Techniques",
    desc: "30 notebooks covering the memory patterns agents actually need",
  },
];

window.ALL_PROJECTS = [].concat(
  COMPANY_PROJECTS, AI_PROJECTS, PUBLICATION_PROJECTS, DESKTOP_PROJECTS, THREEJS_PROJECTS, EXPERIMENT_PROJECTS
);

window.CONTRIBUTIONS = CONTRIBUTIONS;

const BLOG_FEED = {
  name: "Clawpit",
  home: "https://www.clawpit.io/clawpit",
  rss: "https://www.clawpit.io/clawpit/rss.xml",
  blurb: "AI news that reads the footnotes \u2014 pulled live from the feed, so it is current every day without a redeploy.",
};

window.BLOG_FEED = BLOG_FEED;
