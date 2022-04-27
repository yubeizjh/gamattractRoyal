{#each meId as mid}
    <div class="w-5/6 lg:w-2/3 flex justify-center items-start m-auto my-16">
        {#if mid%2 == 0}
        <div class="avatar">
            <div class="w-24 mask mask-squircle mr-5">
                <img src="/stockImg/abzu-md.jpg" alt=""/>
            </div>
        </div>
        {/if}
        <div class="rounded-3xl w-full bg-blue-50">
            <div class="text-black m-5 mr-3">
                <div class="flex items-end mb-3">
                    <p class="text-xl mr-3">{meName[mid]}</p>
                    <p class="text-zinc-600"><em>{meTime[mid]}</em></p>
                </div>
                <p>{meComment[mid]}</p>
            </div>
        </div>
        {#if mid%2 == 1}
        <div class="avatar">
            <div class="w-24 mask mask-squircle ml-5">
                <img src="/stockImg/abzu-md.jpg" alt=""/>
            </div>
        </div>
        {/if}
    </div>
{/each}

<script>
    let meId = [0,1,2]
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
</script>



<svelte:head>
    <title>留言 | Gamattract</title>
</svelte:head>