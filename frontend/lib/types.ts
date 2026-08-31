export type Modality = 'OPTICAL' | 'SAR' | 'MULTISPECTRAL' | 'TEMPORAL';

export type AnalysisType = 'VQA' | 'CAPTIONING' | 'GROUNDING' | 'CHANGE_DETECTION' | 'CROSS_MODAL';

export interface ImageSource {
  id: string;
  name: string;
  size: string;
  modality: Modality;
  dimensions: string;
  coordinateSystem: string;
  status: 'READY' | 'UPLOADING' | 'FAILED';
  url: string;
}

export interface AgentStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  description: string;
  duration: number; // in ms
}

export interface Evidence {
  id: string;
  label: string;
  confidence: number;
  area: string;
  region: string;
  coordinates: string;
  description: string;
  color: string; // Tailwind color class or hex
  polygonPoints?: string; // CSS clip-path or relative coordinates for SVG rendering
}

export interface AnalysisResult {
  title: string;
  summary: string;
  confidence: number;
  analysisType: AnalysisType;
  evidence: Evidence[];
  specialists: string[];
}

export interface ModelInfo {
  name: string;
  type: string;
  version: string;
  status: 'READY' | 'OFFLINE' | 'MAINTENANCE';
  modality: string;
  task: string;
  input: string;
  output: string;
}

export interface HistoryRecord {
  id: string;
  name: string;
  query: string;
  modality: Modality;
  date: string;
  confidence: number;
  status: 'COMPLETED' | 'FAILED';
  region: string;
  resultSummary: string;
}
