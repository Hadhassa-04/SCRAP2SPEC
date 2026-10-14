import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const { type = 'success', message, title } = toast;

  const icons = {
    success: <CheckCircle2 size={20} color="#10b981" />,
    warning: <AlertTriangle size={20} color="#f59e0b" />,
    info: <Info size={20} color="#0284c7" />
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        maxWidth: '420px',
        padding: '14px 18px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: type === 'success' ? '4px solid #10b981' : type === 'warning' ? '4px solid #f59e0b' : '4px solid #0284c7'
      }}
    >
      <div style={{ marginTop: '2px', flexShrink: 0 }}>
        {icons[type] || icons.success}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: '2px' }}>
            {title}
          </div>
        )}
        <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.4 }}>
          {message}
        </div>
      </div>
      <button
        onClick={onClose}
        style={{
          color: '#94a3b8',
          padding: '2px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '4px'
        }}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
