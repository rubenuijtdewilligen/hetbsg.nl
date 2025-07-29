export const GET = async ({ url, locals }) => {
  const q = url.searchParams.get('q') ?? '';
  const items = await locals.pb.collection('media_subjects').getFullList({
    filter: `name ~ "${q}"`,
    sort: 'name'
  });
  return new Response(JSON.stringify({ items }), { status: 200 });
};
