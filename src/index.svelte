<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { fade } from 'svelte/transition'

  import Pagination from './components/Pagination.svelte'
  import Item from './components/Item.svelte'
  import Search from './components/Search.svelte'
  import Filter from './components/Filter.svelte'

  import { headerConfig } from './configurations/header.config'
  import { bodyConfig } from './configurations/body.config'
  import { searchConfig } from './configurations/search.config'
  import { filterConfig } from './configurations/filter.config'
  import { getItemConfig } from './configurations/item.config'
  import { classList } from './configurations/config.dictionary'
  import { paginationConfig } from './configurations/pagination.config'
  import { getEndpointConfig } from './configurations/endpoint.config'
  import { search } from './tools/search.tool'
  import type { Configuration } from './configurations/config.interface'
  import {
    getSearchStep,
    getDoubleSearchStep,
    paginateItems,
    getCurrentPage,
  } from './tools/pagination.tool'
  import { isEmpty } from './tools/item.tool'

  const items = writable([])
  const paginatedItems = writable([])

  export let configuration: Configuration

  const currentPage = getCurrentPage(configuration)

  const init = async () => {
    const { size } = configuration.pagination.page

    currentPage.subscribe((value) => {
      if (configuration.pagination.enabled) {
        paginatedItems.set(paginateItems($items, value, size))
      } else {
        paginatedItems.set($items)
      }
    })

    items.subscribe((value) => {
      if (configuration.pagination.enabled) {
        getSearchStep($currentPage, size)
        paginatedItems.set(paginateItems(value, $currentPage, size))
      } else {
        paginatedItems.set(value)
      }
    })

    await initItems(
      configuration.endpoint.value,
      configuration.endpoint.sortFunction,
      configuration.item.index.enabled,
      configuration.endpoint.isStore
    )
  }

  const initItems = async (endpoint, sortFunc, needIndex, endpointIsStore) => {
    if (endpointIsStore) {
      endpoint.subscribe((e) => {
        e.sort(sortFunc)

        items.set(e)

        if (needIndex) {
          items.update((item) =>
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

  const searchItems = (event) => {
    search(event, $items, paginatedItems, configuration, $currentPage)
  }

  const filter = (event) => {
    switch (event.detail) {
      case 'minPoints':
        items.set(
          $items.sort((a, b) => {
            return (
              a[configuration.item.point.prop] -
              b[configuration.item.point.prop]
            )
          })
        )
        break

      case 'maxPoints':
        items.set(
          $items.sort((a, b) => {
            return (
              b[configuration.item.point.prop] -
              a[configuration.item.point.prop]
            )
          })
        )
        break
    }
  }

  onMount(init)
</script>

{#if configuration.global.isVisible}
  <div class={configuration.global.classListModel.root}>
    {#if configuration.global.header.enabled}
      <div out:fade class={configuration.global.classListModel.header}>
        {configuration.global.header.text}
      </div>
    {/if}

    {#if isEmpty($items)}
      <slot name="loading" />
    {:else}
      <slot name="header" />

      <Search
        enabled={configuration.global.search.enabled}
        configuration={configuration.global.search}
        classListModel={configuration.global.classListModel}
        on:search={searchItems}
      />

      <Filter
        enabled={configuration.global.filter.enabled}
        configuration={configuration.global.filter}
        classListModel={configuration.global.classListModel}
        on:filter={filter}
      />

      {#if configuration.global.body.enabled}
        {#each $paginatedItems as item}
          <span
            on:click={() => configuration.item.clickFunction(item)}
            class:light={item[configuration.item.light.prop]}
            class={configuration.global.classListModel.item.root}
          >
            <Item
              configuration={configuration.item}
              classListModel={configuration.global.classListModel}
              {item}
            />
          </span>
        {/each}
      {:else}
        <slot items={$paginatedItems} name="body" />
      {/if}

      <Pagination
        enabled={configuration.pagination.enabled}
        totalItems={$items.length}
        pageSize={configuration.pagination.pageSize}
        limit={configuration.pagination.step.limit}
        classListModel={configuration.global.classListModel}
        {currentPage}
        showStepOptions={configuration.pagination.step.enabled}
      />
    {/if}
  </div>
{/if}
