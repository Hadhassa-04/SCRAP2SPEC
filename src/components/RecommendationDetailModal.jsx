import React from 'react';
import { 
  X, Bookmark, BookmarkCheck, ArrowRight, ShieldAlert, 
  Sparkles, Layers, DollarSign, Activity, Wrench, RefreshCw, Printer
} from 'lucide-react';

export default function RecommendationDetailModal({ 
  recommendation, 
  materialSummary, 
  isOpen, 
  onClose, 
  onSave, 
  isSaved,
  onAnalyzeAnother
}) {
  if (!isOpen || !recommendation) return null;

  const defaultProcessFlow = [
    'Material Preparation',
    'Laser Cutting Profiles',
    'CNC Press Brake Bending',
    'Hole Drilling & Tapping',
    'Welding & Assembly',
    'Surface Finishing',
    'Final Product QA'
  ];

  const steps = recommendation.processFlow || defaultProcessFlow;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #cbd5e1',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669'
              }}
            >
              <Wrench size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                  {recommendation.productName}
                </h2>
                <span className="badge badge-brand">
                  {recommendation.compatibility}% Compatibility
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Category: {recommendation.category || 'Precision Component'} • Complexity: {recommendation.complexity}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', flex: 1 }}>
          {/* Safety Disclaimer Banner */}
          <div
            style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '12px',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              marginBottom: '1.5rem',
              fontSize: '0.825rem',
              color: '#92400e'
            }}
          >
            <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#d97706' }} />
            <div>
              <strong>Safety & Accuracy Notice:</strong> These recommendations are preliminary estimates. Actual feasibility should be validated by a qualified manufacturing professional before production setup.
            </div>
          </div>

          {/* Grid: Why suitable & Required material */}
          <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
            {/* Why This Product */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '1.25rem'
              }}
            >
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="#10b981" />
                Why This Product?
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.55 }}>
                {recommendation.whySuitable}
              </p>
            </div>

            {/* Required Material Specs */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '1.25rem'
              }}
            >
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={16} color="#0284c7" />
                Required Material
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>Material Type:</span>
                  <strong style={{ color: '#0f172a' }}>{materialSummary?.materialType || 'Mild Steel'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>Dimensions / Thickness:</span>
                  <strong style={{ color: '#0f172a' }}>{materialSummary?.dimensions || '4 mm sheet'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Batch Material Required:</span>
                  <strong style={{ color: '#0f172a' }}>{recommendation.materialRequired} kg</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Manufacturing Process Flow */}
          <div
            style={{
              marginBottom: '1.5rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '1.25rem'
            }}
          >
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={16} color="#8b5cf6" />
              Suggested Manufacturing Process Flow
            </h3>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      backgroundColor: idx === steps.length - 1 ? '#ecfdf5' : '#f8fafc',
                      border: idx === steps.length - 1 ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: idx === steps.length - 1 ? '#047857' : '#334155'
                    }}
                  >
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: idx === steps.length - 1 ? '#10b981' : '#cbd5e1',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <ArrowRight size={14} color="#94a3b8" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Estimated Economics Card */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '14px',
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DollarSign size={16} color="#10b981" />
                Estimated Economics Breakdown
              </h3>
              <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                Prototype Estimates
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
                marginBottom: '1rem'
              }}
            >
              <div style={{ padding: '10px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Material Cost Saved</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#047857' }}>
                  ₹{(recommendation.materialCostSaved || 3200).toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{ padding: '10px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Processing Cost</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#475569' }}>
                  ₹{(recommendation.processingCost || 2100).toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{ padding: '10px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Est. Production Cost</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  ₹{(recommendation.estimatedProductionCost || 5300).toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{ padding: '10px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Selling Value</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0284c7' }}>
                  ₹{(recommendation.potentialValue || 8500).toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{ padding: '10px', backgroundColor: '#ecfdf5', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 600 }}>Potential Margin</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669' }}>
                  ₹{(recommendation.potentialMargin || 3200).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Material Utilization Gauge Bar */}
            <div style={{ marginTop: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>
                  Material Utilization: {recommendation.materialUtilization}% of available material utilized
                </span>
                <span style={{ color: '#059669', fontWeight: 700 }}>
                  High Efficiency Yield
                </span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${recommendation.materialUtilization}%`,
                    backgroundColor: '#10b981',
                    borderRadius: '999px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Interactive 2D Nesting Simulation Box */}
          <div
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '14px',
              padding: '1.25rem',
              color: '#ffffff',
              border: '1px solid #334155',
              marginBottom: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38bdf8' }} />
                <span style={{ fontSize: '0.825rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#94a3b8' }}>
                  CAD Sheet Nesting Layout (2D Simulation)
                </span>
              </div>
              <span style={{ fontSize: '0.725rem', color: '#38bdf8', fontFamily: 'monospace' }}>
                8 Pieces Nested • 91% Yield
              </span>
            </div>

            {/* SVG Nesting Graphic */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '10px', border: '1px dashed #475569' }}>
              <svg viewBox="0 0 600 220" width="100%" height="150" style={{ display: 'block', overflow: 'visible' }}>
                {/* Outer Raw Plate Envelope */}
                <rect x="10" y="10" width="580" height="200" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
                <text x="20" y="28" fill="#64748b" fontSize="10" fontFamily="monospace">RAW PLATE: {materialSummary?.dimensions || '1200 × 600 mm'}</text>

                {/* 8 Nested Components (2 rows of 4) */}
                {[0, 1, 2, 3].map((col) => (
                  <g key={`top-${col}`}>
                    {/* Part outline */}
                    <rect
                      x={25 + col * 140}
                      y={40}
                      width="125"
                      height="70"
                      rx="6"
                      fill="rgba(16, 185, 129, 0.15)"
                      stroke="#10b981"
                      strokeWidth="1.8"
                    />
                    {/* Hole cutouts */}
                    <circle cx={45 + col * 140} cy={55} r="5" fill="#0f172a" stroke="#34d399" strokeWidth="1.2" />
                    <circle cx={130 + col * 140} cy={55} r="5" fill="#0f172a" stroke="#34d399" strokeWidth="1.2" />
                    <line x1={45 + col * 140} y1={85} x2={130 + col * 140} y2={85} stroke="#34d399" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={87 + col * 140} y={98} fill="#a7f3d0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">P-{col + 1}</text>
                  </g>
                ))}

                {[0, 1, 2, 3].map((col) => (
                  <g key={`bot-${col}`}>
                    {/* Part outline */}
                    <rect
                      x={25 + col * 140}
                      y={125}
                      width="125"
                      height="70"
                      rx="6"
                      fill="rgba(16, 185, 129, 0.15)"
                      stroke="#10b981"
                      strokeWidth="1.8"
                    />
                    {/* Hole cutouts */}
                    <circle cx={45 + col * 140} cy={140} r="5" fill="#0f172a" stroke="#34d399" strokeWidth="1.2" />
                    <circle cx={130 + col * 140} cy={140} r="5" fill="#0f172a" stroke="#34d399" strokeWidth="1.2" />
                    <line x1={45 + col * 140} y1={170} x2={130 + col * 140} y2={170} stroke="#34d399" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={87 + col * 140} y={183} fill="#a7f3d0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">P-{col + 5}</text>
                  </g>
                ))}
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.75rem', color: '#94a3b8' }}>
              <span>Laser Kerf Width: 1.2 mm • Zero Part Overlap</span>
              <span style={{ color: '#34d399', fontWeight: 600 }}>Optimal Nesting Density: 91%</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '1.1rem 1.75rem',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <button
            onClick={() => {
              onClose();
              if (onAnalyzeAnother) onAnalyzeAnother();
            }}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={15} />
            <span>Analyze Another Material</span>
          </button>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => window.print()}
              className="btn btn-secondary btn-sm"
              title="Print shop floor job card & traveler"
            >
              <Printer size={15} />
              <span>Print Job Card</span>
            </button>

            <button
              onClick={() => onSave(recommendation)}
              className={isSaved ? 'btn btn-outline-brand' : 'btn btn-primary'}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck size={16} />
                  <span>Saved to Opportunities</span>
                </>
              ) : (
                <>
                  <Bookmark size={16} />
                  <span>Save Recommendation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
