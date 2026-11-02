import React from 'react';
import { Niche } from '../types/niche';
import { Scale, Trash2, Plus, Download, Sparkles, Award } from 'lucide-react';

interface ComparatorTabProps {
  comparisonList: string[];
  niches: Niche[];
  removeFromCompare: (id: string) => void;
  clearComparison: () => void;
  addToCompare: (id: string) => void;
  openSopModal: (niche: Niche) => void;
  loadNicheIntoCalculator: (niche: Niche) => void;
}

export const ComparatorTab: React.FC<ComparatorTabProps> = ({
  comparisonList,
  niches,
  removeFromCompare,
  clearComparison,
  addToCompare,
  openSopModal,
  loadNicheIntoCalculator,
}) => {
  const selectedNiches = comparisonList
    .map((id) => niches.find((n) => n.id === id))
    .filter(Boolean) as Niche[];

  const unselectedNiches = niches.filter((n) => !comparisonList.includes(n.id));

  // Determine winners
  const highestRpmNiche = selectedNiches.length > 1
    ? [...selectedNiches].sort((a, b) => b.avgRpm - a.avgRpm)[0]
    : null;

  const highestFacelessNiche = selectedNiches.length > 1
    ? [...selectedNiches].sort((a, b) => b.facelessScore - a.facelessScore)[0]
    : null;

  const fastestProductionNiche = selectedNiches.length > 1
    ? [...selectedNiches].sort((a, b) => a.productionHours - b.productionHours)[0]
    : null;

  const exportComparison = () => {
    if (selectedNiches.length === 0) return;
    let md = `# TubeForge Pro - Comparativa Cara a Cara\n\n`;
    md += `Generado el: ${new Date().toLocaleDateString()}\n\n`;
    md += `| Métrica | ${selectedNiches.map(n => n.name).join(' | ')} |\n`;
    md += `| --- | ${selectedNiches.map(() => '---').join(' | ')} |\n`;
    md += `| Categoría | ${selectedNiches.map(n => n.category).join(' | ')} |\n`;
    md += `| RPM Promedio | ${selectedNiches.map(n => `$${n.avgRpm.toFixed(2)} USD`).join(' | ')} |\n`;
    md += `| Rango CPM | ${selectedNiches.map(n => n.cpm).join(' | ')} |\n`;
    md += `| Oportunidad | ${selectedNiches.map(n => `${n.opportunityScore}/100`).join(' | ')} |\n`;
    md += `| Competencia | ${selectedNiches.map(n => n.competition).join(' | ')} |\n`;
    md += `| Faceless Score | ${selectedNiches.map(n => `${n.facelessScore}%`).join(' | ')} |\n`;
    md += `| Horas / Video | ${selectedNiches.map(n => `${n.productionHours}h`).join(' | ')} |\n`;
    md += `| Tráfico | ${selectedNiches.map(n => n.searchVsBrowse).join(' | ')} |\n`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tubeforge_comparativa_${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        {/* Header with Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-rose-500" />
              Comparativa Estratégica Cara a Cara
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Evalúa el retorno sobre inversión de tiempo y viabilidad faceless antes de crear el primer video.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedNiches.length > 0 && (
              <>
                <button
                  onClick={exportComparison}
                  className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-2 rounded-xl border border-slate-800 transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Exportar Markdown</span>
                </button>
                <button
                  onClick={clearComparison}
                  className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3 py-2 rounded-xl border border-rose-500/30 transition flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpiar ({selectedNiches.length})</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Empty State */}
        {selectedNiches.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 mx-auto flex items-center justify-center text-rose-400 shadow-inner">
              <Scale className="w-7 h-7 text-slate-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">No has seleccionado nichos para comparar</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Agrega hasta 4 nichos haciendo clic en <strong className="text-rose-400">[+ Comparar]</strong> en el Explorador o selecciona uno de los sugeridos a continuación:
              </p>
            </div>

            {/* Quick add suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {niches.slice(0, 4).map((n) => (
                <button
                  key={n.id}
                  onClick={() => addToCompare(n.id)}
                  className="text-xs bg-slate-950 border border-slate-800 hover:border-rose-500/50 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white transition flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-rose-400" />
                  <span>{n.name.split(',')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick Winner Highlights if 2+ selected */}
            {selectedNiches.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {highestRpmNiche && (
                  <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/30 p-3 rounded-xl flex items-center gap-3">
                    <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                        Líder en Monetización / RPM
                      </span>
                      <span className="text-xs font-bold text-white">
                        {highestRpmNiche.name.split(',')[0]} (${highestRpmNiche.avgRpm.toFixed(2)})
                      </span>
                    </div>
                  </div>
                )}

                {highestFacelessNiche && (
                  <div className="bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/30 p-3 rounded-xl flex items-center gap-3">
                    <Award className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                        Más Fácil de Automatizar
                      </span>
                      <span className="text-xs font-bold text-white">
                        {highestFacelessNiche.name.split(',')[0]} ({highestFacelessNiche.facelessScore}%)
                      </span>
                    </div>
                  </div>
                )}

                {fastestProductionNiche && (
                  <div className="bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/30 p-3 rounded-xl flex items-center gap-3">
                    <Award className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">
                        Menor Tiempo de Producción
                      </span>
                      <span className="text-xs font-bold text-white">
                        {fastestProductionNiche.name.split(',')[0]} (~{fastestProductionNiche.productionHours}h)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                    <th className="p-3.5 font-semibold min-w-[160px] sticky left-0 bg-slate-950 z-10">
                      Métrica Estratégica
                    </th>
                    {selectedNiches.map((niche) => (
                      <th key={niche.id} className="p-3.5 font-bold text-white text-center min-w-[200px]">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="text-xs font-extrabold text-white text-center leading-tight">
                            {niche.name}
                          </span>
                          <button
                            onClick={() => removeFromCompare(niche.id)}
                            className="text-[10px] text-slate-500 hover:text-rose-400 transition flex items-center gap-1 mt-1"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                            <span>Quitar</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      Categoría
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          {n.category}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-800/30 bg-slate-900/40">
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      RPM Estimado ($ / 1k views)
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-emerald-400 font-extrabold font-mono text-sm">
                            ${n.avgRpm.toFixed(2)} USD
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            (${n.rpmMin} - ${n.rpmMax})
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      Rango CPM YouTube
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center font-mono text-slate-200">
                        {n.cpm}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-800/30 bg-slate-900/40">
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      Índice de Oportunidad
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center">
                        <div className="w-24 mx-auto space-y-1">
                          <span className="font-bold text-white font-mono">{n.opportunityScore}/100</span>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-400 h-full rounded-full"
                              style={{ width: `${n.opportunityScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      Nivel de Competencia
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                            n.competition === 'Baja'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : n.competition === 'Media'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}
                        >
                          {n.competition}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-800/30 bg-slate-900/40">
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      Viabilidad 100% Faceless
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center">
                        <div className="w-24 mx-auto space-y-1">
                          <span className="font-bold text-indigo-400 font-mono">{n.facelessScore}%</span>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-indigo-500 h-full rounded-full"
                              style={{ width: `${n.facelessScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      Tiempo de Producción
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center text-slate-200 font-medium">
                        ~{n.productionHours} horas / video
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-800/30 bg-slate-900/40">
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      Algoritmo Predominante
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center text-xs text-slate-300">
                        {n.searchVsBrowse}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      Canal de Monetización Fuerte
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center text-[11px] text-slate-300 leading-snug">
                        {n.subniches[0]?.monetization || 'AdSense + Afiliados'}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-800/30 bg-slate-900/40">
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      Stack Tecnológico Recomendado
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {n.subniches[0]?.techStack.map((tool, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-slate-400"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Actions Row */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/50 sticky left-0">
                      Acciones Rápidas
                    </td>
                    {selectedNiches.map((n) => (
                      <td key={n.id} className="p-3 text-center">
                        <div className="flex flex-col gap-1.5 max-w-[160px] mx-auto">
                          <button
                            onClick={() => loadNicheIntoCalculator(n)}
                            className="w-full text-[11px] bg-slate-800 hover:bg-slate-700 text-white font-medium py-1.5 px-2 rounded-lg transition"
                          >
                            Calcular 360°
                          </button>
                          <button
                            onClick={() => openSopModal(n)}
                            className="w-full text-[11px] bg-rose-600 hover:bg-rose-500 text-white font-semibold py-1.5 px-2 rounded-lg transition shadow-sm"
                          >
                            Ver SOP & Prompts
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Add more niches if under limit */}
            {selectedNiches.length < 4 && unselectedNiches.length > 0 && (
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-400">
                  Puedes agregar hasta <strong className="text-white">{4 - selectedNiches.length} nichos más</strong> a la comparativa:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {unselectedNiches.slice(0, 3).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => addToCompare(n.id)}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 transition"
                    >
                      <Plus className="w-3 h-3 text-rose-400" />
                      <span>{n.name.split(',')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
