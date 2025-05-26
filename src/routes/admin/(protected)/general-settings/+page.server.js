export const load = async ({ locals }) => {
  try {
    const generalSettings = await locals.pb.collection('general_settings').getFullList();
    return { generalSettings };
  } catch (error) {
    console.error('Failed to fetch general settings:', error);
    return { generalSettings: [] };
  }
};

export const actions = {
  updateSetting: async ({ locals, request }) => {
    const formData = await request.formData();
    const id = formData.get('id');
    const value = formData.get('value');

    try {
      await locals.pb.collection('general_settings').update(id, { value });
      return { success: true, message: 'Instelling succesvol bijgewerkt.' };
    } catch (error) {
      console.error('Error updating setting:', error);
      return { success: false, message: 'Fout bij het bijwerken van de instelling.' };
    }
  }
};
