<script>
  export let value = '';
  export let placeholder = '';
  export let id;
  export let label;
  export let type = 'text';
  export let disabled = false;
  export let required = false;

  export let errors;
</script>

<div class="form-control mb-2 w-full max-w-lg">
  <label for={id} class="label pb-1 font-medium">
    <span class="label-text">{label}</span>
  </label>
  <input
    class="input input-bordered w-full max-w-lg"
    {type}
    {placeholder}
    {required}
    {disabled}
    {id}
    name={id}
    {value}
  />
  {#if errors}
    {#each errors as error}
      <label for={id} class="label py-0 pt-1">
        <span class="label-text-alt text-error">{error}</span>
      </label>
    {/each}
  {/if}
</div>
