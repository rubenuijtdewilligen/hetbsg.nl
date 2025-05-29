<script>
  import { faMagnifyingGlass, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import toast from 'svelte-french-toast';
  import { Modal, Input } from '$lib/components';
  import { getFileUrl } from '$lib/util';

  export let data;

  let addModalOpen;
  let loading;

  $: addModalOpen = false;
  $: loading = false;

  const submitAdd = ({ formElement }) => {
    loading = true;
    addModalOpen = true;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          formElement.reset();
          addModalOpen = false;
          toast.success('Winnaar toegevoegd.', { duration: 5000 });
          break;
        case 'error':
          toast.error('Er is iets misgegaan.', { duration: 5000 });
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };

  const submitDelete = ({ formElement, id }) => {
    loading = true;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          formElement.reset();
          toast.success('Winnaar verwijderd.', { duration: 5000 });
          break;
        case 'error':
          toast.error('Er is iets misgegaan.', { duration: 5000 });
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
</script>

<p>
  Hier kan je de winnaars van de rikfinale, de rikverliezersfinale en het stiefelen op de pagina <a
    href="/competities"
    class="link link-primary"
  >
    Competities
  </a>
  aanpassen. De rikstand en de rikregels staan ook op die pagina, maar die kan je aanpassen via
  <a href="/admin/files" class="link link-primary"> Bestanden </a> in dit admin gedeelte.
</p>

<div class="my-2 border-2 border-primary"></div>

<h2 class="text-2xl font-bold">Winnaars rikfinale</h2>
<Modal label="add-winner-rikfinale" checked={addModalOpen}>
  <span slot="trigger" class="btn btn-primary my-2">
    <FontAwesomeIcon icon={faPlusCircle} />Winnaar rikfinale toevoegen
  </span>
  <h3 slot="heading">Winnaar rikfinale toevoegen</h3>
  <form action="?/addWinnerRikfinale" method="POST" class="space-y-2" use:enhance={submitAdd}>
    <Input id="year" type="text" label="Jaar" required disabled={loading} />
    <Input id="name" type="text" label="Naam winnaar" required disabled={loading} />

    <button type="submit" class="btn btn-primary w-full" disabled={loading}>
      Winnaar rikfinale toevoegen
    </button>
  </form>
</Modal>

{#if data.winnersRikfinale.length > 0}
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Jaar</th>
          <th>Naam</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {#each data.winnersRikfinale as winner}
          <tr>
            <td>{winner.year}</td>
            <td>{winner.name}</td>
            <td>
              <form
                action="?/deleteWinnerRikfinale"
                method="POST"
                class="mr-2"
                use:enhance={submitDelete}
              >
                <input type="hidden" name="id" value={winner.id} />
                <button type="submit" disabled={loading}>
                  <FontAwesomeIcon icon={faTrash} class="text-xl text-primary" />
                </button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p class="my-2">Er zijn nog geen winnaars van de rikfinale toegevoegd.</p>
{/if}

<div class="my-2 border-2 border-primary"></div>

<h2 class="text-2xl font-bold">Winnaars rikverliezersfinale</h2>
<Modal label="add-winner-rikverliezersfinale" checked={addModalOpen}>
  <span slot="trigger" class="btn btn-primary my-2">
    <FontAwesomeIcon icon={faPlusCircle} />Winnaar rikverliezersfinale toevoegen
  </span>
  <h3 slot="heading">Winnaar rikfinale toevoegen</h3>
  <form
    action="?/addWinnerRikverliezersfinale"
    method="POST"
    class="space-y-2"
    use:enhance={submitAdd}
  >
    <Input id="year" type="text" label="Jaar" required disabled={loading} />
    <Input id="name" type="text" label="Naam winnaar" required disabled={loading} />

    <button type="submit" class="btn btn-primary w-full" disabled={loading}>
      Winnaar rikverliezersfinale toevoegen
    </button>
  </form>
</Modal>

{#if data.winnersRikverliezersfinale.length > 0}
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Jaar</th>
          <th>Naam</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {#each data.winnersRikverliezersfinale as winner}
          <tr>
            <td>{winner.year}</td>
            <td>{winner.name}</td>
            <td>
              <form
                action="?/deleteWinnerRikverliezersfinale"
                method="POST"
                class="mr-2"
                use:enhance={submitDelete}
              >
                <input type="hidden" name="id" value={winner.id} />
                <button type="submit" disabled={loading}>
                  <FontAwesomeIcon icon={faTrash} class="text-xl text-primary" />
                </button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p class="my-2">Er zijn nog geen winnaars van de rikverliezersfinale toegevoegd.</p>
{/if}

<div class="my-2 border-2 border-primary"></div>

<h2 class="text-2xl font-bold">Winnaars stiefelen</h2>
<Modal label="add-winner-stiefelen" checked={addModalOpen}>
  <span slot="trigger" class="btn btn-primary my-2">
    <FontAwesomeIcon icon={faPlusCircle} />Winnaar stiefelen toevoegen
  </span>
  <h3 slot="heading">Winnaar stiefelen toevoegen</h3>
  <form action="?/addWinnerStiefelen" method="POST" class="space-y-2" use:enhance={submitAdd}>
    <Input id="year" type="text" label="Jaar" required disabled={loading} />
    <Input id="name" type="text" label="Naam winnaar" required disabled={loading} />

    <button type="submit" class="btn btn-primary w-full" disabled={loading}>
      Winnaar stiefelen toevoegen
    </button>
  </form>
</Modal>

{#if data.winnersStiefelen.length > 0}
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Jaar</th>
          <th>Naam</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {#each data.winnersStiefelen as winner}
          <tr>
            <td>{winner.year}</td>
            <td>{winner.name}</td>
            <td>
              <form
                action="?/deleteWinnerStiefelen"
                method="POST"
                class="mr-2"
                use:enhance={submitDelete}
              >
                <input type="hidden" name="id" value={winner.id} />
                <button type="submit" disabled={loading}>
                  <FontAwesomeIcon icon={faTrash} class="text-xl text-primary" />
                </button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p class="my-2">Er zijn nog geen winnaars van het stiefelen toegevoegd.</p>
{/if}
