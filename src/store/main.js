import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    currentPage: 1,
    showCountry: false,
    countries: [],
  },
  mutations: {
    setCurrentPage: (state, val) => {
      state.currentPage = val;
    },
    incrementCurrentPage: (state) => {
      state.currentPage++;
    },
    decrementCurrentPage: (state) => {
      state.currentPage--;
    },
    setUsers: (state, val) => {
      state.users = val;
    },
    toggleShowCountry: (state) => {
      state.showCountry = !state.showCountry;
    },
    setCountries: (state, val) => {
      state.countries = val;
    },
  },
  getters: {
    currentPage: (state) => state.currentPage,
    allUsers: (state) => state.users,
    showCountry: (state) => state.showCountry,
    countries: (state) => state.countries,
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        let res = await axios.get("https://randomuser.me/api/?results=20");
        let users = res.data.results;
        commit("setUsers", users);
        let countries = users.map((user) => user.location.country);
        let filtered = [];
        countries = countries.filter((c) => {
          if (filtered.includes(c)) return false;

          filtered.push(c);
          return true;
        });

        commit("setCountries", countries);
      } catch (e) {
        console.log(e);
      }
    },
    setCurrentPage({ commit }, val) {
      commit("setCurrentPage", val);
    },
    incrementCurrentPage({ commit }) {
      commit("incrementCurrentPage");
    },
    decrementCurrentPage({ commit }) {
      commit("decrementCurrentPage");
    },
    toggleShowCountry({ commit }) {
      commit("toggleShowCountry");
    },
  },
});

export default store;
