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
