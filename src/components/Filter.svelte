<script>
  import { createEventDispatcher } from 'svelte'

  export let classListModel
  export let configuration

  const dispatch = createEventDispatcher()

  let value = ''

  const filter = option => {
    dispatch('filter', option)
  }
</script>

<div class={classListModel.filter.root}>
  {#if configuration.icon.enabled}
    <i class={classListModel.filter.icon.root} />
  {/if}
  <select on:change={filter} class={classListModel.filter.select}>
    <option disabled selected hidden>{configuration.placeholder}</option>
    <option value="Name">Name</option>
  </select>
</div>
