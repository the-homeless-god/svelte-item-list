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

<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { fade, fly } from 'svelte/transition'

  const items = writable([])
  const paginatedItems = writable([])
  const currentPage = writable(1)

  import Pagination from './components/Pagination.svelte'
  import Item from './components/Item.svelte'

  export let endpoint

  export let pageSize = 3
  export let boldIndex = 5

  export let limit = 1
  export let isVisible = false
  export let endpointIsStore = false

  export let needPag = true
  export let needIndex = true
  export let needPoint = true
  export let needIcon = true
  export let needTimeago = false
  export let needBody = true

  export let nameProp = 'name'
  export let descProp = 'description'
  export let pointProp = 'point'
  export let iconProp = 'icon'
  export let light = 'light'

  export let headerEnabled = false
  export let headerText = ''

  export let clickFunc = item => {}

  export let sortFunc = (a, b) => {
    return a[pointProp] - b[pointProp]
  }

  const init = async () => {
    currentPage.subscribe(value => {
      if (needPag) {
        paginatedItems.set(
          $items.slice(
            (value - 1) * pageSize,
            (value - 1) * pageSize + pageSize
          )
        )
      }
    })

    items.subscribe(value => {
      if (needPag) {
        paginatedItems.set(
          value.slice(
            ($currentPage - 1) * pageSize,
            ($currentPage - 1) * pageSize + pageSize
          )
        )
      }
    })

    await initItems(endpoint, sortFunc, needIndex, endpointIsStore)
  }

  const initItems = async (endpoint, sortFunc, needIndex, endpointIsStore) => {
    if (endpointIsStore) {
      endpoint.subscribe(e => {
        e.sort(sortFunc)

        items.set(e)

        if (needIndex) {
          items.update(item =>
            item.map((item, index) => {
              item.index = ++index
              return item
            })
          )
        }
      })
    } else {
      let result = await endpoint()
      if (result) {
        if (sortFunc) {
          result.sort(sortFunc)
        }

        if (needIndex) {
          result.forEach((item, index) => {
            item.index = ++index
            return item
          })
        }

        items.set(result)
      }
    }
  }

  onMount(init)
</script>

{#if isVisible}

  <div out:fade in:fly="{{ y: 200, duration: 2000 }}" class="item-container">
    {#if headerEnabled}
      <div out:fade class="item-header">{headerText}</div>
    {/if}

    {#if $items.length === 0}
      <slot name="loading" />
    {:else}
      <slot name="header" />

      {#if needBody}
        {#each $paginatedItems as item}
          <span
            on:click={() => clickFunc(item)}
            class:light={item[light]}
            class="item-text"
          >

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
              sub={item[pointProp]}
            />

          </span>
        {/each}
      {:else}
        <slot items={$paginatedItems} name="body" />
      {/if}

      {#if needPag}
        <Pagination
          totalItems={$items.length}
          {pageSize}
          {limit}
          {currentPage}
          showStepOptions={true}
        />
      {/if}
    {/if}
  </div>
{/if}
