import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export async function getFilmImages(slug) {
  const basePath = `narratif/${slug}`;

  async function getFolder(folder) {
    try {
      const result = await cloudinary.search
        .expression(`folder:${basePath}/${folder}`)
        .sort_by('public_id', 'asc')
        .max_results(50)
        .execute();
      return result.resources
        .sort((a, b) => a.public_id.localeCompare(b.public_id, undefined, { numeric: true }))
        .map((r) => r.secure_url);
    } catch {
      return [];
    }
  }

  const [cover, images_film, images_tournage, affiche] = await Promise.all([
    getFolder('cover'),
    getFolder('images_film'),
    getFolder('images_tournage'),
    getFolder('affiche'),
  ]);

  return {
    cover: cover[0] || null,
    images_film,
    images_tournage,
    affiche: affiche[0] || null,
  };
}