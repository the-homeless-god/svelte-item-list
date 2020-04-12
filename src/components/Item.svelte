<script>
  import Index from './item/index.svelte'
  import Icon from './item/icon.svelte'
  import Description from './item/description.svelte'
  import Sub from './item/sub.svelte'

  export let item
  export let configuration

  export let classListModel
</script>

<Index
  {classListModel}
  visible={configuration.index.enabled}
  index={item.index}
/>

<Icon
  {classListModel}
  visible={configuration.icon.enabled}
  src={item[configuration.icon.prop]}
/>

<Description
  {classListModel}
  visible={configuration.description.enabled}
  bold={configuration.bold.count <= item.index}
  descIsHTML={configuration.description.isHTML}
  header={item[configuration.name.prop]}
  body={item[configuration.description.prop]}
/>

<Sub
  {classListModel}
  visible={configuration.point.enabled}
  value={item[configuration.point.prop]}
  needTimeago={configuration.point.isTimeago}
/>
