import Database from "better-sqlite3";

// 仮でdatabase.dbとしている
const db = new Database("database.db");

const createUsersTableQuery = db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  weight REAL NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);
`);

const createDrinkingRecordsTableQuery = db.prepare(`
CREATE TABLE IF NOT EXISTS drinking_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  alcohol_amount REAL NOT NULL,
  condition INTEGER NOT NULL,
  date INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`);

createUsersTableQuery.run();
createDrinkingRecordsTableQuery.run();

export default db;