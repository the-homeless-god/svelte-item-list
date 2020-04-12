<script>
  export let src
  export let visible = false
  export let classListModel = {
    item: {
      icon: 'item-icon'
    }
  }
</script>

{#if visible}
  <img class={classListModel.item.icon} alt="icon" {src} />
{/if}
