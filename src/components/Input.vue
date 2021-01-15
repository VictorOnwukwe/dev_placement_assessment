<template>
  <div
    class="input-body"
    :class="disabled ? 'disabled' : null"
    @click="focus()"
    :style="{
      backgroundColor: backgroundColor,
      borderRadius: radius,
      padding: padding,
    }"
  >
    <i :class="icon" :style="{ color: iconColor }"></i>
    <div style="position:relative;flex-grow:1;padding-right:1.2em;overflow:hidden;text-overflow:ellipsis">
      <div style="position:absolute;left:16px;text-overflow:ellipsis">
      <span
        style="letter-spacing: -0.02px;white-space:nowrap"
        :style="{
          fontSize: placeholderSize,
          fontWeight: placeholderWeight,
          top: `calc((80% - ${placeholderSize}) / 2)`,
          color: placeholderColor,
        }"
        v-show="input.length == 0"
        >{{ placeholder }}</span
      ></div>
      <input
        :disabled="disabled"
        :id="id"
        :style="{ color: color }"
        v-model="input"
        type="text"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "m-input",
  props: {
    icon: {
      type: String,
      default: "fas fa-search",
    },
    iconColor: {
      type: String,
      default: "rgba(0,0,0,0.62)",
    },
    placeholder: {
      type: String,
      default: "Enter text here",
    },
    placeholderColor: {
      type: String,
      default: "rgba(0,0,0,0.8)",
    },
    placeholderSize: {
      type: String,
      default: "14px",
    },
    placeholderWeight: {
      type: String,
      default: "normal",
    },
    color: {
      type: String,
      default: "rgba(0,0,0,.87)",
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF",
    },
    radius: {
      type: String,
      default: "5px",
    },
    padding: {
      type: String,
      default: "10px",
    },
    id: String,
    disabled: Boolean,
  },
  data() {
    return {
      input: "",
      showPlaceholder: true
    };
  },
  methods: {
    focus() {
      document.querySelector("#" + this.id).focus();
    },
  },
  watch: {
    input(val){
      this.$emit('input', val)
    }
  }
};
</script>
<style scoped>
input {
  border: none;
  background-color: rgba(0, 0, 0, 0);
  position: relative;
  padding-left: 16px;
  width: 100%;
  outline: none;
}
.input-body {
  display: flex;
  align-items: center;
  cursor: text;
  position:relative;
  overflow:hidden;
}
.input-body *{
  text-overflow:ellipsis !important;
}
.input-body.disabled {
  cursor: default;
}
</style>
