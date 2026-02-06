const { Client } = require('pg');

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
        console.log('Connected! Dropping tables...');

        // Drop all tables in public schema
        await client.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;");

        console.log('Tables dropped.');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

run();
