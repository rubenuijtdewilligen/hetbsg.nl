<script>
  import { translateFacetFields } from '$lib/util.js';
  import { onMount } from 'svelte';

  export let data;

  let searchQuery = data.q;
  let selectedFilters = { ...data.filters };
  let results = data.results;
  let facets = data.facets;

  let debounceTimeout;
  let searchInputRef;

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

  function clearAllFilters() {
    selectedFilters = {};
    doSearch();
  }
</script>

<div class="flex min-h-screen gap-6 p-6">
  <aside class="bg-base-300 sticky top-6 w-72 self-start rounded-lg p-6">
    <h2 class="mb-5 text-xl font-bold">Filters</h2>
    {#each Object.entries(facets) as [field, facetItems]}
      <section class="mb-6">
        <h3 class="mb-3 font-semibold capitalize">{translateFacetFields(field)}</h3>
        {#if facetItems.length === 0}
          <p class="text-sm text-gray-500 italic">Geen opties</p>
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
    <form class="mb-4 flex gap-3" on:submit|preventDefault={() => doSearch()}>
      <input
        bind:this={searchInputRef}
        type="search"
        placeholder="Zoek titel, omschrijving, datum..."
        class="input input-bordered grow"
        value={searchQuery}
        on:input={onSearchInput}
      />
      <button type="submit" class="btn btn-primary">Zoeken</button>
    </form>

    {#if results.length === 0}
      <p class="mt-12 text-center text-gray-500">Geen resultaten gevonden.</p>
    {:else}
      <div class="flex flex-row items-center justify-between">
        <p class="text-2xl font-bold">
          Gevonden: <span class="text-primary">{results.length}</span>
        </p>

        <button class="btn btn-primary" on:click={clearAllFilters}> Alle filters wissen </button>
      </div>

      <div class="bg-base-300 mt-4 mb-6 flex w-full flex-row items-center space-x-3 rounded-lg p-4">
        <p class="text-lg font-semibold">Filter(s):</p>

        {#each Object.entries(selectedFilters) as [field, values]}
          <span class="badge badge-primary mr-2">
            {translateFacetFields(field)}: {values.join(', ')}
          </span>
        {/each}

        {#if Object.keys(selectedFilters).length === 0}
          <span class="text-sm text-gray-500">Geen filters actief</span>
        {/if}
      </div>

      <div class="flex flex-wrap space-y-4 space-x-4">
        {#each results as item}
          <a href={`/archief/beeldbank/${item.pocketbaseId}`}>
            <div class="bg-base-300 max-w-48 rounded-lg p-2">
              <img src={item.file} alt="" class="mb-2 max-h-48 rounded-lg" />
              <p class="link link-primary">{item.title}</p>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </main>
</div>
