export const load = async ({ locals }) => {
  try {
    return {
      pagePictures: await locals.pb.collection('page_pictures').getFullList()
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { pagePictures: [] };
  }
};
