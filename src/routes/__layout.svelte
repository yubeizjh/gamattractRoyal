<script>
  import "../app.css";
  import {page} from "$app/stores";

  const nav = [
    {title: "主页", path: "/"},
    {title: "收藏", path: "/gallery"},
    {title: "留言", path: "/message"},
  ]
</script>

<nav class="p-4 bg-black">
  <ul class="flex">
    {#each nav as item}
      <li class="flex-1 mr-2">
        {#if $page.url.pathname === item.path}
          <a href={item.path} class="transition text-center block rounded py-2 px-4 bg-gray-300 hover:bg-gray-700 text-black hover:text-white">
          {item.title}</a>
        {:else}
          <a href={item.path} class="transition text-center block rounded py-2 px-4 hover:bg-gray-700 text-white">
          {item.title}</a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<slot />

<footer class="p-6 bg-black">
  <p class="text-center text-white"><em>Just for gamers</em></p>
</footer>
