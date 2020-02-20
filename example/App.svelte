<script>
  import ItemList from 'svelte-item-list'
</script>

<ItemList
  endpoint={async () => {
    return [{ name: 'Item name', icon: '/favicon.png', description: 'some dec', point: 10 }]
  }}>
  <div slot="loading">...loading</div>
</ItemList>
