[![npm][npm]][npm-url]

Svelte. List of achievements.

## Screenshot

![Screenshot](https://raw.githubusercontent.com/Zimtir/svelte-achieve-list/master/assets/example.png 'Screenshot')

## Install

```bash
npm install --save svelte-achieve-list
```

## Example

Look at the [example folder][example-folder-url] for a basic working example.

## Usage

```html
<!-- App.html -->
<AchieveList
  endpoint={async () => {
    return [
      {
        name: 'Achieve name',
        icon: '/favicon.png',
        description: '',
        point: 100
      }
    ]
  }}>
  <div slot="loading">...loading</div>
</AchieveList>

<script>
  import AchieveList from 'svelte-achieve-list';
</script>
```

## API

The achieve list component is the only export of the module.

```javascript
import AchieveList from 'svelte-achieve-list'
```

###### Properties

| Property    | Default Value | Description                                               |
| :---------- | :------------ | :-------------------------------------------------------- |
| `endpoint`  | undefined     | The endpoint function with return of values               |
| `nameProp`  | `name`        | The key of name property in the object by endpoint.       |
| `descProp`  | `description` | The key of description property in the object by endpoint |
| `pointProp` | `point`       | The key of point property in the object by endpoint.      |
| `iconProp`  | `icon`        | The key of icon property in the object by endpoint.       |

[npm]: https://img.shields.io/npm/v/svelte-achieve-list.svg
[npm-url]: https://npmjs.com/package/svelte-achieve-list
[example-folder-url]: https://github.com/Zimtir/svelte-achieve-list/tree/master/example
