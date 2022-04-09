<div class="container mx-auto">
  <!-- 按钮选择 -->
  <div>

  </div>

  <!-- 卡片 -->
  <div>
    {#await getInsightOrdinary()}
      <p>Fetching data...</p>
    {:then data}
      {#each data as insight}
        <div class="m-5">
          <h1>{insight.sourceGame}</h1>
          <h2>{insight.sourceLevel}</h2>
          <p style="white-space: pre-wrap;">{insight.insightContent}</p>
        </div>
      {/each}
    {:catch error}
      <p>something wrong:</p>
      <pre>{error}</pre>
    {/await}
  </div>
</div>



<script>
  import { dataset_dev, each, empty, trusted } from "svelte/internal"
  import { supabase } from "../supabaseClient"
  
  let isOrdinary = true;
  let numOfOrdinary = 5
  let numOfImportant = 3

  async function getInsightOrdinary () {
    const { data , error } = await supabase
      .from ('random_insight')
      .select ()
      .is ('important',false)
      .limit (numOfOrdinary)
    if (error) throw new Error(error.message)
    return data 
  }

  async function getInsightImportant () {
    const { data , error } = await supabase
      .from ('random_insight')
      .select ()
      .is ('important',true)
      .limit (numOfImportant)
    if (error) throw new Error(error.message)
    return data 
  }
</script>

