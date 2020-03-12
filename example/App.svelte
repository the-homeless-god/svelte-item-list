<script>
  import ItemList from '../dist/index.js'

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
</script>

<ItemList needPag={false} endpoint={async () => items}>
  <div slot="loading">...loading</div>
</ItemList>
