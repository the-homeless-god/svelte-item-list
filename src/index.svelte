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

  export let classListModel = {
    root: 'item-list__item-container',
    header: 'item-list__header_text',
    item: {
      root: 'item_list__item-text',
      description: {
        name: 'item_list_item-name-text',
        root: 'item-list__description-root',
        text: 'item-list__description-text'
      },
      icon: 'item-list__item-icon',
      index: 'item-list__item-index',
      point: 'item-list__item-point'
    },

    pagination: {
      root: 'item-list__pagination',
      option: 'pagination__option',
      arrow: {
        doubleLeft: 'icon-angle-double-left',
        left: 'icon-angle-left',
        right: 'icon-angle-right',
        doubleRight: 'icon-angle-double-right'
      }
    }
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
      } else paginatedItems.set($items)
    })

    items.subscribe(value => {
      if (needPag) {
        paginatedItems.set(
          value.slice(
            ($currentPage - 1) * pageSize,
            ($currentPage - 1) * pageSize + pageSize
          )
        )
      } else paginatedItems.set(value)
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

  <div out:fade in:fade class={classListModel.root}>
    {#if headerEnabled}
      <div out:fade class={classListModel.header}>{headerText}</div>
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
            class={classListModel.item.root}
          >

            <Item
              {needIcon}
              {needIndex}
              {needTimeago}
              {needPoint}
              {classListModel}
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
          {classListModel}
          {currentPage}
          showStepOptions={true}
        />
      {/if}
    {/if}
  </div>
{/if}
