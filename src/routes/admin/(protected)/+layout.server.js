import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/admin');
  }

  if (locals.pb.authStore.model.collectionName === 'users') {
    throw redirect(303, '/');
  }

  return {
    user: locals.pb.authStore.model
  };
};
