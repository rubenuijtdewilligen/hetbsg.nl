export const load = async ({ locals }) => {
  try {
    return {
      voorzitter: await locals.pb
        .collection('general_settings')
        .getFirstListItem('key = "voorzitter"'),
      voorzitterEmail: await locals.pb
        .collection('general_settings')
        .getFirstListItem('key = "voorzitter_email"'),
      secretaris: await locals.pb
        .collection('general_settings')
        .getFirstListItem('key = "secretaris"')
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { voorzitter: {}, voorzitterEmail: {}, secretaris: {} };
  }
};
