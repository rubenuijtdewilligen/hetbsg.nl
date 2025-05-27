<script>
  import { getFileUrl } from '$lib/util.js';
  import { faCircle } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  export let data;
</script>

<div class="px-4 py-4 md:px-48">
  <p class="text-2xl">
    BSG heeft momenteel <b>{data.commissie_aantal.value}</b> commissies en
    <b>{data.ledenaantal.value}</b> leden, en heeft daarmee op dit moment meer commissies dan leden!
  </p>
  <p class="mt-2 text-lg">
    Op deze pagina staan een aantal voorbeelden van commissies. De volledige lijst inclusief
    commissieleden is te vinden in het pdf bestand dat je hier kunt downloaden.
  </p>

  <a
    href={getFileUrl(
      data.comissiesfile.collectionId,
      data.comissiesfile.id,
      data.comissiesfile.file
    )}
    class="btn btn-primary btn-lg my-4"
    target="_blank"
  >
    Laatste Versie van Commissielijsten
  </a>
  <h2 class="text-2xl font-bold">Voorbeelden van commissies</h2>
  {#each data.exampleCommittees as exampleCommittee}
    <div class="mb-4">
      <div class="flex flex-row">
        <h2 class="mr-4 text-2xl font-bold text-primary">
          <FontAwesomeIcon icon={faCircle} />
        </h2>
        <div>
          <h2 class="text-2xl font-bold text-primary">
            {exampleCommittee.name}
          </h2>
          <p><b>Doel:</b> {exampleCommittee.goal}</p>
          <p><b>Motto:</b> {exampleCommittee.motto}</p>
        </div>
      </div>
    </div>
  {/each}
</div>
