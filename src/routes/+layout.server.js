export const load = async ({ locals }) => {
  const pageTitles = [
    { path: '/', title: 'Home' },
    { path: '/vereniging', title: 'Vereniging' },
    { path: '/vereniging/geschiedenis', title: 'Geschiedenis' },
    { path: '/vereniging/geschiedenis/tegeltjes', title: 'Tegeltjes' },
    { path: '/vereniging/geschiedenis/kapellen', title: 'Kapellen' },
    { path: '/vereniging/bestuur', title: 'Bestuur' },
    { path: '/vereniging/commissies', title: 'Commissies' },
    { path: '/vereniging/activiteiten', title: 'Activiteiten' },
    { path: '/vereniging/hertogjan', title: 'Hertog Jan' },
    { path: '/fotos', title: "Foto's" },
    { path: '/competities', title: 'Competities' },
    { path: '/verkoop', title: 'Verkoop' },
    { path: '/contact', title: 'Contact' },
    { path: '/archief/beeldbank', title: 'Beeldbank' }
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
