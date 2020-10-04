<script>
  import { writable } from 'svelte/store'

  import SymbolEnum from '../enums/symbol.enum'
  import {
    generateUnlimitedOptions,
    getLimitThreshold,
    generateLimitedOptions,
    addStepOptions,
  } from '../tools/pagination.tool'

  export let enabled: boolean = false

  export let totalItems = 0
  export let pageSize = 1
  export let currentPage = writable(0)
  export let limit = null
  export let showStepOptions = false
  export let classListModel = {
    pagination: {
      root: 'pagination',
      option: 'option',
      arrow: {
        doubleLeft: 'icon-angle-double-left',
        left: 'icon-angle-left',
        right: 'icon-angle-right',
        doubleRight: 'icon-angle-double-right',
      },
    },
  }

  const handleOptionClick = (option) => {
    setPage(option.value)
  }

  const setPage = (page) => {
    currentPage.update((n) => page)
  }

  const isCapabilitiedArrow = (option) => {
    let output = true

    if (option.type === 'symbol') {
      switch (option.symbol) {
        case SymbolEnum.PREVIOUS_PAGE:
          output = $currentPage !== 1
          break
        case SymbolEnum.NEXT_PAGE:
          output = $currentPage !== totalPages
          break

        case SymbolEnum.START_PAGE:
          output = $currentPage > 3
          break
        case SymbolEnum.END_PAGE:
          output = $currentPage < totalPages - 2
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

  const generateNavigationOptions = ({
    totalItems,
    pageSize,
    limit = null,
    showStepOptions = false,
  }) => {
    const totalPages = Math.ceil(totalItems / pageSize)
    const limitThreshold = getLimitThreshold({ limit })
    const limited = limit && totalPages > limitThreshold

    let options = limited
      ? generateLimitedOptions({ totalPages, limit, currentPage: $currentPage })
      : generateUnlimitedOptions({ totalPages })

    return showStepOptions
      ? addStepOptions({ options, currentPage: $currentPage, totalPages })
      : options
  }

  $: options = generateNavigationOptions({
    totalItems,
    pageSize,
    limit,
    showStepOptions,
  })
  $: totalPages = Math.ceil(totalItems / pageSize)
</script>

{#if enabled}
  <div class={classListModel.pagination.root}>
    {#each options as option}
      {#if isCapabilitiedArrow(option)}
        <span
          class={classListModel.pagination.option}
          class:number={option.type === 'number'}
          class:prev={option.type === 'symbol' && option.symbol === SymbolEnum.PREVIOUS_PAGE}
          class:next={option.type === 'symbol' && option.symbol === SymbolEnum.NEXT_PAGE}
          class:inactive={(option.type === 'symbol' && option.symbol === SymbolEnum.NEXT_PAGE && $currentPage >= totalPages) || (option.type === 'symbol' && option.symbol === SymbolEnum.PREVIOUS_PAGE && $currentPage <= 1)}
          class:ellipsis={option.type === 'symbol' && option.symbol === SymbolEnum.ELLIPSIS}
          class:current={option.type === 'number' && option.value === $currentPage}
          on:click={() => handleOptionClick(option)}
        >
          {#if option.type === 'number'}
            <span>{option.value}</span>
          {:else if option.type === 'symbol' && option.symbol === SymbolEnum.ELLIPSIS}
            <span>...</span>
          {:else if option.type === 'symbol' && option.symbol === SymbolEnum.START_PAGE && $currentPage !== 1}
            <span class={classListModel.pagination.arrow.doubleLeft} />
          {:else if option.type === 'symbol' && option.symbol === SymbolEnum.PREVIOUS_PAGE && $currentPage !== 1}
            <span class={classListModel.pagination.arrow.left} />
          {:else if option.type === 'symbol' && option.symbol === SymbolEnum.NEXT_PAGE && $currentPage !== totalPages}
            <span class={classListModel.pagination.arrow.right} />
          {:else if option.type === 'symbol' && option.symbol === SymbolEnum.END_PAGE && $currentPage !== totalPages}
            <span class={classListModel.pagination.arrow.doubleRight} />
          {/if}
        </span>
      {/if}
    {/each}
  </div>
{/if}
