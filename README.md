# Rold-n-Clean Web (Frontend + Backend)

## Requisitos
- Node.js 18+
- npm
- (Backend) MySQL + Ollama

## Instalacion local
```bash
# Frontend
npm install
cp .env.example .env
npm run dev

# Backend
cd backend
npm install
cp .env.example .env
npm run dev
```

## Variables de entorno
### Frontend (Vite)
Archivo: `.env` o `.env.production`
```
VITE_API_URL=https://api.tudominio.com
```

### Backend
Archivo: `backend/.env`
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tudominio.com
DB_HOST=localhost
DB_PORT=3306
DB_USER=volquetes_user
DB_PASSWORD=changeme
DB_NAME=volquetes_roldan
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3:8b
OLLAMA_MAX_TOKENS=500
OLLAMA_TEMPERATURE=0.3
```

## Build del Frontend
```bash
npm run build
```
Salida: `dist/`

## Deploy Front (Ferozo / cPanel)
1. Ejecutar `npm run build`.
2. Subir TODO el contenido de `dist/` por FTP a `/public_html`.
3. Verificar que `public_html/index.html` existe.
4. El `.htaccess` ya se copia desde `public/.htaccess`.

## Deploy Back (VPS) con PM2 + Nginx + SSL
### 1) Preparar VPS
```bash
sudo apt update
sudo apt install -y nginx
# Instalar Node.js (usar tu metodo preferido)
```

### 2) Subir proyecto y configurar backend
```bash
sudo mkdir -p /var/www/myapp
sudo chown -R ubuntu:ubuntu /var/www/myapp

# Clonar repo en /var/www/myapp
cd /var/www/myapp
# git clone <repo>

cd /var/www/myapp/backend
npm install
cp .env.example .env
nano .env
```

### 3) PM2
```bash
sudo npm i -g pm2
cd /var/www/myapp/backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4) Nginx (reverse proxy)
```bash
sudo cp /var/www/myapp/docs/nginx-api.tudominio.com.conf /etc/nginx/sites-available/api.tudominio.com
sudo ln -s /etc/nginx/sites-available/api.tudominio.com /etc/nginx/sites-enabled/api.tudominio.com
sudo nginx -t
sudo systemctl reload nginx
```

### 5) SSL (Let’s Encrypt)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.tudominio.com
```

### 6) Health check
```bash
curl https://api.tudominio.com/health
```

## Troubleshooting
- CORS: revisar `FRONTEND_URL` en `backend/.env` (usar coma para multiples orígenes).
- 404 en rutas SPA: confirmar que `public_html/.htaccess` existe (se copia desde `public/.htaccess`).
- API URL mal: revisar `VITE_API_URL` y volver a ejecutar `npm run build`.
- PM2 caido: `pm2 status` y `pm2 logs volquetes-roldan-api`.
