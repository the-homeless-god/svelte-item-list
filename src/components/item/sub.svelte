<script>
  export let value
  export let visible = false
  export let needTimeago = false
  export let classListModel = {
    item: {
      point: 'item-point'
    }
  }

  import * as timeago from 'timeago.js'
</script>

{#if visible}
  <span class={classListModel.item.point}>
    {#if !needTimeago}
      {value}
    {:else}
      <time datetime={value}>{timeago.format(value)}</time>
    {/if}
  </span>
{/if}
