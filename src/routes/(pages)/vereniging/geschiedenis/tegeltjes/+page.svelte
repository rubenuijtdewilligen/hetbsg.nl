<script>
  import { getFileUrl } from '$lib/util.js';
  import { onMount } from 'svelte';

  export let data;
  let selectedImage = null;

  onMount(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        selectedImage = null;
      }
    });
  });
</script>

<h2 class="my-8 px-4 text-center text-xl font-bold">
  Bij het BSG wordt elk jaar een tegeltje voor de Landdagen ontworpen. Hieronder staan alle
  tegeltjes van voorgaande jaren.
</h2>

<div class="mb-8 flex items-center justify-center">
  <div class="w-full px-4 md:px-32">
    <div class="flex flex-wrap justify-center gap-4">
      {#each data.tiles as tile}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="relative w-64 cursor-pointer"
          on:click={() => (selectedImage = getFileUrl(tile.collectionId, tile.id, tile.image))}
        >
          <img
            src={getFileUrl(tile.collectionId, tile.id, tile.image)}
            alt={tile.year}
            class="w-full object-cover"
          />
          <div class="absolute bottom-0 w-full bg-black bg-opacity-50 py-1 text-center text-white">
            {tile.place}
            {tile.year}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

{#if selectedImage}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_missing_attribute -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    on:click={() => (selectedImage = null)}
  >
    <img src={selectedImage} class="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg" />
  </div>
{/if}
