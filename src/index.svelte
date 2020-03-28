<script>
  import { onMount } from 'svelte'
  import Pagination from './components/Pagination.svelte'
  import { initItems, items, paginatedItems, currentPage } from './tools/store'
  import Item from './components/Item.svelte'

  export let endpoint

  export let pageSize = 10
  export let boldIndex = 5

  export let isVisible = true
  export let endpointIsStore = false

  export let needPag = true
  export let needIndex = true
  export let needPoint = true
  export let needIcon = true
  export let needTimeago = false

  export let nameProp = 'name'
  export let descProp = 'description'
  export let pointProp = 'point'
  export let iconProp = 'icon'
  export let light = 'light'

  export let clickFunc = item => {}

  export let sortFunc = (a, b) => {
    return a[pointProp] - b[pointProp]
  }

  const init = async () => {
    currentPage.subscribe(value => {
      paginatedItems.set(
        $items.slice((value - 1) * pageSize, (value - 1) * pageSize + pageSize)
      )
    })

    items.subscribe(value => {
      paginatedItems.set(
        value.slice(
          ($currentPage - 1) * pageSize,
          ($currentPage - 1) * pageSize + pageSize
        )
      )
    })

    await initItems(endpoint, sortFunc, needIndex, endpointIsStore)
  }

  onMount(init)
</script>

<style>
  .item-container {
    margin: 15px;
    display: flex;
    flex-wrap: wrap;
  }

  .item-container .item-text {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    justify-content: flex-start;
    align-items: center;
  }

  .item-container > span:nth-child(even) {
    background: rgb(248, 248, 248);
  }

  .item-container .light {
    box-shadow: 0 0 3px 1px #ccc;
  }
</style>

{#if isVisible}
  <div class="item-container">
    {#if $items.length === 0}
      <slot name="loading" />
    {:else}
      <slot name="header" />

      {#each $paginatedItems as item}
        <span
          on:click={() => clickFunc(item)}
          class:light={item[light]}
          class="item-text">

          <Item
            {needIcon}
            {needIndex}
            {needTimeago}
            {needPoint}
            index={item.index}
            bold={item.index < boldIndex}
            icon={item[iconProp]}
            body={item[descProp]}
            header={item[nameProp]}
            sub={item[pointProp]} />

        </span>
      {/each}

      {#if needPag}
        <Pagination
          totalItems={$items.length}
          {pageSize}
          limit={null}
          showStepOptions={true} />
      {/if}
    {/if}
  </div>
{/if}
