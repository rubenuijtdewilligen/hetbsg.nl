export const load = async ({ params, locals }) => {
  const { pocketbaseId } = params;

  const item = await locals.pb.collection('media_items').getOne(pocketbaseId);

  if (!item) {
    return {
      status: 404,
      error: new Error('Item not found')
    };
  }

  return { item };
};
