export const load = async ({ locals }) => {
  try {
    return {
      activities: await locals.pb.collection('activities').getFullList()
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return {
      activities: []
    };
  }
};
