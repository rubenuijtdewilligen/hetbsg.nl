<script>
  import { onMount } from 'svelte';
  export let label = '';
  export let endpoint = ''; // bv. 'media_places'
  export let multiple = false;
  export let bindValue; // een of meerdere records

  let query = '';
  let options = [];
  let showNewOption = false;

  async function search() {
    if (!query.trim()) {
      options = [];
      showNewOption = false;
      return;
    }

    const res = await fetch(`/api/media/categories/${endpoint}/search?q=${query}`);
    const json = await res.json();
    options = json.items;

    const queryLower = query.trim().toLowerCase();

    const exactMatch = json.items.some((item) => item.name.toLowerCase() === queryLower);
    const alreadySelected = multiple
      ? bindValue?.some((v) => v.name.toLowerCase() === queryLower)
      : bindValue?.name?.toLowerCase() === queryLower;

    showNewOption = !exactMatch && !alreadySelected;
  }

  async function selectOption(item) {
    if (multiple) {
      if (!bindValue.find((v) => v.id === item.id)) {
        bindValue = [...bindValue, item];
      }
    } else {
      bindValue = item;
      query = item.name;
    }
    options = [];
    showNewOption = false;
  }

  async function createNewOption() {
    const res = await fetch(`/api/media/categories/${endpoint}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: query })
    });
    const item = await res.json();
    selectOption(item);
    query = '';
    showNewOption = false;
  }

  function removeItem(id) {
    bindValue = bindValue.filter((item) => item.id !== id);
  }
</script>

<div class="form-control flex flex-col">
  <p class="label font-bold">{label}</p>

  <input
    class="input input-bordered w-full"
    bind:value={query}
    on:input={() => {
      if (!multiple) bindValue = null;
      search();
    }}
    placeholder="Typ om te zoeken of aan te maken"
  />

  {#if multiple && bindValue.length > 0}
    <div class="mt-2 flex flex-wrap gap-2">
      {#each bindValue as item (item.id)}
        <span class="badge badge-primary">
          {item.name}
          <button class="ml-1 text-xs" on:click={() => removeItem(item.id)}>✕</button>
        </span>
      {/each}
    </div>
  {/if}

  {#if !multiple && bindValue}
    <div class="badge badge-primary mt-2">{bindValue.name}</div>
  {/if}

  {#if options.length > 0 || showNewOption}
    <ul class="bg-base-200 mt-2 max-h-48 overflow-y-auto rounded shadow">
      {#each options as item}
        <li>
          <button
            type="button"
            class="hover:bg-base-300 w-full cursor-pointer p-2 text-left"
            on:click={() => selectOption(item)}
          >
            {item.name}
          </button>
        </li>
      {/each}
      {#if showNewOption}
        <li>
          <button
            type="button"
            class="bg-warning w-full cursor-pointer p-2 text-left font-semibold text-black"
            on:click={createNewOption}
          >
            ➕ Voeg toe als nieuw: "{query}"
          </button>
        </li>
      {/if}
    </ul>
  {/if}
</div>
