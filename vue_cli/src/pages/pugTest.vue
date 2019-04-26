<template lang="pug">
  .mian 
    h1 {{msg}}
    div
      a(href="#/") go home
</template>
 
<script>
export default {
  name: 'pugTest',
  data () {
    return {
      msg: 'pug Test go'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
