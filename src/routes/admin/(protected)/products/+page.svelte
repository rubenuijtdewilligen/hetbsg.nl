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
  let activeDeleteModal;
  let loading;

  $: addModalOpen = false;
  $: activeDeleteModal = null;
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
          toast.success('Product toegevoegd.', { duration: 5000 });
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
    activeDeleteModal = id;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          formElement.reset();
          activeDeleteModal = null;
          toast.success('Product verwijderd.', { duration: 5000 });
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
  Hier kan je de producten op de pagina <a href="/verkoop" class="link link-primary"> Verkoop </a> aanpassen.
</p>

<Modal label="add-product" checked={addModalOpen}>
  <span slot="trigger" class="btn btn-primary my-2">
    <FontAwesomeIcon icon={faPlusCircle} />Product toevoegen
  </span>
  <h3 slot="heading">Product toevoegen</h3>
  <form
    action="?/addProduct"
    method="POST"
    class="space-y-2"
    enctype="multipart/form-data"
    use:enhance={submitAdd}
  >
    <Input id="name" type="text" label="Naam" required disabled={loading} />
    <Input id="price" type="text" label="Prijs (zonder euroteken)" required disabled={loading} />

    <div class="form-control mb-2 w-full max-w-lg">
      <label for="value" class="label pb-1 font-medium">
        <span class="label-text">Afbeelding</span>
      </label>

      <input
        class="file-input file-input-bordered file-input-primary ml-1 mt-1 w-full max-w-lg"
        type="file"
        required
        disabled={loading}
        accept="image/*"
        id="image"
        name="image"
      />
    </div>

    <button type="submit" class="btn btn-primary w-full" disabled={loading}>
      Product toevoegen
    </button>
  </form>
</Modal>

{#if data.products.length > 0}
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Prijs</th>
          <th>Afbeelding</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {#each data.products as product}
          <tr>
            <td>{product.name}</td>
            <td>€ {product.price}</td>
            <td>
              <a
                href={getFileUrl(product.collectionId, product.id, product.image)}
                target="_blank"
                class="link link-primary text-xl"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </a>
            </td>
            <td>
              <form action="?/deleteProduct" method="POST" class="mr-2" use:enhance={submitDelete}>
                <input type="hidden" name="id" value={product.id} />
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
  <p class="my-2">Er zijn nog geen producten toegevoegd.</p>
{/if}
