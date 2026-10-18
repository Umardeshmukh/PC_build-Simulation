import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, RotateCcw, Wrench, Settings as SettingsIcon, Cpu, Sparkles, Volume2, VolumeX, ShieldCheck, User } from 'lucide-react';

export const MainMenu = () => {
  const {
    setScreen,
    hasSavedCareer,
    career,
    continueCareer,
    startNewCareer,
    settings,
    updateSettings
  } = useGameStore();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '40px 32px',
      position: 'relative',
      maxWidth: 1200,
      margin: '0 auto',
    }}>
      {/* Top Header / Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #00e5ff 0%, #0072ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)'
          }}>
            <Cpu size={20} color="#000" />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-dim)', letterSpacing: 1 }}>
            SYSTEM v0.1.0 // FOUNDATION
          </span>
        </div>

        <button
          onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          title={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
        >
          {settings.soundEnabled ? <Volume2 size={16} color="var(--cyan)" /> : <VolumeX size={16} color="var(--rose)" />}
          <span>{settings.soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <div style={{ margin: 'auto 0', maxWidth: 640 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12 }} className="badge badge-cyan">
          <Sparkles size={12} />
          <span>Next-Gen Hardware Simulator</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.8rem, 6vw, 4.4rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-1px',
          textTransform: 'uppercase',
          background: 'linear-gradient(180deg, #ffffff 40%, #9ca3af 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 16,
        }}>
          PC Forge
        </h1>

        <p style={{
          color: 'var(--text-dim)',
          fontSize: '1.08rem',
          lineHeight: 1.6,
          marginBottom: 36,
          maxWidth: 520,
        }}>
          Design, assemble, diagnose, and benchmark custom computer rigs.
          Master realistic socket compatibility, thermal headroom, and component synergy in Sandbox or client Career mode.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360 }}>
          {hasSavedCareer && (
            <button
              className="btn-primary"
              style={{ justifyContent: 'space-between', padding: '14px 20px', fontSize: '1.05rem' }}
              onClick={continueCareer}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Play size={18} fill="#fff" />
                <span>Continue Career</span>
              </div>
              <span style={{ fontSize: '0.78rem', opacity: 0.85, fontWeight: 500, fontFamily: 'var(--font-mono)' }}>
                ₹{career.balance.toLocaleString()}
              </span>
            </button>
          )}

          <button
            className={hasSavedCareer ? 'btn-secondary' : 'btn-primary'}
            style={{ justifyContent: 'space-between', padding: '14px 20px', fontSize: '1.05rem' }}
            onClick={() => {
              if (hasSavedCareer) {
                // confirmation before overriding
                startNewCareer();
              } else {
                startNewCareer();
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <RotateCcw size={18} />
              <span>New Career</span>
            </div>
            <span style={{ fontSize: '0.75rem', opacity: 0.7, fontFamily: 'var(--font-mono)' }}>Tier 1</span>
          </button>

          <button
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '14px 20px', fontSize: '1.05rem' }}
            onClick={() => setScreen('sandbox-setup')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Wrench size={18} />
              <span>Sandbox Mode</span>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Free Build</span>
          </button>

          <button
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '14px 20px', fontSize: '1.05rem' }}
            onClick={() => setScreen('settings')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SettingsIcon size={18} />
              <span>Settings</span>
            </div>
          </button>

          <button
            className="btn-secondary"
            style={{
              justifyContent: 'space-between',
              padding: '14px 20px',
              fontSize: '1.05rem',
              borderColor: 'rgba(0, 229, 255, 0.35)',
              background: 'linear-gradient(90deg, rgba(0, 229, 255, 0.08) 0%, transparent 100%)',
            }}
            onClick={() => {
              useGameStore.getState().openContribute('menu');
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Sparkles size={18} color="var(--cyan)" />
              <span style={{ color: '#fff' }}>Suggestions & Feedback</span>
            </div>
            <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>NEW</span>
          </button>

          <button
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '14px 20px', fontSize: '1.05rem' }}
            onClick={() => {
              useGameStore.getState().openAbout('menu');
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <User size={18} color="var(--emerald)" />
              <span>About Developer & Simulator</span>
            </div>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        paddingTop: 24,
        borderTop: '1px solid var(--border-subtle)',
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldCheck size={16} color="var(--emerald)" />
          <span>Engine Active</span>
          <span>•</span>
          <button
            onClick={() => useGameStore.getState().openAbout('menu')}
            style={{ color: 'var(--cyan)', textDecoration: 'underline', fontSize: '0.82rem' }}
          >
            Engineered by Mohammed Umer Deshmukh
          </button>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>React 19</span>
          <span>•</span>
          <span>Zustand State</span>
          <span>•</span>
          <span>Three.js Ready</span>
        </div>
      </div>
    </div>
  );
};
