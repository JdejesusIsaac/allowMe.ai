import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database connection
const db = new Database(path.join(dataDir, 'allowme.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Function to check if a table exists
function tableExists(tableName: string): boolean {
  const stmt = db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name = ?"
  );
  const result = stmt.get(tableName);
  return !!result;
}

// Migration functions
function createTables() {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      image TEXT,
      emailVerified TEXT
    )
  `);

  // Create profiles table
  db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      userId TEXT UNIQUE NOT NULL,
      parentName TEXT,
      studentName TEXT,
      school TEXT,
      grade TEXT,
      parentTelegram TEXT,
      studentTelegram TEXT,
      parentWallet TEXT,
      studentWallet TEXT,
      openaiKey TEXT,
      telegramToken TEXT,
      evmKey TEXT,
      isCompleted INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // Create migrations table to track applied migrations
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      appliedAt TEXT DEFAULT (datetime('now'))
    )
  `);
}

// Function to check if a migration has been applied
function isMigrationApplied(migrationName: string): boolean {
  // If migrations table doesn't exist, no migrations have been applied
  if (!tableExists('migrations')) {
    return false;
  }
  
  const stmt = db.prepare('SELECT COUNT(*) as count FROM migrations WHERE name = ?');
  const result = stmt.get(migrationName) as { count: number };
  return result.count > 0;
}

// Function to record a migration as applied
function recordMigration(migrationName: string): void {
  const stmt = db.prepare('INSERT INTO migrations (name) VALUES (?)');
  stmt.run(migrationName);
}

// Function to update character.json with student grade information
async function updateCharacterWithGradeInfo(userId: string, characterPath: string): Promise<boolean> {
  try {
    // Check if profiles table exists
    if (!tableExists('profiles')) {
      console.log('Profiles table does not exist yet');
      return false;
    }
    
    // Get the profile from the database
    const stmt = db.prepare('SELECT grade FROM profiles WHERE userId = ?');
    const profile = stmt.get(userId) as { grade: string } | undefined;
    
    if (!profile || !profile.grade) {
      console.log(`No grade information found for user ${userId}`);
      return false;
    }
    
    // Read the character.json file
    const characterFilePath = path.resolve(characterPath);
    if (!fs.existsSync(characterFilePath)) {
      console.log(`Character file not found at ${characterFilePath}`);
      return false;
    }
    
    const characterData = JSON.parse(fs.readFileSync(characterFilePath, 'utf8'));
    
    // Update the system field with grade information
    if (characterData.system) {
      // Check if the grade information is already in the system field
      if (!characterData.system.includes('The student is in')) {
        characterData.system += `\nThe student is in ${profile.grade} grade.`;
      } else {
        // Replace existing grade information
        characterData.system = characterData.system.replace(
          /The student is in .* grade\./,
          `The student is in ${profile.grade} grade.`
        );
      }
      
      // Write the updated character data back to the file
      fs.writeFileSync(characterFilePath, JSON.stringify(characterData, null, 2), 'utf8');
      console.log(`Updated character file with grade information: ${profile.grade}`);
      return true;
    } else {
      console.log('Character file does not have a system field');
      return false;
    }
  } catch (error) {
    console.error('Error updating character files:', error);
    return false;
  }
}

// Run migrations
async function runMigrations() {
  console.log('Running database migrations...');

  try {
    // Create tables if they don't exist
    if (!isMigrationApplied('initial_schema')) {
      console.log('Applying migration: initial_schema');
      createTables();
      
      // Only try to record the migration if the migrations table exists
      if (tableExists('migrations')) {
        recordMigration('initial_schema');
      }
      console.log('Migration applied: initial_schema');
    }

    // Add more migrations here as needed
    // Example:
    // if (!isMigrationApplied('add_new_column')) {
    //   console.log('Applying migration: add_new_column');
    //   db.exec('ALTER TABLE profiles ADD COLUMN new_column TEXT');
    //   recordMigration('add_new_column');
    //   console.log('Migration applied: add_new_column');
    // }

    console.log('All migrations completed.');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
}

// Export the updateCharacterWithGradeInfo function for use in other files
export { updateCharacterWithGradeInfo };

// Run migrations
runMigrations()
  .then(() => {
    console.log('Database setup complete.');
  })
  .catch((error) => {
    console.error('Error during migration:', error);
  })
  .finally(() => {
    // Don't close the database connection here as it might be used by other parts of the application
    // db.close();
  }); 