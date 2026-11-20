import { fail } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const load = async ({ locals, cookies }) => {
  try {
    const setting = await locals.pb
      .collection('general_settings')
      .getFirstListItem('key = "fotos_wachtwoord"');

    const isAuthenticated = cookies.get('fotos_auth') === setting.value;

    if (!isAuthenticated) {
      return {
        authenticated: false,
        photoAlbums: []
      };
    }

    return {
      authenticated: true,
      photoAlbums: await locals.pb.collection('photo_albums').getFullList({ sort: '-created' })
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return {
      authenticated: false,
      photoAlbums: []
    };
  }
};

export const actions = {
  default: async ({ request, locals, cookies }) => {
    const data = await request.formData();
    const password = data.get('password');

    try {
      const setting = await locals.pb
        .collection('general_settings')
        .getFirstListItem('key = "fotos_wachtwoord"');

      if (password === setting.value) {
        cookies.set('fotos_auth', setting.value, {
          path: '/fotos',
          httpOnly: true,
          sameSite: 'lax',
          secure: !dev,
          maxAge: 60 * 60 * 24 * 30
        });
        return { success: true };
      }

      return fail(401, { incorrect: true });
    } catch (error) {
      console.error('Error verifying password:', error);
      return fail(500, { error: true });
    }
  }
};
