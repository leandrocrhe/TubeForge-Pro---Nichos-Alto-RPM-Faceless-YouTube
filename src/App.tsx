import React, { useState, useEffect } from 'react';
import { Niche, VideoProject, DiscoveredNicheHistoryItem } from './types/niche';
import { HIGH_YIELD_NICHES } from './data/nichesData';
import { Navbar, TabType } from './components/Navbar';
import { ExplorerTab } from './components/ExplorerTab';
import { ComparatorTab } from './components/ComparatorTab';
import { CalculatorTab } from './components/CalculatorTab';
import { HookLabTab } from './components/HookLabTab';
import { SopLabTab } from './components/SopLabTab';
import { AiScriptStudioTab } from './components/AiScriptStudioTab';
import { PipelineKanbanTab } from './components/PipelineKanbanTab';
import { SopModal } from './components/SopModal';
import { CustomNicheModal } from './components/CustomNicheModal';
import { YouTubeFeedPreviewModal } from './components/YouTubeFeedPreviewModal';
import { DiscoverNichesModal } from './components/DiscoverNichesModal';
import { NicheHistoryDrawer } from './components/NicheHistoryDrawer';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const STORAGE_KEYS = {
  FAVORITES: 'tubeforge_favorites_v1',
  COMPARE: 'tubeforge_compare_v1',
  CUSTOM_NICHES: 'tubeforge_custom_niches_v1',
  PIPELINE: 'tubeforge_pipeline_v1',
  NICHE_HISTORY: 'tubeforge_niche_history_v1',
};

// Default seed projects for the Kanban pipeline
const INITIAL_PROJECTS: VideoProject[] = [
  {
    id: 'seed_1',
    title: 'La Cláusula Secreta que Obligó a Pagar $400M (Demanda Colectiva)',
    nicheId: 'legal_claims',
    nicheName: 'Demandas Masivas, Litigios & Legal Tech',
    category: 'Legal',
    stage: 'script',
    targetRpm: 32.0,
    targetViews: 120000,
    estimatedHours: 2.5,
    createdAt: new Date().toISOString(),
    notes: 'Enfoque en filtraciones de datos recientes. Usar recortes judiciales en amarillo.',
  },
  {
    id: 'seed_2',
    title: 'Cómo Facturar $6,000/mes Importando Esta Sola Máquina de China',
    nicheId: 'ecommerce_supply',
    nicheName: 'Logística High-Ticket, Supply Chain & E-Commerce B2B',
    category: 'Negocios',
    stage: 'audio',
    targetRpm: 18.0,
    targetViews: 85000,
    estimatedHours: 2.0,
    createdAt: new Date().toISOString(),
    notes: 'Desglose FOB vs CIF en Excel. Lead magnet con checklist de inspección en fábrica.',
  },
  {
    id: 'seed_3',
    title: 'Dejé de Pagar $800 al Mes en Software con 1 Flujo de n8n',
    nicheId: 'ai_b2b_agents',
    nicheName: 'Automatización con Agentes IA & SaaS B2B',
    category: 'Tecnología',
    stage: 'editing',
    targetRpm: 22.5,
    targetViews: 160000,
    estimatedHours: 2.2,
    createdAt: new Date().toISOString(),
    notes: 'Grabación en Screen Studio lista. Añadir SFX de teclado y transiciones zoom 1.2x.',
  },
  {
    id: 'seed_4',
    title: 'El Error de $1 que Destruyó un Fondo de $9,000 Millones (Caso Real)',
    nicheId: 'corporate_crime',
    nicheName: 'Fraudes Corporativos & Crímenes Financieros (True Crime)',
    category: 'Estilo de Vida',
    stage: 'published',
    targetRpm: 12.5,
    targetViews: 240000,
    estimatedHours: 2.5,
    createdAt: new Date().toISOString(),
    notes: 'Publicado con 72% de retención a los 30s. Miniatura con alto contraste validada.',
  },
];

export default function App() {
  // Load custom niches from localStorage
  const [niches, setNiches] = useState<Niche[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_NICHES);
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...HIGH_YIELD_NICHES, ...parsed];
      }
    } catch {}
    return HIGH_YIELD_NICHES;
  });

  const [activeTab, setActiveTab] = useState<TabType>('explorer');
  const [selectedNiche, setSelectedNiche] = useState<Niche>(niches[0] || HIGH_YIELD_NICHES[0]);

  // Video Pipeline projects
  const [pipelineProjects, setPipelineProjects] = useState<VideoProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PIPELINE);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PROJECTS;
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Comparison list (max 4)
  const [comparisonList, setComparisonList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPARE);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComp, setSelectedComp] = useState('all');
  const [sortBy, setSortBy] = useState('opportunity');
  const [facelessOnly, setFacelessOnly] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Modals
  const [sopModalNiche, setSopModalNiche] = useState<Niche | null>(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isDiscoverModalOpen, setIsDiscoverModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [nicheHistory, setNicheHistory] = useState<DiscoveredNicheHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NICHE_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [feedPreviewState, setFeedPreviewState] = useState<{
    isOpen: boolean;
    title: string;
    niche: Niche;
  }>({
    isOpen: false,
    title: '',
    niche: niches[0],
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(comparisonList));
    } catch {}
  }, [comparisonList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PIPELINE, JSON.stringify(pipelineProjects));
    } catch {}
  }, [pipelineProjects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NICHE_HISTORY, JSON.stringify(nicheHistory));
    } catch {}
  }, [nicheHistory]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string) => {
    setComparisonList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 4) {
        alert('Puedes comparar un máximo de 4 nichos en simultáneo.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeFromCompare = (id: string) => {
    setComparisonList((prev) => prev.filter((item) => item !== id));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const addToCompare = (id: string) => {
    if (!comparisonList.includes(id)) {
      if (comparisonList.length >= 4) {
        alert('Puedes comparar un máximo de 4 nichos.');
        return;
      }
      setComparisonList([...comparisonList, id]);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedComp('all');
    setSortBy('opportunity');
    setFacelessOnly(false);
    setShowFavoritesOnly(false);
  };

  const handleOpenSop = (niche: Niche) => {
    setSopModalNiche(niche);
  };

  const handleLoadNicheIntoCalculator = (niche: Niche) => {
    setSelectedNiche(niche);
    setActiveTab('calculator');
  };

  const handleSaveCustomNiche = (newNiche: Niche) => {
    setNiches((prev) => {
      const updated = [newNiche, ...prev];
      try {
        const customOnly = updated.filter((n) => n.isCustom);
        localStorage.setItem(STORAGE_KEYS.CUSTOM_NICHES, JSON.stringify(customOnly));
      } catch {}
      return updated;
    });
    setSelectedNiche(newNiche);
    setActiveTab('explorer');
  };

  const handleAddProjectToPipeline = (project: VideoProject) => {
    setPipelineProjects((prev) => [project, ...prev]);
  };

  const handleOpenFeedPreview = (title: string, niche: Niche) => {
    setFeedPreviewState({
      isOpen: true,
      title,
      niche: niche || selectedNiche,
    });
  };

  const handleSaveDiscoveredNiches = (newNiches: Niche[], trendFocus: string) => {
    const newItems: DiscoveredNicheHistoryItem[] = newNiches.map((niche, idx) => ({
      id: `hist_${Date.now()}_${idx}`,
      discoveredAt: new Date().toISOString(),
      niche,
      trendFocus,
    }));
    setNicheHistory((prev) => [...newItems, ...prev]);
  };

  const handleAddNicheToRadar = (niche: Niche) => {
    setNiches((prev) => {
      if (prev.some((n) => n.id === niche.id)) return prev;
      const updated = [niche, ...prev];
      try {
        const customOnly = updated.filter((n) => n.isCustom);
        localStorage.setItem(STORAGE_KEYS.CUSTOM_NICHES, JSON.stringify(customOnly));
      } catch {}
      return updated;
    });
    setSelectedNiche(niche);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setNicheHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    setNicheHistory([]);
  };

  const [scriptStudioHook, setScriptStudioHook] = useState<string>('');
  const [scriptStudioTopic, setScriptStudioTopic] = useState<string>('');

  const handleNavigateToScriptStudio = (niche: Niche, hook?: string, topic?: string) => {
    setSelectedNiche(niche);
    if (hook) setScriptStudioHook(hook);
    if (topic) setScriptStudioTopic(topic);
    setActiveTab('scriptStudio');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={comparisonList.length}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        openCustomModal={() => setIsCustomModalOpen(true)}
        pipelineCount={pipelineProjects.filter((p) => p.stage !== 'published').length}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'explorer' && (
          <ExplorerTab
            niches={niches}
            selectedNiche={selectedNiche}
            setSelectedNiche={setSelectedNiche}
            comparisonList={comparisonList}
            toggleCompare={toggleCompare}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            showFavoritesOnly={showFavoritesOnly}
            setShowFavoritesOnly={setShowFavoritesOnly}
            openSopModal={handleOpenSop}
            loadNicheIntoCalculator={handleLoadNicheIntoCalculator}
            onNavigateToScriptStudio={handleNavigateToScriptStudio}
            onAddToPipeline={handleAddProjectToPipeline}
            onOpenDiscoverModal={() => setIsDiscoverModalOpen(true)}
            onOpenHistoryDrawer={() => setIsHistoryDrawerOpen(true)}
            historyCount={nicheHistory.length}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedComp={selectedComp}
            setSelectedComp={setSelectedComp}
            sortBy={sortBy}
            setSortBy={setSortBy}
            facelessOnly={facelessOnly}
            setFacelessOnly={setFacelessOnly}
            resetFilters={resetFilters}
          />
        )}

        {activeTab === 'comparator' && (
          <ComparatorTab
            comparisonList={comparisonList}
            niches={niches}
            removeFromCompare={removeFromCompare}
            clearComparison={clearComparison}
            addToCompare={addToCompare}
            openSopModal={handleOpenSop}
            loadNicheIntoCalculator={handleLoadNicheIntoCalculator}
          />
        )}

        {activeTab === 'calculator' && (
          <CalculatorTab
            niches={niches}
            currentNiche={selectedNiche}
            onSelectNichePreset={(n) => setSelectedNiche(n)}
          />
        )}

        {activeTab === 'scriptStudio' && (
          <AiScriptStudioTab
            niches={niches}
            currentNiche={selectedNiche}
            onSelectNiche={(n) => setSelectedNiche(n)}
            onAddProjectToPipeline={handleAddProjectToPipeline}
            onOpenFeedPreview={handleOpenFeedPreview}
            initialHook={scriptStudioHook}
            initialSubTopic={scriptStudioTopic}
          />
        )}

        {activeTab === 'kanban' && (
          <PipelineKanbanTab
            projects={pipelineProjects}
            setProjects={setPipelineProjects}
            niches={niches}
            onOpenFeedPreview={handleOpenFeedPreview}
          />
        )}

        {activeTab === 'hookLab' && (
          <HookLabTab
            niches={niches}
            currentNiche={selectedNiche}
            onSelectNiche={(n) => setSelectedNiche(n)}
            onNavigateToScriptStudio={handleNavigateToScriptStudio}
            onAddToPipeline={handleAddProjectToPipeline}
            onOpenFeedPreview={handleOpenFeedPreview}
          />
        )}

        {activeTab === 'sopLab' && (
          <SopLabTab
            niches={niches}
            currentNiche={selectedNiche}
            onSelectNiche={(n) => setSelectedNiche(n)}
          />
        )}
      </main>

      {/* Production & Retention Checklist Bar */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-4 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400 font-medium">
              TubeForge Pro 2026 • Suite de Inteligencia y Automatización para YouTube
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
              Retención &gt;70% a los 30s
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              Monetización 360° (AdSense + Afiliados + Sponsors)
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Pipeline Kanban & Guiones IA
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {sopModalNiche && (
        <SopModal
          niche={sopModalNiche}
          isOpen={!!sopModalNiche}
          onClose={() => setSopModalNiche(null)}
        />
      )}

      {isCustomModalOpen && (
        <CustomNicheModal
          isOpen={isCustomModalOpen}
          onClose={() => setIsCustomModalOpen(false)}
          onSaveCustomNiche={handleSaveCustomNiche}
        />
      )}

      {feedPreviewState.isOpen && (
        <YouTubeFeedPreviewModal
          isOpen={feedPreviewState.isOpen}
          title={feedPreviewState.title}
          niche={feedPreviewState.niche}
          onClose={() => setFeedPreviewState({ ...feedPreviewState, isOpen: false })}
        />
      )}

      {/* Gemini AI Niche Discovery Modal */}
      {isDiscoverModalOpen && (
        <DiscoverNichesModal
          isOpen={isDiscoverModalOpen}
          onClose={() => setIsDiscoverModalOpen(false)}
          onAddNicheToRadar={handleAddNicheToRadar}
          onSaveToHistory={handleSaveDiscoveredNiches}
          onOpenHistoryDrawer={() => {
            setIsDiscoverModalOpen(false);
            setIsHistoryDrawerOpen(true);
          }}
          onNavigateToScriptStudio={handleNavigateToScriptStudio}
          onLoadNicheIntoCalculator={handleLoadNicheIntoCalculator}
        />
      )}

      {/* Niche Discovery History Slide-over Drawer */}
      <NicheHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        historyItems={nicheHistory}
        onRestoreNiche={handleAddNicheToRadar}
        onDeleteItem={handleDeleteHistoryItem}
        onClearAll={handleClearHistory}
        onOpenDiscoverModal={() => {
          setIsHistoryDrawerOpen(false);
          setIsDiscoverModalOpen(true);
        }}
        onLoadNicheIntoCalculator={handleLoadNicheIntoCalculator}
        onNavigateToScriptStudio={handleNavigateToScriptStudio}
      />
    </div>
  );
}
