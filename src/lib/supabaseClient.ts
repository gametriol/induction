// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET as string | undefined;

const missingSupabase = [] as string[];
if (!SUPABASE_URL) missingSupabase.push('VITE_SUPABASE_URL');
if (!SUPABASE_ANON_KEY) missingSupabase.push('VITE_SUPABASE_ANON_KEY');
if (!SUPABASE_BUCKET) missingSupabase.push('VITE_SUPABASE_BUCKET');
if (missingSupabase.length) {
  throw new Error(
    `Missing required Supabase environment variables: ${missingSupabase.join(', ')}.\nDefine them in your .env and restart the dev server.`
  );
}

export const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

/**
 * Upload image to Supabase and return public URL (or throw on failure)
 */
export async function uploadImageToSupabase(file: File, path: string): Promise<string> {
  // Upload
  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) {
    throw error;
  }

  // Get public URL (no "error" in v2 return type)
  const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new Error('Could not get public URL');
  }

  return data.publicUrl;
}
