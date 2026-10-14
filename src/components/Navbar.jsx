import React from 'react';
import { 
  Sparkles, Layers, Cpu, Menu, X, Zap
} from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  onOpenArchitectureModal, 
  onLoadDemo,
  mobileMenuOpen,
  setMobileMenuOpen
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.04)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.75rem',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setCurrentView('landing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textAlign: 'left'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #059669 0%, #0f172a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(5, 150, 105, 0.25)',
                color: '#ffffff'
              }}
            >
              <Layers size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#0f172a'
                  }}
                >
                  SCRAP<span style={{ color: '#10b981' }}>2</span>SPEC
                </span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    border: '1px solid #a7f3d0'
                  }}
                >
                  PROTOTYPE
                </span>
              </div>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  color: '#64748b',
                  letterSpacing: '0.02em'
                }}
              >
                Waste Less. Make More.
              </span>
            </div>
          </button>
        </div>

        {/* Center / Navigation Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '999px',
            border: '1px solid #e2e8f0'
          }}
          className="nav-pills-desktop"
        >
          <button
            onClick={() => setCurrentView('landing')}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: currentView === 'landing' ? 700 : 500,
              backgroundColor: currentView === 'landing' ? '#ffffff' : 'transparent',
              color: currentView === 'landing' ? '#0f172a' : '#64748b',
              boxShadow: currentView === 'landing' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Landing Page
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: currentView !== 'landing' ? 700 : 500,
              backgroundColor: currentView !== 'landing' ? '#ffffff' : 'transparent',
              color: currentView !== 'landing' ? '#0f172a' : '#64748b',
              boxShadow: currentView !== 'landing' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Manufacturer App
          </button>
        </div>

        {/* Right CTA cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Quick Try Demo Button */}
          <button
            onClick={onLoadDemo}
            className="btn btn-outline-brand btn-sm"
            title="Auto-fill Mild Steel demo scrap plate"
            id="nav-demo-btn"
          >
            <Zap size={15} />
            <span>Try Demo Material</span>
          </button>

          {/* AI Pipeline Info */}
          <button
            onClick={onOpenArchitectureModal}
            className="btn btn-secondary btn-sm"
            title="View 10-stage AI architecture roadmap"
          >
            <Cpu size={15} color="#6366f1" />
            <span style={{ display: 'inline' }}>AI Roadmap</span>
          </button>

          {/* Analyze CTA */}
          <button
            onClick={() => setCurrentView('analyze')}
            className="btn btn-primary btn-sm"
            id="nav-analyze-cta"
          >
            <Sparkles size={15} />
            <span>Analyze Material</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: '#334155'
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
