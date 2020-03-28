<script>
  export let value
  export let visible = false
  export let needTimeago = false

  import * as timeago from 'timeago.js'
</script>

<style>
  .item-score {
    margin-left: auto;
    font-weight: 500;
  }
</style>

{#if visible}
  <span class="item-score">
    {#if !needTimeago}
      {value}
    {:else}
      <time datetime={value}>{timeago.format(value)}</time>
    {/if}
  </span>
{/if}
