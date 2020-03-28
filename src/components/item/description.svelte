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
</script>

<div class="item-description">
  {#if bold}
    <strong class="item-name-text">{header}</strong>
  {:else}
    <span class="item-name-text">{header}</span>
  {/if}
  {#if body}
    <span class="item-description-text">{body}</span>
  {/if}
</div>
