export const POST = async ({ request, locals }) => {
  const data = await request.json();
  const item = await locals.pb.collection('media_boards').create({ name: data.name });
  return new Response(JSON.stringify(item), { status: 200 });
};
