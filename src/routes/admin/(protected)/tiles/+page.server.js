import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  try {
    return {
      tiles: await locals.pb.collection('tiles').getFullList({ sort: '-year' })
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { tiles: [] };
  }
};

export const actions = {
  addTile: async ({ request, locals }) => {
    const { year, place, image } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('tiles').create({ year, place, image });
    } catch (err) {
      throw error(err.status, err.message);
    }

    return { success: true };
  },

  deleteTile: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('tiles').delete(id);
    } catch (err) {
      throw error(err.status, err.message);
    }
    return { success: true };
  }
};
