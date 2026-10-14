import React, { useState } from 'react';
import { 
  Sparkles, Upload, Zap, Check, ArrowRight, Layers, 
  Wrench, FileText, X, ShieldCheck
} from 'lucide-react';
import { 
  MATERIAL_TYPE_OPTIONS, 
  CONDITION_OPTIONS, 
  PROCESS_OPTIONS, 
  DEMO_PRESET,
  PRESET_SCENARIOS
} from '../data/sampleData';

export default function MaterialAnalysisPage({ onAnalysisComplete, initialFormData = null }) {
  const [formData, setFormData] = useState(initialFormData || {
    materialType: 'Mild Steel',
    condition: 'Offcut',
    length: 1200,
    width: 600,
    thickness: 4,
    dimensionUnit: 'mm',
    quantity: 85,
    quantityUnit: 'kg',
    properties: {
      grade: 'IS 2062 Grade E250',
      strength: 'High',
      hardness: 'Moderate',
      flexibility: 'Low',
      heatResistance: 'Moderate',
      surfaceCondition: 'Clean, light mill oil',
      notes: ''
    },
    processes: ['Laser cutting', 'Welding', 'Drilling', 'Bending'],
    additionalNotes: '',
    imageUrl: null,
    imageName: null
  });

  const [errors, setErrors] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const ANALYSIS_STAGES = [
    'Scanning material dimensional profile & density parameters...',
    'Matching metallurgical grade with structural stress models...',
    'Checking shop tooling constraints (CNC, Laser, Bending, Welding)...',
    'Calculating component nesting yield and potential margins...',
    'Finalizing manufacturing recommendation dossier...'
  ];

  // Try Demo Material Button handler
  const handleLoadDemo = () => {
    setFormData({
      materialType: DEMO_PRESET.materialType,
      condition: DEMO_PRESET.condition,
      length: DEMO_PRESET.length,
      width: DEMO_PRESET.width,
      thickness: DEMO_PRESET.thickness,
      dimensionUnit: DEMO_PRESET.dimensionUnit,
      quantity: DEMO_PRESET.quantity,
      quantityUnit: DEMO_PRESET.quantityUnit,
      properties: { ...DEMO_PRESET.properties },
      processes: [...DEMO_PRESET.processes],
      additionalNotes: DEMO_PRESET.additionalNotes,
      imageUrl: DEMO_PRESET.imageUrl,
      imageName: DEMO_PRESET.imageName
    });
    setErrors({});
  };

  const handleLoadScenario = (scenario) => {
    const data = scenario.data;
    setFormData({
      materialType: data.materialType,
      condition: data.condition,
      length: data.length,
      width: data.width,
      thickness: data.thickness,
      dimensionUnit: data.dimensionUnit,
      quantity: data.quantity,
      quantityUnit: data.quantityUnit,
      properties: { ...data.properties },
      processes: [...data.processes],
      additionalNotes: data.additionalNotes,
      imageUrl: data.imageUrl,
      imageName: data.imageName
    });
    setErrors({});
  };

  const handleProcessToggle = (processName) => {
    setFormData(prev => {
      const exists = prev.processes.includes(processName);
      const updated = exists 
        ? prev.processes.filter(p => p !== processName)
        : [...prev.processes, processName];
      return { ...prev, processes: updated };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          imageUrl: event.target?.result,
          imageName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      imageUrl: null,
      imageName: null
    }));
  };

  const validate = () => {
    const err = {};
    if (!formData.materialType) err.materialType = 'Material type is required';
    if (!formData.length || formData.length <= 0) err.length = 'Length must be > 0';
    if (!formData.width || formData.width <= 0) err.width = 'Width must be > 0';
    if (!formData.thickness || formData.thickness <= 0) err.thickness = 'Thickness must be > 0';
    if (!formData.quantity || formData.quantity <= 0) err.quantity = 'Quantity must be > 0';
    if (formData.processes.length === 0) err.processes = 'Select at least one available manufacturing process';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);

    // Multi-stage realistic loading animation
    const interval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev < ANALYSIS_STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            onAnalysisComplete(formData);
          }, 600);
          return prev;
        }
      });
    }, 550);
  };

  return (
    <div className="page-wrapper">
      {/* Loading Overlay */}
      {isAnalyzing && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              maxWidth: '520px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              border: '1px solid #cbd5e1'
            }}
          >
            {/* Holographic scanner spinner */}
            <div
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                margin: '0 auto 1.5rem auto',
                background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.5)',
                animation: 'spinSlow 4s linear infinite',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Sparkles size={28} color="#059669" />
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Analyzing Material Properties...
            </h3>

            <p style={{ fontSize: '0.875rem', color: '#059669', fontWeight: 600, minHeight: '44px', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              {ANALYSIS_STAGES[analysisStep]}
            </p>

            {/* Progress Bar */}
            <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div
                style={{
                  height: '100%',
                  width: `${((analysisStep + 1) / ANALYSIS_STAGES.length) * 100}%`,
                  background: 'linear-gradient(90deg, #10b981 0%, #0284c7 100%)',
                  borderRadius: '999px',
                  transition: 'width 0.5s ease-out'
                }}
              />
            </div>

            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Stage {analysisStep + 1} of {ANALYSIS_STAGES.length} • Evaluating {formData.materialType}
            </span>
          </div>
        </div>
      )}

      {/* Header and Try Demo Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
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
              Core Material Intake
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Analyze Your Material
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
            Tell us about your leftover or rejected material and we'll identify possible manufacturing opportunities.
          </p>
        </div>

        {/* Try Demo Button Highlight */}
        <div
          style={{
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '14px',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.12)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#065f46' }}>
              Demonstration Mode
            </div>
            <div style={{ fontSize: '0.8rem', color: '#047857' }}>
              Pre-fill realistic Mild Steel plate data
            </div>
          </div>
          <button
            onClick={handleLoadDemo}
            className="btn btn-primary btn-sm"
            id="try-demo-material-btn"
          >
            <Zap size={15} />
            <span>Try Demo Material</span>
          </button>
        </div>
      </div>

      {/* Preset Scenarios Selector Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '0.85rem 1.25rem',
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          marginBottom: '1.75rem',
          overflowX: 'auto',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={15} color="#059669" />
          One-Click Test Presets:
        </span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {PRESET_SCENARIOS.map((preset) => {
            const isCurrent = formData.materialType === preset.data.materialType && formData.quantity === preset.data.quantity;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleLoadScenario(preset)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '0.785rem',
                  fontWeight: isCurrent ? 700 : 500,
                  backgroundColor: isCurrent ? '#ecfdf5' : '#f8fafc',
                  color: isCurrent ? '#047857' : '#334155',
                  border: isCurrent ? '1px solid #10b981' : '1px solid #cbd5e1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
                <span style={{ fontSize: '0.675rem', color: isCurrent ? '#065f46' : '#64748b' }}>({preset.badge})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '2rem' }}>
          {/* Section 1: Classification & Origin */}
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="#059669" />
              1. Material Classification & Condition
            </h3>

            {/* Material Type */}
            <div className="form-group">
              <label className="form-label" htmlFor="materialType">
                Material Type <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                id="materialType"
                className="form-control"
                value={formData.materialType}
                onChange={e => setFormData({ ...formData, materialType: e.target.value })}
              >
                {MATERIAL_TYPE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.materialType && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.materialType}</div>}
            </div>

            {/* Material Condition */}
            <div className="form-group">
              <label className="form-label" htmlFor="condition">
                Material Condition <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                id="condition"
                className="form-control"
                value={formData.condition}
                onChange={e => setFormData({ ...formData, condition: e.target.value })}
              >
                {CONDITION_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Optional Image Upload */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                Upload Material Photo (Optional)
              </label>
              <div
                style={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  backgroundColor: '#f8fafc',
                  position: 'relative'
                }}
              >
                {formData.imageUrl ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={formData.imageUrl}
                        alt="Scrap preview"
                        style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          backgroundColor: '#ef4444',
                          color: '#ffffff',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#047857', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={14} />
                      Image received: {formData.imageName || 'material_photo.jpg'}
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        backgroundColor: '#e0f2fe',
                        color: '#0369a1',
                        padding: '2px 8px',
                        borderRadius: '999px'
                      }}
                    >
                      Visual inspection available in future AI version
                    </span>
                  </div>
                ) : (
                  <div>
                    <Upload size={24} color="#64748b" style={{ margin: '0 auto 6px auto' }} />
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Click to upload photo of offcut/scrap
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px' }}>
                      Accepts JPG, PNG up to 10MB
                    </div>
                    <label
                      htmlFor="image-upload"
                      className="btn btn-secondary btn-sm"
                      style={{ cursor: 'pointer', display: 'inline-flex' }}
                    >
                      Browse Files
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    <div style={{ marginTop: '8px', fontSize: '0.7rem', color: '#64748b' }}>
                      Visual inspection available in future AI version.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Physical Dimensions & Mass */}
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="#0284c7" />
              2. Dimensions & Quantity
            </h3>

            {/* Dimensions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 85px', gap: '8px', marginBottom: '1rem', alignItems: 'flex-start' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Length</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.length}
                  onChange={e => setFormData({ ...formData, length: parseFloat(e.target.value) || '' })}
                  placeholder="1200"
                  min="1"
                />
                {errors.length && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>{errors.length}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Width</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.width}
                  onChange={e => setFormData({ ...formData, width: parseFloat(e.target.value) || '' })}
                  placeholder="600"
                  min="1"
                />
                {errors.width && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>{errors.width}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Thickness</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.thickness}
                  onChange={e => setFormData({ ...formData, thickness: parseFloat(e.target.value) || '' })}
                  placeholder="4"
                  min="0.1"
                  step="0.1"
                />
                {errors.thickness && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>{errors.thickness}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Unit</label>
                <select
                  className="form-control"
                  value={formData.dimensionUnit}
                  onChange={e => setFormData({ ...formData, dimensionUnit: e.target.value })}
                >
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="inch">in</option>
                </select>
              </div>
            </div>

            {/* Quantity */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', marginBottom: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">
                  Available Quantity <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.quantity}
                  onChange={e => setFormData({ ...formData, quantity: parseFloat(e.target.value) || '' })}
                  placeholder="85"
                  min="1"
                />
                {errors.quantity && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>{errors.quantity}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Unit</label>
                <select
                  className="form-control"
                  value={formData.quantityUnit}
                  onChange={e => setFormData({ ...formData, quantityUnit: e.target.value })}
                >
                  <option value="kg">kg</option>
                  <option value="pieces">pieces</option>
                  <option value="meters">meters</option>
                  <option value="sheets">sheets</option>
                </select>
              </div>
            </div>

            {/* Additional info textarea */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                Additional Information
              </label>
              <textarea
                className="form-control"
                rows="3"
                value={formData.additionalNotes}
                onChange={e => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Describe any other information about the material (e.g., origin job, clean edges, rust condition)..."
              />
            </div>
          </div>
        </div>

        {/* Section 3: Material Properties & Available Manufacturing Processes */}
        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: '#ffffff', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wrench size={18} color="#8b5cf6" />
            3. Material Properties & Available Manufacturing Capabilities
          </h3>

          <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
            {/* Properties Inputs */}
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.75rem' }}>
                Mechanical & Metallurgical Properties
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Alloy / Grade</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ fontSize: '0.85rem' }}
                    value={formData.properties.grade}
                    onChange={e => setFormData({ ...formData, properties: { ...formData.properties, grade: e.target.value } })}
                    placeholder="e.g. IS 2062, 6061-T6"
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Strength</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ fontSize: '0.85rem' }}
                    value={formData.properties.strength}
                    onChange={e => setFormData({ ...formData, properties: { ...formData.properties, strength: e.target.value } })}
                    placeholder="e.g. High (Yield 250 MPa)"
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Hardness</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ fontSize: '0.85rem' }}
                    value={formData.properties.hardness}
                    onChange={e => setFormData({ ...formData, properties: { ...formData.properties, hardness: e.target.value } })}
                    placeholder="e.g. Moderate (~140 HB)"
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Surface Condition</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ fontSize: '0.85rem' }}
                    value={formData.properties.surfaceCondition}
                    onChange={e => setFormData({ ...formData, properties: { ...formData.properties, surfaceCondition: e.target.value } })}
                    placeholder="e.g. Clean mill oil, no rust"
                  />
                </div>
              </div>
            </div>

            {/* Checkbox Processes Available */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                  Manufacturing Processes Available <span style={{ color: '#ef4444' }}>*</span>
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {formData.processes.length} selected
                </span>
              </div>

              {errors.processes && (
                <div style={{ color: '#ef4444', fontSize: '0.75rem', marginBottom: '6px' }}>
                  {errors.processes}
                </div>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '8px'
                }}
              >
                {PROCESS_OPTIONS.map((processName) => {
                  const isChecked = formData.processes.includes(processName);
                  return (
                    <label
                      key={processName}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '7px 10px',
                        borderRadius: '8px',
                        backgroundColor: isChecked ? '#ecfdf5' : '#f8fafc',
                        border: isChecked ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                        fontSize: '0.8125rem',
                        fontWeight: isChecked ? 700 : 500,
                        color: isChecked ? '#065f46' : '#475569',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleProcessToggle(processName)}
                        style={{ accentColor: '#10b981', cursor: 'pointer' }}
                      />
                      <span>{processName}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action / Submit Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            padding: '1.25rem 1.75rem',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem' }}>
            <ShieldCheck size={18} color="#10b981" />
            <span>Simulates material yield, nesting efficiency, and rupee margin potential.</span>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={handleLoadDemo}
              className="btn btn-secondary"
            >
              <Zap size={16} color="#059669" />
              <span>Reset to Demo Data</span>
            </button>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              id="analyze-material-submit-btn"
            >
              <Sparkles size={18} />
              <span>Analyze Material</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
