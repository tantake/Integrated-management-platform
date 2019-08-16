<template>
  <div id="pageContext">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#pageContext {
  background: #fff;
  margin: 20px;
  box-shadow: 0px 1px 4px 2px rgba(190, 209, 216, 0.48);
  padding: 12px;
  border-radius: 8px;
}
</style>

