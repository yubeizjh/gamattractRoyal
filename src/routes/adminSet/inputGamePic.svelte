<div class="text-black m-auto w-1/2 my-10">
    <input class="block w-full mb-3" type="text" bind:value={rawString[0]} placeholder="行1">
    <input class="block w-full mb-3" type="text" bind:value={rawString[1]} placeholder="行2">
    <input class="block w-full mb-3" type="text" bind:value={rawString[2]} placeholder="行3">
    <input class="block w-full mb-3" type="text" bind:value={rawString[3]} placeholder="行4">
    <input class="block w-full mb-3" type="text" bind:value={rawString[4]} placeholder="行5">
    <button class="block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={getResult}>
    转化</button>
</div>


<script>
let maxLength = 5;

//沙漠+仙人掌+1.jpeg
let resultType = [];
let resultName = [];
let resultPid = [];

let rawString = [];

function getResult(){
    for (let i=0; i<rawString.length; i++){
        resultType[i] = getSubString(rawString[i],"start");
        resultName[i] = getSubString(rawString[i],"middle");
        resultPid[i] = parseInt(getSubString(rawString[i],"end"));
    }
}

function getSubString (str, type) {
    let startStr;
    let endStr;
    if (type === "start"){
        startStr = 0;
        endStr = str.indexOf("+")
    }
    else if (type === "middle"){
        startStr = str.indexOf("+") + 1
        endStr = str.lastIndexOf("+")
    }
    else {
        startStr = str.lastIndexOf("+") + 1
        endStr = str.indexOf(".")
    }
    return str.substring(startStr,endStr)
}

//每次执行提交之后init
function initRaw() {
    for (let i=0; i<maxLength ;i++)
        rawString[i] = null;
}

</script>