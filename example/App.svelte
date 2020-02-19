<script>
  import AchieveList from 'svelte-achieve-list'
</script>

<AchieveList
  endpoint={async () => {
    return [{ name: 'Achieve name', icon: '/favicon.png', description: 'some dec', point: 10 }]
  }}>
  <div slot="loading">...loading</div>
</AchieveList>
