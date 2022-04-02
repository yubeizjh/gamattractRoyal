<script>
    import { supabase } from "../supabaseClient"

async function getData() {
  const { data, error } = await supabase
    .from('testInfo')
    .select()
  if (error) throw new Error(error.message)
  
  return data
}

let newGame
let submit = false

async function sendData() {
  const { data, error } = await supabase
    .from('testInfo')
    .insert([
      { 'title': newGame }
    ])
  if (error) throw new Error(error.message) 
  
  return data
}

</script>

<h1 class="text-blue-600">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<h1>My favorite games</h1>

{#await getData()}
  <p>Fetching data...</p>
{:then data}
  {#each data as game}
    <li>{game.title}</li>
  {/each}
{:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await}

<form on:submit|preventDefault={() => submit = true}>
    <input type="text" bind:value={newGame}>
    <input type="submit" value="Submit" on:click={() => submit = false}>
</form>

{#if submit}
    {#await sendData()}
      <p>Sending data...</p>
    {:then data}
      <p>Successfully sent data.</p>
    {:catch error}
      <p>Something went wrong while sending the data:</p>
      <pre>{error}</pre>
    {/await}
{/if}