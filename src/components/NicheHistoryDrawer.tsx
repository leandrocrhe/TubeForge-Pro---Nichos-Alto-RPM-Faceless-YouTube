import React, { useState } from 'react';
import { DiscoveredNicheHistoryItem, Niche } from '../types/niche';
import { 
  History, 
  X, 
  Trash2, 
  RotateCcw, 
  Check, 
  TrendingUp, 
  Bot, 
  Clock, 
  Sparkles, 
  Search,
  AlertCircle
} from 'lucide-react';

interface NicheHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  historyItems: DiscoveredNicheHistoryItem[];
  onRestoreNiche: (niche: Niche) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onOpenDiscoverModal: () => void;
  onLoadNicheIntoCalculator?: (niche: Niche) => void;
  onNavigateToScriptStudio?: (niche: Niche, hook?: string, topic?: string) => void;
}

export const NicheHistoryDrawer: React.FC<NicheHistoryDrawerProps> = ({
  isOpen,
  onClose,
  historyItems,
  onRestoreNiche,
  onDeleteItem,
  onClearAll,
  onOpenDiscoverModal,
  onLoadNicheIntoCalculator,
  onNavigateToScriptStudio,
}) => {
  const [search, setSearch] = useState('');
  const [restoredIds, setRestoredIds] = useState<string[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const filteredItems = historyItems.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.niche.name.toLowerCase().includes(q) ||
      item.niche.category.toLowerCase().includes(q) ||
      (item.trendFocus && item.trendFocus.toLowerCase().includes(q))
    );
  });

  const handleRestore = (item: DiscoveredNicheHistoryItem) => {
    onRestoreNiche(item.niche);
    setRestoredIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setRestoredIds((prev) => prev.filter((id) => id !== item.id));
    }, 2500);
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Reciente';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 transition-opacity"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Historial de Nichos IA
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                  {historyItems.length}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Sugerencias guardadas para rescatar o depurar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {historyItems.length > 0 && (
              <>
                {confirmClear ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        onClearAll();
                        setConfirmClear(false);
                      }}
                      className="text-[10px] bg-rose-600 hover:bg-rose-500 text-white font-bold px-2 py-1 rounded-md transition"
                    >
                      ¿Confirmar?
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="text-[10px] text-slate-400 hover:text-white px-1.5 py-1"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmClear(true)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition"
                    title="Vaciar todo el historial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar & Quick CTAs */}
        <div className="p-4 border-b border-slate-800/80 space-y-3 bg-slate-900/30">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar en historial por nombre o tendencia..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400">
              {filteredItems.length} nicho{filteredItems.length === 1 ? '' : 's'} disponible{filteredItems.length === 1 ? '' : 's'}
            </span>

            <button
              onClick={() => {
                onClose();
                onOpenDiscoverModal();
              }}
              className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition"
            >
              <Sparkles className="w-3 h-3" />
              <span>+ Descubrir más</span>
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-500">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-300">
                  {search ? 'Sin coincidencias' : 'Historial vacío'}
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  {search
                    ? 'Prueba con otra palabra clave o limpia el filtro.'
                    : 'Usa el botón "Descubrir Nuevos Nichos" para escanear tendencias con Gemini. Todos los hallazgos se guardarán aquí automáticamente.'}
                </p>
              </div>
              {!search && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenDiscoverModal();
                  }}
                  className="bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Descubrir Ahora</span>
                </button>
              )}
            </div>
          ) : (
            filteredItems.map((item) => {
              const isRestored = restoredIds.includes(item.id);
              const { niche } = item;

              return (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5 hover:border-slate-700 transition shadow-sm"
                >
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {formatDate(item.discoveredAt)}
                    </span>
                    <span className="text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full font-medium truncate max-w-[170px]">
                      {item.trendFocus || 'Tendencia General'}
                    </span>
                  </div>

                  {/* Title & RPM */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold text-rose-400 uppercase">
                        {niche.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        RPM ~${niche.avgRpm.toFixed(1)}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      {niche.name}
                    </h4>
                  </div>

                  {/* Snippet */}
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {niche.desc}
                  </p>

                  {/* Action Bar */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => handleRestore(item)}
                      className={`flex-1 py-1.5 px-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition ${
                        isRestored
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                      }`}
                    >
                      {isRestored ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>¡En el Radar!</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="w-3 h-3" />
                          <span>Restaurar al Radar</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      {onLoadNicheIntoCalculator && (
                        <button
                          onClick={() => {
                            onLoadNicheIntoCalculator(niche);
                            onClose();
                          }}
                          className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800"
                          title="Simular en Calculadora 360°"
                        >
                          <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                        </button>
                      )}

                      {onNavigateToScriptStudio && (
                        <button
                          onClick={() => {
                            onNavigateToScriptStudio(niche, niche.hooks?.[0], niche.name);
                            onClose();
                          }}
                          className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800"
                          title="Redactar Guión con IA"
                        >
                          <Bot className="w-3.5 h-3.5 text-indigo-400" />
                        </button>
                      )}

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                        title="Eliminar del historial"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
