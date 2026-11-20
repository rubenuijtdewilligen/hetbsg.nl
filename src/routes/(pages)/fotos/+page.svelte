<script>
  import { enhance } from '$app/forms';

  export let data;
  export let form;
</script>

<div class="my-16 flex items-center justify-center">
  <div class="w-full max-w-4xl px-4">
    {#if data.authenticated}
      <div class="flex flex-wrap justify-center gap-4">
        {#each data.photoAlbums as photoAlbum (photoAlbum.id)}
          <a
            href={photoAlbum.url}
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            {photoAlbum.name}
          </a>
        {/each}
      </div>
    {:else}
      <div class="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
        <p class="mb-4 text-center text-gray-700">
          Voer het wachtwoord in om de fotoalbums te bekijken.
        </p>
        <form method="POST" use:enhance class="flex flex-col gap-3">
          <input
            type="password"
            name="password"
            placeholder="Wachtwoord"
            required
            class="input input-bordered w-full"
          />
          {#if form?.incorrect}
            <p class="text-error text-sm">Onjuist wachtwoord, probeer het opnieuw.</p>
          {/if}
          <button type="submit" class="btn btn-primary w-full">Bekijken</button>
          <small>
            Vraag het wachtwoord op bij het
            <a href="/contact" class="link link-primary">bestuur</a>.</small
          >
        </form>
      </div>
    {/if}
  </div>
</div>

<h2 class="mb-16 text-center text-2xl font-bold">
  Zie ook de laatste updates op onze
  <a class="link link-primary" href="https://instagram.com/hetbsg" target="_blank">
    Instagram pagina
  </a>.
</h2>
