[![npm][npm]][npm-url]

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

## API

The item list component is the only export of the module.

```javascript
import ItemList from 'svelte-item-list'
```

###### Properties

| Property    | Default Value | Description                                               |
| :---------- | :------------ | :-------------------------------------------------------- |
| `endpoint`  | undefined     | The endpoint function with return of values               |
| `nameProp`  | `name`        | The key of name property in the object by endpoint.       |
| `descProp`  | `description` | The key of description property in the object by endpoint |
| `pointProp` | `point`       | The key of point property in the object by endpoint.      |
| `iconProp`  | `icon`        | The key of icon property in the object by endpoint.       |

[npm]: https://img.shields.io/npm/v/svelte-item-list.svg
[npm-url]: https://npmjs.com/package/svelte-item-list
[example-folder-url]: https://github.com/Zimtir/svelte-item-list/tree/master/example
