{#each meId as mid}
    <div class="w-5/6 lg:w-2/3 flex justify-center items-start m-auto my-16">
        <div class="avatar">
            <div class="w-24 mask mask-squircle mr-5">
                <img src={picSrc[randomAvatarIndex()]} alt=""/>
            </div>
        </div>
        <div class="rounded-3xl w-full bg-zinc-300">
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

<form class="text-white  w-5/6 lg:w-2/3 grid place-items-center m-auto my-16" 
    on:submit|preventDefault={() => submit = true}>  
    <input class="placeholder:text-zinc-400 placeholder:italic placeholder:text-center bg-zinc-600 rounded-2xl w-full mb-3 required" type="text" bind:value={inName} placeholder="昵称">
    <textarea class="placeholder:text-zinc-400 placeholder:italic placeholder:text-center bg-zinc-600 rounded-2xl w-full mb-3 h-32 required" bind:value={inContent} placeholder="留言"></textarea>
    <button class="rounded-full w-1/3 bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4" type="submit" value="Submit" on:click={() => submit = false}>
        提交
    </button>  
</form>

<script>
    let inName
    let inContent
    let submit

    let meId = [0,1,2]
    let picSrc = [
        "/stockImg/abzu-md.jpg",
        "/stockImg/acodyssey-md.jpg",
        "/stockImg/Arceus-md.jpeg",
        "/stockImg/bloodborne-md.jpg",
        "/stockImg/control-md.jpg",
    ]
    let meName = [
        "name1",
        "name2",
        "name3"
    ]
    let meTime = [
        "24, Mar, 2022",
        "25, Apr, 2022",
        "28, Apr, 2022"
    ]
    let meComment = [
        "朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。朱浚涵是果蝇。",
        "wxl是果蝇。wxl是果蝇。wxl是果蝇。wxl是果蝇。wxl是果蝇。",
        "你才是果蝇。"
    ]

    function randomAvatarIndex(){
        return Math.floor(Math.random() * picSrc.length)
    }

</script>



<svelte:head>
    <title>留言 | Gamattract</title>
</svelte:head>