import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  History, 
  Bookmark, 
  Scale, 
  Settings, 
  CheckCircle2
} from 'lucide-react';

export default function Sidebar({ 
  currentView, 
  setCurrentView, 
  savedCount = 0, 
  historyCount = 0,
  hasActiveAnalysis = false,
  onOpenArchitectureModal,
  mobileOpen = false,
  setMobileOpen
}) {
  const NAV_ITEMS = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={19} />,
      badge: null
    },
    {
      id: 'analyze',
      label: 'Analyze Material',
      icon: <Sparkles size={19} />,
      badge: 'Core'
    },
    {
      id: 'results',
      label: 'Analysis Results',
      icon: <CheckCircle2 size={19} />,
      badge: hasActiveAnalysis ? 'Active' : null,
      disabled: !hasActiveAnalysis
    },
    {
      id: 'compare',
      label: 'Compare Ideas',
      icon: <Scale size={19} />,
      badge: null
    },
    {
      id: 'saved',
      label: 'Saved Opportunities',
      icon: <Bookmark size={19} />,
      badge: savedCount > 0 ? savedCount : null
    },
    {
      id: 'history',
      label: 'Material History',
      icon: <History size={19} />,
      badge: historyCount > 0 ? historyCount : null
    }
  ];

  const handleNavClick = (id) => {
    setCurrentView(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            zIndex: 40,
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        style={{
          width: '260px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          transition: 'transform 0.25s ease-in-out',
          zIndex: 45
        }}
        className={`app-sidebar ${mobileOpen ? 'sidebar-mobile-open' : ''}`}
      >
        {/* Navigation Section */}
        <div style={{ padding: '1.25rem 1rem', flex: 1, overflowY: 'auto' }}>
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#94a3b8',
              padding: '0 0.75rem 0.5rem 0.75rem'
            }}
          >
            Manufacturing Ops
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_ITEMS.map((item) => {
              const isActive = currentView === item.id;
              const isDisabled = item.disabled;

              return (
                <button
                  key={item.id}
                  onClick={() => !isDisabled && handleNavClick(item.id)}
                  disabled={isDisabled}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#065f46' : isDisabled ? '#cbd5e1' : '#334155',
                    backgroundColor: isActive ? '#ecfdf5' : 'transparent',
                    border: isActive ? '1px solid #a7f3d0' : '1px solid transparent',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                  id={`nav-${item.id}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: isActive ? '#059669' : isDisabled ? '#cbd5e1' : '#64748b' }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '1px 7px',
                        borderRadius: '999px',
                        backgroundColor: isActive ? '#10b981' : item.badge === 'Active' ? '#dbeafe' : item.badge === 'Core' ? '#fef3c7' : '#f1f5f9',
                        color: isActive ? '#ffffff' : item.badge === 'Active' ? '#1d4ed8' : item.badge === 'Core' ? '#b45309' : '#475569'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#94a3b8',
              padding: '1.5rem 0.75rem 0.5rem 0.75rem'
            }}
          >
            System & Architecture
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => {
                if (setMobileOpen) setMobileOpen(false);
                onOpenArchitectureModal();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '10px',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#475569',
                backgroundColor: 'transparent',
                border: '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span style={{ color: '#6366f1' }}>
                <Settings size={19} />
              </span>
              <span>Future AI Specs</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer Sustainability Card */}
        <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
          <div
            style={{
              padding: '0.85rem',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)'
                }}
              />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>
                SCRAP2SPEC Engine
              </span>
            </div>
            <p style={{ fontSize: '0.725rem', color: '#64748b', lineHeight: 1.4 }}>
              Intelligent metallurgical heuristics running locally.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
