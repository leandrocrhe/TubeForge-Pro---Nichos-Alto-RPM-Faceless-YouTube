import React, { useMemo } from 'react';
import { Niche, Category } from '../types/niche';
import { 
  Search, 
  RotateCcw, 
  Scale, 
  ArrowRight, 
  Bookmark, 
  Check, 
  Sparkles, 
  Bot, 
  CreditCard, 
  Shield, 
  Building, 
  Dna, 
  Truck, 
  FileWarning, 
  Crown, 
  Terminal,
  Zap,
  TrendingUp,
  Clock,
  Layers,
  History
} from 'lucide-react';

interface ExplorerTabProps {
  niches: Niche[];
  selectedNiche: Niche;
  setSelectedNiche: (niche: Niche) => void;
  comparisonList: string[];
  toggleCompare: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (val: boolean) => void;
  openSopModal: (niche: Niche) => void;
  loadNicheIntoCalculator: (niche: Niche) => void;
  onNavigateToScriptStudio?: (niche: Niche, hook?: string, topic?: string) => void;
  onAddToPipeline?: (project: any) => void;
  onOpenDiscoverModal: () => void;
  onOpenHistoryDrawer: () => void;
  historyCount: number;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedComp: string;
  setSelectedComp: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  facelessOnly: boolean;
  setFacelessOnly: (val: boolean) => void;
  resetFilters: () => void;
}

export const ExplorerTab: React.FC<ExplorerTabProps> = ({
  niches,
  selectedNiche,
  setSelectedNiche,
  comparisonList,
  toggleCompare,
  favorites,
  toggleFavorite,
  showFavoritesOnly,
  setShowFavoritesOnly,
  openSopModal,
  loadNicheIntoCalculator,
  onNavigateToScriptStudio,
  onAddToPipeline,
  onOpenDiscoverModal,
  onOpenHistoryDrawer,
  historyCount,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedComp,
  setSelectedComp,
  sortBy,
  setSortBy,
  facelessOnly,
  setFacelessOnly,
  resetFilters
}) => {

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-rose-400' };
    switch (iconName) {
      case 'Scale': return <Scale {...props} />;
      case 'Bot': return <Bot {...props} />;
      case 'CreditCard': return <CreditCard {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Building': return <Building {...props} />;
      case 'Dna': return <Dna {...props} />;
      case 'Truck': return <Truck {...props} />;
      case 'FileWarning': return <FileWarning {...props} />;
      case 'Crown': return <Crown {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const filteredNiches = useMemo(() => {
    let result = niches.filter(niche => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        niche.name.toLowerCase().includes(q) ||
        niche.desc.toLowerCase().includes(q) ||
        niche.category.toLowerCase().includes(q) ||
        niche.subniches.some(s => 
          s.title.toLowerCase().includes(q) || 
          s.angles.toLowerCase().includes(q) ||
          s.monetization.toLowerCase().includes(q)
        )
      );

      const matchesCat = selectedCategory === 'all' || niche.category === selectedCategory;
      const matchesComp = selectedComp === 'all' || niche.competition === selectedComp;
      const matchesFaceless = !facelessOnly || niche.facelessScore >= 92;
      const matchesFav = !showFavoritesOnly || favorites.includes(niche.id);

      return matchesSearch && matchesCat && matchesComp && matchesFaceless && matchesFav;
    });

    if (sortBy === 'opportunity') {
      result.sort((a, b) => b.opportunityScore - a.opportunityScore);
    } else if (sortBy === 'rpmDesc') {
      result.sort((a, b) => b.avgRpm - a.avgRpm);
    } else if (sortBy === 'faceless') {
      result.sort((a, b) => b.facelessScore - a.facelessScore);
    } else if (sortBy === 'timeAsc') {
      result.sort((a, b) => a.productionHours - b.productionHours);
    }

    return result;
  }, [niches, searchQuery, selectedCategory, selectedComp, sortBy, facelessOnly, showFavoritesOnly, favorites]);

  return (
    <div className="space-y-6">
      {/* Search & Control Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3.5 shadow-xl backdrop-blur-sm">
        {/* Tier 1: Search Bar & Primary Actions */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 justify-between">
          {/* Responsive Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar nicho, software B2B, monetización, CPM, subnichos..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action CTAs (Gemini AI Discovery & History) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* AI Discovery CTA */}
            <button
              onClick={onOpenDiscoverModal}
              className="flex-1 sm:flex-initial bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-600/25 transition active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>Descubrir Nuevos Nichos</span>
            </button>

            {/* Niche History Button */}
            <button
              onClick={onOpenHistoryDrawer}
              className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold px-3 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 hover:border-slate-700 transition shrink-0 whitespace-nowrap"
              title="Abrir historial de sugerencias IA"
            >
              <History className="w-3.5 h-3.5 text-indigo-400" />
              <span>Historial</span>
              {historyCount > 0 && (
                <span className="bg-indigo-600 text-white font-mono text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {historyCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Subtle separator */}
        <div className="h-px bg-slate-800/80 w-full" />

        {/* Tier 2: Filter Controls & Sorting (Responsive Flex) */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          {/* Category Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[150px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-rose-500 cursor-pointer appearance-none pr-8 transition hover:border-slate-700"
            >
              <option value="all">Todas las Categorías</option>
              <option value="Finanzas">Finanzas & Riqueza</option>
              <option value="Tecnología">IA & SaaS B2B</option>
              <option value="Legal">Legal & Reclamaciones</option>
              <option value="Salud">Longevidad & Biohacking</option>
              <option value="Negocios">E-Commerce & High-Ticket</option>
              <option value="Estilo de Vida">Lujo & Narrativa</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">
              ▼
            </div>
          </div>

          {/* Competition Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[130px]">
            <select
              value={selectedComp}
              onChange={(e) => setSelectedComp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-rose-500 cursor-pointer appearance-none pr-8 transition hover:border-slate-700"
            >
              <option value="all">Competencia: Todas</option>
              <option value="Baja">Competencia Baja</option>
              <option value="Media">Competencia Media</option>
              <option value="Alta">Competencia Alta</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">
              ▼
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[150px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-rose-500 cursor-pointer appearance-none pr-8 transition hover:border-slate-700"
            >
              <option value="opportunity">Mayor Oportunidad</option>
              <option value="rpmDesc">Mayor RPM ($/1k)</option>
              <option value="faceless">Más Fácil Faceless</option>
              <option value="timeAsc">Menor Tiempo Producción</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">
              ▼
            </div>
          </div>

          {/* 100% Faceless Toggle */}
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl hover:border-slate-700 transition whitespace-nowrap shrink-0">
            <input
              type="checkbox"
              checked={facelessOnly}
              onChange={(e) => setFacelessOnly(e.target.checked)}
              className="accent-rose-500 rounded cursor-pointer"
            />
            <span className="select-none font-medium text-[11px]">≥92% Faceless</span>
          </label>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            title="Restablecer todos los filtros"
            className="text-slate-400 hover:text-white px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition flex items-center gap-1.5 whitespace-nowrap ml-auto sm:ml-0 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px]">Limpiar Filtros</span>
          </button>
        </div>
      </div>

      {/* Grid: Matrix + Deep Dive Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Cards List (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-medium">
            <span>
              Mostrando <strong className="text-white">{filteredNiches.length}</strong> de {niches.length} nichos analizados
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Haz clic en cualquier nicho para ver su blueprint
            </span>
          </div>

          {filteredNiches.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs bg-slate-900/60 border border-slate-800 rounded-2xl">
              <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="font-semibold text-slate-400 text-sm">No se encontraron nichos con estos filtros.</p>
              <p className="mt-1">Prueba restableciendo los filtros o buscando otro término.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-500 transition"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredNiches.map((niche) => {
                const isSelected = selectedNiche.id === niche.id;
                const inCompare = comparisonList.includes(niche.id);
                const isFav = favorites.includes(niche.id);

                const compBadgeClass =
                  niche.competition === 'Baja'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : niche.competition === 'Media'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30';

                return (
                  <div
                    key={niche.id}
                    onClick={() => setSelectedNiche(niche)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between border ${
                      isSelected
                        ? 'ring-2 ring-rose-500 bg-slate-900/95 border-rose-500/50 shadow-xl shadow-rose-950/20'
                        : 'bg-slate-900/65 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                    }`}
                  >
                    {/* Top Row: Icon, Badges, Name, Score, Favorite */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                          {renderIcon(niche.icon)}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              {niche.category}
                            </span>
                            <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${compBadgeClass}`}>
                              Competencia {niche.competition}
                            </span>
                            {niche.isCustom && (
                              <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                                Personalizado
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm font-bold text-white mt-1 hover:text-rose-400 transition leading-snug">
                            {niche.name}
                          </h3>
                        </div>
                      </div>

                      {/* Right Top: Score & Bookmark */}
                      <div className="flex items-start gap-2 shrink-0">
                        <div className="text-right">
                          <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                            Índice
                          </span>
                          <span className="text-base font-black text-emerald-400 font-mono">
                            {niche.opportunityScore}
                            <span className="text-[10px] text-slate-500">/100</span>
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(niche.id);
                          }}
                          className={`p-1.5 rounded-lg border text-xs transition ${
                            isFav
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                              : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                          }`}
                          title={isFav ? 'Quitar de guardados' : 'Guardar nicho'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                      {niche.desc}
                    </p>

                    {/* Bottom Metrics Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase font-medium">
                            RPM Promedio
                          </span>
                          <span className="text-xs font-bold text-emerald-400 font-mono">
                            ${niche.avgRpm.toFixed(2)} USD
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase font-medium">
                            Viabilidad Faceless
                          </span>
                          <span className="text-xs font-bold text-indigo-400 font-mono">
                            {niche.facelessScore}%
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase font-medium">
                            Producción
                          </span>
                          <span className="text-xs font-bold text-slate-300 font-mono">
                            ~{niche.productionHours}h
                          </span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleCompare(niche.id)}
                          className={`text-[11px] px-2.5 py-1.5 rounded-lg border flex items-center gap-1 transition ${
                            inCompare
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-semibold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Scale className="w-3 h-3" />
                          <span>{inCompare ? 'En Comparador' : '+ Comparar'}</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedNiche(niche);
                            openSopModal(niche);
                          }}
                          className="text-[11px] px-3 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white font-semibold transition flex items-center gap-1 shadow-sm active:scale-95"
                          title="Abrir SOP y Plan de Producción Automatizada"
                        >
                          <span>Ver Plan SOP</span>
                          <Sparkles className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Strategic Deep-Dive Panel (5 Cols) */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col max-h-[calc(100vh-6rem)] overflow-y-auto space-y-4">
            {/* Top Niche Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    {selectedNiche.badge}
                  </span>
                  <span className="text-xs text-slate-400">
                    CPM: <strong className="text-slate-200 font-mono">{selectedNiche.cpm}</strong>
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white leading-tight">
                  {selectedNiche.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {selectedNiche.desc}
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-center shrink-0 min-w-[90px] shadow-inner">
                <span className="text-[9px] text-slate-500 block uppercase font-bold">
                  RPM Objetivo
                </span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">
                  ${selectedNiche.avgRpm.toFixed(2)}
                </span>
                <span className="text-[9px] text-slate-500 block">
                  (${selectedNiche.rpmMin}-${selectedNiche.rpmMax})
                </span>
              </div>
            </div>

            {/* Strategic Quick Gauges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-rose-400" />
                  Algoritmo Principal
                </span>
                <span className="text-xs font-bold text-white mt-1 block">
                  {selectedNiche.searchVsBrowse}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-medium flex items-center gap-1">
                  <Bot className="w-3 h-3 text-indigo-400" />
                  Potencial Faceless
                </span>
                <span className="text-xs font-bold text-indigo-400 mt-1 block">
                  {selectedNiche.facelessScore}% automatizable
                </span>
              </div>
            </div>

            {/* Sub-niches Matrix */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Ángulos de Sub-Nicho & Monetización
              </h4>

              {selectedNiche.subniches.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-xs font-bold text-white">{sub.title}</h5>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold shrink-0">
                      CPM: {sub.cpmScore}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Ángulo de Retención:</strong> {sub.angles}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Formato:</strong> {sub.formats}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Mix de Ingresos:</strong> {sub.monetization}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sub.techStack.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1"
                      >
                        <Check className="w-2.5 h-2.5 text-indigo-400" />
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Viral Hook Blueprint Preview */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5">
              <span className="text-[11px] font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Hook de Retención Probado (0-15s)
              </span>
              <p className="text-xs text-slate-300 italic bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                "{selectedNiche.hooks[0]}"
              </p>
            </div>

            {/* CTAs: Simular, Generar Guión IA, SOP y Pipeline */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => loadNicheIntoCalculator(selectedNiche)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition"
              >
                <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                <span>Simular 360°</span>
              </button>

              <button
                onClick={() => openSopModal(selectedNiche)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ver SOP</span>
              </button>

              {onNavigateToScriptStudio && (
                <button
                  onClick={() => onNavigateToScriptStudio(selectedNiche)}
                  className="bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 text-white font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/25 transition active:scale-95"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Generar Guión IA</span>
                </button>
              )}

              {onAddToPipeline && (
                <button
                  onClick={() => {
                    onAddToPipeline({
                      id: `proj_${Date.now()}`,
                      title: `Video sobre ${selectedNiche.name.split(',')[0]}`,
                      nicheId: selectedNiche.id,
                      nicheName: selectedNiche.name,
                      category: selectedNiche.category,
                      stage: 'idea',
                      targetRpm: selectedNiche.avgRpm,
                      targetViews: 100000,
                      estimatedHours: selectedNiche.productionHours || 2.2,
                      createdAt: new Date().toISOString(),
                      notes: `Iniciado desde el Explorador. RPM Objetivo: $${selectedNiche.avgRpm.toFixed(2)}`,
                    });
                    alert(`¡"${selectedNiche.name.split(',')[0]}" añadido al Pipeline Kanban!`);
                  }}
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 font-semibold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:border-slate-700 transition"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>+ Al Pipeline</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
