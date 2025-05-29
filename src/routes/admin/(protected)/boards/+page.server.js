import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  try {
    return {
      boards: await locals.pb.collection('boards').getFullList({ sort: '-name' })
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { boards: [] };
  }
};

export const actions = {
  addBoard: async ({ request, locals }) => {
    const { name, vlnrRaw, image } = Object.fromEntries(await request.formData());

    const vlnr = vlnrRaw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join('<br>');

    try {
      await locals.pb.collection('boards').create({ name, vlnr, image });
    } catch (err) {
      throw error(err.status, err.message);
    }

    return { success: true };
  },

  deleteBoard: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('boards').delete(id);
    } catch (err) {
      throw error(err.status, err.message);
    }
    return { success: true };
  }
};
