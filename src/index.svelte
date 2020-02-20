<script>
  import { onMount } from 'svelte'

  export let endpoint
  export let nameProp = 'name'
  export let descProp = 'description'
  export let pointProp = 'point'
  export let iconProp = 'icon'

  let items = []

  onMount(async () => {
    items = await endpoint()
  })
</script>

<style scoped>
  .item-container {
    margin: 15px;
    display: flex;
    flex-wrap: wrap;
  }

  .item-text {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    justify-content: flex-start;
    align-items: center;
  }

  .item-text img {
    margin-left: 3px;
    margin-right: 12px;
    border-radius: 50%;
    width: 50px;
  }

  .item-score {
    margin-left: auto;
    font-weight: 500;
  }

  .item-container > span:nth-child(even) {
    background: rgb(248, 248, 248);
  }

  .item-description {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
  }

  .item-description strong {
    width: 100%;
  }
</style>

<div class="item-container">
  {#if items.length === 0}
    <slot name="loading" />
  {:else}
    {#each items as item}
      <span class="item-text">
        <img alt="icon" src={item[iconProp]} />
        <div class="item-description">
          <strong>{item[nameProp]}</strong>
          <span>{item[descProp]}</span>
        </div>
        <span class="item-score">{item[pointProp]}</span>
      </span>
    {/each}
  {/if}
</div>
