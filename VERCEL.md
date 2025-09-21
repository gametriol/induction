Quick Vercel Deployment Checklist

1. Create Vercel project and link the repository.
2. Add environment variables (see `.env.example`) in Project Settings → Environment Variables.
3. Ensure Firebase project has your Vercel domain in **Authentication → Authorized domains**.
4. If using Firebase Phone Auth: do not disable app verification on production.
5. If using Cloudinary: create an unsigned upload preset and set the preset in Vercel env.
6. Trigger a deploy; review build logs if it fails.

Troubleshooting

- Blank page after deploy: open browser console and collect errors. Common causes:
  - Missing `VITE_` env var (Vite strips unknown env at build time).
  - Firebase Auth origin not authorized.
  - Phone OTP `auth/argument-error` — ensure phone number is normalized to E.164 (e.g. `+919876543210`).

Contact me if you'd like me to set up a small serverless endpoint (Vercel Serverless Function) to handle uploads or OTP sending for production hardened flows.
