<template>
  <div class="main">
    <div></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
<style scoped>
.main{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>