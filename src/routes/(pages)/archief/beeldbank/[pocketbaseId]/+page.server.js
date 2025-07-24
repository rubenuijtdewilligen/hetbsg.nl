export const load = async ({ locals, params }) => {
  const { pocketbaseId } = params;

  return {
    mediaItem: await locals.pb.collection('media_items').getOne(pocketbaseId, {
      expand: 'object_type,creator,subjects,persons,boards,place'
    })
  };
};
