import React, { useState } from 'react';
import { Niche, Category } from '../types/niche';
import { 
  Sparkles, 
  X, 
  RefreshCw, 
  TrendingUp, 
  Bot, 
  Check, 
  Clock, 
  DollarSign, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Layers,
  History
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiscoverNichesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNicheToRadar: (niche: Niche) => void;
  onSaveToHistory: (niches: Niche[], trendFocus: string) => void;
  onOpenHistoryDrawer: () => void;
  onNavigateToScriptStudio?: (niche: Niche, hook?: string, topic?: string) => void;
  onLoadNicheIntoCalculator?: (niche: Niche) => void;
}

const TREND_PRESETS = [
  'Automatizaciones con IA y Agentes para B2B',
  'Litigios, Demandas Colectivas & Privacidad de Datos',
  'Fraudes Corporativos y Casos de Negocio (True Crime)',
  'Finanzas Cuantitativas, REITs y Arbitraje de Tasas',
  'Logística B2B, Supply Chain y Maquinaria Pesada',
  'Biotecnología, Longevidad y Biohacking Clínico',
];

export const DiscoverNichesModal: React.FC<DiscoverNichesModalProps> = ({
  isOpen,
  onClose,
  onAddNicheToRadar,
  onSaveToHistory,
  onOpenHistoryDrawer,
  onNavigateToScriptStudio,
  onLoadNicheIntoCalculator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minRpm, setMinRpm] = useState<number>(20);
  const [trendFocus, setTrendFocus] = useState<string>(TREND_PRESETS[0]);
  const [customTrend, setCustomTrend] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [discoveredResults, setDiscoveredResults] = useState<Niche[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeFocus = customTrend.trim() || trendFocus;

  const handleDiscover = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/discover-niches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          minRpm,
          trendFocus: activeFocus,
        }),
      });

      const data = await response.json();
      if (data.success && Array.isArray(data.niches) && data.niches.length > 0) {
        setDiscoveredResults(data.niches);
        // Persist automatically to history
        onSaveToHistory(data.niches, activeFocus);

        try {
          confetti({
            particleCount: 40,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#6366f1', '#10b981'],
          });
        } catch {}
      } else {
        setErrorMsg(data.error || 'No se pudieron generar sugerencias.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Error de conexión al escanear tendencias con Gemini.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSingle = (niche: Niche) => {
    onAddNicheToRadar(niche);
    setAddedIds((prev) => [...prev, niche.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== niche.id));
    }, 3000);
  };

  const handleAddAll = () => {
    discoveredResults.forEach((n) => onAddNicheToRadar(n));
    setAddedIds(discoveredResults.map((n) => n.id));
    setTimeout(() => {
      setAddedIds([]);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150 space-y-5 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Descubrir Nuevos Nichos con Gemini
                <span className="text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-mono">
                  Tendencias 2026
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Audita patrones de búsqueda recientes y arbitrajes publicitarios de alto CPM para canales faceless
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-950 border border-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Configuration Parameters */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Category Select */}
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                Categoría Objetivo:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="all">Todas las Categorías de Alto RPM</option>
                <option value="Tecnología">Tecnología & IA</option>
                <option value="Legal">Legal & Litigios</option>
                <option value="Finanzas">Finanzas & Inversiones</option>
                <option value="Negocios">Negocios & B2B</option>
                <option value="Salud">Salud & Longevidad</option>
              </select>
            </div>

            {/* Minimum RPM */}
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                RPM Mínimo Deseado:
              </label>
              <select
                value={minRpm}
                onChange={(e) => setMinRpm(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value={15}>Mínimo $15 USD / 1k vistas</option>
                <option value={20}>Mínimo $20 USD / 1k vistas (Estándar)</option>
                <option value={30}>Mínimo $30 USD / 1k vistas (Alto)</option>
                <option value={40}>Mínimo $40 USD / 1k vistas (Extremo)</option>
              </select>
            </div>

            {/* Presets */}
            <div className="sm:col-span-2 md:col-span-1">
              <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                Ángulo de Tendencia:
              </label>
              <select
                value={trendFocus}
                onChange={(e) => {
                  setTrendFocus(e.target.value);
                  setCustomTrend('');
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                {TREND_PRESETS.map((preset, idx) => (
                  <option key={idx} value={preset}>
                    {preset}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Custom Topic */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
              O escribe un término libre de tendencia (opcional):
            </label>
            <input
              type="text"
              value={customTrend}
              onChange={(e) => setCustomTrend(e.target.value)}
              placeholder="Ej: automatización con modelos locales, demandas por rastreo web, micro-SaaS..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Scan CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Los nichos descubiertos se guardan automáticamente en tu Historial</span>
            </div>

            <button
              onClick={handleDiscover}
              disabled={isLoading}
              className="w-full sm:w-auto bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:opacity-60 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition active:scale-95"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Escaneando Tendencias con Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Escanear y Sugerir Nuevos Nichos</span>
                </>
              )}
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Results Area */}
        {discoveredResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span>Nichos Sugeridos por IA ({discoveredResults.length})</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                  Guardados en Historial
                </span>
              </h4>

              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenHistoryDrawer}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Abrir Historial</span>
                </button>
                <button
                  onClick={handleAddAll}
                  className="text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-medium transition"
                >
                  + Añadir Todos al Radar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
              {discoveredResults.map((niche) => {
                const isAdded = addedIds.includes(niche.id);
                return (
                  <div
                    key={niche.id}
                    className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md truncate max-w-[120px]">
                          {niche.badge || niche.category}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-emerald-400">
                          RPM ~${niche.avgRpm.toFixed(1)}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                        {niche.name}
                      </h4>

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {niche.desc}
                      </p>

                      {/* Subtopic Pill */}
                      {niche.subniches?.[0] && (
                        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80 text-[10px] space-y-0.5">
                          <span className="text-slate-400 font-semibold block">Sub-nicho destacado:</span>
                          <span className="text-slate-200 font-medium block truncate">
                            {niche.subniches[0].title}
                          </span>
                        </div>
                      )}

                      {/* Hook Preview */}
                      {niche.hooks?.[0] && (
                        <div className="text-[10px] text-slate-400 italic bg-slate-900/40 p-2 rounded-lg border border-slate-900">
                          <strong className="text-amber-400 font-semibold not-italic">Hook 0-15s: </strong>
                          "{niche.hooks[0]}"
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-slate-900 flex flex-col gap-1.5 text-[11px]">
                      <button
                        onClick={() => handleAddSingle(niche)}
                        className={`w-full py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>¡Añadido al Radar!</span>
                          </>
                        ) : (
                          <>
                            <Layers className="w-3.5 h-3.5" />
                            <span>+ Añadir al Radar Activo</span>
                          </>
                        )}
                      </button>

                      <div className="grid grid-cols-2 gap-1.5">
                        {onLoadNicheIntoCalculator && (
                          <button
                            onClick={() => {
                              onLoadNicheIntoCalculator(niche);
                              onClose();
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-slate-300 py-1 px-2 rounded-lg border border-slate-800 text-[10px] flex items-center justify-center gap-1"
                          >
                            <TrendingUp className="w-3 h-3 text-rose-400" />
                            <span>Simular 360°</span>
                          </button>
                        )}

                        {onNavigateToScriptStudio && (
                          <button
                            onClick={() => {
                              onNavigateToScriptStudio(niche, niche.hooks?.[0], niche.name);
                              onClose();
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-slate-300 py-1 px-2 rounded-lg border border-slate-800 text-[10px] flex items-center justify-center gap-1"
                          >
                            <Bot className="w-3 h-3 text-indigo-400" />
                            <span>Guión IA</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
