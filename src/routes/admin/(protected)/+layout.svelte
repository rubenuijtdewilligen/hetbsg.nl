<script>
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faCogs } from '@fortawesome/free-solid-svg-icons';
  import { page } from '$app/stores';
  import { dev } from '$app/environment';
  import { env } from '$env/dynamic/public';

  export let data;

  const navigation = [
    {
      title: 'Algemene instellingen',
      href: '/admin/general-settings',
      icon: faCogs
    }
  ];
</script>

<div class="m-16 rounded-xl bg-gray-300">
  <div class="navbar px-32 shadow-sm">
    <p class="flex-1">
      Je bent ingelogd als admin:&nbsp;<b>{data.user.email}</b>
    </p>

    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/api/logout" class="link link-primary font-bold">Uitloggen</a></li>
      </ul>
    </div>
  </div>

  <div class="px-32 py-8">
    <div class="flex h-full w-full flex-col items-center space-x-4 md:flex-row md:items-start">
      <ul
        class="menu rounded-box border-primary bg-base-100 text-primary h-fit
    w-56 min-w-max border-2 shadow-sm"
      >
        <h3 class="title mb-4 mt-2 text-center text-3xl font-bold">BSG Admin</h3>
        {#each navigation as navItem}
          <li>
            <a
              href={navItem.href}
              class="title hover:text-primary text-lg hover:bg-[#e7e7e6]
                {$page.url.pathname.startsWith(navItem.href) ? 'bg-primary text-white' : ''}"
            >
              <FontAwesomeIcon icon={navItem.icon} />
              {navItem.title}
            </a>
          </li>
        {/each}
      </ul>
      <div class="w-full">
        <slot />
      </div>
    </div>
  </div>
</div>
