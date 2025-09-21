// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/hooks/use-toast';
// import { Loader2, Mail, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
// import { useRegistration } from '@/contexts/RegistrationContext';
// import { validateEmail, extractRollNumber, checkEmailRegistration, sendOTP, verifyOTP, generateOTP } from '@/utils/validation';
// import { useNavigate } from 'react-router-dom';

// interface EmailRegistrationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// type ModalStep = 'email' | 'otp' | 'success';

// const EmailRegistrationModal: React.FC<EmailRegistrationModalProps> = ({ isOpen, onClose }) => {
//   const [step, setStep] = useState<ModalStep>('email');
//   const [email, setEmail] = useState('');
//   const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
//   const [generatedOTP, setGeneratedOTP] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [otpTimer, setOtpTimer] = useState(0);
//   const otpRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  
//   const { toast } = useToast();
//   const { setRegistrationData } = useRegistration();
//   const navigate = useNavigate();

//   // Timer effect for OTP resend
//   React.useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (otpTimer > 0) {
//       interval = setInterval(() => {
//         setOtpTimer(timer => timer - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [otpTimer]);

//   const handleEmailSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const emailValidation = validateEmail(email);
//     if (!emailValidation.isValid) {
//       toast({
//         title: "Invalid Email",
//         description: emailValidation.error,
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       // Check if email is already registered
//       const isRegistered = await checkEmailRegistration(email);
      
//       if (isRegistered) {
//         toast({
//           title: "Already Registered",
//           description: "This email is already registered with Flux Society.",
//           variant: "destructive"
//         });
//         setIsLoading(false);
//         return;
//       }

//       // Generate and send OTP
//       const newOTP = generateOTP();
//       setGeneratedOTP(newOTP);
      
//       const otpSent = await sendOTP(email, newOTP);
      
//       if (otpSent) {
//         setStep('otp');
//         setOtpTimer(60); // 60 second timer
//         toast({
//           title: "OTP Sent",
//           description: `Verification code sent to ${email}`,
//           variant: "default"
//         });
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to send OTP. Please try again.",
//           variant: "destructive"
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Something went wrong. Please try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOTPChange = (index: number, value: string) => {
//     if (value.length > 1) return; // Prevent multiple characters
    
//     const newOtpDigits = [...otpDigits];
//     newOtpDigits[index] = value;
//     setOtpDigits(newOtpDigits);
    
//     // Auto-focus next input
//     if (value && index < 5) {
//       otpRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
//       // Focus previous input on backspace if current is empty
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleOTPSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const otp = otpDigits.join('');
//     if (otp.length !== 6) {
//       toast({
//         title: "Invalid OTP",
//         description: "Please enter all 6 digits",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const isValidOTP = await verifyOTP(email, otp, generatedOTP);
      
//       if (isValidOTP) {
//         const rollNumber = extractRollNumber(email);
//         setRegistrationData({
//           email,
//           rollNumber,
//           isRegistered: false
//         });
        
//         setStep('success');
        
//         // Auto redirect after success animation
//         setTimeout(() => {
//           onClose();
//           resetModal();
//           window.location.href = '/registration-form';
//         }, 2000);
//       } else {
//         toast({
//           title: "Invalid OTP",
//           description: "The OTP entered is incorrect. Please try again.",
//           variant: "destructive"
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to verify OTP. Please try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     const newOTP = generateOTP();
//     setGeneratedOTP(newOTP);
//     setOtpDigits(['', '', '', '', '', '']);
//     setOtpTimer(60);
    
//     try {
//       await sendOTP(email, newOTP);
//       toast({
//         title: "OTP Resent",
//         description: "New verification code sent to your email",
//         variant: "default"
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to resend OTP",
//         variant: "destructive"
//       });
//     }
//   };

//   const resetModal = () => {
//     setStep('email');
//     setEmail('');
//     setOtpDigits(['', '', '', '', '', '']);
//     setGeneratedOTP('');
//     setOtpTimer(0);
//   };

//   const handleClose = () => {
//     resetModal();
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent className="sm:max-w-md card-static border-border/50 select-none">
//         <DialogHeader>
//           <DialogTitle className="text-center text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//             {step === 'email' && 'Join Flux Society'}
//             {step === 'otp' && 'Verify Your Email'}
//             {step === 'success' && 'Welcome to Flux!'}
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6 mt-6">
//           {step === 'email' && (
//             <form onSubmit={handleEmailSubmit} className="space-y-4 animate-scale-in">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Mail className="w-8 h-8 text-primary" />
//                 </div>
//                 <p className="text-muted-foreground">
//                   Enter your college email to get started
//                 </p>
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="email">College Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="1234567890@mmmut.ac.in"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="input-glow"
//                   required
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Must be your MMMUT email with 10-digit roll number
//                 </p>
//               </div>
              
//               <Button
//                 type="submit"
//                 className="w-full btn-hero"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Sending OTP...
//                   </>
//                 ) : (
//                   <>
//                     Send Verification Code
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </>
//                 )}
//               </Button>
//             </form>
//           )}

//           {step === 'otp' && (
//             <form onSubmit={handleOTPSubmit} className="space-y-4 animate-scale-in">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Shield className="w-8 h-8 text-primary" />
//                 </div>
//                 <p className="text-muted-foreground">
//                   Enter the 6-digit code sent to
//                 </p>
//                 <p className="font-medium text-foreground">{email}</p>
//               </div>
              
//               <div className="space-y-4">
//                 <Label className="text-center block">Verification Code</Label>
//                 <div className="flex justify-center space-x-3">
//                   {otpDigits.map((digit, index) => (
//                     <Input
//                       key={index}
//                       ref={(el) => otpRefs.current[index] = el}
//                       type="text"
//                       inputMode="numeric"
//                       pattern="[0-9]"
//                       value={digit}
//                       onChange={(e) => handleOTPChange(index, e.target.value.replace(/\D/g, ''))}
//                       onKeyDown={(e) => handleOTPKeyDown(index, e)}
//                       className="w-12 h-12 text-center text-xl font-bold input-glow border-2 focus:scale-105 transition-transform"
//                       maxLength={1}
//                     />
//                   ))}
//                 </div>
//               </div>
              
//               <Button
//                 type="submit"
//                 className="w-full btn-hero"
//                 disabled={isLoading || otpDigits.some(digit => !digit)}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Verifying...
//                   </>
//                 ) : (
//                   'Verify Code'
//                 )}
//               </Button>
              
//               <div className="text-center">
//                 {otpTimer > 0 ? (
//                   <p className="text-sm text-muted-foreground">
//                     Resend code in {otpTimer}s
//                   </p>
//                 ) : (
//                   <Button
//                     type="button"
//                     variant="link"
//                     onClick={handleResendOTP}
//                     className="text-primary hover:text-primary-glow"
//                   >
//                     Resend verification code
//                   </Button>
//                 )}
//               </div>
//             </form>
//           )}

//           {step === 'success' && (
//             <div className="text-center space-y-4 animate-scale-in">
//               <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto animate-glow">
//                 <CheckCircle2 className="w-10 h-10 text-success" />
//               </div>
//               <h3 className="text-xl font-semibold text-foreground">
//                 Email Verified Successfully!
//               </h3>
//               <p className="text-muted-foreground">
//                 Redirecting to registration form...
//               </p>
//               <div className="flex justify-center">
//                 <Loader2 className="w-6 h-6 animate-spin text-primary" />
//               </div>
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EmailRegistrationModal;



// src/components/EmailRegistrationModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRegistration } from '@/contexts/RegistrationContext';
import { validateEmail, extractRollNumber } from '@/utils/validation';
import { sendEmailSignInLink, checkEmailAlreadyRegistered } from '@/lib/firebase';

interface EmailRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailRegistrationModal: React.FC<EmailRegistrationModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setRegistrationData } = useRegistration();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      toast({
        title: "Invalid Email",
        description: emailValidation.error,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const already = await checkEmailAlreadyRegistered(email);
      if (already) {
        toast({
          title: "Already Registered",
          description: "This email has already submitted induction details.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Send Firebase Email Link
      await sendEmailSignInLink(email);

      // Save to registration context minimal info (roll extracted)
      const rollNumber = extractRollNumber(email);
      setRegistrationData({ email, rollNumber, isRegistered: false });

      toast({
        title: "Verification Sent",
        description: `A sign-in link was sent to ${email}. Click it to continue registration.`,
        variant: "default"
      });

      // Keep modal open or close — we close and instruct user to check email
      onClose();
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err?.message || "Failed to send verification link. Check console.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md card-static border-border/50 select-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Join Flux Society
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <form onSubmit={handleEmailSubmit} className="space-y-4 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">Enter your college email to get started</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">College Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="1234567890@mmmut.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glow"
                required
              />
              <p className="text-xs text-muted-foreground">
                Must be your MMMUT email with 10-digit roll number
              </p>
            </div>

            <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending Link...
                </>
              ) : (
                <>
                  Send Verification Link
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailRegistrationModal;
