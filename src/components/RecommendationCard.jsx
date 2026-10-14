import React from 'react';
import { 
  Sparkles, Bookmark, BookmarkCheck, ArrowUpRight, Info
} from 'lucide-react';

export default function RecommendationCard({ 
  recommendation, 
  index, 
  onViewDetails, 
  onSave, 
  isSaved = false 
}) {
  const complexityBadge = {
    Low: { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0' },
    Medium: { bg: '#fffbeb', text: '#b45309', border: '#fde68a' },
    High: { bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' }
  }[recommendation.complexity] || { bg: '#f1f5f9', text: '#334155', border: '#e2e8f0' };

  return (
    <div
      className="card card-hoverable"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: '1.25rem 1.25rem 0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Option {index + 1} • {recommendation.category || 'Fabricated Part'}
            </span>
          </div>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.3
            }}
          >
            {recommendation.productName}
          </h3>
        </div>

        {/* Compatibility Pill */}
        <div
          style={{
            padding: '4px 10px',
            borderRadius: '999px',
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#047857',
            fontWeight: 800,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexShrink: 0
          }}
        >
          <Sparkles size={13} color="#059669" />
          <span>{recommendation.compatibility}% Match</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          padding: '0.75rem 1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #f1f5f9',
          borderBottom: '1px solid #f1f5f9'
        }}
      >
        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Material Req.</div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
            {recommendation.materialRequired} kg
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Utilization</div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#059669' }}>
            {recommendation.materialUtilization}%
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Complexity</div>
          <span
            style={{
              fontSize: '0.725rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: complexityBadge.bg,
              color: complexityBadge.text,
              border: `1px solid ${complexityBadge.border}`,
              display: 'inline-block'
            }}
          >
            {recommendation.complexity}
          </span>
        </div>
      </div>

      {/* Why This Works Section */}
      <div style={{ padding: '1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#475569',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Info size={13} color="#0284c7" />
            Why this works:
          </div>
          <p
            style={{
              fontSize: '0.825rem',
              color: '#475569',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {recommendation.whySuitable}
          </p>
        </div>

        {/* Potential Value Highlight */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            borderTop: '1px dashed #e2e8f0',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Potential Value</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              ₹{(recommendation.potentialValue || 8500).toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>Est. Margin</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#059669' }}>
              +₹{(recommendation.potentialMargin || 3200).toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          borderTop: '1px solid #f1f5f9',
          backgroundColor: '#ffffff',
          display: 'flex',
          gap: '8px'
        }}
      >
        <button
          onClick={() => onViewDetails(recommendation)}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
        >
          <span>View Details</span>
          <ArrowUpRight size={15} />
        </button>

        <button
          onClick={() => onSave(recommendation)}
          className={isSaved ? 'btn btn-outline-brand btn-sm' : 'btn btn-secondary btn-sm'}
          style={{ minWidth: '95px' }}
          title={isSaved ? 'Saved to opportunities' : 'Save this recommendation'}
        >
          {isSaved ? (
            <>
              <BookmarkCheck size={15} color="#059669" />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Bookmark size={15} />
              <span>Save Idea</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
