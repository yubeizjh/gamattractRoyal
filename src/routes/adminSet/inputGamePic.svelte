<!-- 
<input class="block w-full mb-3 text-black" type="text" bind:value={testString} placeholder="试一试">
<textarea class="block w-full mb-3 text-black" type="text" bind:value={testStringPreview} placeholder="试一试"></textarea>

<button class="bg-orange-600 mb-5 place-content-center grid m-auto w-1/4" on:click={testCutString}>测试切换</button>

<div>
{#each testStringGroup as item}
    <div class="my-5">
        <p class="text-green-600"> {item} </p>
        <p>{getSubString(item,"main")}</p>
        <p>{getSubString(item,"type")}</p>
        <p>{getSubString(item,"name")}</p>
        <p>{getSubString(item,"pid")}</p>
    </div>
{/each}
</div>
-->

{#await getGameData()}
    fetching...
{:then data}
    {#each data as item}
         <p class="hidden">{pushItem(item)}</p>
    {/each}

    <div class="text-black m-auto w-1/2 my-10">
        <form class="text-black" on:submit|preventDefault={() => submit = true}>  
            <input class="block w-full mb-10 required" type="text" bind:value={securityCode} placeholder="CODE">

            <input class="placeholder:text-red-600 bg-orange-300 mb-3" id="type" type="text" bind:value={bindGame} list="typelist" placeholder="选择">
            <datalist id="typelist">
                {#each fullGameList as item}
                    <option>{item.game}</option>
                {/each}
            </datalist>
        
            {#if bindGame != bindGamelast}
                <button class="bg-orange-800" on:click={getBindImgGame}>异议！！</button>
            {:else}
                <p class="bg-green-600 -mt-3 mb-3">要清空，就刷新</p>
            {/if}

            <input class="block w-full mb-3 bg-orange-200" type="text" bind:value={gameName} placeholder="代号：选择上面的游戏名">
            <input class="block w-full mb-10 bg-orange-200" type="text" bind:value={gameUrl} placeholder="路径：选择上面的游戏名">

            <button class="bg-orange-600 mb-5 place-content-center grid m-auto w-1/4" on:click={switchIsText}>切换为文字</button>

            <button class="bg-blue-600 mb-5 place-content-center grid m-auto w-1/4" on:click={switchIsUpdateImg}>更新图片</button>

            <!-- 
            let textMain = '结构'
            let textType = '综合'
            let textName = ''
            let textPid = 1
            let textComment = ''
            -->

            {#if isText}
                <p class="text-white mb-3">关卡<br>情景<br>结构<br>物件<br>地形</p>
                <input class="block w-full mb-3" type="text" bind:value={textMain} placeholder="Main：结构">
                <input class="block w-full mb-3" type="text" bind:value={textType} placeholder="Type：综合">
                <input class="block w-full mb-3" type="text" bind:value={textName} placeholder="你想说什么">
                <input class="block w-full mb-3" type="text" bind:value={textPid} placeholder="pid一般都是1">
                <input class="block w-full mb-3" type="text" bind:value={textComment} placeholder="你想附加什么">
            {:else if isUpdateImg}
                <input class="block w-full mb-3" type="text" bind:value={inTempId} placeholder="更新id">
                <p class="text-white">预览：{preIdUrl}</p>
                <button class="mb-5 mt-10 block w-full bg-green-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={getPreIdUrl}>
                    预览</button>
            {:else}
                <!-- 
                <input class="block w-full mb-3" type="text" bind:value={rawString[0]} placeholder="行1">
                <input class="block w-full mb-3" type="text" bind:value={rawString[1]} placeholder="行2">
                <input class="block w-full mb-3" type="text" bind:value={rawString[2]} placeholder="行3">
                <input class="block w-full mb-3" type="text" bind:value={rawString[3]} placeholder="行4">
                <input class="block w-full mb-3" type="text" bind:value={rawString[4]} placeholder="行5">
                -->
                <input class="block w-full mb-3" type="text" bind:value={rawString_Long} placeholder="直接复制">
                <textarea disabled class="bg-zinc-400 text-black h-32 block w-full mb-3" type="text" bind:value={rawString_LongPreview} placeholder="直接复制"></textarea>
                <button class="mb-5 block w-full bg-green-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={rawCutString}>
                    预览
                </button> 
                
                <!-- 
                <button class="mb-5 block w-full bg-orange-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={getResult}>
                    预览操作
                </button> 

                {#each myId as item}
                    <div class="text-white">
                        <p class="hidden">{testShow(item)}</p>
                        {testShowGroup[item]}
                    </div>
                {/each}
                -->

            {/if}

            <button class="block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Submit" on:click={submitF}>
                提交
            </button> 

            <button class="mt-10 block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={initRaw}>
                初始化</button>
        </form>
    </div>

{:catch error}
    <p>something wrong:</p>
    <pre>{error}</pre>
{/await}

<div class="my-3 text-center">
    {#if submit}
        {#if isText}
            {#await sendDataText()}
                <p>Sending data...</p>
            {:then data}
                <p class="text-green-600">Successfully sent data.</p>
                <button on:click={initText} class="p-5 bg-green-500">初始化一下</button>
            {:catch error}
                <p class="text-orange-600">Something went wrong while sending the data:</p>
                <pre>{error}</pre>
            {/await}   
        {:else if isUpdateImg}    
            {#await updatePic(inTempId)}
                <p>Sending data...</p>
            {:then data}
                <p class="text-green-600">Successfully sent data.</p>
                <button on:click={initText} class="p-5 bg-green-500">初始化一下</button>
            {:catch error}
                <p class="text-orange-600">Something went wrong while sending the data:</p>
                <pre>{error}</pre>
            {/await}    
        {:else if submitDoubleCheck}
            {#each myId as item}
                {#await sendData(item)}
                <p>Sending data...</p>
                {:then data}
                <p class="text-green-600">Successfully sent data.</p>
                {:catch error}
                <p class="text-orange-600">Something went wrong while sending the data:</p>
                <pre>{error}</pre>
                {/await}
            {/each}
        {/if}
    {/if}
  </div>

  <!-- 
<div>
    {test}
    {#each resultMain as item}
        <p>{item}</p>
    {/each}

    {#each resultType as item}
        <p>{item}</p>
    {/each}

    {#each resultName as item}
        <p>{item}</p>
    {/each}

    {#each resultPid as item}
        <p>{item}</p>
    {/each}
</div>
-->


<script>
import { each } from "svelte/internal";

/*
let testString = "4+丢石头+隐藏(1.png 4+丢石头+隐藏(2.png 4+丢石头+隐藏(3.png";
let testStringPreview
let testStringGroup = [];

function testCutString(){
    testStringPreview = testString
    testStringPreview = testStringPreview.replace(/ /g,"\n")
    testStringGroup = testString.split(" ")
}
*/

let rawString_Long
let rawString_LongPreview

let timeDelay = 0



function rawCutString(){
    rawString_LongPreview = rawString_Long.replace(/ /g,"\n")
    rawString = rawString_Long.split(" ")
}

import { supabase } from "../../supabaseClient"

let submit = false
let securityCode = null

let test = 0;

let gameName = ""
let gameUrl = "";

let isUpdateImg = false

let inTempId = null;

//Main+Type+Name+(pid)
//Main: 1-关卡；2-物件；3-梗图；4-情景

//对编号头特殊判断
//类型+沙漠+仙人掌.jpeg
//类型+沙漠+仙人掌 (2).jpeg
let resultMain = [];
let resultType = [];
let resultName = [];
let resultPid = [];
let myId = [];

let countI = 0;
let countJ = 0;

let submitDoubleCheck = false;

let preIdUrl = null;

let bindGame = '';
let bindGamelast = '';
let bindImgName = '';

let isText = false;

function getBindImgGame(){

    for (let i=0;i<fullGameList.length;i++){
        if(bindGame == fullGameList[i].game){
            bindImgName = fullGameList[i].name_img
        }
    }

    bindGamelast = bindGame
    gameName = bindImgName
    gameUrl = '/stockPageImg/'+bindImgName+'/'
    if (gameName == "ZeldaS")
        gameUrl = '/stockPageImg/skywardSword/'
}

let rawString = [];

let fullGameList = []
let nowLength = 0

function switchIsText(){
    isUpdateImg = false
    isText = !isText
}

function switchIsUpdateImg(){
    isText = false
    isUpdateImg = !isUpdateImg
}

function pushItem(item){
    fullGameList[nowLength] = item
    nowLength = nowLength + 1
}

function getResult(){
    for (let i=0; i<rawString.length; i++){
        resultMain[i] = getSubString(rawString[i],"main");
        resultType[i] = getSubString(rawString[i],"type");
        resultName[i] = getSubString(rawString[i],"name");
        resultPid[i] = parseInt(getSubString(rawString[i],"pid"));
        myId[i] = i;
        test = test+1
    }
    submitDoubleCheck = true
}

function getSubString (str, type) {
    let startStr;
    let endStr;
    if (type === "main"){
        startStr = 0;
        endStr = str.indexOf("+");
        let tmpStr = str.substring(startStr,endStr);
        //1结构; 2关卡; 3主题; 4物件; 5情景; 6地形
        if (tmpStr === "1") return "结构"
        else if (tmpStr === "2") return "关卡"
        else if (tmpStr === "3") return "主题"
        else if (tmpStr === "4") return "物件"
        else if (tmpStr === "5") return "情景"
        else if (tmpStr === "6") return "地形"
    }
    if (type === "type"){
        startStr = str.indexOf("+") + 1
        endStr = str.lastIndexOf("+")
    }
    else if (type === "name"){
        startStr = str.lastIndexOf("+") + 1
        let endStr_A = str.indexOf(".")
        let endStr_B = str.indexOf("(")
        if (endStr_B > 1) endStr = endStr_B
        else endStr = endStr_A
    }
    else {
        startStr = str.indexOf("(") + 1
        endStr = str.indexOf(")")
        if (endStr == -1) endStr = str.indexOf(".")
        if (startStr <= 1){
            return "1"
        }
    }
    return str.substring(startStr,endStr)
}

//需要的时候init
function initRaw() {
    resultMain = [];
    resultType = [];
    resultName = [];
    resultPid = [];
    rawString = [];
    myId = [];
    test = 0
}

function submitF() {
    if (!isText && !isUpdateImg)
        getResult();
    submit = false;
}

/*
let testShowGroup = []

function testDelayShow(id){
    testShowGroup[id] = id
}

function testShow(id){
    setTimeout(function(){testDelayShow(id);},timeDelay)
    timeDelay += 1000
}
*/

async function sendData(i) {
  if (securityCode != "zjh") throw new Error("密码错了兄弟")

  const { data, error } = await supabase
    .from('stockImg')
    .insert([
      { 
        'gameName': gameName,
        'gameUrl' : gameUrl+rawString[i],
        'main': resultMain[i],
        'type': resultType[i],
        'name': resultName[i],
        'pid': resultPid[i]
      }
    ])
  if (error) throw new Error(error.message) 
  return data
}


let textMain = '结构'
let textType = '综合'
let textName = ''
let textPid = 1
let textComment = ''

async function sendDataText() {
  if (securityCode != "zjh") throw new Error("密码错了兄弟")
  const { data, error } = await supabase
    .from('stockImg')
    .insert([
      { 
        'gameName': gameName,
        'main': textMain,
        'type': textType,
        'name': textName,
        'pid': textPid,
        'comment_1': textComment
      }
    ])
  if (error) throw new Error(error.message) 
  return data
}

function initText() {
    textName = ''
    textComment = ''
}


function initTempId() {
    inTempId = null
}

async function getGameData() {
    const {data,error} = await supabase
        .from ('stock')
        .select()
        .not('name_img','eq', null)
    if (error) throw new Error(error.message) 
    return data
}

async function updatePic (tmp_id) {
    if (securityCode != "zjh") throw new Error("密码错了兄弟")
    const { data , error } = await supabase
    .from ('stockImg')
    .update({finGameUrl: idUrl(tmp_id)})
    .match({id: tmp_id})
    if (error) throw new Error(error.message)
    return data 
}

function idUrl(id){
    let str = gameUrl
    str = str + id + '.jpg'
    return str
}

function getPreIdUrl(){
    preIdUrl = idUrl(inTempId)
}

</script>