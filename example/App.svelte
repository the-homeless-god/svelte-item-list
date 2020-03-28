<script>
  import ItemList from '../dist/index.js'
  import { writable } from 'svelte/store'

  const store = writable([])

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
</script>

<!-- with store method-->
<ItemList needPag={true} endpointIsStore={true} endpoint={store}>
  <div slot="loading">...loading</div>
</ItemList>

<!-- with promise method-->
<ItemList needPag={true} endpoint={async () => items}>
  <div slot="loading">...loading</div>
</ItemList>
