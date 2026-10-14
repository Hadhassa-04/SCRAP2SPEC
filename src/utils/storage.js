import { INITIAL_HISTORY, INITIAL_SAVED_OPPORTUNITIES, INITIAL_STATS } from '../data/sampleData';

const STORAGE_KEYS = {
  HISTORY: 'scrap2spec_history_v1',
  SAVED: 'scrap2spec_saved_v1',
  STATS: 'scrap2spec_stats_v1',
  CURRENT_ANALYSIS: 'scrap2spec_current_analysis_v1'
};

/**
 * Get material history from LocalStorage
 */
export function getMaterialHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(INITIAL_HISTORY));
      return INITIAL_HISTORY;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read material history', e);
    return INITIAL_HISTORY;
  }
}

/**
 * Save new material to history
 */
export function addMaterialToHistory(materialItem) {
  try {
    const current = getMaterialHistory();
    const updated = [materialItem, ...current];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    
    // Update stats dynamically
    updateStatsIncrement();
    return updated;
  } catch (e) {
    console.error('Failed to save to history', e);
    return [];
  }
}

/**
 * Delete material from history
 */
export function deleteMaterialFromHistory(id) {
  try {
    const current = getMaterialHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete history item', e);
    return [];
  }
}

/**
 * Get saved opportunities
 */
export function getSavedOpportunities() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(INITIAL_SAVED_OPPORTUNITIES));
      return INITIAL_SAVED_OPPORTUNITIES;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read saved opportunities', e);
    return INITIAL_SAVED_OPPORTUNITIES;
  }
}

/**
 * Save an opportunity
 */
export function saveOpportunity(opportunity) {
  try {
    const current = getSavedOpportunities();
    // Check if already saved
    const exists = current.find(item => item.id === opportunity.id || (item.productName === opportunity.productName && item.materialId === opportunity.materialId));
    if (exists) {
      return { success: false, message: 'Opportunity already saved!', list: current };
    }

    const newRecord = {
      ...opportunity,
      dateSaved: opportunity.dateSaved || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: opportunity.status || 'New'
    };

    const updated = [newRecord, ...current];
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(updated));
    return { success: true, message: 'Saved to opportunities!', list: updated };
  } catch (e) {
    console.error('Failed to save opportunity', e);
    return { success: false, message: 'Failed to save opportunity' };
  }
}

/**
 * Update opportunity status (e.g. New -> Reviewing -> In Production)
 */
export function updateOpportunityStatus(id, newStatus) {
  try {
    const current = getSavedOpportunities();
    const updated = current.map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to update opportunity status', e);
    return [];
  }
}

/**
 * Delete a saved opportunity
 */
export function deleteOpportunity(id) {
  try {
    const current = getSavedOpportunities();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete opportunity', e);
    return [];
  }
}

/**
 * Get dynamic dashboard statistics
 */
export function getStats() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    const history = getMaterialHistory();
    const saved = getSavedOpportunities();
    
    // Calculate total potential value from saved + history
    const historyValue = history.reduce((acc, h) => acc + (h.quantityKg || 40) * 120, 0);
    const savedValue = saved.reduce((acc, s) => acc + (s.potentialValue || 0), 0);
    const totalReusedKg = history.reduce((acc, h) => acc + (parseFloat(h.quantity) || 30), 0) + 1150;

    if (!data) {
      return {
        materialsAnalyzed: Math.max(INITIAL_STATS.materialsAnalyzed, history.length),
        opportunitiesFound: Math.max(INITIAL_STATS.opportunitiesFound, history.length * 4),
        materialReusedKg: Math.max(INITIAL_STATS.materialReusedKg, Math.round(totalReusedKg)),
        potentialValueIdentified: Math.max(INITIAL_STATS.potentialValueIdentified, savedValue + 120000)
      };
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_STATS;
  }
}

function updateStatsIncrement() {
  try {
    const stats = getStats();
    stats.materialsAnalyzed += 1;
    stats.opportunitiesFound += 4;
    stats.materialReusedKg += 85;
    stats.potentialValueIdentified += 37000;
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (e) {
    // ignore
  }
}

/**
 * Cache current active analysis results so page refreshes don't lose them
 */
export function setCurrentAnalysis(analysisData) {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ANALYSIS, JSON.stringify(analysisData));
  } catch (e) {
    console.error('Failed to set current analysis', e);
  }
}

export function getCurrentAnalysis() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_ANALYSIS);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Reset data to factory presets
 */
export function resetFactoryData() {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(INITIAL_HISTORY));
  localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(INITIAL_SAVED_OPPORTUNITIES));
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(INITIAL_STATS));
  localStorage.removeItem(STORAGE_KEYS.CURRENT_ANALYSIS);
}
