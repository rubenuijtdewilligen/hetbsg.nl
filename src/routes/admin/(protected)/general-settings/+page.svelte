<script>
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import toast from 'svelte-french-toast';

  export let data;

  let loadingSetting;
  $: loadingSetting = '';

  const submitUpdate = ({ formElement }) => {
    const formData = new FormData(formElement);
    const id = formData.get('id');
    loadingSetting = id;

    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          loadingSetting = '';
          toast.success('Instelling succesvol bijgewerkt.', { duration: 5000 });
          break;
        case 'error':
          toast.error('Fout bij het bijwerken van de instelling.', { duration: 5000 });
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
</script>

{#each data.generalSettings as setting}
  <form action="?/updateSetting" method="POST" use:enhance={submitUpdate}>
    <input type="hidden" name="id" value={setting.id} />
    <div class="form-control mb-2 w-full max-w-lg">
      <label for="value" class="label pb-1 font-medium">
        <span class="label-text">{setting.name}</span>
      </label>

      <div class="flex flex-row">
        <input
          class="input input-bordered w-full max-w-lg"
          type="text"
          required
          disabled={loadingSetting === setting.id}
          id="value"
          name="value"
          value={setting.value}
        />
        <button type="submit" class="btn btn-primary ml-2" disabled={loadingSetting === setting.id}>
          Opslaan
        </button>
      </div>
    </div>
  </form>
{/each}
