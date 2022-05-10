<div class="w-11/12 place-items-center grid m-auto">
    <div class="my-8 w-full">
        <div class="h-5 w-full border-b-2 text-3xl text-center border-white">
            <span class="bg-zinc-800 px-5" >
                TODAY'S MENU
            </span>
        </div>
    </div>

    <p class="text-2xl italic my-8 mt-12">~ 干货 ~</p>

    {#await getGameInfo()}
    <DefaultLoading />
    {:then data}
        {#each data as item}
            <a href="/stockPage/{item.name_img}"
            class="w-64 overflow-hidden transform duration-500 rounded-2xl border-[6px] border-white/0 hover:border-white hover:animate-pulse">
              <img src={item.imgUrl} alt={item.game}/>
            </a>
        {/each}
    {:catch error}
        <p>something wrong:</p>
        <pre>{error}</pre>
    {/await}


    <p class="text-2xl italic my-8 mt-20">~ 文章 ~</p>

    {#await getBlogInfo()}
    <DefaultLoading />
    {:then data}
        {#each data as item}
            <div class="w-3/4 md:w-1/2 m-auto flex justify-center">
                <a href={item.blogUrl} class="group" >
                    <p href={item.blogUrl} class="text-4xl underline underline-offset-[12px] leading-relaxed hover:no-underline">
                        <strong>{item.title}</strong></p>
                    <p class="mt-5">{item.detail}</p>
                    <p class="mt-5"><i class="fa fa-clock-o" aria-hidden="true"></i>  <em>{item.updateTime}</em></p>
                </a>
            </div>
        {/each}
    {:catch error}
        <p>something wrong:</p>
        <pre>{error}</pre>
    {/await}

    <div class="my-8 mt-20 w-full">
        <div class="h-4 w-full border-b-2 text-center text-lg border-white">
            <span class="bg-zinc-800 px-3" >
                Bon appétit
                <i class="fa-solid fa-champagne-glasses fa-lg"></i>
            </span>
            
        </div>
    </div>

</div>


<script>
import DefaultLoading from "./DIY/defaultLoading.svelte";
import { supabase } from "../supabaseClient"

let targetGame = '塞尔达：御天之剑'
let targetBlog = '开放世界的层次'

async function getGameInfo () {
    const { data , error } = await supabase
    .from ('stock')
    .select ()
    .eq('game', targetGame)
    if (error) throw new Error(error.message)
    return data 
}

async function getBlogInfo () {
    const { data , error } = await supabase
    .from ('blog')
    .select ()
    .eq('title', targetBlog)
    if (error) throw new Error(error.message)
    return data 
}
</script>

<svelte:head>
  <title>Gamattract</title>
</svelte:head>