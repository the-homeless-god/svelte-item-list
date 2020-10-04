import { DictionaryEnum, PropertyEnum } from './config.dictionary'
import type { Config } from './config.interface'

export const searchConfig: Config = {
  enabled: true,
  placeholder: DictionaryEnum.search.placeholder,
  icon: {
    enabled: true,
  },
  property: PropertyEnum.name,
}
