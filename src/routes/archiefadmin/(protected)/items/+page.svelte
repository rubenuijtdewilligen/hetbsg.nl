<script>
  import { faMagnifyingGlass, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { onMount } from 'svelte';
  import { Modal } from '$lib/components';
  import { translateFacetFields } from '$lib/util.js';

  export let data;

  let searchQuery = data.q;
  let selectedFilters = { ...data.filters };
  let results = data.results;
  let facets = data.facets;

  let debounceTimeout;
  let searchInputRef;

  let activeDeleteModal;
  let loading;

  $: activeDeleteModal = null;
  $: loading = false;

  const submitDelete = ({ formElement, id }) => {
    loading = true;
    activeDeleteModal = id;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          formElement.reset();
          activeDeleteModal = null;
          toast.success('Item deleted.', { duration: 5000 });
          break;
        case 'error':
          toast.error('Item cannot be deleted.', { duration: 5000 });
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };

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
    history.replaceState(null, '', url);

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

<div class="mx-auto max-w-screen-xl">
  <!-- Zoekformulier -->
  <form class="mb-4 flex flex-col gap-3" on:submit|preventDefault={() => doSearch()}>
    <div class="flex gap-3">
      <input
        bind:this={searchInputRef}
        type="search"
        placeholder="Zoek titel, omschrijving, datum..."
        class="input input-bordered grow"
        value={searchQuery}
        on:input={onSearchInput}
      />
      <button type="submit" class="btn btn-primary">Zoeken</button>
    </div>

    <!-- Advanced filters -->
    <details class="collapse-arrow bg-base-200 collapse">
      <summary class="collapse-title font-medium">🔍 Geavanceerd zoeken</summary>
      <div class="collapse-content">
        <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {#each Object.entries(facets) as [field, facetItems]}
            <div>
              <h3 class="mb-2 font-semibold">{translateFacetFields(field)}</h3>
              {#if facetItems.length === 0}
                <p class="text-sm text-gray-500 italic">Geen opties</p>
              {:else}
                <ul class="max-h-40 space-y-1 overflow-y-auto">
                  {#each facetItems as item}
                    <li>
                      <label class="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          class="checkbox checkbox-sm checkbox-primary"
                          checked={selectedFilters[field]?.includes(item.key) || false}
                          on:change={() => toggleFilter(field, item.key)}
                        />
                        <span>{item.key} ({item.count})</span>
                      </label>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </details>
  </form>

  <!-- Resultaten en actieve filters -->
  {#if results.length === 0}
    <p class="mt-12 text-center text-gray-500">Geen resultaten gevonden.</p>
  {:else}
    <div class="mb-4 flex flex-row items-center justify-between">
      <p class="text-2xl font-bold">
        Gevonden: <span class="text-primary">{results.length}</span>
      </p>
      <button class="btn btn-outline btn-sm" on:click={clearAllFilters}>
        Alle filters wissen
      </button>
    </div>

    <div class="bg-base-300 mb-6 flex flex-wrap gap-2 rounded-lg p-4">
      {#if Object.keys(selectedFilters).length === 0}
        <span class="text-sm text-gray-500">Geen filters actief</span>
      {:else}
        {#each Object.entries(selectedFilters) as [field, values]}
          <span class="badge badge-primary">
            {translateFacetFields(field)}: {values.join(', ')}
          </span>
        {/each}
      {/if}
    </div>

    <div class="overflow-x-auto">
      <table class="table-zebra table">
        <!-- head -->
        <thead>
          <tr>
            <th>Titel</th>
            <th>Aangemaakt op</th>
            <th>Acties</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          {#each results as item}
            <tr>
              <td>
                <a href="/archiefadmin/items/{item.pocketbaseId}/edit" class="link link-primary">
                  {item.title}
                </a>
              </td>
              <td>{new Date(item.addedToPocketbase).toLocaleDateString()}</td>
              <td>
                <a
                  href="/archief/beeldbank/{item.pocketbaseId}"
                  target="_blank"
                  title="Bekijk in beeldbank"
                  class="text-primary hover:underline"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </a>
                <a
                  href="/archiefadmin/items/{item.pocketbaseId}/edit"
                  title="Bewerken"
                  class="text-primary mx-2 hover:underline"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </a>

                <Modal
                  label="delete-{item.pocketbaseId}"
                  checked={activeDeleteModal === item.pocketbaseId}
                >
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <span
                    slot="trigger"
                    class="text-primary cursor-pointer hover:underline"
                    title="Verwijderen"
                    on:click={() => (activeDeleteModal = item.pocketbaseId)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  <h3 slot="heading">Verwijder item</h3>

                  <p>Weet je zeker dat je dit item wilt verwijderen?</p>
                  <b>Deze actie kan niet ongedaan gemaakt worden!</b>

                  <form
                    action="?/deleteItem"
                    method="POST"
                    class="mt-4 space-y-2"
                    use:enhance={({ formElement }) =>
                      submitDelete({ formElement, id: item.pocketbaseId })}
                  >
                    <input type="hidden" id="id" name="id" value={item.pocketbaseId} />
                    <button
                      type="submit"
                      class="btn btn-primary w-full text-white"
                      disabled={loading}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Verwijderen
                    </button>
                  </form>
                </Modal>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
