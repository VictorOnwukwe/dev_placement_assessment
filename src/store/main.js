import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    currentPage: 1,
    showCountry: false
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
    }
  },
  getters: {
    currentPage: (state) => state.currentPage,
    allUsers: (state) => state.users,
    showCountry: (state) => state.showCountry
  },
  actions: {
    async fetchUsers({ commit }) {
      let res = await axios.get("https://randomuser.me/api/?results=20");
      commit("setUsers", res.data.results);
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
    toggleShowCountry({commit}){
      commit("toggleShowCountry");
    }
  },
});

export default store;
