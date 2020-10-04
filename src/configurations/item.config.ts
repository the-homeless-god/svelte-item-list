import type {
  BoldConfig,
  DescriptionConfig,
  ElementConfig,
  Item,
  PointConfig,
} from './config.interface'
import { PropertyEnum, SettingEnum } from './config.dictionary'

export const name: ElementConfig = {
  enabled: true,
  property: PropertyEnum.name,
}

export const description: DescriptionConfig = {
  enabled: true,
  property: PropertyEnum.description,
  isHTML: true,
}

export const point: PointConfig = {
  enabled: true,
  property: PropertyEnum.point,
  isTimeago: false,
}

export const icon: ElementConfig = {
  enabled: true,
  property: PropertyEnum.icon,
}

export const index: ElementConfig = {
  enabled: true,
}

export const getBoldConfig = (count: number): BoldConfig => ({
  enabled: true,
  count,
})

export const highlight: ElementConfig = {
  enabled: true,
  property: PropertyEnum.highlight,
}

export const getItemConfig = (boldCount: number = SettingEnum.bold): Item => ({
  bold: getBoldConfig(boldCount),
  description,
  name,
  point,
  icon,
  index,
  highlight,
})
