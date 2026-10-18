import React from 'react';
import { useGameStore } from '../store/gameStore';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const NotificationToast = () => {
  const { toasts, dismissToast } = useGameStore();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 24,
      right: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      zIndex: 9999,
      maxWidth: 380,
    }}>
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isDanger = toast.type === 'danger';

        const borderColor = isSuccess ? 'rgba(16, 185, 129, 0.4)' : isDanger ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 229, 255, 0.4)';
        const bgColor = isSuccess ? '#0d1f18' : isDanger ? '#250f11' : '#0e1824';
        const iconColor = isSuccess ? '#10b981' : isDanger ? '#ef4444' : '#00e5ff';

        return (
          <div
            key={toast.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              color: '#f3f4f6',
              fontSize: '0.88rem',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {isSuccess && <CheckCircle2 size={18} color={iconColor} />}
              {isDanger && <AlertTriangle size={18} color={iconColor} />}
              {!isSuccess && !isDanger && <Info size={18} color={iconColor} />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', padding: 2 }}
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
