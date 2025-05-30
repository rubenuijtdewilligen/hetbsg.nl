<script>
  import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

  export let data;

  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { onMount } from 'svelte';

  let sortedChapels = [];
  let sortKey;
  let sortDirection;

  $: sortKey = 'year';
  $: sortDirection = 'desc';

  onMount(() => {
    sortChapelData('year');
  });

  function sortChapelData(key) {
    if (sortKey === key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDirection = 'asc';
    }

    sortedChapels = [...data.chapels].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      if (typeof aVal === 'boolean') {
        aVal = aVal ? 'Ja' : 'Nee';
        bVal = bVal ? 'Ja' : 'Nee';
      }

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
</script>

<div class="my-8 flex flex-col items-center px-4 md:px-64">
  <div class="flex flex-col md:flex-row">
    <div class="mb-4 flex md:mb-0 md:w-1/2 md:items-stretch">
      <img src="/kapeldendungen.png" alt="Kapel Den Dungen" class="object-cover" />
    </div>
    <div class="md:w-1/2">
      <i class="text-lg">
        Al hebben wij in 't bouwvak nie veul te vertellen,<br />
        Toch bouwen we heel Brabant vol schone kapellen,<br />
        En al is 't wat krom, mee wat deuken d'r in,<br />
        Daar zit 'm nou 't artistieke net in.
      </i>
      <p class="mt-4">
        Tussen 1933 en 1959 werden er door Het Brabants Studenten Gilde in totaal 23 kapellen
        gebouwd. Dit werd gedaan in het dorp waar dat jaar de Landdagen werden gehouden. De meeste
        van deze kapellen staan vandaag de dag nog steeds overeind. Klik op een van de groene punten
        op de kaart hieronder om ze zelf te bekijken via Google Street View.
      </p>
    </div>
  </div>

  <iframe
    src="https://www.google.com/maps/d/u/1/embed?mid=1CFZde0tQzRX3r7rkRuXpaUt-iY7EzSrg&amp;ehbc=2E312F"
    width="640"
    height="480"
    class="mt-8 w-full md:w-3/4 lg:w-2/3"
    title="Kaart met kapellen van het Brabants Studenten Gilde"
    loading="lazy"
  ></iframe>

  <h2 class="my-8 text-center text-xl font-bold">
    Deze tabel geeft een overzicht van alle kapellen die door BSG gebouwd zijn.
  </h2>

  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th class="cursor-pointer" on:click={() => sortChapelData('year')}>
            Jaar {#if sortKey === 'year'}
              <FontAwesomeIcon
                icon={sortDirection === 'asc' ? faSortUp : faSortDown}
                class="ml-1"
              />
            {:else}
              <FontAwesomeIcon icon={faSort} class="ml-1" />
            {/if}
          </th>
          <th class="cursor-pointer" on:click={() => sortChapelData('place')}>
            Plaats {#if sortKey === 'place'}
              <FontAwesomeIcon
                icon={sortDirection === 'asc' ? faSortUp : faSortDown}
                class="ml-1"
              />
            {:else}
              <FontAwesomeIcon icon={faSort} class="ml-1" />
            {/if}
          </th>
          <th class="cursor-pointer" on:click={() => sortChapelData('type')}>
            Soort {#if sortKey === 'type'}
              <FontAwesomeIcon
                icon={sortDirection === 'asc' ? faSortUp : faSortDown}
                class="ml-1"
              />
            {:else}
              <FontAwesomeIcon icon={faSort} class="ml-1" />
            {/if}
          </th>
          <th class="cursor-pointer" on:click={() => sortChapelData('stillThere')}>
            Staat er nog? {#if sortKey === 'stillThere'}
              <FontAwesomeIcon
                icon={sortDirection === 'asc' ? faSortUp : faSortDown}
                class="ml-1"
              />
            {:else}
              <FontAwesomeIcon icon={faSort} class="ml-1" />
            {/if}
          </th>
        </tr>
      </thead>
      <tbody>
        {#each sortedChapels as chapel}
          <tr>
            <td>{chapel.year}</td>
            <td>{chapel.place}</td>
            <td>{chapel.type}</td>
            <td>{chapel.stillThere ? 'Ja' : 'Nee'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
