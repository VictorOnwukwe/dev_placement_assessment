<template>
  <div class="main">
    <div style="width:100%;">here</div>
    <div class="result" style="display:flex;flex-direction:column">
      <h2 style="font-weight:bolder;color: #262A41; line-height:0.2
      margin-bottom:0">
        All Users
      </h2>
      <p style="color:#262A41;font-size:12px">Filter by</p>
      <div style="display: flex;justify-content:space-between">
        <div style="position:relative">
          <i
            class="fas fa-search"
            style="color:rgb(180,180,180);position:absolute;left:1em;top:10px"
          ></i>
          <input class="filter-input" placeholder="Find in list" />
        </div>
        <select
          name="Country"
          label="Country"
          class="country-select"
        >
          <option>good</option>
          <option>great</option>
          <option>nice</option>
          <option>eh</option>
        </select>
        <div style="display:flex;align-items:center;">
          <label class="switch">
            <input type="checkbox" />
            <span class="slider"></span>
          </label>
          <span style="font-size:10px;margin-left:4px">Show Country</span>
        </div>
      </div>
      <router-view class="router-view" :page="1" :users="users" style="overflow-y:hidden;margin-top:1em"></router-view>
      <div>
        check
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      let res = await axios.get("https://randomuser.me/api/?results=20");
      this.users = res.data.results;
      console.log(this.users[0]);
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
<style scoped>
.main {
  display: flex;
  height: 97vh;
}
.result {
  background-color: #f7f7ff;
  width: 100%;
  border-radius: 28px;
  padding: 2em 3em;
}
::placeholder{
  font-weight: 600;
  color: rgb(38, 42, 65,.52);
  letter-spacing: -0.02px;
}
.country-select {
  background-color: #0000001a;
  border-radius: 999px;
  border: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  -moz-appearance: none;
  -webkit-appearance: none;
  display: block;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 100%;
  max-width: 100px;
  line-height: 1.3;
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

/* I hid the default slider */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 999px;
}

/* I added a circle inside the slider*/
.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  -webkit-transition: 0.4s;
  transition: 0.4s;
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
</style>
