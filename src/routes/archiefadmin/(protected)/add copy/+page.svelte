<script>
  import AutocompleteField from '$lib/components/AutocompleteField.svelte';
  import { goto } from '$app/navigation';

  let title = '';
  let description = '';
  let file;
  let date = '';

  let object_type = null;
  let creator = null;
  let place = null;
  let subjects = [];
  let persons = [];
  let boards = [];

  let isSubmitting = false;

  async function handleSubmit() {
    isSubmitting = true;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    if (file) formData.append('file', file);

    if (object_type) formData.append('object_type', object_type.id);
    if (creator) formData.append('creator', creator.id);
    if (place) formData.append('place', place.id);

    subjects.forEach((item) => formData.append('subjects', item.id));
    persons.forEach((item) => formData.append('persons', item.id));
    boards.forEach((item) => formData.append('boards', item.id));

    const res = await fetch('/api/media/create', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const json = await res.json();
      goto(`/archiefadmin/items`);
    } else {
      alert('Fout bij opslaan');
    }

    isSubmitting = false;
  }
</script>

<div class="max-w-2xl space-y-6">
  <h1 class="text-3xl font-bold">Nieuw item toevoegen</h1>

  <input class="input input-bordered w-full" bind:value={title} placeholder="Titel" />
  <textarea
    class="textarea textarea-bordered w-full"
    bind:value={description}
    placeholder="Omschrijving"
  ></textarea>
  <input class="input input-bordered w-full" bind:value={date} placeholder="Datum" />
  <input
    type="file"
    class="file-input file-input-bordered w-full"
    on:change={(e) => (file = e.target.files[0])}
  />

  <AutocompleteField label="Objecttype" endpoint="object_types" bind:bindValue={object_type} />
  <AutocompleteField label="Maker" endpoint="creators" bind:bindValue={creator} />
  <AutocompleteField label="Plaats" endpoint="places" bind:bindValue={place} />

  <AutocompleteField label="Onderwerpen" endpoint="subjects" bind:bindValue={subjects} multiple />
  <AutocompleteField label="Personen" endpoint="persons" bind:bindValue={persons} multiple />
  <AutocompleteField label="Besturen" endpoint="boards" bind:bindValue={boards} multiple />

  <button class="btn btn-primary w-full" on:click={handleSubmit} disabled={isSubmitting}>
    {isSubmitting ? 'Opslaan...' : 'Opslaan'}
  </button>
</div>
