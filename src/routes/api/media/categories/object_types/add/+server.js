export const POST = async ({ request, locals }) => {
  const data = await request.json();
  const item = await locals.pb.collection('media_object_types').create({ name: data.name });
  return new Response(JSON.stringify(item), { status: 200 });
};
