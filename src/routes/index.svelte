<!-- 可能增加 -->
<!-- 现有库存的总条数 -->
<!-- 现有库存的总游戏数量 -->

<div class="mx-auto w-3/4">
  <!-- 按钮选择 -->
  <div class="grid grid-cols-4 gap-3 place-items-center">
    <!-- 标签 -->
    <p class="mt-5 text-sm w-full"><em>切换  ▼</em></p>
    <p class="mt-5 text-sm col-span-2 w-full"><em>拖动显示数量  ▼</em></p>
    <p class="mt-5 text-sm w-full"><em>随机  ▼</em></p>
    <!-- 类别切换 -->
    <div class="w-full">
      <label class="w-full group swap transition mt-2 py-3 px-5 rounded-2xl bg-zinc-400 border-4 border-zinc-400 hover:bg-zinc-800 hover:border-white">
        <input class="hidden" type="checkbox" bind:checked={isOrdinary}>
        <div class="swap-on group-hover:text-white text-center group-hover:hidden">关卡CASE</div>
        <div class="swap-on group-hover:text-white text-center hidden group-hover:block">切换类别</div>
        <div class="swap-off group-hover:text-white text-center group-hover:hidden">设计原则</div>
        <div class="swap-off group-hover:text-white text-center hidden group-hover:block">切换类别</div>
      </label>
    </div>
    <!-- 数量控制 -->
    <div class="w-full col-span-2 text-white">
      {#if isOrdinary}
        <input type="range" min="1" max="5" bind:value={numOfOrdinary} class="range range-primary" step="1" on:change={refreshData}>
      {:else}
        <input type="range" min="1" max="5" bind:value={numOfImportant} class="range range-primary" step="1" on:change={refreshData}>
      {/if}
      <div class="w-full flex justify-between text-xs px-2">
        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
      </div>
    </div>
    <!-- 手气不错 -->
    <div class="w-full">
      <button on:click={refreshData} class="w-full group swap transition mt-2 py-3 px-5 rounded-2xl bg-zinc-400 border-4 border-zinc-400 hover:bg-zinc-800 hover:border-white hover:text-white">
        <span class="group-hover:hidden">手气不错</span>
        <span class="hidden group-hover:block">随机刷新</span>
      </button>
    </div>
  </div>

  

  <!-- 卡片 -->
  <div>
  {#if isOrdinary}
    {#await getInsightOrdinary()}
      <DefaultLoading />
    {:then data}
      {#each data as insight}
        <div class="my-5 p-5 bg-zinc-600 rounded-3xl text-center">
          <h1 class="text-2xl font-bold">{insight.sourceGame}</h1>
          <h2 class="text-xl">{insight.sourceLevel}</h2>
          <p class="mt-5 leading-8 whitespace-pre-wrap">{insight.insightContent}</p>
        </div>
      {/each}
    {:catch error}
      <p>something wrong:</p>
      <pre>{error}</pre>
    {/await}
  {:else}
    {#await getInsightImportant()}
      <DefaultLoading />
    {:then data}
      {#each data as insight}
        <div class="my-5 p-5 bg-zinc-200 rounded-3xl text-center">
          <h1 class="text-2xl font-bold text-black">{insight.sourceGame}</h1>
          <p class="mt-5 leading-8 whitespace-pre-wrap text-black">{insight.insightContent}</p>
        </div>
      {/each}
    {:catch error}
      <p>something wrong:</p>
      <pre>{error}</pre>
    {/await}
  {/if}
  </div>
</div>



<script>

import DefaultLoading from "./DIY/defaultLoading.svelte";
import { dataset_dev, each, empty, trusted } from "svelte/internal"
import { supabase } from "../supabaseClient"

let isOrdinary = false;
let numOfOrdinary = 3
let numOfImportant = 3

function setOppositeFlag () {
  isOrdinary = !isOrdinary;
}

function refreshData (){
  setOppositeFlag();
  setTimeout(setOppositeFlag, 10);
}

async function getInsightOrdinary () {
  const { data , error } = await supabase
    .from ('random_insight')
    .select ()
    .is ('important',false)
    .limit (numOfOrdinary)
  if (error) throw new Error(error.message)
  return data 
}

async function getInsightImportant () {
  const { data , error } = await supabase
    .from ('random_insight')
    .select ()
    .is ('important',true)
    .limit (numOfImportant)
  if (error) throw new Error(error.message)
  return data 
}
</script>

