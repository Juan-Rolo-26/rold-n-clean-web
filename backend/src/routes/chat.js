import express from 'express';
import { processChat } from '../services/chat.service.js';
import { checkOllamaHealth } from '../services/ollama.service.js';

const router = express.Router();

/**
 * POST /api/chat
 * Procesa mensaje del usuario y devuelve respuesta de IA
 * 
 * Body: {
 *   message: string,
 *   conversationHistory: Array<{role: 'user'|'assistant', content: string}>
 * }
 */
router.post('/', async (req, res, next) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        // Validación
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                error: 'El campo "message" es requerido y debe ser texto'
            });
        }

        if (message.trim().length === 0) {
            return res.status(400).json({
                error: 'El mensaje no puede estar vacío'
            });
        }

        if (message.length > 500) {
            return res.status(400).json({
                error: 'El mensaje es demasiado largo (máximo 500 caracteres)'
            });
        }

        // Limitar histórico a últimos 3 mensajes (para optimizar)
        const limitedHistory = conversationHistory.slice(-3);

        // Procesar mensaje
        const result = await processChat(message, limitedHistory);

        // Respuesta exitosa
        res.json({
            response: result.text,
            timestamp: new Date().toISOString(),
            model: process.env.OLLAMA_MODEL,
            intent: result.intent,
            sources: result.sources
        });

    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/chat/health
 * Verifica estado de Ollama
 */
router.get('/health', async (req, res) => {
    const ollamaStatus = await checkOllamaHealth();

    res.json({
        backend: 'OK',
        ollama: ollamaStatus,
        timestamp: new Date().toISOString()
    });
});

export default router;
