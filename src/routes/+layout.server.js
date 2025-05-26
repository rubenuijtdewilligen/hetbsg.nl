export const load = async ({ locals }) => {
  const pageTitles = [
    { path: '/', title: 'Home' },
    { path: '/vereniging', title: 'Vereniging' },
    { path: '/vereniging/geschiedenis', title: 'Home' },
    { path: '/vereniging/bestuur', title: 'Bestuur' },
    { path: '/vereniging/commissies', title: 'Commissies' },
    { path: '/vereniging/activiteiten', title: 'Activiteiten' },
    { path: '/vereniging/hertogjan', title: 'Hertog Jan' },
    { path: '/fotos', title: "Foto's" },
    { path: '/rikstand', title: 'Rikstand' },
    { path: '/verkoop', title: 'Verkoop' },
    { path: '/contact', title: 'Contact' }
  ];

  if (locals.user) {
    return {
      user: locals.user,
      pageTitles
    };
  }

  return {
    user: undefined,
    pageTitles
  };
};
