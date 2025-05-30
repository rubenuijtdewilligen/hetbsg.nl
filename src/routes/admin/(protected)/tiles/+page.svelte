<script>
  import { faMagnifyingGlass, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import toast from 'svelte-french-toast';
  import { Modal, Input } from '$lib/components';
  import { getFileUrl } from '$lib/util';

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
          toast.success('Tegeltje toegevoegd.', { duration: 5000 });
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
          toast.success('Tegeltje verwijderd.', { duration: 5000 });
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
  Hier kan je de landdagen tegeltjes op de pagina <a
    href="/vereniging/geschiedenis/tegeltjes"
    class="link link-primary"
  >
    Tegeltjes
  </a> aanpassen.
</p>

<Modal label="add-product" checked={addModalOpen}>
  <span slot="trigger" class="btn btn-primary my-2">
    <FontAwesomeIcon icon={faPlusCircle} />Tegeltje toevoegen
  </span>
  <h3 slot="heading">Tegeltje toevoegen</h3>
  <form
    action="?/addTile"
    method="POST"
    class="space-y-2"
    enctype="multipart/form-data"
    use:enhance={submitAdd}
  >
    <Input id="year" type="text" label="Jaar" required disabled={loading} />
    <Input id="place" type="text" label="Plaats" required disabled={loading} />

    <div class="form-control mb-2 w-full max-w-lg">
      <label for="value" class="label pb-1 font-medium">
        <span class="label-text">Afbeelding</span>
      </label>

      <input
        class="file-input file-input-bordered file-input-primary ml-1 mt-1 w-full max-w-lg"
        type="file"
        required
        disabled={loading}
        accept="image/*"
        id="image"
        name="image"
      />
    </div>

    <button type="submit" class="btn btn-primary w-full" disabled={loading}>
      Tegeltje toevoegen
    </button>
  </form>
</Modal>

{#if data.tiles.length > 0}
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Jaar</th>
          <th>Plaats</th>
          <th>Afbeelding</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {#each data.tiles as tile}
          <tr>
            <td>{tile.year}</td>
            <td>{tile.place}</td>
            <td>
              <a
                href={getFileUrl(tile.collectionId, tile.id, tile.image)}
                target="_blank"
                class="link link-primary text-xl"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </a>
            </td>
            <td>
              <form action="?/deleteTile" method="POST" class="mr-2" use:enhance={submitDelete}>
                <input type="hidden" name="id" value={tile.id} />
                <button type="submit" disabled={loading}>
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
  <p class="my-2">Er zijn nog geen tegeltjes toegevoegd.</p>
{/if}
