#!/bin/bash

# Script de instalación completa de Ollama y configuración
# Para Ubuntu/Debian

echo "╔══════════════════════════════════════════════════════╗"
echo "║  🤖 Instalación de Ollama para Volquetes Roldán    ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Verificar si ya está instalado
if command -v ollama &> /dev/null; then
    echo "✅ Ollama ya está instalado"
    ollama --version
else
    echo "📥 Descargando e instalando Ollama..."
    curl -fsSL https://ollama.com/install.sh | sh
    
    if [ $? -eq 0 ]; then
        echo "✅ Ollama instalado correctamente"
    else
        echo "❌ Error instalando Ollama"
        exit 1
    fi
fi

echo ""
echo "📚 Descargando modelo Llama 3 8B (4.7GB)..."
echo "   Esto puede tardar varios minutos..."

ollama pull llama3:8b

if [ $? -eq 0 ]; then
    echo "✅ Modelo Llama 3 descargado"
else
    echo "❌ Error descargando modelo"
    exit 1
fi

echo ""
echo "🔧 Configurando Ollama como servicio systemd..."

sudo tee /etc/systemd/system/ollama.service > /dev/null <<EOF
[Unit]
Description=Ollama AI Service for Volquetes Roldan
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

echo ""
echo "✅ Ollama configurado como servicio"
echo ""

# Verificar que esté funcionando
sleep 3
if systemctl is-active --quiet ollama; then
    echo "✅ Servicio Ollama ACTIVO"
else
    echo "⚠️  Servicio Ollama no pudo iniciarse"
    echo "   Intenta manualmente: sudo systemctl start ollama"
fi

echo ""
echo "📋 Modelos instalados:"
ollama list

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  ✅ Instalación completada!                         ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  Comandos útiles:                                   ║"
echo "║  • Ver estado:    sudo systemctl status ollama      ║"
echo "║  • Ver logs:      sudo journalctl -u ollama -f      ║"
echo "║  • Reiniciar:     sudo systemctl restart ollama     ║"
echo "║  • Test:          ollama run llama3:8b 'Hola'       ║"
echo "╚══════════════════════════════════════════════════════╝"
