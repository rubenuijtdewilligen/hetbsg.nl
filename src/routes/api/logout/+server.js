import { redirect } from '@sveltejs/kit';

export const GET = ({ locals }) => {
  locals.pb.authStore.clear();

  throw redirect(303, '/admin');
};
