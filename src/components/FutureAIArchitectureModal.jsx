import React from 'react';
import { 
  X, Cpu, Eye, FileText, Settings, Database, Sparkles, CheckCircle2, 
  Coins, Layers, ShieldCheck, Network
} from 'lucide-react';

export default function FutureAIArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const PIPELINE_STEES = [
    {
      step: 1,
      title: 'Material Input',
      desc: 'Raw multi-modal data ingestion: offcut dimensions, mass, condition notes, and high-res imagery.',
      icon: <Layers size={18} color="#0284c7" />,
      badge: 'Current / Mocked'
    },
    {
      step: 2,
      title: 'Image Analysis (Computer Vision)',
      desc: 'YOLOv10 / SAM edge-segmentation extracts geometric contours, detects surface rust, scratches, and grain orientation.',
      icon: <Eye size={18} color="#8b5cf6" />,
      badge: 'Future AI Vision'
    },
    {
      step: 3,
      title: 'Material Classification',
      desc: 'Spectral & visual classification predicting alloy family (e.g. Mild Steel IS 2062 vs Corten vs SS 304).',
      icon: <Cpu size={18} color="#10b981" />,
      badge: 'Future Classifier'
    },
    {
      step: 4,
      title: 'Property Extraction',
      desc: 'Mechanical property lookup: Tensile yield, shear modulus, machinability index, thermal conductivity.',
      icon: <FileText size={18} color="#f59e0b" />,
      badge: 'Material Ontology DB'
    },
    {
      step: 5,
      title: 'Manufacturing Constraint Analysis',
      desc: 'Rule & CAD solver mapping available shop equipment (laser kerf limits, press brake tonnage, CNC work envelope).',
      icon: <Settings size={18} color="#06b6d4" />,
      badge: 'CAM Constraints'
    },
    {
      step: 6,
      title: 'Product Database Search',
      desc: 'Vector embedding search against standard parts library (brackets, enclosures, flanges, tool holders).',
      icon: <Database size={18} color="#6366f1" />,
      badge: 'Vector DB (pgvector)'
    },
    {
      step: 7,
      title: 'AI Recommendation Engine',
      desc: 'Fine-tuned LLM + physics heuristic synthesizing high-margin product candidates tailored to waste profile.',
      icon: <Sparkles size={18} color="#ec4899" />,
      badge: 'LLM Agent Core'
    },
    {
      step: 8,
      title: 'Feasibility Score',
      desc: 'Finite element & geometric nesting evaluation outputting structural safety and material utilization percentage.',
      icon: <ShieldCheck size={18} color="#10b981" />,
      badge: 'FEA / Nesting Engine'
    },
    {
      step: 9,
      title: 'Cost Estimation',
      desc: 'Real-time scrap market API differential vs value-add machine hourly rates, tool wear, and net margins.',
      icon: <Coins size={18} color="#eab308" />,
      badge: 'Economic Engine'
    },
    {
      step: 10,
      title: 'Product Recommendation & CAD Export',
      desc: 'Actionable fabrication dossier with STEP/DXF file generation, nesting templates, and costing sheet.',
      icon: <CheckCircle2 size={18} color="#059669" />,
      badge: 'Final Output'
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9998,
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
          maxWidth: '860px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #cbd5e1',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Network size={20} color="#059669" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Future AI Architecture & Pipeline
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                SCRAP2SPEC Production Roadmap: From Heuristic Prototype to End-to-End Multimodal AI
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

        {/* Scrollable Content */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', flex: 1 }}>
          <div
            style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              color: '#166534',
              lineHeight: 1.5
            }}
          >
            <strong>Prototype Status:</strong> The current prototype runs an intelligent, rule-based recommendation engine (`generateRecommendations`) simulating metallurgical rules, dimensional nesting, and local market scrap economics. In production, this connects to the full 10-stage AI pipeline diagrammed below.
          </div>

          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: '1rem' }}>
            10-Stage Multimodal AI Pipeline
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {PIPELINE_STEES.map((item, idx) => (
              <React.Fragment key={item.step}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: '#0f172a',
                      flexShrink: 0
                    }}
                  >
                    {item.step}
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                        {item.title}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: '999px',
                          backgroundColor: item.step === 1 ? '#e0f2fe' : item.step === 10 ? '#dcfce7' : '#f1f5f9',
                          color: item.step === 1 ? '#0369a1' : item.step === 10 ? '#15803d' : '#475569',
                          border: '1px solid rgba(0,0,0,0.06)'
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>

                {idx < PIPELINE_STEES.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', height: '14px', alignItems: 'center' }}>
                    <div style={{ width: '2px', height: '14px', backgroundColor: '#cbd5e1' }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Integration Interface Specs */}
          <div
            style={{
              marginTop: '1.75rem',
              padding: '1.25rem',
              backgroundColor: '#0f172a',
              borderRadius: '12px',
              color: '#f8fafc'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#38bdf8' }}>
                Planned API Endpoint Specification
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                POST /api/v2/material/analyze
              </span>
            </div>
            <pre
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                backgroundColor: '#1e293b',
                padding: '12px',
                borderRadius: '8px',
                overflowX: 'auto',
                color: '#e2e8f0',
                lineHeight: 1.4
              }}
            >
{`{
  "material_classification": {
    "predicted_grade": "IS 2062 E250",
    "confidence": 0.962,
    "metallurgical_class": "Carbon Steel"
  },
  "geometry_extraction": {
    "usable_area_mm2": 691200,
    "max_bounding_box": [1200, 600, 4]
  },
  "feasible_components": [
    {
      "cad_template_id": "BRACKET_HEAVY_M12",
      "nesting_yield_pct": 91.4,
      "estimated_cycle_time_min": 4.2
    }
  ]
}`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}
        >
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close Pipeline View
          </button>
        </div>
      </div>
    </div>
  );
}
