<script>
  import { getFileUrl } from '$lib/util.js';

  export let data;
</script>

<h2 class="my-8 px-4 text-center text-xl font-bold">
  Deze artikelen zijn te koop. Vraag ernaar bij de penningmeester!
</h2>

<div class="mb-8 flex items-center justify-center">
  <div class="w-full max-w-4xl px-4">
    <div class="flex flex-wrap justify-center gap-4">
      {#each data.products as product}
        <div class="card card-compact bg-base-100 shadow-xl">
          <figure>
            <img
              src={getFileUrl(product.collectionId, product.id, product.image)}
              alt={product.name}
              class="w-48"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{product.name}</h2>
            <p>€ {product.price}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
