import { Request, Response } from 'express';
import { getLeadRecommendations } from '../services/geminiService';
import { LeadData, ScoreResult } from '../services/geminiService';

export const analyzeLead = async (req: Request, res: Response) => {
  try {
    const { leadData, scoreResult } = req.body as { leadData: LeadData, scoreResult: ScoreResult };

    // Basic validation to ensure the required data is present
    if (!leadData || !scoreResult) {
      return res.status(400).json({ message: 'Missing leadData or scoreResult in request body' });
    }

    const recommendations = await getLeadRecommendations(leadData, scoreResult);
    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error analyzing lead:', error);
    res.status(500).json({ message: 'Failed to analyze lead' });
  }
};

import prisma from '../lib/prisma';
import { Recommendations } from '../services/geminiService';

export const saveLead = async (req: Request, res: Response) => {
  try {
    const { leadData, scoreResult, recommendations } = req.body as { leadData: LeadData, scoreResult: ScoreResult, recommendations: Recommendations };

    const newLead = await prisma.historicLead.create({
      data: {
        leadData: JSON.stringify(leadData),
        scoreResult: JSON.stringify(scoreResult),
        recommendations: JSON.stringify(recommendations),
      },
    });

    res.status(201).json(newLead);
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ message: 'Failed to save lead' });
  }
};

export const getLeadHistory = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.historicLead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const parsedLeads = leads.map(lead => ({
      ...lead,
      leadData: JSON.parse(lead.leadData),
      scoreResult: JSON.parse(lead.scoreResult),
      recommendations: JSON.parse(lead.recommendations),
    }));

    res.status(200).json(parsedLeads);
  } catch (error) {
    console.error('Error retrieving lead history:', error);
    res.status(500).json({ message: 'Failed to retrieve lead history' });
  }
};
