export const load = async ({ locals }) => {
  try {
    return {
      generalSettings: await locals.pb.collection('general_settings').getFullList(),
      pagePictures: await locals.pb.collection('page_pictures').getFullList()
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { generalSettings: [], pagePictures: [] };
  }
};

export const actions = {
  updatePicture: async ({ request, locals }) => {
    const formData = await request.formData();
    const { id, picture } = Object.fromEntries(formData);

    try {
      await locals.pb.collection('page_pictures').update(id, { picture });
      return { success: true, message: 'Foto succesvol bijgewerkt.' };
    } catch (error) {
      console.error('Failed to update picture:', error);
      return { success: false, message: 'Fout bij het bijwerken van de foto.' };
    }
  }
};
