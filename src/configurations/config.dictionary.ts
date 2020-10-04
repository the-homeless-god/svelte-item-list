import type { ClassListModel } from './config.interface'

export const PropertyEnum = {
  icon: 'icon',
  name: 'name',
  description: 'description',
  point: 'point',
  highlight: 'highlight',
}

export const SettingEnum = {
  stepLimit: 1,
  pageSize: 3,
  bold: 5,
}

export const DictionaryEnum = {
  header: '',
  filter: {
    placeholder: 'Filter right now',
  },
  search: {
    placeholder: 'Search right now',
  },
}

export const classList: ClassListModel = {
  root: 'item-list__item-container',
  header: 'item-list__header_text',
  item: {
    root: 'item_list__item-text',
    description: {
      name: 'item_list_item-name-text',
      root: 'item-list__description-root',
      text: 'item-list__description-text',
    },
    icon: 'item-list__item-icon',
    index: 'item-list__item-index',
    point: 'item-list__item-point',
  },

  pagination: {
    root: 'item-list__pagination',
    option: 'pagination__option',
    arrow: {
      doubleLeft: 'icon-angle-double-left',
      left: 'icon-angle-left',
      right: 'icon-angle-right',
      doubleRight: 'icon-angle-double-right',
    },
  },

  search: {
    root: 'item-list__search',
    input: 'item-list__search-input',
    icon: {
      root: 'icon-search',
    },
  },

  filter: {
    root: 'item-list__select',
    select: 'item-select__filter',
    icon: {
      root: 'icon-th-list',
    },
  },
}
