import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Menu,
  X,
  ArrowUp,
  ExternalLink,
  GitCommit,
  MapPin,
  Clock,
  GraduationCap,
  Sun,
  Moon,
} from "lucide-react";

// ---------------------------------------------------------------
// Data — pulled from Shubham's existing GitHub / LinkedIn profile
// content, cleaned up (typos, ordering, mislabeled credential fixed)
// ---------------------------------------------------------------
const NAV_ITEMS = [
  { id: "about", label: "whoami" },
  { id: "journey", label: "git log" },
  { id: "stack", label: "stack" },
  { id: "projects", label: "projects" },
  { id: "activity", label: "activity" },
  { id: "contact", label: "contact" },
];

const COMMITS = [
  {
    hash: "a3f9c1e",
    date: "2023 – 2026",
    title: "B.E. — Computer Engineering, Mumbai University",
    body: "Focused on full-stack development, AI-driven projects, and cloud computing.",
    tags: ["education", "completed"],
  },
  {
    hash: "4c19e0f",
    date: "Jan 2023 – Jun 2023",
    title: "Internship — Chandel Productions",
    body: "Built UI/UX and responsive components, and integrated APIs using React and Tailwind CSS.",
    tags: ["react", "tailwind", "api"],
  },
  {
    hash: "0e5f77b",
    date: "2023",
    title: "Diploma — Government Polytechnic, Mumbai",
    body: "Built an early interest in coding through hands-on, tech-based projects.",
    tags: ["education"],
  },
];

const STACK = [
  {
    group: "frontend/",
    items: [
      ["JavaScript", "javascript/javascript-original"],
      ["React", "react/react-original"],
      ["Tailwind CSS", "tailwindcss/tailwindcss-original"],
      ["HTML", "html5/html5-original"],
      ["CSS", "css3/css3-original"],
      ["Bootstrap", "bootstrap/bootstrap-original"],
    ],
  },
  {
    group: "backend/",
    items: [
      ["Node.js", "nodejs/nodejs-original"],
      ["Next.js", "nextjs/nextjs-original"],
      ["Express.js", "express/express-original"],
    ],
  },
  {
    group: "database/",
    items: [
      ["MongoDB", "mongodb/mongodb-original"],
      ["Mongoose", "mongoose/mongoose-original"],
      ["Oracle", "oracle/oracle-original"],
    ],
  },
  {
    group: "tools & languages/",
    items: [
      ["Git", "git/git-original"],
      ["Docker", "docker/docker-original"],
      ["Python", "python/python-original"],
      ["C", "c/c-original"],
      ["C++", "cplusplus/cplusplus-original"],
    ],
  },
];

const PROJECTS = [
  {
    name: "Resumind — AI Resume Analyzer",
    desc: "AI-powered resume analyzer built with React & Puter.js. Handles auth, resume upload/storage, and matches candidates to jobs using AI evaluations.",
    tags: ["React", "JavaScript", "Puter.js", "AI"],
    url: "https://github.com/Shubhamjadhav824/Resumind---AI-Resume-Analyzer",
  },
  {
    name: "BankingServices",
    desc: "Banking services built around RPC (Remote Procedure Call) — banking system functions exposed and called remotely over a network, client to server.",
    tags: ["TypeScript", "RPC", "Backend"],
    url: "https://github.com/Shubhamjadhav824/BankingServices",
  },
  {
    name: "Personal Book Manager",
    desc: "A full-stack personal library application with a Next.js frontend and an Express + MongoDB backend. Sign up, log in with JWT authentication, manage your book collection, and filter.",
    tags: ["Next.js", "Express", "MongoDB", "JWT"],
    url: "https://github.com/Shubhamjadhav824/personal-book-manager",
  },
  {
    name: "Customer Behavior Analysis",
    desc: "Analyzes customer shopping behavior using a dataset of customer purchases — data cleaning, feature engineering, and SQL-based queries to derive insights.",
    tags: ["Python", "Jupyter Notebook", "SQL", "Data Analysis"],
    url: "https://github.com/Shubhamjadhav824/customer-behavior-analysis",
  },
  {
    name: "Digital-MemoryJar",
    desc: "An AI-powered digital memory logger for capturing and revisiting personal memories over time.",
    tags: ["TypeScript", "AI"],
    url: "https://github.com/Shubhamjadhav824/Digital-MemoryJar",
  },
];

const INTRO_LINES = [
  "Full Stack Developer based in Mumbai, India.",
  "B.E. Computer Engineering @ Mumbai University.",
  "Building with React, Node.js, MongoDB — and a habit",
  "of caring too much about animation timing.",
];

const EMAIL = "shubhamjadhav60721@gmail.com";

// Profile photo — embedded as a data URI so it works with zero extra setup.
// To use a real file instead: save it as src/assets/profile.jpg and do
// `import PROFILE_IMG from "./assets/profile.jpg"` at the top of this file.
const PROFILE_IMG = "data:image/jpeg;base64,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";

function iconUrl(path) {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;
}

// ---------------------------------------------------------------
// Typing terminal
// ---------------------------------------------------------------
function TerminalIntro() {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            runTyping();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runTyping() {
    let li = 0;
    let ci = 0;
    let buffer = "";

    function step() {
      if (li >= INTRO_LINES.length) {
        setDone(true);
        return;
      }
      const line = INTRO_LINES[li];
      if (ci < line.length) {
        buffer += line[ci];
        setText(buffer);
        ci++;
        setTimeout(step, 24);
      } else {
        buffer += "\n";
        li++;
        ci = 0;
        setTimeout(step, 340);
      }
    }
    step();
  }

  return (
    <div
      ref={ref}
      className="mx-auto max-w-xl rounded-xl overflow-hidden shadow-2xl shadow-stone-900/30 text-left"
    >
      <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2.5 border-b border-zinc-700">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span
          className="ml-2 text-xs text-zinc-400"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          shubham@portfolio ~ %
        </span>
      </div>
      <div
        className="bg-zinc-900 px-5 py-5 min-h-[130px] text-[14.5px] leading-relaxed"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <p className="text-zinc-500 m-0 mb-2">
          <span className="text-amber-400 mr-2">$</span>whoami
        </p>
        <p className="text-zinc-100 whitespace-pre-wrap m-0">
          {text}
          {!done && <span className="text-emerald-400 animate-pulse">▌</span>}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// Main component
// ---------------------------------------------------------------
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [showTop, setShowTop] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // { ok: bool, text: string }

  const sectionRefs = useRef({});

  useEffect(() => {
    // Inject fonts once
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerSection = useCallback((id) => (el) => {
    sectionRefs.current[id] = el;
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.message.trim().length < 10) {
      setStatus({ ok: false, text: "Write a little more so I know what this is about." });
      return;
    }
    const subject = encodeURIComponent(
      `[Portfolio] ${form.subject || "Message"} — ${form.firstName} ${form.lastName}`
    );
    const body = encodeURIComponent(`${form.message}\n\n— ${form.firstName} ${form.lastName}\n${form.email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus({ ok: true, text: "Opening your mail client…" });
    setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  };

  const displayFont = { fontFamily: "'Space Grotesk', sans-serif" };
  const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

  return (
    <div className={darkMode ? "dark" : ""}>
    <div className="bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ============ NAV ============ */}
      <header className="sticky top-0 z-50 backdrop-blur bg-stone-100/90 dark:bg-stone-950/90 border-b border-stone-300 dark:border-stone-700">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
          <button
            onClick={() => scrollTo("about")}
            className="text-sm font-semibold"
            style={monoFont}
          >
            ~/shubham<span className="text-emerald-700 animate-pulse">_</span>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-[13.5px] text-stone-600 dark:text-stone-400" style={monoFont}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors hover:text-stone-900 dark:hover:text-stone-100 ${
                  active === item.id ? "text-emerald-800" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="#resume"
              className="text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded"
            >
              resume.pdf ↗
            </a>
          </nav>

          <button
            className="md:hidden p-1.5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button
            className="p-2 rounded-full border border-stone-300 dark:border-stone-700 hover:border-emerald-700 transition-colors ml-2"
            onClick={() => setDarkMode((v) => !v)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            className="md:hidden flex flex-col gap-1 px-5 pb-5 text-sm text-stone-600 dark:text-stone-400 border-t border-stone-300 dark:border-stone-700"
            style={monoFont}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left py-2"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* ============ HERO ============ */}
      <section className="min-h-[88vh] flex flex-col items-center justify-center text-center px-5 py-20">
        <p className="text-[13px] text-emerald-800 dark:text-emerald-400 mb-4" style={monoFont}>
          // full stack developer · mumbai, in
        </p>
        <h1
          className="font-bold leading-[0.95] tracking-tight text-5xl sm:text-7xl lg:text-8xl mb-8"
          style={displayFont}
        >
          Shubham
          <br />
          Jadhav
        </h1>

        <div className="w-full mb-8">
          <TerminalIntro />
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-7">
          <button
            onClick={() => scrollTo("projects")}
            className="px-5 py-3 rounded bg-stone-900 text-stone-100 text-sm hover:bg-emerald-900 transition-colors"
            style={monoFont}
          >
            view --projects
          </button>
          <a
            href="#resume"
            className="px-5 py-3 rounded border border-stone-300 dark:border-stone-700 text-sm hover:border-stone-900 transition-colors"
            style={monoFont}
          >
            download resume
          </a>
        </div>

        <div className="flex flex-wrap gap-5 justify-center text-[13px] text-stone-600 dark:text-stone-400" style={monoFont}>
          <a href="https://github.com/Shubhamjadhav824" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-900">
            <Github size={15} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/shubham-jadhav-baab91217/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-900">
            <Linkedin size={15} /> LinkedIn
          </a>
          <a href="https://www.instagram.com/shubham_jadhav824" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-900">
            <Instagram size={15} /> Instagram
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 hover:text-emerald-900">
            <Mail size={15} /> Email
          </a>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <Section id="about" tag="01 · about.md" registerSection={registerSection}>
        <div className="grid md:grid-cols-[240px_1fr] gap-12 items-start">
          <div
            className="aspect-[4/5] max-w-[220px] rounded-xl border border-stone-300 dark:border-stone-700 overflow-hidden"
          >
            <img
              src={PROFILE_IMG}
              alt="Shubham Jadhav"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl mb-5 max-w-[34ch] leading-snug" style={displayFont}>
              Building sleek, functional web experiences — end to end.
            </h2>
            <p className="text-stone-600 dark:text-stone-400 max-w-[58ch] mb-4">
              I'm a Full Stack Developer with a B.E. in Computer Engineering from Mumbai
              University. I work across the stack with JavaScript, React, Node.js and MongoDB,
              and care about performance and motion as much as functionality.
            </p>
            <p className="text-stone-600 dark:text-stone-400 max-w-[58ch] mb-6">
              Outside of code: traveling, reading, and following what's new in tech.
            </p>
            <dl className="grid gap-3 max-w-[46ch]">
              <Fact icon={<MapPin size={14} />} label="Location" value="Mumbai, Maharashtra, India" />
              <Fact icon={<GraduationCap size={14} />} label="Education" value="B.E. Computer Engineering, Mumbai University (2023–2026)" />
              <Fact icon={<Clock size={14} />} label="Status" value="Open to internships & junior roles" />
            </dl>
          </div>
        </div>
      </Section>

      {/* ============ JOURNEY ============ */}
      <Section id="journey" tag="02 · git log --reverse" title="Journey" registerSection={registerSection}>
        <div className="border-l-2 border-stone-300 dark:border-stone-700 pl-8 grid gap-9">
          {COMMITS.map((c) => (
            <div key={c.hash} className="relative">
              <span className="absolute -left-[38px] top-1.5 w-3 h-3 rounded-full bg-stone-100 border-2 border-emerald-700" />
              <div className="flex items-center gap-3 text-[12.5px] mb-1.5" style={monoFont}>
                <span className="bg-zinc-900 text-emerald-300 px-2 py-0.5 rounded flex items-center gap-1">
                  <GitCommit size={11} /> {c.hash}
                </span>
                <span className="text-stone-400 dark:text-stone-500">{c.date}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={displayFont}>{c.title}</h3>
              <p className="text-stone-600 dark:text-stone-400 max-w-[60ch] mb-3">{c.body}</p>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11.5px] text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full"
                    style={monoFont}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ STACK ============ */}
      <Section id="stack" tag="03 · stack" title="Stack" registerSection={registerSection}>
        <div className="grid gap-9">
          {STACK.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm text-stone-400 dark:text-stone-500 mb-3.5" style={monoFont}>{group.group}</h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map(([name, icon]) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-3.5 py-2 rounded-full text-[13.5px] hover:border-emerald-700 hover:-translate-y-0.5 transition-all"
                  >
                    <img src={iconUrl(icon)} alt="" className="w-4 h-4 object-contain" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ PROJECTS ============ */}
      <Section id="projects" tag="04 · projects" title="Projects" registerSection={registerSection}>
        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <div
              key={p.name}
              className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl p-7 flex flex-col hover:border-emerald-700 hover:-translate-y-1 transition-all"
            >
              <h3 className="text-lg font-semibold mb-3" style={displayFont}>{p.name}</h3>
              <p className="text-stone-600 dark:text-stone-400 text-[14.5px] mb-5 flex-grow">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((t) => (
                  <span key={t} className="text-[11.5px] text-stone-600 dark:text-stone-400 border border-stone-300 dark:border-stone-700 px-2.5 py-0.5 rounded-full" style={monoFont}>
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13.5px] text-emerald-900 dark:text-emerald-300 hover:underline flex items-center gap-1 self-start"
                style={monoFont}
              >
                View on GitHub <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ ACTIVITY ============ */}
      <Section id="activity" tag="05 · activity" title="Coding activity" registerSection={registerSection}>
        <div className="grid gap-8">
          <div>
            <h3 className="text-sm text-stone-400 dark:text-stone-500 mb-3.5" style={monoFont}>github/</h3>
            <div className="flex flex-wrap gap-4">
              <img
                src="https://github-readme-stats.vercel.app/api?username=Shubhamjadhav824&show_icons=true&theme=tokyonight"
                alt="Shubham's GitHub stats"
                className="rounded-lg border border-stone-300 dark:border-stone-700 max-w-full"
              />
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=Shubhamjadhav824&layout=compact&theme=tokyonight"
                alt="Shubham's most used languages"
                className="rounded-lg border border-stone-300 dark:border-stone-700 max-w-full"
              />
            </div>
            <img
              src="https://github-readme-streak-stats.herokuapp.com?user=Shubhamjadhav824&theme=tokyonight"
              alt="Shubham's GitHub streak stats"
              className="rounded-lg border border-stone-300 dark:border-stone-700 max-w-full mt-4"
            />
          </div>

          <div>
            <h3 className="text-sm text-stone-400 dark:text-stone-500 mb-3.5" style={monoFont}>leetcode/</h3>
            <a href="https://leetcode.com/u/shubhamjadhav60721/" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img
                src="https://leetcard.jacoblin.cool/shubhamjadhav60721?theme=dark&font=Baloo%202&ext=heatmap"
                alt="Shubham's LeetCode stats"
                className="rounded-lg border border-stone-300 dark:border-stone-700 max-w-full"
              />
            </a>
          </div>

          <div>
            <h3 className="text-sm text-stone-400 dark:text-stone-500 mb-3.5" style={monoFont}>geeksforgeeks/</h3>
            <a href="https://www.geeksforgeeks.org/user/shubhamjadj35j/" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img
                src="https://gfgstatscard.vercel.app/shubhamjadj35j"
                alt="Shubham's GeeksforGeeks stats"
                className="rounded-lg border border-stone-300 dark:border-stone-700 max-w-full"
              />
            </a>
          </div>
        </div>
      </Section>

      {/* ============ CONTACT ============ */}
      <Section id="contact" tag="06 · contact" registerSection={registerSection}>
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl mb-5" style={displayFont}>Let's build something.</h2>
            <p className="text-stone-600 dark:text-stone-400 max-w-[42ch] mb-6">
              Open to internships, junior full-stack roles, and interesting collaborations.
            </p>
            <dl className="grid gap-3 max-w-[42ch]">
              <Fact icon={<Mail size={14} />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <Fact icon={<MapPin size={14} />} label="Location" value="Mumbai, Maharashtra, India" />
              <Fact icon={<Clock size={14} />} label="Response" value="Within 24 hours" />
            </dl>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name *" name="firstName" value={form.firstName} onChange={handleChange} required />
              <Field label="Last name *" name="lastName" value={form.lastName} onChange={handleChange} required />
            </div>
            <Field label="Email *" name="email" type="email" value={form.email} onChange={handleChange} required />
            <div className="grid gap-1.5">
              <label className="text-xs text-stone-400 dark:text-stone-500" style={monoFont}>Subject *</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="border border-stone-300 dark:border-stone-700 rounded-md px-3.5 py-3 bg-white dark:bg-stone-900 text-[14.5px] focus:outline-none focus:border-emerald-700"
              >
                <option value="" disabled>Select a subject</option>
                <option>Project Inquiry</option>
                <option>Job Opportunity</option>
                <option>Collaboration</option>
                <option>General Message</option>
              </select>
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs text-stone-400 dark:text-stone-500" style={monoFont}>Message *</label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="border border-stone-300 dark:border-stone-700 rounded-md px-3.5 py-3 bg-white dark:bg-stone-900 text-[14.5px] focus:outline-none focus:border-emerald-700 resize-y"
              />
              <p className="text-xs text-stone-400 dark:text-stone-500">Tip: write a few words so I know what this is about.</p>
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded bg-stone-900 text-stone-100 text-sm hover:bg-emerald-900 transition-colors justify-self-start"
              style={monoFont}
            >
              Send message
            </button>
            {status && (
              <p className={`text-[13px] ${status.ok ? "text-emerald-800" : "text-red-700"}`} style={monoFont}>
                {status.text}
              </p>
            )}
          </form>
        </div>
      </Section>

      <footer className="max-w-5xl mx-auto px-5 sm:px-8 py-10 flex items-center justify-between text-[13px] text-stone-400 dark:text-stone-500 border-t border-stone-300 dark:border-stone-700" style={monoFont}>
        <p>© {new Date().getFullYear()} Shubham Jadhav</p>
        <button onClick={() => scrollTo("about")} className="hover:text-emerald-800">Back to top ↑</button>
      </footer>

      {showTop && (
        <button
          onClick={() => scrollTo("about")}
          className="fixed bottom-6 right-6 bg-stone-900 text-stone-100 p-3 rounded-full shadow-lg hover:bg-emerald-900 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
    </div>
  );
}

// ---------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------
function Section({ id, tag, title, children, registerSection }) {
  const [visible, setVisible] = useState(false);
  const localRef = useRef(null);

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const combinedRef = (el) => {
    localRef.current = el;
    registerSection(id)(el);
  };

  return (
    <section
      id={id}
      ref={combinedRef}
      className={`max-w-5xl mx-auto px-5 sm:px-8 py-24 border-t border-stone-300 dark:border-stone-700 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="text-[13px] text-emerald-800 dark:text-emerald-400 mb-2.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{tag}</p>
      {title && (
        <h2 className="text-3xl sm:text-4xl mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h2>
      )}
      {children}
    </section>
  );
}

function Fact({ icon, label, value, href }) {
  return (
    <div className="flex items-start gap-3 border-b border-dashed border-stone-300 dark:border-stone-700 pb-2.5">
      <span className="text-emerald-800 dark:text-emerald-400 mt-0.5">{icon}</span>
      <div>
        <dt className="text-xs text-stone-400 dark:text-stone-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</dt>
        <dd className="m-0">
          {href ? <a href={href} className="hover:text-emerald-800 dark:text-emerald-400 hover:underline">{value}</a> : value}
        </dd>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <div className="grid gap-1.5">
      <label className="text-xs text-stone-400 dark:text-stone-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-stone-300 dark:border-stone-700 rounded-md px-3.5 py-3 bg-white dark:bg-stone-900 text-[14.5px] focus:outline-none focus:border-emerald-700"
      />
    </div>
  );
}

