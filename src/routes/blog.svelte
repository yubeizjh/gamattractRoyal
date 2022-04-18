<div class="w-5/6 m-auto">

    {#await getBlogs()}
        <DefaultLoading />
    {:then data}
        <!-- single page -->
        {#each data as item}
            <!-- 
            <a href={item.blogUrl}>
                <div class="my-5 p-5 bg-zinc-600 text-center 
                transform duration-500 rounded-2xl border-[6px] border-white/0 hover:border-white hover:animate-pulse">
                    <h1 class="text-2xl font-bold">{item.title}</h1>
                    <p class="mt-5 leading-8 whitespace-pre-wrap">{item.detail}</p>
                </div>
            </a>
            -->
            <div class="my-28 first:mt-20 last:mb-20">
                <a href={item.blogUrl} class="group">
                    <p href={item.blogUrl} class="text-4xl underline underline-offset-[12px] leading-relaxed group-hover:no-underline">
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

</div>

<script>
import DefaultLoading from "./DIY/defaultLoading.svelte";
import { supabase } from "../supabaseClient"

let title = "开放世界的非概念要素"
let hrefUrl = "/blog/articles/01开放世界的非概念要素"
let hrefTest = "/blog/articles/02guideline.md"

let detail = "落实到设计，而非概念"
let date = "18 Apr, 2022"

async function getBlogs () {
    const { data , error } = await supabase
        .from ('blog')
        .select ()
    if (error) throw new Error(error.message)
    return data 
}

</script>