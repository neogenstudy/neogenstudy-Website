// import { z } from 'zod';
// import { verifyRefreshToken } from '../utils/jwtUtils';


// export const RegisterUserSchema = z.object({
//   username: z
//     .string()
//     .min(3, { message: 'Username must be at least 3 characters long' })
//     .max(30, { message: 'Username must be at most 30 characters' }),
  
//   email: z
//     .string()
//     .email({ message: 'A valid email address is required' }),
  
//   password: z
//     .string()
//     .min(8, { message: 'Password must be at least 8 characters long' })
//     .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
//     .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
//     .regex(/[0-9]/, { message: 'Password must contain at least one number' })
//     .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character (@$!%*?&)' }),
  
//   contactNumber: z
//     .string()
//     .regex(/^\d{10}$/, { message: 'Contact number must be exactly 10 digits' })
//     .optional()
//     .or(z.literal(undefined)),
// });



// // export const RegisterUserSchema = z.object({
// //   username: z.string().min(1, { message: 'Name is required' }),
// //   email: z.string().email({ message: 'Valid email is required' }),
// //   password: z
// //     .string()
// //     .min(6, { message: 'Password must be at least 6 characters' }),
// //   contactNumber: z.string().optional(),
// // });

//  export type RegisterUserInput = z.infer<typeof RegisterUserSchema>; //  This uses Zod's z.infer utility to automatically create a TypeScript type (RegisterUserInput) based on the structure defined in RegisterUserSchema.

// export const LoginUserSchema = z.object({
//   email: z.string().email({ message: 'Valid email is required' }),  
//   // This line defines the email field as a required string that must be a valid email format.
//   password: z.string().min(6, { message: 'Password must be at least 6 characters' }),

// });

// export type LoginUserInput = z.infer<typeof LoginUserSchema>; // This uses Zod's z.infer utility to automatically create a TypeScript type (LoginUserInput) based on the structure defined in LoginUserSchema.



// export const RefreshTokenSchema = z.object({
//   refreshToken: z
//     .string()
//     .min(1, { message: 'Refresh token is required' }) // Ensure it's not empty
//     .optional() // Allow undefined for when it's in cookies
//     .refine((token) => {
//       if (!token) return true; // If it's undefined (handled by cookies), skip validation
//       try {
//         verifyRefreshToken(token); // Ensure it's a valid token
//         return true;
//       } catch (error) {
//         return false;
//       }
//     }, { message: 'Invalid refresh token' }),
// });


// export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;


// export const SendOtpSchema = z.object({
//   context: z.enum([
//     'registration',
//     'profile_verification',
//     'forgot_password',
//     'payment',
//     'order_verification',
//     'email_verification',
//     'mobile_verification',
//     'change_password',
//   ], { message: 'Invalid context type' }),
//   target: z
//     .string()
//     .email({ message: 'Invalid email format' })
//     .or(z.string().regex(/^\d{10,15}$/, { message: 'Invalid contact number' }))
//     .optional(),
//   targetType: z.enum(['email', 'mobile'], { message: 'Invalid target type' }),
//   // targetType: z.enum(['email', 'mobile'], { message: 'Invalid target type' })
// })

// export type SendOtpInput = z.infer<typeof SendOtpSchema>;



// export const VerifyOtpSchema = z.object({
//   otp_code: z.string().min(6, { message: 'OTP must be 6 digits long' }),  // OTP code should be 6 digits long
//   target: z
//     .string()
//     .email({ message: 'Invalid email format' })
//     .or(z.string().regex(/^\d{10,15}$/, { message: 'Invalid contact number' }))
//     .optional(),
//   targetType : z.enum(['email', 'mobile'], { message: 'Invalid target type' }),
//   context: z.enum([
//     'registration', 
//     'profile_verification', 
//     'forgot_password', 
//     'payment', 
//     'order_verification',
//     'email_verification',
//     'mobile_verification',
//     'change_password',
//   ], { message: 'Invalid context type' })
//   .optional(),  // Only one of email or contactNumber should be provided
// });

// export type VerifyOtpInput = z.infer<typeof VerifyOtpSchema>;



// export const ResetPasswordSchema = z.object({
//   newPassword: z
//     .string()
//     .min(8, { message: 'Password must be at least 8 characters long.' }),
//   confirmPassword: z
//     .string()
//     .min(8, { message: 'Confirm Password must be at least 8 characters long.' }),
//   authorization: z.string().regex(/^Bearer\s[\w-]*\.[\w-]*\.[\w-]*$/, {
//     message: 'Invalid authorization token format',
//   }),
// })
// // Type for validation input
// export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;











export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
  role?: 'student' | 'mentor';
}