<!-- 可选择随机还是按顺序 -->
<!-- 游戏发售时间 -->
<!-- 游戏列表，处理行列数量 -->

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



{#if refreshTrigger}  
{#await getAllGallery()}
    <DefaultLoading />
{:then data}

{#if data.length == 0}
    <p class="text-center text-3xl mt-12">暂无数据</p>
{:else}
    <p class="hidden">good Job {catchData(data)}</p>

    <!-- body -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:w-3/4 gap-3 m-auto p-3">

    {#each paginatedItems as item}
        <div class="group overflow-hidden transform duration-500 rounded-2xl border-[6px] border-white/0 hover:border-white hover:animate-pulse">
            {#if pageMain == '施工中'}
            <img disabled class="saturate-0 hover:cursor-not-allowed" src={item.imgUrl} alt={item.game}/>
            <!-- text -->
            {:else}
            <img src={item.imgUrl} alt={item.game}/>
            <!-- text -->
            <a href="/stockPage/{item.name_img}" class="hidden group-hover:grid rounded-xl absolute inset-0 place-content-center">            
            </a>
            {/if}
        </div>
    {/each}
    </div>

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
{/if}

<!-- error -->
{:catch error}
    <p>something wrong:</p>
    <pre>{error}</pre>
{/await}
{/if}


<script>
import DefaultLoading from "./DIY/defaultLoading.svelte";
import { supabase } from "../supabaseClient"
import { paginate, DarkPaginationNav, PaginationNav } from 'svelte-paginate'

let currentItems = 6
let items = []
let currentPage = 1
let pageSize = 6

$: paginatedItems = paginate({ items, pageSize, currentPage })

let pageButton = ['物件','情景','关卡','分析','施工中']
let pageMain = pageButton[0]

async function getAllGallery () {
    const { data , error } = await supabase
    .from ('stock')
    .select ()
    .eq(pageMain, true)
    if (error) throw new Error(error.message)
    return data 
}

function catchData (tmp){
    items = tmp;
    return 0;
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


<style>
.my-nav :global(.pagination-nav) {
  display: flex;
  justify-content: center;
  background: #27272a;
  border-radius: 3px;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
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

<svelte:head>
    <title>干货 | Gamattract</title>
</svelte:head>