import { queryOllama } from './ollama.service.js';
import { queryOpenAi, getOpenAiModel } from './openai.service.js';
import { getDatabaseInfo } from './database.service.js';
import { buildPrompt, buildChatMessages } from './prompt.service.js';

const resolveProvider = () => {
    const explicit = (process.env.AI_PROVIDER || '').toLowerCase();
    if (explicit) return explicit;
    if (process.env.GROQ_API_KEY) return 'groq';
    if (process.env.OPENAI_API_KEY) return 'openai';
    return 'ollama';
};
const AI_PROVIDER = resolveProvider();
const OPENAI_PROVIDERS = new Set(['openai', 'grok', 'xai', 'ns', 'groq']);

const isOpenAiProvider = OPENAI_PROVIDERS.has(AI_PROVIDER);
const normalizeProviderName = () => {
    if (AI_PROVIDER === 'grok' || AI_PROVIDER === 'xai') return 'grok';
    if (AI_PROVIDER === 'groq') return 'groq';
    if (AI_PROVIDER === 'openai' || AI_PROVIDER === 'ns') return 'openai';
    return 'ollama';
};

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

        let aiResponse;
        let modelUsed;
        const providerUsed = normalizeProviderName();

        if (isOpenAiProvider) {
            // 3. Construir mensajes con contexto para OpenAI-compatible (ej: Grok)
            const messages = buildChatMessages(userMessage, dbInfo, conversationHistory);

            // 4. Consultar proveedor OpenAI-compatible
            aiResponse = await queryOpenAi(messages);
            modelUsed = getOpenAiModel();
        } else {
            // 3. Construir prompt con contexto para Ollama
            const prompt = buildPrompt(userMessage, dbInfo, conversationHistory);

            // 4. Consultar a Ollama
            aiResponse = await queryOllama(prompt);
            modelUsed = process.env.OLLAMA_MODEL || 'llama3:8b';
        }

        return {
            text: aiResponse,
            intent,
            sources: 'database + IA',
            provider: providerUsed,
            model: modelUsed
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
