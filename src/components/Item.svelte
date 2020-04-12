<script>
  import Index from './item/index.svelte'
  import Icon from './item/icon.svelte'
  import Description from './item/description.svelte'
  import Sub from './item/sub.svelte'

  export let needIcon
  export let needIndex
  export let needTimeago
  export let needPoint

  export let index
  export let bold
  export let icon
  export let body
  export let header
  export let sub

  export let classListModel

  export let descIsHTML
</script>

<Index {classListModel} visible={needIndex} {index} />
<Icon {classListModel} visible={needIcon} src={icon} />
<Description {classListModel} {descIsHTML} {bold} {header} {body} />
<Sub {classListModel} visible={needPoint} value={sub} {needTimeago} />
