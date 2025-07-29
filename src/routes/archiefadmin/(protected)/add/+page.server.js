import { error } from '@sveltejs/kit';
import { syncMediaItems } from '$lib/syncPbEs.js';

export const actions = {
  addItem: async ({ request, locals }) => {
    const formData = await request.formData();

    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      date: formData.get('date'),
      file: formData.get('file'),
      object_type: formData.get('object_type') || null,
      creator: formData.get('creator') || null,
      place: formData.get('place') || null,
      subjects: formData.getAll('subjects'),
      persons: formData.getAll('persons'),
      boards: formData.getAll('boards')
    };

    try {
      const record = await locals.pb.collection('media_items').create(data);

      if (formData.get('file')) {
        await locals.pb.collection('media_items').update(record.id, {
          file: formData.get('file')
        });
      }

      await syncMediaItems();

      return { success: true };
    } catch (err) {
      console.error('Fout bij opslaan:', err);
      throw error(500, 'Fout bij opslaan');
    }
  }
};
