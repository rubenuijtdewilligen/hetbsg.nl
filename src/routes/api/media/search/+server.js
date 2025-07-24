import { Client } from '@elastic/elasticsearch';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

const es = new Client({
  node: publicEnv.PUBLIC_ELASTICSEARCH_URL,
  auth: { username: privateEnv.ELASTICSEARCH_USERNAME, password: privateEnv.ELASTICSEARCH_PASSWORD }
});

const FACET_FIELDS = ['object_types', 'creators', 'subjects', 'persons', 'boards', 'places'];

function getFilters(url) {
  const filters = {};
  FACET_FIELDS.forEach((field) => {
    const vals = url.getAll(field);
    if (vals.length) filters[field] = vals;
  });
  return filters;
}

export const GET = async ({ url }) => {
  const q = url.searchParams.get('q') ?? '';
  const filters = getFilters(url.searchParams);

  const esQuery = {
    index: 'media_items',
    body: {
      size: 20,
      query: {
        bool: {
          must: q
            ? [
                {
                  multi_match: {
                    query: q,
                    fields: ['title^3', 'description', 'date']
                  }
                }
              ]
            : [{ match_all: {} }],
          filter: []
        }
      },
      aggs: {}
    }
  };

  Object.entries(filters).forEach(([field, values]) => {
    esQuery.body.query.bool.filter.push({
      terms: { [`${field}.keyword`]: values }
    });
  });

  FACET_FIELDS.forEach((field) => {
    esQuery.body.aggs[field] = {
      terms: { field: `${field}.keyword`, size: 20 }
    };
  });

  const esResult = await es.search(esQuery);

  const facets = {};
  FACET_FIELDS.forEach((field) => {
    const buckets = esResult.aggregations?.[field]?.buckets ?? [];
    facets[field] = buckets.map((b) => ({ key: b.key, count: b.doc_count }));
  });

  const results = esResult.hits.hits.map((hit) => hit._source);

  return new Response(JSON.stringify({ results, facets }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
