import React, { useState } from 'react';
import { Niche, VideoProject } from '../types/niche';
import { 
  Zap, 
  Copy, 
  Check, 
  RefreshCw, 
  Sparkles, 
  MessageSquare, 
  Eye, 
  Bot, 
  Layers, 
  Send 
} from 'lucide-react';

interface HookLabTabProps {
  niches: Niche[];
  currentNiche: Niche;
  onSelectNiche: (niche: Niche) => void;
  onNavigateToScriptStudio?: (niche: Niche, hook: string, title?: string) => void;
  onAddToPipeline?: (project: VideoProject) => void;
  onOpenFeedPreview?: (title: string, niche: Niche) => void;
}

export const HookLabTab: React.FC<HookLabTabProps> = ({
  niches,
  currentNiche,
  onSelectNiche,
  onNavigateToScriptStudio,
  onAddToPipeline,
  onOpenFeedPreview,
}) => {
  const [customKeyword, setCustomKeyword] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [addedPipelineId, setAddedPipelineId] = useState<string | null>(null);

  const activeTopic = customKeyword.trim() || currentNiche?.name || 'SaaS B2B';

  const copyWithFeedback = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getFormulas = (niche: Niche, topic: string) => {
    const cleanTopic = topic.split(',')[0].trim();
    const hooksSource = niche.hooks || [];

    return [
      {
        id: 'f1',
        type: 'Curiosity Gap (La Revelación Inesperada)',
        badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
        ctrTitle: `La Verdad Oculta Sobre ${cleanTopic} que Nadie se Atreve a Decir`,
        hookScript: hooksSource[0] || `Si tienes este servicio activo o planeas invertir en ${cleanTopic}, hay un detalle legal que te costará caro si no lo corriges hoy mismo.`,
        visualCue: '[Segundo 0: Texto en pantalla con números rojos gigantes. Segundo 3: Zoom rápido a un documento o prueba gráfica con sonido swoosh grave].',
        psychology: 'Genera una brecha de información urgente que el cerebro no puede dejar sin resolver.'
      },
      {
        id: 'f2',
        type: 'Negative Bias (El Error Silencioso)',
        badgeColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
        ctrTitle: `Deja de Hacer Esto con ${cleanTopic} (Pérdida Inminente)`,
        hookScript: hooksSource[1] || `El 92% de las personas cree que esto es una buena decisión en ${cleanTopic}, pero en realidad están regalando el 30% de sus ganancias a intermediarios.`,
        visualCue: '[Segundo 0: Gráfico con flecha descendente roja. Segundo 4: Sonido sordo de advertencia (sub-bass hit) + pantalla en blanco y negro].',
        psychology: 'La aversión a la pérdida es 2.5 veces más poderosa que el deseo de ganar dinero.'
      },
      {
        id: 'f3',
        type: 'Case Study Blueprint (De 0 a Cifras Reales)',
        badgeColor: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
        ctrTitle: `De $0 a $10,000 en ${cleanTopic}: El Blueprint Paso a Paso`,
        hookScript: hooksSource[2] || `En este video vamos a desglosar exactamente cómo estructurar una operación en ${cleanTopic} desde cero, mostrando cifras reales y sin ocultar nada.`,
        visualCue: '[Segundo 1: Captura de pantalla de la cuenta bancaria o dashboard con blur suave. Segundo 5: Comienza el paso #1 de inmediato sin intro ni saludo].',
        psychology: 'Transparencia radical y prueba social instantánea que eleva la retención al 75% en el primer minuto.'
      },
      {
        id: 'f4',
        type: 'Asymmetric Advantage (Ventaja Desproporcionada)',
        badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        ctrTitle: `La Regla Oculta de ${cleanTopic} Antes de que YouTube la Sature`,
        hookScript: `Si dedicas solo 2 horas este fin de semana a configurar este activo en ${cleanTopic}, tendrás una ventaja que el 99% de tu competencia ignora por completo.`,
        visualCue: '[Segundo 2: Cronómetro en cuenta regresiva en la esquina superior derecha + voz firme sin titubeos].',
        psychology: 'FOMO (Fear of Missing Out) y promesa de retorno asimétrico por mínimo esfuerzo.'
      },
      {
        id: 'f5',
        type: 'Whistleblower (El Secreto de la Industria)',
        badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
        ctrTitle: `Lo que las Grandes Empresas de ${cleanTopic} te Ocultan en 2026`,
        hookScript: `Trabajé analizando balances y contratos en el sector de ${cleanTopic}, y esta es la única razón por la que prefieren que el público general nunca entienda cómo funciona esto.`,
        visualCue: '[Segundo 0: Clip de archivo de una reunión corporativa o servidor en penumbra con audio de estática analógica].',
        psychology: 'Posiciona al creador como el aliado del espectador frente a un sistema opaco.'
      },
      {
        id: 'f6',
        type: 'Contrarian Pattern Interrupt (Contracorriente)',
        badgeColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
        ctrTitle: `Por Qué Todo lo que Sabes Sobre ${cleanTopic} Está Mal`,
        hookScript: `Todos los gurús te dicen que hagas X en ${cleanTopic}. Yo hice exactamente lo contrario y obtuve el triple de resultados en la mitad del tiempo. Te muestro las pruebas.`,
        visualCue: '[Segundo 0: Texto tachado en rojo con una gran X y efecto de sonido de buzzer incorrecto].',
        psychology: 'Ruptura inmediata de expectativas que detiene el scroll en los primeros 2 segundos.'
      }
    ];
  };

  const formulas = getFormulas(currentNiche, activeTopic);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="max-w-3xl space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Zap className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Laboratorio de Hooks & Títulos Virales de Alta Retención
            </h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Los primeros 15 segundos y la miniatura determinan el 80% del éxito en canales de alto RPM. Selecciona un nicho de la base de datos o escribe tu tema para generar 6 ángulos calibrados con psicología de retención.
          </p>
        </div>

        {/* Input Bar */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-6">
          <div className="flex-1 flex flex-col sm:flex-row gap-3 items-center">
            <div className="w-full sm:w-72">
              <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                Elegir Nicho Base:
              </label>
              <select
                value={currentNiche?.id || ''}
                onChange={(e) => {
                  const found = niches.find((n) => n.id === e.target.value);
                  if (found) onSelectNiche(found);
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                {niches.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full flex-1">
              <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                O escribe un subtema / palabra clave específica:
              </label>
              <input
                type="text"
                value={customKeyword}
                onChange={(e) => setCustomKeyword(e.target.value)}
                placeholder="Ej: n8n automatización, tarjetas Chase, demandas Uber, REITs..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
              />
            </div>
          </div>

          {customKeyword && (
            <button
              onClick={() => setCustomKeyword('')}
              className="text-xs text-slate-400 hover:text-white px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl transition"
            >
              Limpiar palabra clave
            </button>
          )}
        </div>

        {/* Formulas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formulas.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-4.5 space-y-3.5 hover:border-slate-700 transition shadow-lg flex flex-col justify-between"
            >
              {/* Formula Badge & Psychology */}
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.type}
                  </span>
                  <button
                    onClick={() => copyWithFeedback(`${item.ctrTitle}\n\nHook (0-15s):\n"${item.hookScript}"\n\nDirección Visual:\n${item.visualCue}`, item.id)}
                    className="text-xs text-slate-400 hover:text-white p-1 rounded transition flex items-center gap-1"
                    title="Copiar fórmula completa"
                  >
                    {copiedId === item.id ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Copiado
                      </span>
                    ) : (
                      <span className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]">
                        <Copy className="w-3.5 h-3.5" /> Copiar Todo
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">{item.psychology}</p>
              </div>

              {/* Title variant */}
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-1">
                  <span>TÍTULO PARA ALTO CTR (MOBILE READY):</span>
                  <button
                    onClick={() => copyWithFeedback(item.ctrTitle, `${item.id}-title`)}
                    className="text-rose-400 hover:text-rose-300 text-[10px]"
                  >
                    {copiedId === `${item.id}-title` ? '¡Copiado!' : 'Copiar'}
                  </button>
                </div>
                <h4 className="text-xs font-bold text-white tracking-tight leading-snug">
                  {item.ctrTitle}
                </h4>
              </div>

              {/* Script Box */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-amber-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    GUIÓN HABLADO (0 - 15 SEGUNDOS):
                  </span>
                  <button
                    onClick={() => copyWithFeedback(item.hookScript, `${item.id}-script`)}
                    className="text-amber-400 hover:text-amber-300 text-[10px]"
                  >
                    {copiedId === `${item.id}-script` ? '¡Copiado!' : 'Copiar'}
                  </button>
                </div>
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  "{item.hookScript}"
                </p>
              </div>

              {/* Visual and Retention cues */}
              <div className="text-[11px] text-slate-400 flex items-start gap-1.5 pt-1 border-t border-slate-900">
                <Eye className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="text-indigo-300">Pauta de Retención Visual:</strong> {item.visualCue}
                </span>
              </div>

              {/* Action Toolbar: Redactar Guión, Añadir al Pipeline, Simular CTR */}
              <div className="pt-2 border-t border-slate-900 grid grid-cols-3 gap-1.5 text-[11px]">
                {onNavigateToScriptStudio && (
                  <button
                    onClick={() => onNavigateToScriptStudio(currentNiche, item.hookScript, item.ctrTitle)}
                    className="bg-rose-600/15 hover:bg-rose-600/25 border border-rose-500/30 text-rose-300 font-semibold py-1.5 px-2 rounded-lg transition flex items-center justify-center gap-1 active:scale-95 text-center"
                    title="Cargar hook en el estudio de guiones IA"
                  >
                    <Bot className="w-3 h-3 text-rose-400 shrink-0" />
                    <span className="truncate">Redactar IA</span>
                  </button>
                )}

                {onAddToPipeline && (
                  <button
                    onClick={() => {
                      const newProj: VideoProject = {
                        id: `proj_${Date.now()}_${item.id}`,
                        title: item.ctrTitle,
                        nicheId: currentNiche.id,
                        nicheName: currentNiche.name,
                        category: currentNiche.category,
                        stage: 'idea',
                        targetRpm: currentNiche.avgRpm,
                        targetViews: 100000,
                        estimatedHours: currentNiche.productionHours || 2.2,
                        createdAt: new Date().toISOString(),
                        notes: `Fórmula: ${item.type}\nHook: "${item.hookScript}"\nPauta: ${item.visualCue}`,
                      };
                      onAddToPipeline(newProj);
                      setAddedPipelineId(item.id);
                      setTimeout(() => setAddedPipelineId(null), 2500);
                    }}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium py-1.5 px-2 rounded-lg transition flex items-center justify-center gap-1 active:scale-95 text-center"
                    title="Añadir tarjeta a la columna de ideas en el Kanban"
                  >
                    {addedPipelineId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="text-emerald-400 font-bold truncate">¡Añadido!</span>
                      </>
                    ) : (
                      <>
                        <Layers className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span className="truncate">+ Pipeline</span>
                      </>
                    )}
                  </button>
                )}

                {onOpenFeedPreview && (
                  <button
                    onClick={() => onOpenFeedPreview(item.ctrTitle, currentNiche)}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium py-1.5 px-2 rounded-lg transition flex items-center justify-center gap-1 active:scale-95 text-center"
                    title="Auditar cómo se ve este título en el Feed de YouTube"
                  >
                    <Eye className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">Ver CTR</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
