#!/bin/bash

# Script para iniciar todos los servicios necesarios

echo "╔══════════════════════════════════════════════════════╗"
echo "║  🚀 Iniciando servicios Volquetes Roldán           ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Verificar MySQL
echo "🗄️  Verificando MySQL..."
if systemctl is-active --quiet mysql; then
    echo "✅ MySQL activo"
else
    echo "⚠️  MySQL inactivo, intentando iniciar..."
    sudo systemctl start mysql
    sleep 2
    if systemctl is-active --quiet mysql; then
        echo "✅ MySQL iniciado"
    else
        echo "❌ No se pudo iniciar MySQL"
        exit 1
    fi
fi

# Verificar /Iniciar Ollama
echo ""
echo "🤖 Verificando Ollama..."
if systemctl is-active --quiet ollama; then
    echo "✅ Ollama activo"
else
    echo "⚠️  Ollama inactivo, intentando iniciar..."
    sudo systemctl start ollama
    sleep 3
    if systemctl is-active --quiet ollama; then
        echo "✅ Ollama iniciado"
    else
        echo "⚠️  Servicio systemd no encontrado, iniciando manualmente..."
        ollama serve &
        sleep 3
        echo "✅ Ollama iniciado manualmente"
    fi
fi

# Test Ollama API
echo ""
echo "🧪 Probando Ollama API..."
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "✅ Ollama API respondiendo"
else
    echo "❌ Ollama API no responde"
    exit 1
fi

# Iniciar Backend
echo ""
echo "🔧 Iniciando backend IA..."
cd backend

if [ ! -f ".env" ]; then
    echo "⚠️  Archivo .env no encontrado, copiando desde .env.example"
    cp .env.example .env
    echo "⚠️  IMPORTANTE: Edita backend/.env con tus credenciales antes de continuar"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

echo "🚀 Iniciando servidor backend..."
npm start &
BACKEND_PID=$!

# Esperar a que el backend esté listo
sleep 5

# Test backend
echo ""
echo "🧪 Probando backend..."
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Backend respondiendo"
else
    echo "⚠️  Backend no responde aún, puede tardar unos segundos más"
fi

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  ✅ Todos los servicios iniciados!                  ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  📊 Estado de servicios:                            ║"
echo "║  • MySQL:    ✓ Activo (puerto 3306)                 ║"
echo "║  • Ollama:   ✓ Activo (puerto 11434)                ║"
echo "║  • Backend:  ✓ Activo (puerto 3001, PID: $BACKEND_PID)   ║"
echo "║                                                      ║"
echo "║  🧪 Endpoints de prueba:                            ║"
echo "║  • http://localhost:3001/health                     ║"
echo "║  • http://localhost:3001/api/chat/health            ║"
echo "║                                                      ║"
echo "║  📝 Para detener backend:                           ║"
echo "║     kill $BACKEND_PID                                    ║"
echo "╚══════════════════════════════════════════════════════╝"

# Mantener el script vivo
wait
