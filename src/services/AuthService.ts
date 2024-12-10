import { User } from '../types/auth';

// Simulated user database
const USERS: Record<string, User> = {
  'demo': {
    id: '1',
    username: 'demo',
    preferences: ['casual tone', 'technical topics']
  }
};

export class AuthService {
  async login(username: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = USERS[username.toLowerCase()];
    if (!user || password !== 'demo') {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  async logout(): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}