<script>
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import toast from 'svelte-french-toast';
  import { getFileUrl } from '$lib/util';

  export let data;

  let selectedPageId;
  let loading;

  $: selectedPageId = '';
  $: loading = false;

  const showPreview = (event) => {
    const target = event.target;
    const files = target.files;

    if (files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      const preview = document.getElementById('picture-preview');
      preview.src = src;
    }
  };

  const submitUpdate = ({ formElement }) => {
    loading = true;

    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          loading = false;
          toast.success('Foto succesvol bijgewerkt.', { duration: 5000 });
          break;
        case 'error':
          toast.error('Fout bij het bijwerken van de foto.', { duration: 5000 });
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
</script>

De pagina <a href="/vereniging" class="link link-primary">Vereniging</a> linkt door naar 5 andere
pagina's die informatie over de vereniging bevatten. Bij de links naar die andere 5 pagina's staat
een foto. Deze kan je hier aanpassen.

<label class="form-control w-full max-w-xs">
  <div class="label">
    <span class="label-text">Van welke pagina wil je de foto aanpassen?</span>
  </div>
  <select class="select select-bordered" bind:value={selectedPageId}>
    <option disabled selected>Kies een pagina</option>
    {#each data.pagePictures as setting}
      <option value={setting.id}>{setting.page_name}</option>
    {/each}
  </select>
</label>

{#if selectedPageId}
  <div class="mt-4">
    <p class="mb-2">
      Klik op de foto om hem aan te passen. Je krijgt dan een preview van de nieuw geselecteerde
      foto. Als je tevreden bent, klik dan op de knop 'Foto bijwerken' om de foto te bevestigen.
    </p>

    <form
      action="?/updatePicture"
      method="POST"
      enctype="multipart/form-data"
      use:enhance={submitUpdate}
    >
      <label for="picture" class="w-72 rounded-lg hover:cursor-pointer">
        <img
          src={getFileUrl(
            data.pagePictures[0].collectionId,
            data.pagePictures.find((p) => p.id === selectedPageId).id,
            data.pagePictures.find((p) => p.id === selectedPageId).picture
          )}
          alt="Page"
          class="w-72 rounded-lg"
          id="picture-preview"
        />
      </label>

      <input type="hidden" name="id" value={selectedPageId} />
      <input
        type="file"
        name="picture"
        id="picture"
        accept="image/*"
        hidden
        on:change={showPreview}
        disabled={loading}
      />

      <button type="submit" class="btn btn-primary mt-4" disabled={loading}>Foto bijwerken</button>
    </form>
  </div>
{/if}
