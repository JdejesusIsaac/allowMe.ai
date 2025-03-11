import fs from 'fs';
import path from 'path';

/**
 * Updates the root .env file with new values
 * @param envVars - Object containing environment variables to update
 * @returns Promise<boolean> - Success status
 */
export async function updateEnvFile(envVars: Record<string, string>): Promise<boolean> {
  try {
    // Find the root .env file (two directories up from the landing-page directory)
    const rootPath = path.resolve(process.cwd(), '..', '..');
    const envFilePath = path.join(rootPath, '.env');
    
    console.log(`Updating .env file at: ${envFilePath}`);
    
    if (!fs.existsSync(envFilePath)) {
      console.error(`Error: .env file not found at ${envFilePath}`);
      return false;
    }
    
    // Read the current contents
    let envContent = fs.readFileSync(envFilePath, 'utf-8');
    let updated = false;
    
    // Update each environment variable
    for (const [key, value] of Object.entries(envVars)) {
      if (!value || value.trim() === '') continue;
      
      const regex = new RegExp(`^${key}=.*$`, 'm');
      
      if (regex.test(envContent)) {
        // Replace existing value
        envContent = envContent.replace(regex, `${key}=${value}`);
        console.log(`Updated ${key} in .env file`);
      } else {
        // Add new value
        envContent += `\n${key}=${value}`;
        console.log(`Added ${key} to .env file`);
      }
      updated = true;
    }
    
    if (updated) {
      // Write back to file
      fs.writeFileSync(envFilePath, envContent, 'utf-8');
      console.log('Successfully updated .env file');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating .env file:', error);
    return false;
  }
} 