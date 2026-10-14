import React from 'react';
import { 
  Sparkles, ArrowRight, Layers, Cpu, TrendingUp, 
  Recycle, CheckCircle2, Zap
} from 'lucide-react';

export default function LandingPage({ onAnalyzeClick, onDemoClick, onExploreClick }) {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const PIPELINE_STEPS = [
    {
      label: 'Leftover Material',
      desc: 'Offcuts, rejected parts & plate drops',
      icon: <Layers size={22} color="#64748b" />,
      tag: 'Input'
    },
    {
      label: 'Smart Analysis',
      desc: 'Dimensional & metallurgical AI scoring',
      icon: <Cpu size={22} color="#0284c7" />,
      tag: 'SCRAP2SPEC'
    },
    {
      label: 'Product Ideas',
      desc: 'High-margin engineering components',
      icon: <Sparkles size={22} color="#f59e0b" />,
      tag: 'Recommendations'
    },
    {
      label: 'Higher-Value Reuse',
      desc: '3x-8x return vs scrap yard resale',
      icon: <TrendingUp size={22} color="#10b981" />,
      tag: 'Profit & ESG'
    }
  ];

  const HOW_IT_WORKS = [
    {
      number: '01',
      title: 'Describe Your Material',
      desc: 'Enter material type, size, quantity and mechanical properties. Optionally upload a photo of your offcut pile.',
      icon: <Layers size={24} color="#059669" />
    },
    {
      number: '02',
      title: 'Analyze',
      desc: 'SCRAP2SPEC evaluates available material against machine tool capabilities (CNC, laser cutting, bending, welding).',
      icon: <Cpu size={24} color="#0284c7" />
    },
    {
      number: '03',
      title: 'Discover Possibilities',
      desc: 'Receive practical, vetted product and component recommendations with compatibility and material utilization scores.',
      icon: <Sparkles size={24} color="#8b5cf6" />
    },
    {
      number: '04',
      title: 'Create More Value',
      desc: 'Reuse materials in-house instead of liquidating them cheaply to scrap dealers for pennies on the dollar.',
      icon: <TrendingUp size={24} color="#10b981" />
    }
  ];

  const BENEFITS = [
    {
      title: 'Reduce Material Waste',
      desc: 'Prevent prime structural and engineering alloys from prematurely entering landfill and remelt cycles.',
      stat: '-34% Waste'
    },
    {
      title: 'Discover New Manufacturing Opportunities',
      desc: 'Uncover complementary catalog parts, bracket lines, and shop fixtures you can fabricate with existing tooling.',
      stat: '+12 New SKUs'
    },
    {
      title: 'Improve Material Utilization',
      desc: 'Push raw sheet and bar stock utilization from standard 68% nesting up to 92%+ total lifecycle recovery.',
      stat: '90%+ Yield'
    },
    {
      title: 'Reduce Raw Material Costs',
      desc: 'Manufacture smaller mounting hardware and accessories without purchasing expensive virgin metal stock.',
      stat: '28% Cost Cut'
    },
    {
      title: 'Create Additional Revenue Opportunities',
      desc: 'Transform idle factory scrap piles into high-margin ancillary revenue streams and product catalogs.',
      stat: '₹1.85L Value'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '4.5rem 1.5rem 3.5rem 1.5rem',
          background: 'radial-gradient(ellipse at top, #ecfdf5 0%, #f8fafc 70%)',
          borderBottom: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          {/* Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: '#ffffff',
              border: '1px solid #a7f3d0',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.12)',
              marginBottom: '1.75rem'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981'
              }}
            />
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#065f46' }}>
              Smart Material-Utilization Platform for Manufacturers
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem'
            }}
          >
            Turn Manufacturing Scrap <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #0284c7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Into New Possibilities
            </span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              color: '#475569',
              maxWidth: '750px',
              margin: '0 auto 2.25rem auto',
              lineHeight: 1.6
            }}
          >
            Discover what you can manufacture from your leftover and rejected materials. 
            Move from <span style={{ fontWeight: 600, color: '#0f172a' }}>"What can I do with this waste?"</span> to <span style={{ fontWeight: 700, color: '#059669' }}>"What can I make from this material?"</span>
          </p>

          {/* CTA Cluster */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              marginBottom: '3.5rem'
            }}
          >
            <button
              onClick={onAnalyzeClick}
              className="btn btn-primary btn-lg"
              id="hero-analyze-cta"
            >
              <Sparkles size={18} />
              <span>Analyze My Material</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onDemoClick}
              className="btn btn-secondary btn-lg"
              id="hero-demo-cta"
            >
              <Zap size={18} color="#059669" />
              <span>Try Demo Material (Mild Steel)</span>
            </button>

            <button
              onClick={onExploreClick || scrollToHowItWorks}
              className="btn btn-secondary btn-lg"
            >
              <span>Explore How It Works</span>
            </button>
          </div>

          {/* Visual Pipeline Showcase */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.08)'
            }}
          >
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#64748b',
                marginBottom: '1.5rem'
              }}
            >
              The SCRAP2SPEC Transformation Loop
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '16px',
                alignItems: 'stretch'
              }}
            >
              {PIPELINE_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    border: '1px solid #e2e8f0',
                    textAlign: 'left',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                      }}
                    >
                      {step.icon}
                    </div>
                    <span
                      style={{
                        fontSize: '0.675rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: idx === 3 ? '#ecfdf5' : '#f1f5f9',
                        color: idx === 3 ? '#047857' : '#64748b',
                        border: idx === 3 ? '1px solid #a7f3d0' : '1px solid #e2e8f0'
                      }}
                    >
                      {step.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                    {step.label}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Economics Contrast Section (Scrap vs High Value Reuse) */}
      <section style={{ padding: '3.5rem 1.5rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              The Economic Reality of Scrap Metal & Material Waste
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '650px', margin: '0 auto' }}>
              Manufacturers traditionally dump offcuts into scrap bins at raw scrap merchant rates. SCRAP2SPEC turns that equation upside down.
            </p>
          </div>

          <div className="grid-2">
            {/* Old Way */}
            <div
              style={{
                padding: '2rem',
                borderRadius: '16px',
                backgroundColor: '#fff1f2',
                border: '1px solid #fecdd3'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span className="badge" style={{ backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' }}>
                  Traditional Scrap Disposal
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#881337', marginBottom: '0.5rem' }}>
                Selling Offcuts as Scrap Metal
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#9f1239', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Selling offcut sheets, bars, and drop pieces to metal dealers at bare melt value.
              </p>
              <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #fecdd3' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Typical Recovery Rate</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#991b1b' }}>
                  ₹28 – ₹35 / kg
                </div>
                <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px' }}>
                  90%+ value lost compared to original raw material purchase price.
                </div>
              </div>
            </div>

            {/* SCRAP2SPEC Way */}
            <div
              style={{
                padding: '2rem',
                borderRadius: '16px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span className="badge badge-brand">
                  SCRAP2SPEC Smart Reuse
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#064e3b', marginBottom: '0.5rem' }}>
                Upcycling into Engineered Products
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#065f46', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Fabricating brackets, machine guards, tool holders, and modular hardware in-house.
              </p>
              <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Upcycled Component Value</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>
                  ₹180 – ₹420 / kg
                </div>
                <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '4px' }}>
                  6x – 12x higher realized value with positive factory profit margin.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works-section" style={{ padding: '4rem 1.5rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#059669',
                backgroundColor: '#ecfdf5',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid #a7f3d0'
              }}
            >
              Simple 4-Step Process
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
              How SCRAP2SPEC Works
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Engineered to fit straight into your workshop or production schedule without complex setup.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px'
            }}
          >
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.number}
                className="card card-hoverable"
                style={{
                  padding: '1.75rem',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {step.icon}
                  </div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#cbd5e1' }}>
                    {step.number}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Built for Modern Manufacturing Efficiency
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '650px', margin: '0 auto' }}>
              Turn leftover material into tangible margin gains, leaner supply chains, and ESG credentials.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}
          >
            {BENEFITS.map((benefit, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  borderRadius: '14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#059669',
                    flexShrink: 0
                  }}
                >
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                      {benefit.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '8px' }}>
                    {benefit.desc}
                  </p>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#047857',
                      backgroundColor: '#ecfdf5',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      display: 'inline-block'
                    }}
                  >
                    Benchmark: {benefit.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section
        style={{
          padding: '5rem 1.5rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              marginBottom: '1.5rem',
              color: '#34d399',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            <Recycle size={15} />
            <span>Circular Manufacturing Starts Here</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}
          >
            "Have leftover material? <br />
            Let's find out what you can make."
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#94a3b8',
              marginBottom: '2.5rem',
              maxWidth: '600px',
              margin: '0 auto 2.5rem auto'
            }}
          >
            Test our prototype recommendation engine with your real scrap dimensions or try our built-in Mild Steel demo in 1 click.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={onAnalyzeClick}
              className="btn btn-primary btn-lg"
              id="cta-analyze-button"
            >
              <Sparkles size={18} />
              <span>Launch Material Analyzer</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onDemoClick}
              className="btn btn-secondary btn-lg"
              style={{ backgroundColor: '#1e293b', color: '#ffffff', borderColor: '#475569' }}
            >
              <Zap size={18} color="#34d399" />
              <span>Load Sample Offcut Data</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
