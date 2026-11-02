import React, { useState } from 'react';
import { Niche } from '../types/niche';
import { X, Smartphone, Monitor, Eye, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface YouTubeFeedPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  niche: Niche;
}

export const YouTubeFeedPreviewModal: React.FC<YouTubeFeedPreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  niche,
}) => {
  const [deviceView, setDeviceView] = useState<'mobile' | 'desktop'>('mobile');
  const [customTitle, setCustomTitle] = useState(title);

  React.useEffect(() => {
    setCustomTitle(title);
  }, [title]);

  if (!isOpen) return null;

  const charCount = customTitle.length;
  const isTruncatedOnMobile = charCount > 52;
  const mobilePreviewText = isTruncatedOnMobile ? customTitle.slice(0, 50) + '...' : customTitle;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Simulador de CTR en Feed de YouTube
              </h3>
              <p className="text-[11px] text-slate-400">
                Audita si el título se trunca en la app móvil antes de publicar
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

        {/* Device Switcher & Title Edit */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setDeviceView('mobile')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                  deviceView === 'mobile' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Vista Móvil (70% tráfico)</span>
              </button>
              <button
                onClick={() => setDeviceView('desktop')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                  deviceView === 'desktop' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Escritorio</span>
              </button>
            </div>

            <div className="text-right">
              <span className={`font-mono font-bold text-xs ${isTruncatedOnMobile ? 'text-amber-400' : 'text-emerald-400'}`}>
                {charCount} / 50 caracteres
              </span>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
              Editar Título del Video:
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Realistic YouTube Card Preview */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-center">
          {deviceView === 'mobile' ? (
            /* Mobile YouTube Card */
            <div className="w-full max-w-[340px] bg-[#0f0f0f] rounded-xl overflow-hidden shadow-2xl border border-neutral-800 text-white font-sans">
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full bg-gradient-to-tr from-slate-950 via-slate-900 to-rose-950/60 flex items-center justify-center p-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500/20 via-transparent to-transparent"></div>
                <div className="text-center z-10 space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-rose-400 font-extrabold bg-black/60 px-2 py-0.5 rounded">
                    {niche.category}
                  </span>
                  <p className="text-sm font-black uppercase text-white tracking-tight drop-shadow-md leading-tight max-w-[240px]">
                    {customTitle.split(':')[0] || customTitle}
                  </p>
                </div>
                {/* Duration Badge */}
                <span className="absolute bottom-2 right-2 bg-black/85 text-white font-bold text-[10px] px-1.5 py-0.5 rounded font-mono">
                  10:24
                </span>
              </div>

              {/* Video Info Row */}
              <div className="p-3 flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center font-bold text-white shrink-0 text-xs">
                  TF
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-xs font-semibold leading-snug line-clamp-2 text-neutral-100">
                    {mobilePreviewText}
                  </h4>
                  <div className="text-[11px] text-neutral-400 flex items-center gap-1">
                    <span>TubeForge Network</span>
                    <span>•</span>
                    <span>142 K vistas</span>
                    <span>•</span>
                    <span>hace 3 días</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop YouTube Card */
            <div className="w-full max-w-[460px] bg-[#0f0f0f] rounded-xl overflow-hidden shadow-2xl border border-neutral-800 text-white font-sans p-3 flex gap-3">
              <div className="relative aspect-video w-48 bg-gradient-to-tr from-slate-950 to-indigo-950/60 rounded-lg flex items-center justify-center p-2 shrink-0">
                <p className="text-[11px] font-black uppercase text-center text-white drop-shadow">
                  {niche.name.split(',')[0]}
                </p>
                <span className="absolute bottom-1.5 right-1.5 bg-black/85 text-white font-bold text-[9px] px-1 py-0.2 rounded font-mono">
                  10:24
                </span>
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="text-xs font-semibold leading-snug text-neutral-100 line-clamp-2">
                  {customTitle}
                </h4>
                <p className="text-[10px] text-neutral-400">TubeForge Studio</p>
                <p className="text-[10px] text-neutral-400">128K vistas • hace 5 días</p>
              </div>
            </div>
          )}
        </div>

        {/* Diagnostic Feedback */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
          <div className="flex items-center gap-2">
            {isTruncatedOnMobile ? (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-amber-400">Advertencia de Truncamiento Móvil:</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-emerald-400">Longitud Perfecta para Alto CTR:</span>
              </>
            )}
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            {isTruncatedOnMobile
              ? 'El título tiene más de 50 caracteres y los usuarios de teléfonos móviles no leerán la promesa final. Acórtalo colocando las palabras más impactantes al principio.'
              : 'El título se leerá completo en el 98% de los dispositivos sin cortes (...). Ideal para maximizar el CTR orgánico.'}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
