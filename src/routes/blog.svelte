<div class="w-5/6 m-auto md:w-2/3 lg:w-1/2">

  {#await getBlogs()}
      <DefaultLoading />
  {:then data}
      <!-- single page -->
      {#each data as item}
          <div class="my-28 first:mt-20 last:mb-20">
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

</div>

<script>
import DefaultLoading from "./DIY/defaultLoading.svelte";
import { supabase } from "../supabaseClient"

async function getBlogs () {
  const { data , error } = await supabase
      .from ('blog')
      .select ()
      .eq ('ready',true)
  if (error) throw new Error(error.message)
  return data 
}

</script>

<svelte:head>
  <title>文章 | Gamattract</title>
</svelte:head>