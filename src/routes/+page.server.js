export const load = async ({ locals }) => {
  return {
    maillijstLink: await locals.pb
      .collection('general_settings')
      .getFirstListItem('key = "maillijst_link"'),
    ledenaantal: await locals.pb
      .collection('general_settings')
      .getFirstListItem('key = "ledenaantal"')
  };
};
