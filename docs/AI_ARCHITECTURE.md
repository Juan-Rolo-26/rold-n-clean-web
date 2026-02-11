# 🤖 ARQUITECTURA PROFESIONAL IA - VOLQUETES ROLDÁN

## 📋 ÍNDICE
1. [Visión General](#visión-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Estructura de Carpetas](#estructura-de-carpetas)
5. [Instalación y Setup](#instalación-y-setup)
6. [Base de Datos](#base-de-datos)
7. [Backend API](#backend-api)
8. [Integración Frontend](#integración-frontend)
9. [Optimización y Performance](#optimización-y-performance)
10. [Deployment en VPS](#deployment-en-vps)

---

## 🎯 VISIÓN GENERAL

### Objetivo
Sistema de IA conversacional **100% gratuito** y **auto-hospedado** que funciona como asistente virtual empresarial para Volquetes Roldán.

### Características Clave
- ✅ **IA Local**: Sin costos de APIs externas
- ✅ **Respuestas Basadas en Datos Reales**: Consulta base de datos MySQL/PostgreSQL
- ✅ **Sin Alucinaciones**: No inventa información
- ✅ **Contexto Limitado**: Solo responde sobre el negocio
- ✅ **Memoria Conversacional**: Últimos 3 mensajes
- ✅ **Optimizado para VPS**: 8GB RAM

---

## 🏗️ ARQUITECTURA DEL SISTEMA

```
┌─────────────────────────────────────────────────────────┐
│                    VPS (8GB RAM)                        │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                 │
│  │   Frontend   │───▶│  Backend API │                 │
│  │  (React/TS)  │    │  (Node.js)   │                 │
│  │  Port: 5173  │    │  Port: 3001  │                 │
│  └──────────────┘    └───────┬──────┘                 │
│                              │                          │
│                              ├──────────┐              │
│                              │          │              │
│                              ▼          ▼              │
│                      ┌──────────┐  ┌──────────┐       │
│                      │   MySQL  │  │  Ollama  │       │
│                      │ Port:3306│  │Port:11434│       │
│                      │          │  │  Llama 3 │       │
│                      │ Datos del│  │   8B     │       │
│                      │ Negocio  │  │          │       │
│                      └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Flujo de Conversación

```
Usuario escribe mensaje
        │
        ▼
Frontend ChatBot.tsx
        │
        ▼
POST /api/chat
    (Backend)
        │
        ├──▶ Consulta MySQL (Precios, Tamaños, Disponibilidad)
        │
        ├──▶ Construye Prompt con:
        │    • Contexto empresarial
        │    • Resultados SQL
        │    • Últimos 3 mensajes
        │
        ▼
POST http://localhost:11434/api/generate
    (Ollama + Llama 3)
        │
        ▼
Respuesta IA → Backend → Frontend → Usuario
```

---

## 🔧 STACK TECNOLÓGICO

### Frontend (Ya Existente)
- **React + TypeScript**
- **Vite**
- **TailwindCSS**
- **Componente**: `ChatBot.tsx`

### Backend (Nuevo)
- **Node.js 20+**
- **Express** v4
- **MySQL2** (driver)
- **Axios** (para llamadas a Ollama)
- **Dotenv** (variables de entorno)
- **CORS**

### IA Engine
- **Ollama** v0.1.20+
- **Modelo**: Llama 3 8B (4.7GB)
- **Alternativa**: Mistral 7B (4.1GB)

### Base de Datos
- **MySQL 8.0+** o **PostgreSQL 15+**
- **Tablas**:
  - `servicios`
  - `precios`
  - `zonas_cobertura`
  - `tamanos_volquetes`
  - `informacion_empresa`

---

## 📁 ESTRUCTURA DE CARPETAS

```
rold-n-clean-web/
├── frontend/               # Frontend existente
│   ├── src/
│   │   └── components/
│   │       └── ChatBot.tsx
│   └── package.json
│
├── backend/               # NUEVO - Backend IA
│   ├── src/
│   │   ├── server.js             # Servidor Express principal
│   │   ├── config/
│   │   │   ├── database.js       # Configuración MySQL
│   │   │   └── ollama.js         # Config Ollama
│   │   ├── routes/
│   │   │   └── chat.js           # Endpoint /api/chat
│   │   ├── services/
│   │   │   ├── ollama.service.js # Comunicación con Ollama
│   │   │   ├── database.service.js # Consultas SQL
│   │   │   └── prompt.service.js  # Construcción de prompts
│   │   ├── middleware/
│   │   │   ├── cors.js
│   │   │   └── errorHandler.js
│   │   └── utils/
│   │       └── logger.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── database/              # NUEVO - Scripts SQL
│   ├── schema.sql               # Estructura de tablas
│   ├── seed.sql                 # Datos de ejemplo
│   └── README.md
│
├── docs/                  # Documentación
│   ├── AI_ARCHITECTURE.md       # Este archivo
│   ├── DEPLOYMENT.md            # Guía de deployment
│   └── API.md                   # Documentación API
│
└── scripts/               # Scripts de automatización
    ├── setup-ollama.sh          # Instalar Ollama
    ├── start-services.sh        # Iniciar todos los servicios
    └── backup-db.sh             # Backup base de datos
```

---

## 🚀 INSTALACIÓN Y SETUP

### 1. Instalación de Ollama en VPS

```bash
# Conectar a VPS
ssh usuario@tu-vps-ip

# Instalar Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Verificar instalación
ollama --version

# Descargar modelo Llama 3 8B (4.7GB)
ollama pull llama3:8b

# Verificar modelo descargado
ollama list

# Iniciar servicio Ollama
ollama serve
# Se ejecutará en http://localhost:11434
```

### 2. Verificar que Ollama funciona

```bash
# Test desde CLI
ollama run llama3:8b "¿Qué es un volquete?"

# Test desde API
curl http://localhost:11434/api/generate -d '{
  "model": "llama3:8b",
  "prompt": "¿Qué es un volquete?",
  "stream": false
}'
```

### 3. Configurar Ollama como Servicio (para que siempre esté activo)

```bash
# Crear servicio systemd
sudo nano /etc/systemd/system/ollama.service
```

Contenido:
```ini
[Unit]
Description=Ollama AI Service
After=network.target

[Service]
Type=simple
User=www-data
ExecStart=/usr/local/bin/ollama serve
Restart=always
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_MODELS=/usr/share/ollama/.ollama/models"

[Install]
WantedBy=multi-user.target
```

```bash
# Habilitar y arrancar servicio
sudo systemctl daemon-reload
sudo systemctl enable ollama
sudo systemctl start ollama
sudo systemctl status ollama
```

---

## 🗄️ BASE DE DATOS

### Esquema MySQL

```sql
-- database/schema.sql

CREATE DATABASE IF NOT EXISTS volquetes_roldan;
USE volquetes_roldan;

-- Tabla de información de la empresa
CREATE TABLE informacion_empresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    clave VARCHAR(50) UNIQUE NOT NULL,
    valor TEXT NOT NULL,
    categoria VARCHAR(50),
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de tamaños de volquetes
CREATE TABLE tamanos_volquetes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    capacidad_m3 DECIMAL(4,2) NOT NULL,
    descripcion TEXT,
    recomendado_para TEXT,
    precio_base DECIMAL(10,2),
    disponible BOOLEAN DEFAULT TRUE,
    imagen_url VARCHAR(255)
);

-- Tabla de precios y servicios
CREATE TABLE servicios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_desde DECIMAL(10,2),
    precio_hasta DECIMAL(10,2),
    unidad VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de zonas de cobertura
CREATE TABLE zonas_cobertura (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100),
    provincia VARCHAR(100),
    costo_flete DECIMAL(10,2) DEFAULT 0,
    tiempo_entrega VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de preguntas frecuentes (para mejorar respuestas)
CREATE TABLE faqs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pregunta TEXT NOT NULL,
    respuesta TEXT NOT NULL,
    categoria VARCHAR(50),
    orden INT DEFAULT 0
);

-- Índices para optimizar consultas
CREATE INDEX idx_tamanos_disponible ON tamanos_volquetes(disponible);
CREATE INDEX idx_servicios_activo ON servicios(activo);
CREATE INDEX idx_zonas_activo ON zonas_cobertura(activo);
```

### Datos de Ejemplo (Seed)

```sql
-- database/seed.sql

-- Información de la empresa
INSERT INTO informacion_empresa (clave, valor, categoria) VALUES
('nombre_empresa', 'Volquetes Roldán', 'general'),
('telefono', '+54 9 341 362-3232', 'contacto'),
('email', 'info@volquetesroldan.com', 'contacto'),
('ubicacion', 'Roldán, Santa Fe, Argentina', 'general'),
('horario_atencion', 'Lunes a Viernes 8:00-18:00, Sábados 8:00-13:00', 'general'),
('tiempo_entrega', 'Entrega y retiro el mismo día', 'servicio'),
('whatsapp', 'https://wa.me/5493413623232', 'contacto');

-- Tamaños de volquetes
INSERT INTO tamanos_volquetes (nombre, capacidad_m3, descripcion, recomendado_para, precio_base, disponible) VALUES
('Volquete Chico', 1.5, 'Volquete de 1.5m³ ideal para espacios reducidos', 'Limpiezas pequeñas, reformas de baños, cocinas', 8000.00, TRUE),
('Volquete Mediano', 3.0, 'Volquete de 3m³ para obras medianas', 'Reformas de departamentos, jardines', 12000.00, TRUE),
('Volquete Grande', 6.0, 'Volquete de 6m³ - el más elegido', 'Construcciones, demoliciones, obras grandes', 18000.00, TRUE),
('Volquete con Barandas', 7.0, 'Volquete de 7m³ con barandas para máxima capacidad', 'Grandes volúmenes de escombros, proyectos industriales', 22000.00, TRUE);

-- Servicios
INSERT INTO servicios (nombre, descripcion, precio_desde, precio_hasta, unidad, activo) VALUES
('Alquiler de Volquetes', 'Alquiler de volquetes de diferentes tamaños', 8000.00, 22000.00, 'por día', TRUE),
('Retiro de Escombros', 'Servicio de retiro y disposición final de escombros', 5000.00, 15000.00, 'por viaje', TRUE),
('Venta de Tierra Negra Zarandeada', 'Tierra negra de primera calidad zarandeada', 15000.00, 25000.00, 'por m³', TRUE),
('Venta de Tierra Negra Común', 'Tierra negra para relleno y nivelación', 8000.00, 12000.00, 'por m³', TRUE),
('Venta de Tierra Colorada', 'Tierra colorada para bases compactas', 6000.00, 10000.00, 'por m³', TRUE);

-- Zonas de cobertura
INSERT INTO zonas_cobertura (nombre, ciudad, provincia, costo_flete, tiempo_entrega, activo) VALUES
('Roldán Centro', 'Roldán', 'Santa Fe', 0.00, 'Mismo día', TRUE),
('Funes', 'Funes', 'Santa Fe', 1500.00, '24 horas', TRUE),
('Pérez', 'Pérez', 'Santa Fe', 2000.00, '24 horas', TRUE),
('Rosario Norte', 'Rosario', 'Santa Fe', 3000.00, '24-48 horas', TRUE),
('Rosario Sur', 'Rosario', 'Santa Fe', 3000.00, '24-48 horas', TRUE),
('Capitán Bermúdez', 'Capitán Bermúdez', 'Santa Fe', 2500.00, '24 horas', TRUE);

-- FAQs
INSERT INTO faqs (pregunta, respuesta, categoria, orden) VALUES
('¿Cuánto tiempo puedo tener el volquete?', 'Nuestro servicio incluye hasta 3 días de alquiler. Si necesitas más tiempo, consultá por extensión del plazo.', 'alquiler', 1),
('¿Hacen retiro el mismo día que entregaron?', 'Sí, podemos coordinar entrega y retiro el mismo día si tu obra lo requiere.', 'logistica', 2),
('¿Qué tipo de residuos puedo tirar?', 'Aceptamos escombros de construcción, tierra, cascotes, maderas, metales. NO aceptamos residuos peligrosos, químicos ni orgánicos.', 'normativa', 3),
('¿Necesito permiso municipal?', 'Para volquetes en vía pública, puede ser necesario permiso municipal. Consulta con tu municipio.', 'normativa', 4),
('¿Cómo se cobra el servicio?', 'Se cobra por día de alquiler. El precio incluye entrega, retiro y disposición final.', 'precios', 5);
```

---

## 🔌 BACKEND API

### Package.json

```json
{
  "name": "volquetes-roldan-ia-backend",
  "version": "1.0.0",
  "description": "Backend IA para Volquetes Roldán",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "node src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.5",
    "axios": "^1.6.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### Variables de Entorno (.env)

```env
# Servidor
PORT=3001
NODE_ENV=production

# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=volquetes_user
DB_PASSWORD=tu_password_seguro
DB_NAME=volquetes_roldan

# Ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3:8b
OLLAMA_MAX_TOKENS=500
OLLAMA_TEMPERATURE=0.3

# CORS
FRONTEND_URL=http://localhost:5173

# Logs
LOG_LEVEL=info
```

### Servidor Principal (server.js)

```javascript
// backend/src/server.js
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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/chat', chatRouter);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend IA Volquetes Roldán ejecutándose en puerto ${PORT}`);
  console.log(`🤖 Ollama URL: ${process.env.OLLAMA_URL}`);
  console.log(`📊 Modelo: ${process.env.OLLAMA_MODEL}`);
});
```

---

## 💬 ENDPOINT /api/chat

```javascript
// backend/src/routes/chat.js
import express from 'express';
import { processChat } from '../services/chat.service.js';

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

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'El campo "message" es requerido y debe ser texto'
      });
    }

    // Limitar histórico a últimos 3 mensajes
    const limitedHistory = conversationHistory.slice(-3);

    const response = await processChat(message, limitedHistory);

    res.json({
      response: response.text,
      timestamp: new Date().toISOString(),
      model: process.env.OLLAMA_MODEL
    });

  } catch (error) {
    next(error);
  }
});

export default router;
```

---

## 🧠 SERVICIO PRINCIPAL - CHAT

```javascript
// backend/src/services/chat.service.js
import { queryOllama } from './ollama.service.js';
import { getDatabaseInfo } from './database.service.js';
import { buildPrompt } from './prompt.service.js';

/**
 * Procesa el mensaje del usuario y genera respuesta con IA
 */
export async function processChat(userMessage, conversationHistory) {
  try {
    // 1. Analizar intención del usuario
    const intent = detectIntent(userMessage);

    // 2. Obtener información relevante de la base de datos
    const dbInfo = await getDatabaseInfo(intent);

    // 3. Construir prompt con contexto
    const prompt = buildPrompt(userMessage, dbInfo, conversationHistory);

    // 4. Consultar a Ollama
    const aiResponse = await queryOllama(prompt);

    return {
      text: aiResponse,
      intent,
      sources: 'database'
    };

  } catch (error) {
    console.error('Error en processChat:', error);
    throw new Error('No pude procesar tu consulta. Por favor, intenta nuevamente.');
  }
}

/**
 * Detecta la intención del usuario para optimizar consultas SQL
 */
function detectIntent(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.match(/precio|costo|tarifa|cuanto cuesta|valor/)) {
    return 'precio';
  }
  if (lowerMessage.match(/tamaño|medida|capacidad|grande|chico|m3|metro/)) {
    return 'tamanos';
  }
  if (lowerMessage.match(/zona|cobertura|donde|ubicacion|entregan/)) {
    return 'zonas';
  }
  if (lowerMessage.match(/tierra|negra|colorada|jardin|relleno/)) {
    return 'tierra';
  }
  if (lowerMessage.match(/contacto|telefono|whatsapp|mail|email/)) {
    return 'contacto';
  }
  if (lowerMessage.match(/horario|cuando|atienden|abren/)) {
    return 'horarios';
  }

  return 'general';
}
```

---

## 🔍 SERVICIO DE BASE DE DATOS

```javascript
// backend/src/services/database.service.js
import { pool } from '../config/database.js';

/**
 * Obtiene información relevante de la base de datos según la intención
 */
export async function getDatabaseInfo(intent) {
  const connection = await pool.getConnection();

  try {
    let info = {
      empresa: await getEmpresaInfo(connection),
      intent: intent
    };

    switch (intent) {
      case 'precio':
      case 'tamanos':
        info.volquetes = await getVolquetes(connection);
        info.servicios = await getServicios(connection);
        break;

      case 'zonas':
        info.zonas = await getZonas(connection);
        break;

      case 'tierra':
        info.servicios = await getServiciosTierra(connection);
        break;

      case 'contacto':
      case 'horarios':
        // Ya tenemos info.empresa que incluye contacto y horarios
        break;

      default:
        info.volquetes = await getVolquetes(connection);
        info.faqs = await getFAQs(connection);
        break;
    }

    return info;

  } finally {
    connection.release();
  }
}

async function getEmpresaInfo(connection) {
  const [rows] = await connection.query(
    'SELECT clave, valor FROM informacion_empresa'
  );
  return rows.reduce((acc, row) => {
    acc[row.clave] = row.valor;
    return acc;
  }, {});
}

async function getVolquetes(connection) {
  const [rows] = await connection.query(
    `SELECT nombre, capacidad_m3, descripcion, recomendado_para, precio_base
     FROM tamanos_volquetes
     WHERE disponible = TRUE
     ORDER BY capacidad_m3 ASC`
  );
  return rows;
}

async function getServicios(connection) {
  const [rows] = await connection.query(
    `SELECT nombre, descripcion, precio_desde, precio_hasta, unidad
     FROM servicios
     WHERE activo = TRUE`
  );
  return rows;
}

async function getServiciosTierra(connection) {
  const [rows] = await connection.query(
    `SELECT nombre, descripcion, precio_desde, precio_hasta, unidad
     FROM servicios
     WHERE activo = TRUE AND nombre LIKE '%Tierra%'`
  );
  return rows;
}

async function getZonas(connection) {
  const [rows] = await connection.query(
    `SELECT nombre, ciudad, costo_flete, tiempo_entrega
     FROM zonas_cobertura
     WHERE activo = TRUE
     ORDER BY costo_flete ASC`
  );
  return rows;
}

async function getFAQs(connection) {
  const [rows] = await connection.query(
    `SELECT pregunta, respuesta FROM faqs ORDER BY orden ASC LIMIT 5`
  );
  return rows;
}
```

---

## 📝 SERVICIO DE CONSTRUCCIÓN DE PROMPTS

```javascript
// backend/src/services/prompt.service.js

/**
 * Construye un prompt optimizado con contexto de negocio
 */
export function buildPrompt(userMessage, dbInfo, conversationHistory) {
  const systemContext = buildSystemContext(dbInfo);
  const conversationContext = buildConversationContext(conversationHistory);

  return `${systemContext}

${conversationContext}

Usuario: ${userMessage}
Asistente:`;
}

/**
 * Construye el contexto del sistema con información del negocio
 */
function buildSystemContext(dbInfo) {
  const { empresa, volquetes, servicios, zonas, faqs } = dbInfo;

  let context = `Eres RoldánIA, un asistente virtual profesional de ${empresa.nombre_empresa}.

INSTRUCCIONES ESTRICTAS:
- Solo respondes sobre: alquiler de volquetes, precios, servicios, tierra, zonas de cobertura
- NO inventes información ni precios
- Si no tienes la información, di: "No dispongo de esa información, pero puedo ayudarte con otra consulta"
- Sé breve, profesional y amigable
- Siempre termina preguntando si necesita más ayuda
- NO respondas preguntas fuera del rubro de volquetes/construcción

INFORMACIÓN DE LA EMPRESA:
- Nombre: ${empresa.nombre_empresa}
- Teléfono: ${empresa.telefono}
- WhatsApp: ${empresa.whatsapp}
- Email: ${empresa.email}
- Ubicación: ${empresa.ubicacion}
- Horarios: ${empresa.horario_atencion}
- Entrega: ${empresa.tiempo_entrega}
`;

  if (volquetes && volquetes.length > 0) {
    context += `\nTAMAÑOS DE VOLQUETES DISPONIBLES:\n`;
    volquetes.forEach(v => {
      context += `- ${v.nombre} (${v.capacidad_m3}m³): ${v.descripcion}. Recomendado para: ${v.recomendado_para}. Precio: $${v.precio_base.toLocaleString('es-AR')}/día\n`;
    });
  }

  if (servicios && servicios.length > 0) {
    context += `\nSERVICIOS:\n`;
    servicios.forEach(s => {
      context += `- ${s.nombre}: ${s.descripcion}. Desde $${s.precio_desde.toLocaleString('es-AR')} hasta $${s.precio_hasta.toLocaleString('es-AR')} ${s.unidad}\n`;
    });
  }

  if (zonas && zonas.length > 0) {
    context += `\nZONAS DE COBERTURA:\n`;
    zonas.forEach(z => {
      const flete = z.costo_flete > 0 ? `+ $${z.costo_flete.toLocaleString('es-AR')} flete` : 'sin cargo de flete';
      context += `- ${z.nombre}, ${z.ciudad}: ${z.tiempo_entrega} (${flete})\n`;
    });
  }

  if (faqs && faqs.length > 0) {
    context += `\nPREGUNTAS FRECUENTES:\n`;
    faqs.forEach(faq => {
      context += `P: ${faq.pregunta}\nR: ${faq.respuesta}\n\n`;
    });
  }

  return context;
}

/**
 * Construye el contexto de la conversación (últimos mensajes)
 */
function buildConversationContext(history) {
  if (!history || history.length === 0) {
    return 'CONVERSACIÓN NUEVA';
  }

  let context = 'CONTEXTO DE LA CONVERSACIÓN:\n';
  history.forEach(msg => {
    const role = msg.role === 'user' ? 'Usuario' : 'Asistente';
    context += `${role}: ${msg.content}\n`;
  });

  return context;
}
```

---

**(Continúa en el siguiente mensaje...)**
