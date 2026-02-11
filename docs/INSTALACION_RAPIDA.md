# 🚀 GUÍA DE INSTALACIÓN RÁPIDA - IA VOLQUETES ROLDÁN

## ⚡ Instalación Express (15 minutos)

### Requisitos Previos
- Ubuntu/Debian Linux
- 8GB RAM mínimo
- Node.js 18+ instalado
- MySQL 8+ instalado
- 10GB espacio en disco

---

## 📋 PASO A PASO

### 1️⃣ Instalar Ollama y Modelo

```bash
cd /home/juampi26/rold-n-clean-web
chmod +x scripts/setup-ollama.sh
./scripts/setup-ollama.sh
```

**Tiempo estimado**: 5-10 minutos (descarga del modelo)

✅ Esto instalará:
- Ollama
- Modelo Llama 3 8B (4.7GB)
- Servicio systemd configurado

---

### 2️⃣ Configurar Base de Datos

```bash
# Crear base de datos
sudo mysql -u root -p < database/schema.sql

# Importar datos iniciales
sudo mysql -u root -p < database/seed.sql

# Verificar
mysql -u root -p volquetes_roldan -e "SHOW TABLES;"
```

**Debería mostrar**:
```
+---------------------------+
| Tables_in_volquetes_roldan|
+---------------------------+
| faqs                      |
| informacion_empresa       |
| servicios                 |
| tamanos_volquetes         |
| zonas_cobertura           |
+---------------------------+
```

---

### 3️⃣ Configurar Backend

```bash
cd backend

# Copiar template de configuración
cp .env.example .env

# Editar con tus credenciales
nano .env
```

**Configurar en `.env`**:
```env
DB_USER=root                    # Tu usuario MySQL
DB_PASSWORD=tu_password         # Tu password MySQL
DB_NAME=volquetes_roldan
```

```bash
# Instalar dependencias
npm install
```

---

### 4️⃣ Iniciar Todo

```bash
cd /home/juampi26/rold-n-clean-web
chmod +x scripts/start-services.sh
./scripts/start-services.sh
```

✅ Esto iniciará:
- MySQL
- Ollama
- Backend API (puerto 3001)

---

### 5️⃣ Verificar que Todo Funciona

**Test 1: Health Check**
```bash
curl http://localhost:3001/health
```

**Respuesta esperada**:
```json
{
  "status": "OK",
  "timestamp": "...",
  "uptime": 123.45,
  "model": "llama3:8b"
}
```

**Test 2: Ollama Status**
```bash
curl http://localhost:3001/api/chat/health
```

**Respuesta esperada**:
```json
{
  "backend": "OK",
  "ollama": {
    "status": "OK",
    "models": ["llama3:8b"],
    "url": "http://localhost:11434"
  }
}
```

**Test 3: Chat Real**
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Qué tamaños de volquetes tienen?"}'
```

**Respuesta esperada**:
```json
{
  "response": "Tenemos 4 tamaños de volquetes disponibles:\n\n- Volquete Chico (1.5m³): ideal para limpiezas pequeñas...",
  "timestamp": "...",
  "model": "llama3:8b",
  "intent": "tamanos"
}
```

---

## 🎯 Integración con Frontend

### Modificar ChatBot.tsx

1. Ir al frontend:
```bash
cd /home/juampi26/rold-n-clean-web
```

2. Editar `src/components/ChatBot.tsx`

### Los cambios principales son en la función `handleSendMessage`:

Antes, usaba respuestas hardcodeadas. Ahora debe hacer una llamada al backend:

```typescript
// AGREGAR al inicio del archivo
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// REEMPLAZAR la función handleSendMessage completa:
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
    // Construir historial (últimos 3 mensajes)
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
        timeout: 30000,
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

// ELIMINAR la función getBotResponse() - ya no se usa
```

### Crear archivo de variables de entorno del frontend

```bash
# En /home/juampi26/rold-n-clean-web (raíz del frontend)
echo "VITE_API_URL=http://localhost:3001" > .env
```

### Instalar axios si no está instalado

```bash
npm install axios
```

### Recompilar frontend

```bash
npm run dev
```

---

## ✅ VERIFICACIÓN FINAL

1. Backend corriendo en `http://localhost:3001` ✓
2. Ollama corriendo en `http://localhost:11434` ✓
3. MySQL con datos cargados ✓
4. Frontend conectándose al backend ✓

---

## 🔧 Comandos Útiles

```bash
# Ver estado de servicios
sudo systemctl status ollama
sudo systemctl status mysql

# Ver logs de Ollama
sudo journalctl -u ollama -f

# Reiniciar Ollama
sudo systemctl restart ollama

# Probar Ollama manualmente
ollama run llama3:8b "¿Qué es un volquete?"

# Ver backend logs
cd backend && npm start

# Probar endpoint
curl http://localhost:3001/health
```

---

## 🐛 Problemas Comunes

### "ECONNREFUSED localhost:11434"
**Solución**: Ollama no está corriendo
```bash
sudo systemctl start ollama
# o
ollama serve
```

### "ER_ACCESS_DENIED_ERROR"
**Solución**: Password de MySQL incorrecto en `.env`
```bash
cd backend
nano .env  # Corregir DB_PASSWORD
```

### " Modelo no encontrado"
**Solución**: Descargar modelo
```bash
ollama pull llama3:8b
```

### "Respuestas muy lentas"
**Solución**: Reducir tokens en `backend/.env`
```env
OLLAMA_MAX_TOKENS=300
```

---

## 📚 Documentación Completa

- `docs/AI_ARCHITECTURE.md` - Arquitectura completa
- `docs/AI_ARCHITECTURE_PART2.md` - Optimización y deployment
- `backend/README.md` - Guía del backend

---

## 🎉 ¡Listo!

Tu sistema de IA está funcionando. Ahora puedes:
- Chatear con el asistente desde el frontend
- Ver las respuestas basadas en datos reales
- Modificar la base de datos para actualizar información
- Escalar a producción cuando estés listo

**¡Éxito! 🚀**
