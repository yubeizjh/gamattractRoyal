<script>
  import "../app.css";
  import {page} from "$app/stores";

  let pageTitle = null;

  const nav = [
    {title: "文章", path: "/"},
    {title: "干货", path: "/gallery"},
    {title: "手气不错", path: "/lucky"},
    {title: "留言", path: "/message"},
    {title: "测试页", path: "/stockPage/mainpage"}
  ]

</script>

<nav class="p-4 bg-zinc-800">
  <div class="flex items-center">
    <!-- P1 -->
    <a class="flex flex-none items-center" href="/">
      <img class="mr-5" src="/logo-web.png" alt="">
      <p class="text-sm hidden md:block text-stone-300 leading-[1.45rem]">
        <strong>GAM<br>A<br>TTRACT</strong>
      </p>
    </a>

    <!-- P2 -->
    <ul class="hidden sm:flex flex-1 text-xl justify-end">
      {#each nav as item}
        <li class=" mr-2 ">
          {#if $page.url.pathname === item.path}
            <a href={item.path} class="transition text-center block py-2 px-4 text-white underline underline-offset-8 decoration-4">
            {item.title}</a>
          {:else}
            <a href={item.path} class="transition text-center block py-2 px-4 text-white hover:underline hover:underline-offset-8 hover:decoration-2">
            {item.title}</a>
          {/if}
        </li>
      {/each}
    </ul>

    <!-- P3 -->
    <div class="flex flex-1 sm:hidden justify-end">
      <div class="dropdown dropdown-end justify-items-end">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-circle btn-outline">
          <i class="fa-solid fa-bars fa-xl"></i>
        </label>
        <!-- items -->
        <ul tabindex="0" class="dropdown-content menu p-2 mt-5 -mr-4 shadow bg-zinc-700 w-screen">

          {#each nav as item}
          <li>
              <a href={item.path}>{item.title}</a>
          </li>
          {/each}

        </ul>
      </div>

    </div>

  </div>
</nav>

<slot />

<footer class="mt-10 p-6 bg-zinc-800">
  <div class="grid grid-cols-4 justify-items-center">
    <div></div>
    <div class="col-span-2 grid justify-items-center items-center">
      <i class="fa-solid fa-gamepad fa-xl" style="color: #d6d3d1"></i>
      <p class="text-stone-300 mt-3 text-xl"><em>To gamers</em></p>
    </div>
    <div class="opacity-0 place-self-end">
      <a href="/adminSet/inputInsight"> 123 </a>
    </div>
  </div>
</footer>
