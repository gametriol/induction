# Quick Copy Instructions — Flux Induction Flow

Goal: Get this frontend wired into another React+Vite TypeScript project in ~15 minutes by copying only the required files and environment variables.

Quick checklist (15-minute path)
- 0–2 min: Create a new Vite React+TS project or open target repo.
- 2–5 min: Copy files listed below into the target `src/` and root as indicated.
- 5–7 min: Add env vars to target `.env` (see list) and set up Firebase + Cloudinary credentials.
- 7–10 min: Install dependencies: `npm install` (see deps below).
- 10–13 min: Fix import paths (see `@/` alias note) or copy `tsconfig.json` paths.
- 13–15 min: Run `npm run dev` and test Google Sign-In → `/registration-form` flow.

Files to copy (minimum set)
- `src/contexts/RegistrationContext.tsx` — must copy (persists session, provides `useRegistration`).
- `src/components/EmailRegistrationModal.tsx` — Google sign-in modal wired to navigate to `/registration-form`.
- `src/components/RegistrationForm.tsx` — registration form and validations.
- `src/lib/firebase.ts` — Firebase init + helpers (signInWithGoogle, saveRegistrationRecord, getRegistrationByRollNumber).
- `src/lib/cloudinaryClient.ts` — image upload helper (unsigned preset support).
- `src/utils/validation.ts` — field validators used by the form.
- `src/hooks/use-toast.ts` or your existing toast mechanism (or copy `src/components/ui/toaster.tsx` + `use-toast` hook if used).
- `src/components/ui/*` — copy only the UI components referenced above (`button`, `input`, `textarea`, `label`, `card`) or replace with your own UI.
- `src/types/index.ts` — small types used by registration context (optional but recommended).

Essential env vars (add to target `.env` or Vercel dashboard as `VITE_*`):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET` (optional)
- `VITE_FIREBASE_MESSAGING_SENDER_ID` (optional)
- `VITE_FIREBASE_APP_ID`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET` (unsigned preset used by client)

Dependencies to install (minimum)
- `react`, `react-dom`, `react-router-dom` (if routing used)
- `firebase` (for auth + firestore)
- `cloudinary` upload doesn't need a package; we use the browser `fetch`/`FormData` in `cloudinaryClient`.
- `typescript`, `vite` and the usual dev tooling are expected in the host project.
- UI libs used in this repo: none mandatory — copy `src/components/ui` building blocks or replace with your own.

Import / alias notes
- This project uses `@/` path alias (e.g. `@/lib/firebase`). Quick options:
  - Copy `tsconfig.json` path mapping into the target project so `@/` resolves to `src/`.
  - Or run a simple find/replace to convert `@/` to relative paths after you paste files.

Firebase / Firestore notes
- In `src/lib/firebase.ts` the code expects a `registrations` collection and stores documents keyed by email. Copy the file and replace the `VITE_FIREBASE_*` values.
- Ensure Google sign-in is enabled in your Firebase Console (Authentication → Sign-in method → Google).
- Configure Firestore rules appropriately (if testing keep them permissive locally; restrict for production).

Cloudinary notes
- Create an unsigned upload preset in your Cloudinary dashboard and set `VITE_CLOUDINARY_UPLOAD_PRESET` to that preset.

Routing and required pages
- Ensure your target app has a route `/registration-form` that renders `RegistrationForm` (or import the component into your routing setup).

Quick testing steps (after copying)
1. Install deps: `npm install`.
2. Add the `VITE_` env vars to `.env` and restart the dev server.
3. Run: `npm run dev`.
4. Open the app, open the modal (wherever you place it), click "Sign in with Google".
5. If sign-in succeeds and email isn't already registered, you should be redirected to `/registration-form` with the email prefilled.

Troubleshooting
- If you see import errors for `@/`, fix aliases or convert to relative imports.
- If Google sign-in opens but returns errors, confirm `VITE_FIREBASE_AUTH_DOMAIN` and OAuth redirect origins (in Firebase Console) include your local URL (e.g., `http://localhost:5173` or port in use).
- If image upload fails, verify `VITE_CLOUDINARY_*` values and that the unsigned preset exists.

Optional: Vercel deploy notes (quick)
- Add your `VITE_` env vars into the Vercel project settings (Environment Variables) exactly as in `.env`.
- Use `build` command `npm run build` and `Output Directory: dist` (Vite default).

If you want, I can also produce a minimal patch of only the core files (zipped) so you can paste them into another repo — say "Generate patch" and I'll create it.

---
Last updated: 2025-09-21
