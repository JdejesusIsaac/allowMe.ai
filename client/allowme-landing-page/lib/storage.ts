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
  isCompleted: boolean
}

class InMemoryStorage {
  private users: User[] = []
  private profiles: Profile[] = []

  async createUser(user: Omit<User, "id">): Promise<User> {
    const newUser = { ...user, id: Date.now().toString() }
    this.users.push(newUser)
    return newUser
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async createProfile(profile: Omit<Profile, "id">): Promise<Profile> {
    const newProfile = { ...profile, id: Date.now().toString() }
    this.profiles.push(newProfile)
    return newProfile
  }

  async getProfileByUserId(userId: string): Promise<Profile | null> {
    return this.profiles.find((profile) => profile.userId === userId) || null
  }

  async updateProfile(userId: string, profileData: Partial<Profile>): Promise<Profile | null> {
    const index = this.profiles.findIndex((profile) => profile.userId === userId)
    if (index === -1) {
      // If profile doesn't exist, create a new one
      return this.createProfile({ ...profileData, userId } as Omit<Profile, "id">)
    }
    this.profiles[index] = { ...this.profiles[index], ...profileData }
    return this.profiles[index]
  }

  async isProfileCompleted(userId: string): Promise<boolean> {
    const profile = await this.getProfileByUserId(userId)
    return profile ? profile.isCompleted : false
  }
}

const storage = new InMemoryStorage()
export default storage

