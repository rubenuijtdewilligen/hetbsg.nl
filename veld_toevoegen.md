Mini handleiding veld toevoegen aan media_items

- Maak een pocketbase collection 'media\_<name>'
- Maak een pocketbase veld in media_types: '<name>'
- Update array in lib/syncpbes.js
- Update pb doc in lib/syncpbes.js
- Update translateFacetFields in lib/util.js
- Update facet_fields in /archief/beeldbank/+page.server.js
- Update expand in /archief/beeldbank/[pocketbaseId]/+page.server.js
- Add field to /archief/beeldbank/[pocketbaseId]/+page.svelte
- Add 'add' and 'search' routes in /api/media/categories
- Update facet_fields in /api/media/search/+server.js
- Update data in /archiefadmin/(protected)/add/+page.server.js
- Create array in script of /archiefadmin/(protected)/add/+page.svelte
- Add AutocompleteField in /archiefadmin/(protected)/add/+page.svelte
- Update facet_fields in /archiefadmin/(protected)/items/+page.server.js
