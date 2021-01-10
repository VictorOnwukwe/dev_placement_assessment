<template>
  <Home/>
</template>

<script>
import Home from "./pages/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

body {
  background-color: #262a41;
  font-family: "Poppins", sans-serif;
  padding: 0;
}
*>*{
  font-family: "Poppins", sans-serif;
}
html {
  padding: 0;
}
</style>
