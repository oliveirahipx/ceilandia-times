
const { Pool } = require('pg'); // Importa o pacote PostgreSQL

// Configuração da pool de conexões
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Necessário para conexões seguras no Render
    },
});

module.exports = pool; // Exporta a pool para ser usada em outras partes da aplicação
