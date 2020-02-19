<script>
  import { onMount } from 'svelte'

  export let endpoint
  export let nameProp = 'name'
  export let descProp = 'description'
  export let pointProp = 'point'
  export let iconProp = 'icon'

  let achievs = []

  onMount(async () => {
    achievs = await endpoint()
  })
</script>

<style scoped>
  .achieve-container {
    margin: 15px;
    display: flex;
    flex-wrap: wrap;
  }

  .achieve-text {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    justify-content: flex-start;
    align-items: center;
  }

  .achieve-text img {
    margin-left: 3px;
    margin-right: 12px;
    border-radius: 50%;
    width: 50px;
  }

  .achieve-score {
    margin-left: auto;
    font-weight: 500;
  }

  .achieve-container > span:nth-child(even) {
    background: rgb(248, 248, 248);
  }

  .achieve-description {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
  }

  .achieve-description strong {
    width: 100%;
  }
</style>

<div class="achieve-container">
  {#if achievs.length === 0}
    <slot name="loading" />
  {:else}
    {#each achievs as achieve}
      <span class="achieve-text">
        <img alt="icon" src={achieve[iconProp]} />
        <div class="achieve-description">
          <strong>{achieve[nameProp]}</strong>
          <span>{achieve[descProp]}</span>
        </div>
        <span class="achieve-score">{achieve[pointProp]}</span>
      </span>
    {/each}
  {/if}
</div>
