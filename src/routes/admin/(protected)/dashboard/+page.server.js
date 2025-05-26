export const load = async ({ locals }) => {
  try {
    const subscribers = await locals.pb.collection('subscribers').getList(1, 1);
    const packs = await locals.pb.collection('packs').getList(1, 1);
    const tracks = await locals.pb.collection('tracks').getList(1, 1);

    return {
      totalSubscribers: subscribers.totalItems,
      totalPacks: packs.totalItems,
      totalTracks: tracks.totalItems
    };
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
    return { totalSubscribers: 0, totalPacks: 0, totalTracks: 0 };
  }
};
