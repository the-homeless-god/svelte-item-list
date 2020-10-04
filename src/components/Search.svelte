<script>
  import { createEventDispatcher } from 'svelte'

  export let classListModel
  export let configuration
  export let enabled: boolean = false

  const dispatch = createEventDispatcher<{ search: string }>()

  let value = ''

  const search = () => {
    dispatch('search', value)
  }
</script>

{#if enabled}
  <div class={classListModel.search.root}>
    {#if configuration.icon.enabled}
      <i class={classListModel.search.icon.root} />
    {/if}
    <input
      bind:value
      on:input={search}
      class={classListModel.search.input}
      placeholder={configuration.placeholder}
    />
  </div>
{/if}
