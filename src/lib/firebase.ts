// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { query, where, getDocs } from 'firebase/firestore';

const FIREBASE_ENV = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

const missingFirebase = Object.entries(FIREBASE_ENV).filter(([, v]) => !v).map(([k]) => k);
if (missingFirebase.length) {
  throw new Error(
    `Missing required Firebase environment variables: ${missingFirebase.join(", ")}.\n` +
      `Define them in your .env as VITE_FIREBASE_* and restart the dev server.`
  );
}

const firebaseConfig = {
  apiKey: FIREBASE_ENV.apiKey!,
  authDomain: FIREBASE_ENV.authDomain!,
  projectId: FIREBASE_ENV.projectId!,
  storageBucket: FIREBASE_ENV.storageBucket!,
  messagingSenderId: FIREBASE_ENV.messagingSenderId!,
  appId: FIREBASE_ENV.appId!,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Send Firebase email sign-in/verification link.
 * actionCodeSettings should redirect to your registration route
 */
export const sendEmailSignInLink = async (email: string) => {
  const actionCodeSettings = {
    // URL the user will be redirected to after clicking the email link.
    // Make sure this domain is listed in Firebase Console -> Auth -> Authorized domains
    url: `${window.location.origin}/registration-form`,
    handleCodeInApp: true,
  };

  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  // Save email in localStorage to complete sign-in later
  window.localStorage.setItem('flux_emailForSignIn', email);
};

export const isSignInLink = (url?: string) => {
  return isSignInWithEmailLink(auth, url ?? window.location.href);
};

export const completeSignInWithEmailLink = async (maybeEmail?: string) => {
  const emailStored = window.localStorage.getItem('flux_emailForSignIn');
  const email = maybeEmail || emailStored;
  if (!email) throw new Error('No email available for sign-in (not found in localStorage).');

  const result = await signInWithEmailLink(auth, email, window.location.href);
  // Clear stored email after sign-in
  window.localStorage.removeItem('flux_emailForSignIn');
  return result;
};

/**
 * Open Google popup and return the sign-in result.
 * Caller can inspect result.user.email.
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(getAuth(), provider);
  return result;
};

/** Firestore helpers to check & write registration record */
export const checkEmailAlreadyRegistered = async (email: string) => {
  // We'll store registrations in collection 'registrations' where doc id = email
  const docRef = doc(db, 'registrations', email);
  const snap = await getDoc(docRef);
  return snap.exists();
};

/**
 * Check whether a roll number is already used by any registration.
 * Returns the email of the existing registration if found, otherwise null.
 */
export const getRegistrationByRollNumber = async (rollNumber: string): Promise<string | null> => {
  const q = query(collection(db, 'registrations'), where('rollNumber', '==', rollNumber));
  const snaps = await getDocs(q);
  if (!snaps.empty) {
    const first = snaps.docs[0];
    const data = first.data();
    return data.email || first.id || null;
  }
  return null;
};

export const saveRegistrationRecord = async (email: string, data: any) => {
  const docRef = doc(db, 'registrations', email);
  await setDoc(docRef, {
    ...data,
    createdAt: new Date().toISOString(),
  });
};
