<script>
  import '../app.css';
</script>

<div class="navbar bg-base-100 md:px-48">
  <div class="navbar-start">
    <details class="dropdown">
      <summary tabindex="0" role="button" class="btn btn-ghost mr-4 lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </summary>
      <ul class="menu dropdown-content menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow">
        <li><a href="/">Home</a></li>

        <li>
          <details>
            <summary>Vereniging</summary>
            <ul class="p-2">
              <li><a href="/vereniging/geschiedenis">Geschiedenis</a></li>
              <li><a href="/vereniging/bestuur">Bestuur</a></li>
              <li><a href="/vereniging/commissies">Commissies</a></li>
              <li><a href="/vereniging/activiteiten">Activiteiten</a></li>
              <li><a href="/vereniging/hertogjan">Hertog Jan</a></li>
            </ul>
          </details>
        </li>

        <li><a href="https://bsg100jaar.nl">BSG 100 Jaar</a></li>
        <li><a href="/fotos">Foto's</a></li>
        <li><a href="/rikstand">Rikstand</a></li>
        <li><a href="/verkoop">Verkoop</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </details>
    <a href="/"><img src="/logo_transparent.svg" alt="Logo Het BSG" class="max-w-14" /></a>
  </div>

  <div class="navbar-center hidden flex-nowrap lg:flex">
    <ul class="menu menu-horizontal whitespace-nowrap px-1">
      <li><a href="/">Home</a></li>

      <li>
        <div class="dropdown dropdown-bottom dropdown-hover">
          <summary><a href="/vereniging">Vereniging</a></summary>
          <ul class="menu dropdown-content rounded-box bg-base-100 z-[1] w-52 p-2 shadow">
            <li><a href="/vereniging/geschiedenis">Geschiedenis</a></li>
            <li><a href="/vereniging/bestuur">Bestuur</a></li>
            <li><a href="/vereniging/commissies">Commissies</a></li>
            <li><a href="/vereniging/activiteiten">Activiteiten</a></li>
            <li><a href="/vereniging/hertogjan">Hertog Jan</a></li>
          </ul>
        </div>
      </li>

      <li><a href="https://bsg100jaar.nl">BSG 100 Jaar</a></li>
      <li><a href="/fotos">Foto's</a></li>
      <li><a href="/rikstand">Rikstand</a></li>
      <li><a href="/verkoop">Verkoop</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </div>
</div>

<slot></slot>
