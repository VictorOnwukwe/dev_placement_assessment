<template>
  <div style="position:relative;z-index:2">
    <div v-if="displayUsers.length > 0" class="display">
      <preview
        v-for="user in currentUsers"
        :key="user.email"
        :user="user"
      ></preview>
    </div>
    <div
      v-else
      style="display:flex;justify-content:center;align-items:center;height:100%"
    >
      <p v-if="fetched">No matches found...</p>
      <div v-else class="loader"></div>
    </div>
  </div>
</template>
<script>
import UserPreview from "../components/UserPreview";
let timeout;
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
      fetched: false,
    };
  },
  methods: {
    updateCurrentUsers() {
      let start = (this.page - 1) * 3;
      let end = start + 3;
      this.currentUsers = this.displayUsers.slice(start, end);
    },
    filterByGender() {
      this.displayUsers = [];
      this.fetched = false;
      let gender = this.gender;
      if (gender == "male") {
        this.displayUsers = this.users.filter((user) => user.gender == "male");
      } else if (gender == "female") {
        this.displayUsers = this.users.filter(
          (user) => user.gender == "female"
        );
      } else {
        this.displayUsers = this.users;
      }
      this.updateContent();
      setTimeout(() => {
        this.fetched = true;
      }, 1000);
    },
    searchUsers(search) {
      this.displayUsers = [];
      this.fetched = false;
      let gender = this.gender;
      if (gender == "male") {
        this.displayUsers = this.users.filter(
          (user) =>
            user.gender == "male" &&
            (user.name.first + user.name.last)
              .toLowerCase()
              .includes(search.toLowerCase())
        );
      } else if (gender == "female") {
        this.displayUsers = this.users.filter(
          (user) =>
            user.gender == "female" &&
            (user.name.first + user.name.last)
              .toLowerCase()
              .includes(search.toLowerCase())
        );
      } else {
        this.displayUsers = this.users.filter((user) =>
          (user.name.first + user.name.last)
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }
      this.updateContent();
      setTimeout(() => {
        this.fetched = true;
      }, 1000);
    },
    updateContent() {
      this.updateCurrentUsers();
      this.$store.dispatch("setCurrentPage", 1);
      this.$emit("listChanged", this.displayUsers.length);
    },
  },
  computed: {
    page() {
      return this.$store.getters["currentPage"];
    },
    users() {
      return this.$store.getters["allUsers"];
    },
    search() {
      return this.$store.getters["search"];
    },
  },
  watch: {
    page() {
      this.updateCurrentUsers();
    },
    gender() {
      this.filterByGender();
    },
    users() {
      this.filterByGender();
    },
    search(val) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.searchUsers(val);
      }, 500);
    },
  },
  mounted() {
    this.filterByGender();
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
