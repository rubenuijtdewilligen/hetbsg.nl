<script>
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import toast from 'svelte-french-toast';
  import { getFileUrl } from '$lib/util';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

  export let data;

  let loading;
  $: loading = false;

  const submitUpdate = ({ formElement }) => {
    loading = true;

    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          loading = false;
          toast.success('Bestand succesvol aangepast.', { duration: 5000 });
          break;
        case 'error':
          toast.error('Fout bij het aanpassen van het bestand.', { duration: 5000 });
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
</script>

<p class="mb-4">
  Op de website staan een aantal bestanden met data die wel eens veranderd. Deze kan je hier
  aanpassen.
</p>

{#each data.files as file}
  <form
    action="?/updateFile"
    method="POST"
    enctype="multipart/form-data"
    use:enhance={submitUpdate}
  >
    <input type="hidden" name="id" value={file.id} />
    <div class="form-control mb-2 w-full max-w-lg">
      <label for="value" class="label pb-1 font-medium">
        <span class="label-text">{file.name}</span>
      </label>

      <p>
        &nbsp;Huidige versie:
        <a
          href={getFileUrl(file.collectionId, file.id, file.file)}
          class="font-bold"
          target="_blank"
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          {file.file}
        </a>
      </p>

      <div class="flex flex-row items-center">
        <input
          class="file-input file-input-bordered file-input-primary ml-1 mt-1 w-full max-w-lg"
          type="file"
          required
          disabled={loading}
          id="file"
          name="file"
        />
        <button type="submit" class="btn btn-primary ml-2" disabled={loading}> Opslaan </button>
      </div>
    </div>
  </form>
{/each}
