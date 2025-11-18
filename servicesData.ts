import { ServiceDetails } from './types';

export const SERVICES_DETAILS: Record<string, ServiceDetails> = {
  // Estrategia y Transformación
  'Programa Aliado Estratégico': {
    keyFeatures: ['Rediseño del modelo de gestión desde la estrategia', 'Fases: Sensibilización, Dirección Estratégica, Acompañamiento', 'Integración de cultura, estrategia y tecnología'],
    targetAudience: 'Empresas que buscan una transformación de negocio profunda y una alineación estratégica completa.',
    expectedOutcomes: ['Modelo de negocio optimizado y preparado para el futuro', 'Hoja de ruta de iniciativas clara y priorizada', 'Cultura organizacional alineada con la nueva estrategia digital.'],
  },
  'Programa Aliado Tecnológico': {
    keyFeatures: ['Optimización de operaciones con IA y digitalización', 'Fases: Sensibilización, Diagnóstico y Hoja de Ruta Digital, Acompañamiento', 'Enfoque en la eficiencia operativa y la adopción tecnológica.'],
    targetAudience: 'Organizaciones que necesitan modernizar sus operaciones, automatizar procesos y adoptar tecnologías de IA.',
    expectedOutcomes: ['Procesos de negocio más eficientes y automatizados', 'Hoja de ruta tecnológica para la digitalización', 'Mejora en la productividad y reducción de costos operativos.'],
  },

  // IA Operativa & Agentes Inteligentes
  'Braulio All in One Platform': {
    keyFeatures: ['Plataforma integral y modular', 'Permite gestionar, medir y escalar soluciones de IA', 'Base para todas las demás soluciones de Braulio.'],
    targetAudience: 'Empresas que buscan una solución centralizada para implementar y gestionar múltiples iniciativas de IA.',
    expectedOutcomes: ['Visibilidad y control centralizado de las soluciones de IA', 'Capacidad para escalar la automatización de forma sostenible', 'Reducción del tiempo de implementación de nuevas soluciones.'],
  },
  'Braulio Procesador Automático de Documentos': {
    keyFeatures: ['Automatización de lectura, clasificación y procesamiento de documentos', 'Soporte para facturas, órdenes de compra, etc.', 'Extracción de datos precisa y estructurada.'],
    targetAudience: 'Compañías con alto volumen de procesamiento de documentos manuales en áreas como finanzas, compras o logística.',
    expectedOutcomes: ['Reducción drástica del tiempo de procesamiento de documentos', 'Minimización de errores manuales', 'Liberación de recursos humanos para tareas de mayor valor.'],
  },
  'Braulio FlowDesk': {
    keyFeatures: ['Digitalización y automatización de procesos de negocio', 'Flujos de trabajo personalizados para áreas comerciales, operativas y de soporte', 'Integración con sistemas existentes.'],
    targetAudience: 'Negocios que necesitan optimizar y estandarizar flujos de trabajo complejos y con múltiples pasos.',
    expectedOutcomes: ['Mayor eficiencia y trazabilidad en los procesos', 'Reducción de cuellos de botella operativos', 'Mejora en la colaboración entre equipos.'],
  },
  'Braulio Assistant': {
    keyFeatures: ['Desarrollo de asistentes virtuales personalizados (chatbots, voicebots)', 'Uso de IA generativa para conversaciones naturales', 'Mejora de la experiencia del cliente y colaborador.'],
    targetAudience: 'Empresas que buscan mejorar la atención al cliente 24/7, automatizar respuestas a preguntas frecuentes o dar soporte interno.',
    expectedOutcomes: ['Mejora en la satisfacción del cliente (CSAT)', 'Reducción de costos en el centro de atención', 'Disponibilidad de soporte instantáneo y 24/7.'],
  },
  'Braulio Agent': {
    keyFeatures: ['Ecosistema de agentes de IA especializados y preconfigurados', 'Agentes para generación de leads, soporte, control de inventario, etc.', 'Implementación rápida para necesidades específicas.'],
    targetAudience: 'Organizaciones que buscan soluciones de IA rápidas y efectivas para problemas de negocio muy concretos y definidos.',
    expectedOutcomes: ['Solución rápida a un desafío de negocio específico', 'Automatización de tareas complejas y especializadas', 'Aumento de la productividad en áreas clave.'],
  },

  // Desarrollo Tecnológico e Implementación
  'Proyecto Llave en Mano': {
    keyFeatures: ['Soluciones integrales con alcance, plazos y costos fijos', 'Ideal para MVPs y proyectos con requerimientos claros', 'Gestión completa del proyecto por parte de Bombieri.'],
    targetAudience: 'Clientes que tienen una necesidad de software bien definida y prefieren un presupuesto cerrado y un cronograma predecible.',
    expectedOutcomes: ['Entrega de un producto de software funcional en tiempo y forma', 'Certeza en la inversión y el alcance', 'Rápida puesta en marcha de nuevas soluciones o MVPs.'],
  },
  'Equipo Dedicado / Extendido': {
    keyFeatures: ['Asignación de roles o equipos completos', 'Integración total en la operación del cliente', 'Ideal para proyectos evolutivos y de largo plazo.'],
    targetAudience: 'Empresas que necesitan aumentar su capacidad de desarrollo tecnológico con talento especializado y flexible.',
    expectedOutcomes: ['Flexibilidad y escalabilidad del equipo de desarrollo', 'Mayor control sobre el proceso y las prioridades del proyecto', 'Transferencia de conocimiento al equipo interno.'],
  },

  // Servicios Administrados y de Aceleración
  'Servicios Administrados': {
    keyFeatures: ['Garantizan la continuidad operativa y el mantenimiento', 'Soporte para soluciones existentes', 'Packs de horas mensuales (30, 50, 100).'],
    targetAudience: 'Clientes que ya tienen soluciones digitales en producción y necesitan asegurar su funcionamiento, estabilidad y seguridad.',
    expectedOutcomes: ['Alta disponibilidad y rendimiento de las aplicaciones', 'Resolución proactiva de incidentes', 'Liberación del equipo interno de tareas de mantenimiento.'],
  },
  'Servicios de Aceleración': {
    keyFeatures: ['Enfocados en agregar nuevas capacidades y optimizar rendimiento', 'Evolución de desarrollos previos', 'Expansión de funcionalidades.'],
    targetAudience: 'Negocios que buscan evolucionar y mejorar continuamente sus aplicaciones existentes para adaptarse a nuevas necesidades del mercado.',
    expectedOutcomes: ['Mejora continua y adición de valor al software existente', 'Optimización del rendimiento y la experiencia de usuario', 'Adaptación rápida a los cambios del negocio.'],
  },

  // Conocimiento y Capacitación
  'Sesiones Estratégicas': {
    keyFeatures: ['Workshops de capacitación para equipos directivos', 'Análisis de tendencias, desafíos y oportunidades de la IA', 'Enfoque en la visión estratégica.'],
    targetAudience: 'Líderes y equipos directivos que necesitan comprender el impacto de la IA en su industria y negocio.',
    expectedOutcomes: ['Visión estratégica clara sobre cómo aprovechar la IA', 'Alineación del equipo directivo', 'Identificación de oportunidades de negocio impulsadas por la IA.'],
  },
  'Programas de Adopción de IA': {
    keyFeatures: ['Programas estructurados teórico-prácticos', 'Formación de equipos en el uso, gestión y aplicación de la IA', 'Fomento de una cultura data-driven.'],
    targetAudience: 'Equipos y departamentos que necesitan desarrollar habilidades prácticas en IA para aplicarlas en su día a día.',
    expectedOutcomes: ['Equipos internos capacitados para usar herramientas de IA', 'Aumento de la adopción y el éxito de las iniciativas de IA', 'Cultura de innovación y mejora continua.'],
  },
  'Webinars': {
    keyFeatures: ['Sesiones de divulgación sobre tendencias y casos de aplicación de IA', 'Formato accesible y de corta duración', 'Abierto a audiencias amplias.'],
    targetAudience: 'Público general, clientes potenciales y actuales interesados en mantenerse actualizados sobre las últimas tendencias en IA.',
    expectedOutcomes: ['Generación de conciencia sobre las capacidades de la IA', 'Posicionamiento de Bombieri como experto en el sector', 'Captación de interés y potenciales leads.'],
  },
};
