<script>
  import { onMount } from 'svelte'
  import Pagination from './components/Pagination.svelte'
  import { initItems, items } from './tools/store'
  import { paginate } from './tools/navigation.tool'

  export let endpoint
  export let nameProp = 'name'
  export let descProp = 'description'
  export let pointProp = 'point'
  export let iconProp = 'icon'
  export let light = 'light'
  export let needPag = true
  export let needIndex = true
  export let pageSize = 10
  export let currentPage = 1
  export let boldIndex = 5

  export let sortFunc = (a, b) => {
    return a[pointProp] - b[pointProp]
  }

  let paginatedItems = []

  $: if ($items.length > 0) {
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

  onMount(() => initItems(endpoint, sortFunc))
</script>

<style scoped>
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

  .item-container .item-text img {
    margin-left: 3px;
    margin-right: 12px;
    border-radius: 50%;
    width: 50px;
  }

  .item-container .item-score {
    margin-left: auto;
    font-weight: 500;
  }

  .item-container > span:nth-child(even) {
    background: rgb(248, 248, 248);
  }

  .item-container .item-description {
    display: flex;
    flex-wrap: wrap;
  }

  .item-container .item-description strong {
    width: 100%;
  }

  .item-container .light {
    box-shadow: 0 0 3px 1px #ccc;
  }

  .item-index {
    min-width: 32px;
    text-align: right;
    margin-right: 8px;
  }
</style>

<div class="item-container">
  {#if items.length === 0}
    <slot name="loading" />
  {:else}
    <slot name="header" />

    {#each paginatedItems as item}
      <span class:light={item[light]} class="item-text">
        {#if needIndex}
          <span class="item-index">{item.index}</span>
        {/if}
        <img alt="icon" src={item[iconProp]} />
        <div class="item-description">
          {#if item.index <= boldIndex}
            <strong>{item[nameProp]}</strong>
          {:else}
            <span>{item[nameProp]}</span>
          {/if}
          {#if item[descProp]}
            <span>{item[descProp]}</span>
          {/if}
        </div>
        <span class="item-score">{item[pointProp]}</span>
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
