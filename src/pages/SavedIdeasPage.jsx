import React, { useState } from 'react';
import { 
  Bookmark, Trash2, ArrowUpRight, Sparkles, Filter
} from 'lucide-react';

export default function SavedIdeasPage({ 
  savedList = [], 
  onUpdateStatus, 
  onDeleteSaved, 
  onViewDetails,
  onAnalyzeNew 
}) {
  const [filterStatus, setFilterStatus] = useState('All');

  const STATUSES = ['All', 'New', 'Reviewing', 'Prototype Planned', 'In Production', 'Completed'];

  const filtered = filterStatus === 'All' 
    ? savedList 
    : savedList.filter(item => item.status === filterStatus);

  const totalPipelineValue = savedList.reduce((sum, item) => sum + (item.potentialValue || 0), 0);

  const statusColors = {
    'New': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
    'Reviewing': { bg: '#fffbeb', text: '#b45309', border: '#fde68a' },
    'Prototype Planned': { bg: '#faf5ff', text: '#6d28d9', border: '#ddd6fe' },
    'In Production': { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0' },
    'Completed': { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' }
  };

  return (
    <div className="page-wrapper">
      {/* Header & Stats Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '2rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981'
              }}
            />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Persistent Pipeline
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Saved Opportunities
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
            Track and move prioritized manufacturing ideas from concept to factory production.
          </p>
        </div>

        {/* Pipeline Value Widget */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Pipeline Value</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#047857' }}>
              ₹{totalPipelineValue.toLocaleString('en-IN')}
            </div>
          </div>
          <span className="badge badge-brand">
            {savedList.length} Opportunities
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '1.75rem',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}
      >
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
          <Filter size={15} />
          Status:
        </span>

        {STATUSES.map((status) => {
          const isActive = filterStatus === status;
          const count = status === 'All' 
            ? savedList.length 
            : savedList.filter(s => s.status === status).length;

          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.8125rem',
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? '#0f172a' : '#ffffff',
                color: isActive ? '#ffffff' : '#475569',
                border: isActive ? '1px solid #0f172a' : '1px solid #cbd5e1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{status}</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: isActive ? '#334155' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#64748b'
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '3.5rem 1.5rem',
            backgroundColor: '#ffffff',
            borderRadius: '16px'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              color: '#059669'
            }}
          >
            <Bookmark size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            No Saved Opportunities Found
          </h3>
          <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>
            {filterStatus === 'All'
              ? 'You have not saved any manufacturing opportunities yet. Run a material analysis and click "Save Idea" on any recommendation.'
              : `There are currently no saved opportunities in the "${filterStatus}" stage.`}
          </p>
          <button onClick={onAnalyzeNew} className="btn btn-primary">
            <Sparkles size={16} />
            <span>Analyze Material Now</span>
          </button>
        </div>
      ) : (
        /* Grid of Saved Opportunity Cards */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {filtered.map((item) => {
            const currentBadge = statusColors[item.status] || statusColors['New'];

            return (
              <div
                key={item.id}
                className="card card-hoverable"
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div>
                  {/* Top Row: Date & Status Changer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Saved on {item.dateSaved || 'Recent'}
                    </span>

                    {/* Status Dropdown */}
                    <select
                      value={item.status || 'New'}
                      onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                      style={{
                        padding: '3px 8px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        borderRadius: '999px',
                        backgroundColor: currentBadge.bg,
                        color: currentBadge.text,
                        border: `1px solid ${currentBadge.border}`,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="New">Status: New</option>
                      <option value="Reviewing">Status: Reviewing</option>
                      <option value="Prototype Planned">Status: Prototype Planned</option>
                      <option value="In Production">Status: In Production</option>
                      <option value="Completed">Status: Completed</option>
                    </select>
                  </div>

                  {/* Title & Material Tag */}
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                    {item.productName}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                      {item.material || 'Mild Steel (4 mm)'}
                    </span>
                    <span className="badge badge-brand">
                      {item.compatibility}% Compatibility
                    </span>
                  </div>

                  {/* Metrics Box */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px',
                      backgroundColor: '#f8fafc',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      marginBottom: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Potential Value</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                        ₹{(item.potentialValue || 8500).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Material Required</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#334155' }}>
                        {item.materialRequired || 12} kg
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid #f1f5f9'
                  }}
                >
                  <button
                    onClick={() => onViewDetails(item)}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>View Full Specs</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <button
                    onClick={() => onDeleteSaved(item.id)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                    title="Remove from saved opportunities"
                  >
                    <Trash2 size={14} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
