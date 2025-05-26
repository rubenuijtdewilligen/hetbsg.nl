<script>
  import { page } from '$app/stores';
  import { dev } from '$app/environment';
  import { env } from '$env/dynamic/public';

  export let data;

  const navigation = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      rtb: false
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
    <slot />
  </div>
</div>
