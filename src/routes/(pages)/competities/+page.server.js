export const load = async ({ locals }) => {
  try {
    return {
      rikstandFile: await locals.pb.collection('files').getFirstListItem('key = "rikstand"'),
      rikregelsFile: await locals.pb.collection('files').getFirstListItem('key = "rikregels"'),
      winnersRikfinale: await locals.pb
        .collection('winners_rikfinale')
        .getFullList({ sort: '-year' }),
      winnersRikverliezersfinale: await locals.pb
        .collection('winners_rikverliezersfinale')
        .getFullList({ sort: '-year' }),
      winnersStiefelen: await locals.pb
        .collection('winners_stiefelen')
        .getFullList({ sort: '-year' })
    };
  } catch (error) {
    console.error('Failed to fetch PocketBase:', error);
    return {
      rikstandFile: {},
      rikregelsFile: {},
      winnersRikfinale: [],
      winnersRikverliezersfinale: [],
      winnersStiefelen: []
    };
  }
};
