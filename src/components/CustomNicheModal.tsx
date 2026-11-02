import React, { useState } from 'react';
import { Niche, Category } from '../types/niche';
import { X, Sparkles, Plus, AlertCircle, CheckCircle2, TrendingUp, Bot, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomNicheModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCustomNiche: (niche: Niche) => void;
}

export const CustomNicheModal: React.FC<CustomNicheModalProps> = ({
  isOpen,
  onClose,
  onSaveCustomNiche,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Tecnología');
  const [sponsorType, setSponsorType] = useState<'high' | 'med' | 'low'>('high');
  const [facelessType, setFacelessType] = useState<'easy' | 'hybrid' | 'hard'>('easy');
  const [audienceType, setAudienceType] = useState<'b2b' | 'affluent' | 'general'>('b2b');
  const [shelfLife, setShelfLife] = useState<'evergreen' | 'hybrid' | 'trend'>('evergreen');

  const [hasCalculated, setHasCalculated] = useState(false);

  if (!isOpen) return null;

  // Compute calculated metrics
  let score = 4.5;
  let estimatedRpmMin = 5;
  let estimatedRpmMax = 12;

  // Advertisers impact
  if (sponsorType === 'high') {
    score += 3.2;
    estimatedRpmMin += 14;
    estimatedRpmMax += 28;
  } else if (sponsorType === 'med') {
    score += 1.8;
    estimatedRpmMin += 6;
    estimatedRpmMax += 14;
  } else {
    score += 0.5;
    estimatedRpmMin += 1;
    estimatedRpmMax += 4;
  }

  // Faceless feasibility impact
  let facelessScore = 95;
  if (facelessType === 'easy') {
    score += 1.3;
    facelessScore = 96;
  } else if (facelessType === 'hybrid') {
    score += 0.8;
    facelessScore = 88;
  } else {
    score -= 0.5;
    facelessScore = 65;
  }

  // Audience buying power
  if (audienceType === 'b2b') {
    score += 0.8;
    estimatedRpmMin += 3;
    estimatedRpmMax += 6;
  } else if (audienceType === 'affluent') {
    score += 0.5;
    estimatedRpmMin += 2;
    estimatedRpmMax += 4;
  }

  // Evergreen impact
  if (shelfLife === 'evergreen') {
    score += 0.4;
  } else if (shelfLife === 'trend') {
    score -= 0.3;
  }

  const finalScore = Math.min(9.8, Math.max(3.0, score));
  const avgRpm = Number(((estimatedRpmMin + estimatedRpmMax) / 2).toFixed(2));
  const opportunityScore = Math.round(finalScore * 10);

  let verdictTitle = '';
  let verdictDesc = '';
  let verdictColor = '';

  if (finalScore >= 8.5) {
    verdictTitle = '¡Nicho de Alto Rendimiento Confirmado!';
    verdictDesc = 'Excelente potencial. Cuenta con anunciantes de alto ticket (SaaS B2B, bancos, firmas legales o inversiones) y una audiencia de alta conversión para ofertas directas.';
    verdictColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  } else if (finalScore >= 7.0) {
    verdictTitle = 'Nicho Viable con Buena Proyección';
    verdictDesc = 'Es un nicho rentable, pero requerirá un embudo de afiliados o productos digitales propios para no depender exclusivamente de YouTube AdSense.';
    verdictColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  } else {
    verdictTitle = 'Atención: Nicho de Bajo CPM';
    verdictDesc = 'Advertencia: los anunciantes pagan poco por mil impresiones. Necesitarás millones de reproducciones o cambiar el ángulo hacia una sub-audiencia profesional.';
    verdictColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  }

  const handleEvaluate = () => {
    if (!name.trim()) return;
    setHasCalculated(true);
    if (finalScore >= 8.0) {
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } catch {
        // silent
      }
    }
  };

  const handleSaveToRadar = () => {
    if (!name.trim()) return;

    const newNiche: Niche = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      category: category,
      badge: finalScore >= 8.5 ? 'Idea Validada' : 'Nicho Propio',
      icon: category === 'Finanzas' ? 'CreditCard' : category === 'Legal' ? 'Scale' : 'Bot',
      cpm: `$${estimatedRpmMin + 8} - $${estimatedRpmMax + 15}`,
      rpmMin: estimatedRpmMin,
      rpmMax: estimatedRpmMax,
      avgRpm: avgRpm,
      opportunityScore: opportunityScore,
      competition: 'Media',
      facelessScore: facelessScore,
      productionHours: facelessType === 'easy' ? 2.0 : 2.8,
      searchVsBrowse: shelfLife === 'evergreen' ? '65% Búsqueda / 35% Sugeridos' : '80% Sugeridos / 20% Búsqueda',
      desc: `Idea personalizada en ${category}. Evaluada con índice de oportunidad de ${finalScore.toFixed(1)}/10 y RPM estimado de $${avgRpm.toFixed(2)} USD.`,
      subniches: [
        {
          title: `${name.trim()} - Ángulo Central de Rentabilidad`,
          cpmScore: finalScore >= 8.5 ? 'Muy Alto' : 'Medio-Alto',
          angles: 'Cómo optimizar procesos y resolver un dolor recurrente en este nicho.',
          formats: facelessType === 'easy' ? 'Metraje B-Roll de archivo + Gráficos' : 'Tutorial con captura de pantalla y voz IA',
          monetization: sponsorType === 'high' ? 'AdSense alto + Afiliados B2B + Patrocinios' : 'AdSense + Afiliados',
          techStack: ['Screen Studio / CapCut', 'ElevenLabs', 'Canva / Midjourney']
        }
      ],
      hooks: [
        `Si estás trabajando en ${name.trim()}, hay una oportunidad oculta que el 90% ignora.`,
        `El mayor error que cometen en ${name.trim()} y cómo solucionarlo en 3 pasos.`,
        `Cómo pasar de principiante a resultados tangibles en ${name.trim()} este año.`
      ],
      sopSteps: [
        'Investigación: Analiza los 5 videos más vistos del tema en YouTube en los últimos 6 meses.',
        'Guión: Estructura de alta retención: 0-15s (el beneficio concreto), 15s-2m (el problema), 2m-6m (la solución), 6m-8m (CTA).',
        'Visuales: B-roll dinámico, subtítulos grandes de alto contraste y zooms cada 4 segundos.',
        'Monetización: Enlace de afiliado o recurso descargable en el comentario fijado.'
      ],
      isCustom: true,
    };

    onSaveCustomNiche(newNiche);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Calificador de Nicho Propio
              </h3>
              <p className="text-[11px] text-slate-400">
                Audita cualquier idea antes de invertir horas produciendo videos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-950 border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto space-y-4 py-3 text-xs pr-1">
          {/* Niche Name */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Nombre o Tema de tu Idea:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setHasCalculated(false);
              }}
              placeholder="Ej: Automatización de Nóminas con IA, Bienes Raíces Fraccionados..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Categoría General:</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value as Category);
                  setHasCalculated(false);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-rose-500"
              >
                <option value="Tecnología">Tecnología & IA</option>
                <option value="Finanzas">Finanzas & Inversión</option>
                <option value="Legal">Legal & Reclamaciones</option>
                <option value="Negocios">Negocios & E-Commerce</option>
                <option value="Salud">Salud & Longevidad</option>
                <option value="Estilo de Vida">Estilo de Vida & Narrativa</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Público / Audiencia:</label>
              <select
                value={audienceType}
                onChange={(e) => {
                  setAudienceType(e.target.value as any);
                  setHasCalculated(false);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-rose-500"
              >
                <option value="b2b">Profesionales & Dueños de Negocio (B2B)</option>
                <option value="affluent">Inversores / Adultos con Capital</option>
                <option value="general">Público General / Jóvenes</option>
              </select>
            </div>
          </div>

          {/* Sponsor Types */}
          <div>
            <label className="text-slate-400 block mb-1">¿Qué marcas anuncian en este sector?</label>
            <select
              value={sponsorType}
              onChange={(e) => {
                setSponsorType(e.target.value as any);
                setHasCalculated(false);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-rose-500"
            >
              <option value="high">
                Bancos, SaaS B2B, Inmobiliarias, Abogados, Brókers (RPM $18 - $45+)
              </option>
              <option value="med">
                Software de consumo, Suplementos, Cursos, Hardware (RPM $7 - $16)
              </option>
              <option value="low">
                Videojuegos, Entretenimiento masivo, Curiosidades (RPM $1.5 - $5)
              </option>
            </select>
          </div>

          {/* Faceless Feasibility */}
          <div>
            <label className="text-slate-400 block mb-1">¿Se puede crear 100% sin mostrar rostro?</label>
            <select
              value={facelessType}
              onChange={(e) => {
                setFacelessType(e.target.value as any);
                setHasCalculated(false);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-rose-500"
            >
              <option value="easy">
                Sí, 100% con metraje de archivo, capturas y voz IA ultra-realista
              </option>
              <option value="hybrid">
                Híbrido (pantalla propia grabada o tutoriales sin cámara)
              </option>
              <option value="hard">
                Difícil (requiere presencia física o vlogs en persona)
              </option>
            </select>
          </div>

          {/* Content Shelf-Life */}
          <div>
            <label className="text-slate-400 block mb-1">Vida útil del contenido:</label>
            <select
              value={shelfLife}
              onChange={(e) => {
                setShelfLife(e.target.value as any);
                setHasCalculated(false);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-rose-500"
            >
              <option value="evergreen">Evergreen (Visto por años mediante búsquedas)</option>
              <option value="hybrid">Híbrido (Tendencias recurrentes)</option>
              <option value="trend">Noticioso / Viral efímero (caduca en 1 semana)</option>
            </select>
          </div>

          {/* Results Block */}
          {hasCalculated && (
            <div className={`p-4 rounded-xl border space-y-3 ${verdictColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-80 block">
                    Veredicto Estratégico
                  </span>
                  <h4 className="text-sm font-extrabold text-white mt-0.5">{verdictTitle}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] opacity-80 uppercase block">Puntuación</span>
                  <span className="text-xl font-black font-mono">{finalScore.toFixed(1)} / 10</span>
                </div>
              </div>

              <p className="text-[11px] leading-relaxed opacity-90">{verdictDesc}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 text-center">
                <div className="bg-slate-950/60 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">RPM Estimado</span>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    ${estimatedRpmMin} - ${estimatedRpmMax} USD
                  </span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Viabilidad Faceless</span>
                  <span className="text-xs font-bold font-mono text-indigo-400">{facelessScore}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-3.5 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancelar
          </button>
          {!hasCalculated ? (
            <button
              onClick={handleEvaluate}
              disabled={!name.trim()}
              className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-rose-600/20"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Calcular Potencial</span>
            </button>
          ) : (
            <button
              onClick={handleSaveToRadar}
              className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Guardar en Mi Radar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
