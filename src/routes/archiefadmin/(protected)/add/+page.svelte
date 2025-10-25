<script>
  import AutocompleteField from '$lib/components/AutocompleteField.svelte';

  let title = '';
  let description = '';
  let file;
  let date = '';

  let object_types = [];
  let creators = [];
  let places = [];
  let subjects = [];
  let persons = [];
  let boards = [];
  let archive_maps = [];
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

    <AutocompleteField
      label="Object types"
      endpoint="object_types"
      bind:bindValue={object_types}
      multiple
    />
    {#each object_types as object_type}
      <input type="hidden" name="object_types" value={object_type.id} />
    {/each}

    <AutocompleteField
      label="Archiefmappen"
      endpoint="archive_maps"
      bind:bindValue={archive_maps}
      multiple
    />
    {#each archive_maps as archive_map}
      <input type="hidden" name="archive_maps" value={archive_map.id} />
    {/each}

    <AutocompleteField
      label="Originele makers"
      endpoint="creators"
      bind:bindValue={creators}
      multiple
    />
    {#each creators as creator}
      <input type="hidden" name="creators" value={creator.id} />
    {/each}

    <AutocompleteField label="Plaatsen" endpoint="places" bind:bindValue={places} multiple />
    {#each places as place}
      <input type="hidden" name="places" value={place.id} />
    {/each}

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
