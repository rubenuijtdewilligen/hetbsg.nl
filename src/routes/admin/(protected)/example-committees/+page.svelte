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
          toast.success('Voorbeeldcommissie toegevoegd.', { duration: 5000 });
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
          toast.success('Voorbeeldcommissie verwijderd.', { duration: 5000 });
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
  Op de commissies pagina staat een linkje naar een PDF-bestand met alle commissies. Deze kan
  aangepast worden onder <a href="/admin/files" class="link link-primary">Bestanden</a> in deze admin
  omgeving.
</p>

<p class="my-2">
  Onder die link staan een aantal voorbeelden van commissies. Die kan je hier toevoegen of
  verwijderen. Je kan ze niet aanpassen, maar wel verwijderen en een verbeterde versie toevoegen.
  Wijzigingen zijn meteen zichtbaar op de commissies pagina.
</p>

<Modal label="create-example-committee" checked={addModalOpen}>
  <span slot="trigger" class="btn btn-primary">
    <FontAwesomeIcon icon={faPlusCircle} />Voorbeeldcommissie toevoegen
  </span>
  <h3 slot="heading">Voorbeeldcommissie toevoegen</h3>
  <form action="?/addExampleCommittee" method="POST" class="space-y-2" use:enhance={submitAdd}>
    <Input id="name" type="text" label="Naam" required={true} disabled={loading} />
    <Input id="goal" type="text" label="Doel" required={false} disabled={loading} />
    <Input id="motto" type="text" label="Motto" required={false} disabled={loading} />

    <button type="submit" class="btn btn-primary w-full" disabled={loading}>
      Voorbeeldcommissie toevoegen
    </button>
  </form>
</Modal>

<p class="my-2">Voorbeeldcommissies die nu op de website staan, op alfabetische volgorde:</p>

{#each data.exampleCommittees as exampleCommittee}
  <div class="border-primary mb-2 rounded-xl border-2 bg-white p-4">
    <div class="flex flex-row items-center justify-between">
      <div>
        <h2 class="text-primary text-2xl font-bold">{exampleCommittee.name}</h2>
        <p><b>Doel:</b> {exampleCommittee.goal}</p>
        <p><b>Motto:</b> {exampleCommittee.motto}</p>
      </div>
      <form action="?/deleteExampleCommittee" method="POST" class="mr-2" use:enhance={submitDelete}>
        <input type="hidden" name="id" value={exampleCommittee.id} />
        <button type="submit" disabled={loading || activeDeleteModal === exampleCommittee.id}>
          <FontAwesomeIcon icon={faTrash} class="text-primary text-2xl" />
        </button>
      </form>
    </div>
  </div>
{/each}
