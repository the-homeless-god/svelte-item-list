import type { Writable } from 'svelte/store'

import type { Configuration } from '../configurations/config.interface'
import { getDoubleSearchStep, getSearchStep } from './pagination.tool'

interface SearchEvent {
  detail: string
}

export const isQuery = (query: string): boolean => {
  return query.length > 0
}

export const isSearch = (value: string, query: string): boolean =>
  value.includes(query)

export const search = (
  event: SearchEvent,
  source: unknown[],
  destination: Writable<unknown[]>,
  configuration: Configuration,
  page: number
) => {
  const { detail } = event

  if (isQuery(detail)) {
    destination.set(
      source.filter((item) => {
        const value = item[configuration.global.search.property]
        return value && isSearch(value, detail)
      })
    )
  } else if (configuration.pagination.enabled) {
    const { size } = configuration.pagination.page
    destination.set(
      source.slice(getSearchStep(page, size), getDoubleSearchStep(page, size))
    )
  } else {
    destination.set(source)
  }
}
