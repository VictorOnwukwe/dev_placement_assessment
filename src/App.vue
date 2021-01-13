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
  created(){
    this.$store.dispatch("fetchUsers");
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
:root {
  --accent: #30BBB5;
  --primary: #262A41;
  --text-secondary: rgba(38, 42, 65,.7);
  --text-hint: rgba(38, 42, 65,.52);
  --icon-primary: #BABDD1;

  font-size: 0.9em !important;
}
body {
  background-color: #262a41;
  font-family: "Poppins", sans-serif;
  padding: 0;
  overflow: hidden;
}
*>*{
  font-family: "Poppins", sans-serif;
}
*,
::before,
::after{
  box-sizing: border-box;
}
html {
  padding: 0;
}
button{
  outline:none;
  border:none;
}
</style>
