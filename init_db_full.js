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
        console.log('Connected!');

        const sqlPath = path.join(__dirname, 'svehi_full.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        // Naive split by semicolon. Might break on semicolons inside strings, but for DDL dump it's usually fine.
        // Oracle dumps usually have / or ; at end of line.

        const statements = sqlContent.split(';'); // simple split

        for (const stmt of statements) {
            const trimmed = stmt.trim();
            if (!trimmed) continue;

            try {
                await client.query(trimmed);
                // console.log('Executed:', trimmed.substring(0, 50));
            } catch (err) {
                // Ignore "relation exists" or "sequence exists"
                if (err.code === '42P07' || err.code === '42P04') { // duplicate_table or duplicate_object
                    // console.log('Skipping existing object');
                } else {
                    console.error('Error executing statement:', stmt.substring(0, 100), '...', err.message);
                }
            }
        }
        console.log('Full schema execution complete.');

    } catch (err) {
        console.error('Connection error:', err);
    } finally {
        await client.end();
    }
}

run();
