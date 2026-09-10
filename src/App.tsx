import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileCode2,
  FileSpreadsheet,
  FileText,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  Network,
  Phone,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  X,
  Zap,
} from 'lucide-react';
import profilePhoto from '@/assets/images/profile.jpg';
import certNti from '@/assets/images/cert-nti.png';
import certCreativa from '@/assets/images/cert-creativa.png';
import certItiCyber from '@/assets/images/cert-iti-cyber.png';
import certPrompters from '@/assets/images/cert-prompters.png';

const PROFILE_FALLBACK = 'https://images.pexels.com/photos/30426363/pexels-photo-30426363.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const skills = [
  { label: 'C# / .NET', icon: Code2, color: 'cyan' },
  { label: 'ASP.NET Core', icon: Layers3, color: 'blue' },
  { label: 'React & TypeScript', icon: Monitor, color: 'lime' },
  { label: 'SQL Server', icon: Database, color: 'orange' },
  { label: 'Network Security', icon: Network, color: 'cyan' },
  { label: 'Penetration Testing', icon: ShieldCheck, color: 'red' },
];

const productivity = [
  { label: 'Microsoft Excel', icon: FileSpreadsheet },
  { label: 'Microsoft PowerPoint', icon: FileText },
  { label: 'Microsoft Word', icon: FileCode2 },
];

const projects = [
  {
    number: '01',
    title: 'SecureDesk',
    category: 'Full Stack Platform',
    description: 'A role-based support workspace that turns complex service workflows into a calm, transparent experience.',
    tags: ['ASP.NET Core', 'React', 'SQL Server'],
    icon: Monitor,
    accent: 'cyan',
  },
  {
    number: '02',
    title: 'Vault Monitor',
    category: 'Security Dashboard',
    description: 'A live threat visibility layer for tracking events, surfacing anomalies, and helping teams respond earlier.',
    tags: ['C#', 'REST APIs', 'Security'],
    icon: ShieldCheck,
    accent: 'lime',
  },
  {
    number: '03',
    title: 'LinkForge',
    category: 'Web Experience',
    description: 'A polished digital toolkit built for fast publishing, thoughtful content structure, and measurable growth.',
    tags: ['TypeScript', 'UX/UI', 'Deployment'],
    icon: Globe2,
    accent: 'orange',
  },
];

type CertData = {
  title: string;
  issuer: string;
  year: string;
  image: string | null;
  detail: string;
  meta: string;
  accent: string;
};

const certificates: CertData[] = [
  { title: 'Fortinet Cybersecurity Training', issuer: 'NTI — Summer Training', year: '2026', image: certNti, detail: 'Score: 90%', meta: 'FORTINET NSE', accent: '#f97316' },
  { title: 'Red Hat System Administration I', issuer: 'ITI — Red Hat', year: '2026', image: null, detail: 'Code: L1UNOKJTFb', meta: 'RH124 / RHEL', accent: '#dc2626' },
  { title: 'Cybersecurity For Beginners', issuer: 'ITI & VMware', year: '2026', image: certItiCyber, detail: 'Code: dyEBS5CNal', meta: 'CYBER FUNDAMENTALS', accent: '#0891b2' },
  { title: 'Web Development Program', issuer: 'Creativa & ITIDA', year: '2025', image: certCreativa, detail: 'Full Stack Track', meta: 'WEB DEV', accent: '#7c3aed' },
  { title: '1 Million Prompters', issuer: 'Dubai Future Foundation', year: '2026', image: certPrompters, detail: 'AI & Future Skills', meta: 'AI PROMPTING', accent: '#059669' },
];

function SectionReveal({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      className={className}
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty('--rx', `${(0.5 - y) * 5}deg`);
    event.currentTarget.style.setProperty('--ry', `${(x - 0.5) * 5}deg`);
  };

  const reset = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--rx', '0deg');
    event.currentTarget.style.setProperty('--ry', '0deg');
  };

  return <div className={`tilt-card ${className}`} onMouseMove={handleMove} onMouseLeave={reset}>{children}</div>;
}

function ParticleField({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frame = 0;
    const pointer = { x: -1000, y: -1000 };
    const particles = Array.from({ length: 42 }, (_, index) => ({
      x: (index * 83) % 1000,
      y: (index * 137) % 700,
      vx: ((index % 3) - 1) * 0.12,
      vy: (((index + 1) % 3) - 1) * 0.1,
      radius: index % 4 === 0 ? 2 : 1.2,
    }));

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: globalThis.MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
        const distance = Math.hypot(pointer.x - particle.x, pointer.y - particle.y);
        if (distance < 180) {
          particle.x += (particle.x - pointer.x) * 0.0008;
          particle.y += (particle.y - pointer.y) * 0.0008;
        }
        context.beginPath();
        context.fillStyle = dark ? 'rgba(56, 189, 248, .65)' : 'rgba(14, 116, 144, .28)';
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      particles.forEach((a, index) => particles.slice(index + 1).forEach((b) => {
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 140) {
          context.beginPath();
          context.strokeStyle = dark ? `rgba(56, 189, 248, ${0.16 - distance / 1000})` : `rgba(14, 116, 144, ${0.08 - distance / 2200})`;
          context.lineWidth = 1;
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }));
      frame = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', move);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', move);
    };
  }, [dark]);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}

function ProfileImage({ className = '', alt = 'Khaled Ali' }: { className?: string; alt?: string }) {
  const [src, setSrc] = useState(profilePhoto);
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setSrc(PROFILE_FALLBACK)}
    />
  );
}

function CertificateGraphic({ cert, large = false }: { cert: CertData; large?: boolean }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = cert.image !== null && !imgError;

  if (hasImage && cert.image) {
    return (
      <img
        src={cert.image}
        alt={`${cert.title} certificate`}
        onError={() => setImgError(true)}
        style={{ width: '100%', height: large ? 'auto' : '100%', objectFit: large ? 'contain' : 'cover', display: 'block' }}
      />
    );
  }

  const w = large ? 800 : 400;
  const h = large ? 560 : 260;
  const safeId = cert.meta.replace(/\s/g, '');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id={`bg-${safeId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id={`acc-${safeId}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={cert.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={cert.accent} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#bg-${safeId})`} rx="12" />
      <rect x="0" y="0" width={w} height="6" fill={`url(#acc-${safeId})`} rx="3" />
      <rect x="20" y="20" width={w - 40} height={h - 40} fill="none" stroke={cert.accent} strokeWidth="1" strokeOpacity="0.3" rx="8" />
      <text x={w / 2} y={large ? 70 : 45} textAnchor="middle" fill={cert.accent} fontSize={large ? 16 : 10} fontWeight="700" letterSpacing="3" fontFamily="Inter, sans-serif">{cert.meta}</text>
      <text x={w / 2} y={large ? 150 : 90} textAnchor="middle" fill="#f8fafc" fontSize={large ? 32 : 16} fontWeight="800" fontFamily="Inter, sans-serif">{cert.title}</text>
      <line x1={w / 2 - 60} y1={large ? 170 : 102} x2={w / 2 + 60} y2={large ? 170 : 102} stroke={cert.accent} strokeWidth="2" />
      <text x={w / 2} y={large ? 210 : 128} textAnchor="middle" fill="#94a3b8" fontSize={large ? 16 : 10} fontFamily="Inter, sans-serif">{cert.issuer}</text>
      <text x={w / 2} y={large ? 280 : 160} textAnchor="middle" fill={cert.accent} fontSize={large ? 22 : 13} fontWeight="700" fontFamily="Inter, sans-serif">{cert.detail}</text>
      {large && (
        <>
          <circle cx={w / 2} cy={390} r="45" fill="none" stroke={cert.accent} strokeWidth="2" strokeOpacity="0.4" />
          <circle cx={w / 2} cy={390} r="38" fill={cert.accent} fillOpacity="0.1" />
          <path d={`M${w / 2 - 18} 390 L${w / 2 - 4} 404 L${w / 2 + 18} 376`} fill="none" stroke={cert.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x={w / 2} y={460} textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">Awarded to Khaled Ali</text>
          <text x={w / 2} y={480} textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">{cert.year}</text>
          <text x={w / 2} y={520} textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Inter, sans-serif">Verified credential</text>
        </>
      )}
      {!large && <text x={w / 2} y={200} textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">{cert.year}</text>}
    </svg>
  );
}

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('portfolio-theme') !== 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<CertData | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ['Cybersecurity Specialist', 'Full Stack .NET Developer'];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.toggle('light', !dark);
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((current) => (current + 1) % roles.length), 3000);
    return () => window.clearInterval(timer);
  }, [roles.length]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setActiveCertificate(null);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Khaled Ali home">Khaled Ali <span>.</span></a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          {['About', 'Skills', 'Projects', 'Certificates'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="nav-contact" href="mailto:khaledali2882005@gmail.com" onClick={() => setMenuOpen(false)}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>
        <div className="header-actions">
          <a className="cv-button" href="mailto:khaledali2882005@gmail.com?subject=CV%20Request">
            <Download size={15} /> CV
          </a>
          <button className="theme-toggle" onClick={() => setDark((value) => !value)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <ParticleField dark={dark} />
          <div className="hero-grid page-width">
            <motion.div className="hero-copy" initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }}>
              <div className="eyebrow"><span className="status-dot" /> Available for select opportunities</div>
              <h1>Building secure<br /><em>digital futures.</em></h1>
              <div className="role-line"><span className="role-icon"><Terminal size={16} /></span><span className="role-label">I am a</span><AnimatePresence mode="wait"><motion.strong key={roles[roleIndex]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{roles[roleIndex]}</motion.strong></AnimatePresence></div>
              <p className="hero-description">I blend a security-first mindset with full stack craft to build resilient, meaningful products that people enjoy using.</p>
              <div className="hero-actions">
                <a href="#projects" className="button button-primary">Explore my work <ArrowDownRight size={17} /></a>
                <a href="mailto:khaledali2882005@gmail.com" className="text-link">Start a conversation <ArrowUpRight size={16} /></a>
              </div>
              <div className="hero-proof">
                <div className="mini-avatars">
                  <span><ProfileImage alt="Khaled Ali" /></span>
                  <span className="mini-icon"><ScanLine size={14} /></span>
                </div>
                <span>Trusted to make<br /><b>complex things clear.</b></span>
              </div>
            </motion.div>

            <motion.div className="portrait-wrap" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1 }}>
              <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
              <div className="portrait-card">
                <div className="portrait-topline"><span>PROFILE / 001</span><span><span className="live-dot" /> ONLINE</span></div>
                <ProfileImage alt="Khaled Ali portrait" />
                <div className="portrait-caption"><span>KHALED ALI</span><span>BENI SUEF, EG</span></div>
              </div>
              <motion.div className="metric metric-top"><Sparkles size={15} /><span>3+<small>YEARS BUILDING</small></span></motion.div>
              <motion.div className="metric metric-right" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}><ShieldCheck size={15} /><span>SECURITY<br /><b>MINDED</b></span></motion.div>
              <motion.div className="metric metric-bottom" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: .7 }}><Zap size={15} /><span>FAST / FOCUSED</span></motion.div>
              <motion.div className="metric metric-left" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 1.1 }}><span className="metric-number">05</span><span>CORE<br />CERTS</span></motion.div>
            </motion.div>
          </div>
          <a href="#about" className="scroll-cue"><span>Scroll to explore</span><ArrowDownRight size={16} /></a>
        </section>

        <SectionReveal className="intro-section page-width" id="about">
          <div className="section-kicker">01 / ABOUT</div>
          <div className="intro-content">
            <h2>Where <span>curiosity</span><br />meets craft.</h2>
            <div>
              <p>I'm Khaled, a cybersecurity specialist and full stack .NET developer who cares deeply about the details behind every great digital experience.</p>
              <p>My approach is simple: understand the problem, protect the foundation, then make the solution feel effortless.</p>
              <a className="underlined-link" href="mailto:khaledali2882005@gmail.com?subject=Project%20Inquiry">Get in touch <ChevronRight size={15} /></a>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="skills-section page-width" id="skills">
          <div className="section-heading">
            <div><div className="section-kicker">02 / TOOLKIT</div><h2>Tools for thoughtful<br /><span>solutions.</span></h2></div>
            <p>From secure architecture to polished front ends, I work across the stack to turn ambitious ideas into reliable products.</p>
          </div>
          <div className="skills-grid">{skills.map(({ label, icon: Icon, color }) => <div className={`skill-chip ${color}`} key={label}><Icon size={19} /><span>{label}</span><ArrowUpRight size={14} /></div>)}</div>
          <div className="productivity-row">
            <div className="productivity-title"><span>Also fluent in</span><strong>Productivity & Office Tools</strong></div>
            {productivity.map(({ label, icon: Icon }) => <div className="productivity-chip" key={label}><Icon size={17} /><span>{label}</span><Check size={14} /></div>)}
          </div>
        </SectionReveal>

        <SectionReveal className="projects-section page-width" id="projects">
          <div className="section-heading">
            <div><div className="section-kicker">03 / SELECTED WORK</div><h2>Ideas made<br /><span>tangible.</span></h2></div>
            <a className="underlined-link" href="mailto:khaledali2882005@gmail.com?subject=Project%20Inquiry">Have a project in mind? <ArrowUpRight size={15} /></a>
          </div>
          <div className="projects-grid">{projects.map(({ number, title, category, description, tags, icon: Icon, accent }) => <TiltCard key={title} className="project-card"><div className={`project-icon ${accent}`}><Icon size={23} /></div><div className="project-number">{number}</div><div className="project-meta">{category}<ArrowUpRight size={14} /></div><h3>{title}</h3><p>{description}</p><div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></TiltCard>)}</div>
        </SectionReveal>

        <SectionReveal className="certificates-section page-width" id="certificates">
          <div className="section-heading">
            <div><div className="section-kicker">04 / CREDENTIALS</div><h2>Proof of<br /><span>progress.</span></h2></div>
            <p>A growing collection of focused learning experiences, each one adding a sharper edge to the work.</p>
          </div>
          <div className="certificates-grid">
            {certificates.map((certificate, index) => (
              <TiltCard key={certificate.title} className="certificate-card">
                <button onClick={() => setActiveCertificate(certificate)} aria-label={`Open ${certificate.title} certificate preview`}>
                  <div className="certificate-image">
                    <CertificateGraphic cert={certificate} />
                    <span className="view-certificate">View <ExternalLink size={13} /></span>
                  </div>
                  <div className="certificate-info">
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{certificate.title}</h3>
                      <p>{certificate.issuer} <b>·</b> {certificate.year}</p>
                      <span className="cert-detail">{certificate.detail}</span>
                    </div>
                  </div>
                </button>
              </TiltCard>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="contact-section page-width" id="contact">
          <div className="contact-card">
            <div className="contact-copy">
              <div className="section-kicker">05 / LET'S CONNECT</div>
              <h2>Have a bold idea?<br /><span>Let's build it.</span></h2>
              <p>Whether you have a product to shape or a system to strengthen, I'd love to hear what you're working on.</p>
            </div>
            <div className="contact-links">
              <a href="mailto:khaledali2882005@gmail.com"><span><Mail size={18} /> khaledali2882005@gmail.com</span><ArrowUpRight size={17} /></a>
              <a href="tel:+201121701575"><span><Phone size={18} /> +20 112 170 1575</span><ArrowUpRight size={17} /></a>
              <a href="https://www.linkedin.com/in/khaled-ali5" target="_blank" rel="noopener noreferrer"><span><Linkedin size={18} /> LinkedIn Profile</span><ArrowUpRight size={17} /></a>
              <div className="contact-location"><MapPin size={18} /><span>Beni Suef, Egypt</span></div>
            </div>
          </div>
        </SectionReveal>
      </main>

      <footer className="site-footer page-width">
        <span>© 2026 Khaled Ali</span>
        <span>Designed with intent <span className="footer-dot">.</span></span>
        <a href="#top"><ArrowUpRight size={15} /> Back to top</a>
      </footer>

      <AnimatePresence>
        {activeCertificate && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveCertificate(null)}>
            <motion.div className="certificate-modal" initial={{ opacity: 0, scale: .88, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .9, y: 10 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }} onClick={(event) => event.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveCertificate(null)} aria-label="Close certificate"><X size={18} /></button>
              <CertificateGraphic cert={activeCertificate} large />
              <div className="modal-caption">
                <span>{activeCertificate.issuer} — {activeCertificate.year}</span>
                <strong>{activeCertificate.title}</strong>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
