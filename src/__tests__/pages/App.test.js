import { shallowMount, createLocalVue } from "@vue/test-utils";
import App from "../../App.vue";
import Vuex from "vuex";
import axios from "axios";

const localVue = createLocalVue();

describe("App", () => {
  localVue.use(Vuex);
  const allUsers = Array(20)
    .fill()
    .map((v, i) => {
      return {
        name: { first: "namei", last: "last" },
        picture: { medium: "medium" },
        location: {
          street: { number: "1", name: "name" },
          city: "city",
          state: "state",
          country: "country",
        },
        email: "email" + i,
        phone: "112233",
        gender: i % 3 == 0 ? "male" : "female",
      };
    });

  test("Should fetch user from api endpoint on created", async () => {
    jest.mock("axios", () => ({
      get: jest.fn(() => Promise.resolve(allUsers)),
    }));
    let store = new Vuex.Store({
      state: {
        users: [],
      },
      mutations: {
        setUsers: (state, val) => {
          state.users = val;
        },
      },
      getters: {
        allUsers: (state) => state.users,
      },
      actions: {
        async fetchUsers({ commit }) {
          try {
            let res = await axios.get("https://randomuser.me/api/?results=20");
            commit("setUsers", res.data.results);
          } catch (e) {
            console.log(e);
          }
        },
      },
    });
    shallowMount(App, { store, localVue });

    expect(axios.get).toHaveBeenCalled();
  });
});
