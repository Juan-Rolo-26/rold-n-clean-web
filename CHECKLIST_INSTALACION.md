# ✅ CHECKLIST DE INSTALACIÓN - IA VOLQUETES ROLDÁN

Sigue esta lista paso a paso para tener el sistema funcionando.

---

## 📋 FASE 1: PREPARACIÓN

- [ ] **1.1** VPS con al menos 8GB RAM disponible
- [ ] **1.2** Ubuntu/Debian Linux instalado
- [ ] **1.3** Acceso root o sudo
- [ ] **1.4** Node.js 18+ instalado
  ```bash
  node --version  # Debe ser v18 o superior
  ```
- [ ] **1.5** MySQL 8+ instalado y funcionando
  ```bash
  sudo systemctl status mysql
  ```
- [ ] **1.6** Al menos 10GB de espacio libre en disco
  ```bash
  df -h
  ```

---

## 🤖 FASE 2: INSTALAR OLLAMA

- [ ] **2.1** Dar permisos al script
  ```bash
  cd /home/juampi26/rold-n-clean-web
  chmod +x scripts/setup-ollama.sh
  ```

- [ ] **2.2** Ejecutar instalación de Ollama
  ```bash
  ./scripts/setup-ollama.sh
  ```
  ⏱️ Tiempo estimado: 5-10 minutos

- [ ] **2 .3** Verificar que Ollama está corriendo
  ```bash
  sudo systemctl status ollama
  ```
  ✅ Debe mostrar "active (running)"

- [ ] **2.4** Verificar modelo descargado
  ```bash
  ollama list
  ```
  ✅ Debe aparecer "llama3:8b"

- [ ] **2.5** Test rápido de Ollama
  ```bash
  ollama run llama3:8b "Hola, ¿qué eres?"
  ```
  ✅ Debe responder coherentemente en español

---

## 🗄️ FASE 3: CONFIGURAR BASE DE DATOS

- [ ] **3.1** Crear base de datos y tablas
  ```bash
  sudo mysql -u root -p < database/schema.sql
  ```
  📝 Ingresa tu password de MySQL root

- [ ] **3.2** Importar datos iniciales
  ```bash
  sudo mysql -u root -p < database/seed.sql
  ```

- [ ] **3.3** Verificar que las tablas existen
  ```bash
  mysql -u root -p volquetes_roldan -e "SHOW TABLES;"
  ```
  ✅ Debe mostrar 5 tablas:
  - faqs
  - informacion_empresa
  - servicios
  - tamanos_volquetes
  - zonas_cobertura

- [ ] **3.4** Verificar que hay datos
  ```bash
  mysql -u root -p volquetes_roldan -e "SELECT nombre, capacidad_m3, precio_base FROM tamanos_volquetes;"
  ```
  ✅ Debe mostrar los 4 tamaños de volquetes

---

## 🔧 FASE 4: CONFIGURAR BACKEND

- [ ] **4.1** Ir a carpeta backend
  ```bash
  cd backend
  ```

- [ ] **4.2** Verificar que existe archivo .env
  ```bash
  ls -la .env
  ```

- [ ] **4.3** Editar .env con tus credenciales MySQL
  ```bash
  nano .env
  ```
  ⚙️ Configurar:
  - `DB_USER=root` (o tu usuario MySQL)
  - `DB_PASSWORD=tu_password_aqui`
  - `DB_NAME=volquetes_roldan`

- [ ] **4.4** Guardar y cerrar (Ctrl+O, Enter, Ctrl+X)

- [ ] **4.5** Instalar dependencias npm
  ```bash
  npm install
  ```
  ⏱️ Tiempo estimado: 1-2 minutos

- [ ] **4.6** Verificar que se instaló todo
  ```bash
  ls node_modules | head -20
  ```
  ✅ Debe mostrar carpetas (axios, express, mysql2, etc.)

---

## 🚀 FASE 5: INICIAR EL SISTEMA

- [ ] **5.1** Volver a raíz del proyecto
  ```bash
  cd /home/juampi26/rold-n-clean-web
  ```

- [ ] **5.2** Dar permisos al script de inicio
  ```bash
  chmod +x scripts/start-services.sh
  ```

- [ ] **5.3** Iniciar todos los servicios
  ```bash
  ./scripts/start-services.sh
  ```
  ✅ Debe iniciar MySQL, Ollama y Backend

- [ ] **5.4** Dejar corriendo (no cerrar la terminal)

---

## 🧪 FASE 6: VERIFICAR QUE FUNCIONA

**En OTRA terminal** (dejar la anterior corriendo):

- [ ] **6.1** Test de health check
  ```bash
  curl http://localhost:3001/health
  ```
  ✅ Debe responder con JSON: `{"status":"OK",...}`

- [ ] **6.2** Test de Ollama
  ```bash
  curl http://localhost:3001/api/chat/health
  ```
  ✅ Debe mostrar `"ollama": {"status": "OK"}`

- [ ] **6.3** Test de chat real - Pregunta sobre tamaños
  ```bash
  curl -X POST http://localhost:3001/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message": "¿Qué tamaños de volquetes tienen?"}'
  ```
  ✅ Debe responder con información de los 4 tamaños

- [ ] **6.4** Test de chat real - Pregunta sobre precios
  ```bash
  curl -X POST http://localhost:3001/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message": "¿Cuánto cuesta un volquete grande?"}'
  ```
  ✅ Debe responder con el precio ($18,000)

- [ ] **6.5** Test de chat real - Pregunta sobre contacto
  ```bash
  curl -X POST http://localhost:3001/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message": "¿Cómo los contacto?"}'
  ```
  ✅ Debe responder con teléfono y WhatsApp

---

## 🎨 FASE 7: INTEGRAR CON FRONTEND

- [ ] **7.1** Instalar axios en el frontend (si no está)
  ```bash
  cd /home/juampi26/rold-n-clean-web
  npm install axios
  ```

- [ ] **7.2** Crear archivo .env en raíz del proyecto
  ```bash
  echo "VITE_API_URL=http://localhost:3001" > .env
  ```

- [ ] **7.3** Abrir ChatBot.tsx para editar
  ```bash
  code src/components/ChatBot.tsx
  # o
  nano src/components/ChatBot.tsx
  ```

- [ ] **7.4** Agregar import de axios al inicio del archivo
  ```typescript
  import axios from 'axios';
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  ```

- [ ] **7.5** Reemplazar función `handleSendMessage`
  📖 Ver código completo en: `docs/INSTALACION_RAPIDA.md` líneas 180-230

- [ ] **7.6** Eliminar función `getBotResponse` (ya no se usa)

- [ ] **7.7** Guardar cambios

- [ ] **7.8** Reiniciar frontend
  ```bash
  # Si npm run dev estaba corriendo, detener (Ctrl+C) y reiniciar:
  npm run dev
  ```

---

## 🎯 FASE 8: PRUEBA FINAL COMPLETA

- [ ] **8.1** Abrir navegador en `http://localhost:5173`

- [ ] **8.2** Abrir el ChatBot (botón flotante izquierdo)

- [ ] **8.3** Escribir: "Hola"
  ✅ Debe responder con saludo personalizado

- [ ] **8.4** Escribir: "¿Qué tamaños tienen?"
  ✅ Debe listar los 4 tamaños con descripciones

- [ ] **8.5** Escribir: "¿Cuánto cuesta el mediano?"
  ✅ Debe responder con precio específico ($12,000)

- [ ] **8.6** Escribir: "¿Entregan en Rosario?"
  ✅ Debe mencionar Rosario Norte/Sur con costos de flete

- [ ] **8.7** Escribir: "¿Venden tierra?"
  ✅ Debe listar los tipos de tierra disponibles

- [ ] **8.8** Escribir: "¿Cómo los contacto?"
  ✅ Debe dar teléfono, WhatsApp, email

- [ ] **8.9** Verificar que responde rápido (2-5 segundos máximo)

- [ ] **8.10** Verificar que las respuestas son coherentes y profesionales

---

## ✅ VERIFICACIÓN FINAL

Si TODAS las pruebas pasaron:

✅ **¡SISTEMA COMPLETAMENTE FUNCIONAL!** 🎉

Ahora tienes:
- ✅ IA local funcionando
- ✅ Backend conectado a MySQL
- ✅ Frontend integrado con backend
- ✅ Chatbot inteligente respondiendo con datos reales
- ✅ Todo 100% gratuito y auto-hospedado

---

## 📊 MONITOREO CONTINUO

Para verificar que todo sigue funcionando:

```bash
# Ver estado de Ollama
sudo systemctl status ollama

# Ver logs de Ollama
sudo journalctl -u ollama -f

# Ver estado de MySQL
sudo systemctl status mysql

# Probar backend
curl http://localhost:3001/health
```

---

## 🐛 SI ALGO NO FUNCIONA

1. **Revisar** la sección de Troubleshooting en:
   - `docs/INSTALACION_RAPIDA.md`
   - `backend/README.md`

2. **Verificar logs**:
   ```bash
   # Logs de Ollama
   sudo journalctl -u ollama -f
   
   # Logs del backend (en la terminal donde corre)
   ```

3. **Reiniciar servicios**:
   ```bash
   sudo systemctl restart ollama
   sudo systemctl restart mysql
   # Ctrl+C en terminal del backend y volver a iniciar
   ```

---

## 🚀 PRÓXIMO PASO: PRODUCCIÓN

Cuando estés listo para producción:

- [ ] Leer `docs/AI_ARCHITECTURE_PART2.md`
- [ ] Configurar Nginx como reverse proxy
- [ ] Agregar SSL con Let's Encrypt
- [ ] Configurar backend como servicio systemd
- [ ] Configurar backups automáticos de MySQL

---

**¡Éxito! 🎉**

Si completaste todos los pasos con ✅, tu sistema IA está completamente operativo.
