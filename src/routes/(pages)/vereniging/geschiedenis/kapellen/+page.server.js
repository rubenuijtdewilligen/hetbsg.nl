export const load = async ({ locals }) => {
  try {
    return {
      chapels: await locals.pb.collection('chapels').getFullList({ sort: 'year' })
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { chapels: [] };
  }
};
