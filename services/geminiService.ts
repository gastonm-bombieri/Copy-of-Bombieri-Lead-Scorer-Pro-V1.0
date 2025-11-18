import { LeadData, ScoreResult, Recommendations, HistoricLead } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Envía los datos del lead y el resultado del puntaje al backend para obtener recomendaciones de la IA.
 * @param leadData - Los datos del lead.
 * @param scoreResult - El resultado del puntaje.
 * @returns Una promesa que se resuelve con las recomendaciones generadas por la IA.
 */
export async function analyzeLead(leadData: LeadData, scoreResult: ScoreResult): Promise<Recommendations> {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ leadData, scoreResult }),
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener recomendaciones del backend:", error);
    throw new Error('No se pudieron obtener las recomendaciones. Verifique que el servidor backend esté funcionando.');
  }
}

/**
 * Guarda un lead completo (incluyendo recomendaciones) en la base de datos a través del backend.
 * @param historicLead - El objeto de lead histórico para guardar.
 * @returns Una promesa que se resuelve con el lead guardado.
 */
export async function saveLead(historicLead: Omit<HistoricLead, 'id'>): Promise<HistoricLead> {
    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(historicLead),
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al guardar el lead en el backend:", error);
      throw new Error('No se pudo guardar el lead. Verifique la conexión con el servidor.');
    }
  }

/**
 * Recupera el historial de leads procesados desde el backend.
 * @returns Una promesa que se resuelve con un array de leads históricos.
 */
export async function getLeadHistory(): Promise<HistoricLead[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/leads`);

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener el historial de leads del backend:", error);
    // En caso de error (ej. el backend no está disponible), devolvemos un array vacío
    // para no bloquear la aplicación. Se podría manejar un estado de error más explícito.
    return [];
  }
}
