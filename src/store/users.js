import axios from "axios";

export default {
  namespaced: true,
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
    setCountry: (state, val) => {
      state.showCountry = val
    }
  },
  getters: {
    currentPage: (state) => state.currentPage,
    allUsers: (state) => state.users,
    showCountry: (state) => state.showCountry
  },
  actions: {
    async fetch({ commit }) {
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
    setShowCountry({commit}, val){
      commit("setCountry", val);
    }
  },
};
