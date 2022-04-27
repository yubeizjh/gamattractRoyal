

<div class="w-11/12 place-items-center grid m-auto">

    <div class="my-8 w-full">
        <div class="h-5 w-full border-b-2 text-3xl text-center border-white">
            <span class="bg-zinc-800 px-5" >
                TODAY'S MENU
            </span>
        </div>
    </div>

    <p class="text-2xl italic my-8 mt-12">~ 干货 ~</p>
    
    <div class="w-64 group overflow-hidden transform duration-500 rounded-2xl border-[6px] border-white/0 hover:border-white hover:animate-pulse">
        <img src={tiGameImgUrl} alt={tiGameName}/>
        <!-- text -->
        <a href={tiGameDetailUrl} class="hidden group-hover:grid rounded-xl absolute inset-0 place-content-center">            
        </a>
    </div>

    <p class="text-2xl italic my-8 mt-20">~ 文章 ~</p>

    <div class="w-3/4 md:w-1/2 m-auto flex justify-center">
        <a href={tiBlogUrl} class="group" >
            <p href={tiBlogUrl} class="text-4xl underline underline-offset-[12px] leading-relaxed hover:no-underline">
                <strong>{tiBlogTitle}</strong></p>
            <p class="mt-5">{tiBlogDetail}</p>
            <p class="mt-5"><i class="fa fa-clock-o" aria-hidden="true"></i>  <em>{tiBlogUpdateTime}</em></p>
        </a>
    </div>

    <div class="my-8 mt-20 w-full">
        <div class="h-4 w-full border-b-2 text-center text-lg border-white">
            <span class="bg-zinc-800 px-3" >
                Bon appétit
                <i class="fa-solid fa-champagne-glasses fa-lg"></i>
            </span>
            
        </div>
    </div>
</div>

<script>
let tiGameName = "塞尔达：御天之剑"
let tiGameImgUrl = "/stockImg/zeldaS-md.jpeg"
let tiGameNameForStock = "ZeldaS"
let tiGameDetailUrl = "/stockPage/" + tiGameNameForStock

let tiBlogTitle = "开放世界的具体设计"
let tiBlogDetail = "落实到具体设计"
let tiBlogUpdateTime = "18 Apr, 2022"
let tiBlogUrl = "/blog/articles/01具体设计"



</script>

<svelte:head>
  <title>Gamattract</title>
</svelte:head>