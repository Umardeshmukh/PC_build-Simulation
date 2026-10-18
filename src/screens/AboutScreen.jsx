import React from 'react';
import { useGameStore } from '../store/gameStore';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  Award,
  Globe,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const AboutScreen = () => {
  const { previousScreen, setScreen } = useGameStore();

  const skills = [
    'React.js',
    'JavaScript (ES6+)',
    'Three.js / 3D Web',
    'HTML5 & CSS3',
    'Tailwind CSS',
    'Python',
    'Git & GitHub',
    'MySQL',
    'REST APIs',
    'Prompt Engineering',
    'Project Coordination',
    'Performance Optimization'
  ];

  const highlights = [
    {
      role: 'Frontend Developer & Admin Management',
      company: 'iTUX Technologies',
      period: 'Dec 2023 – Present',
      desc: 'Developed and maintained responsive web applications using React.js and modern JavaScript. Coordinated client projects, managed technical documentation, and delivered high-quality solutions remotely.'
    },
    {
      role: 'B.Tech in Computer Science',
      company: "GS Mandal's Marathwada Institute of Technology",
      period: 'Graduated 2024',
      desc: 'Focused on software engineering, computer graphics fundamentals, algorithms, database systems, and full-stack web technologies.'
    }
  ];

  const projects = [
    {
      name: 'PC Forge — PC Building Simulator',
      tech: 'React 19, Zustand, Three.js Ready, CSS Tokens',
      desc: 'Desktop-first hardware simulation game with deterministic compatibility logic, procedural 3D case visualization, diagnostics, and career contracts.'
    },
    {
      name: 'Group Scheduler App',
      tech: 'React.js, REST API, Responsive Design',
      desc: 'Full-featured collaborative scheduling tool enabling seamless meeting coordination across distributed teams.'
    },
    {
      name: 'Unemployment & Data Trends Analysis',
      tech: 'Python, Pandas, Matplotlib',
      desc: 'Visualized multi-year socio-economic data trends with statistical distributions and automated reporting charts.'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      maxWidth: 1100,
      margin: '0 auto',
      padding: '36px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <button
          onClick={() => setScreen(previousScreen || 'menu')}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Return to {previousScreen === 'workshop' ? 'Workshop' : 'Menu'}</span>
        </button>

        <span className="badge badge-cyan" style={{ fontSize: '0.78rem' }}>
          Creator & Architecture
        </span>
      </div>

      {/* Hero Profile Card */}
      <div className="panel" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'center' }}>
          {/* Avatar / Monogram */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #00e5ff 0%, #0072ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(0, 229, 255, 0.35)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.8rem',
            color: '#000',
          }}>
            UD
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                fontWeight: 800,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Mohammed Umer Deshmukh
              </h1>
              <span className="badge badge-emerald">Lead Developer</span>
            </div>

            <div style={{ color: 'var(--cyan)', fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, marginBottom: 12 }}>
              Frontend Developer & Project Coordinator • B.Tech Computer Science
            </div>

            {/* Quick Contact Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={15} color="var(--cyan)" />
                <span>Aurangabad, India</span>
              </div>
              <a
                href="mailto:umardesh@gmail.com"
                style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', textDecoration: 'none' }}
              >
                <Mail size={15} color="var(--emerald)" />
                <span>umardesh@gmail.com</span>
              </a>
              <a
                href="tel:+918484040411"
                style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', textDecoration: 'none' }}
              >
                <Phone size={15} color="var(--amber)" />
                <span>+91 8484040411</span>
              </a>
              <a
                href="https://github.com/umardesh"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--cyan)',
                  textDecoration: 'none',
                  borderBottom: '1px dotted var(--cyan)',
                }}
              >
                <Globe size={15} />
                <span>github.com/umardesh</span>
              </a>
            </div>
          </div>
        </div>

        <p style={{
          marginTop: 20,
          paddingTop: 18,
          borderTop: '1px solid var(--border-subtle)',
          color: 'var(--text-dim)',
          fontSize: '0.92rem',
          lineHeight: 1.6,
        }}>
          Results-driven professional with 2+ years of experience in Frontend Development, Administrative Management,
          and Project Coordination. Passionate about building high-performance, responsive web applications, game engines,
          and interactive simulators. Adept at coordinating multiple technical projects, engineering clean UI systems, and delivering
          reliable, accessible experiences.
        </p>
      </div>

      {/* Main Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {/* Professional Experience & Education */}
        <div className="panel" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Briefcase size={20} color="var(--cyan)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff' }}>
              Experience & Education
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {highlights.map((item, idx) => (
              <div key={idx} style={{ position: 'relative', paddingLeft: 18, borderLeft: '2px solid var(--border-focus)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                  {item.role}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--cyan)', margin: '2px 0 6px 0' }}>
                  <span>{item.company}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.period}</span>
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications Badge Row */}
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: '0.85rem', color: '#fff', fontFamily: 'var(--font-display)' }}>
              <Award size={16} color="var(--emerald)" />
              <span>Certified Credentials</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: '0.75rem' }}>
              <span className="badge badge-cyan">IBM SkillsBuild — Prompt Engineering</span>
              <span className="badge badge-emerald">CodeAlpha — Python & Machine Learning</span>
              <span className="badge badge-amber">CodeBasics — SQL Professional</span>
            </div>
          </div>
        </div>

        {/* Technical Core Competencies & Simulator Architecture */}
        <div className="panel" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Code2 size={20} color="var(--emerald)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff' }}>
              Technical Stack & Skills
            </h3>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  background: 'var(--bg-surface-2)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#fff',
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Featured Works */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: '0.85rem', color: '#fff', fontFamily: 'var(--font-display)' }}>
            <Cpu size={16} color="var(--cyan)" />
            <span>Key Project Portfolio</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {projects.map((proj) => (
              <div
                key={proj.name}
                style={{
                  background: 'var(--bg-surface-2)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.92rem', color: '#fff', marginBottom: 2 }}>
                  {proj.name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)', marginBottom: 4 }}>
                  {proj.tech}
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                  {proj.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simulator Project Vision */}
      <div className="panel" style={{ padding: '24px 28px', background: 'var(--bg-surface-1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Sparkles size={20} color="var(--cyan)" />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#fff' }}>
            About The PC Forge Project
          </h3>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 16 }}>
          PC Forge was engineered to bridge the gap between high-overhead desktop hardware simulators and instant-access browser web apps.
          Built entirely with modern React, lightweight procedural graphics, and deterministic hardware evaluation engines, it provides an authentic PC building workbench experience without requiring expensive downloads or high-end graphics cards.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <button
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            onClick={() => useGameStore.getState().openContribute('about')}
          >
            <span>Suggest a Feature or Part</span>
          </button>
          <a
            href="https://github.com/umardesh"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ padding: '8px 18px', fontSize: '0.85rem', textDecoration: 'none' }}
          >
            <span>Visit GitHub Profile</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};
