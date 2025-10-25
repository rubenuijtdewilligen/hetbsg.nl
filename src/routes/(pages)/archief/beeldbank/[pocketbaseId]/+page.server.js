export const load = async ({ locals, params }) => {
  const { pocketbaseId } = params;

  return {
    mediaItem: await locals.pb.collection('media_items').getOne(pocketbaseId, {
      expand: 'object_types,creators,subjects,persons,boards,places,archive_maps,uploader'
    })
  };
};
