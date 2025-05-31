<script>
  import {
    faMagnifyingGlass,
    faPencil,
    faPlusCircle,
    faTrash
  } from '@fortawesome/free-solid-svg-icons';
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
          toast.success('Activiteit toegevoegd.', { duration: 5000 });
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
          toast.success('Activiteit verwijderd.', { duration: 5000 });
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
  Hier kan je de inhoud van de pagina <a href="/vereniging/activiteiten" class="link link-primary">
    Activiteit
  </a> aanpassen. Je kan hier activiteiten toevoegen of verwijderen. Je kan ze niet aanpassen, maar wel
  verwijderen en een verbeterde versie toevoegen. Wijzigingen zijn meteen zichtbaar op de pagina.
</p>

<Modal label="add-activity" checked={addModalOpen}>
  <span slot="trigger" class="btn btn-primary my-2">
    <FontAwesomeIcon icon={faPlusCircle} />Activiteit toevoegen
  </span>
  <h3 slot="heading">Activiteit toevoegen</h3>
  <form
    action="?/addActivity"
    method="POST"
    class="space-y-2"
    enctype="multipart/form-data"
    use:enhance={submitAdd}
  >
    <Input id="name" type="text" label="Naam" required disabled={loading} />

    <label class="form-control">
      <div class="label">
        <span class="label-text">Beschrijving</span>
      </div>
      <textarea class="textarea textarea-bordered" id="description" name="description" rows="5"
      ></textarea>
    </label>

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
      Activiteit toevoegen
    </button>
  </form>
</Modal>

{#if data.activities.length > 0}
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Beschrijving</th>
          <th>Afbeelding</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {#each data.activities as activity}
          <tr>
            <td>{activity.name}</td>
            <td class="max-w-xs truncate">{activity.description}</td>

            <td>
              <a
                href={getFileUrl(activity.collectionId, activity.id, activity.image)}
                target="_blank"
                class="link link-primary text-xl"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </a>
            </td>
            <td>
              <form action="?/deleteActivity" method="POST" class="mr-2" use:enhance={submitDelete}>
                <input type="hidden" name="id" value={activity.id} />
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
  <p class="my-2">Er zijn nog geen activiteiten toegevoegd.</p>
{/if}
