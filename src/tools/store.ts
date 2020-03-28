import { writable } from 'svelte/store'

export const items = writable([])
export const paginatedItems = writable([])
export const currentPage = writable(1)

export const initItems = async (
  endpoint: any,
  sortFunc: Function = null,
  needIndex: boolean = false,
  endpointIsStore: boolean = false
) => {
  if (endpointIsStore) {
    endpoint.subscribe((e) => {
      e.sort(sortFunc)

      items.set(e)

      if (needIndex) {
        items.update((item) =>
          item.map((item, index) => {
            item.index = ++index
            return item
          })
        )
      }
    })
  } else {
    let result = await endpoint()
    if (result) {
      if (sortFunc) {
        result.sort(sortFunc)
      }

      if (needIndex) {
        result.forEach((item, index) => {
          item.index = ++index
          return item
        })
      }

      items.set(result)
    }
  }
}
