<style>
  .item-index {
    min-width: 32px;
    text-align: right;
    margin-right: 8px;
  }
</style>

<script>
  export let index
  export let visible = false
</script>

{#if visible}
  <span class="item-index">{index}</span>
{/if}
