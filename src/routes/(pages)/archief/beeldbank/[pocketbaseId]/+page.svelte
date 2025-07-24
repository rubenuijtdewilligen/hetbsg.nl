<script>
  import { getFileUrl } from '$lib/util.js';

  export let data;

  console.log('Media Item Data:', data.mediaItem);
</script>

{#if data.mediaItem.title}
  <p><span class="font-semibold">Titel:</span> {data.mediaItem.title}</p>
{/if}

{#if data.mediaItem.description}
  <p><span class="font-semibold">Omschrijving:</span> {data.mediaItem.description}</p>
{/if}

{#if data.mediaItem.date}
  <p><span class="font-semibold">Datum:</span> {data.mediaItem.date}</p>
{/if}

{#if data.mediaItem.place}
  <p><span class="font-semibold">Plaats:</span> {data.mediaItem.place}</p>
{/if}

{#if data.mediaItem.expand.creator}
  <p><span class="font-semibold">Maker:</span> {data.mediaItem.expand.creator.name}</p>
{/if}

{#if data.mediaItem.expand.subjects?.length}
  <p>
    <span class="font-semibold">Onderwerpen:</span>
    {data.mediaItem.expand.subjects.map((subject) => subject.name).join(', ')}
  </p>
{/if}

{#if data.mediaItem.expand.persons?.length}
  <p>
    <span class="font-semibold">Personen:</span>
    {data.mediaItem.expand.persons.map((person) => person.name).join(', ')}
  </p>
{/if}

{#if data.mediaItem.expand.boards?.length}
  <p>
    <span class="font-semibold">Besturen:</span>
    {data.mediaItem.expand.boards.map((board) => board.name).join(', ')}
  </p>
{/if}

{#if data.mediaItem.expand.object_type}
  <p><span class="font-semibold">Object Type:</span> {data.mediaItem.expand.object_type.name}</p>
{/if}

{#if data.mediaItem.file}
  <p class="font-semibold">Bestand:</p>
  <img
    src={getFileURL(data.mediaItem.collectionId, data.mediaItem.id, data.mediaItem.file)}
    alt=""
    class="max-h-48"
  />
{/if}
