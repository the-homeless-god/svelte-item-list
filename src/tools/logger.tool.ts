import type { Configuration } from '../configurations/config.interface'

export const log = (config: Configuration, error: Error): void => {
  if (config && config.log && config.log.enabled) {
    console.error(error)
  }
}
