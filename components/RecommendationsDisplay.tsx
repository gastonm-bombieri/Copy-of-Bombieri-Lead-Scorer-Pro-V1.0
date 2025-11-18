import React, { useState } from 'react';
import { Recommendations } from '../types';
import { SERVICES_DETAILS } from '../servicesData';

interface RecommendationsDisplayProps {
  recommendations: Recommendations;
}

const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
    const baseClasses = "px-3 py-1 text-sm font-semibold rounded-full";
    let colorClasses = "";
    switch (priority) {
        case 'Alta':
            colorClasses = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            break;
        case 'Media':
            colorClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            break;
        case 'Baja':
            colorClasses = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            break;
        default:
            colorClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
    return <span className={`${baseClasses} ${colorClasses}`}>{priority}</span>;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-light-altern dark:bg-slate-800/50 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
            <div className="text-primary dark:text-secondary">{icon}</div>
            <h4 className="font-sora text-md text-primary dark:text-secondary">{title}</h4>
        </div>
        <div className="text-sm text-neutral-dark dark:text-slate-300 pl-8">{children}</div>
    </div>
);

const DetailItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</h5>
        {children}
    </div>
);

const RecommendationsDisplay: React.FC<RecommendationsDisplayProps> = ({ recommendations }) => {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const serviceDetails = SERVICES_DETAILS[recommendations.service];

    const toggleDetails = () => {
        setIsDetailsVisible(prev => !prev);
    };

    return (
        <div className="w-full space-y-4 animate-fade-in">
            <div className="flex justify-between items-center bg-light-altern dark:bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-sora text-md text-primary dark:text-secondary">Nivel de Prioridad</h4>
                <PriorityBadge priority={recommendations.priority} />
            </div>
            
            {recommendations.scoreJustification && (
                <InfoCard 
                    title="Justificación del Puntaje"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                >
                    <p>{recommendations.scoreJustification}</p>
                </InfoCard>
            )}
        
            <InfoCard 
                title="Servicio Recomendado"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>}
            >
                <div className="space-y-2">
                    <div>
                        <p className="text-xs text-gray-500 font-medium uppercase dark:text-gray-400">Categoría</p>
                        <p className="font-medium text-dark-altern dark:text-slate-300">{recommendations.serviceCategory}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium uppercase dark:text-gray-400">Servicio Específico</p>
                        <p className="font-semibold text-secondary">{recommendations.service}</p>
                    </div>
                </div>
                {recommendations.serviceJustification && <p className="mt-2 text-xs italic text-gray-600 dark:text-gray-400 border-t dark:border-slate-700 pt-2">{recommendations.serviceJustification}</p>}
                
                {serviceDetails && (
                    <div className="mt-4 border-t dark:border-slate-700 pt-3">
                        <button 
                        onClick={toggleDetails}
                        className="w-full flex justify-between items-center text-left text-sm font-medium text-primary dark:text-secondary hover:text-secondary dark:hover:text-sky-300 focus:outline-none"
                        aria-expanded={isDetailsVisible}
                        aria-controls={`service-details-${recommendations.service.replace(/\s+/g, '-')}`}
                        >
                        <span>Ver más detalles del servicio</span>
                        <svg className={`h-5 w-5 transform transition-transform duration-200 ${isDetailsVisible ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        </button>
                        
                        {isDetailsVisible && (
                        <div 
                            id={`service-details-${recommendations.service.replace(/\s+/g, '-')}`}
                            className="mt-3 pl-2 pr-1 space-y-4 animate-fade-in"
                        >
                            <DetailItem title="Características Clave">
                                <ul className="list-disc list-inside text-sm text-neutral-dark dark:text-slate-300 mt-1 space-y-1">
                                    {serviceDetails.keyFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
                                </ul>
                            </DetailItem>
                            <DetailItem title="Ideal para">
                                <p className="text-sm text-neutral-dark dark:text-slate-300 mt-1">{serviceDetails.targetAudience}</p>
                            </DetailItem>
                            <DetailItem title="Resultados Esperados">
                                <ul className="list-disc list-inside text-sm text-neutral-dark dark:text-slate-300 mt-1 space-y-1">
                                    {serviceDetails.expectedOutcomes.map((outcome, index) => <li key={index}>{outcome}</li>)}
                                </ul>
                            </DetailItem>
                        </div>
                        )}
                    </div>
                )}
            </InfoCard>
        
            <InfoCard 
                title="Próximos Pasos"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>}
            >
                <p>{recommendations.nextSteps}</p>
            </InfoCard>

        <InfoCard 
            title="Acción Inmediata Sugerida"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>}
        >
            <p className="font-semibold text-secondary">{recommendations.action}</p>
        </InfoCard>
        </div>
    );
};

export default RecommendationsDisplay;