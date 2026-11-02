import React, { useState, useEffect } from 'react';
import { Niche, SimulationParams, SimulationResult } from '../types/niche';
import { Chart360 } from './Chart360';
import { 
  Calculator, 
  Sliders, 
  Link as LinkIcon, 
  Handshake, 
  TrendingUp, 
  Sparkles, 
  Download, 
  Copy, 
  DollarSign,
  Package,
  Clock,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CalculatorTabProps {
  niches: Niche[];
  currentNiche: Niche;
  onSelectNichePreset: (niche: Niche) => void;
}

export const CalculatorTab: React.FC<CalculatorTabProps> = ({
  niches,
  currentNiche,
  onSelectNichePreset,
}) => {
  const [currency, setCurrency] = useState<'$' | '€' | '£'>('$');
  const [copied, setCopied] = useState(false);

  const [params, setParams] = useState<SimulationParams>({
    views: 150000,
    rpm: currentNiche ? currentNiche.avgRpm : 18.0,
    cvr: 0.08,
    payout: 65,
    sponsorCount: 1,
    sponsorRate: 750,
    digitalProductsSales: 8,
    digitalProductPrice: 47,
    productionCostPerVideo: 45,
    videosPerMonth: 6,
  });

  // When currentNiche changes from parent or preset
  useEffect(() => {
    if (currentNiche) {
      setParams((prev) => ({
        ...prev,
        rpm: currentNiche.avgRpm,
        payout: currentNiche.category === 'Tecnología' || currentNiche.category === 'Legal' ? 85 : 55,
        sponsorRate: currentNiche.avgRpm > 20 ? 1100 : 700,
      }));
    }
  }, [currentNiche]);

  // Derived Calculations
  const result: SimulationResult = React.useMemo(() => {
    const monthlyAdSense = (params.views / 1000) * params.rpm;
    const estimatedConversions = params.views * (params.cvr / 100);
    const monthlyAffiliates = estimatedConversions * params.payout;
    const monthlySponsors = params.sponsorCount * params.sponsorRate;
    const monthlyDigital = params.digitalProductsSales * params.digitalProductPrice;

    const grossMonthly = monthlyAdSense + monthlyAffiliates + monthlySponsors + monthlyDigital;
    const productionCosts = params.videosPerMonth * params.productionCostPerVideo;
    const netMonthly = Math.max(0, grossMonthly - productionCosts);

    const grossAnnual = grossMonthly * 12;
    const netAnnual = netMonthly * 12;

    return {
      monthlyAdSense,
      monthlyAffiliates,
      monthlySponsors,
      monthlyDigital,
      grossMonthly,
      productionCosts,
      netMonthly,
      grossAnnual,
      netAnnual,
    };
  }, [params]);

  // Trigger celebration on big milestone
  useEffect(() => {
    if (result.grossMonthly >= 10000) {
      // gentle celebratory confetti once
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#f43f5e', '#6366f1', '#10b981'],
        });
      } catch {
        // fallback silent
      }
    }
  }, [Math.floor(result.grossMonthly / 10000)]);

  // Estimated hours invested per month
  const hoursPerMonth = params.videosPerMonth * (currentNiche?.productionHours || 2.2);
  const effectiveHourlyRate = hoursPerMonth > 0 ? result.netMonthly / hoursPerMonth : 0;

  const handleCopyReport = () => {
    const text = `=== PROYECCIÓN FINANCIERA 360° - TUBFORGE PRO ===
Nicho: ${currentNiche?.name || 'Personalizado'}
Visitas Mensuales: ${params.views.toLocaleString()} views
RPM AdSense: ${currency}${params.rpm.toFixed(2)}

INGRESOS MENSUALES ESTIMADOS:
- YouTube AdSense: ${currency}${Math.round(result.monthlyAdSense).toLocaleString()}
- Afiliados High-Ticket: ${currency}${Math.round(result.monthlyAffiliates).toLocaleString()}
- Patrocinios de Marca: ${currency}${Math.round(result.monthlySponsors).toLocaleString()}
- Productos Digitales: ${currency}${Math.round(result.monthlyDigital).toLocaleString()}
--------------------------------------------
TOTAL BRUTO MENSUAL: ${currency}${Math.round(result.grossMonthly).toLocaleString()}
COSTES DE PRODUCCIÓN: -${currency}${Math.round(result.productionCosts).toLocaleString()}
BENEFICIO NETO MENSUAL: ${currency}${Math.round(result.netMonthly).toLocaleString()}
PROYECCIÓN ANUAL NETA: ~${currency}${Math.round(result.netAnnual).toLocaleString()}
Tasa Efectiva por Hora: ~${currency}${Math.round(effectiveHourlyRate)} / hora
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sliders & Controls Panel (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-rose-500" />
                Parámetros del Canal
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Modela un canal diversificado más allá de solo AdSense.
              </p>
            </div>

            {/* Currency selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {(['$', '€', '£'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`w-6 h-6 rounded flex items-center justify-center font-bold transition ${
                    currency === curr ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Preset Selector */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">
              Cargar Preset de Nicho:
            </label>
            <select
              value={currentNiche?.id || ''}
              onChange={(e) => {
                const found = niches.find((n) => n.id === e.target.value);
                if (found) onSelectNichePreset(found);
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

          {/* Views Slider */}
          <div className="space-y-1.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <div className="flex justify-between text-xs items-center">
              <span className="text-slate-400 font-medium">Visitas Mensuales Promedio:</span>
              <span className="font-bold text-white font-mono text-sm bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {params.views.toLocaleString('en-US')} views
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="2000000"
              step="10000"
              value={params.views}
              onChange={(e) => setParams({ ...params, views: Number(e.target.value) })}
              className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>10k (Inicio)</span>
              <span>200k (Medio)</span>
              <span>1M+ (Escalado)</span>
            </div>
          </div>

          {/* RPM Slider */}
          <div className="space-y-1.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <div className="flex justify-between text-xs items-center">
              <span className="text-slate-400 font-medium">RPM AdSense ($ / 1k views):</span>
              <span className="font-bold text-emerald-400 font-mono text-sm bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {currency}{params.rpm.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="60"
              step="0.5"
              value={params.rpm}
              onChange={(e) => setParams({ ...params, rpm: Number(e.target.value) })}
              className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>$2 (General)</span>
              <span>$15 (Finanzas)</span>
              <span>$40+ (Legal/B2B)</span>
            </div>
          </div>

          {/* High-Ticket Affiliate Conversion Box */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Marketing de Afiliados / SaaS B2B</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Tasa Conversión (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="5"
                  value={params.cvr}
                  onChange={(e) => setParams({ ...params, cvr: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-rose-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Comisión Media ({currency})
                </label>
                <input
                  type="number"
                  step="5"
                  min="5"
                  value={params.payout}
                  onChange={(e) => setParams({ ...params, payout: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Brand Sponsors Box */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <Handshake className="w-3.5 h-3.5 text-amber-400" />
              <span>Patrocinios & Menciones Integradas</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Acuerdos por mes
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={params.sponsorCount}
                  onChange={(e) => setParams({ ...params, sponsorCount: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-rose-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Tarifa por Integración ({currency})
                </label>
                <input
                  type="number"
                  step="50"
                  min="0"
                  value={params.sponsorRate}
                  onChange={(e) => setParams({ ...params, sponsorRate: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Production Costs / Net ROI */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <Package className="w-3.5 h-3.5 text-rose-400" />
              <span>Costes de Producción / Video (Herramientas / Freelancers)</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Videos al Mes</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={params.videosPerMonth}
                  onChange={(e) => setParams({ ...params, videosPerMonth: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-rose-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Coste por Video ({currency})</label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={params.productionCostPerVideo}
                  onChange={(e) => setParams({ ...params, productionCostPerVideo: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-rose-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results & 360 Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full blur-xl pointer-events-none"></div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                YouTube AdSense
              </span>
              <span className="text-2xl font-black text-rose-400 mt-1 block font-mono">
                {currency}{Math.round(result.monthlyAdSense).toLocaleString('en-US')}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">
                A {currency}{params.rpm.toFixed(2)} RPM neto
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                Afiliados + Sponsors
              </span>
              <span className="text-2xl font-black text-indigo-400 mt-1 block font-mono">
                {currency}{Math.round(result.monthlyAffiliates + result.monthlySponsors).toLocaleString('en-US')}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">
                Monetización externa sin depender de AdSense
              </span>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
              <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider block">
                Total Mensual Neto
              </span>
              <span className="text-2xl font-black text-emerald-400 mt-1 block font-mono">
                {currency}{Math.round(result.netMonthly).toLocaleString('en-US')}
              </span>
              <span className="text-[10px] text-emerald-500/80 font-bold block mt-1">
                ~{currency}{Math.round(result.netAnnual).toLocaleString('en-US')} / año neto
              </span>
            </div>
          </div>

          {/* Interactive 12-Month Projection Chart */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                  Curva de Crecimiento Compuesto a 12 Meses
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Simulación de escalabilidad desde el mes 1 hasta el canal establecido en mes 12.
                </p>
              </div>

              <button
                onClick={handleCopyReport}
                className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-800 transition flex items-center gap-1.5 self-start sm:self-auto"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Resumen'}</span>
              </button>
            </div>

            <Chart360
              monthlyTotal={result.grossMonthly}
              monthlyAdSense={result.monthlyAdSense}
              monthlyAffiliates={result.monthlyAffiliates}
              monthlySponsors={result.monthlySponsors}
              monthlyDigital={result.monthlyDigital}
              currencySymbol={currency}
            />
          </div>

          {/* Return On Time / ROI Diagnostic Card */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Eficiencia de Tiempo Invertido
                </span>
                <span className="text-sm font-bold text-white">
                  ~{hoursPerMonth.toFixed(1)} horas / mes de trabajo
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Valor Hora Efectivo
              </span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                ~{currency}{Math.round(effectiveHourlyRate)} / hora
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
