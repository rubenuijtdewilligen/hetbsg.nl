export const load = async ({ locals }) => {
  return {
    commissie_aantal: await locals.pb
      .collection('general_settings')
      .getFirstListItem('key = "commissie_aantal"'),
    ledenaantal: await locals.pb
      .collection('general_settings')
      .getFirstListItem('key = "ledenaantal"'),
    comissiesfile: await locals.pb.collection('files').getFirstListItem('key = "commissielijst"'),
    exampleCommittees: await locals.pb
      .collection('example_committees')
      .getFullList({ sort: 'name' })
  };
};
