import React, { useState } from 'react';
import { Niche } from '../types/niche';
import { 
  X, 
  Copy, 
  Check, 
  FileCode, 
  Terminal, 
  Image as ImageIcon, 
  Sparkles, 
  ListOrdered, 
  Sliders,
  Download
} from 'lucide-react';

interface SopModalProps {
  niche: Niche;
  isOpen: boolean;
  onClose: () => void;
}

export const SopModal: React.FC<SopModalProps> = ({ niche, isOpen, onClose }) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedThumbnail, setCopiedThumbnail] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);

  // Customizer options
  const [videoLength, setVideoLength] = useState('8-10 minutos');
  const [tone, setTone] = useState('Autoritativo y dinámico (estilo documental de alta retención)');
  const [modelTarget, setModelTarget] = useState('Claude 3.7 Sonnet / Gemini 2.5');
  const [thumbnailStyle, setThumbnailStyle] = useState('Cinematic Dark Documentary');

  if (!isOpen || !niche) return null;

  const masterPrompt = `Actúa como un guionista de élite para YouTube con enfoque en alta retención y un canal faceless de alto RPM.
Quiero que escribas el guión completo y detallado para un video de ${videoLength} sobre el nicho: "${niche.name}".
Sub-nicho de referencia: "${niche.subniches[0]?.title || niche.name}".

PARÁMETROS TÉCNICOS:
- Modelo de Optimización: ${modelTarget}
- Tono: ${tone}
- Formato: Canal Faceless (sin presentador en cámara, locución continua con B-roll dinámico)
- Regla de Oro: Cambios visuales o cortes de plano sugeridos cada 3.5 segundos.

ESTRUCTURA EXACTA DEL GUIÓN:
1. HOOK EXPLOSIVO (0 a 15 segundos):
   Usa esta premisa exacta: "${niche.hooks[0]}"
   Sin rodeos, sin saludar ("Hola amigos"), sin pedir suscripciones. Ve directo al conflicto y al dinero o riesgo en juego.

2. RE-HOOK DE VALIDACIÓN (15 a 45 segundos):
   Plantea la gran promesa del video. Muestra por qué ignorar esta información cuesta miles de dólares o tiempo valioso.

3. CUERPO DEL VIDEO (4 Puntos de Revelación con Progresión Dramática):
   - Punto 1: La Trampa Oculta o el Contexto del Problema.
   - Punto 2: Desglose de la Evidencia (documentos, balances, código o contratos).
   - Punto 3: El Método de Solución o Arbitraje Paso a Paso.
   - Punto 4: Errores Fatales que cometen los novatos al implementarlo.

4. CALL TO ACTION ORGÁNICO (Últimos 45 segundos):
   Promociona el recurso descargable gratuito (Lead Magnet / Plantilla) alojado en el primer comentario fijado para capturar el email del espectador.

DIRECTIVAS DE PRODUCCIÓN ENTRE CORCHETES:
Incluye directivas de sonido [SFX: Sub-bass hit, click de ratón, efecto swoosh] y directivas visuales [B-Roll: Pantalla terminal, recorte de prensa con zoom in 1.2x] a lo largo de todo el texto.`;

  const getThumbnailPrompt = () => {
    switch (thumbnailStyle) {
      case 'Cyber Noir Terminal':
        return `/imagine prompt: Dark cyberpunk terminal workstation with glowing holographic graphs, extreme high contrast, dramatic volumetric red and emerald lighting, mysterious atmosphere representing ${niche.name.toLowerCase()}, 8k, cinematic depth of field, rule of thirds, clean copy space for big title overlay --ar 16:9 --style raw --v 6.1`;
      case 'Financial 3D Clean':
        return `/imagine prompt: Ultra-clean 3D isometric financial illustration representing ${niche.name.toLowerCase()}, matte obsidian textures with glowing gold and neon accents, dramatic studio rim lighting, octane render, 8k resolution, plenty of negative space for text --ar 16:9 --v 6.1`;
      default:
        return `/imagine prompt: Dramatic high-contrast conceptual documentary scene representing ${niche.name.toLowerCase()}, deep shadows, cinematic rim lighting, hyper-realistic 8k textures, rule of thirds composition, clean negative space on the left side for YouTube title overlay --ar 16:9 --style raw --v 6.1`;
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(masterPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyThumbnail = () => {
    navigator.clipboard.writeText(getThumbnailPrompt());
    setCopiedThumbnail(true);
    setTimeout(() => setCopiedThumbnail(false), 2000);
  };

  const handleCopyFull = () => {
    const full = `=== SOP DE PRODUCCIÓN AUTOMATIZADA: ${niche.name.toUpperCase()} ===\n\n` +
      `RPM Objetivo: $${niche.avgRpm.toFixed(2)} USD\n` +
      `Viabilidad Faceless: ${niche.facelessScore}%\n\n` +
      `PASOS OPERATIVOS:\n${niche.sopSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
      `--- MASTER PROMPT PARA LLM ---\n${masterPrompt}\n\n` +
      `--- PROMPT PARA MINIATURA MIDJOURNEY ---\n${getThumbnailPrompt()}\n`;

    navigator.clipboard.writeText(full);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  SOP Automatizado: {niche.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  RPM ~${niche.avgRpm.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Flujo paso a paso para producir 1 video de alto rendimiento sin mostrar rostro en ~90 minutos
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

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto space-y-5 text-xs text-slate-300 pr-1 py-4">
          {/* Section 1: Standard Operating Procedure (SOP) */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <ListOrdered className="w-4 h-4" />
              Procedimiento Operativo Estándar (SOP) en 4 Pasos
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              {niche.sopSteps.map((step, idx) => (
                <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-rose-400 uppercase font-mono block">
                    Paso {idx + 1}
                  </span>
                  <p className="leading-relaxed text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Interactive Prompt Configurator */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Master Prompt para Generar Guión Completo (Claude / ChatGPT / Gemini)
              </h4>
              <button
                onClick={handleCopyPrompt}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 self-start sm:self-auto bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 transition"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? '¡Prompt Copiado!' : 'Copiar Prompt'}</span>
              </button>
            </div>

            {/* Customization options row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Duración Objetivo:</label>
                <select
                  value={videoLength}
                  onChange={(e) => setVideoLength(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                >
                  <option value="6-8 minutos">6 - 8 minutos</option>
                  <option value="8-10 minutos">8 - 10 minutos (Óptimo Mid-rolls)</option>
                  <option value="12-15 minutos">12 - 15 minutos (Deep-Dive)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Tono de Locución:</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                >
                  <option value="Autoritativo y dinámico (estilo documental de alta retención)">
                    Autoritativo & Dinámico (Documental)
                  </option>
                  <option value="Urgente, misterioso y cautivador (estilo Thriller Financiero)">
                    Urgente & Misterioso (Thriller)
                  </option>
                  <option value="Pedagógico, paso a paso y sin tecnicismos innecesarios">
                    Pedagógico & Práctico (Tutorial)
                  </option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Destino LLM:</label>
                <select
                  value={modelTarget}
                  onChange={(e) => setModelTarget(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                >
                  <option value="Claude 3.7 Sonnet / Gemini 2.5">Claude 3.7 / Gemini 2.5 Pro</option>
                  <option value="ChatGPT 4o">ChatGPT 4o</option>
                  <option value="DeepSeek R1">DeepSeek R1</option>
                </select>
              </div>
            </div>

            {/* Prompt textarea preview */}
            <div className="relative">
              <textarea
                readOnly
                value={masterPrompt}
                className="w-full h-44 bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-slate-300 resize-none focus:outline-none selection:bg-rose-500 selection:text-white"
              />
            </div>
          </div>

          {/* Section 3: Midjourney / Flux High-CTR Thumbnail Prompt */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Prompt para Miniatura de Alto CTR (Midjourney v6 / Flux)
              </h4>
              <button
                onClick={handleCopyThumbnail}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 self-start sm:self-auto bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 transition"
              >
                {copiedThumbnail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedThumbnail ? '¡Copiado!' : 'Copiar Prompt Miniatura'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[10px] text-slate-400">Estilo Visual:</span>
              {(['Cinematic Dark Documentary', 'Cyber Noir Terminal', 'Financial 3D Clean'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setThumbnailStyle(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
                    thumbnailStyle === st
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-200 select-all leading-relaxed">
              {getThumbnailPrompt()}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-2">
          {copiedFull && (
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4" /> ¡Estrategia completa copiada al portapapeles!
            </span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Cerrar
            </button>
            <button
              onClick={handleCopyFull}
              className="bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-rose-600/25 active:scale-95"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar Estrategia Completa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
