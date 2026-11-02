import React, { useState, useEffect, useRef } from 'react';
import { Niche, VideoProject } from '../types/niche';
import { 
  Bot, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Play, 
  Pause,
  RotateCcw,
  Clock, 
  FileText, 
  Film, 
  Mic, 
  ArrowRight,
  Sliders,
  Send,
  Eye,
  RefreshCw,
  Maximize2,
  X,
  Type
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AiScriptStudioTabProps {
  niches: Niche[];
  currentNiche: Niche;
  onSelectNiche: (niche: Niche) => void;
  onAddProjectToPipeline: (project: VideoProject) => void;
  onOpenFeedPreview: (title: string, niche: Niche) => void;
  initialHook?: string;
  initialSubTopic?: string;
}

export const AiScriptStudioTab: React.FC<AiScriptStudioTabProps> = ({
  niches,
  currentNiche,
  onSelectNiche,
  onAddProjectToPipeline,
  onOpenFeedPreview,
  initialHook,
  initialSubTopic,
}) => {
  const [duration, setDuration] = useState('8-10');
  const [tone, setTone] = useState('Autoritativo y dinámico (estilo documental de alta retención)');
  const [customHook, setCustomHook] = useState(initialHook || currentNiche?.hooks[0] || '');
  const [customSubTopic, setCustomSubTopic] = useState(initialSubTopic || '');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [viewMode, setViewMode] = useState<'full' | 'spoken' | 'cues'>('full');
  const [copied, setCopied] = useState(false);
  const [addedToPipeline, setAddedToPipeline] = useState(false);

  // Teleprompter state
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // 1 = 100wpm, 2 = 135wpm, 3 = 170wpm
  const [fontSize, setFontSize] = useState<'md' | 'lg' | 'xl' | '2xl'>('xl');
  const [readingSeconds, setReadingSeconds] = useState(0);
  const teleprompterRef = useRef<HTMLDivElement>(null);

  // Sync initialHook and initialSubTopic when props update
  useEffect(() => {
    if (initialHook) setCustomHook(initialHook);
  }, [initialHook]);

  useEffect(() => {
    if (initialSubTopic) setCustomSubTopic(initialSubTopic);
  }, [initialSubTopic]);

  // Sync default hook when currentNiche changes if not set
  useEffect(() => {
    if (currentNiche && !customHook) {
      setCustomHook(currentNiche.hooks[0] || '');
    }
  }, [currentNiche]);

  // Teleprompter auto-scroll engine
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const scrollStep = (currentTime: number) => {
      if (isAutoScrolling && teleprompterRef.current) {
        const delta = (currentTime - lastTime) / 1000;
        // Speeds: 1: ~35px/s, 2: ~55px/s, 3: ~85px/s
        const pxPerSec = scrollSpeed === 1 ? 35 : scrollSpeed === 2 ? 55 : 85;
        teleprompterRef.current.scrollTop += pxPerSec * delta;
      }
      lastTime = currentTime;
      if (isAutoScrolling) {
        animationFrameId = requestAnimationFrame(scrollStep);
      }
    };

    if (isAutoScrolling) {
      animationFrameId = requestAnimationFrame(scrollStep);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoScrolling, scrollSpeed]);

  // Teleprompter elapsed timer
  useEffect(() => {
    let interval: any;
    if (isTeleprompterOpen && isAutoScrolling) {
      interval = setInterval(() => {
        setReadingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTeleprompterOpen, isAutoScrolling]);

  const handleGenerateScript = async () => {
    setIsGenerating(true);
    setAddedToPipeline(false);

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nicheName: currentNiche?.name || 'Automatización con IA',
          subNiche: customSubTopic || currentNiche?.subniches[0]?.title || '',
          duration: `${duration} minutos`,
          tone,
          hookPremise: customHook,
        }),
      });

      const data = await response.json();
      if (data.success && data.script) {
        setGeneratedScript(data.script);
        try {
          confetti({
            particleCount: 35,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#f43f5e', '#6366f1', '#10b981'],
          });
        } catch {}
      } else {
        alert(data.error || 'No se pudo generar el guión.');
      }
    } catch (err: any) {
      console.error(err);
      alert('Error de conexión al generar el guión. Inténtalo de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Teleprompter / Pacing Stats
  const wordCount = generatedScript ? generatedScript.trim().split(/\s+/).length : 0;
  // Standard YouTube talking speed ~ 140 words per minute
  const estimatedReadingMinutes = wordCount > 0 ? (wordCount / 140).toFixed(1) : '0';

  // Extract clean title from script
  const extractTitle = () => {
    if (!generatedScript) return `${currentNiche.name.split(',')[0]} - Blueprint`;
    const firstLine = generatedScript.split('\n')[0].replace(/^#\s*/, '').trim();
    return firstLine || `${currentNiche.name.split(',')[0]} - Análisis`;
  };

  // Filter script content based on view mode
  const getDisplayContent = () => {
    if (!generatedScript) return '';
    if (viewMode === 'full') return generatedScript;

    if (viewMode === 'spoken') {
      // Remove [B-ROLL: ...] and [SFX: ...] stage directions
      return generatedScript
        .replace(/\[B-ROLL:.*?\]/gi, '')
        .replace(/\[SFX:.*?\]/gi, '')
        .replace(/\*\*Voz en Off:\*\*/g, '')
        .replace(/\n{3,}/g, '\n\n');
    }

    if (viewMode === 'cues') {
      // Extract only lines containing directions or sections
      const lines = generatedScript.split('\n');
      return lines
        .filter((l) => l.startsWith('#') || l.includes('[B-ROLL') || l.includes('[SFX') || l.startsWith('---'))
        .join('\n');
    }

    return generatedScript;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getDisplayContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const title = extractTitle().replace(/[^a-zA-Z0-9]/g, '_');
    const blob = new Blob([generatedScript], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}_guion.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendToKanban = () => {
    const title = extractTitle();
    const newProject: VideoProject = {
      id: `proj_${Date.now()}`,
      title,
      nicheId: currentNiche.id,
      nicheName: currentNiche.name,
      category: currentNiche.category,
      stage: 'script',
      targetRpm: currentNiche.avgRpm,
      targetViews: 100000,
      estimatedHours: currentNiche.productionHours || 2.2,
      scriptText: generatedScript,
      createdAt: new Date().toISOString(),
      notes: `Generado con IA en TubeForge Pro. Duración estimada: ~${estimatedReadingMinutes} min.`,
    };

    onAddProjectToPipeline(newProject);
    setAddedToPipeline(true);
    setTimeout(() => setAddedToPipeline(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Script Configuration & Controls (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                AI Script Studio
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Gemini 2.5
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Redacta guiones faceless completos estructurados para retener el 70%+ a los 30s
              </p>
            </div>
          </div>

          {/* Niche Selector */}
          <div>
            <label className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
              Nicho Objetivo:
            </label>
            <select
              value={currentNiche.id}
              onChange={(e) => {
                const found = niches.find((n) => n.id === e.target.value);
                if (found) {
                  onSelectNiche(found);
                  setCustomHook(found.hooks[0] || '');
                }
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              {niches.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name} (RPM ~${n.avgRpm.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {/* Subtopic or specific angle */}
          <div>
            <label className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
              Sub-tema o Enfoque Específico:
            </label>
            <input
              type="text"
              value={customSubTopic}
              onChange={(e) => setCustomSubTopic(e.target.value)}
              placeholder={currentNiche.subniches[0]?.title || 'Ej: Demandas por privacidad, n8n bots...'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Duration & Tone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Duración Objetivo:</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              >
                <option value="6-8">6 - 8 minutos</option>
                <option value="8-10">8 - 10 min (Recomendado)</option>
                <option value="12-15">12 - 15 min (Largo)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Tono de Locución:</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              >
                <option value="Autoritativo y dinámico (estilo documental de alta retención)">
                  Documental Autoritativo
                </option>
                <option value="Urgente, misterioso y cautivador (estilo Thriller Financiero)">
                  Misterioso (Thriller)
                </option>
                <option value="Pedagógico, paso a paso y práctico">Tutorial Paso a Paso</option>
              </select>
            </div>
          </div>

          {/* Hook Premise */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] text-slate-400 uppercase font-semibold">
                Premisa del Gancho (0 - 15 segundos):
              </label>
              <button
                onClick={() => {
                  const randomHook = currentNiche.hooks[Math.floor(Math.random() * currentNiche.hooks.length)];
                  setCustomHook(randomHook);
                }}
                className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Aleatorio</span>
              </button>
            </div>
            <textarea
              value={customHook}
              onChange={(e) => setCustomHook(e.target.value)}
              rows={3}
              placeholder="Escribe la primera frase impactante o selecciona un hook del radar..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 resize-none leading-relaxed"
            />
          </div>

          {/* Generate CTA Button */}
          <button
            onClick={handleGenerateScript}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:opacity-60 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition active:scale-95"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Redactando Guión con IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Generar Guión Completo con IA</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Teleprompter & Interactive Script Viewer (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col space-y-4 min-h-[580px]">
          {/* Viewer Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            {/* View Mode Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setViewMode('full')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'full' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Guión Completo
              </button>
              <button
                onClick={() => setViewMode('spoken')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                  viewMode === 'spoken' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Solo el texto que pronuncia la voz en off"
              >
                <Mic className="w-3 h-3" />
                <span>Solo Voz</span>
              </button>
              <button
                onClick={() => setViewMode('cues')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                  viewMode === 'cues' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Solo acotaciones de B-roll y sonido para el editor"
              >
                <Film className="w-3 h-3" />
                <span>Pautas B-Roll</span>
              </button>
            </div>

            {/* Pacing & Metrics Widget */}
            {generatedScript && (
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-slate-400 font-mono font-bold text-[11px]">{wordCount} palabras</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-mono font-bold text-[11px]">~{estimatedReadingMinutes} min</span>
                </div>
              </div>
            )}
          </div>

          {/* Script Content Area */}
          <div className="flex-1 bg-slate-950/80 rounded-xl border border-slate-800/80 p-4 font-sans text-xs leading-relaxed overflow-y-auto max-h-[500px] text-slate-200 space-y-3">
            {!generatedScript ? (
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-500">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-500">
                  <FileText className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-300">Ningún guión generado todavía</h4>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">
                    Selecciona los parámetros a la izquierda y presiona "Generar Guión Completo con IA" para redactar tu video de 8-10 minutos.
                  </p>
                </div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed selection:bg-rose-500 selection:text-white">
                {getDisplayContent()}
              </div>
            )}
          </div>

          {/* Viewer Actions Footer */}
          {generatedScript && (
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-800 transition flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-800 transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Descargar .MD</span>
                </button>
                <button
                  onClick={() => onOpenFeedPreview(extractTitle(), currentNiche)}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-800 transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Previsualizar Feed</span>
                </button>
                <button
                  onClick={() => {
                    setIsTeleprompterOpen(true);
                    setIsAutoScrolling(false);
                  }}
                  className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                  title="Abrir teleprompter con auto-scroll para grabar la locución"
                >
                  <Play className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Teleprompter en Vivo</span>
                </button>
              </div>

              <button
                onClick={handleSendToKanban}
                className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                {addedToPipeline ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                <span>{addedToPipeline ? '¡Añadido al Pipeline!' : 'Enviar a Pipeline Kanban'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Teleprompter Full Screen Modal */}
      {isTeleprompterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Top Control Bar */}
          <div className="max-w-4xl w-full mx-auto flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  Teleprompter para Locución
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono">
                    {wordCount} palabras
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Lectura fluida para grabación de audio o voz en off faceless
                </p>
              </div>
            </div>

            {/* Play/Pause & Speed & Font Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
                  isAutoScrolling
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                }`}
              >
                {isAutoScrolling ? (
                  <>
                    <Pause className="w-4 h-4" /> Pausar Scroll
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Iniciar Scroll
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (teleprompterRef.current) teleprompterRef.current.scrollTop = 0;
                  setReadingSeconds(0);
                  setIsAutoScrolling(false);
                }}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                title="Reiniciar al inicio"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Speed Buttons */}
              <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
                <span className="text-[10px] text-slate-400 px-2 font-semibold">Vel:</span>
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    onClick={() => setScrollSpeed(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      scrollSpeed === s ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s === 1 ? '100' : s === 2 ? '135' : '170'} wpm
                  </button>
                ))}
              </div>

              {/* Font Size Selector */}
              <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
                <span className="text-[10px] text-slate-400 px-2 font-semibold">Texto:</span>
                {(['md', 'lg', 'xl', '2xl'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold uppercase transition ${
                      fontSize === size ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Timer indicator */}
              <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {Math.floor(readingSeconds / 60)
                    .toString()
                    .padStart(2, '0')}
                  :{(readingSeconds % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-slate-500">/ ~{estimatedReadingMinutes}m</span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsTeleprompterOpen(false);
                  setIsAutoScrolling(false);
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Reading Prompt Display with Reading Focus Line */}
          <div className="relative flex-1 max-w-4xl w-full mx-auto overflow-hidden mt-4">
            {/* Center Eye Level Guide Line */}
            <div className="pointer-events-none absolute left-0 right-0 top-1/3 h-12 bg-indigo-500/10 border-y border-indigo-500/20 z-10 flex items-center justify-between px-3 text-[10px] text-indigo-400 font-mono">
              <span>◄ ZONA DE LECTURA</span>
              <span>LÍNEA DE OJOS ►</span>
            </div>

            {/* Scrollable Script */}
            <div
              ref={teleprompterRef}
              className="h-full overflow-y-auto px-6 py-40 scroll-smooth focus:outline-none"
            >
              <div
                className={`font-sans text-slate-100 font-medium leading-relaxed tracking-wide space-y-6 ${
                  fontSize === 'md'
                    ? 'text-lg sm:text-xl'
                    : fontSize === 'lg'
                    ? 'text-xl sm:text-2xl'
                    : fontSize === 'xl'
                    ? 'text-2xl sm:text-3xl'
                    : 'text-3xl sm:text-4xl'
                }`}
              >
                {/* Remove cues for teleprompter spoken view */}
                {generatedScript
                  .replace(/\[B-ROLL:.*?\]/gi, '')
                  .replace(/\[SFX:.*?\]/gi, '')
                  .replace(/\*\*Voz en Off:\*\*/g, '')
                  .split('\n\n')
                  .map((paragraph, pIdx) => {
                    if (paragraph.startsWith('#')) {
                      return (
                        <h2
                          key={pIdx}
                          className="text-amber-400 font-bold border-b border-slate-800 pb-2 pt-6 text-sm sm:text-base uppercase tracking-wider"
                        >
                          {paragraph.replace(/^#+\s*/, '')}
                        </h2>
                      );
                    }
                    if (!paragraph.trim()) return null;
                    return (
                      <p key={pIdx} className="hover:text-amber-300 transition-colors">
                        {paragraph.trim()}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
