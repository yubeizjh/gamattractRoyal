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

    <!-- 
    {#each items.slice(0,currentItems) as item}
    -->
    {#each paginatedItems as item}
        <div class="group overflow-hidden transform duration-500 rounded-2xl border-[6px] border-white/0 hover:border-white hover:animate-pulse">
            <img src={item.imgUrl} alt={item.game}/>
            <!-- text -->
            <a href="/" class="hidden group-hover:grid rounded-xl absolute inset-0 place-content-center">            
                
            </a>
        </div>
    {/each}
    </div>
    
    <!-- load more 
    {#if currentItems < items.length}
        <div class="flex justify-center mb-3" on:click={ () => currentItems = currentItems + 6 }>
            <button class="btn">Show more</button>  
        </div>
    {/if}
    -->

    <!-- Pagination -->
    <div class="my-nav text-lg">
        <PaginationNav
            totalItems="{items.length}"
            pageSize="{pageSize}"
            currentPage="{currentPage}"
            limit="{1}"
            showStepOptions="{true}"
            on:setPage="{(e) => currentPage = e.detail.page}"
        />
    </div>

<!-- error -->
{:catch error}
    <p>something wrong:</p>
    <pre>{error}</pre>
{/await}


<script>
import DefaultLoading from "./DIY/defaultLoading.svelte";
import { supabase } from "../supabaseClient"
import { paginate, DarkPaginationNav, PaginationNav } from 'svelte-paginate'

let currentItems = 6
let items = []
let currentPage = 1
let pageSize = 6
$: paginatedItems = paginate({ items, pageSize, currentPage })

async function getAllGallery () {
    const { data , error } = await supabase
    .from ('stock')
    .select ()
    if (error) throw new Error(error.message)
    return data 
}

function catchData (tmp){
    items = tmp;
    return 0;
}

</script>


<style>
.my-nav :global(.pagination-nav) {
  display: flex;
  justify-content: center;
  background: hsl(0, 0%, 8%);
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.my-nav :global(.option) {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s all ease-out;
  user-select: none;
  color: hsl(0, 0%, 100%);
}
.my-nav :global(.option svg path) {
  fill: hsl(0, 0%, 100%);
}
.my-nav :global(.option:first-child) {
  border-radius: 3px 0 0 3px;
}
.my-nav :global(.option:last-child) {
  border-radius: 0 3px 3px 0;
}
.my-nav :global(.option.number),
.my-nav :global(.option.ellipsis) {
  padding: 10px 15px;
}
.my-nav :global(.option:hover) {
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}
.my-nav :global(.option.active) {
  text-decoration:  underline;
  text-underline-offset: 5px;
  text-decoration-thickness: 3px;
}
</style>