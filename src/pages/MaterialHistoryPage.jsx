import React, { useState } from 'react';
import { 
  Search, Eye, Trash2, Sparkles, Download
} from 'lucide-react';

export default function MaterialHistoryPage({ 
  history = [], 
  onInspectMaterial, 
  onDeleteHistoryItem, 
  onAnalyzeNew 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredHistory = history.filter((item) => {
    const matchesSearch = 
      (item.materialName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.materialType || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.condition || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.dimensions || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'All' || item.materialType === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `scrap2spec_materials_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const uniqueTypes = ['All', ...new Set(history.map(item => item.materialType).filter(Boolean))];

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
              Historical Audit Log
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Material History
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
            Log of previously evaluated factory scrap, offcuts, and component lots.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleExportJSON}
            className="btn btn-secondary btn-sm"
            title="Export history records as JSON"
          >
            <Download size={15} />
            <span>Export JSON</span>
          </button>

          <button
            onClick={onAnalyzeNew}
            className="btn btn-primary"
          >
            <Sparkles size={16} />
            <span>Analyze New Material</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div
        className="card"
        style={{
          padding: '1rem 1.25rem',
          borderRadius: '14px',
          marginBottom: '1.75rem',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '220px' }}>
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            className="form-control"
            style={{ border: 'none', boxShadow: 'none', padding: '0.4rem 0', fontSize: '0.875rem' }}
            placeholder="Search by material name, dimensions, condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Type Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Material:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="form-control"
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.8125rem' }}
          >
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* History Table */}
      <div className="card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div className="data-table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date Analyzed</th>
                <th>Reuse Potential</th>
                <th>Opportunities</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    No matching materials found in history log.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onInspectMaterial(item)}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt="thumb"
                            style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '8px',
                              backgroundColor: '#f1f5f9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              color: '#334155'
                            }}
                          >
                            {item.materialType ? item.materialType.slice(0, 2).toUpperCase() : 'MT'}
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>
                            {item.materialName || `${item.materialType} Offcut`}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {item.dimensions || `${item.length}×${item.width} mm`} • {item.condition}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-gray">
                        {item.materialType}
                      </span>
                    </td>

                    <td>
                      <strong style={{ color: '#334155' }}>
                        {item.quantity} {item.quantityUnit || 'kg'}
                      </strong>
                    </td>

                    <td>
                      <span style={{ color: '#64748b', fontSize: '0.825rem' }}>
                        {item.dateAnalyzed || 'Recent'}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#ecfdf5',
                            border: '1px solid #a7f3d0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            color: '#059669'
                          }}
                        >
                          {item.reusePotential || 87}%
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#047857' }}>
                          Potential
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-brand">
                        {item.opportunitiesCount || 4} ideas
                      </span>
                    </td>

                    <td>
                      <span className="status-pill status-production">
                        {item.status || 'Analyzed'}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={() => onInspectMaterial(item)}
                          className="btn btn-secondary btn-sm"
                          title="View analysis recommendations"
                        >
                          <Eye size={14} />
                          <span>View Ideas</span>
                        </button>

                        <button
                          onClick={() => onDeleteHistoryItem(item.id)}
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            color: '#94a3b8',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                          title="Delete entry"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
