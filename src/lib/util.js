import { env } from '$env/dynamic/public';

export const getFileUrl = (collection, recordId, filename) => {
  return `${env.PUBLIC_POCKETBASE_URL}/api/files/${collection}/${recordId}/${filename}`;
};

export const translateFacetFields = (field) => {
  switch (field) {
    case 'object_type':
      return 'Object Type';
    case 'creator':
      return 'Maker';
    case 'place':
      return 'Plaats';
    case 'subjects':
      return 'Onderwerpen';
    case 'persons':
      return 'Personen';
    case 'boards':
      return 'Besturen';
    default:
      return field;
  }
};
