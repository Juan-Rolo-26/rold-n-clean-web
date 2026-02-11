# ⚡ QUICK START - 5 MINUTOS

Para los impacientes. Esto es lo mínimo para tener el sistema funcionando.

## 🚀 Comandos Rápidos (Copiar y pegar)

```bash
# 1. Ir al proyecto
cd /home/juampi26/rold-n-clean-web

# 2. Instalar Ollama y modelo (10 min - solo primera vez)
chmod +x scripts/setup-ollama.sh
./scripts/setup-ollama.sh

# 3. Crear base de datos (ingresa password MySQL cuando pida)
sudo mysql -u root -p < database/schema.sql
sudo mysql -u root -p < database/seed.sql

# 4. Config backend
cd backend
cp .env.example .env
nano .env  # IMPORTANTE: Editar DB_PASSWORD con tu password MySQL
npm install

# 5. Iniciar todo
cd ..
chmod +x scripts/start-services.sh
./scripts/start-services.sh
```

## 🧪 Test Rápido

```bash
# En OTRA terminal:
curl http://localhost:3001/health

curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola"}'
```

✅ Si responde con JSON, **¡funciona!**

## 📖 Documentación Completa

- **Paso a paso**: `docs/INSTALACION_RAPIDA.md`
- **Checklist**: `CHECKLIST_INSTALACION.md`
- **Overview**: `README_IA.md`
- **Resumen**: `RESUMEN_EJECUTIVO.md`

## 🎨 Integrar con Frontend

Ver sección "Integración con Frontend" en `docs/INSTALACION_RAPIDA.md`

Cambios mínimos en `src/components/ChatBot.tsx`:
1. Agregar `import axios`
2. Reemplazar `handleSendMessage` con llamada al backend
3. Eliminar `getBotResponse`

Código completo en la documentación.

---

**¿Problemas?** → `docs/INSTALACION_RAPIDA.md` sección Troubleshooting
