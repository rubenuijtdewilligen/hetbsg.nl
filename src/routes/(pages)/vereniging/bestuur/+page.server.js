export const load = async ({ locals }) => {
  try {
    return {
      boards: await locals.pb.collection('boards').getFullList({ sort: '-name' })
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return {
      boards: []
    };
  }
};
