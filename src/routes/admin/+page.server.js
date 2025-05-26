import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    if (locals.pb.authStore.model.collectionName === 'users') {
      throw redirect(303, '/');
    } else if (locals.pb.authStore.model.collectionName === '_superusers') {
      throw redirect(303, '/admin/dashboard');
    }
  }
};

export const actions = {
  login: async ({ locals, request }) => {
    const body = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('_superusers').authWithPassword(body.email, body.password);
    } catch (err) {
      console.log('Error in /admin login:', err);
      throw error(500, 'Er is iets mis gegaan.');
    }

    throw redirect(303, '/admin/dashboard');
  }
};
