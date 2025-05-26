import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  try {
    return {
      exampleCommittees: await locals.pb
        .collection('example_committees')
        .getFullList({ sort: 'name' })
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { exampleCommittees: [] };
  }
};

export const actions = {
  addExampleCommittee: async ({ request, locals }) => {
    const { name, goal, motto } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('example_committees').create({ name, goal, motto });
    } catch (err) {
      throw error(err.status, err.message);
    }

    return { success: true };
  },

  deleteExampleCommittee: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('example_committees').delete(id);
    } catch (err) {
      throw error(err.status, err.message);
    }
    return { success: true };
  }
};
