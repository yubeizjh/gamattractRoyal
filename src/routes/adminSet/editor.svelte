<script>
  import { Editor, Viewer } from 'bytemd'

  let value
  const plugins = [
    // Add more plugins here
  ]

  function handleChange(e) {
    value = e.detail.value
  }
</script>

<template>
  <Editor {value} {plugins} on:change={handleChange} />
</template>