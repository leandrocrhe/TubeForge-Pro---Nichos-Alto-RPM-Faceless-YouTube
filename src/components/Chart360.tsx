import React, { useState } from 'react';

interface ChartProps {
  monthlyTotal: number;
  monthlyAdSense: number;
  monthlyAffiliates: number;
  monthlySponsors: number;
  monthlyDigital?: number;
  currencySymbol?: string;
}

export const Chart360: React.FC<ChartProps> = ({
  monthlyTotal,
  monthlyAdSense,
  monthlyAffiliates,
  monthlySponsors,
  monthlyDigital = 0,
  currencySymbol = '$'
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  // Compound monthly growth multipliers from launch to month 12 maturity
  const multipliers = [0.12, 0.20, 0.30, 0.42, 0.55, 0.68, 0.80, 0.90, 0.98, 1.05, 1.15, 1.25];

  const totalPoints = multipliers.map((m) => Math.round(monthlyTotal * m));
  const adsensePoints = multipliers.map((m) => Math.round(monthlyAdSense * m));

  const maxVal = Math.max(...totalPoints, 100) * 1.15;

  const width = 640;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const getCoordinates = (points: number[]) => {
    return points.map((val, idx) => {
      const x = paddingX + (idx / (points.length - 1)) * (width - paddingX * 2);
      const y = height - paddingY - (val / maxVal) * (height - paddingY * 2);
      return { x, y, val };
    });
  };

  const totalCoords = getCoordinates(totalPoints);
  const adsenseCoords = getCoordinates(adsensePoints);

  const makePathD = (coords: { x: number; y: number }[]) => {
    return coords.reduce((acc, point, i, arr) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      const prev = arr[i - 1];
      const cx = (prev.x + point.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
    }, '');
  };

  const totalPath = makePathD(totalCoords);
  const adsensePath = makePathD(adsenseCoords);

  const totalArea = `${totalPath} L ${totalCoords[totalCoords.length - 1].x} ${height - paddingY} L ${totalCoords[0].x} ${height - paddingY} Z`;

  return (
    <div className="w-full flex flex-col">
      {/* Legend & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-rose-600 to-indigo-500 inline-block"></span>
            <span className="text-slate-300 font-medium">Ingreso 360° Total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-indigo-400 border-dashed inline-block"></span>
            <span className="text-slate-400">Sólo AdSense</span>
          </div>
        </div>

        {hoveredIndex !== null ? (
          <div className="bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg text-[11px] flex items-center gap-3">
            <span className="text-slate-400 font-semibold">{months[hoveredIndex]}:</span>
            <span className="text-emerald-400 font-mono font-bold">
              Total: {currencySymbol}{totalPoints[hoveredIndex].toLocaleString('en-US')}
            </span>
            <span className="text-indigo-400 font-mono">
              AdSense: {currencySymbol}{adsensePoints[hoveredIndex].toLocaleString('en-US')}
            </span>
          </div>
        ) : (
          <span className="text-[10px] text-slate-500 italic">Pasa el cursor sobre la gráfica para ver cada mes</span>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-56 bg-slate-950/70 rounded-xl border border-slate-800/80 p-2 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
              <stop offset="85%" stopColor="#6366f1" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = height - paddingY - pct * (height - paddingY * 2);
            const val = Math.round(maxVal * pct);
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text x={paddingX - 6} y={y + 3} fill="#475569" fontSize="9" textAnchor="end" fontFamily="monospace">
                  {currencySymbol}{val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                </text>
              </g>
            );
          })}

          {/* Total Area */}
          <path d={totalArea} fill="url(#totalGradient)" />

          {/* AdSense Line (dashed) */}
          <path
            d={adsensePath}
            fill="none"
            stroke="#818cf8"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            opacity="0.8"
          />

          {/* Total Line (gradient solid) */}
          <path
            d={totalPath}
            fill="none"
            stroke="url(#strokeGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Month points and hover vertical line */}
          {hoveredIndex !== null && (
            <line
              x1={totalCoords[hoveredIndex].x}
              y1={paddingY}
              x2={totalCoords[hoveredIndex].x}
              y2={height - paddingY}
              stroke="#e11d48"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          )}

          {/* Points */}
          {totalCoords.map((coord, idx) => (
            <g key={idx}>
              {/* AdSense point */}
              <circle
                cx={adsenseCoords[idx].x}
                cy={adsenseCoords[idx].y}
                r="3"
                fill="#818cf8"
                opacity="0.8"
              />
              {/* Total point */}
              <circle
                cx={coord.x}
                cy={coord.y}
                r={hoveredIndex === idx ? 6 : 4}
                fill={hoveredIndex === idx ? '#f43f5e' : '#fff'}
                stroke="#be123c"
                strokeWidth="2"
                className="transition-all cursor-pointer"
              />
              {/* Interactive hit area */}
              <rect
                x={coord.x - 20}
                y={0}
                width={40}
                height={height}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {/* X Axis Labels */}
              <text
                x={coord.x}
                y={height - 8}
                fill={hoveredIndex === idx ? '#f43f5e' : '#64748b'}
                fontSize="10"
                fontWeight={hoveredIndex === idx ? 'bold' : 'normal'}
                textAnchor="middle"
              >
                {months[idx]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Diversification summary breakdown */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2">
          <span className="text-slate-500 block">AdSense Neto</span>
          <span className="text-rose-400 font-mono font-bold">
            {currencySymbol}{Math.round(monthlyAdSense).toLocaleString('en-US')}
          </span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2">
          <span className="text-slate-500 block">Afiliados High-Ticket</span>
          <span className="text-indigo-400 font-mono font-bold">
            {currencySymbol}{Math.round(monthlyAffiliates).toLocaleString('en-US')}
          </span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2">
          <span className="text-slate-500 block">Patrocinios de Marca</span>
          <span className="text-amber-400 font-mono font-bold">
            {currencySymbol}{Math.round(monthlySponsors).toLocaleString('en-US')}
          </span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2">
          <span className="text-slate-500 block">Infoproductos / SaaS</span>
          <span className="text-emerald-400 font-mono font-bold">
            {currencySymbol}{Math.round(monthlyDigital).toLocaleString('en-US')}
          </span>
        </div>
      </div>
    </div>
  );
};
