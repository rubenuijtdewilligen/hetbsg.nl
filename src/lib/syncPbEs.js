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
        const record = await pb.collection('media_' + collectionName).getOne(item[rel]);
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
  console.log('Start syncing media_items to Elasticsearch...\n');

  const mediaItems = await pb.collection('media_items').getFullList();
  const pocketbaseIds = new Set(mediaItems.map((item) => item.id));

  const esItems = await es.search({
    index: 'media_items',
    scroll: '1m',
    size: 1000,
    body: {
      query: {
        match_all: {}
      }
    }
  });

  const esIds = new Set();
  let scrollId = esItems._scroll_id;
  let hits = esItems.hits.hits;

  while (hits.length > 0) {
    for (const hit of hits) {
      esIds.add(hit._id);
    }

    const scrollRes = await es.scroll({
      scroll_id: scrollId,
      scroll: '1m'
    });

    scrollId = scrollRes._scroll_id;
    hits = scrollRes.hits.hits;
  }

  const toDelete = [...esIds].filter((id) => !pocketbaseIds.has(id));
  for (const id of toDelete) {
    try {
      await es.delete({
        index: 'media_items',
        id
      });
      console.log(`Deleted from Elasticsearch: ${id}`);
    } catch (err) {
      console.error(`Error deleting ${id}:`, err);
    }
  }

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
      console.log(`Indexed: ${item.title}`);
    } catch (err) {
      console.error(`Error indexing ${item.title}:`, err);
    }
  }

  console.log(`\nDone syncing. Indexed: ${mediaItems.length}. Deleted: ${toDelete.length}.`);
};
