module.exports = {
  apps: [
    {
      name: 'volquetes-roldan-api',
      script: 'src/server.js',
      cwd: '/var/www/myapp/backend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        FRONTEND_URL: 'https://tudominio.com',
        DB_HOST: 'localhost',
        DB_PORT: 3306,
        DB_USER: 'volquetes_user',
        DB_PASSWORD: 'CHANGE_ME',
        DB_NAME: 'volquetes_roldan',
        OLLAMA_URL: 'http://localhost:11434',
        OLLAMA_MODEL: 'llama3:8b',
        OLLAMA_MAX_TOKENS: 500,
        OLLAMA_TEMPERATURE: 0.3
      }
    }
  ]
};
