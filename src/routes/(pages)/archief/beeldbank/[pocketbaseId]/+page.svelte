<script>
  import { getFileUrl } from '$lib/util.js';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';

  export let data;

  const previewOpen = writable(false);

  function goToSearch(field, value) {
    const encodedValue = encodeURIComponent(value);
    goto(`/archief/beeldbank?${field}=${encodedValue}`);
  }

  function openPreview() {
    previewOpen.set(true);
  }

  function closePreview() {
    previewOpen.set(false);
  }

  const fileUrl = data.mediaItem.file
    ? getFileUrl(data.mediaItem.collectionId, data.mediaItem.id, data.mediaItem.file)
    : null;
</script>

<div class="mx-auto max-w-4xl">
  <a href="/archief/beeldbank" class="btn btn-primary my-6">← Terug naar overzicht</a>
</div>

<div class="mx-auto mb-10 max-w-4xl space-y-8 rounded-2xl bg-white p-6 shadow-lg">
  {#if data.mediaItem.title}
    <h1 class="text-3xl font-bold text-gray-800">{data.mediaItem.title}</h1>
  {/if}

  {#if fileUrl}
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div class="flex flex-col items-center justify-center gap-2">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <img
        src={fileUrl}
        alt={data.mediaItem.title || 'Mediabestand'}
        class="max-h-96 cursor-pointer rounded-xl object-contain shadow-md"
        on:click={openPreview}
      />
      <a href={fileUrl} download class="btn btn-outline btn-sm mt-2"> 📥 Download afbeelding </a>
    </div>
  {/if}

  {#if data.mediaItem.description}
    <p class="text-gray-700">{data.mediaItem.description}</p>
  {/if}

  <div class="grid grid-cols-1 gap-x-10 gap-y-6 text-gray-700 md:grid-cols-2">
    {#if data.mediaItem.expand.object_types?.length}
      <div>
        <p class="mb-1 font-semibold">Object Types:</p>
        <div class="flex flex-wrap gap-2">
          {#each data.mediaItem.expand.object_types as type}
            <button
              on:click={() => goToSearch('object_types', type.name)}
              class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 transition hover:cursor-pointer hover:bg-blue-200"
            >
              {type.name}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if data.mediaItem.expand.places?.length}
      <div>
        <p class="mb-1 font-semibold">Plaatsen:</p>
        <div class="flex flex-wrap gap-2">
          {#each data.mediaItem.expand.places as place}
            <button
              on:click={() => goToSearch('places', place.name)}
              class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 transition hover:cursor-pointer hover:bg-green-200"
            >
              {place.name}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if data.mediaItem.expand.creators?.length}
      <div>
        <p class="mb-1 font-semibold">Makers:</p>
        <div class="flex flex-wrap gap-2">
          {#each data.mediaItem.expand.creators as creator}
            <button
              on:click={() => goToSearch('creators', creator.name)}
              class="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 transition hover:cursor-pointer hover:bg-purple-200"
            >
              {creator.name}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if data.mediaItem.expand.subjects?.length}
      <div>
        <p class="mb-1 font-semibold">Onderwerpen:</p>
        <div class="flex flex-wrap gap-2">
          {#each data.mediaItem.expand.subjects as subject}
            <button
              on:click={() => goToSearch('subjects', subject.name)}
              class="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 transition hover:cursor-pointer hover:bg-yellow-200"
            >
              {subject.name}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if data.mediaItem.expand.persons?.length}
      <div>
        <p class="mb-1 font-semibold">Personen:</p>
        <div class="flex flex-wrap gap-2">
          {#each data.mediaItem.expand.persons as person}
            <button
              on:click={() => goToSearch('persons', person.name)}
              class="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-800 transition hover:cursor-pointer hover:bg-pink-200"
            >
              {person.name}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if data.mediaItem.expand.boards?.length}
      <div>
        <p class="mb-1 font-semibold">Besturen:</p>
        <div class="flex flex-wrap gap-2">
          {#each data.mediaItem.expand.boards as board}
            <button
              on:click={() => goToSearch('boards', board.name)}
              class="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800 transition hover:cursor-pointer hover:bg-orange-200"
            >
              {board.name}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if data.mediaItem.uploader}
    <p>
      <span class="font-semibold">Geüpload door:</span>
      {data.mediaItem.expand.uploader.name}
    </p>
  {/if}
  <p class="-mt-6">
    <span class="font-semibold">Geüpload op:</span>
    {new Date(data.mediaItem.created).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })} om {new Date(data.mediaItem.created).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    })}
  </p>
</div>

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if $previewOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black"
    on:click={closePreview}
  >
    <img
      src={fileUrl}
      alt={data.mediaItem.title || 'Mediabestand'}
      class="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-lg"
    />
  </div>
{/if}
