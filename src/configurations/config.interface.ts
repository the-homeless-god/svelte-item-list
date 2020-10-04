import type { Writable } from 'svelte/store'

export interface ElementConfig {
  enabled: boolean
  property?: string
}

export type Config = ElementConfig & {
  placeholder?: string
  icon?: Image
  text?: string
}

interface Image {
  enabled: boolean
}

export type BoldConfig = Config & { count: number }
export type PointConfig = Config & { isTimeago: boolean }
export type DescriptionConfig = Config & { isHTML: boolean }
export type PageConfig = Config & {
  page: {
    size: number
    currentStore: Writable<number> | null
  }
  step: {
    enabled: boolean
    limit: number
  }
}

export interface Item {
  onClick?: <T>(_: Item) => T

  bold: BoldConfig
  description: DescriptionConfig
  highlight: ElementConfig
  icon: ElementConfig
  index: ElementConfig
  name: Config
  point: PointConfig
}

export interface EndpointConfig {
  isStore: boolean
  value: () => Promise<[]>
  sortFunction: (left: unknown, right: unknown) => number
}

export interface Configuration {
  log: {
    enabled: boolean
  }
  global: {
    classList: ClassListModel
    isVisible: boolean
    body: ElementConfig
    header: Config
    search: Config
    filter: Config
  }
  endpoint: EndpointConfig
  item: Item
  pagination: PageConfig
}

export interface Rootable {
  root: string
}

export type ClassListModel = Rootable & {
  header: string

  item: Rootable & {
    description: Rootable & {
      name: string
      text: string
    }
    icon: string
    index: string
    point: string
  }

  pagination: Rootable & {
    option: string
    arrow: {
      doubleLeft: string
      left: string
      right: string
      doubleRight: string
    }
  }

  search: Rootable & {
    input: string
    icon: Rootable
  }

  filter: Rootable & {
    select: string
    icon: Rootable
  }
}
