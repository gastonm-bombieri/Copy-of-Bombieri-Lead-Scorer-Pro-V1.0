import { z } from 'zod';

// Schema for LeadData
const leadDataSchema = z.object({
  contactDate: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  industry: z.string(),
  revenue: z.string(),
  employees: z.string(),
  budget: z.string(),
  needDetails: z.string(),
  source: z.string(),
  serviceInterest: z.string(),
});

// Schema for ScoreResult
const scoreResultSchema = z.object({
  finalScore: z.number(),
  breakdown: z.record(z.number()),
});

// Schema for Recommendations
const recommendationsSchema = z.object({
    serviceCategory: z.string(),
    service: z.string(),
    nextSteps: z.string(),
    priority: z.enum(['Alta', 'Media', 'Baja']),
    action: z.string(),
    scoreJustification: z.string(),
    serviceJustification: z.string(),
});

// Schema for the /api/analyze endpoint
export const analyzeLeadSchema = z.object({
  body: z.object({
    leadData: leadDataSchema,
    scoreResult: scoreResultSchema,
  }),
});

// Schema for the /api/leads endpoint (saving a lead)
export const saveLeadSchema = z.object({
  body: z.object({
    leadData: leadDataSchema,
    scoreResult: scoreResultSchema,
    recommendations: recommendationsSchema,
  }),
});
