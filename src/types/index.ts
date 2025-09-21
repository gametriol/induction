// Types for Flux Society Registration System

export interface User {
  email: string;
  rollNumber: string;
  name: string;
  branch: string;
  year: string;
  image?: File;
  mobileNumber: string;
  projectLink?: string;
  techSkills: string;
  softSkills: string;
  weakness: string;
  strength: string;
  otherSociety: string;
  whyJoinFlux: string;
  describeYourself: string;
  achievements: string;
}

export interface RegistrationData {
  email: string;
  rollNumber: string;
  isRegistered: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export const COLLEGE_BRANCHES = [
  'Computer Science and Engineering',
  'Information Technology',
  'Electronics and Communication Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'Architecture',
  'Applied Sciences'
] as const;

export const ACADEMIC_YEARS = [
  '1st Year',
  '2nd Year', 
  '3rd Year',
  '4th Year'
] as const;

export type Branch = typeof COLLEGE_BRANCHES[number];
export type AcademicYear = typeof ACADEMIC_YEARS[number];