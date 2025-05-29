<script>
  import { faEnvelope, faPenNib, faSuitcase } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  export let data;
</script>

<div class="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
  <!-- Voorzitter -->
  <div class="rounded-lg bg-white p-8 text-center shadow-md">
    <FontAwesomeIcon icon={faSuitcase} class="mb-4 text-8xl text-primary" />
    <h2 class="mb-2 text-lg font-semibold">Voorzitter</h2>
    <p class="text-gray-600">{data.voorzitter.value}</p>
    <a class="link text-gray-600" href="mailto:{data.voorzitterEmail.value}"
      >{data.voorzitterEmail.value}</a
    >
  </div>

  <!-- Secretaris -->
  <div class="rounded-lg bg-white p-8 text-center shadow-md">
    <FontAwesomeIcon icon={faPenNib} class="mb-4 text-8xl text-primary" />
    <h2 class="mb-2 text-lg font-semibold">Secretaris</h2>
    <p class="text-gray-600">{data.secretaris.value}</p>
    <a class="link text-gray-600" href="mailto:bsg@wur.nl">bsg@wur.nl</a>
  </div>

  <!-- Postbus -->
  <div class="rounded-lg bg-white p-8 text-center shadow-md">
    <FontAwesomeIcon icon={faEnvelope} class="mb-4 text-8xl text-primary" />
    <h2 class="mb-2 text-lg font-semibold">Postbus</h2>
    <p class="text-gray-600">Brabants Studenten Gilde</p>
    <p class="text-gray-600">Hollandseweg 1</p>
    <p class="text-gray-600">6706 KN Wageningen</p>
    <p class="mt-2 italic text-gray-500">
      Ons vestigingsadres is te vinden<br />op de website van KVK.
    </p>
  </div>
</div>
