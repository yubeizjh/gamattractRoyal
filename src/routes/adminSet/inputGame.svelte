<!-- 需要加密码验证 maybe or权限 -->
<div class="block mb-5 my-5 m-auto w-1/2">
    <h1 class="text-2xl my-2">Last 5 games</h1>
    <button class="my-2 block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" on:click={infoRefresh}>
      刷新
    </button> 
    {#if refreshTrigger}
      {#await getData()}
        <p>Fetching data...</p>
      {:then data}
        {#each data as item}
          <li class="text-white">
            {item.id} {item.game} {item.imgUrl}
          </li>
        {/each}
      {:catch error}
        <p>Something went wrong while fetching the data:</p>
        <pre>{error}</pre>
      {/await}
    {/if}
  
  
  </div>
  
  <div class="m-auto w-1/2">
  
    <form on:submit|preventDefault={() => submit = true}>  
      <input class="block w-full mb-3 required" type="text" bind:value={inGame} placeholder="游戏名">
      <input class="block w-full mb-3 required" type="text" bind:value={inImgUrl} placeholder="图片路径">
      <input class="block w-full mb-3 required" type="text" bind:value={inImgUrlType} placeholder="图片格式">
      <label class="block w-full mb-3 text-white">
        <input type="checkbox" bind:checked={inAvailable}>
        是否有内容
      </label>
      <input class="block w-full mb-3" type="text" bind:value={inHrefUrl} placeholder="链接文章">
      
      <button class="block w-full bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Submit" on:click={() => submit = false}>
        提交
      </button>  
    </form>
  
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
      .from('stock')
      .select()
      .limit(5)
      .order('id', {ascending:false})
    if (error) throw new Error(error.message)
    return data
  }
  
  let inGame = null
  let inImgUrl = null
  let inImgUrlType = "jpg"
  let inAvailable = false
  let inHrefUrl = null
  
  let submit = false
  
  //提交数据
  async function sendData() {
    inImgUrl = "/stockImg/" + inImgUrl + "." + inImgUrlType
    const { data, error } = await supabase
      .from('stock')
      .insert([
        { 
          'game': inGame,
          'imgUrl': inImgUrl,
          'available': inAvailable,
          'hrefUrl': inHrefUrl
        }
      ])
    if (error) throw new Error(error.message) 
    return data
  }
  
  </script>