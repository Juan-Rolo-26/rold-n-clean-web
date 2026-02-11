import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3:8b';
const MAX_TOKENS = parseInt(process.env.OLLAMA_MAX_TOKENS) || 500;
const TEMPERATURE = parseFloat(process.env.OLLAMA_TEMPERATURE) || 0.3;

/**
 * Consulta a Ollama con el prompt construido
 * @param  {string} prompt - Prompt completo con contexto
 * @returns {Promise<string>} - Respuesta de la IA
 */
export async function queryOllama(prompt) {
    try {
        console.log('🤖 Consultando Ollama...');
        const startTime = Date.now();

        const response = await axios.post(
            `${OLLAMA_URL}/api/generate`,
            {
                model: MODEL,
                prompt: prompt,
                stream: false,
                options: {
                    temperature: TEMPERATURE,      // Baja temperatura = respuestas más predecibles
                    num_predict: MAX_TOKENS,       // Límite de tokens para optimizar
                    top_k: 40,                     // Limita vocabulario
                    top_p: 0.9,                    // Nucleus sampling
                    stop: ['\nUsuario:', '\nHumano:', 'Pregunta:', '\nP:']  // Detiene al llegar a nueva pregunta
                }
            },
            {
                timeout: 30000,  // 30 segundos timeout
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`✅ Respuesta generada en ${duration}s`);

        return response.data.response.trim();

    } catch (error) {
        console.error('❌ Error consultando Ollama:', error.message);

        if (error.code === 'ECONNREFUSED') {
            throw new Error('El servicio de IA no está disponible. Por favor, contacta al administrador.');
        }

        if (error.code === 'ETIMEDOUT') {
            throw new Error('La IA está tardando demasiado en responder. Por favor, intenta con una pregunta más simple.');
        }

        if (error.response?.status === 404) {
            throw new Error(`Modelo ${MODEL} no encontrado. Contacta al administrador.`);
        }

        throw new Error('Error al generar respuesta. Intenta nuevamente en unos segundos.');
    }
}

/**
 * Verifica que Ollama esté funcionando correctamente
 * @returns {Promise<Object>} - Estado de Ollama y modelos disponibles
 */
export async function checkOllamaHealth() {
    try {
        const response = await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 5000 });
        return {
            status: 'OK',
            models: response.data.models.map(m => m.name),
            url: OLLAMA_URL
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: error.message,
            url: OLLAMA_URL
        };
    }
}
