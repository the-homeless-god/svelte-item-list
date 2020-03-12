import { writable } from 'svelte/store'

export const items = writable([])

export const initItems = async (endpoint: Function, sortFunc: Function = null, isUpdate: boolean = false) => {
  let result = await endpoint()
  if (result) {
    if (sortFunc) {
      result.sort(sortFunc)
    }

    if (isUpdate) {
      items.update(result)
    } else {
      items.set(result)
    }
  }
}
