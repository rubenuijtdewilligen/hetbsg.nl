<script>
  import { getFileUrl } from '$lib/util.js';

  export let data;
</script>

<h2 class="my-8 px-4 text-center text-3xl font-bold">Rikken</h2>

<div class="flex flex-col items-center">
  <img
    src={getFileUrl(data.rikstandFile.collectionId, data.rikstandFile.id, data.rikstandFile.file)}
    alt="Rikstand"
  />

  <p class="mt-2 rounded-xl border-4 border-primary p-2 text-xl">
    De rikregels als opgesteld door de Rikcie kun je hier downloaden:
    <a
      class="link link-primary"
      target="_blank"
      href={getFileUrl(
        data.rikregelsFile.collectionId,
        data.rikregelsFile.id,
        data.rikregelsFile.file
      )}
    >
      Rikregels
    </a>
  </p>
</div>

<div class="flex flex-col items-center md:px-32 lg:px-64">
  <h2 class="my-8 text-3xl font-bold">Winnaars Rikfinale</h2>

  <div class="space-y-1 text-xl text-gray-800">
    {#each data.winnersRikfinale as winner}
      <div class="grid w-72 grid-cols-[auto_1fr] gap-8">
        <p class="text-right">{winner.year}</p>
        <p>{winner.name}</p>
      </div>
    {/each}
  </div>

  <h2 class="my-8 text-3xl font-bold">Winnaars Rikverliezersfinale</h2>

  <div class="space-y-1 text-xl text-gray-800">
    {#each data.winnersRikverliezersfinale as winner}
      <div class="grid w-72 grid-cols-[auto_1fr] gap-8">
        <p class="text-right">{winner.year}</p>
        <p>{winner.name}</p>
      </div>
    {/each}
  </div>
  <h2 class="my-8 text-3xl font-bold">Winnaars Stiefelen</h2>

  <div class="space-y-1 text-xl text-gray-800">
    {#each data.winnersStiefelen as winner}
      <div class="grid w-72 grid-cols-[auto_1fr] gap-8">
        <p class="text-right">{winner.year}</p>
        <p>{winner.name}</p>
      </div>
    {/each}
  </div>
</div>
