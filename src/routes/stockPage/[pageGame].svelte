<!-- 点击放大 -->
{#if focusSwitch}
<div class="z-20 bg-black/95 fixed top-0 w-screen h-screen flex items-center justify-center" on:click={closeFocus}>
    <button class="btn btn-circle fixed top-10 right-10" on:click={closeFocus}>
        <i class="fa-solid fa-xmark fa-2xl"></i>
    </button>
    <div class="w-11/12 lg:w-3/4 m-auto grid place-content-center">
        {#if focusUrl != 'text'}
            <img src={focusUrl} alt=''>
        {/if}
        {#if focusTitle != '0'}
            <p class="mt-5 text-white text-xl text-center">{focusTitle}</p>
        {/if}
        {#if focusComment != null}
            <p class="mt-5 text-white text-center">{focusComment}</p>
        {/if}
    </div>
</div>
{/if}

<!-- 一级：选择类型：关卡-物件-情景-梗图 -->
<!-- 有限类别，分别构筑四个表，限制关键字提取 -->

{#await getGameInfo()}
    <DefaultLoading />
{:then data}
    {#each data as predata}
        <div class="hidden">{buildButton(predata)}</div>
        <div class="hidden">{getChineseName(predata.name)}</div>
        
        <p class="text-center text-3xl my-5 mb-7"><em>~ {predata.game} ~</em></p>

        <div class="flex justify-center btn-group my-5 mx-4 md:m-auto md:my-5 md:w-3/4 lg:w-1/2">
            {#each pageButton as item}
                {#if item == pageMain}
                    <button class="btn px-8 w-1/5 bg-zinc-200 text-black hover:bg-zinc-200 hover:text-black">{pageButtonAsName[item]}</button>
                {:else}
                    <button class="btn px-8 w-1/5 text-zinc-200 bg-zinc-900 hover:bg-black" 
                    on:click={() => changePageMain(item)}>{pageButtonAsName[item]}</button>
                {/if}
            {/each}
        </div>
        
<!-- 接目录-->

<!-- 二级：再出现小分类-->
<!-- 无限分类，只能有一个表
     数据库先检索分类，然后根据分类检索item，需要在SQL中构建新表 -->

{#if refreshTrigger}     
{#await getStock()}
    <DefaultLoading />
{:then data} 
    <div class="mx-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 -mt-10">
        <div class="hidden">{getFullData(data)}</div>
        <!-- 加载更多
        {#each fullData.slice(0,currentItem) as item}
        -->
        {#each data as item}
        <!-- 按type添加标题 -->
            {#if item.flag == 1}
                <div class="my-20 mb-3 col-span-1 sm:col-span-2 md:col-span-3">
                    {#if hiddenTest[item.flag_identity]}
                        <div class="h-5 border-b-4 text-2xl text-center">
                            <span class="bg-zinc-800 px-5" >
                                {#if pageMain == '梗图'} xs
                                {:else if pageMain == '分析'} 文章
                                {:else} {item.type}
                                {/if}
                            </span>
                        </div>
                    {:else}
                        <div class="h-5 text-2xl text-center">
                            <span class="bg-zinc-800 px-5" >
                                {#if pageMain == '梗图'} xs
                                {:else if pageMain == '分析'} 文章
                                {:else} {item.type}
                                {/if}
                            </span>
                        </div>
                    {/if}
                </div>
                <div class="col-span-1 sm:col-span-2 md:col-span-3 flex m-auto justify-center">
                    <button class="hover:opacity-50 rounded-xl bg-zinc-600 px-10 py-2 text-xl" 
                    on:click={() => hiddenTest[item.flag_identity] = !hiddenTest[item.flag_identity]}>
                    {#if !hiddenTest[item.flag_identity]}
                        <i class="fa-solid fa-angle-down"></i>
                    {:else}
                        <i class="fa-solid fa-angle-up"></i>
                    {/if}
                    </button>
                </div>
            {/if}

            <!-- 从这里开始，需要折叠 -->
            {#if hiddenTest[item.flag_identity]}
            <!-- 从这里开始，需要折叠 -->
            
            <div class="rounded-xl bg-zinc-600 overflow-hidden">
                <!-- 图片标题 -->
                {#if pageMain == '分析'}
                <a href={item.type} target="_blank">
                    <!-- TEXT分支 -->
                    {#if item.finGameUrl == 'text'}
                        <div class="relative">
                            <img class="hover:opacity-80" src="/stockPageImg/textBackground.jpg" alt={item.name}>
                            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <p class="text-white text-xl"> {item.name} </p>
                            </div>
                        </div>
                    {:else}
                        <img class="hover:opacity-50" src={item.finGameUrl} alt={item.name}/>
                    {/if}
                    <!-- end TEXT分支 -->
                </a>
                {:else}
                <!-- 图片 -->
                    {#if item.finGameUrl == 'text'}
                        <div class="relative"
                        on:click={() => openFocus(item.finGameUrl,item.name,item.comment_1)}>
                            <img class="hover:opacity-80" src="/stockPageImg/textBackground.jpg" alt={item.name}>
                            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <p class="text-white text-xl"> {item.name} </p>
                            </div>
                        </div>
                    {:else}
                        <img class="cursor-pointer hover:opacity-50" src={item.finGameUrl} alt={item.name}
                        on:click={() => openFocus(item.finGameUrl,item.name,item.comment_1)}/>
                    {/if}
                {/if}

                {#if pageMain != '梗图'}

                <div class="my-3 flex justify-center items-center">
                    <div class="items-center">
                        {#if item.finGameUrl != 'text'}
                            <span class="text-xl mr-2">{item.name}</span>
                        {/if}
                        {#if pageMain != '分析'}
                            <span>{item.pid}</span>
                        {/if}
                    </div>
                    <!-- 更改按钮 -->
                    {#if option[item.id] != 1}
                        <button class="h-6 w-6 ml-3 rounded-full bg-zinc-500 hover:bg-zinc-700 text-white" 
                        on:click={() => openComment(item.id, 1)}>
                        {#if item.comment_1 == null}
                            <i class="fa-solid fa-plus"></i>
                        {:else}
                            <i class="fa-solid fa-pen fa-sm"></i>
                        {/if}
                        </button> 
                    {:else}
                        <button class="h-6 w-6 ml-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white" 
                        on:click={() => openComment(item.id, 0)}>
                            <i class="fa-solid fa-xmark"></i>
                        </button> 
                    {/if}
                </div>
                <!-- 图片内容 -->
                {#if item.comment_1 != null}
                    <div class="text-center mb-3 mx-2">
                        {#if tmpComment[item.id] == null}
                            <span>{item.comment_1}</span>
                        {:else}
                            <span>{tmpComment[item.id]}</span>
                        {/if}
                    </div>
                {/if}
                <!-- 修改框 -->
                {#if option[item.id] == 1}
                    <div class="flex justify-center items-center mb-3">
                        <input class="z-0 text-black h-10 w-11/12 rounded-full required text-center" type="text" bind:value={inComment_1} placeholder="备注">
                        <!-- 提交修改 -->
                        <button class="z-10 h-8 w-8 -ml-10 rounded-full bg-zinc-500 hover:bg-zinc-700 text-white"
                        on:click={() => updateTrigger(item.id)}>
                            <i class="fa-solid fa-check"></i>
                        </button> 
                    </div>
                    <!-- 提示信息 -->
                    <div class="flex justify-center items-center mb-3">
                        {#if startUpdate[item.id] == 1}
                            {#await updateComment(item.id, inComment_1)}
                                <p>Updating...</p>
                            {:then data}
                                <p class="text-green-600">Success.</p>
                                <p class="hidden">{initComment(item.id)}</p>
                            {:catch error}
                                <p class="text-orange-600">Something went wrong while fetching the data:</p>
                                <pre>{error}</pre>
                            {/await}
                        {/if}
                    </div>
                {/if}
                {/if}
            </div>


            <!-- 折叠结束 -->
            {/if}
            <!-- 折叠结束 -->

        {/each}
    </div>

    <!--
    {#if currentItem < fullData.length}
        <div class="w-1/2 md:w-1/3 flex justify-center items-start m-auto my-16" >    
            <button class="flex justify-center m-auto rounded-lg w-full bg-zinc-400 hover:bg-zinc-200 text-white py-2 px-2 italic"
            on:click={() => currentItem = currentItem + 5}>
                加载更多
            </button>
        </div>
    {/if}
    -->
        
{:catch error}
    <p>something wrong:</p>
    <pre>{error}</pre>
{/await}
{/if}

<!-- 接目录 -->
{/each}
{:catch error}
<p>something wrong:</p>
<pre>{error}</pre>
{/await}


<!-- Modal for full size images on click
<div id="modal01" class="w3-modal w3-black" style="padding-top:0" alt="" on:click={onClickClose}>
    <span class="w3-button w3-black w3-xlarge w3-display-topright">×</span>
    <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
        <img src={useSrc} id="img01" alt="empty" class="w3-image">
        <p id="caption"></p>
    </div>
</div>
-->


<script>
import {page} from '$app/stores'
import DefaultLoading from "../DIY/defaultLoading.svelte";
import { supabase } from "../../supabaseClient"

const pageGame = $page.params.pageGame

let pageButton = []

let pageMain
let inComment_1
let option = []
let startUpdate = []


let hiddenTest = []

let chineseName

let fullData = []
let currentItem = 5

let tmpComment = []


let pageButtonAsName = []
pageButtonAsName['物件'] = '物件'
pageButtonAsName['情景'] = '情景'
pageButtonAsName['关卡'] = '小POI'
pageButtonAsName['分析'] = '分析'
pageButtonAsName['梗图'] = '233'

function getFullData(data){
    fullData = data
}

let focusSwitch = false
let focusUrl = ''
let focusTitle = ''
let focusComment = ''

function closeFocus(){
    focusUrl = focusTitle = focusComment = ''
    focusSwitch = false
}

function openFocus(url, title, comment){
    focusUrl = url
    focusTitle = title
    focusComment = comment
    focusSwitch = true
}

async function getGameInfo () {
    const { data , error } = await supabase
    .from ('stock')
    .select ()
    .eq('name_img', pageGame)
    if (error) throw new Error(error.message)
    return data 
}

function buildButton(data){
    if (data.物件) pageButton.push("物件")
    if (data.情景) pageButton.push("情景")
    if (data.关卡) pageButton.push("关卡")
    if (data.分析) pageButton.push("分析")
    if (data.梗图) pageButton.push("梗图")
    pageMain = pageButton[0]
}

async function getStock () {
    const { data , error } = await supabase
    .from ('ordered_stock')
    .select ()
    .eq('gameName', pageGame)
    .eq('main',  pageMain)
    if (error) throw new Error(error.message)
    return data 
}

async function updateComment (tmp_id,comment) {
    const { data , error } = await supabase
    .from ('stockImg')
    .update({comment_1: comment})
    .match({id: tmp_id})
    if (error) throw new Error(error.message)
    return data 
}

function initComment (tmp_id){
    tmpComment[tmp_id] = inComment_1
    inComment_1 = ''
    openComment(tmp_id, 0)
}

function openComment(i,status) {
    if (status == 1){
        for (let j=0;j<option.length;j++)
            if(i!=j)
                option[j] = 0
        inComment_1 = ''
    }
    option[i] = status
    if (status == 0) startUpdate[i] = 0;
}

function updateTrigger(i) {
    startUpdate[i] = 1;
}

function changePageMain(main) {
    pageMain = main;
    infoRefresh();
}

//刷新页面
function infoRefresh_aid(){
refreshTrigger = true
}

function infoRefresh() {
refreshTrigger = false;
setTimeout(infoRefresh_aid, 10);
}

function getChineseName(tmp) {
    chineseName = tmp
}

//获取数据
let refreshTrigger = true




//const formattedDate = new Date(date).toDateString();

</script>

<svelte:head>
    <title>干货 | {pageGame}</title>
</svelte:head>