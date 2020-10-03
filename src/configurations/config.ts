import { bodyConfig } from './body.config'
import { classList } from './config.dictionary'
import type { Configuration } from './config.interface'
import { getEndpointConfig } from './endpoint.config'
import { filterConfig } from './filter.config'
import { headerConfig } from './header.config'
import { getItemConfig } from './item.config'
import { paginationConfig } from './pagination.config'
import { searchConfig } from './search.config'

export const getConfiguration = (): Configuration => ({
  log: {
    enabled: true,
  },
  global: {
    classList,
    isVisible: false,
    body: bodyConfig,
    header: headerConfig,
    search: searchConfig,
    filter: filterConfig,
  },
  endpoint: getEndpointConfig(),
  pagination: paginationConfig,
  item: getItemConfig(),
})
