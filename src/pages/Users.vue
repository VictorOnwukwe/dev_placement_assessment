<template>
  <div>
    <div v-if="users.length == 0">Loading...</div>
    <div v-else>
      <preview v-for="(user, index) in currentUsers" :key="index" :user="user" style="margin-bottom:1em"></preview>
    </div>
  </div>
</template>
<script>
import UserPreview from "../components/UserPreview";
export default {
  components: {
    preview: UserPreview,
  },
  props: {
      users: Array,
      page: Number
  },
  computed: {
      currentUsers(){
          return this.users.slice((this.page - 1) * 3, 3);
      }
  }
};
</script>
