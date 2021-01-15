import { mount, config, createLocalVue } from "@vue/test-utils";
import Users from "../../pages/Users";
import Vuex from "vuex";

config.showDeprecationWarnings = false;

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
          country: i % 4 == 0 ? "Nigeria" : "other",
        },
        email: "email" + i,
        phone: "112233",
        gender: i % 3 == 0 ? "male" : "female",
      };
    });
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
      methods: {
        updateContent: jest.fn()
      }
    };
  });

  describe("Sort By Gender", () => {
    let wrapper, store;
    let maleUsers = allUsers.filter((user) => user.gender == "male");
    let femaleUsers = allUsers.filter((user) => user.gender == "female");
    beforeEach(() => {
      store = new Vuex.Store({
        getters: {
          allUsers: () => allUsers,
        },
      });
      defaultData = { ...defaultData, store };
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should return populate users with gender neutral array when gender is 'all'", () => {
      wrapper = mount(Users, {
        ...defaultData,
        propsData: {
          gender: "all",
          country: "all",
          search: "",
        },
      });

      expect(wrapper.vm.$data.displayUsers).toEqual(allUsers);
    });

    it("should populate display users with male gender array when gender is 'male'", () => {
      wrapper = mount(Users, {
        ...defaultData,
        propsData: {
          gender: "male",
          country: "all",
          search: "",
        },
      });

      expect(wrapper.vm.$data.displayUsers).toEqual(maleUsers);
    });

    it("should populate display users with female gender array when gender is 'female'", () => {
      wrapper = mount(Users, {
        ...defaultData,
        propsData: {
          gender: "female",
          country: "all",
          search: "",
        },
      });

      expect(wrapper.vm.$data.displayUsers).toEqual(femaleUsers);
    });
  });

  describe("Sort By Country", () => {
    let wrapper, store;
    let nigerianUsers = allUsers.filter((u) => u.location.country == "Nigeria");
    afterEach(() => {
      wrapper.destroy();
    });
    it("should populate displayUsers with users from a specific country", () => {
      wrapper = mount(Users, {
        ...defaultData,
        propsData: {
          gender: "all",
          country: "Nigeria",
          search: "",
        },
      });

      expect(wrapper.vm.$data.displayUsers).toEqual(nigerianUsers);
    });
  });

  describe("Search", () => {
    let matches = (user, search, showCountry) => {
      let userString = `${user.location.street.number} ${
        user.location.street.name
      } ${user.location.city}, ${user.location.state}${
        showCountry ? " " + user.location.country : ""
      } ${user.name.first} ${user.name.last} ${user.email}`.toLocaleLowerCase();

      return userString.includes(search.trim().toLowerCase());
    };
    let searchResults;

    it("should populate displayUsers with users that match keyword when country is shown", async () => {
      searchResults = allUsers.filter((user) => matches(user, "i", true));
      const wrapper = mount(Users, {
        ...defaultData,
        propsData: {
          gender: "all",
          country: "all",
          search: "i",
        },
        store: new Vuex.Store({
          getters: {
            showCountry: () => true,
            allUsers: () => allUsers,
          },
        }),
      });

      expect(wrapper.vm.$data.displayUsers).toEqual(searchResults);
    });
    it("should populate displayUsers with users that match keyword when country is hidden", async () => {
      searchResults = allUsers.filter((user) => matches(user, "i", false));
      const wrapper = mount(Users, {
        ...defaultData,
        propsData: {
          gender: "all",
          country: "all",
          search: "i",
        },
        store: new Vuex.Store({
          getters: {
            showCountry: () => false,
            allUsers: () => allUsers,
          },
        }),
      });

      expect(wrapper.vm.$data.displayUsers).toEqual(searchResults);
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
      propsData: {
        gender: "all",
        country: "all",
        search: "",
      },
      methods: {}
    });

    expect(wrapper.vm.$data.currentUsers).toEqual(allUsers.slice(6, 9));
  });

  it("should render correctly when passed complete data", () => {
    const wrapper = mount(Users, {...defaultData});
    expect(wrapper.html()).toMatchSnapshot();
  });
});
