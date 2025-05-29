<script>
  import '../app.css';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { config } from '@fortawesome/fontawesome-svg-core';
  import '@fortawesome/fontawesome-svg-core/styles.css';
  import { Toaster } from 'svelte-french-toast';
  import { page } from '$app/stores';

  config.autoAddCss = false;

  export let data;

  $: path = $page.url.pathname;
  $: title =
    data.pageTitles
      .filter((page) => path.startsWith(page.path))
      .sort((a, b) => b.path.length - a.path.length)
      ?.at(0)?.title + ' • BSG' || 'BSG';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Toaster />

<div class="layout">
  <div class="navbar bg-base-100 md:px-48">
    <div class="navbar-start">
      <details class="dropdown">
        <summary tabindex="0" class="btn btn-ghost mr-4 lg:hidden">
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
        <ul
          class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
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
          <li><a href="/competities">Competities</a></li>
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
            <ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
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
        <li><a href="/competities">Competities</a></li>
        <li><a href="/verkoop">Verkoop</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
  </div>

  <div class="content">
    <slot></slot>
  </div>

  <footer class="footer items-center bg-gray-800 p-4 text-white md:px-48">
    <aside class="grid-flow-col items-center">
      <img src="/logo_transparent_white.svg" alt="Logo Het BSG" class="max-w-10" />
      <p>Copyright © {new Date().getFullYear()} - Alle rechten voorbehouden</p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a
        href="https://www.instagram.com/hetbsg/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-2xl text-white transition-colors hover:text-gray-400"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a
        href="https://www.linkedin.com/company/het-b-s-g/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-2xl text-white transition-colors hover:text-gray-400"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a
        href="https://www.facebook.com/BrabantsStudentenGilde/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-2xl text-white transition-colors hover:text-gray-400"
      >
        <FontAwesomeIcon icon={faFacebook} />
      </a>
    </nav>
  </footer>
</div>

<style>
  html,
  body {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex: 1;
  }

  .footer {
    margin-top: auto;
  }
</style>
