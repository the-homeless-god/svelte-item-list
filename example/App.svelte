<style>
  :global(.item-list__description-text) {
    display: flex;
    flex-wrap: wrap;
  }

  :global(.item-list__description-text strong) {
    width: 100%;
  }

  :global(.item-list__container) {
    margin: 15px;
    display: flex;
    flex-wrap: wrap;
  }

  :global(.item-list__item-text) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    justify-content: flex-start;
    align-items: center;
  }

  :global(.item-list__container > span:nth-child(even)) {
    background: rgb(248, 248, 248);
  }

  :global(.item-list__container .item-light) {
    box-shadow: 0 0 3px 1px #ccc;
  }

  :global(.item-list__item-icon) {
    margin-left: 3px;
    margin-right: 12px;
    border-radius: 50%;
    width: 50px;
  }

  :global(.item-list__item-point) {
    margin-left: auto;
    font-weight: 500;
  }

  :global(.item-list__item-index) {
    min-width: 32px;
    text-align: right;
    margin-right: 8px;
  }

  :global(.item-list__pagination) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  ::global(.item-list__pagination > *) {
    font-size: 18px;
  }

  :global(.item-list__pagination .pagination__option) {
    padding: 5px 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s all ease-out;
    user-select: none;
    color: black;
    background-color: #fff;
    border-radius: 4px;
    margin: 5px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  :global(.item-list__pagination .option:hover) {
    transform: scale(1.1);
  }

  :global(.item-list__pagination .option.current) {
    color: #747474;
  }

  :global(.item-list__search) {
    width: 100%;
    margin: 10px 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  :global(.item-list__search .icon-search) {
    background: black;
    border: 1px solid black;
    color: white;
    padding: 15px;
  }

  :global(.item-list__search input) {
    font-size: 18px;
    padding: 10px;
    border: 1px solid gray;
    border-left: none;
  }

  :global(.item-list__select) {
    width: 100%;
    margin: 10px 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  :global(.item-select__filter) {
    padding: 10px;
    font-size: 18px;
    font-family: Arial;
    border: 1px solid gray;
    box-sizing: border-box;
    width: 240px;
  }

  :global(.item-list__select .icon-th-list) {
    background: black;
    border: 1px solid black;
    color: white;
    padding: 15px;
  }

  .full-flex {
    display: flex;
    flex-wrap: wrap;
  }

  .full-width {
    width: 100%;
  }

  .item-icon {
    width: 50px;
  }
</style>

<script>
  import ItemList from '../dist/index.js'
  import { writable } from 'svelte/store'

  const store = writable([])
  let items = []

  for (let i = 0; i < 100; i++) {
    items.push({
      name: `Item name ${i}`,
      icon: '/favicon.png',
      description: 'some dec',
      point: i,
      light: false
    })
  }

  store.set(items)

  let classListModel = {
    root: 'item-list__container',
    header: 'item-list__header_text',
    item: {
      root: 'item-list__item-text',
      description: {
        name: 'item-list_item-name-text',
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
    },

    filter: {
      root: 'item-list__select',
      select: 'item-select__filter',
      icon: {
        root: 'icon-th-list'
      }
    }
  }

  let storeConfiguration = {
    global: {
      classListModel: classListModel,
      body: {
        enabled: true
      },
      isVisible: true,
      header: {
        enabled: true,
        text: 'Example with store configuration'
      },
      search: {
        enabled: true,
        placeholder: 'Search right now',
        icon: {
          enabled: true
        }
      },
      filter: {
        enabled: true,
        placeholder: 'Filter right now',
        icon: {
          enabled: true
        }
      }
    },
    endpoint: {
      isStore: true,
      value: store,
      sortFunction: () => {}
    },
    pagination: {
      enabled: true,
      pageSize: 10,
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

  let promiseConfiguration = {
    global: {
      classListModel: classListModel,
      isVisible: true,
      body: {
        enabled: true
      },
      search: {
        enabled: true,
        placeholder: 'Search right now',
        icon: {
          enabled: true
        }
      },
      header: {
        enabled: true,
        text: 'Example with store configuration'
      },
      filter: {
        enabled: false
      }
    },
    endpoint: {
      isStore: false,
      value: async () => items,
      sortFunction: () => {}
    },
    pagination: {
      enabled: true,
      pageSize: 3,
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

  let customItemConfiguration = {
    global: {
      classListModel: classListModel,
      isVisible: true,
      body: {
        enabled: false
      },
      search: {
        enabled: true,
        placeholder: 'Search by name now',
        icon: {
          enabled: true
        }
      },
      header: {
        enabled: true,
        text: 'Example with store configuration'
      },
      filter: {
        enabled: false
      }
    },
    endpoint: {
      isStore: false,
      value: async () => items,
      sortFunction: () => {}
    },
    pagination: {
      enabled: true,
      pageSize: 3,
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
</script>

<!-- with store method-->
<ItemList configuration={storeConfiguration}>
  <div slot="loading">...loading</div>
</ItemList>

<!-- with promise method-->
<ItemList configuration={promiseConfiguration}>
  <div slot="loading">...loading</div>
</ItemList>

<!-- without configuration-->
<ItemList>
  <div slot="loading">...loading</div>
</ItemList>

<!-- with custom item list -->
<ItemList configuration={customItemConfiguration} let:items>
  <div slot="loading">...loading</div>

  <div class="full-flex full-width" slot="body">
    {#each items as item}
      <div class="full-flex full-width">
        <img class="item-icon" src={item.icon} alt="icon" />
        <div>
          <b>{item.name}</b>
          <div>{item.description}</div>
        </div>
      </div>
    {/each}
  </div>
</ItemList>

<button
  on:click={() => {
    promiseConfiguration.global.isVisible = !promiseConfiguration.global.isVisible
    storeConfiguration.global.isVisible = !storeConfiguration.global.isVisible
  }}
>
  hide
</button>
