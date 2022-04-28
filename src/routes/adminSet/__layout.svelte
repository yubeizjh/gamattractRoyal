<script>
    import {page} from "$app/stores";

    const nav = [
        {title: "指南", path: "/adminSet/guide"},
        {title: "灵感", path: "/adminSet/inputInsight"},
        {title: "文章", path: "/adminSet/inputBlog"},
        {title: "游戏", path: "/adminSet/inputGame"},
        {title: "Stock", path: "/adminSet/inputGamePic"}
    ]
</script>

<nav class="p-4 bg-zinc-200">
    <ul class="flex">
        {#each nav as item}
        <li class="flex-1 mr-2">
            {#if $page.url.pathname === item.path}
            <a href={item.path} class="transition text-center block rounded py-2 px-4 bg-zinc-600 hover:bg-zinc-700 text-white">
            {item.title}</a>
            {:else}
            <a href={item.path} class="transition text-center block rounded py-2 px-4 hover:bg-zinc-600 text-black hover:text-white">
            {item.title}</a>
            {/if}
        </li>
        {/each}
    </ul>
</nav>

<slot></slot>