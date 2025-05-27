<script>
  export let data;
</script>

<div class="my-16 flex items-center justify-center">
  <div class="w-full max-w-4xl px-4">
    <div class="flex flex-wrap justify-center gap-4">
      {#each data.photoAlbums as photoAlbum}
        <a href={photoAlbum.url} class="btn btn-primary">{photoAlbum.name}</a>
      {/each}
    </div>
  </div>
</div>

<h2 class="text-center text-2xl font-bold">
  Zie ook de laatste updates op onze
  <a class="link link-primary" href="https://instagram.com/hetbsg" target="_blank">
    Instagram pagina
  </a>.
</h2>
