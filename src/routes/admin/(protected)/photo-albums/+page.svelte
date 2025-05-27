<script>
  import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import toast from 'svelte-french-toast';
  import { Modal, Input } from '$lib/components';

  export let data;

  let addModalOpen;
  let activeDeleteModal;
  let loading;

  $: addModalOpen = false;
  $: activeDeleteModal = null;
  $: loading = false;

  const submitAdd = ({ formElement }) => {
    loading = true;
    addModalOpen = true;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          formElement.reset();
          addModalOpen = false;
          toast.success('Foto album toegevoegd.', { duration: 5000 });
          break;
        case 'error':
          toast.error('Er is iets misgegaan.', { duration: 5000 });
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };

  const submitDelete = ({ formElement, id }) => {
    loading = true;
    activeDeleteModal = id;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          formElement.reset();
          activeDeleteModal = null;
          toast.success('Foto album verwijderd.', { duration: 5000 });
          break;
        case 'error':
          toast.error('Er is iets misgegaan.', { duration: 5000 });
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
</script>

<p>
  Hier kan je de links naar foto albums op de pagina
  <a href="/fotos" class="link link-primary"> Foto's </a> aanpassen. De foto albums staan opgeslagen
  in Google Photos. Het wachtwoord van dat Google account is te vinden in het draaiboek van de WebCie.
</p>

<Modal label="add-photo-album" checked={addModalOpen}>
  <span slot="trigger" class="btn btn-primary my-2">
    <FontAwesomeIcon icon={faPlusCircle} />Foto album toevoegen
  </span>
  <h3 slot="heading">Foto album toevoegen</h3>
  <form action="?/addPhotoAlbum" method="POST" class="space-y-2" use:enhance={submitAdd}>
    <Input id="name" type="text" label="Naam" required disabled={loading} />
    <Input id="url" type="link" label="Link" required disabled={loading} />

    <button type="submit" class="btn btn-primary w-full" disabled={loading}>
      Foto album toevoegen
    </button>
  </form>
</Modal>

{#if data.photoAlbums.length > 0}
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Link</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {#each data.photoAlbums as photoAlbum}
          <tr>
            <th>{photoAlbum.name}</th>
            <td>
              <a href={photoAlbum.url} target="_blank" class="link link-primary">
                {photoAlbum.url}
              </a>
            </td>
            <td>
              <form
                action="?/deletePhotoAlbum"
                method="POST"
                class="mr-2"
                use:enhance={submitDelete}
              >
                <input type="hidden" name="id" value={photoAlbum.id} />
                <button type="submit" disabled={loading || activeDeleteModal === photoAlbum.id}>
                  <FontAwesomeIcon icon={faTrash} class="text-xl text-primary" />
                </button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p class="my-2">Er zijn nog geen foto albums toegevoegd.</p>
{/if}
