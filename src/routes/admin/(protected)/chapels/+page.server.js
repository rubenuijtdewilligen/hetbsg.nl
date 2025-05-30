import { error } from '@sveltejs/kit';

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

export const actions = {
  addChapel: async ({ request, locals }) => {
    const { year, place, type, stillThere } = Object.fromEntries(await request.formData());

    try {
      await locals.pb
        .collection('chapels')
        .create({ year, place, type, stillThere: stillThere === 'on' });
    } catch (err) {
      throw error(err.status, err.message);
    }

    return { success: true };
  },

  deleteChapel: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('chapels').delete(id);
    } catch (err) {
      throw error(err.status, err.message);
    }
    return { success: true };
  }
};
