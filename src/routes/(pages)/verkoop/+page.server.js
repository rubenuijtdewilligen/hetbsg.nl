export const load = async ({ locals }) => {
  try {
    return {
      products: await locals.pb.collection('products').getFullList()
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { products: [] };
  }
};
