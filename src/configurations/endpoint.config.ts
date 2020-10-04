import { PropertyEnum } from './config.dictionary'
import type { EndpointConfig } from './config.interface'

export const getEndpointConfig = (
  point: string = PropertyEnum.point
): EndpointConfig => ({
  isStore: false,
  value: async () => [],
  sortFunction: (left: unknown, right: unknown) => {
    try {
      return left[point] - right[point]
    } catch {
      return -1
    }
  },
})
