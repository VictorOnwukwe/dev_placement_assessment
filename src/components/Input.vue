<template>
  <div
    style="display:flex;align-items:center;padding:10px"
    :style="{ backgroundColor: color }"
  >
    <i :class="icon.name" :style="{ color: icon.color }"></i>
    <div style="position:relative">
      <span style="position:absolute">{{ placeholder.text }}</span>
      <input class="input" type="text" />
    </div>
  </div>
</template>
<script>
export default {
  name: "m-input",
  props: {
    icon: {
      type: Object,
      default: () => {
        return {
          name: "fas fas-search",
          color: "rgb(180,180,180)",
        };
      },
    },
    placeholder: {
      type: Object,
      default: () => {
        return {
          text: "Enter text here",
          color: "rgb(180,180,180)",
        };
      },
    },
    color: String,
  },
};
</script>
<style scoped>
input {
  border: none;
  background-color: rgba(0,0,0,0);
}
</style>
