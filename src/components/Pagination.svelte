<style>
  .pagination {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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

<script>
  import SymbolEnum from '../enums/symbol.enum'
  import { currentPage } from '../tools/store'

  export let totalItems = 0
  export let pageSize = 1
  export let limit = null
  export let showStepOptions = false

  const handleOptionClick = option => {
    setPage(option.value)
  }

  const setPage = page => {
    currentPage.update(n => page)
  }

  const isCapabilitiedArrow = option => {
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
    currentPage,
    limit = null,
    showStepOptions = false
  }) => {
    const totalPages = Math.ceil(totalItems / pageSize)
    const limitThreshold = getLimitThreshold({ limit })
    const limited = limit && totalPages > limitThreshold

    let options = limited
      ? generateLimitedOptions({ totalPages, limit, currentPage: $currentPage })
      : generateUnlimitedOptions({ totalPages })

    return showStepOptions
      ? addStepOptions({ options, currentPage, totalPages })
      : options
  }

  const addStepOptions = ({ options, totalPages }) => {
    return [
      {
        type: 'symbol',
        symbol: SymbolEnum.START_PAGE,
        value: 1
      },
      {
        type: 'symbol',
        symbol: SymbolEnum.PREVIOUS_PAGE,
        value: $currentPage <= 1 ? 1 : $currentPage - 1
      },
      ...options,
      {
        type: 'symbol',
        symbol: SymbolEnum.NEXT_PAGE,
        value: $currentPage >= totalPages ? totalPages : $currentPage + 1
      },
      {
        type: 'symbol',
        symbol: SymbolEnum.END_PAGE,
        value: totalPages
      }
    ]
  }

  const generateUnlimitedOptions = ({ totalPages }) => {
    return new Array(totalPages).fill(null).map((value, index) => ({
      type: 'number',
      value: index + 1
    }))
  }

  const generateLimitedOptions = ({ totalPages, limit, currentPage }) => {
    const boundarySize = limit * 2 + 2
    const firstBoundary = 1 + boundarySize
    const lastBoundary = totalPages - boundarySize
    const totalShownPages = firstBoundary + 2

    if (currentPage <= firstBoundary - limit) {
      return Array(totalShownPages)
        .fill(null)
        .map((value, index) => {
          if (index === totalShownPages - 1) {
            return {
              type: 'number',
              value: totalPages
            }
          } else if (index === totalShownPages - 2) {
            return {
              type: 'symbol',
              symbol: SymbolEnum.ELLIPSIS,
              value: firstBoundary + 1
            }
          }
          return {
            type: 'number',
            value: index + 1
          }
        })
    } else if (currentPage >= lastBoundary + limit) {
      return Array(totalShownPages)
        .fill(null)
        .map((value, index) => {
          if (index === 0) {
            return {
              type: 'number',
              value: 1
            }
          } else if (index === 1) {
            return {
              type: 'symbol',
              symbol: SymbolEnum.ELLIPSIS,
              value: lastBoundary - 1
            }
          }
          return {
            type: 'number',
            value: lastBoundary + index - 2
          }
        })
    } else if (
      currentPage >= firstBoundary - limit &&
      currentPage <= lastBoundary + limit
    ) {
      return Array(totalShownPages)
        .fill(null)
        .map((value, index) => {
          if (index === 0) {
            return {
              type: 'number',
              value: 1
            }
          } else if (index === 1) {
            return {
              type: 'symbol',
              symbol: SymbolEnum.ELLIPSIS,
              value: currentPage - limit + (index - 2)
            }
          } else if (index === totalShownPages - 1) {
            return {
              type: 'number',
              value: totalPages
            }
          } else if (index === totalShownPages - 2) {
            return {
              type: 'symbol',
              symbol: SymbolEnum.ELLIPSIS,
              value: currentPage + limit + 1
            }
          }
          return {
            type: 'number',
            value: currentPage - limit + (index - 2)
          }
        })
    }
  }

  const getLimitThreshold = ({ limit }) => {
    const maximumUnlimitedPages = 3
    const numberOfBoundaryPages = 2
    return limit * 2 + maximumUnlimitedPages + numberOfBoundaryPages
  }

  $: options = generateNavigationOptions({
    totalItems,
    pageSize,
    $currentPage,
    limit,
    showStepOptions
  })
  $: totalPages = Math.ceil(totalItems / pageSize)
</script>

<div class="pagination">
  {#each options as option}
    {#if isCapabilitiedArrow(option)}
      <span
        class="option"
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
          <span class="icon-angle-double-left" />
        {:else if option.type === 'symbol' && option.symbol === SymbolEnum.PREVIOUS_PAGE && $currentPage !== 1}
          <span class="icon-angle-left" />
        {:else if option.type === 'symbol' && option.symbol === SymbolEnum.NEXT_PAGE && $currentPage !== totalPages}
          <span class="icon-angle-right" />
        {:else if option.type === 'symbol' && option.symbol === SymbolEnum.END_PAGE && $currentPage !== totalPages}
          <span class="icon-angle-double-right" />
        {/if}
      </span>
    {/if}
  {/each}
</div>
