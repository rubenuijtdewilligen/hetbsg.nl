import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    if (
      locals.pb.authStore.model.collectionName === '_superusers' ||
      (locals.pb.authStore.model.collectionName === 'users' &&
        locals.pb.authStore.model.role === 'archief')
    ) {
      throw redirect(303, '/archiefadmin/items');
    }
  }
};

export const actions = {
  login: async ({ locals, request }) => {
    const body = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('users').authWithPassword(body.email, body.password);
    } catch (err) {
      console.log('Error in /archiefadmin login:', err);
      throw error(500, 'Er is iets mis gegaan.');
    }

    throw redirect(303, '/archiefadmin/items');
  }
};
