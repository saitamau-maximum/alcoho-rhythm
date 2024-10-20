const Users = {
  createTable: `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      weight REAL NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );`,
};

const DrinkingRecords = {
  createTable: `
    CREATE TABLE IF NOT EXISTS drinking_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      alcohol_amount REAL NOT NULL,
      condition INTEGER NOT NULL,
      date INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );`,
};

const queries = { Users, DrinkingRecords };
export default queries;