import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Define the types based on the frontend's types.ts
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

export interface ScoreResult {
    finalScore: number;
    breakdown: Record<string, number>;
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


const BOMB_SERVICES_PORTFOLIO = `
- **Estrategia y Transformación**: Acompañamiento en la evolución de negocios, integrando cultura, estrategia y tecnología.
  - **Programa Aliado Estratégico**: Rediseño del modelo de gestión desde la estrategia. Incluye fases de Sensibilización, Dirección Estratégica (Diagnóstico, Mapa de Iniciativas, Blueprint) y Acompañamiento.
  - **Programa Aliado Tecnológico**: Optimización de operaciones con IA y digitalización. Incluye fases de Sensibilización, Diagnóstico y Hoja de Ruta Digital, y Acompañamiento.

- **IA Operativa & Agentes Inteligentes (Plataforma Braulio)**: Soluciones modulares para automatizar procesos y amplificar la productividad.
  - **Braulio All in One Platform**: Plataforma integral para gestionar, medir y escalar soluciones de IA.
  - **Braulio Procesador Automático de Documentos**: Automatización de lectura, clasificación y procesamiento de documentos (facturas, órdenes de compra, etc.).
  - **Braulio FlowDesk**: Digitalización y automatización de procesos de negocio (comercial, operativo, soporte) con flujos de trabajo personalizados.
  - **Braulio Assistant**: Desarrollo de asistentes virtuales personalizados (chatbots, voicebots) con IA generativa para mejorar la experiencia del cliente/colaborador.
  - **Braulio Agent**: Ecosistema de agentes de IA especializados y preconfigurados para necesidades específicas (generación de leads, soporte, control de inventario).

- **Desarrollo Tecnológico e Implementación**: Despliegue de proyectos de software a medida.
  - **Proyecto Llave en Mano**: Soluciones integrales con alcance, plazos y costos fijos. Ideal para MVPs y proyectos con requerimientos claros.
  - **Equipo Dedicado / Extendido**: Asignación de roles o equipos completos que se integran a la operación del cliente para proyectos evolutivos.

- **Servicios Administrados y de Aceleración**: Soporte y evolución continua de soluciones digitales.
  - **Servicios Administrados**: Garantizan la continuidad operativa y el mantenimiento de soluciones existentes (packs de 30, 50 o 100 horas mensuales).
  - **Servicios de Aceleración**: Enfocados en agregar nuevas capacidades, optimizar rendimiento y expandir funcionalidades sobre un desarrollo previo.

- **Conocimiento y Capacitación**: Impulso a la adopción cultural y desarrollo de habilidades digitales.
  - **Sesiones Estratégicas**: Workshops de capacitación para equipos directivos sobre tendencias, desafíos y oportunidades de la IA.
  - **Programas de Adopción de IA**: Programas estructurados (teórico-prácticos) para formar equipos en el uso, gestión y aplicación de la IA.
  - **Webinars**: Sesiones de divulgación sobre tendencias y casos de aplicación de IA.`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getLeadRecommendations(leadData: LeadData, scoreResult: ScoreResult): Promise<Recommendations> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generationConfig = {
        temperature: 0.3,
        topK: 1,
        topP: 1,
        maxOutputTokens: 8192,
        response_mime_type: "application/json",
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const prompt = `
    Eres un agente de IA experto de Bombieri Lead Scorer Pro. Tu especialidad es la calificación de leads B2B para la consultora Bombieri.
    Tu objetivo principal es la PRECISIÓN. Debes analizar la necesidad del lead y hacer un "matcheo" exacto con el servicio más adecuado del portfolio.

    Has analizado un lead con los siguientes datos:
    - Fecha de contacto: ${leadData.contactDate}
    - Nombre del contacto: ${leadData.firstName} ${leadData.lastName}
    - Rol del contacto: ${leadData.role}
    - Industria: ${leadData.industry}
    - Facturación anual: ${leadData.revenue}
    - Cantidad de colaboradores: ${leadData.employees}
    - Presupuesto: ${leadData.budget}
    - Detalle de la necesidad: ${leadData.needDetails}
    - Origen del contacto: ${leadData.source}
    - Servicio de interés inicial: ${leadData.serviceInterest}

    El puntaje de calificación calculado es ${scoreResult.finalScore.toFixed(1)} sobre 10.
    El desglose de puntos por criterio fue: ${JSON.stringify(scoreResult.breakdown)}.

    El portfolio de servicios de Bombieri, organizado por categorías, es el siguiente:
    ${BOMB_SERVICES_PORTFOLIO}

    Basado en TODA esta información, tu tarea es generar una evaluación concisa y accionable para el equipo comercial.
    Tu análisis debe ser en dos pasos explícitos:
    1.  Identifica la CATEGORÍA de servicio principal que mejor responde a la necesidad del lead.
    2.  Dentro de esa categoría, selecciona el SERVICIO ESPECÍFICO más adecuado. Tu precisión aquí es crucial.
        - **Ejemplo de precisión:** Si el lead dice "necesito un chatbot para mi web", NO recomiendes la categoría "IA Operativa & Agentes Inteligentes". Debes recomendar el servicio específico "Braulio Assistant".

    El resultado final debe incluir este servicio específico, recomendar los próximos pasos, definir un nivel de prioridad, sugerir una acción inmediata y, muy importante, justificar tanto el puntaje como la recomendación del servicio específico.

    En la justificación del servicio (\`serviceJustification\`), explica por qué es adecuado y menciona explícitamente las fases o componentes clave de ese servicio tal como aparecen en el portfolio (por ejemplo, si recomiendas 'Programa Aliado Estratégico', menciona sus fases: 'Sensibilización, Dirección Estratégica y Acompañamiento'). Esto es crucial para dar contexto al equipo comercial.

    En los campos 'serviceCategory' y 'service' del JSON de respuesta, debes colocar los nombres EXACTOS tal como aparecen en el portfolio.

    Responde únicamente con un objeto JSON válido que siga este esquema. No incluyas ninguna explicación, texto introductorio, ni la sintaxis de markdown para JSON.
  `;

    const parts = [
        { text: prompt },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const response = result.response;
    const recommendations = JSON.parse(response.text()) as Recommendations;
    return recommendations;
}
