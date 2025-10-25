<script>
  import { page } from '$app/stores';

  export let data;

  $: path = $page.url.pathname;
  $: title =
    data.pageTitles
      .filter((page) => path.startsWith(page.path))
      .sort((a, b) => b.path.length - a.path.length)
      ?.at(0)?.title || 'BSG';
</script>

<div class="hero" style="background-image: url(/vlag.png);">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-neutral-content text-center">
    <div class="max-w-md">
      <h1 class="my-16 text-5xl font-bold text-white">{title}</h1>
    </div>
  </div>
</div>

<slot></slot>
