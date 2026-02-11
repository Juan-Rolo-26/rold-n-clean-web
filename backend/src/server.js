import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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
        model: process.env.OLLAMA_MODEL
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        message: '🤖 Backend IA Volquetes Roldán funcionando correctamente',
        ollama_url: process.env.OLLAMA_URL,
        model: process.env.OLLAMA_MODEL
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
    console.log(`║   🧠 Ollama:       ${process.env.OLLAMA_URL}         ║`);
    console.log(`║   📊 Modelo:       ${process.env.OLLAMA_MODEL || 'llama3:8b'}              ║`);
    console.log(`║   🗄️  Base de Datos: ${process.env.DB_NAME || 'volquetes_roldan'}      ║`);
    console.log('╚════════════════════════════════════════════════════════╝');
});

export default app;
