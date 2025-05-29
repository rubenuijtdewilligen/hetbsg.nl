import { error } from '@sveltejs/kit';

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

export const actions = {
  addProduct: async ({ request, locals }) => {
    const { name, price, image } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('products').create({ name, price, image });
    } catch (err) {
      throw error(err.status, err.message);
    }

    return { success: true };
  },

  deleteProduct: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('products').delete(id);
    } catch (err) {
      throw error(err.status, err.message);
    }
    return { success: true };
  }
};
