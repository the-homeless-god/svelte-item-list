<script>
  import { createEventDispatcher } from 'svelte'

  export let classListModel
  export let configuration
  export let enabled: boolean = false

  let selected

  let options = [
    {
      name: 'Start with MIN points',
      value: 'minPoints',
    },
    {
      name: 'Start with MAX points',
      value: 'maxPoints',
    },
  ]

  const dispatch = createEventDispatcher()

  let value = ''

  const filter = (option) => {
    dispatch('filter', selected)
  }
</script>

{#if enabled}
  <div class={classListModel.filter.root}>
    {#if configuration.icon.enabled}
      <i class={classListModel.filter.icon.root} />
    {/if}
    <select
      bind:value={selected}
      on:blur={filter}
      class={classListModel.filter.select}
    >
      <option disabled selected hidden>{configuration.placeholder}</option>
      {#each options as option}
        <option value={option.value}>{option.name}</option>
      {/each}
    </select>
  </div>
{/if}
