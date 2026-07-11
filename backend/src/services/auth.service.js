import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { usersMock, createUserMock } from '../models/user.mock.js';

const JWT_SECRET = process.env.JWT_SECRET || 'matchday_super_secret_key_2026';
const JWT_EXPIRES_IN = '24h';

class AuthService {
  async register(userData) {
    const existingUser = usersMock.find(u => u.email === userData.email);
    if (existingUser) {
      throw { statusCode: 400, message: "Email already exists" };
    }

    const user = await createUserMock(userData);
    const token = this.generateToken(user);
    
    // Omit password from return object
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async login(email, password) {
    const user = usersMock.find(u => u.email === email);
    if (!user) {
      throw { statusCode: 401, message: "Invalid credentials" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { statusCode: 401, message: "Invalid credentials" };
    }

    const token = this.generateToken(user);
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  getUserById(id) {
    const user = usersMock.find(u => u.id === id);
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, role: user.role, stadiumId: user.stadiumId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }
}

export default new AuthService();
