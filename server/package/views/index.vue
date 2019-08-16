<template>
<div>
  <div>
        <router-view></router-view>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      current: ['mail'],
    }
  },
}
</script>