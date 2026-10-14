import React from 'react';
import { 
  Sparkles, RefreshCw, Scale, ShieldAlert
} from 'lucide-react';
import RecommendationCard from '../components/RecommendationCard';

export default function AnalysisResultsPage({ 
  analysisResult, 
  onViewDetails, 
  onSaveRecommendation, 
  savedIds = [], 
  onCompareClick, 
  onAnalyzeAnother 
}) {
  if (!analysisResult) {
    return (
      <div className="page-wrapper" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
          No Analysis Results Found
        </h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Please enter your material details or load a demo to run the analysis engine.
        </p>
        <button onClick={onAnalyzeAnother} className="btn btn-primary">
          <Sparkles size={16} />
          <span>Analyze Material</span>
        </button>
      </div>
    );
  }

  const { materialSummary, recommendations = [] } = analysisResult;
  const reuseScore = materialSummary?.reusePotential || 87;

  // Calculation for circular SVG progress
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (reuseScore / 100) * circumference;

  return (
    <div className="page-wrapper">
      {/* Top Breadcrumb & Status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '1.75rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)'
              }}
            />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Engine Evaluation Finished
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Material Analysis Complete
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
            Identified {recommendations.length} high-value manufacturing opportunities for this batch.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={onCompareClick}
            className="btn btn-secondary btn-sm"
          >
            <Scale size={15} color="#0284c7" />
            <span>Compare Opportunities ({recommendations.length})</span>
          </button>

          <button
            onClick={onAnalyzeAnother}
            className="btn btn-outline-brand btn-sm"
          >
            <RefreshCw size={15} />
            <span>Analyze Another Material</span>
          </button>
        </div>
      </div>

      {/* Material Summary Card with Circular Reuse Score */}
      <div
        className="card"
        style={{
          padding: '1.75rem',
          borderRadius: '18px',
          backgroundColor: '#ffffff',
          marginBottom: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Material Specs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <span className="badge badge-brand">
              Material Identified
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {materialSummary.condition}
            </span>
          </div>

          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
            {materialSummary.materialType} {materialSummary.condition !== 'Other' ? materialSummary.condition : ''}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              marginBottom: '1rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Quantity Available</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                {materialSummary.quantity}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Dimensions (L × W × T)</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                {materialSummary.dimensions}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Scrap Market Rate</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#991b1b' }}>
                {materialSummary.scrapMarketBenchmark || '₹32/kg'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Upcycle Potential Value</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#059669' }}>
                {materialSummary.upcyclePotentialValue || '₹180/kg'}
              </div>
            </div>
          </div>

          {/* Processes */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
              Available Manufacturing Processes:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {materialSummary.availableProcesses?.map((proc) => (
                <span
                  key={proc}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#ffffff',
                    color: '#334155',
                    border: '1px solid #cbd5e1'
                  }}
                >
                  ✓ {proc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Circular Reuse Potential Score */}
        <div
          style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{ position: 'relative', width: '136px', height: '136px', marginBottom: '1rem' }}>
            <svg width="136" height="136" viewBox="0 0 136 136" style={{ transform: 'rotate(-90deg)' }}>
              {/* Background track */}
              <circle
                cx="68"
                cy="68"
                r={radius}
                fill="transparent"
                stroke="#dcfce7"
                strokeWidth="12"
              />
              {/* Progress ring */}
              <circle
                cx="68"
                cy="68"
                r={radius}
                fill="transparent"
                stroke="#10b981"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#064e3b', lineHeight: 1 }}>
                {reuseScore}%
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>
                Reuse Potential
              </span>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#064e3b', marginBottom: '4px' }}>
            {reuseScore}% Material Reuse Potential
          </h3>

          <p style={{ fontSize: '0.825rem', color: '#166534', lineHeight: 1.5, maxWidth: '340px' }}>
            {materialSummary.explanation || 'This material has good dimensions and properties for producing small fabricated components.'}
          </p>
        </div>
      </div>

      {/* Section Header: AI Recommendations */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '1.25rem'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#10b981" />
            Recommended Manufacturing Opportunities
          </h2>
          <p style={{ fontSize: '0.825rem', color: '#64748b' }}>
            Ranked by structural compatibility, tool availability, and economic margin.
          </p>
        </div>

        <button
          onClick={onCompareClick}
          className="btn btn-secondary btn-sm"
        >
          <Scale size={15} />
          <span>Compare All in Table</span>
        </button>
      </div>

      {/* Safety Notice */}
      <div
        style={{
          backgroundColor: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '12px',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '1.5rem',
          fontSize: '0.8rem',
          color: '#92400e'
        }}
      >
        <ShieldAlert size={16} color="#d97706" style={{ flexShrink: 0 }} />
        <span>
          <strong>Prototype Estimate Notice:</strong> Recommendations are preliminary algorithmic suggestions. Final manufacturability and safety tolerances must be verified by a qualified manufacturing engineer.
        </span>
      </div>

      {/* Cards Grid (4 to 6 items) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '20px',
          marginBottom: '2.5rem'
        }}
      >
        {recommendations.map((rec, index) => {
          const isSaved = savedIds.includes(rec.id);
          return (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              index={index}
              onViewDetails={onViewDetails}
              onSave={onSaveRecommendation}
              isSaved={isSaved}
            />
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div
        style={{
          padding: '1.75rem',
          borderRadius: '16px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '4px' }}>
            Ready to evaluate another leftover batch?
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Input sheet drops, bar stock, or rejected components to identify reusable components.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onCompareClick}
            className="btn btn-secondary btn-sm"
            style={{ backgroundColor: '#1e293b', color: '#ffffff', borderColor: '#334155' }}
          >
            <Scale size={15} />
            <span>View Comparison Matrix</span>
          </button>

          <button
            onClick={onAnalyzeAnother}
            className="btn btn-primary btn-sm"
          >
            <Sparkles size={15} />
            <span>Analyze New Material</span>
          </button>
        </div>
      </div>
    </div>
  );
}
