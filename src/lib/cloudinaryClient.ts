// Client-side Cloudinary helper using unsigned upload preset
export async function uploadImageToCloudinary(file: File, folder = 'profile-images') {
  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
  const unsignedPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || !unsignedPreset) {
    throw new Error('Missing Cloudinary config: set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env');
  }

  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', unsignedPreset);
  form.append('folder', folder);

  const res = await fetch(url, { method: 'POST', body: form });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary upload failed ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (!json?.secure_url) throw new Error('Cloudinary did not return secure_url');
  return json.secure_url as string;
}
