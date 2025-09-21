Archived library code

This folder contains archived/legacy helpers that are not used by the current induction flow.
- `supabaseClient.ts`: Supabase storage client moved here because the project currently uses Cloudinary for uploads.

Why archive instead of delete:
- Keeps a reference if you want to revert to Supabase later.
- Avoids accidental breakage in other branches.

If you want to permanently remove legacy files, delete this folder and update README.
