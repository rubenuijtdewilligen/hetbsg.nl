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
      <div class="dropdown">
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label tabindex="0" class="btn btn-ghost mr-4 lg:hidden">
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
        </label>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li><a href="/">Home</a></li>
          <li>
            <div class="dropdown dropdown-right">
              <!-- svelte-ignore a11y_label_has_associated_control -->
              <label tabindex="0">Vereniging</label>
              <ul
                tabindex="0"
                class="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow"
              >
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

      <a href="/"><img src="/logo_transparent.svg" alt="Logo Het BSG" class="max-w-14" /></a>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/">Home</a></li>
        <li>
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <!-- svelte-ignore a11y_label_has_associated_control -->
          <div class="dropdown dropdown-bottom">
            <label tabindex="0">Vereniging</label>
            <ul tabindex="0" class="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow">
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

  <footer class="flex items-center justify-between bg-gray-800 p-4 text-white md:px-48">
    <aside class="flex items-center space-x-2">
      <img src="/logo_transparent_white.svg" alt="Logo Het BSG" class="max-w-10" />
      <p>Copyright © {new Date().getFullYear()} - Alle rechten voorbehouden</p>
    </aside>

    <nav class="flex gap-4">
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
