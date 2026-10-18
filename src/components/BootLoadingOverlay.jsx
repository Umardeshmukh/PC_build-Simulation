import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Cpu, Zap, Activity } from 'lucide-react';

export const BootLoadingOverlay = () => {
  const { isBootLoading, bootMessage, bootProgress } = useGameStore();

  if (!isBootLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 7, 10, 0.88)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 11000,
      animation: 'fadeIn 0.2s ease',
    }}>
      <div className="circuit-scan-line" />

      <div className="panel" style={{
        maxWidth: 480,
        width: '90%',
        padding: '36px 32px',
        border: '1px solid var(--border-focus)',
        boxShadow: '0 0 50px rgba(0, 229, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Radar Hologram Spinner */}
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <div className="radar-spinner" />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <Cpu size={22} color="var(--cyan)" />
          </div>
        </div>

        {/* Title & Stage */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}>
          Hardware Diagnostic Sequence
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          color: 'var(--cyan)',
          marginBottom: 20,
          minHeight: 20,
        }}>
          {bootMessage}
        </div>

        {/* Progress Bar Container */}
        <div style={{
          width: '100%',
          height: 8,
          background: 'var(--bg-surface-3)',
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 14,
          border: '1px solid var(--border-subtle)',
        }}>
          <div
            className="cyber-progress-fill"
            style={{
              width: `${bootProgress}%`,
              height: '100%',
              transition: 'width 0.25s ease-out',
            }}
          />
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity size={13} color="var(--emerald)" />
            <span>STANDBY VOLTAGE: 12.1V</span>
          </div>
          <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>{bootProgress}%</span>
        </div>
      </div>
    </div>
  );
};
