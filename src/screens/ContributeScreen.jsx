import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import {
  ArrowLeft,
  MessageSquarePlus,
  ThumbsUp,
  Cpu,
  Sparkles,
  Bug,
  Send,
  Copy,
  Check,
  Search,
  Globe,
  User
} from 'lucide-react';

export const ContributeScreen = () => {
  const {
    previousScreen,
    setScreen,
    suggestions,
    addSuggestion,
    upvoteSuggestion,
    addToast
  } = useGameStore();

  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'submit' | 'deploy'
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'hardware',
    author: '',
  });

  const categories = [
    { id: 'all', label: 'All Suggestions' },
    { id: 'hardware', label: 'Hardware & Parts' },
    { id: 'feature', label: 'Features & Benchmarks' },
    { id: 'customization', label: 'Visual & RGB' },
    { id: 'bug', label: 'Bug Reports' },
  ];

  const filteredSuggestions = suggestions.filter((sug) => {
    const matchesCat = filterCategory === 'all' || sug.category === filterCategory;
    const matchesSearch =
      sug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sug.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sug.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      addToast('Please fill in both the title and details.', 'danger');
      return;
    }

    addSuggestion(formData);
    setFormData({ title: '', description: '', category: 'hardware', author: '' });
    setActiveTab('browse');
  };

  const handleCopyFeedbackJson = () => {
    try {
      const dataStr = JSON.stringify(suggestions, null, 2);
      navigator.clipboard.writeText(dataStr);
      setCopied(true);
      addToast('All feedback copied to clipboard in JSON format!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      addToast('Could not copy directly to clipboard', 'danger');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      maxWidth: 1100,
      margin: '0 auto',
      padding: '32px 24px',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => useGameStore.getState().openAbout('contribute')}
            className="btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.82rem' }}
          >
            <User size={14} color="var(--emerald)" />
            <span>About Creator</span>
          </button>

          <button
            onClick={handleCopyFeedbackJson}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            title="Export all community feedback as JSON"
          >
            {copied ? <Check size={15} color="var(--emerald)" /> : <Copy size={15} />}
            <span>{copied ? 'Copied JSON' : 'Export Feedback'}</span>
          </button>

          <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
            Community Hub
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="panel" style={{ padding: '24px 28px', background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <MessageSquarePlus size={26} color="var(--cyan)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff', textTransform: 'uppercase' }}>
            Suggestions & Community Feedback
          </h2>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem', maxWidth: 720, lineHeight: 1.5 }}>
          PC Forge is community-driven! Suggest new fictional CPUs, GPUs, chassis designs, benchmark algorithms, or report issues.
          Your feedback helps shape the upcoming milestones.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10, flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('browse')}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: activeTab === 'browse' ? 'var(--cyan)' : 'var(--text-dim)',
            borderBottom: activeTab === 'browse' ? '2px solid var(--cyan)' : '2px solid transparent',
            paddingBottom: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Sparkles size={16} />
          <span>Community Suggestions ({suggestions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('submit')}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: activeTab === 'submit' ? 'var(--cyan)' : 'var(--text-dim)',
            borderBottom: activeTab === 'submit' ? '2px solid var(--cyan)' : '2px solid transparent',
            paddingBottom: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Send size={15} />
          <span>Submit New Idea</span>
        </button>

        <button
          onClick={() => setActiveTab('deploy')}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: activeTab === 'deploy' ? 'var(--cyan)' : 'var(--text-dim)',
            borderBottom: activeTab === 'deploy' ? '2px solid var(--cyan)' : '2px solid transparent',
            paddingBottom: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Globe size={15} />
          <span>Web & Free Hosting Guide</span>
        </button>
      </div>

      {/* TAB 1: BROWSE SUGGESTIONS */}
      {activeTab === 'browse' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Controls: Search and Filter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-display)',
                    background: filterCategory === cat.id ? 'var(--bg-surface-3)' : 'var(--bg-surface-2)',
                    color: filterCategory === cat.id ? 'var(--cyan)' : 'var(--text-dim)',
                    border: filterCategory === cat.id ? '1px solid var(--cyan)' : '1px solid var(--border-subtle)',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--bg-surface-2)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              minWidth: 240,
            }}>
              <Search size={15} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search ideas or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '0.82rem',
                  outline: 'none',
                  width: '100%',
                }}
              />
            </div>
          </div>

          {/* Suggestions List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filteredSuggestions.length === 0 ? (
              <div className="panel" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                No suggestions found matching your filter. Be the first to submit one!
              </div>
            ) : (
              filteredSuggestions.map((sug) => {
                const statusColor =
                  sug.status === 'planned' ? 'var(--emerald)' : sug.status === 'under_review' ? 'var(--amber)' : 'var(--cyan)';
                const statusLabel =
                  sug.status === 'planned' ? 'PLANNED FOR ROADMAP' : sug.status === 'under_review' ? 'UNDER REVIEW' : 'NEW PROPOSAL';

                return (
                  <div
                    key={sug.id}
                    className="panel"
                    style={{
                      padding: 20,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 20,
                      transition: 'border-color 0.15s ease',
                    }}
                  >
                    {/* Upvote Button Column */}
                    <button
                      onClick={() => upvoteSuggestion(sug.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 54,
                        padding: '10px 8px',
                        borderRadius: 'var(--radius-sm)',
                        background: sug.upvoted ? 'rgba(0, 229, 255, 0.15)' : 'var(--bg-surface-2)',
                        border: sug.upvoted ? '1px solid var(--cyan)' : '1px solid var(--border-subtle)',
                        color: sug.upvoted ? 'var(--cyan)' : 'var(--text-dim)',
                        gap: 4,
                      }}
                    >
                      <ThumbsUp size={18} fill={sug.upvoted ? 'var(--cyan)' : 'none'} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.88rem' }}>
                        {sug.votes}
                      </span>
                    </button>

                    {/* Content Column */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.08rem', color: '#fff' }}>
                            {sug.title}
                          </h4>
                          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                            {sug.category}
                          </span>
                        </div>

                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: statusColor,
                          border: `1px solid ${statusColor}`,
                          padding: '2px 8px',
                          borderRadius: 4,
                        }}>
                          {statusLabel}
                        </span>
                      </div>

                      <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: 12 }}>
                        {sug.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>Proposed by <strong style={{ color: '#fff' }}>{sug.author}</strong></span>
                        <span>•</span>
                        <span>{sug.createdAt}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SUBMIT NEW SUGGESTION */}
      {activeTab === 'submit' && (
        <div className="panel" style={{ padding: 32, maxWidth: 760 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#fff', marginBottom: 6 }}>
            Submit Your Hardware Idea or Feedback
          </h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', marginBottom: 24 }}>
            Propose a new component with specifications, recommend a benchmark preset, or describe a quality-of-life feature.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>
                  CATEGORY
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-2)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px',
                    color: '#fff',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                  }}
                >
                  <option value="hardware">Hardware / Component</option>
                  <option value="feature">Feature / Benchmarks</option>
                  <option value="customization">Visual / RGB / Chassis</option>
                  <option value="bug">Bug Report / Performance</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>
                  YOUR BUILDER HANDLE / NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. CyberSmith, TechGuru"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-2)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px',
                    color: '#fff',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>
                TITLE / HARDWARE NAME
              </label>
              <input
                type="text"
                placeholder="e.g. TitanFrost Quad 360mm Radiator or Budget 1440p GPU"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-2)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px',
                  color: '#fff',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>
                SPECIFICATIONS / DESCRIPTION / FEEDBACK
              </label>
              <textarea
                rows={5}
                placeholder="Describe key specs (socket, power draw, dimensions), compatibility thoughts, or gameplay improvements..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-2)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px',
                  color: '#fff',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setActiveTab('browse')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px 24px' }}
              >
                <Send size={16} />
                <span>Publish Suggestion</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: DEPLOY & WEB HOSTING INFO */}
      {activeTab === 'deploy' && (
        <div className="panel" style={{ padding: 32, maxWidth: 840 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Globe size={24} color="var(--cyan)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff' }}>
              Free Web Deployment & Distribution
            </h3>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 24 }}>
            PC Forge is 100% client-side compatible with zero backend required. You can host and deploy it instantly for free on
            platforms like Vercel, Netlify, Cloudflare Pages, or GitHub Pages.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ background: 'var(--bg-surface-2)', padding: 18, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff', marginBottom: 8 }}>
                Option 1: Deploy with Vercel (Recommended, Free)
              </h4>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: 12 }}>
                1. Push this folder to a GitHub repository.<br />
                2. Go to <strong>vercel.com</strong>, click <em>Add New &gt; Project</em> and import the repo.<br />
                3. Framework Preset: <code>Vite</code>, Build Command: <code>npm run build</code>, Output Directory: <code>dist</code>.<br />
                4. Click <strong>Deploy</strong> — live in 30 seconds!
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface-2)', padding: 18, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff', marginBottom: 8 }}>
                Option 2: Deploy with Netlify Drop or CLI
              </h4>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                Run <code>npm run build</code> locally, then drag and drop the generated <code>dist/</code> folder into <strong>app.netlify.com/drop</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
