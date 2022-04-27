{#if refreshTrigger}  
{#await getMessage()}
    <DefaultLoading />
{:then data}
    <div class="hidden">{getFullData(data)}</div>
    {#each fullData.slice(0,currentItem) as item}
        <div class="w-5/6 lg:w-2/3 flex justify-center items-start m-auto my-16">
            <div class="avatar">
                <div class="w-12 mr-5">
                    <img src={picSrc[item.avatarId]} alt=""/>
                </div>
            </div>
            <div class="rounded-lg w-full bg-zinc-300">
                <div class="text-black m-5 mr-3">
                    <div class="flex items-end mb-3">
                        <p class="text-xl mr-3">{item.userName}</p>
                        <p class="text-zinc-600"><em>{formularDate(item.created_at)}</em></p>
                    </div>
                    <p class="whitespace-pre-line">{item.content}</p>
                </div>
            </div>
        </div>
    {/each}

    {#if currentItem < fullData.length}
    <div class="w-5/6 lg:w-2/3 flex justify-center items-start m-auto my-16" >
        <div class="avatar">
            <div class="w-12 mr-5 opacity-0">
                <img src={picSrc[0]} alt=""/>
            </div>
        </div>

        <button class="flex justify-center m-auto rounded-lg w-full bg-zinc-400 hover:bg-zinc-200 text-zinc-600 py-2 px-2 italic"
        on:click={() => currentItem = currentItem + 5}>
            加载更多
        </button>
    </div>
    {/if}

{:catch error}
<p>something wrong:</p>
<pre>{error}</pre>
{/await}   
{/if}

{#if avatarChoice}
<div class="w-full bg-zinc-900 py-5 -mb-10">
    <div class="w-5/6 lg:w-2/3 gap-5 grid grid-cols-5 md:grid-cols-10 m-auto place-items-center">
        {#each pid as item}
        {#if item <20}
            <div>
                <img class="hover:opacity-50 hover:cursor-pointer" src={picSrc[item]} alt="" 
                on:click={() => decideAvatarChoice(item)}/>
            </div>
        {/if}
        {/each}
    </div>
</div>
{/if}

<div class="w-5/6 lg:w-2/3 flex justify-center items-start m-auto my-16"> 

    <div class="avatar">
        <div class="w-12 mr-5 hover:cursor-pointer hover:opacity-50">
            <img src={picSrc[inAvatarNum]} alt="" on:click={swtichAvatarChoice}/>
        </div>
    </div>

    <form class="text-white w-full grid place-items-center" 
        on:submit|preventDefault={() => submit = true}>  
        <input class="placeholder:text-zinc-400 placeholder:italic placeholder:text-center bg-zinc-600 rounded-lg w-full mb-3 required" type="text" bind:value={inName} placeholder="昵称（可不填）">
        <textarea class="placeholder:text-zinc-400 placeholder:italic placeholder:text-center bg-zinc-600 rounded-lg w-full mb-3 h-32 required" required bind:value={inContent} placeholder="留言"></textarea>
        <button class="rounded-full w-1/3 bg-zinc-500 hover:bg-zinc-700 text-white py-2 px-4" type="submit" value="Submit" on:click={() => submit = false}>
            提交
        </button>  

        <div class="my-3 text-center">
            {#if submit}
                {#await sendData()}
                  <p>发送中...</p>
                {:then data}
                  <p class="text-green-600">留言成功</p>
                {:catch error}
                  <p class="text-orange-600">留言失败:</p>
                  <pre>{error}</pre>
                {/await}
            {/if}
        </div>

    </form>
</div>




<script>
import DefaultLoading from "./DIY/defaultLoading.svelte";
import { supabase } from "../supabaseClient"
import { empty } from "svelte/internal";

//1 userName
let inName = ''
//2 content
let inContent = ''
//3 avatarId
let inAvatarNum = 20


let submit

let avatarChoice = false;

let picSrc = []
let pid = []

let fullData = []
let currentItem = 5

for (let i=0;i<21;i++){
    picSrc[i] = "/avatarImg/"+(i+1).toString()+'.png'
    pid[i] = i
}

function swtichAvatarChoice(){
    avatarChoice = !avatarChoice;
}

function decideAvatarChoice(tmpid){
    inAvatarNum = tmpid
    swtichAvatarChoice()
}

async function getMessage () {
    const { data , error } = await supabase
    .from ('message')
    .select ()
    .order('id', { ascending: false })
    if (error) throw new Error(error.message)
    return data 
}

async function sendData() {
    if(inAvatarNum == 20) 
        inAvatarNum = randomAvatarIndex()
    if(inName == '')
        inName = '匿名'
    const { data, error } = await supabase
      .from('message')
      .insert([
        { 
          'userName': inName,
          'content': inContent,
          'avatarId': inAvatarNum
        }
      ])
    if (error) throw new Error(error.message) 
    infoRefresh()
    initial()
    return data
}

function randomAvatarIndex(){
    return Math.floor(Math.random() * (picSrc.length-1))
}

function initial(){
    inName = ''
    inContent = ''
    inAvatarNum = 20
}

function formularDate(time){
    let tmpdate = new Date(time).toDateString();
    let startStr = tmpdate.indexOf(" ")
    let endStr = tmpdate.length
    return tmpdate.substring(startStr,endStr)
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

function getFullData(data){
    fullData = data
}


</script>



<svelte:head>
    <title>树洞 | Gamattract</title>
</svelte:head>