import { DictionaryEnum } from './config.dictionary'
import type { Config } from './config.interface'

export const filterConfig: Config = {
  enabled: true,
  placeholder: DictionaryEnum.filter.placeholder,
  icon: {
    enabled: true,
  },
}
