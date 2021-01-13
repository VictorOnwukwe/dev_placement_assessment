<template>
  <div style="position:relative;z-index:2">
    <div
      v-if="users.length == 0"
      style="display:flex;justify-content:center;align-items:center;height:100%"
    >
      <div class="loader"></div>
    </div>
    <div v-else class="display">
      <preview
        v-for="user in currentUsers"
        :key="user.email"
        :user="user"
      ></preview>
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
    gender: {
      type: String,
      default: "all",
    },
  },
  data() {
    return {
      currentUsers: [],
      displayUsers: [],
    };
  },
  methods: {
    updateCurrentUsers() {
      let start = (this.page - 1) * 3;
      let end = start + 3;
      this.currentUsers = this.displayUsers.slice(start, end);
    },
    filterByGender() {
      let val = this.gender;
      if (val == "male") {
        this.displayUsers = this.users.filter((user) => user.gender == "male");
      } else if (val == "female") {
        this.displayUsers = this.users.filter(
          (user) => user.gender == "female"
        );
      } else {
        this.displayUsers = this.users;
      }
    },
  },
  computed: {
    page() {
      return this.$store.getters["users/currentPage"];
    },
    users() {
      return this.$store.getters["users/allUsers"];
    },
  },
  watch: {
    page() {
      this.updateCurrentUsers();
    },
    gender() {
      this.$store.dispatch("users/setCurrentPage", 1);
      this.filterByGender();
      this.updateCurrentUsers();
    },
    users() {
      this.filterByGender();
      this.updateCurrentUsers();
    },
  },
  mounted() {
    this.filterByGender();
    this.updateCurrentUsers();
  },
};
</script>
<style scoped>
.display *:nth-child(n + 2) {
  margin-top: 16px;
}
.absolute {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ;
}
.loader {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-top: 4px solid #f7f7ff;
  border-right: 4px solid #f7f7ff;
  border-bottom: 4px solid #e2e3ec;
  border-left: 4px solid #e2e3ec;
  animation: rotate 0.5s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
