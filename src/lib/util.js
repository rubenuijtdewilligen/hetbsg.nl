import { env } from '$env/dynamic/public';

export const getFileUrl = (collection, recordId, filename) => {
  return `${env.PUBLIC_POCKETBASE_URL}/api/files/${collection}/${recordId}/${filename}`;
};
