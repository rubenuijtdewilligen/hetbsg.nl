export const load = async ({ locals }) => {
  try {
    return {
      tiles: await locals.pb.collection('tiles').getFullList({ sort: '-year' })
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return {
      tiles: []
    };
  }
};
