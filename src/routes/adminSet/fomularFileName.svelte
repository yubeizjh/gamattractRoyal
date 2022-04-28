{#await getData()}
  fetching...
{:then data} 
  {#each data as item}
    <div class="hidden">
      {copyData(item)}
    </div>
  {/each}
{/await}

{#if flag}
  <p class="text-3xl text-orange-700">已更新过</p>
{:else}
  <p class="text-3xl text-green-500">等待更新</p>
{/if}

<button class="bg-white text-black w-1/4" on:click={updateAllData}>
  更新数据
</button>

<br>

<div>
  {#if startUpdate}
    {#each fullData as item}
      {#await updateDate(item.id, item.gameUrl)}
          <p class="mb-3">{item.id}/{fullData.length} Updating...</p>
      {:then data}
          <p class="text-green-600 mb-3">{item.id}/{fullData.length} Success.</p>
      {:catch error}
          <p class="text-orange-600">Something went wrong while fetching the data:</p>
      {/await}
    {/each}
  {/if}
</div>

<script>
import { supabase } from "../../supabaseClient"

let flag = false;

let fullData = []
let currentLength = 0

let startUpdate = false

async function getData() {
    const { data, error } = await supabase
      .from('stockImg')
      .select()
      .order ("id")
    if (error) throw new Error(error.message)
    return data
}

async function updateDate(myId,newName) {
    const { data, error } = await supabase
    .from('stockImg')
    .update({ finGameUrl: newName })
    .match({ id: myId })
    if (error) throw new Error(error.message)
    return data 
}

function updateAllData(){
  startUpdate = true;
}

function copyData(item){
  if (item.finGameUrl != null)
    flag = true

  fullData[currentLength] = item

  let name = fullData[currentLength].gameUrl
  let id = fullData[currentLength].id

  let A_start = item.gameUrl.lastIndexOf('/') + 1
  let A_end = item.gameUrl.length
  let A = item.gameUrl.substring(A_start,A_end)

  fullData[currentLength].fileName = A

  fullData[currentLength].gameUrl = simpleName(name,id)
  currentLength = currentLength + 1
}

function simpleName(str,id){
    let A_start = 0
    let A_end = str.lastIndexOf('/') + 1
    let A = str.substring(A_start,A_end)

    let B_start = str.indexOf(".")
    let B_end = str.length
    let B = str.substring(B_start,B_end)

    let finalStr = A + id.toString() + B
    
    return finalStr
}

</script>