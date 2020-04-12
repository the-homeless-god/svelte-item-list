<script>
  export let bold = false
  export let header
  export let body
  export let descIsHTML = true

  export let classListModel = {
    item: {
      description: {
        name: 'item-name-text',
        root: 'item-description-root',
        text: 'item-description-text'
      }
    }
  }
</script>

<div class={classListModel.item.description.root}>
  {#if bold}
    <strong class={classListModel.item.description.name}>{header}</strong>
  {:else}
    <span class={classListModel.item.description.name}>{header}</span>
  {/if}
  {#if body}
    {#if descIsHTML}
      <span class={classListModel.item.description.text}>
        {@html body}
      </span>
    {:else}
      <span class={classListModel.item.description.text}>{body}</span>
    {/if}
  {/if}
</div>
