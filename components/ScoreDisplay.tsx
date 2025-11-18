import React from 'react';
import { ScoreResult, ScorableLeadData } from '../types';
import { WEIGHTED_CRITERIA } from '../constants';

interface ScoreDisplayProps {
  scoreResult: ScoreResult;
}

const CRITERIA_LABELS: Record<keyof ScorableLeadData, string> = {
  role: 'Rol del contacto',
  industry: 'Industria',
  revenue: 'Facturación anual',
  employees: 'Colaboradores',
  budget: 'Presupuesto',
  source: 'Origen del lead',
  serviceInterest: 'Interés en servicio',
};

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ scoreResult }) => {
  const { finalScore, breakdown } = scoreResult;

  const scoreColor = finalScore > 7.5 ? 'text-green-500' : finalScore > 4.5 ? 'text-yellow-500' : 'text-accent-motion';
  const strokeColor = finalScore > 7.5 ? '#22c55e' : finalScore > 4.5 ? '#eab308' : '#D32210';
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (finalScore / 10) * circumference;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center justify-center p-4 rounded-lg">
        <h3 className="text-lg font-ibm-plex font-semibold text-dark-altern dark:text-slate-300 mb-4">Puntaje de Afinidad</h3>
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 140 140">
            <circle
              className="text-gray-200 dark:text-slate-700"
              strokeWidth="12"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="70"
              cy="70"
            />
            <circle
              strokeWidth="12"
              stroke={strokeColor}
              fill="transparent"
              r={radius}
              cx="70"
              cy="70"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                transition: 'stroke-dashoffset 0.5s ease-out'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-sora text-4xl font-bold ${scoreColor}`}>
              {finalScore.toFixed(1)}
            </span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-slate-400">sobre 10</p>
      </div>
      
      <div className="mt-6 w-full max-w-sm animate-fade-in">
        <h4 className="text-md font-ibm-plex font-semibold text-dark-altern dark:text-slate-300 mb-3 text-center">Desglose de Puntaje</h4>
        <div className="space-y-2">
          {Object.entries(breakdown)
            .sort(([keyA], [keyB]) => {
                // Keep a consistent order, e.g., alphabetical or predefined
                return CRITERIA_LABELS[keyA as keyof ScorableLeadData].localeCompare(CRITERIA_LABELS[keyB as keyof ScorableLeadData]);
            })
            .map(([key, value]) => {
            const typedKey = key as keyof ScorableLeadData;
            const isWeighted = WEIGHTED_CRITERIA.includes(key);

            return (
              <div key={key} className="grid grid-cols-12 items-center gap-2 text-sm" title={`${CRITERIA_LABELS[typedKey]}: ${value}/10`}>
                <div className="flex items-center col-span-5 text-gray-600 dark:text-slate-400">
                    <span className="truncate">{CRITERIA_LABELS[typedKey]}</span>
                    {isWeighted && <span title="Criterio ponderado (x2)" className="ml-1 text-yellow-500">&#9733;</span>}
                </div>
                <div className="col-span-7 flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div 
                      className="bg-secondary h-2.5 rounded-full transition-all duration-500 ease-out"
                      // FIX: Explicitly cast value to Number to prevent arithmetic operation errors with stricter TypeScript configurations.
                      style={{ width: `${(Number(value) / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 font-semibold text-neutral-dark dark:text-slate-100 w-6 text-right">{value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;