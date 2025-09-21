// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { useToast } from '@/hooks/use-toast';
// import { Loader2, Upload, CheckCircle2, ArrowLeft, User, FileText, Trophy } from 'lucide-react';
// import { useRegistration } from '@/contexts/RegistrationContext';
// import { useNavigate } from 'react-router-dom';
// import { 
//   validateWordCount, 
//   validateMobileNumber, 
//   validateFileSize, 
//   validateImageType 
// } from '@/utils/validation';
// import { COLLEGE_BRANCHES, ACADEMIC_YEARS, FormErrors } from '@/types';

// const RegistrationForm: React.FC = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { registrationData, formData, updateFormField } = useRegistration();
  
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   // Redirect if no registration data
//   useEffect(() => {
//     if (!registrationData) {
//       navigate('/');
//       return;
//     }
    
//     // Pre-fill email and roll number
//     updateFormField('email', registrationData.email);
//     updateFormField('rollNumber', registrationData.rollNumber);
//   }, [registrationData, navigate, updateFormField]);

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     // Required field validations
//     const requiredFields = [
//       'name', 'branch', 'year', 'mobileNumber', 'techSkills', 
//       'softSkills', 'weakness', 'strength', 'whyJoinFlux', 
//       'describeYourself', 'achievements'
//     ];

//     requiredFields.forEach(field => {
//       if (!formData[field as keyof typeof formData] || 
//           (typeof formData[field as keyof typeof formData] === 'string' && 
//            !formData[field as keyof typeof formData]?.toString().trim())) {
//         newErrors[field] = 'This field is required';
//       }
//     });

//     // Mobile number validation
//     if (formData.mobileNumber) {
//       const mobileValidation = validateMobileNumber(formData.mobileNumber);
//       if (!mobileValidation.isValid) {
//         newErrors.mobileNumber = mobileValidation.error!;
//       }
//     }

//     // Word count validations
//     const wordCountFields = [
//       { field: 'name', max: 50 },
//       { field: 'techSkills', max: 150 },
//       { field: 'softSkills', max: 200 },
//       { field: 'weakness', max: 100 },
//       { field: 'strength', max: 100 },
//       { field: 'otherSociety', max: 100 },
//       { field: 'whyJoinFlux', max: 150 },
//       { field: 'describeYourself', max: 150 },
//       { field: 'achievements', max: 200 }
//     ];

//     wordCountFields.forEach(({ field, max }) => {
//       const value = formData[field as keyof typeof formData]?.toString() || '';
//       if (value.trim()) {
//         const wordValidation = validateWordCount(value, max);
//         if (!wordValidation.isValid) {
//           newErrors[field] = wordValidation.error!;
//         }
//       }
//     });

//     // Image validation
//     if (formData.image) {
//       const sizeValidation = validateFileSize(formData.image);
//       if (!sizeValidation.isValid) {
//         newErrors.image = sizeValidation.error!;
//       }
      
//       const typeValidation = validateImageType(formData.image);
//       if (!typeValidation.isValid) {
//         newErrors.image = typeValidation.error!;
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       updateFormField('image', file);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast({
//         title: "Validation Error",
//         description: "Please fix the errors in the form before submitting.",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Mock successful submission
//       console.log('Form submitted:', formData);
      
//       setSubmitSuccess(true);
      
//       toast({
//         title: "Registration Successful!",
//         description: "Welcome to Flux Society! We'll contact you soon.",
//         variant: "default"
//       });

//       // Redirect after success
//       setTimeout(() => {
//         navigate('/');
//       }, 3000);
      
//     } catch (error) {
//       toast({
//         title: "Submission Failed",
//         description: "Something went wrong. Please try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getWordCount = (text: string) => {
//     return text.trim() ? text.trim().split(/\s+/).length : 0;
//   };

//   if (submitSuccess) {
//     return (
//       <div className="min-h-screen bg-animated flex items-center justify-center px-6">
//         <Card className="card-glow max-w-md w-full text-center animate-scale-in">
//           <CardContent className="p-8">
//             <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
//               <CheckCircle2 className="w-10 h-10 text-success" />
//             </div>
//             <h2 className="text-2xl font-bold mb-4 text-foreground">
//               Registration Complete!
//             </h2>
//             <p className="text-muted-foreground mb-6">
//               Thank you for joining Flux Society. We're excited to have you on board!
//             </p>
//             <Badge className="bg-success/10 text-success border-success/20">
//               Welcome to Flux! 🎉
//             </Badge>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!registrationData) {
//     return null; // Will redirect in useEffect
//   }

//   return (
//     <div className="min-h-screen bg-animated py-12 px-6">
//       <div className="container mx-auto max-w-4xl">
//         {/* Header */}
//         <div className="text-center mb-12 animate-slide-up">
//           <Button 
//             variant="ghost" 
//             onClick={() => navigate('/')}
//             className="absolute top-6 left-6 text-muted-foreground hover:text-foreground"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Home
//           </Button>
          
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
//             Join Flux Society
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Complete your registration to become part of MMMUT's premier tech community
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Personal Information */}
//           <Card className="card-glow animate-slide-up animation-delay-200">
//             <CardHeader>
//               <CardTitle className="flex items-center text-primary">
//                 <User className="w-5 h-5 mr-2" />
//                 Personal Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email Address</Label>
//                   <Input
//                     id="email"
//                     value={formData.email || ''}
//                     disabled
//                     className="bg-muted"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="rollNumber">Roll Number</Label>
//                   <Input
//                     id="rollNumber"
//                     value={formData.rollNumber || ''}
//                     disabled
//                     className="bg-muted"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="name">
//                   Full Name <span className="text-destructive">*</span>
//                 </Label>
//                 <Input
//                   id="name"
//                   placeholder="Enter your full name"
//                   value={formData.name || ''}
//                   onChange={(e) => updateFormField('name', e.target.value)}
//                   className={errors.name ? 'border-destructive' : 'input-glow'}
//                 />
//                 <div className="flex justify-between">
//                   {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
//                   <p className="text-xs text-muted-foreground ml-auto">
//                     {getWordCount(formData.name || '')}/50 words
//                   </p>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="branch">
//                     Branch <span className="text-destructive">*</span>
//                   </Label>
//                   <Select onValueChange={(value) => updateFormField('branch', value)}>
//                     <SelectTrigger className={errors.branch ? 'border-destructive' : 'input-glow'}>
//                       <SelectValue placeholder="Select your branch" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {COLLEGE_BRANCHES.map((branch) => (
//                         <SelectItem key={branch} value={branch}>
//                           {branch}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {errors.branch && <p className="text-sm text-destructive">{errors.branch}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="year">
//                     Academic Year <span className="text-destructive">*</span>
//                   </Label>
//                   <Select onValueChange={(value) => updateFormField('year', value)}>
//                     <SelectTrigger className={errors.year ? 'border-destructive' : 'input-glow'}>
//                       <SelectValue placeholder="Select your year" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {ACADEMIC_YEARS.map((year) => (
//                         <SelectItem key={year} value={year}>
//                           {year}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {errors.year && <p className="text-sm text-destructive">{errors.year}</p>}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="mobileNumber">
//                   Mobile Number <span className="text-destructive">*</span>
//                 </Label>
//                 <Input
//                   id="mobileNumber"
//                   placeholder="Enter 10-digit mobile number"
//                   value={formData.mobileNumber || ''}
//                   onChange={(e) => updateFormField('mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
//                   className={errors.mobileNumber ? 'border-destructive' : 'input-glow'}
//                 />
//                 {errors.mobileNumber && <p className="text-sm text-destructive">{errors.mobileNumber}</p>}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="image">Profile Image (Max 1MB)</Label>
//                 <div className="flex items-center space-x-4">
//                   <Input
//                     id="image"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className={errors.image ? 'border-destructive' : 'input-glow'}
//                   />
//                   {imagePreview && (
//                     <div className="w-16 h-16 rounded-lg overflow-hidden border border-border">
//                       <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//                     </div>
//                   )}
//                 </div>
//                 {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Skills & Experience */}
//           <Card className="card-glow animate-slide-up animation-delay-400">
//             <CardHeader>
//               <CardTitle className="flex items-center text-primary">
//                 <FileText className="w-5 h-5 mr-2" />
//                 Skills & Experience
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="techSkills">
//                   Technical Skills <span className="text-destructive">*</span>
//                 </Label>
//                 <Textarea
//                   id="techSkills"
//                   placeholder="Describe your technical skills, programming languages, frameworks, tools etc."
//                   value={formData.techSkills || ''}
//                   onChange={(e) => updateFormField('techSkills', e.target.value)}
//                   className={`min-h-[100px] ${errors.techSkills ? 'border-destructive' : 'input-glow'}`}
//                 />
//                 <div className="flex justify-between">
//                   {errors.techSkills && <p className="text-sm text-destructive">{errors.techSkills}</p>}
//                   <p className="text-xs text-muted-foreground ml-auto">
//                     {getWordCount(formData.techSkills || '')}/150 words
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="softSkills">
//                   Soft Skills <span className="text-destructive">*</span>
//                 </Label>
//                 <Textarea
//                   id="softSkills"
//                   placeholder="Describe your soft skills like leadership, communication, teamwork etc."
//                   value={formData.softSkills || ''}
//                   onChange={(e) => updateFormField('softSkills', e.target.value)}
//                   className={`min-h-[100px] ${errors.softSkills ? 'border-destructive' : 'input-glow'}`}
//                 />
//                 <div className="flex justify-between">
//                   {errors.softSkills && <p className="text-sm text-destructive">{errors.softSkills}</p>}
//                   <p className="text-xs text-muted-foreground ml-auto">
//                     {getWordCount(formData.softSkills || '')}/200 words
//                   </p>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="strength">
//                     Your Strengths <span className="text-destructive">*</span>
//                   </Label>
//                   <Textarea
//                     id="strength"
//                     placeholder="What are your key strengths?"
//                     value={formData.strength || ''}
//                     onChange={(e) => updateFormField('strength', e.target.value)}
//                     className={`min-h-[80px] ${errors.strength ? 'border-destructive' : 'input-glow'}`}
//                   />
//                   <div className="flex justify-between">
//                     {errors.strength && <p className="text-sm text-destructive">{errors.strength}</p>}
//                     <p className="text-xs text-muted-foreground ml-auto">
//                       {getWordCount(formData.strength || '')}/100 words
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="weakness">
//                     Areas for Improvement <span className="text-destructive">*</span>
//                   </Label>
//                   <Textarea
//                     id="weakness"
//                     placeholder="What areas would you like to improve?"
//                     value={formData.weakness || ''}
//                     onChange={(e) => updateFormField('weakness', e.target.value)}
//                     className={`min-h-[80px] ${errors.weakness ? 'border-destructive' : 'input-glow'}`}
//                   />
//                   <div className="flex justify-between">
//                     {errors.weakness && <p className="text-sm text-destructive">{errors.weakness}</p>}
//                     <p className="text-xs text-muted-foreground ml-auto">
//                       {getWordCount(formData.weakness || '')}/100 words
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Society & Motivation */}
//           <Card className="card-glow animate-slide-up animation-delay-600">
//             <CardHeader>
//               <CardTitle className="flex items-center text-primary">
//                 <Trophy className="w-5 h-5 mr-2" />
//                 About You
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="whyJoinFlux">
//                   Why do you want to join Flux Society? <span className="text-destructive">*</span>
//                 </Label>
//                 <Textarea
//                   id="whyJoinFlux"
//                   placeholder="Tell us your motivation for joining Flux Society..."
//                   value={formData.whyJoinFlux || ''}
//                   onChange={(e) => updateFormField('whyJoinFlux', e.target.value)}
//                   className={`min-h-[100px] ${errors.whyJoinFlux ? 'border-destructive' : 'input-glow'}`}
//                 />
//                 <div className="flex justify-between">
//                   {errors.whyJoinFlux && <p className="text-sm text-destructive">{errors.whyJoinFlux}</p>}
//                   <p className="text-xs text-muted-foreground ml-auto">
//                     {getWordCount(formData.whyJoinFlux || '')}/150 words
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="describeYourself">
//                   Describe Yourself <span className="text-destructive">*</span>
//                 </Label>
//                 <Textarea
//                   id="describeYourself"
//                   placeholder="Tell us about yourself, your interests, personality etc."
//                   value={formData.describeYourself || ''}
//                   onChange={(e) => updateFormField('describeYourself', e.target.value)}
//                   className={`min-h-[100px] ${errors.describeYourself ? 'border-destructive' : 'input-glow'}`}
//                 />
//                 <div className="flex justify-between">
//                   {errors.describeYourself && <p className="text-sm text-destructive">{errors.describeYourself}</p>}
//                   <p className="text-xs text-muted-foreground ml-auto">
//                     {getWordCount(formData.describeYourself || '')}/150 words
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="achievements">
//                   Achievements & Projects <span className="text-destructive">*</span>
//                 </Label>
//                 <Textarea
//                   id="achievements"
//                   placeholder="Share your achievements, projects, competitions, awards etc."
//                   value={formData.achievements || ''}
//                   onChange={(e) => updateFormField('achievements', e.target.value)}
//                   className={`min-h-[120px] ${errors.achievements ? 'border-destructive' : 'input-glow'}`}
//                 />
//                 <div className="flex justify-between">
//                   {errors.achievements && <p className="text-sm text-destructive">{errors.achievements}</p>}
//                   <p className="text-xs text-muted-foreground ml-auto">
//                     {getWordCount(formData.achievements || '')}/200 words
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="otherSociety">Other Societies/Clubs (Optional)</Label>
//                 <Textarea
//                   id="otherSociety"
//                   placeholder="Are you part of any other societies or clubs?"
//                   value={formData.otherSociety || ''}
//                   onChange={(e) => updateFormField('otherSociety', e.target.value)}
//                   className={`min-h-[80px] ${errors.otherSociety ? 'border-destructive' : 'input-glow'}`}
//                 />
//                 <div className="flex justify-between">
//                   {errors.otherSociety && <p className="text-sm text-destructive">{errors.otherSociety}</p>}
//                   <p className="text-xs text-muted-foreground ml-auto">
//                     {getWordCount(formData.otherSociety || '')}/100 words
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Submit Button */}
//           <div className="text-center animate-slide-up animation-delay-800">
//             <Button
//               type="submit"
//               className="btn-hero px-12 py-4 text-lg"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                   Submitting Registration...
//                 </>
//               ) : (
//                 'Complete Registration'
//               )}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;




import React, { useState, useEffect } from 'react';
import { useRegistration } from '@/contexts/RegistrationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { validateMobileNumber, validateWordCount, validateFileSize, validateImageType } from '@/utils/validation';
import { uploadImageToCloudinary } from '@/lib/cloudinaryClient';
import { saveRegistrationRecord, isSignInLink, completeSignInWithEmailLink } from '@/lib/firebase';

const RegistrationForm: React.FC = () => {
  const { registrationData, formData, updateFormField, setRegistrationData } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  // ✅ Complete Firebase email link sign-in when user arrives from verification email
  useEffect(() => {
    (async () => {
      try {
        if (isSignInLink()) {
          const result = await completeSignInWithEmailLink();
          const email = result.user.email;
          if (email) {
            const rollNumber = email.split('@')[0];
            setRegistrationData({ email, rollNumber, isRegistered: false });
            updateFormField('email', email);
            updateFormField('rollNumber', rollNumber);
          }
        }
      } catch (err) {
        console.error('Failed to complete sign-in link', err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // ✅ Validate mobile number
      const mobileValidation = validateMobileNumber(formData.mobileNumber || '');
      if (!mobileValidation.isValid) throw new Error(mobileValidation.error);

      // ✅ Validate soft skills, strengths, weaknesses, etc. with word limits
      const checks: { field: keyof typeof formData; max: number }[] = [
        { field: 'softSkills', max: 200 },
        { field: 'weakness', max: 100 },
        { field: 'strength', max: 100 },
        { field: 'whyJoinFlux', max: 150 },
        { field: 'describeYourself', max: 200 },
        { field: 'achievements', max: 200 },
      ];
      for (const check of checks) {
        const raw = formData[check.field];
        const val = raw && typeof raw !== 'string' ? String(raw) : (raw as string) || '';
        const result = validateWordCount(val, check.max);
        if (!result.isValid) throw new Error(`${String(check.field)}: ${result.error}`);
      }

      // ✅ Validate and upload image to Cloudinary
      let imageUrl: string | null = null;
      if (formData.image) {
        const file = formData.image as File;
        const sizeCheck = validateFileSize(file);
        if (!sizeCheck.isValid) throw new Error(sizeCheck.error);
        const typeCheck = validateImageType(file);
        if (!typeCheck.isValid) throw new Error(typeCheck.error);

        // Upload to Cloudinary using unsigned preset
        imageUrl = await uploadImageToCloudinary(file, 'flux-induction/profile-images');
      }

      // ✅ Save data in Firestore
      const record = {
        name: formData.name,
        email: formData.email,
        rollNumber: formData.rollNumber,
        branch: formData.branch,
        year: formData.year,
  mobileNumber: formData.mobileNumber,
  projectLink: formData.projectLink || '',
        techSkills: formData.techSkills,
        softSkills: formData.softSkills,
        weakness: formData.weakness,
        strength: formData.strength,
        otherSociety: formData.otherSociety || '',
        whyJoinFlux: formData.whyJoinFlux,
        describeYourself: formData.describeYourself,
        achievements: formData.achievements,
        imageUrl,
        submittedAt: new Date().toISOString(),
      };

      await saveRegistrationRecord(formData.email, record);

      setSubmitSuccess(true);
      toast({
        title: 'Registration Successful!',
        description: 'Welcome to Flux Society! We will contact you soon.',
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: 'Submission Failed',
        description: err?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!registrationData?.email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Please verify your email to continue.</p>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-primary">Thank you!</h2>
        <p className="text-muted-foreground mt-2">Your induction form has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Flux Induction Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => updateFormField('name', e.target.value)}
                required
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <Label>Email</Label>
              <Input value={formData.email || ''} disabled />
            </div>

            {/* Roll No (read-only) */}
            <div>
              <Label>Roll Number</Label>
              <Input value={formData.rollNumber || ''} disabled />
            </div>

            {/* Branch */}
            <div>
              <Label htmlFor="branch">Branch</Label>
              <select
                id="branch"
                value={formData.branch || ''}
                onChange={(e) => updateFormField('branch', e.target.value)}
                required
                className="w-full border rounded p-2"
              >
                <option value="">Select branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EE">EE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                {/* Add more if needed */}
              </select>
            </div>

            {/* Year */}
            <div>
              <Label htmlFor="year">Year</Label>
              <select
                id="year"
                value={formData.year || ''}
                onChange={(e) => updateFormField('year', e.target.value)}
                required
                className="w-full border rounded p-2"
              >
                <option value="">Select year</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
              </select>
            </div>

            {/* Mobile */}
            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                value={formData.mobileNumber || ''}
                onChange={(e) => updateFormField('mobileNumber', e.target.value)}
                required
              />
            </div>

            {/* Image */}
            <div>
              <Label htmlFor="image">Upload Image (max 1MB)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => updateFormField('image', e.target.files?.[0] || null)}
              />
            </div>

            {/* Textareas */}
            <div>
              <Label htmlFor="techSkills">Tech Skills</Label>
              <Textarea
                id="techSkills"
                value={formData.techSkills || ''}
                onChange={(e) => updateFormField('techSkills', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="projectLink">Portfolio / Project Link (optional)</Label>
              <Input
                id="projectLink"
                type="url"
                placeholder="https://github.com/yourusername/yourproject or https://your-portfolio.example.com"
                value={formData.projectLink || ''}
                onChange={(e) => updateFormField('projectLink', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="softSkills">Soft Skills (max 200 words)</Label>
              <Textarea
                id="softSkills"
                value={formData.softSkills || ''}
                onChange={(e) => updateFormField('softSkills', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="weakness">Weakness (max 100 words)</Label>
              <Textarea
                id="weakness"
                value={formData.weakness || ''}
                onChange={(e) => updateFormField('weakness', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="strength">Strengths (max 100 words)</Label>
              <Textarea
                id="strength"
                value={formData.strength || ''}
                onChange={(e) => updateFormField('strength', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="otherSociety">Any Other Society</Label>
              <Textarea
                id="otherSociety"
                value={formData.otherSociety || ''}
                onChange={(e) => updateFormField('otherSociety', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="whyJoinFlux">Why Join Flux (max 150 words)</Label>
              <Textarea
                id="whyJoinFlux"
                value={formData.whyJoinFlux || ''}
                onChange={(e) => updateFormField('whyJoinFlux', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="describeYourself">Describe Yourself (max 200 words)</Label>
              <Textarea
                id="describeYourself"
                value={formData.describeYourself || ''}
                onChange={(e) => updateFormField('describeYourself', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="achievements">Achievements (max 200 words)</Label>
              <Textarea
                id="achievements"
                value={formData.achievements || ''}
                onChange={(e) => updateFormField('achievements', e.target.value)}
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
