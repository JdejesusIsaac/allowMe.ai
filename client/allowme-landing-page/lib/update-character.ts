import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import { updateCharacterWithGradeInfo } from './db-migrate';

// Function to check if a table exists
function tableExists(db: Database.Database, tableName: string): boolean {
  try {
    const stmt = db.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name = ?"
    );
    const result = stmt.get(tableName);
    return !!result;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
}

// Function to find character files in the characters directory
function findCharacterFiles(charactersDir: string): string[] {
  try {
    if (!fs.existsSync(charactersDir)) {
      console.error(`Characters directory not found: ${charactersDir}`);
      return [];
    }

    const files = fs.readdirSync(charactersDir);
    return files
      .filter(file => file.endsWith('.character.json'))
      .map(file => path.join(charactersDir, file));
  } catch (error) {
    console.error('Error finding character files:', error);
    return [];
  }
}

// Function to update all character files with grade information for a specific user
export async function updateAllCharactersForUser(userId: string): Promise<void> {
  try {
    // Determine the characters directory path (adjust as needed)
    const charactersDir = path.resolve(process.cwd(), '../../characters');
    
    // Find all character files
    const characterFiles = findCharacterFiles(charactersDir);
    
    if (characterFiles.length === 0) {
      console.log('No character files found');
      return;
    }
    
    // Update each character file with the user's grade information
    for (const characterFile of characterFiles) {
      console.log(`Updating character file: ${characterFile}`);
      await updateCharacterWithGradeInfo(userId, characterFile);
    }
    
    console.log('All character files updated successfully');
  } catch (error) {
    console.error('Error updating character files:', error);
  }
}

// Function to update a specific character file with grade information for a specific user
export async function updateSpecificCharacterForUser(userId: string, characterName: string): Promise<boolean> {
  try {
    // Determine the characters directory path (adjust as needed)
    const charactersDir = path.resolve(process.cwd(), '../../characters');
    
    // Construct the character file path
    const characterFile = path.join(charactersDir, `${characterName}.character.json`);
    
    if (!fs.existsSync(characterFile)) {
      console.error(`Character file not found: ${characterFile}`);
      return false;
    }
    
    // Update the character file with the user's grade information
    return await updateCharacterWithGradeInfo(userId, characterFile);
  } catch (error) {
    console.error('Error updating character file:', error);
    return false;
  }
}

// If this script is run directly, update all character files for all users
if (require.main === module) {
  (async () => {
    try {
      // Initialize database connection
      const dataDir = path.join(process.cwd(), 'data');
      
      // Check if data directory exists
      if (!fs.existsSync(dataDir)) {
        console.log('Data directory does not exist yet. Creating it...');
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const dbPath = path.join(dataDir, 'allowme.db');
      
      // Check if database file exists
      if (!fs.existsSync(dbPath)) {
        console.log('Database file does not exist yet. Please run migrations first.');
        process.exit(0);
      }
      
      const db = new Database(dbPath);
      
      // Check if required tables exist
      if (!tableExists(db, 'users') || !tableExists(db, 'profiles')) {
        console.log('Required database tables do not exist yet. Please run migrations first.');
        db.close();
        process.exit(0);
      }
      
      // Get all users with completed profiles
      const stmt = db.prepare(`
        SELECT u.id, p.grade 
        FROM users u
        JOIN profiles p ON u.id = p.userId
        WHERE p.isCompleted = 1 AND p.grade IS NOT NULL
      `);
      
      const users = stmt.all() as { id: string, grade: string }[];
      
      if (users.length === 0) {
        console.log('No users with completed profiles found');
        db.close();
        return;
      }
      
      // Determine the characters directory path (adjust as needed)
      const charactersDir = path.resolve(process.cwd(), '../../characters');
      
      // Find all character files
      const characterFiles = findCharacterFiles(charactersDir);
      
      if (characterFiles.length === 0) {
        console.log('No character files found');
        db.close();
        return;
      }
      
      // Update each character file with each user's grade information
      for (const user of users) {
        console.log(`Processing user: ${user.id}`);
        for (const characterFile of characterFiles) {
          console.log(`Updating character file: ${characterFile}`);
          await updateCharacterWithGradeInfo(user.id, characterFile);
        }
      }
      
      console.log('All character files updated successfully');
      db.close();
    } catch (error) {
      console.error('Error updating character files:', error);
      process.exit(1);
    }
  })();
} 