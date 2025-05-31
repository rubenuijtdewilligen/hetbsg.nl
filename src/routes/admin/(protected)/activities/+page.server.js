import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  try {
    return {
      activities: await locals.pb.collection('activities').getFullList()
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { activities: [] };
  }
};

export const actions = {
  addActivity: async ({ request, locals }) => {
    const { name, description, image } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('activities').create({ name, description, image });
    } catch (err) {
      throw error(err.status, err.message);
    }

    return { success: true };
  },

  deleteActivity: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('activities').delete(id);
    } catch (err) {
      throw error(err.status, err.message);
    }
    return { success: true };
  }
};
