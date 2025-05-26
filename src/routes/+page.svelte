<script>
  export let data;
</script>

<img src="/welkom.png" alt="Welkom bij Het BSG" class="w-full" />

<div class="px-4 py-8 md:px-64">
  <p>
    <b>Welkom op de site van het BSG.</b> Het BSG (voluit: het Brabants Studenten Gilde van Onze
    Lieve Vrouw) is een kleine maar actieve groep Brabanders en Brabant liefhebbers die aan de
    universiteit in Wageningen studeert. De vereniging heeft {data.ledenaantal.value} leden, zodat het
    spreekwoord 'ons kent ons' wel op gaat. De Brabantse gezelligheid staat bij ons erg hoog in het vaandel.
    Bij het BSG kan alles, maar hoeft niks. We doen dan ook niet aan ontgroening van onze aspirant leden,
    maar houden het gewoon leuk. Wil je hier meer over weten, stuur dan een mailtje naar
    <a href="mailto:bsg@wur.nl" class="link link-primary">bsg@wur.nl</a>
    of bezoek onze
    <a href="https://instagram.com/hetbsg" class="link link-primary">Instagram-pagina</a>.
  </p>

  <h2 class="text-bold my-3 text-3xl">
    Meld je nu aan voor onze
    <a class="link link-primary" href={data.maillijstLink.value}> maillijst </a>!
  </h2>

  <p>
    Via
    <a class="link link-primary" href={data.maillijstLink.value}> dit formulier </a>
    kun je je gegevens achterlaten om mails van het BSG te ontvangen. Dit zijn mails over activiteiten
    en alles is geheel vrijblijvend. Je zit dus nergens aan vast. We hopen je te zien op onze avonden!
  </p>
</div>
