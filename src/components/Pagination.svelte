<script>
  import { createEventDispatcher } from 'svelte'
  import { generateNavigationOptions } from '../tools/navigation.tool'
  import SymbolEnum from '../enums/symbol.enum'

  const dispatch = createEventDispatcher()

  export let totalItems = 0
  export let pageSize = 1
  export let currentPage = 1
  export let limit = null
  export let showStepOptions = false

  $: options = generateNavigationOptions({
    totalItems,
    pageSize,
    currentPage,
    limit,
    showStepOptions
  })
  $: totalPages = Math.ceil(totalItems / pageSize)

  const handleOptionClick = option => {
    dispatch('setPage', { page: option.value })
  }

  export const setPage = page => {
    currentPage = page
  }

  const isCapabilitiedArrow = option => {
    let output = true

    if (option.type === 'symbol') {
      switch (option.symbol) {
        case SymbolEnum.PREVIOUS_PAGE:
          output = currentPage !== 1
          break
        case SymbolEnum.NEXT_PAGE:
          output = currentPage !== totalPages
          break

        case SymbolEnum.START_PAGE:
          output = currentPage > 3
          break
        case SymbolEnum.END_PAGE:
          output = currentPage < totalPages - 2
          break
      }
    }

    if (option.type === 'number') {
      if (currentPage - option.value >= 3 && currentPage - option.value >= 0) {
        output = false
      } else if (
        currentPage - option.value <= -3 &&
        currentPage - option.value <= 0
      ) {
        output = false
      }
    }
    return output
  }
</script>

<style>
  .pagination {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background: #fff;
    margin-top: 20px;
  }

  .pagination > * {
    font-size: 18px;
  }

  .pagination :global(.option) {
    padding: 5px 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s all ease-out;
    user-select: none;
    color: black;
    background-color: #fff;
    border-radius: 4px;
    margin: 5px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  .pagination :global(.option:hover) {
    transform: scale(1.1);
  }
  .pagination :global(.option.current) {
    color: #747474;
  }
</style>

<div class="pagination">
  {#each options as option}
    {#if isCapabilitiedArrow(option)}
      <span
        class="option"
        class:number={option.type === 'number'}
        class:prev={option.type === 'symbol' && option.symbol === SymbolEnum.PREVIOUS_PAGE}
        class:next={option.type === 'symbol' && option.symbol === SymbolEnum.NEXT_PAGE}
        class:inactive={(option.type === 'symbol' && option.symbol === SymbolEnum.NEXT_PAGE && currentPage >= totalPages) || (option.type === 'symbol' && option.symbol === SymbolEnum.PREVIOUS_PAGE && currentPage <= 1)}
        class:ellipsis={option.type === 'symbol' && option.symbol === SymbolEnum.ELLIPSIS}
        class:current={option.type === 'number' && option.value === currentPage}
        on:click={() => handleOptionClick(option)}>
        {#if option.type === 'number'}
          <slot name="number" value={option.value}>
            <span>{option.value}</span>
          </slot>
        {:else if option.type === 'symbol' && option.symbol === SymbolEnum.ELLIPSIS}
          <slot name="ellipsis">
            <span>...</span>
          </slot>
        {:else if option.type === 'symbol' && option.symbol === SymbolEnum.START_PAGE && currentPage !== 1}
          <slot name="end">
            <span class="icon-angle-double-left" />
          </slot>
        {:else if option.type === 'symbol' && option.symbol === SymbolEnum.PREVIOUS_PAGE && currentPage !== 1}
          <slot name="prev">
            <span class="icon-angle-left" />
          </slot>
        {:else if option.type === 'symbol' && option.symbol === SymbolEnum.NEXT_PAGE && currentPage !== totalPages}
          <slot name="next">
            <span class="icon-angle-right" />
          </slot>
        {:else if option.type === 'symbol' && option.symbol === SymbolEnum.END_PAGE && currentPage !== totalPages}
          <slot name="end">
            <span class="icon-angle-double-right" />
          </slot>
        {/if}
      </span>
    {/if}
  {/each}
</div>
