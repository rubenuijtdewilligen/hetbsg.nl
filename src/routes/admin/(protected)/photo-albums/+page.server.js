import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  try {
    return {
      photoAlbums: await locals.pb.collection('photo_albums').getFullList({ sort: '-created' })
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { photoAlbums: [] };
  }
};

export const actions = {
  addPhotoAlbum: async ({ request, locals }) => {
    const { name, url } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('photo_albums').create({ name, url });
    } catch (err) {
      throw error(err.status, err.message);
    }

    return { success: true };
  },

  deletePhotoAlbum: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('photo_albums').delete(id);
    } catch (err) {
      throw error(err.status, err.message);
    }
    return { success: true };
  }
};
