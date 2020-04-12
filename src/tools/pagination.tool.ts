import SymbolEnum from '../enums/symbol.enum'

export const getLimitThreshold = ({ limit }) => {
  const maximumUnlimitedPages = 3
  const numberOfBoundaryPages = 2
  return limit * 2 + maximumUnlimitedPages + numberOfBoundaryPages
}

export const generateLimitedOptions = ({ totalPages, limit, currentPage }) => {
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
            value: totalPages,
          }
        } else if (index === totalShownPages - 2) {
          return {
            type: 'symbol',
            symbol: SymbolEnum.ELLIPSIS,
            value: firstBoundary + 1,
          }
        }
        return {
          type: 'number',
          value: index + 1,
        }
      })
  } else if (currentPage >= lastBoundary + limit) {
    return Array(totalShownPages)
      .fill(null)
      .map((value, index) => {
        if (index === 0) {
          return {
            type: 'number',
            value: 1,
          }
        } else if (index === 1) {
          return {
            type: 'symbol',
            symbol: SymbolEnum.ELLIPSIS,
            value: lastBoundary - 1,
          }
        }
        return {
          type: 'number',
          value: lastBoundary + index - 2,
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
            value: 1,
          }
        } else if (index === 1) {
          return {
            type: 'symbol',
            symbol: SymbolEnum.ELLIPSIS,
            value: currentPage - limit + (index - 2),
          }
        } else if (index === totalShownPages - 1) {
          return {
            type: 'number',
            value: totalPages,
          }
        } else if (index === totalShownPages - 2) {
          return {
            type: 'symbol',
            symbol: SymbolEnum.ELLIPSIS,
            value: currentPage + limit + 1,
          }
        }
        return {
          type: 'number',
          value: currentPage - limit + (index - 2),
        }
      })
  }
}

export const generateUnlimitedOptions = ({ totalPages }) => {
  return new Array(totalPages).fill(null).map((value, index) => ({
    type: 'number',
    value: index + 1,
  }))
}

export const addStepOptions = ({ options, currentPage, totalPages }) => {
  return [
    {
      type: 'symbol',
      symbol: SymbolEnum.START_PAGE,
      value: 1,
    },
    {
      type: 'symbol',
      symbol: SymbolEnum.PREVIOUS_PAGE,
      value: currentPage <= 1 ? 1 : currentPage - 1,
    },
    ...options,
    {
      type: 'symbol',
      symbol: SymbolEnum.NEXT_PAGE,
      value: currentPage >= totalPages ? totalPages : currentPage + 1,
    },
    {
      type: 'symbol',
      symbol: SymbolEnum.END_PAGE,
      value: totalPages,
    },
  ]
}
