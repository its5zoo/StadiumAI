import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userRepository from '../repositories/user.repository.js';
// Fallback mock array just in case DB is entirely unavailable during testing
import { usersMock, createUserMock } from '../models/user.mock.js';

const JWT_SECRET = process.env.JWT_SECRET || 'matchday_super_secret_key_2026';
const JWT_EXPIRES_IN = '24h';

class AuthService {
  async register(userData) {
    try {
      const existingUser = await userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw { statusCode: 400, message: "Email already exists" };
      }

      // Hash password before saving to DB
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await userRepository.create({
        ...userData,
        password: hashedPassword
      });

      const token = this.generateToken(newUser);
      
      return { user: newUser.toJSON(), token };
    } catch (error) {
      if (error.statusCode) throw error;
      
      console.warn("DB unavailable, falling back to mock registration");
      const mockResult = await this.registerMock(userData);
      return mockResult;
    }
  }

  async login(email, password) {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw { statusCode: 401, message: "Invalid credentials" };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw { statusCode: 401, message: "Invalid credentials" };
      }

      const token = this.generateToken(user);
      return { user: user.toJSON(), token };
    } catch (error) {
      if (error.statusCode) throw error;
      
      console.warn("DB unavailable, falling back to mock login");
      return this.loginMock(email, password);
    }
  }

  async getUserById(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw { statusCode: 404, message: "User not found" };
      }
      return user.toJSON();
    } catch (error) {
      if (error.statusCode) throw error;
      
      const mockUser = usersMock.find(u => u.id === id);
      if (!mockUser) throw { statusCode: 404, message: "User not found" };
      const { password, ...userWithoutPassword } = mockUser;
      return userWithoutPassword;
    }
  }

  // Fallbacks
  async registerMock(userData) {
    const existingUser = usersMock.find(u => u.email === userData.email);
    if (existingUser) {
      throw { statusCode: 400, message: "Email already exists" };
    }
    const user = await createUserMock(userData);
    const token = this.generateToken(user);
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async loginMock(email, password) {
    const user = usersMock.find(u => u.email === email);
    if (!user) throw { statusCode: 401, message: "Invalid credentials" };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { statusCode: 401, message: "Invalid credentials" };
    const token = this.generateToken(user);
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
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
