export interface LeadData {
  contactDate: string;
  firstName: string;
  lastName: string;
  role: string;
  industry: string;
  revenue: string;
  employees: string;
  budget: string;
  needDetails: string;
  source: string;
  serviceInterest: string;
}

export type ScorableLeadData = Omit<LeadData, 'firstName' | 'lastName' | 'needDetails' | 'contactDate'>;


export interface ScoreResult {
  finalScore: number;
  breakdown: Record<keyof ScorableLeadData, number>;
}

export interface Recommendations {
  serviceCategory: string;
  service: string;
  nextSteps: string;
  priority: 'Alta' | 'Media' | 'Baja';
  action: string;
  scoreJustification: string;
  serviceJustification: string;
}

export interface HistoricLead {
  id: string; // ISO date string
  formData: LeadData;
  readableData: LeadData;
  scoreResult: ScoreResult;
  recommendations: Recommendations;
}

export interface ServiceDetails {
  keyFeatures: string[];
  targetAudience: string;
  expectedOutcomes: string[];
}

export const initialLeadData: LeadData = {
  contactDate: '',
  firstName: '',
  lastName: '',
  role: '0',
  industry: '0',
  revenue: '0',
  employees: '0',
  budget: '0',
  needDetails: '',
  source: '0',
  serviceInterest: '0',
};