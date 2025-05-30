<script>
  import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
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
          toast.success('Kapel toegevoegd.', { duration: 5000 });
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
          toast.success('Kapel verwijderd.', { duration: 5000 });
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
  Hier kan je de kapellen in de tabel onderaan de pagina <a
    href="/vereniging/geschiedenis/kapellen"
    class="link link-primary"
  >
    Kapellen
  </a> aanpassen. Je kan ze niet aanpassen, maar wel verwijderen en een verbeterde versie toevoegen.
  Dit doe je in principe alleen als een kapel gesloopt wordt. Wijzigingen zijn meteen zichtbaar op de
  pagina.
</p>

<Modal label="add-chapel" checked={addModalOpen}>
  <span slot="trigger" class="btn btn-primary my-2">
    <FontAwesomeIcon icon={faPlusCircle} />Kapel toevoegen
  </span>
  <h3 slot="heading">Kapel toevoegen</h3>
  <form
    action="?/addChapel"
    method="POST"
    class="space-y-2"
    enctype="multipart/form-data"
    use:enhance={submitAdd}
  >
    <Input id="year" type="text" label="Jaar" required disabled={loading} />
    <Input id="place" type="text" label="Plaats" required disabled={loading} />
    <Input id="type" type="text" label="Soort" required disabled={loading} />

    <div class="form-control w-40">
      <label class="label cursor-pointer">
        <span class="label-text">Staat er nog?</span>
        <input
          type="checkbox"
          class="toggle toggle-primary"
          checked="checked"
          id="stillThere"
          name="stillThere"
          disabled={loading}
        />
      </label>
    </div>

    <button type="submit" class="btn btn-primary w-full" disabled={loading}>
      Kapel toevoegen
    </button>
  </form>
</Modal>

{#if data.chapels.length > 0}
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Jaar</th>
          <th>Plaats</th>
          <th>Soort</th>
          <th>Staat er nog?</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {#each data.chapels as chapel}
          <tr>
            <td>{chapel.year}</td>
            <td>{chapel.place}</td>
            <td>{chapel.type}</td>
            <td>{chapel.stillThere ? 'Ja' : 'Nee'}</td>
            <td>
              <form action="?/deleteChapel" method="POST" class="mr-2" use:enhance={submitDelete}>
                <input type="hidden" name="id" value={chapel.id} />
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
  <p class="my-2">Er zijn nog geen kapellen toegevoegd.</p>
{/if}
