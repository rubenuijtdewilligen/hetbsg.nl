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

    if (
      event.locals.pb.authStore.isValid &&
      event.locals.pb.authStore.model?.collectionName === '_superusers'
    ) {
      try {
        await event.locals.pb.collection('_superusers').authRefresh();
        event.locals.user = structuredClone(event.locals.pb.authStore.model);
      } catch (error) {
        console.log(error);
        event.locals.pb.authStore.clear();
        event.locals.user = undefined;
      }
    } else {
      event.locals.pb.authStore.clear();
      event.locals.user = undefined;
    }
  } catch (error) {
    console.log(error);
    event.locals.pb.authStore.clear();
    event.locals.user = undefined;
  }

  const response = await resolve(event);
  response.headers.append(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie().replace('SameSite=Strict', 'SameSite=Lax')
  );

  if (response.headers.get('content-type') == 'text/html')
    response.headers.set('content-type', 'text/html; charset=utf-8');

  for (const [key, value] of Object.entries(extraHeaders)) response.headers.set(key, value);

  return response;
};
