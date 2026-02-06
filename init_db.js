const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://postgres.hxojihuhvvyumbrcwdwv:Pr0q50qF3888@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

async function run() {
    try {
        await client.connect();
        console.log('Connected to database!');

        const sqlPath = path.join(__dirname, '.agent/bbdd/svehi_schema_postgres.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Executing SQL script...');
        await client.query(sql);
        console.log('SQL script executed successfully!');

    } catch (err) {
        console.error('Error executing script:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

run();
