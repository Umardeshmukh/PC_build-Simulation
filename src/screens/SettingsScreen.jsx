import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, Volume2, VolumeX, Monitor, Trash2, CheckCircle2 } from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';

export const SettingsScreen = () => {
  const { setScreen, settings, updateSettings, resetCareerSave } = useGameStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const qualities = [
    { id: 'low', label: 'Low', desc: 'Minimal shadows and simplified materials.' },
    { id: 'medium', label: 'Medium', desc: 'Balanced lighting and anti-aliasing.' },
    { id: 'high', label: 'High', desc: 'Full shadow maps, ambient occlusion, reflections.' },
    { id: 'ultra', label: 'Ultra', desc: 'Maximum procedural details and post-processing.' },
  ];

  const handleConfirmReset = () => {
    resetCareerSave();
    setShowResetConfirm(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      maxWidth: 800,
      margin: '0 auto',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <div style={{ marginBottom: 28 }}>
        <button
          onClick={() => setScreen('menu')}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Return to Menu</span>
        </button>
      </div>

      <div className="panel" style={{ padding: '36px 32px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
          System Settings
        </h2>

        {/* Audio Setting */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              {settings.soundEnabled ? <Volume2 size={20} color="var(--cyan)" /> : <VolumeX size={20} color="var(--rose)" />}
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff' }}>Audio & SFX</span>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Master switch for UI clicks, assembly audio, and simulated fan hums.
            </div>
          </div>

          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={settings.soundEnabled ? 'btn-primary' : 'btn-secondary'}
            style={{ minWidth: 100 }}
          >
            {settings.soundEnabled ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>

        {/* Graphics Quality */}
        <div style={{ padding: '24px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Monitor size={20} color="var(--cyan)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff' }}>
              3D Viewport Quality Preset
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
            marginTop: 12,
          }}>
            {qualities.map((q) => {
              const isSelected = settings.graphicsQuality === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => updateSettings({ graphicsQuality: q.id })}
                  style={{
                    background: isSelected ? 'var(--bg-surface-3)' : 'var(--bg-surface-2)',
                    border: isSelected ? '1px solid var(--cyan)' : '1px solid var(--border-subtle)',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff' }}>{q.label}</span>
                    {isSelected && <CheckCircle2 size={16} color="var(--cyan)" />}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.3 }}>{q.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community & Feedback Link */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          borderBottom: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff', marginBottom: 4 }}>
              Community Feedback & Part Suggestions
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Vote on upcoming hardware, propose custom cases, or report issues.
            </div>
          </div>

          <button
            className="btn-secondary"
            onClick={() => useGameStore.getState().openContribute('settings')}
          >
            Open Suggestions Hub
          </button>
        </div>

        {/* About Developer Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          borderBottom: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff', marginBottom: 4 }}>
              About Mohammed Umer Deshmukh
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Lead frontend developer, technical background, project architecture, and credentials.
            </div>
          </div>

          <button
            className="btn-secondary"
            onClick={() => useGameStore.getState().openAbout('settings')}
          >
            View Developer Profile
          </button>
        </div>

        {/* Reset Save Data */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 0 12px',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fca5a5', marginBottom: 4 }}>
              Clear Local Progression
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Wipes career balance, completed client jobs, and resets to baseline Apprentice.
            </div>
          </div>

          <button
            className="btn-danger"
            onClick={() => setShowResetConfirm(true)}
          >
            <Trash2 size={16} />
            <span>Reset Save Data</span>
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showResetConfirm}
        title="Reset All Career Progress?"
        message="This action is permanent and cannot be undone. All career cash, completed contracts, and rank unlocks will be erased."
        confirmText="Yes, Wipe Save"
        isDanger={true}
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
