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
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail } from 'lucide-react';
import { useRegistration } from '@/contexts/RegistrationContext';
import { extractRollNumber } from '@/utils/validation';
import { checkEmailAlreadyRegistered, signInWithGoogle } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';

interface EmailRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailRegistrationModal: React.FC<EmailRegistrationModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setRegistrationData, setFormData } = useRegistration();
  const navigate = useNavigate();

  

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const googleEmail = user?.email;
      if (!googleEmail) {
        toast({ title: 'No email', description: 'Google account has no email.', variant: 'destructive' });
        return;
      }

      // If email already registered, show existing popup
      const already = await checkEmailAlreadyRegistered(googleEmail);
      if (already) {
        toast({ title: 'Already Submitted', description: 'This Gmail is already submitted for induction.', variant: 'destructive' });
        return;
      }

  // Fill the email in context and prefill form fields
  setEmail(googleEmail);
  // set minimal form data so registration form shows email and roll no editable
  const rollNumber = extractRollNumber(googleEmail);
  setFormData({ email: googleEmail, rollNumber });

  // Also store minimal registration data in context
  setRegistrationData({ email: googleEmail, rollNumber, isRegistered: false });

      toast({ title: 'Signed in with Google', description: `Using ${googleEmail} — redirecting to registration.`, variant: 'default' });

  // Navigate to registration first, then close the modal to avoid
  // parent resetting state before the route reads it.
  navigate('/registration-form');
  onClose();
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Google Sign-In Error', description: err?.message || 'Failed to sign in with Google', variant: 'destructive' });
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
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Sign in with Google to continue</p>
          </div>

          <div className="space-y-2">
            <Button type="button" className="w-full btn-hero" onClick={handleGoogleSignIn} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in with Google'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailRegistrationModal;
