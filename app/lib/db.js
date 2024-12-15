import sqlite3 from "sqlite3";
import { promisify } from "util";

const db = new sqlite3.Database("links.db");
const dbGet = promisify(db.get).bind(db);

// Create table and db file if absent
db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS links (
            code TEXT PRIMARY KEY,
            long TEXT
        )`);
});

export { db, dbGet };