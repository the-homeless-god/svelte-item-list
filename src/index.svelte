<script>
  import { onMount } from 'svelte'
  import Pagination from './components/Pagination.svelte'
  import { initItems, items } from './tools/store'
  import { paginate } from './tools/navigation.tool'
  import Item from './components/Item.svelte'

  export let endpointIsStore = false
  export let endpoint
  export let nameProp = 'name'
  export let descProp = 'description'
  export let pointProp = 'point'
  export let iconProp = 'icon'
  export let light = 'light'
  export let needPag = true
  export let needIndex = true
  export let needPoint = true
  export let needIcon = true
  export let needTimeago = false
  export let isVisible = true
  export let pageSize = 10
  export let currentPage = 1
  export let boldIndex = 5

  export let clickFunc = item => {}

  export let sortFunc = (a, b) => {
    return a[pointProp] - b[pointProp]
  }

  let paginatedItems = []

  const render = () => {
    let items = $items.map((item, index) => {
      item.index = ++index
      return item
    })
    if (needPag) {
      paginatedItems = paginate({ items, pageSize, currentPage })
    } else {
      paginatedItems = items
    }
  }

  const init = async () => {
    items.subscribe(value => {
      render()
    })

    if (endpointIsStore) {
      endpoint.subscribe(e => {
        e.sort(sortFunc)
        items.update(i => e)
      })
    } else {
      await initItems(endpoint, sortFunc)
    }
    render()
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

      {#each paginatedItems as item}
        <span on:click={() => clickFunc(item)} class:light={item[light]} class="item-text">

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
          {currentPage}
          limit={null}
          showStepOptions={true}
          on:setPage={e => (currentPage = e.detail.page)} />
      {/if}
    {/if}
  </div>
{/if}
