[![npm][npm]][npm-url]
[![Github forks](https://img.shields.io/github/forks/Zimtir/svelte-item-list)]()
[![Github stars](https://img.shields.io/github/stars/Zimtir/svelte-item-list)]()
[![Github Downloads (total)](https://img.shields.io/github/downloads/Zimtir/svelte-item-list/total.svg)]()
[![GitHub Downloads (montly)](https://img.shields.io/github/downloads/Zimtir/svelte-item-list/latest/total.svg)]()
[![Github Issues](https://img.shields.io/github/issues/Zimtir/svelte-item-list)]()
[![Github license](https://img.shields.io/github/license/Zimtir/svelte-item-list)]()
[![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2FZimtir%2Fsvelte-item-list)]()

Svelte. Item list.

## Screenshot

![Screenshot](https://raw.githubusercontent.com/Zimtir/svelte-item-list/master/assets/example.png 'Screenshot')

## Install

```bash
npm install --save svelte-item-list
```

## Example

Look at the [example folder][example-folder-url] for a basic working example.

## Usage

```html
<!-- App.html -->
<ItemList
  needPag={true}
  endpoint={async () => {
    return [
      {
        name: 'Item name',
        icon: '/favicon.png',
        description: '',
        point: 100
      }
    ]
  }}>
  <div slot="loading">...loading</div>
</ItemList>

<script>
  import ItemList from 'svelte-item-list';
</script>
```

## Pagination was parsed and reconfigured from

https://github.com/TahaSh/svelte-paginate

## API

The item list component is the only export of the module.

```javascript
import ItemList from 'svelte-item-list'
```

#### Configuration

###### Note: all fields required when you want to create own configuration

- Describe model and pass to component or use default
- Describe own configuration (you can look at example)
- Describe own global-classes (you can look at example)
- Default configuration looks like the following

```javascript
let configuration = {
  global: {
    classListModel: {
      root: 'item-list__item-container',
      header: 'item-list__header_text',
      item: {
        root: 'item_list__item-text',
        description: {
          name: 'item_list_item-name-text',
          root: 'item-list__description-root',
          text: 'item-list__description-text'
        },
        icon: 'item-list__item-icon',
        index: 'item-list__item-index',
        point: 'item-list__item-point'
      },

      pagination: {
        root: 'item-list__pagination',
        option: 'pagination__option',
        arrow: {
          doubleLeft: 'icon-angle-double-left',
          left: 'icon-angle-left',
          right: 'icon-angle-right',
          doubleRight: 'icon-angle-double-right'
        }
      }
    },
    isVisible: false,
    body: {
      enabled: true
    },
    header: {
      enabled: true,
      text: ''
    }
  },
  endpoint: {
    isStore: false,
    value: async () => [],
    sortFunction: (a, b) => {
      return a[pointProp] - b[pointProp]
    }
  },
  pagination: {
    enabled: true,
    pageSize: 3,
    step: {
      limit: 1,
      enabled: true
    }
  },
  item: {
    clickFunction: item => {},
    bold: {
      enabled: true,
      count: 5
    },
    name: {
      enabled: true,
      prop: 'name'
    },
    description: {
      enabled: true,
      prop: 'description',
      isHTML: true
    },
    point: {
      enabled: true,
      prop: 'point',
      isTimeago: false
    },
    icon: {
      enabled: true,
      prop: 'icon'
    },
    index: {
      enabled: true
    },
    light: {
      prop: 'light'
    }
  }
}
```

[npm]: https://img.shields.io/npm/v/svelte-item-list.svg
[npm-url]: https://npmjs.com/package/svelte-item-list
[example-folder-url]: https://github.com/Zimtir/svelte-item-list/tree/master/example

## todo

- drop non-required fields from config to use default when not assigned
- add animations to config
- add search
- add filters
- add graphs
