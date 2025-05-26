<script>
  import { getFileUrl } from '$lib/util.js';

  export let data;

  const pages = [
    {
      title: 'Geschiedenis',
      url: '/vereniging/geschiedenis'
    },
    {
      title: 'Bestuur',
      url: '/vereniging/bestuur'
    },
    {
      title: 'Commissies',
      url: '/vereniging/commissies'
    },
    {
      title: 'Activiteiten',
      url: '/vereniging/activiteiten'
    },
    {
      title: 'Hertog Jan',
      url: '/vereniging/hertogjan'
    }
  ];
</script>

<div class="flex flex-wrap">
  {#each pages as pageItem}
    <div class="flex flex-col items-center">
      <figure class="m-4 w-64 overflow-hidden rounded-lg">
        <a href={pageItem.url}>
          <img
            src={getFileUrl(
              data.pagePictures.find((p) => p.page_name === pageItem.title).collectionId,
              data.pagePictures.find((p) => p.page_name === pageItem.title).id,
              data.pagePictures.find((p) => p.page_name === pageItem.title).picture
            )}
            alt={pageItem.title}
            class="w-64 object-cover"
          /></a
        >
      </figure>
      <h2 class="card-title text-xl font-bold text-black">{pageItem.title}</h2>
    </div>
  {/each}
</div>
