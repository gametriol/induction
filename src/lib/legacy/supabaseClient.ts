// Archived: supabaseClient
// Moved to legacy because the project uses Cloudinary for uploads.
// Kept here as a reference if you want to restore Supabase storage later.
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET as string | undefined;

const missingSupabase = [] as string[];
if (!SUPABASE_URL) missingSupabase.push('VITE_SUPABASE_URL');
if (!SUPABASE_ANON_KEY) missingSupabase.push('VITE_SUPABASE_ANON_KEY');
if (!SUPABASE_BUCKET) missingSupabase.push('VITE_SUPABASE_BUCKET');
if (missingSupabase.length) {
  // Note: during archived mode we do NOT throw to avoid breaking dev server when env isn't present
  console.warn(
    `Supabase legacy client missing env: ${missingSupabase.join(', ')}. This file is archived.`
  );
}

export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!) : null as any;

/**
 * Upload image to Supabase and return public URL (or throw on failure)
 */
export async function uploadImageToSupabase(file: File, path: string): Promise<string> {
  if (!supabase) throw new Error('Supabase legacy client is not configured');

  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new Error('Could not get public URL');
  }

  return data.publicUrl;
}
