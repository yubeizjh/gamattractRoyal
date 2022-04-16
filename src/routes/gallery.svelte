<!-- 可选择随机还是按顺序 -->
<!-- 游戏发售时间 -->
<!-- 游戏列表，处理行列数量 -->
{#await getAllGallery()}
    <DefaultLoading />
{:then data}
    <!-- i don't know how to hideen and get data-->
    <p class="hidden">good Job {catchData(data)}</p>

    <!-- body -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:w-3/4 gap-3 m-auto p-3">

    {#each dataFull.slice(0,currentItems) as item}
        <div class="group overflow-hidden transform duration-500 rounded-2xl border-[6px] border-white/0 hover:border-white hover:animate-pulse">
            <img src={item.imgUrl} alt={item.game}/>
            <!-- text -->
            <a href="/" class="hidden group-hover:grid rounded-xl absolute inset-0 place-content-center">            
                
            </a>
        </div>
    {/each}
    </div>
    
    <!-- load more -->
    {#if currentItems < dataFull.length}
        <div class="flex justify-center mb-3" on:click={ () => currentItems = currentItems + 6 }>
            <button class="btn">Show more</button>  
        </div>
    {/if}

<!-- error -->
{:catch error}
    <p>something wrong:</p>
    <pre>{error}</pre>
{/await}


<script>
import DefaultLoading from "./DIY/defaultLoading.svelte";
import { supabase } from "../supabaseClient"

let currentItems = 6
let dataFull = []

async function getAllGallery () {
    const { data , error } = await supabase
    .from ('stock')
    .select ()
    if (error) throw new Error(error.message)
    return data 
}

function catchData (tmp){
    dataFull = tmp;
    return 0;
}

</script>