import { queryOllama } from './ollama.service.js';
import { getDatabaseInfo } from './database.service.js';
import { buildPrompt } from './prompt.service.js';

/**
 * Procesa el mensaje del usuario y genera respuesta con IA
 * @param {string} userMessage - Mensaje del usuario
 * @param {Array} conversationHistory - Últimos mensajes de la conversación
 * @returns {Promise<Object>} - Respuesta de la IA con metadatos
 */
export async function processChat(userMessage, conversationHistory) {
    try {
        console.log(`💬 Procesando: "${userMessage}"`);

        // 1. Analizar intención del usuario
        const intent = detectIntent(userMessage);
        console.log(`🎯 Intención detectada: ${intent}`);

        // 2. Obtener información relevante de la base de datos
        const dbInfo = await getDatabaseInfo(intent);

        // 3. Construir prompt con contexto
        const prompt = buildPrompt(userMessage, dbInfo, conversationHistory);

        // 4. Consultar a Ollama
        const aiResponse = await queryOllama(prompt);

        return {
            text: aiResponse,
            intent,
            sources: 'database + IA'
        };

    } catch (error) {
        console.error('❌ Error en processChat:', error);
        throw new Error('No pude procesar tu consulta. Por favor, intenta nuevamente.');
    }
}

/**
 * Detecta la intención del usuario para optimizar consultas SQL
 * @param {string} message - Mensaje del usuario
 * @returns {string} - Intención detectada
 */
function detectIntent(message) {
    const lowerMessage = message.toLowerCase();

    // Precios
    if (lowerMessage.match(/precio|costo|tarifa|cuanto cuesta|valor|cuánto/)) {
        return 'precio';
    }

    // Tamaños
    if (lowerMessage.match(/tamaño|medida|capacidad|grande|chico|mediano|m3|metro|dimensi/)) {
        return 'tamanos';
    }

    // Zonas de cobertura
    if (lowerMessage.match(/zona|cobertura|donde|ubicacion|entregan|llegan|atienden zona/)) {
        return 'zonas';
    }

    // Tierra
    if (lowerMessage.match(/tierra|negra|colorada|jardin|relleno|zarandeada/)) {
        return 'tierra';
    }

    // Contacto
    if (lowerMessage.match(/contacto|telefono|whatsapp|mail|email|comunicar|hablar/)) {
        return 'contacto';
    }

    // Horarios
    if (lowerMessage.match(/horario|cuando|atienden|abren|cierran|hora/)) {
        return 'horarios';
    }

    // General (por defecto)
    return 'general';
}
