<template>
  <div class="main">
    <div style="width:50%;padding: 2em 3em;display:flex">
      <div style="margin:auto;max-width:450px;width:100%">
        <h1 style="color:white;line-height:1">
          <span style="font-weight:200;font-size:44px;position:relative;top:2px"
            >Hello, </span
          ><span style="font-weight:600">Emerald</span>
        </h1>
        <p
          style="color:rgba(255,255,255,.66);font-weight:200;font-size:14px;margin-bottom:32px"
        >
          Welcome to your dashboard, kindly sort through the user base
        </p>
        <m-input
          iconColor="white"
          background-color="#3C3F54"
          color="rgba(255,255,255,.87)"
          radius="16px"
          placeholder-color="rgba(255,255,255,.7)"
          placeholder-weight="500"
          placeholder="Find a user"
          padding="15px 20px"
          style="margin-bottom:48px"
          id="input1"
        ></m-input>
        <p style="color: rgba(255,255,255,0.7);margin-bottom:32px">
          Show Users
        </p>
        <div class="nav-menu" style="display:flex">
          <div>
            <router-link class="nav" to="/" style="text-decoration:none">
              <button
                class="nav-button"
                style="background-color:#F935A9;"
                id="all-nav-button"
              >
                <i class="fas fa-users"></i>
              </button>
            </router-link>
            <span style="color:rgba(255,255,255,.7);font-size:12px"
              >All Users</span
            >
          </div>
          <div>
            <router-link to="/male" class="nav" style="text-decoration:none">
              <button
                style="background-color:#30BBB5;"
                class="nav-button"
                id="male-nav-button"
              >
                <i class="fas fa-male"></i>
              </button>
            </router-link>
            <span style="color:rgba(255,255,255,.7);font-size:12px"
              >Male Users</span
            >
          </div>
          <div>
            <router-link to="/female" class="nav" style="text-decoration:none">
              <button
                style="background-color:#7946C1;position:relative"
                class="nav-button"
                id="female-nav-button"
              >
                <i class="fas fa-female"></i>
              </button>
            </router-link>
            <span style="color:rgba(255,255,255,.7);font-size:12px"
              >Female Users</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="result"
      style="display:flex;flex-direction:column;width:50%;position:relative;"
    >
      <div>
        <h2
          style="font-weight:bolder;color: #262A41; line-height:0
      margin-bottom:0;padding:0 4px;position:absolute;transition:opacity 0.5s ease"
          class="route-display"
          :style="{ opacity: $route.name == 'all users' ? '1' : '0' }"
        >
          All Users
        </h2>
        <h2
          style="font-weight:bolder;color: #262A41; line-height:0
      margin-bottom:0;padding:0 4px;position:absolute;transition:opacity 0.5s ease"
          class="route-display"
          :style="{ opacity: $route.name == 'male users' ? '1' : '0' }"
        >
          Male Users
        </h2>
        <h2
          style="font-weight:bolder;color: #262A41; line-height:0
      margin-bottom:0;padding:0 4px;position:absolute;transition:opacity 0.5s ease"
          class="route-display"
          :style="{ opacity: $route.name == 'female users' ? '1' : '0' }"
        >
          Female Users
        </h2>
        <h2
          style="font-weight:bolder;color: #262A41; line-height:0
      margin-bottom:0;padding:0 4px;position:absolute;transition:opacity 0.5s ease"
          :style="{ opacity: $route.name == 'user' ? '1' : '0' }"
          class="route-display"
        >
          User List
        </h2>
        <p style="color:#262A41;font-size:12px;padding:0 4px;margin-top:44px">
          Filter by
        </p>
      </div>
      <div style="display: flex;margin-top:8px;position:relative;">
        <m-input
          iconColor="#ADAFBC"
          background-color="#E2E3EC"
          color="rgba(0,0,0,.87)"
          radius="999px"
          placeholder-color="rgba(38, 42, 65,.52)"
          placeholder-weight="500"
          placeholder="Find in list"
          padding="10px 16px"
          style="flex-grow:1"
          id="input-2"
          ref="user-search"
          :disabled="notList"
          v-model="search"
        ></m-input>
        <select
          name="Country"
          class="country-select"
          style="margin-left:1em"
          :disabled="notList"
        >
          <option>Country</option>
          <option>good</option>
          <option>great</option>
          <option>nice</option>
          <option>eh</option>
        </select>
        <div style="display:flex;align-items:center;margin-left:1em">
          <label class="switch">
            <input id="show-country-button" type="checkbox" @input="toggleShowCountry" />
            <span class="slider"></span>
          </label>
          <label
            style="font-size:10px;margin-left:4px;white-space:nowrap;font-weight:600;color:rgba(0,0,0,.62)"
            >Show Country</label
          >
        </div>
      </div>
      <div
        class="route-house"
        ref="route-house"
        style="position:relative;margin-top:24px;flex-grow:1;z-index:1"
      >
        <button
          @click="$router.go(-1)"
          style="cursor:pointer;background:inherit;border:none;display:flex;position:absolute;z-index:1;left:0;top:0"
          v-show="notList"
        >
          <i
            class="fas fa-arrow-left"
            style="color:#30BBB5;margin-right:10px;font-size:18px;opacity:.61"
          ></i>
          <span style="color:#262A41;opacity:.52;font-weight:600">RESULTS</span>
        </button>
        <transition :name="transitionName">
          <router-view
            class="router-view"
            style="position:absolute;width:100%;height:100%"
          ></router-view>
        </transition>
      </div>

      <div
        style="padding-top: 16px;margin-top:auto;background-color:#F7F7FF;position:relative;z-index:1;"
      >
        <div style="display:flex;justify-content:space-between">
          <button
            style="border-radius:999px;border:none;background-color:#7946C1;padding:8px 12px"
            class="download-button"
            :disabled="notList"
          >
            <div style="display:flex;align-items:center">
              <i
                class="fas fa-cloud-download-alt"
                style="color:white;font-size:16px"
              ></i>
              <span style="color:white;font-size:10px;margin-left:6px">
                Download results
              </span>
            </div>
          </button>
          <div style="display:flex;align-items:center;">
            <button
              style="margin-left:8px;border:none;padding:6px 12px;border-radius:6px;background-color:#E2E2EA"
              @click="previousPage"
              id="previous-page-button"
              :disabled="page <= 1 || notList"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <button
              @click="nextPage"
              id="next-page-button"
              style="margin-left:8px;border:none;padding:6px 12px;border-radius:6px;background-color:#262A41"
              :disabled="page >= maxPages || notList"
            >
              <i class="fas fa-chevron-right" style="color:white"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- <div
        style="position:absolute;bottom:0;height:2em;left:0;width:100%;background-color:#F7F7FF;z-index:3;border-bottom-left-radius:28px;border-bottom-right-radius:28px"
      ></div> -->
    </div>
  </div>
</template>

<script>
import Input from "../components/Input";
export default {
  name: "Home",
  components: {
    "m-input": Input,
  },
  data() {
    return {
      transitionName: "",
      search: "",
    };
  },
  methods: {
    nextPage() {
      this.$store.dispatch("incrementCurrentPage");
    },
    previousPage() {
      this.$store.dispatch("decrementCurrentPage");
    },
    toggleShowCountry() {
      this.$store.dispatch("toggleShowCountry");
    },
  },
  computed: {
    userData() {
      let users = this.$store.getters["allUsers"];
      return {
        count: users.length,
        maleCount: users.filter((user) => user.gender == "male").length,
        femaleCount: users.filter((user) => user.gender == "female").length,
      };
    },
    page() {
      return this.$store.getters["currentPage"];
    },
    maxPages() {
      let route = this.$route.name;

      let length;
      if (route == "male users") {
        length = this.userData.maleCount / 3;
      } else if (route == "female users") {
        length = this.userData.femaleCount / 3;
      } else {
        length = this.userData.count / 3;
      }
      return Math.ceil(length);
    },
    notList() {
      return this.$route.name == "user profile";
    },
  },
  watch: {
    $route(to) {
      if (to.matched.some((record) => record.meta.isList))
        this.transitionName = "slide-down";
      else this.transitionName = "slide-up";
    },
  },
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      if (!(to.meta.isList && from.meta.isList))
        this.$refs["route-house"].style.overflow = "visible";
      next();
    });
    this.$router.afterEach((to, from) => {
      if (!(to.meta.isList && from.meta.isList)) {
        setTimeout(() => {
          this.$refs["route-house"].style.overflow = "auto";
        }, 500);
      }
    });
  },
};
</script>
<style scoped>
.route-house {
  overflow: auto;
}
button {
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}
.main {
  display: flex;
  height: 97vh;
}
.nav-menu > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav-menu > div:nth-child(n + 2) {
  margin-left: 40px;
}
.nav-button {
  width: 90px;
  height: 90px;
  border: none;
  border-radius: 20px;
}
.nav > * {
  cursor: pointer;
  margin-bottom: 16px;
  transition: transform 0.5s ease;
}
.nav.router-link-exact-active > button {
  cursor: default;
  transform: scale(1.2);
}
.nav-button > i {
  color: white;
  font-size: 30px;
}
.result {
  background-color: #f7f7ff;
  width: 100%;
  border-radius: 28px;
  padding: 2em 3em;
}
::placeholder {
  font-weight: 600;
  color: rgb(38, 42, 65, 0.52);
  letter-spacing: -0.02px;
}
.country-select {
  background-color: #0000001a;
  border-radius: 999px;
  border: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat, repeat;
  background-position: right 1em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  -moz-appearance: none;
  -webkit-appearance: none;
  display: block;
  padding: 0.6em 1.4em 0.5em 1em;
  width: 100%;
  max-width: 120px;
  line-height: 1.3;
  cursor: pointer;
}
.country-select:disabled {
  cursor: default;
}
.country-select::-ms-expand {
  display: none;
}
.country-select:focus {
  outline: none;
}
.filter-input {
  background-color: #0000001a;
  border-radius: 999px;
  padding: 10px;
  padding-left: 50px;
  border: none;
  box-sizing: border-box;
  width: 100%;
}
.filter-input:focus {
  outline: none;
}
.switch {
  position: relative;
  display: inline-block;
  width: 35px;
  height: 18px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch input + span {
  cursor: pointer;
}
.switch input:disabled + span {
  cursor: default;
}

.slider {
  position: absolute;
  cursor: inherit;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  border-radius: 999px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

input:checked + .slider {
  background-color: #30bbb5;
}

input:focus + .slider {
  box-shadow: 0 0 1px #30bbb5;
}

input:checked + .slider:before {
  left: calc(100% - 16px);
}

.slide-up-leave-active {
  transition: all 0.4s ease;
  transition-delay: 0.1s;
  overflow: hidden;
}
.slide-up-enter-active {
  transition: all 0.6s ease;
  overflow: hidden;
}
.slide-down-enter-active {
  transition: all 0.5s ease;
  overflow: hidden;
}
.slide-down-leave-active {
  transition: all 0.55s ease;
  overflow: hidden;
}
.slide-up-leave-to {
  transform: translateY(-150px);
  opacity: 0.05;
}
.slide-down-enter {
  transform: translateY(-150px);
  opacity: 0.1;
}

.slide-up-enter {
  transform: translateY(80px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(80px);
  opacity: 0;
}
</style>
