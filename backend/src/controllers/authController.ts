// import { Request, Response, NextFunction } from 'express';
// import '../types/express'; // Ensure the extended Request type is loaded
// import { UserService } from '../services/userService';
// import { AuthService } from '../services/authService';
// import logger from '../utils/loggerUtils';
// import { generateAccessToken } from '../utils/jwtUtils';
// import passport from 'passport';
// import { RegisterUserInput, RegisterUserSchema } from '../schemas/authSchemas';
// import { verifyRefreshToken } from '../utils/jwtUtils';

// export class AuthController {
//   static async registerUser(req: Request, res: Response): Promise<void> {
//     logger.info('Inside AuthController.registerUser');
//     logger.info('Request body:', req.body);
//     logger.info('Validated body:', req.validated);
//     try {
//       const registerUser: RegisterUserInput = req.validated?.body as RegisterUserInput;
//       const newUser = await AuthService.registerUser(registerUser);
//       res
//         .status(201)
//         .json({ message: 'User registered successfully', user: newUser });
//       logger.info('AuthController.registerUser Success');
//     } catch (error) {
//       logger.error(
//         `AuthController.registerUser error: ${(error as Error).message}`
//       );

//       res.status(500).json({
//         message: 'Internal Server Error',
//         error: (error as Error).message,
//       });
//     }
//   }

//   static async loginUser(req: Request,res: Response,next: NextFunction): Promise<void> {
//     try {
//       logger.info('Inside AuthController.loginUser');
//       // const loginData: LoginUserInput = req.validated?.body as LoginUserInput;

//       const authResult = await AuthService.authenticateLocal(req, res, next); // Authenticate using local strategy

//       const isFlutterClient = req.headers['x-client-type'] === 'Flutter';
//       if (isFlutterClient) {
//         res.status(200).json({
//           message: 'Login successful',
//           user: authResult.user,
//           userId: authResult.user.user_id,
//           username: authResult.user.username,
//           email: authResult.user.email,
//           contactNumber: authResult.user.contactNumber,
//           role: authResult.user.role,
//           accessToken: authResult.accessToken,
//           refreshToken: authResult.refreshToken,
//         });
//       } else {
//         res.cookie('refreshToken', authResult.refreshToken, {
//           httpOnly: true, // **Crucial for XSS protection**
//           secure: true, // **Crucial for HTTPS**
//           sameSite: 'lax', // **Consider for CSRF protection - choose Lax or Strict as needed**
//           path: '/', // Optional: Limit cookie to the refresh token endpoint path
//           maxAge: 30 * 24 * 60 * 60 * 1000, // Example: 30 days (match refresh token expiration)
//         });
//         res.status(200).json({
//           message: 'Login successful',
//           userId: authResult.user.id,
//           username: authResult.user.username,
//           email: authResult.user.email,
//           contactNumber: authResult.user.contactNumber,
//           role: authResult.user.role,
//           accessToken: authResult.accessToken,
//         });
//       }
//       logger.info('AuthController.loginUser Success');
//     } catch (error) {
//       logger.error(`AuthController.loginUser error: ${(error as Error).message}`);      
//       res.status(401).json({
//         message: 'Invalid credentials',
//         error: error instanceof Error ? error.message : String(error),
//       });
//     }
//   }

//   static async googleLogin(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> {
//     // Google Login initiation
//     passport.authenticate('google', {
//       scope: ['profile', 'email'],
//       session: false,
//     })(req, res, next); // session: false for JWT
//   }

//   static async googleCallback(req: Request, res: Response): Promise<any> {
//     logger.info('Inside AuthController.googleCallback');
//     try {
//       const authResult = req.user as any;

//       if (!authResult || !authResult.user) {
//         return res
//           .status(401)
//           .json({ message: 'Google authentication failed' });
//       }

//       const { accessToken, refreshToken } = authResult;

//       // Detect if request is from Flutter or Web
//       const isFlutterClient = req.headers['x-client-type'] === 'Flutter';

//       if (isFlutterClient) {
//         // Send refresh token in response body for Flutter
//         return res.status(200).json({
//           message: 'Google login successful',
//           accessToken,
//           refreshToken, // Flutter gets refresh token in body
//         });
//       } else {
//         // Send refresh token as an HTTP-only cookie for Web
//         res.cookie('refreshToken', refreshToken, {
//           httpOnly: true,
//           sameSite: 'lax',
//           secure: true,
//           maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//         });

//         return res.status(200).json({
//           message: 'Google login successful',
//           accessToken, // Web only receives access token in response
//         });
//       }
//     } catch (error) {
//       logger.error(
//         `AuthController.googleCallback error: ${(error as Error).message}`
//       );
//       return res.status(500).json({
//         message: 'Google login failed',
//         error: error instanceof Error ? error.message : String(error),
//       });
//     }
//   }

//   static async logoutUser(req: Request, res: Response): Promise<any> {
//       try {
//           logger.info('Inside AuthController.logoutUser');
  
//           const isFlutterClient = req.headers['x-client-type'] === 'Flutter';
//           let refreshTokenFromClient: string | undefined;
  
//           if (isFlutterClient) {
//               refreshTokenFromClient = req.validated?.body.refreshToken;
//           } else {
//             console.log('Cookies:', req.cookies); // ✅ Debugging
//               refreshTokenFromClient = req.validated?.cookies.refreshToken;
//           }
  
//           if (!refreshTokenFromClient) {
//               return res.status(401).json({ message: 'Refresh token is missing' });
//           }
  
//           // Verify if the refresh token is a valid JWT
//           try {
//               verifyRefreshToken(refreshTokenFromClient);
//           } catch (error) {
//               logger.warn('Invalid refresh token received, rejecting request');
//               return res.status(400).json({ message: 'Invalid refresh token' });
//           }
  
//           console.log('Valid Refresh Token:', refreshTokenFromClient);
  
//           // Call AuthService to handle logout logic
//           await AuthService.logoutUser(refreshTokenFromClient);
  
//           if (!isFlutterClient) {
//               res.clearCookie('refreshToken', {
//                   httpOnly: true,
//                   secure: true,
//                   sameSite: 'lax',
//               });
//           }
//           res.status(200).json({ message: 'Logged out successfully' });
//           logger.info('AuthController.logoutUser Success');
//       } catch (error) {
//           logger.error(`AuthController.logoutUser error: ${(error as Error).message}`);
//           res.status(500).json({
//               message: 'Internal Server Error',
//               error: (error as Error).message,
//           });
//       }
//   }
  
//   static async refreshToken(req: Request, res: Response): Promise<void> {
//     logger.info('Inside AuthController.refreshToken');
  
//     try {
//       console.log('Cookies:', req.cookies); // ✅ Debugging
//       console.log('Body:', req.body); // ✅ Debugging
//       console.log('Validated:', req.validated); // ✅ Debugging

      
  
//       const isFlutterClient = req.headers['x-client-type'] === 'Flutter';
//       let refreshTokenFromClient: string | undefined;

//       if (isFlutterClient) {
//         // refresh token from request body for Flutter
//         refreshTokenFromClient = req.validated?.body.refreshToken;
//       } else {
//         // refresh token from cookie for web
//         refreshTokenFromClient = req.validated?.cookies.refreshToken;
//       }

  
//       console.log('Extracted Refresh Token:', refreshTokenFromClient);
  
//       if (!refreshTokenFromClient) {
//         logger.warn('No refresh token provided');
//         res.status(400).json({ message: 'No refresh token provided.' });
//         return;
//       }
  
//       const validatedRefreshToken = await AuthService.validateRefreshToken(refreshTokenFromClient);
//       const user = await UserService.getUserById(validatedRefreshToken.userId);
    
  
//       if (!validatedRefreshToken) {
//         logger.warn('Invalid refresh token');
//         res.status(401).json({ message: 'Invalid refresh token.' });
//         return;
//       }

     
//       // ✅ Generate a new access token
//       const accessToken = generateAccessToken({
//         userId: validatedRefreshToken.userId,
//         email: user.email,
//         role: user.role,
//       });
  
//       res.status(200).json({
//         accessToken: accessToken,
//         message: 'Access token refreshed successfully',
//       });
  
//       logger.info('AuthController.refreshToken Success');
//     } catch (error) {
//       logger.error(`AuthController.refreshToken error: ${(error as Error).message}`);
//       res.status(500).json({
//         message: 'Internal Server Error',
//         error: (error as Error).message,
//       });
//     }
//   }
  
//   static async sendVerificationOtp(req: Request, res: Response): Promise<void> {
//     const { context, target, targetType } = req.body;
//     console.log(context, target, targetType)
  
//     try {
//       if (context === 'forgot_password') {
//         if (!target || targetType !== 'email') {
//            res.status(400).json({ message: 'Email is required for forgot password.' });
//            return
//         }
//         const result = await AuthService.sendOtp(context, target, 'email');
//          res.status(200).json(result);
//          return
//       }
      
      
//       // Context and targetType check
//       if (
//         (context === 'email_verification' && targetType !== 'email') ||
//         (context === 'mobile_verification' && targetType !== 'mobile')
//       ) {
//         res.status(400).json({
//           message: `Invalid combination: '${context}' context requires targetType '${context === 'email_verification' ? 'email' : 'mobile'}'`
//         });
//         return;
//       }

//       // Format check
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Define email regex
//       const mobileRegex = /^[0-9]{10,15}$/; // Define mobile regex

//       if (targetType === 'email' && !emailRegex.test(target)) {
//         res.status(400).json({ message: 'Invalid email format for targetType "email"' });
//         return;
//       }

//       if (targetType === 'mobile' && !mobileRegex.test(target)) {
//         res.status(400).json({ message: 'Invalid mobile number format for targetType "mobile"' });
//         return;
//       }
  
//       if (!req.validated) {
//          res.status(401).json({ message: 'Unauthorized. Login required.' });
//          return
//       }
  
//       const userId = req.userId as string;
//       const user = await UserService.getUserById(userId);
//       const expectedTarget = targetType === 'email' ? user.email : user.contactNumber;
  
//       if (target !== expectedTarget) {
//          res.status(401).json({ message: `Unauthorized. ${targetType} does not match.` });
//          return;
//       }
  
//       const result = await AuthService.sendOtp(context, target, targetType);
//       res.status(200).json(result);
//     } catch (error) {
//       res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
//     }
//   }
  
//   static async verifyVerificationOtp(req: Request, res: Response): Promise<void> {
//     logger.info('Inside AuthController.verifyVerificationOtp');
//     console.log(req.validated?.body)
//     try {
//       const { otp_code, target, context, targetType } = req.validated?.body;
//       const result = await AuthService.verifyOtp({ otp_code, target, context, targetType });
//       res.status(200).json(result);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }
    
//   static async resetPassword(req: Request, res: Response): Promise<void> {
//     logger.info('Inside AuthController.resetPassword');
//     try {
//       const authHeader = req.headers['authorization'];
//       if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         throw new Error('Authorization token is missing or invalid.');
//       }
//       const resetAccessToken = authHeader.split(' ')[1]; // Extract the token (remove "Bearer " prefix)

//       if (!resetAccessToken) {
//         throw new Error('Reset access token is required');
//       }
//       const { newPassword, confirmPassword } = req.body;

//       // Reset password using token
//       const result = await AuthService.resetPassword(
//         resetAccessToken,
//         newPassword,
//         confirmPassword
//       );
//       res
//         .status(200)
//         .json({ message: 'Password reset successfully', data: result });
//     } catch (error) {
//       res.status(400).json({ message: (error as Error).message });
//     }
//   }

// }




import { Request, Response, NextFunction } from 'express';
import logger from '../utils/loggerUtils';
import { AuthService } from '../services/authService';
import { RegisterUserInput } from '../schemas/authSchemas';

export class AuthController {
  static async registerUser(req: Request, res: Response): Promise<void> {
    logger.info('Inside AuthController.registerUser');
    try {
      const registerUser: RegisterUserInput = req.body;
      const result = await AuthService.registerUser(registerUser);
      res.status(201).json({ message: 'User registered successfully', ...result });
      logger.info('AuthController.registerUser Success');
    } catch (error) {
      logger.error(`AuthController.registerUser error: ${(error as Error).message}`);
      res.status(500).json({
        message: 'Internal Server Error',
        error: (error as Error).message,
      });
    }
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      logger.info('Inside AuthController.loginUser');
      const { email, password } = req.body;
      const result = await AuthService.loginUser(email, password);
      res.status(200).json({
        message: 'Login successful',
        ...result,
      });
      logger.info('AuthController.loginUser Success');
    } catch (error) {
      logger.error(`AuthController.loginUser error: ${(error as Error).message}`);
      res.status(401).json({
        message: 'Invalid credentials',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  static async getUser(req: Request, res: Response): Promise<void> {
    try {
      logger.info('Inside AuthController.getUser');
      const userId = (req as any).user.userId;
      const user = await AuthService.getUser(userId);
      res.json({ user });
      logger.info('AuthController.getUser Success');
    } catch (error) {
      logger.error(`AuthController.getUser error: ${(error as Error).message}`);
      res.status(500).json({
        message: 'Internal Server Error',
        error: (error as Error).message,
      });
    }
  }
}