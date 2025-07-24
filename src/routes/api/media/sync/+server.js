import { syncMediaItems } from '$lib/syncPbEs';

export const GET = async () => {
  try {
    await syncMediaItems();
    return new Response('Syncing successful', { status: 200 });
  } catch (error) {
    console.error('Error syncing:', error);
    return new Response('Error syncing', { status: 500 });
  }
};
