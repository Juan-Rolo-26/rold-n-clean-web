import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
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
const modelLabel = isOpenAiProvider
    ? (AI_PROVIDER === 'groq'
        ? (process.env.GROQ_MODEL || process.env.OPENAI_MODEL || 'llama3-8b-8192')
        : (process.env.OPENAI_MODEL || process.env.GROQ_MODEL || 'grok-2-latest'))
    : (process.env.OLLAMA_MODEL || 'llama3:8b');

const allowedOrigins = (process.env.FRONTEND_URL || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

const defaultDevOrigins = ['http://localhost:8080', 'http://localhost:5173'];
const effectiveOrigins = allowedOrigins.length > 0
    ? allowedOrigins
    : defaultDevOrigins;

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        if (effectiveOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS no permitido para el origen: ${origin}`));
    },
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        provider: AI_PROVIDER,
        model: modelLabel
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        message: '🤖 Backend IA Volquetes Roldán funcionando correctamente',
        provider: AI_PROVIDER,
        model: modelLabel,
        ollama_url: process.env.OLLAMA_URL
    });
});

// Routes
app.use('/api/chat', chatRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        path: req.path
    });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║   🤖 BACKEND IA VOLQUETES ROLDÁN                      ║');
    console.log('╠════════════════════════════════════════════════════════╣');
    console.log(`║   🚀 Servidor:     http://localhost:${PORT}              ║`);
    console.log(`║   🧠 Proveedor:    ${AI_PROVIDER}                           ║`);
    console.log(`║   📊 Modelo:       ${modelLabel}              ║`);
    if (!isOpenAiProvider) {
        console.log(`║   🧠 Ollama:       ${process.env.OLLAMA_URL}         ║`);
    }
    console.log(`║   🗄️  Base de Datos: ${process.env.DB_NAME || 'volquetes_roldan'}      ║`);
    console.log('╚════════════════════════════════════════════════════════╝');
});

export default app;
