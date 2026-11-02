export type Category = 
  | 'Legal' 
  | 'Tecnología' 
  | 'Finanzas' 
  | 'Salud' 
  | 'Negocios' 
  | 'Estilo de Vida';

export interface SubNiche {
  title: string;
  cpmScore: 'Muy Alto' | 'Alto' | 'Medio-Alto' | 'Extremo';
  angles: string;
  formats: string;
  monetization: string;
  techStack: string[];
}

export interface Niche {
  id: string;
  name: string;
  category: Category;
  badge: string;
  icon: string;
  cpm: string;
  rpmMin: number;
  rpmMax: number;
  avgRpm: number;
  opportunityScore: number; // 0 - 100
  competition: 'Baja' | 'Media' | 'Alta';
  facelessScore: number; // 0 - 100%
  productionHours: number;
  searchVsBrowse: string;
  desc: string;
  subniches: SubNiche[];
  hooks: string[];
  sopSteps: string[];
  isCustom?: boolean;
}

export interface SimulationParams {
  views: number;
  rpm: number;
  cvr: number; // %
  payout: number; // $
  sponsorCount: number;
  sponsorRate: number;
  digitalProductsSales: number;
  digitalProductPrice: number;
  productionCostPerVideo: number;
  videosPerMonth: number;
}

export interface SimulationResult {
  monthlyAdSense: number;
  monthlyAffiliates: number;
  monthlySponsors: number;
  monthlyDigital: number;
  grossMonthly: number;
  productionCosts: number;
  netMonthly: number;
  grossAnnual: number;
  netAnnual: number;
}

export type PipelineStage = 'idea' | 'script' | 'audio' | 'editing' | 'published';

export interface VideoProject {
  id: string;
  title: string;
  nicheId: string;
  nicheName: string;
  category: Category;
  stage: PipelineStage;
  targetRpm: number;
  targetViews: number;
  estimatedHours: number;
  scriptText?: string;
  thumbnailPrompt?: string;
  createdAt: string;
  deadline?: string;
  notes?: string;
}

export interface DiscoveredNicheHistoryItem {
  id: string;
  discoveredAt: string;
  niche: Niche;
  trendFocus: string;
  addedToRadar?: boolean;
}
