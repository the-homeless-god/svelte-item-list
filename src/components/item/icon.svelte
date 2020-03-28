<style>
  .item-icon {
    margin-left: 3px;
    margin-right: 12px;
    border-radius: 50%;
    width: 50px;
  }
</style>

<script>
  export let src
  export let visible = false
</script>

{#if visible}

  <img class="item-icon" alt="icon" {src} />
{/if}
