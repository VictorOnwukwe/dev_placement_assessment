import { mount, createLocalVue } from "@vue/test-utils";
import Users from "../../pages/Users";
import { isIterable } from "core-js";
import Vuex from "vuex";

describe("Users Display Page", () => {
  let allUsers = Array(20)
    .fill()
    .map((v, i) => {
      return {
        name: { first: "i", last: "last" },
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
  let maleUsers = allUsers.filter((user) => user.gender == "male");
  let femaleUsers = allUsers.filter((user) => user.gender == "female");
  let defaultData;
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        allUsers: () => allUsers,
      },
    });

    defaultData = {
      store,
      mocks: {
        $route: { params: { email: "email" } },
      },
      localVue,
      stubs: ["router-link"],
    };
  });

  describe("Sort By Gender", () => {
    it("should return populate users with gender neutral array when gender is 'all'", () => {
      const wrapper = mount(Users, {
        ...defaultData,
        propsData: {
          gender: "all",
        },
      });

      expect(wrapper.vm.$data.displayUsers).toEqual(allUsers);
    });

    it("should populate display users with male gender array when gender is 'male'", () => {
      const wrapper = mount(Users, {
        ...defaultData,
        propsData: {
          gender: "male",
        },
      });

      expect(wrapper.vm.$data.displayUsers).toEqual(maleUsers);
    });

    it("should populate display users with female gender array when gender is 'female'", () => {
      const wrapper = mount(Users, {
        ...defaultData,
        propsData: {
          gender: "female",
        },
      });

      expect(wrapper.vm.$data.displayUsers).toEqual(femaleUsers);
    });
  });

  it("should return data according to page number", () => {
    store = new Vuex.Store({
      getters: {
        allUsers: () => allUsers,
        currentPage: () => 3,
      },
    });
    const wrapper = mount(Users, {
      ...defaultData,
      store,
    });

    expect(wrapper.vm.$data.currentUsers).toEqual(allUsers.slice(6, 9));
  });

  it("should show circular progress while users are an empty array", () => {
    store = new Vuex.Store({
      getters: {
        currentPage: () => 3,
      },
    });
    const wrapper = mount(Users, {
      ...defaultData,
      store,
      computed: {
        users: () => [],
      },
    });

    expect(wrapper.find("div.loader").exists()).toBe(true);
  });

  it("should hide circular progress when user is not an empty array", () => {
    store = new Vuex.Store({
      getters: {
        currentPage: () => 3,
      },
    });
    const wrapper = mount(Users, {
      ...defaultData,
      store,
      computed: {
        users: () => [""],
      },
    });

    expect(wrapper.find("div.loader").exists()).toBe(false);
  });
});
