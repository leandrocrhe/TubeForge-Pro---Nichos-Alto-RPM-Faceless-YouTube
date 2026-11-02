import React, { useState } from 'react';
import { VideoProject, PipelineStage, Niche } from '../types/niche';
import { 
  Kanban, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Sparkles,
  FileText,
  Calendar,
  X
} from 'lucide-react';

interface PipelineKanbanTabProps {
  projects: VideoProject[];
  setProjects: React.Dispatch<React.SetStateAction<VideoProject[]>>;
  niches: Niche[];
  onOpenFeedPreview: (title: string, niche: Niche) => void;
}

const STAGES: { id: PipelineStage; label: string; iconColor: string; bgBadge: string }[] = [
  { id: 'idea', label: '1. Ideas Validadas', iconColor: 'text-amber-400', bgBadge: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
  { id: 'script', label: '2. Guión Escrito', iconColor: 'text-indigo-400', bgBadge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' },
  { id: 'audio', label: '3. Locución & Audio', iconColor: 'text-cyan-400', bgBadge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' },
  { id: 'editing', label: '4. Edición & B-Roll', iconColor: 'text-purple-400', bgBadge: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
  { id: 'published', label: '5. Publicado', iconColor: 'text-emerald-400', bgBadge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
];

export const PipelineKanbanTab: React.FC<PipelineKanbanTabProps> = ({
  projects,
  setProjects,
  niches,
  onOpenFeedPreview,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedNicheId, setSelectedNicheId] = useState(niches[0]?.id || '');
  const [targetViews, setTargetViews] = useState(100000);

  // Compute Pipeline Overview Metrics
  const activeProjects = projects.filter((p) => p.stage !== 'published');
  const publishedProjects = projects.filter((p) => p.stage === 'published');
  const totalHours = activeProjects.reduce((acc, p) => acc + (p.estimatedHours || 2), 0);
  const potentialRevenue = activeProjects.reduce((acc, p) => acc + ((p.targetViews || 100000) / 1000) * (p.targetRpm || 15), 0);

  const moveProject = (projectId: string, direction: 'prev' | 'next') => {
    const stageOrder: PipelineStage[] = ['idea', 'script', 'audio', 'editing', 'published'];

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const currentIdx = stageOrder.indexOf(proj.stage);
        const newIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1;
        if (newIdx >= 0 && newIdx < stageOrder.length) {
          return { ...proj, stage: stageOrder[newIdx] };
        }
        return proj;
      })
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreateProject = () => {
    if (!newTitle.trim()) return;
    const foundNiche = niches.find((n) => n.id === selectedNicheId) || niches[0];

    const project: VideoProject = {
      id: `proj_${Date.now()}`,
      title: newTitle.trim(),
      nicheId: foundNiche.id,
      nicheName: foundNiche.name,
      category: foundNiche.category,
      stage: 'idea',
      targetRpm: foundNiche.avgRpm,
      targetViews: targetViews,
      estimatedHours: foundNiche.productionHours || 2.2,
      createdAt: new Date().toISOString(),
      notes: `Iniciado en TubeForge Pipeline. RPM base: $${foundNiche.avgRpm.toFixed(2)}`,
    };

    setProjects((prev) => [project, ...prev]);
    setNewTitle('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Pipeline Health Stats */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Kanban className="w-5 h-5 text-rose-500" />
              Pipeline de Producción Faceless (Kanban)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Controla el flujo de trabajo de tu canal desde la idea hasta el video publicado.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-rose-600/20 active:scale-95 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Video</span>
          </button>
        </div>

        {/* Pipeline Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">En Producción</span>
            <span className="text-lg font-black text-white font-mono">{activeProjects.length} videos</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Potencial AdSense Pipeline</span>
            <span className="text-lg font-black text-emerald-400 font-mono">${Math.round(potentialRevenue).toLocaleString()} USD</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Tiempo Estimado Pendiente</span>
            <span className="text-lg font-black text-indigo-400 font-mono">~{totalHours.toFixed(1)} horas</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Videos Publicados</span>
            <span className="text-lg font-black text-purple-400 font-mono">{publishedProjects.length} videos</span>
          </div>
        </div>
      </div>

      {/* 5-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 items-start">
        {STAGES.map((col) => {
          const colProjects = projects.filter((p) => p.stage === col.id);

          return (
            <div
              key={col.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex flex-col min-h-[500px] shadow-lg"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800/80">
                <span className="text-xs font-bold text-white tracking-tight">{col.label}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${col.bgBadge} font-mono`}>
                  {colProjects.length}
                </span>
              </div>

              {/* Cards list */}
              <div className="flex-1 space-y-2.5 overflow-y-auto">
                {colProjects.length === 0 ? (
                  <div className="p-4 text-center text-slate-600 text-[11px] border border-dashed border-slate-800 rounded-xl my-2">
                    Sin videos en esta etapa
                  </div>
                ) : (
                  colProjects.map((proj) => {
                    const nicheObj = niches.find((n) => n.id === proj.nicheId) || niches[0];

                    return (
                      <div
                        key={proj.id}
                        className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-3 rounded-xl space-y-2 shadow-sm transition"
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            {proj.category}
                          </span>
                          <button
                            onClick={() => deleteProject(proj.id)}
                            className="text-slate-600 hover:text-rose-400 p-0.5"
                            title="Eliminar del pipeline"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        <h4 className="text-xs font-bold text-white leading-snug">{proj.title}</h4>

                        <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-900 font-mono">
                          <span className="text-emerald-400 font-semibold">RPM ~${proj.targetRpm.toFixed(1)}</span>
                          <span>~{proj.estimatedHours}h</span>
                        </div>

                        {/* Bottom Action Controls */}
                        <div className="flex items-center justify-between pt-1 gap-1">
                          <button
                            onClick={() => moveProject(proj.id, 'prev')}
                            disabled={proj.stage === 'idea'}
                            className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                            title="Mover a etapa previa"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => onOpenFeedPreview(proj.title, nicheObj)}
                            className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
                            title="Ver en simulador de YouTube"
                          >
                            Previsualizar
                          </button>

                          <button
                            onClick={() => moveProject(proj.id, 'next')}
                            disabled={proj.stage === 'published'}
                            className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                            title="Avanzar etapa"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: New Project Form */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-rose-500" />
                Añadir Video al Pipeline
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Título Tentativo de Alto CTR:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej: El Error de $30M que Destruyó este Fondo..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nicho Relacionado:</label>
                <select
                  value={selectedNicheId}
                  onChange={(e) => setSelectedNicheId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                >
                  {niches.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name} (RPM ~${n.avgRpm.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Objetivo de Visitas:</label>
                <input
                  type="number"
                  step="10000"
                  value={targetViews}
                  onChange={(e) => setTargetViews(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!newTitle.trim()}
                className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
              >
                Crear Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
