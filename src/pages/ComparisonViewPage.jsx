import React, { useState } from 'react';
import { 
  Scale, ArrowUpDown, Sparkles, Bookmark, BookmarkCheck, ArrowUpRight, 
  TrendingUp, Award, Zap
} from 'lucide-react';

export default function ComparisonViewPage({ 
  recommendations = [], 
  onViewDetails, 
  onSave, 
  savedIds = [],
  onAnalyzeNew 
}) {
  const [sortBy, setSortBy] = useState('match'); // 'match', 'value', 'utilization', 'complexity'

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="page-wrapper" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            color: '#64748b'
          }}
        >
          <Scale size={28} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
          No Recommendations to Compare
        </h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Please run a material analysis or test with our demo dataset to view side-by-side opportunities.
        </p>
        <button onClick={onAnalyzeNew} className="btn btn-primary">
          <Sparkles size={16} />
          <span>Analyze Material</span>
        </button>
      </div>
    );
  }

  // Sorting logic
  const sortedList = [...recommendations].sort((a, b) => {
    if (sortBy === 'match') {
      return (b.compatibility || 0) - (a.compatibility || 0);
    }
    if (sortBy === 'value') {
      return (b.potentialValue || 0) - (a.potentialValue || 0);
    }
    if (sortBy === 'utilization') {
      return (b.materialUtilization || 0) - (a.materialUtilization || 0);
    }
    if (sortBy === 'complexity') {
      const order = { Low: 1, Medium: 2, High: 3 };
      return (order[a.complexity] || 2) - (order[b.complexity] || 2);
    }
    return 0;
  });

  const bestMatch = [...recommendations].sort((a, b) => b.compatibility - a.compatibility)[0];
  const highestValue = [...recommendations].sort((a, b) => b.potentialValue - a.potentialValue)[0];
  const highestYield = [...recommendations].sort((a, b) => b.materialUtilization - a.materialUtilization)[0];

  return (
    <div className="page-wrapper">
      {/* Header */}
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
              Decision Matrix
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Opportunity Comparison
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
            Evaluate trade-offs between compatibility, material yield, complexity, and margin.
          </p>
        </div>

        {/* Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpDown size={15} />
            Sort by:
          </span>

          <button
            onClick={() => setSortBy('match')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: sortBy === 'match' ? 700 : 500,
              backgroundColor: sortBy === 'match' ? '#ecfdf5' : '#ffffff',
              color: sortBy === 'match' ? '#047857' : '#475569',
              border: sortBy === 'match' ? '1px solid #a7f3d0' : '1px solid #cbd5e1',
              cursor: 'pointer'
            }}
          >
            Best Match
          </button>

          <button
            onClick={() => setSortBy('value')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: sortBy === 'value' ? 700 : 500,
              backgroundColor: sortBy === 'value' ? '#ecfdf5' : '#ffffff',
              color: sortBy === 'value' ? '#047857' : '#475569',
              border: sortBy === 'value' ? '1px solid #a7f3d0' : '1px solid #cbd5e1',
              cursor: 'pointer'
            }}
          >
            Highest Value
          </button>

          <button
            onClick={() => setSortBy('utilization')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: sortBy === 'utilization' ? 700 : 500,
              backgroundColor: sortBy === 'utilization' ? '#ecfdf5' : '#ffffff',
              color: sortBy === 'utilization' ? '#047857' : '#475569',
              border: sortBy === 'utilization' ? '1px solid #a7f3d0' : '1px solid #cbd5e1',
              cursor: 'pointer'
            }}
          >
            Highest Utilization
          </button>

          <button
            onClick={() => setSortBy('complexity')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: sortBy === 'complexity' ? 700 : 500,
              backgroundColor: sortBy === 'complexity' ? '#ecfdf5' : '#ffffff',
              color: sortBy === 'complexity' ? '#047857' : '#475569',
              border: sortBy === 'complexity' ? '1px solid #a7f3d0' : '1px solid #cbd5e1',
              cursor: 'pointer'
            }}
          >
            Lowest Complexity
          </button>
        </div>
      </div>

      {/* Top Benchmark Highlights */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        {bestMatch && (
          <div
            className="card"
            style={{
              padding: '1.25rem',
              borderRadius: '14px',
              border: '1px solid #a7f3d0',
              backgroundColor: '#f0fdf4'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Award size={16} color="#059669" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase' }}>
                Top Compatibility Match
              </span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#064e3b' }}>
              {bestMatch.productName}
            </div>
            <div style={{ fontSize: '0.825rem', color: '#166534', marginTop: '4px' }}>
              {bestMatch.compatibility}% match • ₹{bestMatch.potentialValue?.toLocaleString('en-IN')} potential value
            </div>
          </div>
        )}

        {highestValue && (
          <div
            className="card"
            style={{
              padding: '1.25rem',
              borderRadius: '14px',
              border: '1px solid #bae6fd',
              backgroundColor: '#f0f9ff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <TrendingUp size={16} color="#0284c7" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase' }}>
                Maximum Rupee Value
              </span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0c4a6e' }}>
              {highestValue.productName}
            </div>
            <div style={{ fontSize: '0.825rem', color: '#0369a1', marginTop: '4px' }}>
              ₹{highestValue.potentialValue?.toLocaleString('en-IN')} value • +₹{highestValue.potentialMargin?.toLocaleString('en-IN')} margin
            </div>
          </div>
        )}

        {highestYield && (
          <div
            className="card"
            style={{
              padding: '1.25rem',
              borderRadius: '14px',
              border: '1px solid #ddd6fe',
              backgroundColor: '#faf5ff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Zap size={16} color="#8b5cf6" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6d28d9', textTransform: 'uppercase' }}>
                Peak Material Efficiency
              </span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4c1d95' }}>
              {highestYield.productName}
            </div>
            <div style={{ fontSize: '0.825rem', color: '#5b21b6', marginTop: '4px' }}>
              {highestYield.materialUtilization}% material utilized • Minimal offcut scrap
            </div>
          </div>
        )}
      </div>

      {/* Comparison Matrix Table */}
      <div className="card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div className="data-table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ textAlign: 'right' }}>Compatibility</th>
                <th style={{ textAlign: 'right' }}>Material Used</th>
                <th style={{ textAlign: 'right' }}>Utilization</th>
                <th>Complexity</th>
                <th style={{ textAlign: 'right' }}>Potential Value</th>
                <th style={{ textAlign: 'right' }}>Est. Margin</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedList.map((rec) => {
                const isSaved = savedIds.includes(rec.id);
                const complexityColor = {
                  Low: { bg: '#ecfdf5', text: '#065f46' },
                  Medium: { bg: '#fffbeb', text: '#b45309' },
                  High: { bg: '#fef2f2', text: '#b91c1c' }
                }[rec.complexity] || { bg: '#f1f5f9', text: '#334155' };

                return (
                  <tr key={rec.id}>
                    <td>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                          {rec.productName}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {rec.category || 'Component'}
                        </div>
                      </div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <span className="badge badge-brand" style={{ fontSize: '0.8rem' }}>
                        {rec.compatibility}%
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong style={{ color: '#334155' }}>{rec.materialRequired} kg</strong>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 700, color: '#059669' }}>
                        {rec.materialUtilization}%
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: complexityColor.bg,
                          color: complexityColor.text
                        }}
                      >
                        {rec.complexity}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>
                        ₹{(rec.potentialValue || 8500).toLocaleString('en-IN')}
                      </div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: '#059669', fontSize: '0.875rem' }}>
                        +₹{(rec.potentialMargin || 3200).toLocaleString('en-IN')}
                      </div>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <button
                          onClick={() => onViewDetails(rec)}
                          className="btn btn-secondary btn-sm"
                          title="View detailed product flow and economics"
                        >
                          <ArrowUpRight size={14} />
                          <span>Details</span>
                        </button>

                        <button
                          onClick={() => onSave(rec)}
                          className={isSaved ? 'btn btn-outline-brand btn-sm' : 'btn btn-secondary btn-sm'}
                          title={isSaved ? 'Saved to opportunities' : 'Save opportunity'}
                        >
                          {isSaved ? <BookmarkCheck size={14} color="#059669" /> : <Bookmark size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
