# 🤖 ARQUITECTURA PROFESIONAL IA - PARTE 2

## 🔗 SERVICIO DE OLLAMA

```javascript
// backend/src/services/ollama.service.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3:8b';
const MAX_TOKENS = parseInt(process.env.OLLAMA_MAX_TOKENS) || 500;
const TEMPERATURE = parseFloat(process.env.OLLAMA_TEMPERATURE) || 0.3;

/**
 * Consulta a Ollama con el prompt construido
 */
export async function queryOllama(prompt) {
  try {
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
          stop: ['\nUsuario:', '\nHumano:', 'Pregunta:']  // Detiene al llegar a nueva pregunta
        }
      },
      {
        timeout: 30000,  // 30 segundos timeout
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.response.trim();

  } catch (error) {
    console.error('Error consultando Ollama:', error.message);

    if (error.code === 'ECONNREFUSED') {
      throw new Error('El servicio de IA no está disponible. Por favor, contacta al administrador.');
    }

    if (error.response?.status === 404) {
      throw new Error(`Modelo ${MODEL} no encontrado. Ejecuta: ollama pull ${MODEL}`);
    }

    throw new Error('Error al generar respuesta. Intenta nuevamente en unos segundos.');
  }
}

/**
 * Verifica que Ollama esté funcionando
 */
export async function checkOllamaHealth() {
  try {
    const response = await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 5000 });
    return {
      status: 'OK',
      models: response.data.models.map(m => m.name)
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: error.message
    };
  }
}
```

---

## 🗃️ CONFIGURACIÓN DE BASE DE DATOS

```javascript
// backend/src/config/database.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test de conexión
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado a MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error conectando a MySQL:', err.message);
  });
```

---

## 🛡️ MIDDLEWARE DE ERRORES

```javascript
// backend/src/middleware/errorHandler.js

export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

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
      error: 'Error de configuración de base de datos'
    });
  }

  // Error de Ollama
  if (err.message.includes('Ollama') || err.message.includes('IA')) {
    return res.status(503).json({
      error: err.message
    });
  }

  // Error genérico
  res.status(500).json({
    error: 'Ha ocurrido un error. Por favor, intenta nuevamente.'
  });
}
```

---

## 🎨 INTEGRACIÓN CON FRONTEND

### Modificar ChatBot.tsx

```typescript
// src/components/ChatBot.tsx
// Agregar estas importaciones y modificar el código existente

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Modificar la función handleSendMessage
const handleSendMessage = async (text: string) => {
  if (!text.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: text.trim(),
    sender: 'user',
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue('');
  setIsTyping(true);

  try {
    // Construir historial para enviar al backend (últimos 3 mensajes)
    const conversationHistory = messages.slice(-3).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    // Llamada al backend IA
    const response = await axios.post(
      `${API_URL}/api/chat`,
      {
        message: text.trim(),
        conversationHistory: conversationHistory
      },
      {
        timeout: 30000,  // 30 segundos
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.data.response,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);

  } catch (error) {
    console.error('Error al comunicarse con la IA:', error);

    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '⚠️ No pude procesar tu mensaje en este momento. Por favor, intenta nuevamente o contáctanos por WhatsApp: +54 9 341 362-3232',
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, errorMessage]);
    setIsTyping(false);
  }
};

// Eliminar la función getBotResponse() ya que ahora usamos el backend
```

### Variables de Entorno Frontend

```env
# frontend/.env
VITE_API_URL=http://localhost:3001
```

Para producción:
```env
# frontend/.env.production
VITE_API_URL=https://tu-dominio.com/api
```

---

## ⚡ OPTIMIZACIÓN Y PERFORMANCE

### 1. Configuración Optimizada de Ollama

```bash
# Configurar variables de entorno para optimizar
export OLLAMA_NUM_PARALLEL=1          # Solo 1 request simultáneo
export OLLAMA_MAX_LOADED_MODELS=1     # Solo 1 modelo en memoria
export OLLAMA_FLASH_ATTENTION=1       # Usar FlashAttention si está disponible
```

Agregar a `/etc/systemd/system/ollama.service`:
```ini
Environment="OLLAMA_NUM_PARALLEL=1"
Environment="OLLAMA_MAX_LOADED_MODELS=1"
Environment="OLLAMA_FLASH_ATTENTION=1"
```

### 2. Optimizar Uso de RAM

**Ollama Model File Personalizado**

```dockerfile
# Crear: models/llama3-optimized.modelfile
FROM llama3:8b

# Parámetros optimizados para VPS con 8GB RAM
PARAMETER num_ctx 2048        # Contexto reducido (por defecto 4096)
PARAMETER num_gpu 0           # Desactivar GPU (solo CPU)
PARAMETER num_thread 4        # 4 threads CPU
PARAMETER repeat_penalty 1.1
PARAMETER temperature 0.3
PARAMETER top_k 40
PARAMETER top_p 0.9
```

Crear modelo optimizado:
```bash
ollama create llama3-volquetes -f models/llama3-optimized.modelfile
```

Usar en `.env`:
```env
OLLAMA_MODEL=llama3-volquetes
```

### 3. Cacheo de Respuestas Frecuentes

```javascript
// backend/src/services/cache.service.js
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 30; // 30 minutos

export function getCachedResponse(key) {
  const cached = cache.get(key);
  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > CACHE_TTL;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return cached.response;
}

export function setCachedResponse(key, response) {
  cache.set(key, {
    response,
    timestamp: Date.now()
  });
}

export function clearCache() {
  cache.clear();
}
```

Modificar `chat.service.js`:
```javascript
import { getCachedResponse, setCachedResponse } from './cache.service.js';

export async function processChat(userMessage, conversationHistory) {
  // Intentar obtener de caché para preguntas frecuentes simples
  const cacheKey = userMessage.toLowerCase().trim();
  const cached = getCachedResponse(cacheKey);

  if (cached && conversationHistory.length === 0) {
    return { text: cached, intent: 'cached', sources: 'cache' };
  }

  // ... resto del código ...

  // Cachear solo si es pregunta simple sin contexto
  if (conversationHistory.length === 0 && aiResponse.length < 500) {
    setCachedResponse(cacheKey, aiResponse);
  }

  return { text: aiResponse, intent, sources: 'database' };
}
```

### 4. Limitador de Rate (Anti-Spam)

```javascript
// backend/src/middleware/rateLimiter.js
const requestCounts = new Map();
const MAX_REQUESTS = 10;  // máximo 10 requests
const WINDOW_MS = 60000;  // por minuto

export function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }

  const requests = requestCounts.get(ip);
  
  // Limpiar requests antiguos
  const recentRequests = requests.filter(time => now - time < WINDOW_MS);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Demasiadas solicitudes. Por favor, espera un momento.'
    });
  }

  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  
  next();
}
```

Agregar en `server.js`:
```javascript
import { rateLimiter } from './middleware/rateLimiter.js';

app.use('/api/chat', rateLimiter);
```

---

## 🚀 DEPLOYMENT EN VPS

### Script de Setup Completo

```bash
#!/bin/bash
# scripts/setup-complete.sh

echo "🚀 Iniciando setup completo de Volquetes Roldán IA..."

# 1. Actualizar sistema
sudo apt update && sudo apt upgrade -y

# 2. Instalar dependencias
sudo apt install -y curl wget git build-essential mysql-server nginx

# 3. Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Instalar Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 5. Configurar Ollama como servicio
sudo tee /etc/systemd/system/ollama.service > /dev/null <<EOF
[Unit]
Description=Ollama AI Service
After=network.target

[Service]
Type=simple
User=$USER
ExecStart=/usr/local/bin/ollama serve
Restart=always
Environment="OLLAMA_HOST=127.0.0.1:11434"
Environment="OLLAMA_NUM_PARALLEL=1"
Environment="OLLAMA_MAX_LOADED_MODELS=1"

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable ollama
sudo systemctl start ollama

# 6. Descargar modelo Llama 3
echo "📥 Descargando modelo Llama 3 8B (4.7GB)..."
ollama pull llama3:8b

# 7. Configurar MySQL
sudo mysql -e "CREATE DATABASE IF NOT EXISTS volquetes_roldan;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'volquetes_user'@'localhost' IDENTIFIED BY 'password_seguro_aqui';"
sudo mysql -e "GRANT ALL PRIVILEGES ON volquetes_roldan.* TO 'volquetes_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# 8. Importar schema
mysql -u volquetes_user -p volquetes_roldan < database/schema.sql
mysql -u volquetes_user -p volquetes_roldan < database/seed.sql

# 9. Instalar dependencias del backend
cd backend
npm install
cd ..

# 10. Instalar dependencias del frontend
cd frontend
npm install
npm run build
cd ..

echo "✅ Setup completo!"
echo ""
echo "Próximos pasos:"
echo "1. Edita backend/.env con tus credenciales"
echo "2. Ejecuta: npm run start en backend/"
echo "3. Configura Nginx para servir el frontend"
```

### Script de Inicio

```bash
#!/bin/bash
# scripts/start-services.sh

echo "🚀 Iniciando todos los servicios..."

# 1. MySQL
sudo systemctl start mysql
echo "✅ MySQL iniciado"

# 2. Ollama
sudo systemctl start ollama
echo "✅ Ollama iniciado"

# Esperar a que Ollama esté listo
sleep 5

# 3. Backend
cd backend
npm start &
BACKEND_PID=$!
echo "✅ Backend iniciado (PID: $BACKEND_PID)"

# 4. Frontend (dev)
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend iniciado (PID: $FRONTEND_PID)"

echo ""
echo "📊 Servicios ejecutándose:"
echo "- MySQL: localhost:3306"
echo "- Ollama: localhost:11434"
echo "- Backend: localhost:3001"
echo "- Frontend: localhost:5173"
echo ""
echo "Para detener: kill $BACKEND_PID $FRONTEND_PID"
```

### Nginx Configuration (Producción)

```nginx
# /etc/nginx/sites-available/volquetes-roldan

server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    # Frontend
    location / {
        root /var/www/volquetes-roldan/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # Timeouts largos para IA
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Logs
    access_log /var/log/nginx/volquetes-access.log;
    error_log /var/log/nginx/volquetes-error.log;
}
```

Activar sitio:
```bash
sudo ln -s /etc/nginx/sites-available/volquetes-roldan /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📊 MONITOREO Y MANTENIMIENO

### Script de Monitoreo

```bash
#!/bin/bash
# scripts/monitor.sh

echo "📊 Estado de servicios Volquetes Roldán IA"
echo "=========================================="

# MySQL
if systemctl is-active --quiet mysql; then
    echo "✅ MySQL: ACTIVO"
else
    echo "❌ MySQL: INACTIVO"
fi

# Ollama
if systemctl is-active --quiet ollama; then
    echo "✅ Ollama: ACTIVO"
    
    # Test Ollama API
    if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo "   └─ API respondiendo correctamente"
    else
        echo "   └─ ⚠️  API no responde"
    fi
else
    echo "❌ Ollama: INACTIVO"
fi

# Backend
if pgrep -f "node.*server.js" > /dev/null; then
    echo "✅ Backend: ACTIVO"
    
    # Test endpoint
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo "   └─ Endpoint /health OK"
    else
        echo "   └─ ⚠️  Endpoint no responde"
    fi
else
    echo "❌ Backend: INACTIVO"
fi

# Uso de recursos
echo ""
echo "💾 Uso de Recursos:"
echo "RAM: $(free -h | awk '/^Mem/ {print $3 "/" $2}')"
echo "CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')%"
echo "Disco: $(df -h / | awk 'NR==2 {print $3 "/" $2 " (" $5 ")"}')"
```

---

## 📈 MEJORES PRÁCTICAS

### 1. Evitar que la IA se Salga del Contexto

- ✅ **System prompt estricto** con instrucciones claras
- ✅ **Lista de stop words** en la configuración de Ollama
- ✅ **Validación de intención** antes de consultar IA
- ✅ **Límite de tokens** para respuestas concisas

### 2. Mejorar Velocidad de Respuesta

- ✅ **Modelo optimizado**: Llama 3 8B es buenbalance entre calidad y velocidad
- ✅ **Contexto reducido**: 2048 tokens en vez de 4096
- ✅ **Cache de respuestas frecuentes**
- ✅ **Consultas SQL optimizadas** con índices

### 3. Reducir Consumo de Recursos

- ✅ **Un solo modelo en memoria**
- ✅ **Requests serializados** (no paralelos)
- ✅ **Temperature baja** (0.3) = menos procesamiento
- ✅ **Rate limiting** para prevenir abuso

### 4. Backup y Recuperación

```bash
#!/bin/bash
# scripts/backup.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/volquetes"

mkdir -p $BACKUP_DIR

# Backup MySQL
mysqldump -u volquetes_user -p volquetes_roldan > $BACKUP_DIR/db_$TIMESTAMP.sql

# Backup código
tar -czf $BACKUP_DIR/code_$TIMESTAMP.tar.gz /var/www/volquetes-roldan

# Limpiar backups antiguos (> 7 días)
find $BACKUP_DIR -type f -mtime +7 -delete

echo "✅ Backup completado: $TIMESTAMP"
```

---

## 🎯 PRÓXIMOS PASOS

1. **Ejecutar** `setup-complete.sh` en tu VPS
2. **Configurar** variables de entorno en `backend/.env`
3. **Importar** datos de tu negocio en la base de datos
4. **Probar** el sistema localmente
5. **Configurar** Nginx para producción
6. **Implementar** SSL con Let's Encrypt
7. **Monitorear** logs y performance

---

## 📞 SOPORTE

Si encuentras problemas:

1. Revisa logs: `sudo journalctl -u ollama -f`
2. Verifica servicios: `./scripts/monitor.sh`
3. Consulta: [Ollama Docs](https://github.com/ollama/ollama)

---

**¡Sistema listo para producción! 🚀**
