import React from 'react';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, Play, Infinity, DollarSign, Check } from 'lucide-react';

export const SandboxSetup = () => {
  const { setScreen, sandboxConfig, setSandboxConfig, startSandbox } = useGameStore();

  const budgetPresets = [
    { label: 'Unlimited Budget', type: 'unlimited', value: null, desc: 'Zero limits. Build extreme halo-tier flagships.' },
    { label: 'Budget Rig (₹40,000)', type: 'custom', value: 40000, desc: 'Tight constraints. Perfect for entry-level builds.' },
    { label: 'Mid-Tier Rig (₹85,000)', type: 'custom', value: 85000, desc: 'Balanced sweet-spot gaming & productivity workstation.' },
    { label: 'Enthusiast (₹1,75,000)', type: 'custom', value: 175000, desc: 'High-end liquid cooling and top-tier GPU clearance.' },
  ];

  const handleSelectPreset = (preset) => {
    setSandboxConfig({
      budgetType: preset.type,
      customBudget: preset.value || 100000,
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      maxWidth: 900,
      margin: '0 auto',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      {/* Top Bar */}
      <div style={{ marginBottom: 32 }}>
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
        <div style={{ marginBottom: 28 }}>
          <span className="badge badge-emerald" style={{ marginBottom: 8, display: 'inline-block' }}>
            Creative Mode
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            Sandbox Bench Configuration
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
            Experiment freely with component pairing, form factor compatibility, and simulated benchmarking.
          </p>
        </div>

        {/* Preset Selection Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}>
          {budgetPresets.map((preset) => {
            const isSelected =
              preset.type === 'unlimited'
                ? sandboxConfig.budgetType === 'unlimited'
                : sandboxConfig.budgetType === 'custom' && sandboxConfig.customBudget === preset.value;

            return (
              <div
                key={preset.label}
                onClick={() => handleSelectPreset(preset)}
                style={{
                  background: isSelected ? 'var(--bg-surface-3)' : 'var(--bg-surface-2)',
                  border: isSelected ? '1px solid var(--cyan)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? '0 0 16px rgba(0, 229, 255, 0.15)' : 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px 18px',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  position: 'relative',
                }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'var(--cyan)',
                    color: '#000',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  {preset.type === 'unlimited' ? (
                    <Infinity size={22} color="var(--cyan)" />
                  ) : (
                    <DollarSign size={20} color="var(--emerald)" />
                  )}
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff' }}>
                    {preset.label}
                  </h4>
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem', lineHeight: 1.4 }}>
                  {preset.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Custom Input when custom is selected */}
        {sandboxConfig.budgetType === 'custom' && (
          <div style={{
            background: 'var(--bg-surface-2)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: '#fff', marginBottom: 2 }}>
                Custom Cap (INR)
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Tune exact target limit for benchmark cost-efficiency
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>₹</span>
              <input
                type="number"
                min="20000"
                max="1000000"
                step="5000"
                value={sandboxConfig.customBudget}
                onChange={(e) => setSandboxConfig({ customBudget: Math.max(10000, Number(e.target.value)) })}
                style={{
                  background: 'var(--bg-surface-3)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 4,
                  padding: '8px 12px',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  width: 140,
                }}
              />
            </div>
          </div>
        )}

        {/* Start Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 14 }}>
          <button
            className="btn-secondary"
            onClick={() => setScreen('menu')}
          >
            Cancel
          </button>
          <button
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '1rem' }}
            onClick={startSandbox}
          >
            <Play size={18} fill="#fff" />
            <span>Launch Workshop</span>
          </button>
        </div>
      </div>
    </div>
  );
};
