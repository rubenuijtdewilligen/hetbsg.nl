import { syncMediaItems } from '$lib/syncPbEs';

export const GET = async () => {
  try {
    let stats = await syncMediaItems();
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error syncing:', error);
    return new Response('Error syncing', { status: 500 });
  }
};
