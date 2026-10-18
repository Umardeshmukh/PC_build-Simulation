import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ConfirmModal = ({ isOpen, title, message, confirmText = 'Confirm', onConfirm, onCancel, isDanger = false }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: 20,
    }}>
      <div className="panel" style={{
        maxWidth: 440,
        width: '100%',
        padding: 24,
        border: '1px solid var(--border-focus)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            padding: 8,
            borderRadius: '50%',
            backgroundColor: isDanger ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 229, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <AlertCircle size={22} color={isDanger ? '#ef4444' : '#00e5ff'} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff' }}>{title}</h3>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: 24 }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className={isDanger ? 'btn-danger' : 'btn-primary'} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
