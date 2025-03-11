interface User {
  id: string
  name: string
  email: string
  image: string
  emailVerified: Date | null
}

interface Profile {
  id: string
  userId: string
  parentName: string
  studentName: string
  school: string
  grade: string
  parentTelegram: string
  studentTelegram: string
  parentWallet: string
  studentWallet: string
  openaiKey: string
  telegramToken: string
  evmKey: string
  walletRpc: string
  isCompleted: boolean
}

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { updateAllCharactersForUser } from './update-character';

class SQLiteStorage {
  private db: Database.Database;

  constructor() {
    // Create the data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Initialize the database
    this.db = new Database(path.join(dataDir, 'allowme.db'));
    this.initializeDatabase();
  }

  // Function to check if a table exists
  private tableExists(tableName: string): boolean {
    try {
      const stmt = this.db.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name = ?"
      );
      const result = stmt.get(tableName);
      return !!result;
    } catch (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
      return false;
    }
  }

  private initializeDatabase() {
    try {
      // Create users table
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          image TEXT,
          emailVerified TEXT
        )
      `);

      // Create profiles table
      this.db.exec(`
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
          walletRpc TEXT,
          isCompleted INTEGER DEFAULT 0,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `);
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    try {
      if (!this.tableExists('users')) {
        this.initializeDatabase();
      }

      const id = Date.now().toString();
      const emailVerified = user.emailVerified ? user.emailVerified.toISOString() : null;

      const stmt = this.db.prepare(`
        INSERT INTO users (id, name, email, image, emailVerified)
        VALUES (?, ?, ?, ?, ?)
      `);

      stmt.run(id, user.name, user.email, user.image, emailVerified);

      return {
        id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.emailVerified
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      if (!this.tableExists('users')) {
        return null;
      }

      const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
      const user = stmt.get(email) as any;

      if (!user) return null;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.emailVerified ? new Date(user.emailVerified) : null
      };
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  async createProfile(profile: Omit<Profile, "id">): Promise<Profile> {
    try {
      if (!this.tableExists('profiles')) {
        this.initializeDatabase();
      }

      const id = Date.now().toString();
      const isCompleted = profile.isCompleted ? 1 : 0;

      const stmt = this.db.prepare(`
        INSERT INTO profiles (
          id, userId, parentName, studentName, school, grade,
          parentTelegram, studentTelegram, parentWallet, studentWallet,
          openaiKey, telegramToken, evmKey, walletRpc, isCompleted
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        id, profile.userId, profile.parentName, profile.studentName,
        profile.school, profile.grade, profile.parentTelegram,
        profile.studentTelegram, profile.parentWallet, profile.studentWallet,
        profile.openaiKey, profile.telegramToken, profile.evmKey, profile.walletRpc, isCompleted
      );

      // If the profile is completed and has a grade, update character files
      if (profile.isCompleted && profile.grade) {
        try {
          await updateAllCharactersForUser(profile.userId);
        } catch (error) {
          console.error('Error updating character files:', error);
        }
      }

      // Update .env file with API keys
      try {
        const envVarsToUpdate: Record<string, string> = {};
        
        if (profile.openaiKey) {
          envVarsToUpdate["OPENAI_API_KEY"] = profile.openaiKey;
        }
        
        if (profile.telegramToken) {
          envVarsToUpdate["TELEGRAM_BOT_TOKEN"] = profile.telegramToken;
        }
        
        if (profile.evmKey) {
          envVarsToUpdate["EVM_PRIVATE_KEY"] = profile.evmKey;
        }
        
        if (profile.walletRpc) {
          envVarsToUpdate["EVM_PROVIDER_URL"] = profile.walletRpc;
        }
        
        if (Object.keys(envVarsToUpdate).length > 0) {
          const { updateEnvFile } = await import('./update-env');
          await updateEnvFile(envVarsToUpdate);
        }
      } catch (error) {
        console.error("Error updating .env file:", error);
        // Continue regardless of error in updating .env
      }

      return {
        id,
        ...profile,
        isCompleted: Boolean(isCompleted)
      };
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  async getProfileByUserId(userId: string): Promise<Profile | null> {
    try {
      if (!this.tableExists('profiles')) {
        return null;
      }

      const stmt = this.db.prepare('SELECT * FROM profiles WHERE userId = ?');
      const profile = stmt.get(userId) as any;

      if (!profile) return null;

      return {
        id: profile.id,
        userId: profile.userId,
        parentName: profile.parentName,
        studentName: profile.studentName,
        school: profile.school,
        grade: profile.grade,
        parentTelegram: profile.parentTelegram,
        studentTelegram: profile.studentTelegram,
        parentWallet: profile.parentWallet,
        studentWallet: profile.studentWallet,
        openaiKey: profile.openaiKey,
        telegramToken: profile.telegramToken,
        evmKey: profile.evmKey,
        walletRpc: profile.walletRpc,
        isCompleted: Boolean(profile.isCompleted)
      };
    } catch (error) {
      console.error('Error getting profile by user ID:', error);
      return null;
    }
  }

  async updateProfile(userId: string, profileData: Partial<Profile>): Promise<Profile | null> {
    try {
      if (!this.tableExists('profiles')) {
        this.initializeDatabase();
      }

      // Check if profile exists
      const existingProfile = await this.getProfileByUserId(userId);
      
      if (!existingProfile) {
        // If profile doesn't exist, create a new one
        return this.createProfile({ ...profileData, userId } as Omit<Profile, "id">);
      }

      // Build the SET clause dynamically based on provided fields
      const updates: string[] = [];
      const values: any[] = [];

      Object.entries(profileData).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'userId') {
          if (key === 'isCompleted') {
            updates.push(`${key} = ?`);
            values.push(value ? 1 : 0);
          } else {
            updates.push(`${key} = ?`);
            values.push(value);
          }
        }
      });

      if (updates.length === 0) {
        return existingProfile;
      }

      // Add userId to values for the WHERE clause
      values.push(userId);

      const stmt = this.db.prepare(`
        UPDATE profiles
        SET ${updates.join(', ')}
        WHERE userId = ?
      `);

      stmt.run(...values);

      // Get the updated profile
      const updatedProfile = await this.getProfileByUserId(userId);
      
      // If the profile is completed and has a grade, update character files
      if (updatedProfile && updatedProfile.isCompleted && updatedProfile.grade) {
        try {
          // Check if grade was updated
          const gradeUpdated = !existingProfile.grade || 
                              existingProfile.grade !== updatedProfile.grade || 
                              !existingProfile.isCompleted;
          
          if (gradeUpdated) {
            await updateAllCharactersForUser(userId);
          }
        } catch (error) {
          console.error('Error updating character files:', error);
        }
      }

      // Update .env file with API keys
      try {
        const envVarsToUpdate: Record<string, string> = {};
        
        if (profileData.openaiKey) {
          envVarsToUpdate["OPENAI_API_KEY"] = profileData.openaiKey;
        }
        
        if (profileData.telegramToken) {
          envVarsToUpdate["TELEGRAM_BOT_TOKEN"] = profileData.telegramToken;
        }
        
        if (profileData.evmKey) {
          envVarsToUpdate["EVM_PRIVATE_KEY"] = profileData.evmKey;
        }
        
        if (profileData.walletRpc) {
          envVarsToUpdate["EVM_PROVIDER_URL"] = profileData.walletRpc;
        }
        
        if (Object.keys(envVarsToUpdate).length > 0) {
          const { updateEnvFile } = await import('./update-env');
          await updateEnvFile(envVarsToUpdate);
        }
      } catch (error) {
        console.error("Error updating .env file:", error);
        // Continue regardless of error in updating .env
      }

      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  }

  async isProfileCompleted(userId: string): Promise<boolean> {
    try {
      if (!this.tableExists('profiles')) {
        return false;
      }
      
      const profile = await this.getProfileByUserId(userId);
      return profile ? profile.isCompleted : false;
    } catch (error) {
      console.error('Error checking if profile is completed:', error);
      return false;
    }
  }
}

const storage = new SQLiteStorage();
export default storage;

