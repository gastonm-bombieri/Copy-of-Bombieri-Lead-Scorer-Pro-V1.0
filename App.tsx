import React, { useState, useCallback, useEffect } from 'react';
import { LeadData, ScoreResult, Recommendations, initialLeadData, HistoricLead, ScorableLeadData } from './types';
import { getLeadRecommendations } from './services/geminiService';
import { MAX_POSSIBLE_WEIGHTED_SCORE, WEIGHTED_CRITERIA } from './constants';
import Header from './components/Header';
import LeadForm from './components/LeadForm';
import ScoreDisplay from './components/ScoreDisplay';
import RecommendationsDisplay from './components/RecommendationsDisplay';
import HistoryList from './components/HistoryList';
import Login from './components/Login';

const LOCAL_STORAGE_KEY = 'bombieriLeadHistory';
const AUTH_STORAGE_KEY = 'bombieriAuth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [leadData, setLeadData] = useState<LeadData>(initialLeadData);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadHistory, setLeadHistory] = useState<HistoricLead[]>([]);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('theme', theme);
    } catch (e) {
      console.error("Failed to save theme to localStorage", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleReset = useCallback(() => {
    setLeadData(initialLeadData);
    setScoreResult(null);
    setRecommendations(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
        console.error("Failed to clear state from localStorage", e);
    }
    setIsAuthenticated(false);
    setLeadHistory([]);
    handleReset();
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedHistory) {
        setLeadHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leadHistory));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [leadHistory, isAuthenticated]);

  const handleLogin = () => {
    try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } catch (e) {
        console.error("Failed to save auth state to localStorage", e);
    }
    setIsAuthenticated(true);
  };


  const handleScore = useCallback(async (data: LeadData) => {
    setIsLoading(true);
    setError(null);
    setScoreResult(null);
    setRecommendations(null);

    const breakdown: Partial<Record<keyof ScorableLeadData, number>> = {};
    let weightedTotal = 0;

    for (const key in data) {
      if (['needDetails', 'firstName', 'lastName', 'contactDate'].includes(key)) continue;
      const typedKey = key as keyof ScorableLeadData;
      const value = parseInt(data[typedKey] as string, 10) || 0;
      breakdown[typedKey] = value;
      const weight = WEIGHTED_CRITERIA.includes(key) ? 2 : 1;
      weightedTotal += value * weight;
    }

    const finalScore = (weightedTotal / MAX_POSSIBLE_WEIGHTED_SCORE) * 10;
    const newScoreResult: ScoreResult = { finalScore, breakdown: breakdown as Record<keyof ScorableLeadData, number> };
    setScoreResult(newScoreResult);
    
    const { ROL_OPTIONS, INDUSTRY_OPTIONS, REVENUE_OPTIONS, EMPLOYEES_OPTIONS, BUDGET_OPTIONS, SOURCE_OPTIONS, SERVICE_INTEREST_OPTIONS } = await import('./constants');
    
    const readableData: LeadData = {
        contactDate: data.contactDate,
        firstName: data.firstName,
        lastName: data.lastName,
        role: ROL_OPTIONS.find(o => o.value === data.role)?.label || 'N/A',
        industry: INDUSTRY_OPTIONS.find(o => o.value === data.industry)?.label || 'N/A',
        revenue: REVENUE_OPTIONS.find(o => o.value === data.revenue)?.label || 'N/A',
        employees: EMPLOYEES_OPTIONS.find(o => o.value === data.employees)?.label || 'N/A',
        budget: BUDGET_OPTIONS.find(o => o.value === data.budget)?.label || 'N/A',
        needDetails: data.needDetails,
        source: SOURCE_OPTIONS.find(o => o.value === data.source)?.label || 'N/A',
        serviceInterest: SERVICE_INTEREST_OPTIONS.find(o => o.value === data.serviceInterest)?.label || 'N/A',
    };

    try {
      const geminiResponse = await getLeadRecommendations(readableData, newScoreResult);
      const parsedRecommendations: Recommendations = JSON.parse(geminiResponse);
      setRecommendations(parsedRecommendations);

      const newHistoricLead: HistoricLead = {
        id: new Date().toISOString(),
        formData: data,
        readableData: readableData,
        scoreResult: newScoreResult,
        recommendations: parsedRecommendations,
      };
      setLeadHistory(prev => [newHistoricLead, ...prev]);

    } catch (e) {
      setError('Hubo un error al generar las recomendaciones. Por favor, intente de nuevo.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleExportToCSV = () => {
    if (leadHistory.length === 0) {
      alert("No hay historial para exportar.");
      return;
    }

    const headers = [
      "ID", "Fecha de Calificación", "Fecha de Contacto", "Nombre", "Apellido", "Rol del contacto", "Industria", "Facturación anual", 
      "Cantidad de colaboradores", "Presupuesto", 
      "Detalle de la necesidad", "Origen del contacto", "Servicio de interés inicial",
      "Puntaje Final", "Justificación del Puntaje", "Prioridad", "Categoría de Servicio", "Servicio Recomendado", 
      "Justificación del Servicio", "Próximos Pasos", "Acción Inmediata Sugerida"
    ];

    const escapeCsv = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;

    const rows = leadHistory.map(lead => [
      lead.id,
      new Date(lead.id).toLocaleString(),
      escapeCsv(lead.formData.contactDate),
      escapeCsv(lead.readableData.firstName),
      escapeCsv(lead.readableData.lastName),
      escapeCsv(lead.readableData.role),
      escapeCsv(lead.readableData.industry),
      escapeCsv(lead.readableData.revenue),
      escapeCsv(lead.readableData.employees),
      escapeCsv(lead.readableData.budget),
      escapeCsv(lead.readableData.needDetails),
      escapeCsv(lead.readableData.source),
      escapeCsv(lead.readableData.serviceInterest),
      lead.scoreResult.finalScore.toFixed(1),
      escapeCsv(lead.recommendations.scoreJustification),
      escapeCsv(lead.recommendations.priority),
      escapeCsv(lead.recommendations.serviceCategory),
      escapeCsv(lead.recommendations.service),
      escapeCsv(lead.recommendations.serviceJustification),
      escapeCsv(lead.recommendations.nextSteps),
      escapeCsv(lead.recommendations.action),
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "historial_leads_bombieri.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearHistory = () => {
    if (window.confirm("¿Está seguro de que desea borrar todo el historial de leads? Esta acción no se puede deshacer.")) {
      setLeadHistory([]);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen font-ibm-plex text-neutral-dark dark:text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <Header theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 lg:col-span-5">
            <h2 className="font-sora text-2xl text-primary dark:text-secondary mb-6">Información del Lead</h2>
            <LeadForm 
              initialData={leadData} 
              onSubmit={handleScore}
              onReset={handleReset}
              isScoring={isLoading}
            />
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col lg:col-span-5">
            <h2 className="font-sora text-2xl text-primary dark:text-secondary mb-6">Calificación, Evaluación y Próximos Pasos</h2>
            <div className="flex-grow flex items-center justify-center">
              {isLoading && (
                 <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin h-12 w-12 text-primary dark:text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-dark-altern dark:text-slate-400">Calificando lead y generando sugerencias...</p>
                 </div>
              )}
              {error && <p className="text-accent-motion text-center">{error}</p>}
              {!isLoading && !error && !scoreResult && (
                <div className="text-center text-gray-500 dark:text-slate-400">
                  <p>Complete el formulario para calificar un lead.</p>
                  <p className="mt-2 text-sm">Los resultados de la evaluación aparecerán aquí.</p>
                </div>
              )}
              {scoreResult && (
                <div className="w-full flex flex-col gap-8">
                  <ScoreDisplay scoreResult={scoreResult} />
                  {recommendations && <RecommendationsDisplay recommendations={recommendations} />}
                </div>
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col lg:col-span-2">
            <HistoryList 
              history={leadHistory}
              onExport={handleExportToCSV}
              onClear={handleClearHistory}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
