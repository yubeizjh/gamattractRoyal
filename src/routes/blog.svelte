<div class="flex justify-center btn-group my-5">
    {#each pageButton as item}
        {#if item == pageMain}
            <button class="btn px-8 bg-zinc-200 text-black hover:bg-zinc-200 hover:text-black">{item}</button>
        {:else}
            <button class="btn px-8 text-zinc-200 bg-zinc-900 hover:bg-black" 
            on:click={() => changePageMain(item)}>{item}</button>
        {/if}
    {/each}
  </div>

<div class="w-5/6 m-auto md:w-2/3 lg:w-1/2">
{#if refreshTrigger}
  {#await getBlogs()}
      <DefaultLoading />
  {:then data}
      <!-- single page -->
      {#each data as item}
          <div class="my-28 first:mt-12 last:mb-20">
              <a href={item.blogUrl} class="group" >
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
{/if}
</div>

<script>
import DefaultLoading from "./DIY/defaultLoading.svelte";
import { supabase } from "../supabaseClient"

let pageButton = ['综合','单品']
let pageMain = pageButton[0]

async function getBlogs () {
  const { data , error } = await supabase
      .from ('blog')
      .select ()
      .eq ('ready',true)
      .eq ('forGame',getCurrentChoice())
      .order('id', { ascending: false })
  if (error) throw new Error(error.message)
  return data 
}

function getCurrentChoice(){
    if (pageMain == '单品') return 1
    return 0
}

function changePageMain(main) {
    pageMain = main;
    infoRefresh();
}

//刷新页面
function infoRefresh_aid(){
refreshTrigger = true
}

function infoRefresh() {
refreshTrigger = false;
setTimeout(infoRefresh_aid, 10);
}

//获取数据
let refreshTrigger = true


</script>

<svelte:head>
  <title>文章 | Gamattract</title>
</svelte:head>