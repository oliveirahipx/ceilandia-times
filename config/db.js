
const { Pool } = require('pg'); // Importa o pacote PostgreSQL

// Configuração da pool de conexões
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // SSL ligado por padrão (exigido pelo Postgres do Render).
    // Para um Postgres local sem SSL, use DATABASE_SSL=false no .env.
    ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
});

module.exports = pool; // Exporta a pool para ser usada em outras partes da aplicação
