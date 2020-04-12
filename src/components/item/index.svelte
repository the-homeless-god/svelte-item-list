<script>
  export let index
  export let visible = false
  export let classListModel = {
    item: {
      index: 'item-index'
    }
  }
</script>

{#if visible}
  <span class={classListModel.item.index}>{index}</span>
{/if}
