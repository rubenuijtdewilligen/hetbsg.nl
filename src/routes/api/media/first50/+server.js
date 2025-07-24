import { json } from '@sveltejs/kit';
import { Client } from '@elastic/elasticsearch';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

const es = new Client({
  node: publicEnv.PUBLIC_ELASTICSEARCH_URL,
  auth: {
    username: privateEnv.ELASTICSEARCH_USERNAME,
    password: privateEnv.ELASTICSEARCH_PASSWORD
  }
});

export async function GET() {
  const res = await es.search({
    index: 'media_items',
    size: 50,
    query: { match_all: {} }
  });

  return json(res.hits.hits.map((hit) => hit._source));
}
