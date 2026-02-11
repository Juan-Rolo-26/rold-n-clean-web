# 🤖 VOLQUETES ROLDÁN - SISTEMA IA COMPLETO

Sistema de asistente virtual empresarial con **Inteligencia Artificial local** usando Ollama + Llama 3.

## 🎯 Características Principales

- ✅ **100% Gratuito** - Sin costos de APIs externas
- ✅ **IA Local** - Ollama + Llama 3 8B corriendo en tu VPS
- ✅ **Datos Reales** - Consultas a base de datos MySQL
- ✅ **Sin Alucinaciones** - Solo responde con información verificada
- ✅ **Optimizado** - Para VPS con 8GB RAM
- ✅ **Memoria Conversacional** - Contextualiza últimos 3 mensajes
- ✅ **Frontend Integrado** - ChatBot React ya implementado

## 📁 Estructura del Proyecto

```
rold-n-clean-web/
├── docs/                       # 📚 Documentación completa
│   ├── AI_ARCHITECTURE.md      #    Arquitectura del sistema IA
│   ├── AI_ARCHITECTURE_PART2.md#    Optimización y deployment
│   └── INSTALACION_RAPIDA.md   #    Guía de instalación paso a paso
│
├── backend/                    # 🔧 Backend Node.js + Express
│   ├── src/
│   │   ├── server.js           #    Servidor principal
│   │   ├── config/             #    Configuraciones (DB, Ollama)
│   │   ├── routes/             #    API endpoints
│   │   ├── services/           #    Lógica de negocio
│   │   └── middleware/         #    Middlewares Express
│   ├── .env                    #    Variables de entorno
│   ├── package.json
│   └── README.md               #    Guía del backend
│
├── database/                   # 🗄️ Scripts SQL
│   ├── schema.sql              #    Estructura de tablas
│   └── seed.sql                #    Datos iniciales
│
├── scripts/                    # ⚙️ Scripts de automatización
│   ├── setup-ollama.sh         #    Instalación de Ollama
│   └── start-services.sh       #    Iniciar todos los servicios
│
├── src/                        # ⚛️ Frontend React
│   └── components/
│       └── ChatBot.tsx         #    Componente chatbot integrado
│
└── README.md                   #    Este archivo

```

## 🚀 Inicio Rápido

### Opción A: Instalación Automática

```bash
# 1. Instalar Ollama y modelo
./scripts/setup-ollama.sh

# 2. Configurar base de datos
sudo mysql -u root -p < database/schema.sql
sudo mysql -u root -p < database/seed.sql

# 3. Configurar backend
cd backend
cp .env.example .env
nano .env  # Editar credenciales MySQL
npm install

# 4. Iniciar todo
cd ..
./scripts/start-services.sh
```

### Opción B: Guía Paso a Paso Detallada

Ver: **`docs/INSTALACION_RAPIDA.md`** para instrucciones completas.

## 📚 Documentación

- **[Instalación Rápida](docs/INSTALACION_RAPIDA.md)** - Guía paso a paso (15 minutos)
- **[Arquitectura IA - Parte 1](docs/AI_ARCHITECTURE.md)** - Diseño del sistema, stack, servicios
- **[Arquitectura IA - Parte 2](docs/AI_ARCHITECTURE_PART2.md)** - Optimización, deployment, producción
- **[Backend README](backend/README.md)** - API, endpoints, troubleshooting

## 🧪 Verificar Instalación

```bash
# Test backend
curl http://localhost:3001/health

# Test Ollama
curl http://localhost:3001/api/chat/health

# Test chat
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Qué tamaños de volquetes tienen?"}'
```

## 🎨 Frontend - ChatBot

El chatbot ya está implementado en `src/components/ChatBot.tsx` y solo requiere pequeñas modificaciones para conectarse al backend:

**Ver instrucciones en**: `docs/INSTALACION_RAPIDA.md` sección "Integración con Frontend"

## ⚡ Stack Tecnológico

### Backend
- **Node.js 20+** con Express
- **MySQL 8+** para datos del negocio
- **Axios** para comunicación con Ollama
- **Ollama** como motor de IA
- **Llama 3 8B** como modelo de lenguaje

### IA Engine
- **Ollama** v0.1.20+
- **Modelo**: Llama 3 8B (4.7GB)
- **Alternativa**: Mistral 7B (4.1GB) - más rápido

### Frontend
- **React + TypeScript**
- **Vite**
- **TailwindCSS**
- **Axios** para llamadas al backend

## 🗄️ Base de Datos

### Tablas Principales
- `informacion_empresa` - Datos de contacto y empresa
- `tamanos_volquetes` - Tamaños y precios de volquetes
- `servicios` - Servicios ofrecidos (tierra, retiro, etc.)
- `zonas_cobertura` - Zonas de entrega y costos
- `faqs` - Preguntas frecuentes

Ver: `database/schema.sql` y `database/seed.sql`

## 🔧 Configuración

### Variables de Entorno Backend

Editar `backend/.env`:

```env
# Base de datos
DB_USER=root
DB_PASSWORD=tu_password_aqui
DB_NAME=volquetes_roldan

# Ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3:8b
OLLAMA_MAX_TOKENS=500
OLLAMA_TEMPERATURE=0.3
```

## 📊 API Endpoints

### POST /api/chat
Procesa mensaje del usuario y devuelve respuesta de IA.

**Request:**
```json
{
  "message": "¿Cuánto cuesta un volquete grande?",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "response": "El volquete grande de 6m³ cuesta $18,000 por día...",
  "timestamp": "2026-02-11T05:00:00.000Z",
  "model": "llama3:8b",
  "intent": "precio"
}
```

### GET /health
Health check del backend.

### GET /api/chat/health
Verifica estado de Ollama.

Ver documentación completa en `backend/README.md`

## 🐛 Troubleshooting

### Ollama no responde
```bash
sudo systemctl status ollama
sudo systemctl start ollama
```

### Error de base de datos
```bash
# Verificar conexión
mysql -u root -p volquetes_roldan -e "SELECT COUNT(*) FROM tamanos_volquetes;"
```

### Backend no inicia
```bash
cd backend
cat .env  # Verificar configuración
npm install  # Reinstalar dependencias
npm start
```

Ver más soluciones en `docs/INSTALACION_RAPIDA.md`

## 📈 Optimización

### Para VPS con Recursos Limitados

1. **Reducir tokens máximos**
```env
OLLAMA_MAX_TOKENS=300
```

2. **Usar Mistral (más rápido)**
```bash
ollama pull mistral:7b
```

3. **Cachear respuestas frecuentes** (ya implementado)

Ver `docs/AI_ARCHITECTURE_PART2.md` para optimizaciones avanzadas.

## 🚀 Deployment en Producción

### Con Nginx como Reverse Proxy

Ver guía completa en `docs/AI_ARCHITECTURE_PART2.md` sección "Deployment en VPS"

Incluye:
- Configuración de Nginx
- SSL con Let's Encrypt
- Configuración systemd para backend
- Monitoreo y logs

## 🎯 Flujo de Conversación

```
Usuario escribe → Frontend → POST /api/chat → Backend
                                                  ↓
                                         Detecta intención
                                                  ↓
                                         Consulta MySQL → Obtiene datos
                                                  ↓
                                         Construye prompt con:
                                         • Contexto empresarial
                                         • Datos SQL
                                         • Historial conversación
                                                  ↓
                                         Ollama + Llama 3 → Genera respuesta
                                                  ↓
Usuario recibe respuesta ← Frontend ← JSON con respuesta
```

## 🔒 Seguridad

- ✅ Rate limiting implementado (10 requests/minuto)
- ✅ Validación de inputs
- ✅ Sanitización de datos SQL
- ✅ CORS configurado
- ✅ Timeouts en requests
- ✅ Manejo de errores robusto

## 📞 Soporte

Si encuentras problemas:

1. Revisa `docs/INSTALACION_RAPIDA.md`
2. Consulta `backend/README.md`
3. Revisa logs: `sudo journalctl -u ollama -f`
4. Verifica servicios: `systemctl status ollama mysql`

## 🎉 Características del Asistente IA

El asistente RoldánIA puede responder sobre:
- ✅ Tamaños y precios de volquetes
- ✅ Servicios de tierra (negra, colorada, zarandeada)
- ✅ Zonas de cobertura y costos de flete
- ✅ Horarios y contacto
- ✅ Preguntas frecuentes
- ✅ Retiro de escombros

**NO responde sobre**:
- ❌ Temas fuera del rubro volquetes/construcción
- ❌ Información no verificada o inventada
- ❌ Datos que no estén en la base de datos

## 📝 Próximos Pasos

1. Seguir `docs/INSTALACION_RAPIDA.md` para instalación
2. Configurar `.env` con tus credenciales
3. Probar el sistema localmente
4. Integrar con el frontend
5. Desplegar en producción siguiendo `docs/AI_ARCHITECTURE_PART2.md`

---

**🚀 Sistema empresarial de IA 100% gratuito, auto-hospedado y optimizado**

**Creado para Volquetes Roldán** | Roldán, Santa Fe, Argentina
