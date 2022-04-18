<script>
  import "../app.css";
  import {page} from "$app/stores";

  const nav = [
    {title: "Bienvenue", path: "/"},
    {title: "收藏", path: "/gallery"},
    {title: "文章", path: "/blog"},
    {title: "手气不错", path: "/lucky"},
    {title: "留言", path: "/message"}
  ]
</script>

<nav class="p-4 bg-zinc-800">
  <ul class="flex">
    {#each nav as item}
      <li class="flex-1 mr-2">
        {#if $page.url.pathname === item.path}
          <a href={item.path} class="transition text-center block rounded py-2 px-4 bg-zinc-600 hover:bg-zinc-700 text-white">
          {item.title}</a>
        {:else}
          <a href={item.path} class="transition text-center block rounded py-2 px-4 hover:bg-zinc-700 text-white">
          {item.title}</a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<slot />

<footer class="p-6 bg-zinc-800">
  <div class="grid grid-cols-4">
    <div></div>
    <div class="col-span-2">
      <p class="text-center text-white"><em>Just for gamers</em></p>
    </div>
    <div class="opacity-0 place-self-end">
      <a href="/adminSet/inputInsight"> 123 </a>
    </div>
  </div>
</footer>
