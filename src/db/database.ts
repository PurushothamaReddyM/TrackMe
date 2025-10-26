import * as SQLite from 'expo-sqlite';

// openDatabaseAsync returns a promise → so we wrap setup in an async function
export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('trackme.db');

  // Create the tables if they don’t exist
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS locations (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      radius REAL NOT NULL
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS checklist (
      id TEXT PRIMARY KEY NOT NULL,
      locationId TEXT NOT NULL,
      name TEXT NOT NULL,
      done INTEGER NOT NULL,
      FOREIGN KEY (locationId) REFERENCES locations(id)
    );
  `);

  console.log('✅ Database initialized');
  return db;
};

// You can still export a shared db instance if you want
export const getDb = async () => await SQLite.openDatabaseAsync('trackme.db');
