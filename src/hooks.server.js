import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';

const extraHeaders = {
  'Cross-Origin-Embedder-Policy': 'unsafe-none',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN'
};

export const handle = async ({ event, resolve }) => {
  try {
    event.locals.pb = new PocketBase(env.PUBLIC_POCKETBASE_URL || 'https://localhost:8090');

    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    event.locals.pb.autoCancellation(false);

    if (event.locals.pb.authStore.isValid && event.locals.pb.authStore.model.collectionId) {
      try {
        await event.locals.pb.collection('users').authRefresh();
      } catch (error) {
        console.log(error);
        event.cookies.delete('pb_auth', { path: '/' });
      }

      event.locals.user = structuredClone(event.locals.pb.authStore.model);
    } else {
      event.locals.user = undefined;
    }
  } catch (error) {
    console.log(error);
    event.cookies.delete('pb_auth', { path: '/' });
  }

  const response = await resolve(event);
  response.headers.set(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie().replace('SameSite=Strict', 'SameSite=Lax')
  );

  if (response.headers.get('content-type') == 'text/html')
    response.headers.set('content-type', 'text/html; charset=utf-8');

  for (const [key, value] of Object.entries(extraHeaders)) response.headers.set(key, value);

  return response;
};
