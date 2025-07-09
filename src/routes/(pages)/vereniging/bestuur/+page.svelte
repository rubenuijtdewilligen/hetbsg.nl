<script>
  import { getFileUrl } from '$lib/util.js';

  export let data;
</script>

<div class="mb-8 flex flex-col items-center px-4">
  {#each data.boards as board}
    <h2 class="mt-8 text-2xl font-bold">Bestuur {board.name}</h2>

    <img
      class="my-4 px-4 md:w-1/2"
      src={getFileUrl(board.collectionId, board.id, board.image)}
      alt="Bestuur {board.name}"
    />

    <p class="text-center text-gray-800">
      <i>van links naar rechts:</i><br />
      {@html board.vlnr}
    </p>
  {/each}
</div>
