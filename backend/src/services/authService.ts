import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../utils/loggerUtils';
import { RegisterUserInput } from '../schemas/authSchemas';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// User Schema
interface IUser extends mongoose.Document {
  userId: string;
  userName: string | null;
  email: string;
  password: string | null;
  contactNumber: string | null;
  googleId: string | null;
  role: 'customer' | 'admin' | 'supplier' | 'student' | 'mentor';
  emailVerificationStatus: 'verified' | 'unverified';
  mobileVerificationStatus: 'verified' | 'unverified';
  profilePic: string;
}

const userSchema = new mongoose.Schema({
  userId: { type: String, default: () => require('uuid').v4(), unique: true },
  userName: { type: String, nullable: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, nullable: true },
  contactNumber: { type: String, unique: true, sparse: true, nullable: true },
  googleId: { type: String, unique: true, sparse: true, nullable: true },
  role: {
    type: String,
    enum: ['customer', 'admin', 'supplier', 'student', 'mentor'],
    default: 'student',
  },
  emailVerificationStatus: {
    type: String,
    enum: ['verified', 'unverified'],
    default: 'unverified',
  },
  mobileVerificationStatus: {
    type: String,
    enum: ['verified', 'unverified'],
    default: 'unverified',
  },
  profilePic: {
    type: String,
    default: 'https://silver-badger-387864.hostingersite.com/ssv_user_pics/default_user_profile_pic.png',
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export class AuthService {
  static async registerUser(userData: RegisterUserInput) {
    logger.info('Inside AuthService.registerUser');
    const { email, password, username: userName, role } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.error('Email already registered');
      throw new Error('Email already registered');
    }

    // Hash password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Create and save new user
    const user = new User({
      userId: require('uuid').v4(),
      userName,
      email,
      password: hashedPassword,
      role: role || 'student',
      contactNumber: null,
      googleId: null,
      emailVerificationStatus: 'unverified',
      mobileVerificationStatus: 'unverified',
      profilePic: 'https://silver-badger-387864.hostingersite.com/ssv_user_pics/default_user_profile_pic.png',
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user.userId, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    logger.info('AuthService.registerUser Success');
    return { token, user: { userId: user.userId, email, userName, role } };
  }


  
  static async loginUser(email: string, password: string) {
    logger.info('Inside AuthService.loginUser');

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn('User not found');
      throw new Error('Invalid credentials');
    }

    // Verify password if provided
    if (!user.password || !password) {
      logger.warn('Password authentication not available');
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn('Invalid password');
      throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.userId, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    logger.info('AuthService.loginUser Success');
    return { token, user: { userId: user.userId, email, userName: user.userName, role: user.role } };
  }



  static async getUser(userId: string) {
    logger.info('Inside AuthService.getUser');
    const user = await User.findOne({ userId }).select('-password');
    if (!user) {
      logger.warn('User not found');
      throw new Error('User not found');
    }
    return user;
  }
}