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
</script>

<Index visible={needIndex} {index} />
<Icon visible={needIcon} src={icon} />
<Description {bold} {header} {body} />
<Sub visible={needPoint} value={sub} {needTimeago} />
