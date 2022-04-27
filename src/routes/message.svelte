{#each meId as mid}
    <div class="w-5/6 lg:w-2/3 flex justify-center items-start m-auto my-16">
        <div class="avatar">
            <div class="w-12 mr-5">
                <img src={picSrc[mePid[mid]]} alt=""/>
            </div>
        </div>
        <div class="rounded-lg w-full bg-zinc-300">
            <div class="text-black m-5 mr-3">
                <div class="flex items-end mb-3">
                    <p class="text-xl mr-3">{meName[mid]}</p>
                    <p class="text-zinc-600"><em>{meTime[mid]}</em></p>
                </div>
                <p>{meComment[mid]}</p>
            </div>
        </div>
    </div>
{/each}

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

        <input class="placeholder:text-zinc-400 placeholder:italic placeholder:text-center bg-zinc-600 rounded-lg w-full mb-3 required" type="text" bind:value={inName} placeholder="昵称">
        <textarea class="placeholder:text-zinc-400 placeholder:italic placeholder:text-center bg-zinc-600 rounded-lg w-full mb-3 h-32 required" bind:value={inContent} placeholder="留言"></textarea>
        <button class="rounded-full w-1/3 bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4" type="submit" value="Submit" on:click={() => submit = false}>
            提交
        </button>  
    </form>
</div>


<script>
//1
let inAvatarNum = 20
//2
let inName
//3
let inContent


let submit

let avatarChoice = false;

let meId = [0,1,2]
let picSrc = []
let pid = []

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

//1
let mePid = [
    1,15,3
]

//2
let meName = [
    "name1",
    "name2",
    "name3"
]

//3
let meComment = [
    "朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。",
    "wxl是果蝇。wxl是果蝇。wxl是果蝇。wxl是果蝇。wxl是果蝇。",
    "你才是果蝇。"
]

//4,不需要录入
let meTime = [
    "24, Mar, 2022",
    "25, Apr, 2022",
    "28, Apr, 2022"
]

function randomAvatarIndex(){
    return Math.floor(Math.random() * picSrc.length)
}

</script>



<svelte:head>
    <title>留言 | Gamattract</title>
</svelte:head>