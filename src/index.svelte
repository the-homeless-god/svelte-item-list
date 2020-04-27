<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { fade } from 'svelte/transition'

  import Pagination from './components/Pagination.svelte'
  import Item from './components/Item.svelte'
  import Search from './components/Search.svelte'

  const items = writable([])
  const paginatedItems = writable([])

  export let configuration = {
    global: {
      classListModel: {
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
        },

        search: {
          root: 'item-list__search',
          input: 'item-list__search-input',
          icon: {
            root: 'icon-search'
          }
        }
      },
      isVisible: false,
      body: {
        enabled: true
      },
      header: {
        enabled: true,
        text: ''
      },
      search: {
        enabled: true,
        placeholder: 'Search right now',
        icon: {
          enabled: true
        }
      }
    },
    endpoint: {
      isStore: false,
      value: async () => [],
      sortFunction: (a, b) => {
        return a[pointProp] - b[pointProp]
      }
    },
    pagination: {
      enabled: true,
      pageSize: 3,
      currentPageStore: null,
      step: {
        limit: 1,
        enabled: true
      }
    },
    item: {
      clickFunction: item => {},
      bold: {
        enabled: true,
        count: 5
      },
      name: {
        enabled: true,
        prop: 'name'
      },
      description: {
        enabled: true,
        prop: 'description',
        isHTML: true
      },
      point: {
        enabled: true,
        prop: 'point',
        isTimeago: false
      },
      icon: {
        enabled: true,
        prop: 'icon'
      },
      index: {
        enabled: true
      },
      light: {
        prop: 'light'
      }
    }
  }

  const currentPage = configuration.pagination.currentPageStore
    ? configuration.pagination.currentPageStore
    : writable(1)

  const init = async () => {
    currentPage.subscribe(value => {
      if (configuration.pagination.enabled) {
        paginatedItems.set(
          $items.slice(
            (value - 1) * configuration.pagination.pageSize,
            (value - 1) * configuration.pagination.pageSize +
              configuration.pagination.pageSize
          )
        )
      } else paginatedItems.set($items)
    })

    items.subscribe(value => {
      if (configuration.pagination.enabled) {
        paginatedItems.set(
          value.slice(
            ($currentPage - 1) * configuration.pagination.pageSize,
            ($currentPage - 1) * configuration.pagination.pageSize +
              configuration.pagination.pageSize
          )
        )
      } else paginatedItems.set(value)
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

  const search = event => {
    if (event.detail.length > 0) {
      paginatedItems.set(
        $items.filter(item => item.name && item.name.includes(event.detail))
      )
    } else {
      if (configuration.pagination.enabled) {
        paginatedItems.set(
          $items.slice(
            ($currentPage - 1) * configuration.pagination.pageSize,
            ($currentPage - 1) * configuration.pagination.pageSize +
              configuration.pagination.pageSize
          )
        )
      } else paginatedItems.set($items)
    }
  }

  onMount(init)
</script>

{#if configuration.global.isVisible}

  <div out:fade in:fade class={configuration.global.classListModel.root}>
    {#if configuration.global.header.enabled}
      <div out:fade class={configuration.global.classListModel.header}>
        {configuration.global.header.text}
      </div>
    {/if}

    {#if $items.length === 0}
      <slot name="loading" />
    {:else}
      <slot name="header" />

      {#if configuration.global.search.enabled}
        <Search
          configuration={configuration.global.search}
          classListModel={configuration.global.classListModel}
          on:search={search}
        />
      {/if}

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

      {#if configuration.pagination.enabled}
        <Pagination
          totalItems={$items.length}
          pageSize={configuration.pagination.pageSize}
          limit={configuration.pagination.step.limit}
          classListModel={configuration.global.classListModel}
          {currentPage}
          showStepOptions={configuration.pagination.step.enabled}
        />
      {/if}
    {/if}
  </div>
{/if}
