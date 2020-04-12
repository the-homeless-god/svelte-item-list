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
</style>

<script>
  import ItemList from '../dist/index.js'
  import { writable } from 'svelte/store'

  const store = writable([])
  let hide = false
  let items = []

  for (let i = 0; i < 100; i++) {
    items.push({
      name: 'Item name',
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
    }
  }
</script>

<!-- with store method-->
<ItemList
  isVisible={!hide}
  needPag={true}
  endpointIsStore={true}
  pageSize={10}
  {classListModel}
  endpoint={store}
>
  <div slot="loading">...loading</div>
</ItemList>

<!-- with promise method-->
<ItemList
  isVisible={!hide}
  pageSize={3}
  needPag={true}
  {classListModel}
  endpoint={async () => items}
>
  <div slot="loading">...loading</div>
</ItemList>

<button on:click={() => (hide = !hide)}>hide</button>
