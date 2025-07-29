import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
  if (
    !(
      locals.pb.authStore.model.collectionName === '_superusers' ||
      (locals.pb.authStore.model.collectionName === 'users' &&
        locals.pb.authStore.model.role === 'archief')
    )
  ) {
    throw redirect(303, '/archiefadmin');
  }

  return {
    user: locals.pb.authStore.model
  };
};
