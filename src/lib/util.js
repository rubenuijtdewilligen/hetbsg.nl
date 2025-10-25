import { env } from '$env/dynamic/public';

export const getFileUrl = (collection, recordId, filename) => {
  return `${env.PUBLIC_POCKETBASE_URL}/api/files/${collection}/${recordId}/${filename}`;
};

export const translateFacetFields = (field) => {
  switch (field) {
    case 'object_types':
      return 'Object Types';
    case 'creators':
      return 'Makers';
    case 'places':
      return 'Plaatsen';
    case 'subjects':
      return 'Onderwerpen';
    case 'persons':
      return 'Personen';
    case 'boards':
      return 'Besturen';
    case 'archive_maps':
      return 'Archiefmappen';
    default:
      return field;
  }
};
