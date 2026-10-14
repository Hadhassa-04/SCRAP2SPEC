import React, { useState } from 'react';
import { 
  Sparkles, Bookmark, History, ArrowRight, BarChart3, PieChart, 
  TrendingUp, Layers, CheckCircle2, Eye, Zap, Plus, Calculator, Leaf
} from 'lucide-react';
import { MONTHLY_REUSE_DATA, MATERIAL_CATEGORIES_DATA } from '../data/sampleData';

export default function Dashboard({ 
  stats, 
  history = [], 
  onAnalyzeNew, 
  onViewSaved, 
  onViewHistory, 
  onInspectHistoryItem, 
  onLoadDemo
}) {
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const [calcKg, setCalcKg] = useState(450);
  const [calcMetal, setCalcMetal] = useState('Mild Steel');

  const METAL_RATES = {
    'Mild Steel': { scrap: 32, upcycle: 180, margin: 0.38, name: 'Mild Steel' },
    'Aluminium': { scrap: 140, upcycle: 480, margin: 0.44, name: 'Aluminium 6061' },
    'Copper': { scrap: 380, upcycle: 1200, margin: 0.48, name: 'Copper ETP' },
    'Stainless Steel': { scrap: 110, upcycle: 420, margin: 0.42, name: 'Stainless 304' },
    'Brass': { scrap: 310, upcycle: 950, margin: 0.45, name: 'Brass Alloy' }
  };

  const selectedRate = METAL_RATES[calcMetal] || METAL_RATES['Mild Steel'];
  const monthlyScrapRev = calcKg * selectedRate.scrap;
  const monthlyUpcycleVal = calcKg * selectedRate.upcycle;
  const monthlyProfit = Math.round(monthlyUpcycleVal * selectedRate.margin);
  const annualProfit = monthlyProfit * 12;
  const annualCo2Tons = ((calcKg * 12 * 1.85) / 1000).toFixed(1);

  // Maximum kg for scaling the bar chart
  const maxKg = Math.max(...MONTHLY_REUSE_DATA.map(d => d.kg)) * 1.15;

  const STAT_CARDS = [
    {
      label: 'Materials Analyzed',
      value: stats.materialsAnalyzed || 24,
      unit: 'lots',
      subtext: '+3 this week',
      icon: <Layers size={20} color="#0284c7" />,
      color: '#0284c7',
      bg: '#f0f9ff',
      border: '#bae6fd'
    },
    {
      label: 'Reuse Opportunities Found',
      value: stats.opportunitiesFound || 67,
      unit: 'products',
      subtext: '4.2 avg per material',
      icon: <Sparkles size={20} color="#8b5cf6" />,
      color: '#8b5cf6',
      bg: '#faf5ff',
      border: '#ddd6fe'
    },
    {
      label: 'Estimated Material Reused',
      value: (stats.materialReusedKg || 1280).toLocaleString(),
      unit: 'kg',
      subtext: '88% landfill diversion',
      icon: <CheckCircle2 size={20} color="#10b981" />,
      color: '#10b981',
      bg: '#ecfdf5',
      border: '#a7f3d0'
    },
    {
      label: 'Potential Value Identified',
      value: `₹${((stats.potentialValueIdentified || 185000) / 100000).toFixed(2)}L`,
      raw: `₹${(stats.potentialValueIdentified || 185000).toLocaleString('en-IN')}`,
      unit: 'value',
      subtext: '6.4x vs scrap price',
      icon: <TrendingUp size={20} color="#059669" />,
      color: '#059669',
      bg: '#f0fdf4',
      border: '#bbf7d0'
    }
  ];

  return (
    <div className="page-wrapper">
      {/* Dashboard Header */}
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
                backgroundColor: '#10b981',
                boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)'
              }}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Manufacturer Operations Control
            </span>
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Good morning, Manufacturer
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
            Turn your leftover materials into new opportunities.
          </p>
        </div>

        {/* Action Button Cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={onLoadDemo}
            className="btn btn-outline-brand btn-sm"
            title="Load demo Mild Steel data"
          >
            <Zap size={15} />
            <span>Load Demo Material</span>
          </button>

          <button
            onClick={onAnalyzeNew}
            className="btn btn-primary"
            id="dash-analyze-btn"
          >
            <Plus size={16} />
            <span>Analyze New Material</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {STAT_CARDS.map((card, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              padding: '1.35rem',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#64748b' }}>
                {card.label}
              </span>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: card.bg,
                  border: `1px solid ${card.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {card.icon}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.15 }}>
                {card.value}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: card.color }}>
                  {card.subtext}
                </span>
                {card.raw && (
                  <span style={{ fontSize: '0.725rem', color: '#94a3b8' }}>
                    {card.raw}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Bar */}
      <div
        className="card"
        style={{
          padding: '1.25rem 1.5rem',
          borderRadius: '16px',
          marginBottom: '2rem',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669'
            }}
          >
            <Zap size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
              Quick Workflows
            </div>
            <div style={{ fontSize: '0.775rem', color: '#64748b' }}>
              Jump straight to testing, reviewing saved specs, or analyzing history
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={onAnalyzeNew}
            className="btn btn-secondary btn-sm"
          >
            <Sparkles size={15} color="#10b981" />
            <span>Analyze New Material</span>
          </button>

          <button
            onClick={onViewSaved}
            className="btn btn-secondary btn-sm"
          >
            <Bookmark size={15} color="#0284c7" />
            <span>View Saved Ideas</span>
          </button>

          <button
            onClick={onViewHistory}
            className="btn btn-secondary btn-sm"
          >
            <History size={15} color="#8b5cf6" />
            <span>Material History</span>
          </button>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Bar Chart: Material Reuse */}
        <div
          className="card"
          style={{
            padding: '1.5rem',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={18} color="#059669" />
                Material Reuse Progress
              </h3>
              <p style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '2px' }}>
                Kilograms diverted from scrap sales into production components
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="badge badge-brand" style={{ fontSize: '0.7rem' }}>
                +241% Growth
              </span>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div style={{ height: '210px', display: 'flex', alignItems: 'flex-end', gap: '18px', paddingBottom: '10px', position: 'relative' }}>
            {MONTHLY_REUSE_DATA.map((item, idx) => {
              const heightPercent = (item.kg / maxKg) * 100;
              const isHovered = hoveredMonth === item.month;

              return (
                <div
                  key={item.month}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end'
                  }}
                  onMouseEnter={() => setHoveredMonth(item.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  {/* Tooltip on hover */}
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: isHovered ? '#047857' : '#64748b',
                      marginBottom: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.kg} kg
                  </div>

                  {/* Bar */}
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '46px',
                      height: `${heightPercent}%`,
                      background: isHovered 
                        ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)' 
                        : 'linear-gradient(180deg, #34d399 0%, #10b981 100%)',
                      borderRadius: '8px 8px 3px 3px',
                      transition: 'all 0.25s ease',
                      boxShadow: isHovered ? '0 4px 12px rgba(16, 185, 129, 0.35)' : 'none',
                      cursor: 'pointer'
                    }}
                  />

                  {/* Month Label */}
                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '0.8rem',
                      fontWeight: isHovered ? 800 : 600,
                      color: isHovered ? '#0f172a' : '#64748b'
                    }}
                  >
                    {item.month}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Monthly Scrap Utilization Growth</span>
            <span style={{ fontWeight: 600, color: '#047857' }}>Total Diverted: 1,260 kg</span>
          </div>
        </div>

        {/* Donut Chart: Material Categories & Value Banner */}
        <div
          className="card"
          style={{
            padding: '1.5rem',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieChart size={18} color="#0284c7" />
                Material Categories Breakdown
              </h3>
              <p style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '2px' }}>
                Distribution of analyzed manufacturing lots by metal/material type
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, flexWrap: 'wrap' }}>
            {/* SVG Donut Visual */}
            <div style={{ position: 'relative', width: '150px', height: '150px', flexShrink: 0, margin: '0 auto' }}>
              <svg viewBox="0 0 100 100" width="150" height="150" style={{ transform: 'rotate(-90deg)' }}>
                {/* Steel 45% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#0284c7"
                  strokeWidth="16"
                  strokeDasharray="107.44 238.76"
                  strokeDashoffset="0"
                />
                {/* Aluminium 25% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="16"
                  strokeDasharray="59.69 238.76"
                  strokeDashoffset="-107.44"
                />
                {/* Plastic 15% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="16"
                  strokeDasharray="35.81 238.76"
                  strokeDashoffset="-167.13"
                />
                {/* Copper 10% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f97316"
                  strokeWidth="16"
                  strokeDasharray="23.88 238.76"
                  strokeDashoffset="-202.94"
                />
                {/* Other 5% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#8b5cf6"
                  strokeWidth="16"
                  strokeDasharray="11.94 238.76"
                  strokeDashoffset="-226.82"
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
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Dominant</span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Steel 45%</span>
              </div>
            </div>

            {/* Legend & Breakdown list */}
            <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MATERIAL_CATEGORIES_DATA.map((cat) => (
                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: cat.color }} />
                    <span style={{ fontWeight: 600, color: '#334155' }}>{cat.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#64748b' }}>{cat.amountKg} kg</span>
                    <strong style={{ color: '#0f172a' }}>{cat.percentage}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Value Created Highlight Box */}
          <div
            style={{
              marginTop: '1.25rem',
              padding: '0.85rem 1.25rem',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#065f46' }}>Value Created Benchmark</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#047857' }}>
                ₹1.85L Potential Value Identified
              </div>
            </div>
            <span className="badge badge-brand" style={{ backgroundColor: '#ffffff' }}>
              Active Pipeline
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Factory Scrap ROI & ESG Impact Calculator */}
      <div
        className="card"
        style={{
          padding: '1.75rem',
          borderRadius: '18px',
          backgroundColor: '#ffffff',
          marginBottom: '2rem',
          border: '1px solid #cbd5e1',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#059669'
                }}
              >
                <Calculator size={18} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                Interactive Factory Scrap ROI & ESG Impact Calculator
              </h3>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#64748b' }}>
              Model how converting your factory scrap pile into fabricated parts transforms your annual bottom line.
            </p>
          </div>

          <button
            onClick={onAnalyzeNew}
            className="btn btn-primary btn-sm"
          >
            <Sparkles size={14} />
            <span>Analyze Your Real Batch</span>
          </button>
        </div>

        {/* Controls Row */}
        <div className="grid-2" style={{ marginBottom: '1.5rem', gap: '20px' }}>
          {/* Volume Slider */}
          <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                Monthly Scrap Generated
              </label>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                {calcKg.toLocaleString()} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>kg / month</span>
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="2500"
              step="25"
              value={calcKg}
              onChange={(e) => setCalcKg(parseInt(e.target.value) || 100)}
              style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: '#94a3b8', marginTop: '6px' }}>
              <span>50 kg (Small shop)</span>
              <span>1,000 kg (Medium unit)</span>
              <span>2,500 kg (Major stamping line)</span>
            </div>
          </div>

          {/* Metal Selector */}
          <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '8px' }}>
              Select Predominant Alloy
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Object.keys(METAL_RATES).map((metal) => {
                const isSelected = calcMetal === metal;
                return (
                  <button
                    key={metal}
                    type="button"
                    onClick={() => setCalcMetal(metal)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                      color: isSelected ? '#047857' : '#475569',
                      border: isSelected ? '1px solid #10b981' : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {metal}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#64748b' }}>
              Scrap Benchmark: <strong style={{ color: '#991b1b' }}>₹{selectedRate.scrap}/kg</strong> ➔ Upcycle Benchmark: <strong style={{ color: '#059669' }}>₹{selectedRate.upcycle}/kg</strong>
            </div>
          </div>
        </div>

        {/* Live Economic Outcome Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '14px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '14px',
            padding: '1.25rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: '#166534' }}>Current Scrap Income</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#991b1b' }}>
              ₹{monthlyScrapRev.toLocaleString('en-IN')}<span style={{ fontSize: '0.75rem', fontWeight: 500 }}>/mo</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>Dealer melt rate</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: '#166534' }}>Upcycled Gross Value</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0284c7' }}>
              ₹{monthlyUpcycleVal.toLocaleString('en-IN')}<span style={{ fontSize: '0.75rem', fontWeight: 500 }}>/mo</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#0284c7', marginTop: '2px' }}>{selectedRate.name} parts</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 700 }}>Annual Added Net Profit</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#047857' }}>
              +₹{(annualProfit / 100000).toFixed(2)} Lakhs<span style={{ fontSize: '0.75rem', fontWeight: 500 }}>/yr</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#047857', fontWeight: 600, marginTop: '2px' }}>Direct EBITDA boost</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Leaf size={14} color="#059669" />
              ESG CO₂ Diverted
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669' }}>
              {annualCo2Tons} Tons CO₂<span style={{ fontSize: '0.75rem', fontWeight: 500 }}>/yr</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#166534', marginTop: '2px' }}>Virgin ore smelting saved</div>
          </div>
        </div>
      </div>

      {/* Recent Materials Table */}
      <div className="card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              Recent Materials Analyzed
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Latest lot submissions and their identified manufacturing opportunities
            </p>
          </div>

          <button
            onClick={onViewHistory}
            className="btn btn-secondary btn-sm"
          >
            <span>View All History</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="data-table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Quantity</th>
                <th>Date Analyzed</th>
                <th>Opportunities</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 5).map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: '#f1f5f9',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          color: '#0f172a'
                        }}
                      >
                        {item.materialType ? item.materialType.slice(0, 2).toUpperCase() : 'MT'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>
                          {item.materialName || item.materialType}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {item.dimensions || `${item.length}×${item.width} mm`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: '#334155' }}>
                      {item.quantity} {item.quantityUnit || 'kg'}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: '#64748b', fontSize: '0.825rem' }}>
                      {item.dateAnalyzed || 'Today'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-brand">
                      {item.opportunitiesCount || 4} opportunities
                    </span>
                  </td>
                  <td>
                    <span className="status-pill status-production">
                      {item.status || 'Analyzed'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => onInspectHistoryItem(item)}
                      className="btn btn-secondary btn-sm"
                      title="Inspect recommendations for this material"
                    >
                      <Eye size={14} />
                      <span>View Ideas</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
