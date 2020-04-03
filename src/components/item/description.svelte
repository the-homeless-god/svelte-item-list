<style>
  .item-description {
    display: flex;
    flex-wrap: wrap;
  }

  .item-description strong {
    width: 100%;
  }
</style>

<script>
  export let bold = false
  export let header
  export let body
  export let descIsHTML
</script>

<div class="item-description">
  {#if bold}
    <strong class="item-name-text">{header}</strong>
  {:else}
    <span class="item-name-text">{header}</span>
  {/if}
  {#if body}
    {#if descIsHTML}
      <span class="item-description-text">
        {@html body}
      </span>
    {:else}
      <span class="item-description-text">{body}</span>
    {/if}
  {/if}
</div>
