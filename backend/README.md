# 🤖 Backend IA - Volquetes Roldán

Sistema de IA conversacional con **Ollama + Llama 3** para asistente virtual empresarial.

## 📋 Características

- ✅ **100% Gratuito**: Sin costos de APIs externas
- ✅ **IA Local**: Ollama + Llama 3 8B
- ✅ **Base de Datos Real**: Consultas a MySQL
- ✅ **Sin Alucinaciones**: Solo responde con datos verificados
- ✅ **Optimizado**: Para VPS con 8GB RAM
- ✅ **Memoria Conversacional**: Últimos 3 mensajes

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno

```bash
cp .env.example .env
nano .env
```

Configurar:
- `DB_USER` y `DB_PASSWORD`: Credenciales MySQL
- `DB_NAME`: `volquetes_roldan`
- `OLLAMA_URL`: `http://localhost:11434`

#### Opción Grok (xAI)

Si querés usar **Grok** en lugar de Ollama:

```env
AI_PROVIDER=grok
OPENAI_BASE_URL=https://api.x.ai/v1
OPENAI_API_KEY=tu_api_key
OPENAI_MODEL=grok-2-latest
```

Este backend debe correr en un servidor con Node (VPS, Render, Railway, etc.). No funciona en hosting compartido sin Node.

#### Opción Groq

Si querés usar **Groq**:

```env
AI_PROVIDER=groq
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_API_KEY=tu_api_key
GROQ_MODEL=llama3-8b-8192
```

Podés cambiar `GROQ_MODEL` por cualquier modelo disponible en tu cuenta.

### 3. Instalar y Configurar MySQL

```bash
# Instalar MySQL (si no lo tienes)
sudo apt install mysql-server

# Crear base de datos e importar esquema
mysql -u root -p < ../database/schema.sql

# Importar datos de ejemplo
mysql -u root -p < ../database/seed.sql
```

### 4. Instalar Ollama

```bash
# Instalar Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Descargar modelo Llama 3 8B (4.7GB)
ollama pull llama3:8b

# Iniciar servicio
ollama serve
```

**Dejar Ollama corriendo en una terminal separada**

### 5. Iniciar Backend

```bash
# En otra terminal
cd backend
npm start
```

El servidor estará en: `http://localhost:3001`

## 🧪 Probar el Sistema

### Test de Health Check

```bash
curl http://localhost:3001/health
```

### Test de Ollama

```bash
curl http://localhost:3001/api/chat/health
```

### Test de Chat

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "¿Cuánto cuesta alquilar un volquete?"
  }'
```

## 📚 API Endpoints

### POST /api/chat

Procesa mensaje del usuario y devuelve respuesta de IA.

**Request:**
```json
{
  "message": "¿Qué tamaños de volquetes tienen?",
  "conversationHistory": [
    { "role": "user", "content": "Hola" },
    { "role": "assistant", "content": "¡Hola! ¿En qué puedo ayudarte?" }
  ]
}
```

**Response:**
```json
{
  "response": "Tenemos 4 tamaños: Chico (1.5m³), Mediano (3m³), Grande (6m³) y con Barandas (7m³)...",
  "timestamp": "2026-02-11T05:00:00.000Z",
  "model": "llama3:8b",
  "intent": "tamanos",
  "sources": "database + IA"
}
```

### GET /api/chat/health

Verifica estado del backend y Ollama.

**Response:**
```json
{
  "backend": "OK",
  "ollama": {
    "status": "OK",
    "models": ["llama3:8b"],
    "url": "http://localhost:11434"
  },
  "timestamp": "2026-02-11T05:00:00.000Z"
}
```

## 🗂️ Estructura del Proyecto

```
backend/
├── src/
│   ├── server.js              # Servidor Express principal
│   ├── config/
│   │   └── database.js        # Configuración MySQL
│   ├── routes/
│   │   └── chat.js            # Endpoint /api/chat
│   ├── services/
│   │   ├── chat.service.js    # Lógica principal del chat
│   │   ├── ollama.service.js  # Comunicación con Ollama
│   │   ├── database.service.js # Consultas SQL
│   │   └── prompt.service.js  # Construcción de prompts
│   └── middleware/
│       └── errorHandler.js    # Manejo de errores
├── .env                       # Variables de entorno
├── package.json
└── README.md
```

## ⚙️ Configuración Avanzada

### Optimizar Ollama para VPS

Editar `/etc/systemd/system/ollama.service`:

```ini
[Service]
Environment="OLLAMA_NUM_PARALLEL=1"
Environment="OLLAMA_MAX_LOADED_MODELS=1"
Environment="OLLAMA_FLASH_ATTENTION=1"
```

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

### Ajustar Parámetros de IA

En `.env`:

```env
# Respuestas más creativas (0.1 - 1.0)
OLLAMA_TEMPERATURE=0.5

# Respuestas más largas (100 - 2000)
OLLAMA_MAX_TOKENS=800
```

## 🐛 Troubleshooting

### Error: "ECONNREFUSED localhost:11434"

**Problema**: Ollama no está corriendo.

**Solución**:
```bash
# Iniciar Ollama
ollama serve

# O como servicio
sudo systemctl start ollama
```

### Error: "Modelo no encontrado"

**Problema**: Modelo Llama 3 no descargado.

**Solución**:
```bash
ollama pull llama3:8b
ollama list  # Verificar
```

### Error: "ER_ACCESS_DENIED_ERROR"

**Problema**: Credenciales MySQL incorrectas.

**Solución**:
```bash
# Verificar .env
cat .env | grep DB_

# Crear usuario MySQL
mysql -u root -p
CREATE USER 'volquetes_user'@'localhost' IDENTIFIED BY 'tu_password';
GRANT ALL PRIVILEGES ON volquetes_roldan.* TO 'volquetes_user'@'localhost';
FLUSH PRIVILEGES;
```

### Respuestas muy lentas

**Solución 1**: Reducir tokens máximos
```env
OLLAMA_MAX_TOKENS=300
```

**Solución 2**: Usar Mistral (más rápido)
```bash
ollama pull mistral:7b
```

Cambiar en `.env`:
```env
OLLAMA_MODEL=mistral:7b
```

## 📊 Monitoreo

```bash
# Ver logs de Ollama
sudo journalctl -u ollama -f

# Ver logs del backend
npm start | tee backend.log

# Monitorear recursos
htop
```

## 🚀 Deployment en Producción

Ver documentación completa en:
- `docs/AI_ARCHITECTURE.md`
- `docs/AI_ARCHITECTURE_PART2.md`

## 📞 Soporte

Si encuentras problemas:

1. Verifica que todos los servicios estén corriendo
2. Revisa los logs
3. Consulta la documentación completa en `/docs`

---

**¡Sistema listo! 🎉**
