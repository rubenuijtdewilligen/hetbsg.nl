<script>
  import { getFileUrl } from '$lib/util.js';
  export let data;
</script>

<div class="my-8 space-y-12 px-4 md:px-96">
  {#each data.activities as activity, i}
    <div
      class="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16"
      class:lg:flex-row-reverse={i % 2 !== 0}
    >
      <!-- Text Content -->
      <div class="lg:w-1/2">
        <h2 class="mb-2 text-xl font-bold">{activity.name}</h2>
        <p class="text-gray-700">{activity.description}</p>
      </div>

      <!-- Image Content -->
      <div class="lg:w-1/2">
        <img
          src={getFileUrl(activity.collectionId, activity.id, activity.image)}
          alt={activity.name}
          class="w-max rounded-sm shadow-sm"
        />
      </div>
    </div>
  {/each}
</div>
