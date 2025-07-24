import PocketBase from 'pocketbase';
import { Client } from '@elastic/elasticsearch';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import { getFileUrl } from './util';

const pb = new PocketBase(publicEnv.PUBLIC_POCKETBASE_URL);
const es = new Client({
  node: publicEnv.PUBLIC_ELASTICSEARCH_URL,
  auth: { username: privateEnv.ELASTICSEARCH_USERNAME, password: privateEnv.ELASTICSEARCH_PASSWORD }
});

const SINGLE_RELATIONS = ['object_type', 'creator', 'place'];
const MULTI_RELATIONS = ['subjects', 'persons', 'boards'];

async function expandRelations(item) {
  const expanded = {};

  for (const rel of SINGLE_RELATIONS) {
    if (item[rel]) {
      const collectionName = rel.endsWith('s') ? rel : rel + 's';

      try {
        const record = await pb.collection(collectionName).getOne(item[rel]);
        expanded[rel] = record.name;
      } catch {
        expanded[rel] = null;
      }
    } else {
      expanded[rel] = null;
    }
  }

  for (const rel of MULTI_RELATIONS) {
    if (Array.isArray(item[rel]) && item[rel].length > 0) {
      const filter = item[rel].map((id) => `id="${id}"`).join(' || ');

      try {
        const records = await pb.collection(rel).getFullList(200, { filter });
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
      pocketbaseId: item.id,
      title: item.title,
      description: item.description,
      date: item.date,
      object_type: expanded.object_type,
      creator: expanded.creator,
      place: expanded.place,
      subjects: expanded.subjects,
      persons: expanded.persons,
      boards: expanded.boards,
      file: getFileUrl(item.collectionId, item.id, item.file)
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
