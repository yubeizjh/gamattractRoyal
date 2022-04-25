<!-- 
老子有空一定要来升级
<div class="text-black m-auto w-1/2 my-10">
    <input class="block w-full mb-10" type="text" bind:value={gameUrl} placeholder="行1">
    <input class="block w-full mb-3" type="text" bind:value={rawString[0]} placeholder="行1">
    <input class="block w-full mb-3" type="text" bind:value={rawString[1]} placeholder="行2">
    <input class="block w-full mb-3" type="text" bind:value={rawString[2]} placeholder="行3">
    <input class="block w-full mb-3" type="text" bind:value={rawString[3]} placeholder="行4">
    <input class="block w-full mb-3" type="text" bind:value={rawString[4]} placeholder="行5">
    <button class="block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={getResult}>
    转化</button>
    <button class="mt-5 block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={initRaw}>
    初始化</button>
</div>
-->

<div class="text-black m-auto w-1/2 my-10">
    <form class="text-black" on:submit|preventDefault={() => submit = true}>  
        <input class="block w-full mb-3 required" type="text" bind:value={securityCode} placeholder="CODE">
        <input class="block w-full mb-10" type="text" bind:value={gameName} placeholder="游戏名">
        <input class="block w-full mb-10" type="text" bind:value={gameUrl} placeholder="路径">
        <input class="block w-full mb-3" type="text" bind:value={rawString[0]} placeholder="行1">
        <input class="block w-full mb-3" type="text" bind:value={rawString[1]} placeholder="行2">
        <input class="block w-full mb-3" type="text" bind:value={rawString[2]} placeholder="行3">
        <input class="block w-full mb-3" type="text" bind:value={rawString[3]} placeholder="行4">
        <input class="block w-full mb-3" type="text" bind:value={rawString[4]} placeholder="行5">
        <button class="block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Submit" on:click={submitF}>
        提交
        </button>  
        <button class="mt-10 block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={initRaw}>
            初始化</button>
    </form>
</div>


<div class="my-3 text-center">
    {#if submit}
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
  </div>

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



<script>
import { supabase } from "../../supabaseClient"

let submit = false
let securityCode = null

let test = 0;
let gameName = "ZeldaS"
let gameUrl = "/stockPageImg/skywardSword/";
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

let rawString = [];

function getResult(){
    for (let i=0; i<rawString.length; i++){
        resultMain[i] = getSubString(rawString[i],"main");
        resultType[i] = getSubString(rawString[i],"type");
        resultName[i] = getSubString(rawString[i],"name");
        resultPid[i] = parseInt(getSubString(rawString[i],"pid"));
        myId[i] = i;
        test = test+1
    }
}

function getSubString (str, type) {
    let startStr;
    let endStr;
    if (type === "main"){
        startStr = 0;
        endStr = str.indexOf("+");
        let tmpStr = str.substring(startStr,endStr);
        if (tmpStr === "1") return "关卡"
        else if (tmpStr === "2") return "物件"
        else if (tmpStr === "3") return "梗图"
        else return "情景"
    }
    if (type === "type"){
        startStr = str.indexOf("+") + 1
        endStr = str.lastIndexOf("+")
    }
    else if (type === "name"){
        startStr = str.lastIndexOf("+") + 1
        let endStr_A = str.indexOf(".")
        let endStr_B = str.indexOf(" ")
        if (endStr_B > 1) endStr = endStr_B
        else endStr = endStr_A
    }
    else {
        startStr = str.indexOf("(") + 1
        endStr = str.indexOf(")")
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
    getResult();
    submit = false;
}

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

</script>