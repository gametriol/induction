// import { FormErrors } from '@/types';

// // Email validation for @mmmut.ac.in domain with exactly 10 digits before @
// export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
//   const emailRegex = /^(\d{10})@mmmut\.ac\.in$/;
//   const match = email.match(emailRegex);
  
//   if (!match) {
//     if (!email.endsWith('@mmmut.ac.in')) {
//       return { isValid: false, error: 'Email must end with @mmmut.ac.in' };
//     }
//     return { isValid: false, error: 'Email must have exactly 10 digits before @mmmut.ac.in' };
//   }
  
//   return { isValid: true };
// };

// // Extract roll number (10 digits) from email
// export const extractRollNumber = (email: string): string => {
//   const match = email.match(/^(\d{10})@mmmut\.ac\.in$/);
//   return match ? match[1] : '';
// };

// // Mobile number validation (exactly 10 digits)
// export const validateMobileNumber = (mobile: string): { isValid: boolean; error?: string } => {
//   const mobileRegex = /^\d{10}$/;
  
//   if (!mobileRegex.test(mobile)) {
//     return { isValid: false, error: 'Mobile number must be exactly 10 digits' };
//   }
  
//   return { isValid: true };
// };

// // Word count validation
// export const validateWordCount = (text: string, maxWords: number): { isValid: boolean; error?: string } => {
//   const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  
//   if (words.length > maxWords) {
//     return { isValid: false, error: `Maximum ${maxWords} words allowed (current: ${words.length})` };
//   }
  
//   return { isValid: true };
// };

// // File size validation (max 1MB)
// export const validateFileSize = (file: File): { isValid: boolean; error?: string } => {
//   const maxSize = 1024 * 1024; // 1MB in bytes
  
//   if (file.size > maxSize) {
//     return { isValid: false, error: 'File size must be less than 1MB' };
//   }
  
//   return { isValid: true };
// };

// // File type validation for images
// export const validateImageType = (file: File): { isValid: boolean; error?: string } => {
//   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
//   if (!allowedTypes.includes(file.type)) {
//     return { isValid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
//   }
  
//   return { isValid: true };
// };

// // Generate random 6-digit OTP
// export const generateOTP = (): string => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Mock function to check if email is already registered
// export const checkEmailRegistration = async (email: string): Promise<boolean> => {
//   // Simulate API call delay
//   await new Promise(resolve => setTimeout(resolve, 1000));
  
//   // Mock registered emails for testing
//   const registeredEmails = [
//     '1234567890@mmmut.ac.in',
//     '9876543210@mmmut.ac.in'
//   ];
  
//   return registeredEmails.includes(email);
// };

// // Mock function to send OTP
// export const sendOTP = async (email: string, otp: string): Promise<boolean> => {
//   // Simulate API call delay
//   await new Promise(resolve => setTimeout(resolve, 1500));
  
//   // In real implementation, this would send email
//   console.log(`OTP ${otp} sent to ${email}`);
//   return true;
// };

// // Mock function to verify OTP
// export const verifyOTP = async (email: string, enteredOTP: string, actualOTP: string): Promise<boolean> => {
//   // Simulate API call delay
//   await new Promise(resolve => setTimeout(resolve, 1000));
  
//   return enteredOTP === actualOTP;
// };

// Email validation for @mmmut.ac.in domain with exactly 10 digits before @
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  const emailRegex = /^(\d{10})@mmmut\.ac\.in$/;
  const match = email.match(emailRegex);

  if (!match) {
    if (!email.endsWith('@mmmut.ac.in')) {
      return { isValid: false, error: 'Email must end with @mmmut.ac.in' };
    }
    return { isValid: false, error: 'Email must have exactly 10 digits before @mmmut.ac.in' };
  }

  return { isValid: true };
};

// Extract roll number (10 digits) from email
export const extractRollNumber = (email: string): string => {
  const match = email.match(/^(\d{10})@mmmut\.ac\.in$/);
  return match ? match[1] : '';
};

// Mobile number validation (exactly 10 digits)
export const validateMobileNumber = (mobile: string): { isValid: boolean; error?: string } => {
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile)) {
    return { isValid: false, error: 'Mobile number must be exactly 10 digits' };
  }
  return { isValid: true };
};

// Word count validation
export const validateWordCount = (text: string, maxWords: number): { isValid: boolean; error?: string } => {
  const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
  if (words.length > maxWords) {
    return { isValid: false, error: `Maximum ${maxWords} words allowed (current: ${words.length})` };
  }
  return { isValid: true };
};

// File size validation (max 1MB)
export const validateFileSize = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 1024 * 1024; // 1MB
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 1MB' };
  }
  return { isValid: true };
};

// File type validation for images
export const validateImageType = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
  }
  return { isValid: true };
};
