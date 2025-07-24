import PocketBase from 'pocketbase';
import { Client } from '@elastic/elasticsearch';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

const pb = new PocketBase(publicEnv.PUBLIC_POCKETBASE_URL);
const es = new Client({
  node: publicEnv.PUBLIC_ELASTICSEARCH_URL,
  auth: { username: privateEnv.ELASTICSEARCH_USERNAME, password: privateEnv.ELASTICSEARCH_PASSWORD }
});

const RELATIONS = ['object_types', 'creators', 'places', 'subjects', 'persons', 'boards'];

async function expandRelations(item) {
  const expanded = {};

  for (const rel of RELATIONS) {
    if (Array.isArray(item[rel]) && item[rel].length > 0) {
      const filter = item[rel].map((id) => `id="${id}"`).join(' || ');

      try {
        const records = await pb.collection('media_' + rel).getFullList(200, { filter });
        expanded[rel] = records.map((r) => r.name);
      } catch {
        expanded[rel] = [];
      }
    } else {
      expanded[rel] = [];
    }
  }

  return expanded;
}

export const syncMediaItems = async () => {
  console.log('Start syncing media_items to Elasticsearch...');
  console.log('');

  const mediaItems = await pb.collection('media_items').getFullList();

  for (const item of mediaItems) {
    const expanded = await expandRelations(item);

    const doc = {
      title: item.title,
      description: item.description,
      date: item.date,
      object_type: expanded.object_type,
      creator: expanded.creator,
      place: expanded.place,
      subjects: expanded.subjects,
      persons: expanded.persons,
      boards: expanded.boards,
      file: `${publicEnv.PUBLIC_POCKETBASE_URL}/api/files/${item.collectionId}/${item.id}/${item.file}?thumb=0x0`
    };

    try {
      await es.index({
        index: 'media_items',
        id: item.id,
        document: doc
      });
      console.log(`Indexed: ${item.title}.`);
    } catch (err) {
      console.error(`Error indexing ${item.title}:`, err);
    }
  }

  console.log('');
  console.log(`Indexed ${mediaItems.length} media items.`);
};
