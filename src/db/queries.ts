import { getDb, initDatabase } from './database';
import { ChecklistItem, Location } from './models';

// ⚙️ Ensure DB initialized at app start
initDatabase();

// ---------------- LOCATIONS ----------------

export const addLocation = async (loc: Location) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `INSERT INTO locations (id, name, latitude, longitude, radius) VALUES (?, ?, ?, ?, ?);`,
      [loc.id, loc.name, loc.latitude, loc.longitude, loc.radius]
    );
    console.log('✅ Location added:', loc.name);
  } catch (err) {
    console.error('❌ Add location error:', err);
  }
};

export const getLocations = async (): Promise<Location[]> => {
  try {
    const db = await getDb();
    const rows = await db.getAllAsync<Location>(`SELECT * FROM locations;`);
    return rows;
  } catch (err) {
    console.error('❌ Get locations error:', err);
    return [];
  }
};

// ---------------- CHECKLIST ----------------

export const addChecklistItem = async (item: ChecklistItem) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `INSERT INTO checklist (id, locationId, name, done) VALUES (?, ?, ?, ?);`,
      [item.id, item.locationId, item.name, item.done ? 1 : 0]
    );
    console.log('✅ Checklist item added:', item.name);
  } catch (err) {
    console.error('❌ Add checklist error:', err);
  }
};

export const getChecklistByLocation = async (
  locationId: string
): Promise<ChecklistItem[]> => {
  try {
    const db = await getDb();
    const rows = await db.getAllAsync<ChecklistItem>(
      `SELECT * FROM checklist WHERE locationId = ?;`,
      [locationId]
    );
    return rows.map(r => ({ ...r, done: !!r.done }));
  } catch (err) {
    console.error('❌ Get checklist error:', err);
    return [];
  }
};

export const updateChecklistItem = async (item: ChecklistItem) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `UPDATE checklist SET name = ?, done = ? WHERE id = ?;`,
      [item.name, item.done ? 1 : 0, item.id]
    );
    console.log('✅ Checklist updated:', item.name);
  } catch (err) {
    console.error('❌ Update checklist error:', err);
  }
};

export const deleteChecklistItem = async (id: string) => {
  try {
    const db = await getDb();
    await db.runAsync(`DELETE FROM checklist WHERE id = ?;`, [id]);
    console.log('🗑️ Checklist item deleted:', id);
  } catch (err) {
    console.error('❌ Delete checklist error:', err);
  }
};
