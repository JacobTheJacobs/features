// posts.jsx — project data.
// Exposed on window so app.jsx can read it after Babel transpiles each file
// in its own scope.

const AI_PROJECTS = [
  {
    name: "Antigravity CLI Copilot",
    kind: "vs code extension",
    desc: "Google's Antigravity CLI inside VS Code \u2014 streaming replies, live tool rows, generated images rendered inline, and follow-ups queued instead of cancelling the turn.",
    href: "https://marketplace.visualstudio.com/items?itemName=jacobthejacobs.antigravity-chat",
    linkLabel: "Marketplace \u2192",
    img: "images/antigravity-copilot.svg",
  },
  {
    name: "Claw Mate",
    kind: "desktop AI pet",
    desc: "A desktop AI pet that connects with Claude Code, Codex, and OpenClaw to understand what your agents are doing and surface approvals when needed.",
    img: "images/claw-mate-studio.webp",
    links: [
      { label: "Microsoft Store →", href: "https://apps.microsoft.com/detail/9njh9x9kdg5p" },
      { label: "Studio →", href: "https://claw-mate-studio.web.app/" },
    ],
  },
  {
    name: "Grok CLI Copilot",
    kind: "vs code extension",
    desc: "An AI coding copilot for VS Code powered by the local Grok CLI — chat, agentic edits, slash commands, file & folder context, @-mentions, image paste, and live sessions in a focused sidebar.",
    href: "https://marketplace.visualstudio.com/items?itemName=jacobthejacobs.grok-cli-copilot",
    linkLabel: "Marketplace →",
    img: "images/grok-cli-copilot.webp",
  },
  {
    name: "TradingAgents Control Room",
    kind: "multi-agent \u00b7 react + phaser",
    desc: "A multi-agent trading floor you can watch \u2014 AI analysts debate a stock live in pixel art, running analysts \u2192 bull/bear debate \u2192 trader \u2192 risk \u2192 decision. React + Phaser front end, FastAPI back end, market data from the Fin-Node CDN.",
    href: "https://github.com/JacobTheJacobs/TradingAgents-Control-Room",
    linkLabel: "GitHub \u2192",
    img: "images/tradingagents-control-room.svg",
  },
  {
    name: "PhantomPilot",
    kind: "android · ai agent",
    desc: "An autonomous AI agent that operates your Android phone for you — it reads the screen, plans the steps, and ghost-taps through real apps to complete tasks hands-free.",
    href: "https://github.com/JacobTheJacobs/phantompilot",
    linkLabel: "GitHub →",
    img: "images/phantompilot.svg",
    underConstruction: true,
  },
  {
    name: "Browser SDK",
    kind: "web scraping · playwright",
    desc: "A local, private web-scraping & browser-automation SDK — drives a real Chrome through Playwright with humanized clicks and typing, using a UI vision model (Fara-7B) to locate elements by pixel and a planner (Qwen3.5) to decide each step, with a shared JSONL scratchpad so long scrape/research runs keep their memory.",
    href: "https://github.com/JacobTheJacobs/open-browser",
    linkLabel: "GitHub →",
    img: "images/browser-sdk.svg",
    underConstruction: true,
  },
];

const MACOS_PROJECTS = [
  {
    name: "Llama Menu",
    kind: "macOS menu bar \u00b7 llama.cpp",
    desc: "A macOS menu bar control for local llama.cpp \u2014 runs GGUF models at the largest context your Mac can actually hold, sized from real GGUF metadata rather than guesswork.",
    href: "https://github.com/JacobTheJacobs/llamacpp-menubar",
    linkLabel: "GitHub \u2192",
    img: "images/llama-menu.svg",
  },
  {
    name: "Hermes Menu",
    kind: "macOS menu bar \u00b7 gateway",
    desc: "A macOS menu bar control for the Hermes gateway \u2014 start it, stop it, and watch it, with status read straight from launchd instead of scraped from CLI output.",
    href: "https://github.com/JacobTheJacobs/hermes-menubar",
    linkLabel: "GitHub \u2192",
    img: "images/hermes-menu.svg",
  },
];

const THREEJS_PROJECTS = [
  {
    name: "Corporate Brawl",
    kind: "three.js game",
    desc: "A Three.js browser game with chaotic office-brawl gameplay.",
    href: "https://corporate-brawl.web.app/",
    linkLabel: "Live Demo →",
    img: "images/corporate-brawl.svg",
  },
  {
    name: "Floor Planner",
    kind: "web app · 2D/3D",
    desc: "A browser-based 2D/3D floor planner — lay out rooms, place items, switch between 2D and 3D views, and save floors locally.",
    href: "https://floorplan-29233.web.app/",
    linkLabel: "Live Demo →",
    img: "images/floor-planner.webp",
  },
];

const EXPERIMENT_PROJECTS = [
  {
    name: "Israel News MCP",
    kind: "mcp server · typescript",
    desc: "A Model Context Protocol (MCP) server that aggregates Israeli newspaper RSS feeds — query major Hebrew & English outlets (Ynet, Walla, Haaretz, TheMarker, Globes, Calcalist, Jerusalem Post) and filter by source, section, language, keyword, and publication date, returning structured articles to any MCP client like Claude.",
    href: "https://github.com/JacobTheJacobs/israel-newspapers-rss-mcp",
    linkLabel: "GitHub →",
    img: "images/israel-news-mcp.svg",
  },
  {
    name: "PixelBoy",
    kind: "react · pixel editor",
    desc: "An 8-bit retro pixel sprite editor (React + Vite) — frame-by-frame animation with drag-to-reorder, live preview, a 60+ color palette, move/mirror tools, and PNG spritesheet export.",
    href: "https://pixel-boy-studio.web.app/",
    linkLabel: "Live Demo →",
    img: "images/pixelboy.webp",
  },
  {
    name: "Alexa NFT Trending",
    kind: "alexa skill · C#",
    desc: "An Amazon Alexa skill that reports the top trending NFTs by voice. .NET/C# backend, no personal data collected.",
    href: "https://github.com/JacobTheJacobs/AlexaNftTrending",
    linkLabel: "GitHub →",
    img: "images/alexa-nft.webp",
  },
];

const COMPANY_PROJECTS = [
  {
    name: "DataLive™",
    kind: "android · MSD Animal Health",
    desc: "An Android app for MSD Animal Health — live dairy/livestock monitoring with health metrics, rumination tracking, and farm analytics dashboards.",
    href: "https://play.google.com/store/apps/details?id=com.msd.ah.datalive&hl=en",
    linkLabel: "Google Play →",
    img: "images/datalive-play.webp",
  },
  {
    name: "Jane",
    kind: "pharmacy network · web",
    desc: "A member-pharmacy platform for Jane, an Israeli pharmacy network — connecting partner pharmacies under one online system and serving over 200K monthly users.",
    href: "http://jane.co.il/",
    linkLabel: "Visit Site →",
    img: "images/jane.svg",
  },
];

window.AI_PROJECTS = AI_PROJECTS;
window.MACOS_PROJECTS = MACOS_PROJECTS;
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

window.CONTRIBUTIONS = CONTRIBUTIONS;
