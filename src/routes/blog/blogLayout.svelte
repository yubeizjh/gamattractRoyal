<script>
    export let title;

    import { onMount } from 'svelte';

    onMount(() => {
        let len = document.getElementsByTagName("details").length;
        for (let i=0;i<len;i++)
        document.getElementsByTagName("details")[i].removeAttribute("open");
    });
</script>

<svelte:head>
    <title>{title} | Gamattract </title>
</svelte:head>

<div class="w-10/12 md:w-3/4 m-auto grid grid-cols-1">
    
    <article class="prose my-20 place-self-center w-full">
       <slot />
    </article>

    <div class="mb-10 place-self-center">
        <a href="/blog"> 
            <button class="transition mt-2 p-2 bg-zinc-700 border-4 border-black/0 hover:border-white hover:text-white">
                back to list
            </button>
        </a>
    </div>
</div>