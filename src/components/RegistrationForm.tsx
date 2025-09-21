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
import { saveRegistrationRecord, isSignInLink, completeSignInWithEmailLink, getRegistrationByRollNumber } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  const { registrationData, formData, updateFormField, setRegistrationData } = useRegistration();
  const navigate = useNavigate();
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

  // Redirect immediately if not signed in
  useEffect(() => {
    if (!registrationData?.email) {
      navigate('/');
    }
  }, [registrationData, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Block if user hasn't signed in via the modal
      if (!registrationData?.email) {
        toast({ title: 'Not signed in', description: 'Please sign in with Google before submitting the form.', variant: 'destructive' });
        navigate('/');
        return;
      }

      // Ensure all required fields are present (projectLink is optional)
      const requiredFields: (keyof typeof formData)[] = [
        'name', 'branch', 'year', 'mobileNumber', 'techSkills', 'softSkills', 'weakness', 'strength', 'whyJoinFlux', 'describeYourself', 'achievements', 'rollNumber'
      ];
      for (const field of requiredFields) {
        const val = formData[field];
        if (!val || (typeof val === 'string' && !String(val).trim())) {
          throw new Error('Please fill all required fields before submitting.');
        }
      }
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

      // ✅ Check roll number uniqueness
      if (formData.rollNumber) {
        const existingEmail = await getRegistrationByRollNumber(formData.rollNumber);
        if (existingEmail && existingEmail !== formData.email) {
          throw new Error('This roll number is already registered with another email.');
        }
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
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      toast({
        title: 'Submission Failed',
        description: message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!registrationData?.email) {
    return null;
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
                placeholder="Your full name"
                required
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <Label>Email</Label>
              <Input value={formData.email || ''} disabled placeholder="Sign in to populate email" />
            </div>

            {/* Roll No (editable but prefilled) */}
            <div>
              <Label>Roll Number</Label>
              <Input
                value={formData.rollNumber || ''}
                onChange={(e) => updateFormField('rollNumber', e.target.value)}
                required
              />
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
                placeholder="10-digit mobile number"
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
                placeholder="Upload a clear portrait"
              />
            </div>

            {/* Textareas */}
            <div>
              <Label htmlFor="techSkills">Tech Skills</Label>
              <Textarea
                id="techSkills"
                value={formData.techSkills || ''}
                onChange={(e) => updateFormField('techSkills', e.target.value)}
                placeholder="Languages, frameworks, tools"
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
                placeholder="Communication, teamwork, leadership"
              />
            </div>

            <div>
              <Label htmlFor="weakness">Weakness (max 100 words)</Label>
              <Textarea
                id="weakness"
                value={formData.weakness || ''}
                onChange={(e) => updateFormField('weakness', e.target.value)}
                placeholder="What would you like to improve?"
              />
            </div>

            <div>
              <Label htmlFor="strength">Strengths (max 100 words)</Label>
              <Textarea
                id="strength"
                value={formData.strength || ''}
                onChange={(e) => updateFormField('strength', e.target.value)}
                placeholder="Your key strengths"
              />
            </div>

            <div>
              <Label htmlFor="otherSociety">Any Other Society</Label>
              <Textarea
                id="otherSociety"
                value={formData.otherSociety || ''}
                onChange={(e) => updateFormField('otherSociety', e.target.value)}
                placeholder="Optional: clubs or societies"
              />
            </div>

            <div>
              <Label htmlFor="whyJoinFlux">Why Join Flux (max 150 words)</Label>
              <Textarea
                id="whyJoinFlux"
                value={formData.whyJoinFlux || ''}
                onChange={(e) => updateFormField('whyJoinFlux', e.target.value)}
                placeholder="Why do you want to join Flux?"
              />
            </div>

            <div>
              <Label htmlFor="describeYourself">Describe Yourself (max 200 words)</Label>
              <Textarea
                id="describeYourself"
                value={formData.describeYourself || ''}
                onChange={(e) => updateFormField('describeYourself', e.target.value)}
                placeholder="A short intro about you"
              />
            </div>

            <div>
              <Label htmlFor="achievements">Achievements (max 200 words)</Label>
              <Textarea
                id="achievements"
                value={formData.achievements || ''}
                onChange={(e) => updateFormField('achievements', e.target.value)}
                placeholder="Notable projects, awards, competitions"
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
