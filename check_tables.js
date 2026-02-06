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
        const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;");
        console.log('Tables in DB:');
        res.rows.forEach(row => console.log(row.table_name));
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

run();
