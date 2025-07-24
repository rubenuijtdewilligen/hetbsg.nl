<script>
  import { translateFacetFields } from '$lib/util.js';
  import { onMount } from 'svelte';

  export let data;

  let searchQuery = data.q;
  let selectedFilters = { ...data.filters };
  let results = data.results;
  let facets = data.facets;

  let debounceTimeout;

  function buildSearchUrl() {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    Object.entries(selectedFilters).forEach(([field, values]) => {
      values.forEach((v) => params.append(field, v));
    });
    return `?${params.toString()}`;
  }

  function toggleFilter(field, key) {
    const arr = selectedFilters[field] ?? [];
    if (arr.includes(key)) {
      selectedFilters = {
        ...selectedFilters,
        [field]: arr.filter((k) => k !== key)
      };

      // Remove if empty
      if (selectedFilters[field].length === 0) {
        delete selectedFilters[field];
      }
    } else {
      selectedFilters = {
        ...selectedFilters,
        [field]: [...arr, key]
      };
    }
    triggerSearchDebounced();
  }

  function onSearchInput(e) {
    searchQuery = e.target.value;
    triggerSearchDebounced();
  }

  function triggerSearchDebounced() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      doSearch();
    }, 300);
  }

  async function doSearch() {
    const url = buildSearchUrl();
    history.replaceState(null, '', url); // update URL without reloading

    const res = await fetch(`/api/media/search${url}`);
    if (res.ok) {
      const json = await res.json();
      results = json.results;
      facets = json.facets;
    } else {
      console.error('Fout bij ophalen resultaten', await res.text());
    }
  }
</script>

<div class="flex min-h-screen gap-6 p-6">
  <aside class="sticky top-6 w-72 self-start rounded-lg bg-base-200 p-6">
    <h2 class="mb-5 text-xl font-bold">Filters</h2>
    {#each Object.entries(facets) as [field, facetItems]}
      <section class="mb-6">
        <h3 class="mb-3 font-semibold capitalize">{translateFacetFields(field)}</h3>
        {#if facetItems.length === 0}
          <p class="text-sm italic text-gray-500">Geen opties</p>
        {:else}
          <ul class="max-h-48 space-y-1 overflow-y-auto">
            {#each facetItems as item}
              <li>
                <label class="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    class="checkbox-primary checkbox checkbox-sm"
                    checked={selectedFilters[field]?.includes(item.key) || false}
                    on:change={() => toggleFilter(field, item.key)}
                  />
                  <span>{item.key} ({item.count})</span>
                </label>
              </li>
            {/each}
          </ul>
        {/if}
      </section>
    {/each}
  </aside>

  <main class="flex-1">
    <form class="mb-8 flex gap-3" on:submit|preventDefault={() => doSearch()}>
      <input
        bind:this={searchInputRef}
        type="search"
        placeholder="Zoek titel, omschrijving, datum..."
        class="input input-bordered flex-grow"
        value={searchQuery}
        on:input={onSearchInput}
      />
      <button type="submit" class="btn btn-primary">Zoeken</button>
    </form>

    {#if results.length === 0}
      <p class="mt-12 text-center text-gray-500">Geen resultaten gevonden.</p>
    {:else}
      <ul class="space-y-6">
        {#each results as item}
          <li class="rounded-lg bg-base-100 p-6 shadow transition hover:shadow-lg">
            <h3 class="text-2xl font-semibold">{item.title}</h3>
            <p class="mb-2 text-sm text-gray-400">{item.date}</p>
            <p class="mb-3">{item.description}</p>
            <img src={item.file} alt="" class="my-2 max-w-64 rounded-xl" />
            <div class="space-x-4 text-sm text-gray-600">
              {#if item.object_type}
                <span><strong>Type:</strong> {item.object_type}</span>
              {/if}
              {#if item.creator}
                <span><strong>Maker:</strong> {item.creator}</span>
              {/if}
              {#if item.place}
                <span><strong>Plaats:</strong> {item.place}</span>
              {/if}
              {#if item.subjects?.length}
                <span><strong>Onderwerpen:</strong> {item.subjects.join(', ')}</span>
              {/if}
              {#if item.persons?.length}
                <span><strong>Personen:</strong> {item.persons.join(', ')}</span>
              {/if}
              {#if item.boards?.length}
                <span><strong>Besturen:</strong> {item.boards.join(', ')}</span>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </main>
</div>
