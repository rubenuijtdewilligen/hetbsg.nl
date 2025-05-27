export const load = async ({ locals }) => {
  try {
    return {
      files: await locals.pb.collection('files').getFullList()
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return { files: [] };
  }
};

export const actions = {
  updateFile: async ({ request, locals }) => {
    const formData = await request.formData();
    const { id, file } = Object.fromEntries(formData);

    try {
      await locals.pb.collection('files').update(id, { file });
      return { success: true, message: 'Bestand succesvol aangepast.' };
    } catch (error) {
      console.error('Failed to update picture:', error);
      return { success: false, message: 'Fout bij het aanpassen van het bestand.' };
    }
  }
};
