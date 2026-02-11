export function errorHandler(err, req, res, next) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);

    // Error de validación
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Datos inválidos',
            details: err.message
        });
    }

    // Error de base de datos
    if (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_DB_ERROR') {
        return res.status(500).json({
            error: 'Error de configuración de base de datos. Contacta al administrador.'
        });
    }

    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
        return res.status(500).json({
            error: 'Error de autenticación de base de datos. Verifica las credenciales.'
        });
    }

    // Error de Ollama
    if (err.message.includes('Ollama') || err.message.includes('IA') || err.message.includes('modelo')) {
        return res.status(503).json({
            error: err.message || 'El servicio de IA no está disponible en este momento.'
        });
    }

    // Error de red/timeout
    if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
        return res.status(503).json({
            error: 'Servicio temporalmente no disponible. Por favor, intenta nuevamente.'
        });
    }

    // Error genérico
    res.status(500).json({
        error: 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.',
        ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
}
