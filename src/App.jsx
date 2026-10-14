import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import FutureAIArchitectureModal from './components/FutureAIArchitectureModal';
import RecommendationDetailModal from './components/RecommendationDetailModal';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import MaterialAnalysisPage from './pages/MaterialAnalysisPage';
import AnalysisResultsPage from './pages/AnalysisResultsPage';
import ComparisonViewPage from './pages/ComparisonViewPage';
import SavedIdeasPage from './pages/SavedIdeasPage';
import MaterialHistoryPage from './pages/MaterialHistoryPage';

// Utilities & Data
import { generateRecommendations } from './utils/engine';
import { 
  getMaterialHistory, 
  addMaterialToHistory, 
  deleteMaterialFromHistory,
  getSavedOpportunities, 
  saveOpportunity, 
  updateOpportunityStatus, 
  deleteOpportunity, 
  getStats,
  getCurrentAnalysis,
  setCurrentAnalysis
} from './utils/storage';
import { DEMO_PRESET } from './data/sampleData';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'dashboard', 'analyze', 'results', 'compare', 'saved', 'history'
  const [stats, setStats] = useState(getStats());
  const [history, setHistory] = useState(getMaterialHistory());
  const [savedOpportunities, setSavedOpportunities] = useState(getSavedOpportunities());
  const [currentAnalysis, setAnalysis] = useState(() => {
    return getCurrentAnalysis() || generateRecommendations(DEMO_PRESET);
  });
  
  // Modals & Navigation state
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, title = '', type = 'success') => {
    setToast({ message, title, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Handler for analyzing new material
  const handleAnalysisComplete = (materialFormData) => {
    try {
      const result = generateRecommendations(materialFormData);
      setAnalysis(result);
      setCurrentAnalysis(result);

      // Add to history log
      const newHistoryItem = {
        id: `mat-hist-${Date.now()}`,
        materialName: `${materialFormData.materialType} ${materialFormData.condition !== 'Other' ? materialFormData.condition : ''}`.trim(),
        materialType: materialFormData.materialType,
        condition: materialFormData.condition,
        dimensions: `${materialFormData.length} × ${materialFormData.width} × ${materialFormData.thickness} ${materialFormData.dimensionUnit}`,
        length: materialFormData.length,
        width: materialFormData.width,
        thickness: materialFormData.thickness,
        dimensionUnit: materialFormData.dimensionUnit,
        quantity: materialFormData.quantity,
        quantityUnit: materialFormData.quantityUnit,
        dateAnalyzed: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        reusePotential: result.materialSummary.reusePotential,
        opportunitiesCount: result.recommendations.length,
        status: 'Analyzed',
        processes: materialFormData.processes,
        imageUrl: materialFormData.imageUrl,
        properties: materialFormData.properties
      };

      const updatedHistory = addMaterialToHistory(newHistoryItem);
      setHistory(updatedHistory);
      setStats(getStats());

      // Celebration effect
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore
      }

      showToast(
        `Discovered ${result.recommendations.length} manufacturing opportunities with an estimated ${result.materialSummary.reusePotential}% reuse score.`,
        'Analysis Complete!',
        'success'
      );

      setCurrentView('results');
    } catch (error) {
      console.error('Analysis failed', error);
      showToast('An error occurred during analysis. Please check input parameters.', 'Error', 'warning');
    }
  };

  // Handler for Try Demo Material button
  const handleLoadDemo = () => {
    showToast('Loaded demo parameters for Mild Steel offcuts (1200×600×4 mm, 85 kg).', 'Demo Ready', 'info');
    setCurrentView('analyze');
  };

  // Handler for Saving an Opportunity
  const handleSaveRecommendation = (rec) => {
    const opportunityRecord = {
      ...rec,
      materialId: currentAnalysis?.materialSummary?.materialName || 'Active Material',
      material: `${currentAnalysis?.materialSummary?.materialType || 'Steel'} (${currentAnalysis?.materialSummary?.dimensions || 'Sheet'})`,
      dateSaved: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'New'
    };

    const res = saveOpportunity(opportunityRecord);
    if (res.success) {
      setSavedOpportunities(res.list);
      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.85 }
        });
      } catch (e) {
        // ignore
      }
      showToast(
        `"${rec.productName}" added to Saved Opportunities. Track progress in the pipeline.`,
        'Opportunity Saved!',
        'success'
      );
    } else {
      showToast(res.message, 'Notice', 'info');
    }
  };

  // Handler for Status Updates on Saved Ideas
  const handleUpdateStatus = (id, newStatus) => {
    const updated = updateOpportunityStatus(id, newStatus);
    setSavedOpportunities(updated);
    showToast(`Updated status to "${newStatus}"`, 'Status Changed', 'info');
  };

  // Handler for Deleting Saved Opportunity
  const handleDeleteSaved = (id) => {
    const updated = deleteOpportunity(id);
    setSavedOpportunities(updated);
    showToast('Opportunity removed from saved list.', 'Removed', 'info');
  };

  // Handler for Inspecting Material from History
  const handleInspectHistoryItem = (historyItem) => {
    const result = generateRecommendations({
      materialType: historyItem.materialType,
      condition: historyItem.condition,
      length: historyItem.length || 1000,
      width: historyItem.width || 500,
      thickness: historyItem.thickness || 4,
      dimensionUnit: historyItem.dimensionUnit || 'mm',
      quantity: historyItem.quantity || 50,
      quantityUnit: historyItem.quantityUnit || 'kg',
      processes: historyItem.processes || ['Laser cutting', 'Welding', 'Drilling'],
      properties: historyItem.properties || {},
      imageUrl: historyItem.imageUrl
    });

    setAnalysis(result);
    setCurrentAnalysis(result);
    setCurrentView('results');
    showToast(`Loaded manufacturing dossier for ${historyItem.materialName || historyItem.materialType}.`, 'History Item Loaded', 'info');
  };

  // Handler for Deleting History Item
  const handleDeleteHistoryItem = (id) => {
    const updated = deleteMaterialFromHistory(id);
    setHistory(updated);
    showToast('Material history record deleted.', 'Deleted', 'info');
  };

  // Handler for Opening Detail Modal
  const handleViewDetails = (rec) => {
    setSelectedRecommendation(rec);
    setIsDetailModalOpen(true);
  };

  const savedIds = savedOpportunities.map(o => o.id);

  return (
    <div className="app-container">
      {/* Toast Notification Floating Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Future AI Architecture Modal */}
      <FutureAIArchitectureModal 
        isOpen={isArchitectureModalOpen} 
        onClose={() => setIsArchitectureModalOpen(false)} 
      />

      {/* Recommendation Detail Modal */}
      <RecommendationDetailModal
        isOpen={isDetailModalOpen}
        recommendation={selectedRecommendation}
        materialSummary={currentAnalysis?.materialSummary}
        onClose={() => setIsDetailModalOpen(false)}
        onSave={handleSaveRecommendation}
        isSaved={savedIds.includes(selectedRecommendation?.id)}
        onAnalyzeAnother={() => {
          setIsDetailModalOpen(false);
          setCurrentView('analyze');
        }}
      />

      {/* Main Layout Area */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <Navbar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
          onLoadDemo={handleLoadDemo}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* View Layout: Landing vs App Workspace */}
        {currentView === 'landing' ? (
          <LandingPage 
            onAnalyzeClick={() => setCurrentView('analyze')}
            onDemoClick={handleLoadDemo}
            onExploreClick={() => setCurrentView('dashboard')}
          />
        ) : (
          <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 65px)' }}>
            {/* Sidebar for App Dashboard Views */}
            <Sidebar 
              currentView={currentView}
              setCurrentView={setCurrentView}
              savedCount={savedOpportunities.length}
              historyCount={history.length}
              hasActiveAnalysis={Boolean(currentAnalysis)}
              onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
              mobileOpen={mobileMenuOpen}
              setMobileOpen={setMobileMenuOpen}
            />

            {/* Dynamic Active View */}
            <main style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
              {currentView === 'dashboard' && (
                <Dashboard 
                  stats={stats}
                  history={history}
                  onAnalyzeNew={() => setCurrentView('analyze')}
                  onViewSaved={() => setCurrentView('saved')}
                  onViewHistory={() => setCurrentView('history')}
                  onInspectHistoryItem={handleInspectHistoryItem}
                  onLoadDemo={handleLoadDemo}
                />
              )}

              {currentView === 'analyze' && (
                <MaterialAnalysisPage 
                  onAnalysisComplete={handleAnalysisComplete}
                  initialFormData={DEMO_PRESET}
                />
              )}

              {currentView === 'results' && (
                <AnalysisResultsPage 
                  analysisResult={currentAnalysis}
                  onViewDetails={handleViewDetails}
                  onSaveRecommendation={handleSaveRecommendation}
                  savedIds={savedIds}
                  onCompareClick={() => setCurrentView('compare')}
                  onAnalyzeAnother={() => setCurrentView('analyze')}
                />
              )}

              {currentView === 'compare' && (
                <ComparisonViewPage 
                  recommendations={currentAnalysis?.recommendations || []}
                  onViewDetails={handleViewDetails}
                  onSave={handleSaveRecommendation}
                  savedIds={savedIds}
                  onAnalyzeNew={() => setCurrentView('analyze')}
                />
              )}

              {currentView === 'saved' && (
                <SavedIdeasPage 
                  savedList={savedOpportunities}
                  onUpdateStatus={handleUpdateStatus}
                  onDeleteSaved={handleDeleteSaved}
                  onViewDetails={handleViewDetails}
                  onAnalyzeNew={() => setCurrentView('analyze')}
                />
              )}

              {currentView === 'history' && (
                <MaterialHistoryPage 
                  history={history}
                  onInspectMaterial={handleInspectHistoryItem}
                  onDeleteHistoryItem={handleDeleteHistoryItem}
                  onAnalyzeNew={() => setCurrentView('analyze')}
                />
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
