import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  try {
    return {
      winnersRikfinale: await locals.pb
        .collection('winners_rikfinale')
        .getFullList({ sort: '-year' }),
      winnersRikverliezersfinale: await locals.pb
        .collection('winners_rikverliezersfinale')
        .getFullList({ sort: '-year' }),
      winnersStiefelen: await locals.pb
        .collection('winners_stiefelen')
        .getFullList({ sort: '-year' })
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { winnersRikfinale: [], winnersRikverliezersfinale: [], winnersStiefelen: [] };
  }
};

export const actions = {
  addWinnerRikfinale: async ({ request, locals }) => {
    const { year, name } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('winners_rikfinale').create({ year, name });
    } catch (err) {
      throw error(err.status, err.message);
    }

    return { success: true };
  },

  deleteWinnerRikfinale: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('winners_rikfinale').delete(id);
    } catch (err) {
      throw error(err.status, err.message);
    }
    return { success: true };
  },

  addWinnerRikverliezersfinale: async ({ request, locals }) => {
    const { year, name } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('winners_rikverliezersfinale').create({ year, name });
    } catch (err) {
      throw error(err.status, err.message);
    }

    return { success: true };
  },

  deleteWinnerRikverliezersfinale: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('winners_rikverliezersfinale').delete(id);
    } catch (err) {
      throw error(err.status, err.message);
    }
    return { success: true };
  },
  addWinnerStiefelen: async ({ request, locals }) => {
    const { year, name } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('winners_stiefelen').create({ year, name });
    } catch (err) {
      throw error(err.status, err.message);
    }

    return { success: true };
  },

  deleteWinnerStiefelen: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('winners_stiefelen').delete(id);
    } catch (err) {
      throw error(err.status, err.message);
    }
    return { success: true };
  }
};
