# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/22ce1246-baf3-4479-99b6-a3aae817f120

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/22ce1246-baf3-4479-99b6-a3aae817f120) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/22ce1246-baf3-4479-99b6-a3aae817f120) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Deploying to Vercel

Follow these steps to host this app on Vercel (recommended for static frontend deployments):

- **1. Create a Vercel Project**: Sign in to Vercel and create a new project, linking this Git repository.
- **2. Build & Output Settings**: Vercel will autodetect a Vite app. Default build command `npm run build` and output directory `dist` are appropriate.
- **3. Environment Variables**: In your Vercel project, add the following environment variables (under Project > Settings > Environment Variables). Use the `VITE_` prefixes exactly as listed so Vite exposes them at runtime:
	- `VITE_FIREBASE_API_KEY`: Firebase API key
	- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase auth domain (e.g. your-project.firebaseapp.com)
	- `VITE_FIREBASE_PROJECT_ID`: Firebase project id
	- `VITE_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
	- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender id
	- `VITE_FIREBASE_APP_ID`: Firebase app id
	- `VITE_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name (if using Cloudinary for uploads)
	- `VITE_CLOUDINARY_UPLOAD_PRESET`: Cloudinary unsigned upload preset
	- `VITE_SUPABASE_URL`: (optional) Supabase URL if you keep Supabase integration
	- `VITE_SUPABASE_ANON_KEY`: (optional) Supabase anon key
	- `VITE_SUPABASE_BUCKET`: (optional) Supabase bucket name

- **4. Firebase Console: Authorized Domains**: Add your Vercel domain (e.g. `your-project.vercel.app`) to Firebase Console → Authentication → Authorized Domains so Firebase Auth works from your deployed origin.

- **5. Firebase Phone Auth (if used)**: If you use Firebase Phone Authentication in production, DO NOT enable `VITE_FIREBASE_DISABLE_APP_VERIFICATION_FOR_TESTING` on Vercel. Firebase requires a working reCAPTCHA or SafetyNet on production domains. Configure reCAPTCHA in Firebase if needed and ensure your site is on the authorized domain list.

- **6. Cloudinary**: If using Cloudinary for client-side image uploads, create an **unsigned** upload preset and set `VITE_CLOUDINARY_UPLOAD_PRESET` to that preset name. Ensure the preset allows uploads to the expected folder and is enabled for unsigned uploads.

- **7. Deploy**: Push your branch or trigger a deploy in Vercel. After the build completes, your app will be live at the assigned domain.

Quick checklist before deploying:
- [ ] Firebase project created and Phone Auth / Email sign-in enabled as required
- [ ] Firebase project contains your Vercel domain in Authorized Domains
- [ ] Cloudinary unsigned preset created (if using uploads)
- [ ] All `VITE_` env vars set in Vercel's Environment Variables (Production stage)
- [ ] Remove or set `VITE_FIREBASE_DISABLE_APP_VERIFICATION_FOR_TESTING=false` in production

Local testing tips:
- Copy `.env.example` to `.env` and fill values for local development.
- `VITE_FIREBASE_DISABLE_APP_VERIFICATION_FOR_TESTING=true` is helpful on localhost only; do not use this for production.

If you want, I can: (a) add a Vercel deployment step-by-step script, (b) set up a GitHub Action to auto-deploy, or (c) help you configure Firebase authorized domains and test a phone OTP flow on the deployed site.
