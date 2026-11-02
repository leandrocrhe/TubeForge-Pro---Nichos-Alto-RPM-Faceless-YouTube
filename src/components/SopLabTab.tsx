import React, { useState } from 'react';
import { Niche } from '../types/niche';
import { 
  FileCode, 
  Terminal, 
  Image as ImageIcon, 
  Check, 
  Copy, 
  Sparkles, 
  Layers, 
  Mic, 
  Film, 
  Volume2, 
  TrendingUp,
  Cpu
} from 'lucide-react';

interface SopLabTabProps {
  niches: Niche[];
  currentNiche: Niche;
  onSelectNiche: (niche: Niche) => void;
}

export const SopLabTab: React.FC<SopLabTabProps> = ({
  niches,
  currentNiche,
  onSelectNiche,
}) => {
  const [videoLength, setVideoLength] = useState('8-10 minutos');
  const [tone, setTone] = useState('Autoritativo y dinámico (estilo documental de alta retención)');
  const [modelTarget, setModelTarget] = useState('Claude 3.7 / Gemini 2.5');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedThumb, setCopiedThumb] = useState(false);

  const masterPrompt = `Actúa como un guionista de élite para YouTube con enfoque en alta retención y un canal faceless de alto RPM.
Quiero que escribas el guión completo y detallado para un video de ${videoLength} sobre el nicho: "${currentNiche.name}".
Sub-nicho de referencia: "${currentNiche.subniches[0]?.title || currentNiche.name}".

PARÁMETROS TÉCNICOS:
- Modelo de Optimización: ${modelTarget}
- Tono: ${tone}
- Formato: Canal Faceless (sin presentador en cámara, locución continua con B-roll dinámico)
- Regla de Oro: Cambios visuales o cortes de plano sugeridos cada 3.5 segundos.

ESTRUCTURA EXACTA DEL GUIÓN:
1. HOOK EXPLOSIVO (0 a 15 segundos):
   Usa esta premisa exacta: "${currentNiche.hooks[0]}"
   Sin rodeos, sin saludar ("Hola amigos"), sin pedir suscripciones. Ve directo al conflicto y al dinero o riesgo en juego.

2. RE-HOOK DE VALIDACIÓN (15 a 45 segundos):
   Plantea la gran promesa del video. Muestra por qué ignorar esta información cuesta miles de dólares o tiempo valioso.

3. CUERPO DEL VIDEO (4 Puntos de Revelación con Progresión Dramática):
   - Punto 1: La Trampa Oculta o el Contexto del Problema.
   - Punto 2: Desglose de la Evidencia (documentos, balances, código o contratos).
   - Punto 3: El Método de Solución o Arbitraje Paso a Paso.
   - Punto 4: Errores Fatales que cometen los novatos al implementarlo.

4. CALL TO ACTION ORGÁNICO (Últimos 45 segundos):
   Promociona el recurso descargable gratuito alojado en el primer comentario fijado para capturar el email del espectador.

DIRECTIVAS DE PRODUCCIÓN ENTRE CORCHETES:
Incluye directivas de sonido [SFX: Sub-bass hit, click de ratón, efecto swoosh] y directivas visuales [B-Roll: Pantalla terminal, recorte de prensa con zoom in 1.2x].`;

  const thumbPrompt = `/imagine prompt: Dramatic high-contrast conceptual scene representing ${currentNiche.name.toLowerCase()}, deep shadows, cinematic rim lighting, glowing holographic accents, hyper-realistic 8k, rule of thirds composition, clean negative space for YouTube title overlay --ar 16:9 --style raw --v 6.1`;

  const copyText = (txt: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(txt);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const workflowSteps = [
    {
      step: '01',
      title: 'Validación de Demanda & Búsqueda',
      desc: 'Analiza si el tema tiene volumen constante o pico de tendencia en Google Trends y YouTube Search.',
      icon: TrendingUp,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      step: '02',
      title: 'Escaleta de Retención & Guión IA',
      desc: 'Aplica el Master Prompt. Asegúrate de que el hook no tenga introducciones vacías y marque un ritmo rápido.',
      icon: Terminal,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      step: '03',
      title: 'Voz Sintética Ultra-Realista',
      desc: 'Genera el audio en ElevenLabs usando modelos como Adam, George o Marcus con estabilidad en 55% y claridad en 85%.',
      icon: Mic,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      step: '04',
      title: 'B-Roll & Animaciones Dinámicas',
      desc: 'Combina Screen Studio para capturas de software con metraje de archivo 4K (Envato/Pexels) y zooms cada 3.5s.',
      icon: Film,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      step: '05',
      title: 'Diseño Sonoro & Retención Auditiva',
      desc: 'Inserta sub-bass hits en los puntos clave, risers de tensión antes de cada revelación y música lofi/thriller sutil.',
      icon: Volume2,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      step: '06',
      title: 'Miniatura de Alto CTR & SEO',
      desc: 'Genera el fondo en Midjourney v6/Flux, añade un título corto de 3 palabras en negrita y publica con tags transaccionales.',
      icon: ImageIcon,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
        {/* Header & Niche Picker */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <FileCode className="w-5 h-5" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Sistema Operativo de Producción Faceless (SOP)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Protocolo estándar para producir y publicar un video de 8-10 minutos en 90 minutos netos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400">Nicho:</label>
            <select
              value={currentNiche.id}
              onChange={(e) => {
                const found = niches.find((n) => n.id === e.target.value);
                if (found) onSelectNiche(found);
              }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-rose-500 cursor-pointer"
            >
              {niches.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 6-Step Workflow Pipeline */}
        <div>
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-rose-500" />
            Flujo de Producción Rápida de 90 Minutos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {workflowSteps.map((ws, i) => {
              const IconComp = ws.icon;
              return (
                <div
                  key={i}
                  className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      PASO {ws.step}
                    </span>
                    <span className={`p-1.5 rounded-lg border ${ws.color}`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{ws.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{ws.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Master Prompt Generator */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Master Prompt Configurable para Guión Completo
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Pega este prompt en Claude 3.7 o ChatGPT para obtener el guión con marcas de tiempo y notas de B-Roll.
              </p>
            </div>
            <button
              onClick={() => copyText(masterPrompt, setCopiedPrompt)}
              className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-rose-600/20"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? '¡Prompt Copiado!' : 'Copiar Master Prompt'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Duración:</label>
              <select
                value={videoLength}
                onChange={(e) => setVideoLength(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
              >
                <option value="6-8 minutos">6 a 8 minutos</option>
                <option value="8-10 minutos">8 a 10 minutos (Recomendado)</option>
                <option value="12-15 minutos">12 a 15 minutos</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Tono:</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
              >
                <option value="Autoritativo y dinámico (estilo documental de alta retención)">
                  Documental Autoritativo
                </option>
                <option value="Urgente, misterioso y cautivador (estilo Thriller Financiero)">
                  Misterioso & Thriller
                </option>
                <option value="Pedagógico, paso a paso y sin rodeos">Tutorial Técnico Directo</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">LLM Optimizado:</label>
              <select
                value={modelTarget}
                onChange={(e) => setModelTarget(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
              >
                <option value="Claude 3.7 / Gemini 2.5">Claude 3.7 / Gemini 2.5 Pro</option>
                <option value="ChatGPT 4o">ChatGPT 4o</option>
                <option value="DeepSeek R1">DeepSeek R1</option>
              </select>
            </div>
          </div>

          <textarea
            readOnly
            value={masterPrompt}
            className="w-full h-44 bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-slate-300 resize-none focus:outline-none"
          />
        </div>

        {/* Midjourney Thumbnail Prompt */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Prompt para Miniatura de Alto CTR (Midjourney v6.1 / Flux)
            </h3>
            <button
              onClick={() => copyText(thumbPrompt, setCopiedThumb)}
              className="text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1"
            >
              {copiedThumb ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedThumb ? '¡Copiado!' : 'Copiar Prompt'}</span>
            </button>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 select-all leading-relaxed">
            {thumbPrompt}
          </div>
        </div>
      </div>
    </div>
  );
};
