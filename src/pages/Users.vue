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
    search: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
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
    filterByAll() {
      let matches = (user, search) => {
        let userString = `${user.location.street.number} ${
          user.location.street.name
        } ${user.location.city}, ${user.location.state}${
          this.$store.getters["showCountry"] ? " " + user.location.country : ""
        } ${user.name.first} ${user.name.last} ${user.email}`.toLocaleLowerCase();

        return userString.includes(search.trim().toLowerCase());
      };
      this.displayUsers = [];
      this.fetched = false;
      let country = this.country;
      let gender = this.gender;
      this.displayUsers = this.users.filter(
        (user) =>
          matches(user, this.search) &&
          ((gender == "all" && country == "all") ||
            (gender == "all" && user.location.country == country) ||
            (country == "all" && user.gender == gender) ||
            (user.location.country == country && user.gender == gender))
      );
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
  },
  watch: {
    page() {
      this.updateCurrentUsers();
    },
    gender() {
      this.filterByAll();
    },
    users() {
      this.filterByAll();
    },
    search() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.filterByAll();
      }, 500);
    },
    country() {
      this.filterByAll();
    },
  },
  mounted() {
    this.filterByAll();
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
