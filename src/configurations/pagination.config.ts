import type { PageConfig } from './config.interface'

import { SettingEnum } from './config.dictionary'

export const paginationConfig: PageConfig = {
  enabled: true,
  page: {
    size: SettingEnum.pageSize,
    currentStore: null,
  },
  step: {
    enabled: true,
    limit: SettingEnum.stepLimit,
  },
}
