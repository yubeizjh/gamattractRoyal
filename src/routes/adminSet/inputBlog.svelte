<!-- 需要加密码验证 maybe or权限 -->
<div class="block mb-5 my-5 m-auto w-1/2">
    <h1 class="text-2xl my-2">Last 5 blogs</h1>
    <button class="my-2 block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={infoRefresh}>
      刷新
    </button> 
    {#if refreshTrigger}
      {#await getData()}
        <p>Fetching data...</p>
      {:then data}
        {#each data as item}
          <li class="text-white">
            {item.id} {item.title}
          </li>
        {/each}
      {:catch error}
        <p>Something went wrong while fetching the data:</p>
        <pre>{error}</pre>
      {/await}
    {/if}
</div>

<div class="m-auto w-1/2">

    <!-- 表格 -->
    <form class="text-black" on:submit|preventDefault={() => submit = true}>  
        <input class="block w-full mb-3 required" type="text" bind:value={securityCode} placeholder="CODE">
        <input class="block w-full mb-3 required" type="text" bind:value={inTitle} placeholder="题目">
        <input class="block w-full mb-3 required" type="text" bind:value={inDetail} placeholder="详情">
        <input class="block w-full mb-3 required" type="text" bind:value={inUrl} placeholder="路径（只需要文件名，不需要后缀）">
        <input class="block w-full mb-3 required" type="text" bind:value={inTime} placeholder="发布时间">
        <label class="block w-full mb-3 text-white">
          <input type="checkbox" bind:checked={isReady}>
          is ready?
        </label>
        <label class="block w-full mb-3 text-white">
          <input type="checkbox" bind:checked={isGame}>
          is game?
        </label>
        <button class="block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Submit" on:click={() => submit = false}>
        提交
        </button>  
    </form>

    <!-- 刷新时间 
    <div class="mt-3">
        <button class="block w-full bg-orange-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={getUpdatedTime}>
            批量刷新时间
        </button>  
        <p class="text-center m-3">{testText}</p>
    </div>
    -->

    <!-- 提交 -->
    <div class="my-3 text-center">
        {#if submit}
            {#await sendData()}
            <p>Sending data...</p>
            {:then data}
            <p class="text-green-600">Successfully sent data.</p>
            {:catch error}
            <p class="text-orange-600">Something went wrong while sending the data:</p>
            <pre>{error}</pre>
            {/await}
        {/if}
    </div>

</div>

  
<script>
import { empty, trusted } from "svelte/internal";
import { supabase } from "../../supabaseClient"
//import * as fs from 'fs';

//import path from 'path'; 
//import url from "url";

//const dirname = path.resolve(url.fileURLToPath(import.meta.url), '../')

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

async function getData() {
const { data, error } = await supabase
    .from('blog')
    .select()
    .limit(5)
    .order('id', {ascending:false})
if (error) throw new Error(error.message)
return data
}

let inTitle = null
let inDetail = null
let inUrl = null
let inTime = null
let isReady = true
let isGame = false

let submit = false

let securityCode = null

//提交数据
async function sendData() {
if (securityCode != "zjh") throw new Error("密码错了兄弟")
inUrl = "/blog/articles/" + inUrl
const { data, error } = await supabase
    .from('blog')
    .insert([
    { 
        'title': inTitle,
        'detail': inDetail,
        'blogUrl': inUrl,
        'updateTime': inTime,
        'ready': isReady,
        'forGame': isGame
    }
    ])
if (error) throw new Error(error.message) 
return data
}

/*
const getFileUpdatedDate = (path) => {
    const stats = fs.statSync(path)
    return stats.mtime
}

let testFile = "/blog/articles/01具体设计.md"
let testText 

function getUpdatedTime(){
    testText = path.join(dirname, testFile)
    //testText = getFileUpdatedDate(path.join(dirname, testFile))
}
*/

</script>