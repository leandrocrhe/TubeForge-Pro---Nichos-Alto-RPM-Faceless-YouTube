import React from 'react';
import { 
  Compass, 
  Scale, 
  Calculator, 
  Zap, 
  FileCode, 
  Plus, 
  Sparkles,
  Bookmark,
  Bot,
  Kanban
} from 'lucide-react';

export type TabType = 'explorer' | 'comparator' | 'calculator' | 'hookLab' | 'sopLab' | 'scriptStudio' | 'kanban';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  compareCount: number;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (val: boolean) => void;
  openCustomModal: () => void;
  pipelineCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  compareCount,
  favoritesCount,
  showFavoritesOnly,
  setShowFavoritesOnly,
  openCustomModal,
  pipelineCount = 0,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 lg:gap-3 xl:gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('explorer')}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/25 ring-1 ring-white/20 shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-black text-white tracking-tight text-base sm:text-lg">
                TubeForge
              </span>
              <span className="bg-gradient-to-r from-rose-500/20 to-indigo-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider shrink-0">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden 2xl:block whitespace-nowrap">
              Inteligencia de Nichos de Alto RPM
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop / Laptop) - Zero-wrap, perfectly distributed */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
              activeTab === 'explorer'
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>Explorador</span>
          </button>

          <button
            onClick={() => setActiveTab('comparator')}
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
              activeTab === 'comparator'
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Scale className="w-3.5 h-3.5 shrink-0" />
            <span>Comparar</span>
            {compareCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                {compareCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
              activeTab === 'calculator'
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 shrink-0" />
            <span>Proyección</span>
          </button>

          <button
            onClick={() => setActiveTab('scriptStudio')}
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
              activeTab === 'scriptStudio'
                ? 'bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Script IA</span>
          </button>

          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
              activeTab === 'kanban'
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Kanban className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Pipeline</span>
            {pipelineCount > 0 && (
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                {pipelineCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('hookLab')}
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
              activeTab === 'hookLab'
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Hooks</span>
          </button>

          <button
            onClick={() => setActiveTab('sopLab')}
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
              activeTab === 'sopLab'
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>SOP</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Favorites quick toggle */}
          <button
            onClick={() => {
              setActiveTab('explorer');
              setShowFavoritesOnly(!showFavoritesOnly);
            }}
            title={showFavoritesOnly ? 'Ver todos los nichos' : 'Ver guardados'}
            className={`px-2.5 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
              showFavoritesOnly
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 shrink-0 ${showFavoritesOnly ? 'fill-amber-400' : ''}`} />
            <span className="hidden sm:inline">Guardados</span>
            {favoritesCount > 0 && (
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full font-bold font-mono">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* RPM Ticker Widget - Shown only on wide displays to prevent wrapping */}
          <div className="hidden 2xl:flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300 whitespace-nowrap shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>RPM Top: <strong className="text-emerald-400 font-mono font-bold">$32.00+</strong></span>
          </div>

          {/* Custom Niche Evaluator CTA */}
          <button
            onClick={openCustomModal}
            className="bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-rose-600/25 active:scale-95 whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Analizar</span> Mi Idea
          </button>
        </div>
      </div>

      {/* Mobile / Tablet subnavigation bar - Horizontal scroll with zero text wrapping */}
      <div className="lg:hidden flex items-center justify-start gap-1.5 border-t border-slate-800/80 bg-slate-950 px-3 py-2 text-[11px] font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('explorer')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === 'explorer' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-3.5 h-3.5 shrink-0" />
          <span>Explorador</span>
        </button>
        <button
          onClick={() => setActiveTab('comparator')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === 'comparator' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Scale className="w-3.5 h-3.5 shrink-0" />
          <span>Comparar ({compareCount})</span>
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === 'calculator' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 shrink-0" />
          <span>Proyección</span>
        </button>
        <button
          onClick={() => setActiveTab('scriptStudio')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === 'scriptStudio' ? 'bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>Script IA</span>
        </button>
        <button
          onClick={() => setActiveTab('kanban')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === 'kanban' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Kanban className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Pipeline</span>
          {pipelineCount > 0 && (
            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-1 rounded-full font-mono">
              {pipelineCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('hookLab')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === 'hookLab' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Hooks</span>
        </button>
        <button
          onClick={() => setActiveTab('sopLab')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition ${
            activeTab === 'sopLab' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCode className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>SOP</span>
        </button>
      </div>
    </header>
  );
};
