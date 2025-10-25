<script>
  import AutocompleteField from '$lib/components/AutocompleteField.svelte';

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
</script>

<div class="max-w-2xl space-y-6">
  <h1 class="text-3xl font-bold">Nieuw item toevoegen</h1>

  <form
    method="POST"
    enctype="multipart/form-data"
    action="?/addItem"
    class="space-y-4"
    use:enhance
  >
    <input
      class="input input-bordered w-full"
      name="title"
      bind:value={title}
      placeholder="Titel"
      required
    />

    <textarea
      class="textarea textarea-bordered w-full"
      name="description"
      bind:value={description}
      placeholder="Omschrijving"
    ></textarea>

    <input class="input input-bordered w-full" name="date" bind:value={date} placeholder="Datum" />

    <input
      type="file"
      name="file"
      class="file-input file-input-bordered w-full"
      required
      on:change={(e) => (file = e.target.files[0])}
    />

    <AutocompleteField label="Object type" endpoint="object_types" bind:bindValue={object_type} />
    <input type="hidden" name="object_type" value={object_type?.id} />

    <AutocompleteField label="Originele maker" endpoint="creators" bind:bindValue={creator} />
    <input type="hidden" name="creator" value={creator?.id} />

    <AutocompleteField label="Plaats" endpoint="places" bind:bindValue={place} />
    <input type="hidden" name="place" value={place?.id} />

    <AutocompleteField label="Onderwerpen" endpoint="subjects" bind:bindValue={subjects} multiple />
    {#each subjects as subject}
      <input type="hidden" name="subjects" value={subject.id} />
    {/each}

    <AutocompleteField label="Personen" endpoint="persons" bind:bindValue={persons} multiple />
    {#each persons as person}
      <input type="hidden" name="persons" value={person.id} />
    {/each}

    <AutocompleteField label="Besturen" endpoint="boards" bind:bindValue={boards} multiple />
    {#each boards as board}
      <input type="hidden" name="boards" value={board.id} />
    {/each}

    <input type="hidden" name="" />

    <button class="btn btn-primary w-full" type="submit" name="action" value="create">
      Opslaan
    </button>
  </form>
</div>
