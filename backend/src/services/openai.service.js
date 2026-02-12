import axios from 'axios';

const PROVIDER = (process.env.AI_PROVIDER || '').toLowerCase();
const IS_GROQ = PROVIDER === 'groq';
const DEFAULT_OPENAI_BASE = 'https://api.x.ai/v1';
const DEFAULT_GROQ_BASE = 'https://api.groq.com/openai/v1';

const OPENAI_BASE_URL = (
    IS_GROQ
        ? (process.env.GROQ_BASE_URL || DEFAULT_GROQ_BASE)
        : (process.env.OPENAI_BASE_URL || process.env.GROQ_BASE_URL || DEFAULT_OPENAI_BASE)
).replace(/\/+$/, '');

const OPENAI_API_KEY = (
    IS_GROQ
        ? process.env.GROQ_API_KEY
        : (process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY)
) || '';

const OPENAI_MODEL = IS_GROQ
    ? (process.env.GROQ_MODEL || 'llama3-8b-8192')
    : (process.env.OPENAI_MODEL || process.env.GROQ_MODEL || 'grok-2-latest');
const OPENAI_MAX_TOKENS = parseInt(process.env.OPENAI_MAX_TOKENS || '500', 10);
const OPENAI_TEMPERATURE = parseFloat(process.env.OPENAI_TEMPERATURE || '0.3');
const OPENAI_TOP_P = parseFloat(process.env.OPENAI_TOP_P || '0.9');
const OPENAI_TIMEOUT_MS = parseInt(process.env.OPENAI_TIMEOUT_MS || '30000', 10);

export function getOpenAiModel() {
    return OPENAI_MODEL;
}

export function getOpenAiBaseUrl() {
    return OPENAI_BASE_URL;
}

const buildChatCompletionsUrl = () => `${OPENAI_BASE_URL}/chat/completions`;
const buildModelsUrl = () => `${OPENAI_BASE_URL}/models`;

/**
 * Consulta a un proveedor OpenAI-compatible (ej: xAI/Grok)
 * @param {Array} messages - Mensajes del chat
 * @returns {Promise<string>} - Respuesta de la IA
 */
export async function queryOpenAi(messages) {
    if (!OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY o GROQ_API_KEY no configurada. Contacta al administrador.');
    }

    if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error('No hay mensajes para enviar a la IA.');
    }

    try {
        console.log('🤖 Consultando proveedor OpenAI-compatible...');
        const startTime = Date.now();

        const response = await axios.post(
            buildChatCompletionsUrl(),
            {
                model: OPENAI_MODEL,
                messages,
                temperature: OPENAI_TEMPERATURE,
                max_tokens: OPENAI_MAX_TOKENS,
                top_p: OPENAI_TOP_P,
                stream: false,
            },
            {
                timeout: OPENAI_TIMEOUT_MS,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`✅ Respuesta generada en ${duration}s`);

        const content = response.data?.choices?.[0]?.message?.content;
        if (!content || typeof content !== 'string') {
            throw new Error('La IA no devolvió contenido.');
        }

        return content.trim();
    } catch (error) {
        const status = error.response?.status;
        const apiMessage = error.response?.data?.error?.message;
        const message = apiMessage || error.message;

        console.error('❌ Error consultando OpenAI-compatible:', message);

        if (status === 401 || status === 403) {
            throw new Error('API key inválida o sin permisos. Contacta al administrador.');
        }

        if (status === 429) {
            throw new Error('Demasiadas solicitudes a la IA. Intenta nuevamente en unos segundos.');
        }

        if (error.code === 'ETIMEDOUT') {
            throw new Error('La IA está tardando demasiado en responder. Intenta nuevamente.');
        }

        throw new Error('Error al generar respuesta. Intenta nuevamente en unos segundos.');
    }
}

/**
 * Verifica que el proveedor OpenAI-compatible esté disponible
 * @returns {Promise<Object>} - Estado y modelos
 */
export async function checkOpenAiHealth() {
    if (!OPENAI_API_KEY) {
        return {
            status: 'ERROR',
            message: 'OPENAI_API_KEY o GROQ_API_KEY no configurada',
            url: OPENAI_BASE_URL,
        };
    }

    try {
        const response = await axios.get(buildModelsUrl(), {
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
        });

        const models = Array.isArray(response.data?.data)
            ? response.data.data.map((model) => model.id)
            : [];

        return {
            status: 'OK',
            models,
            url: OPENAI_BASE_URL,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: error.message,
            url: OPENAI_BASE_URL,
        };
    }
}
