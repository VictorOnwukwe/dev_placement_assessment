import { mount, createLocalVue } from "@vue/test-utils";
import Home from "../../pages/Home";
// import Input from "../../components/Input";
import { isIterable } from "core-js";
import Vuex from "vuex";
import Router from "vue-router";
import { template } from "babel-core";

const localVue = createLocalVue();

describe("Home", () => {
  let defaultData;
  let store;
  let router;
  localVue.use(Vuex);
  localVue.use(Router);
  let allRoutes = [
    {
      path: "/",
      component: { template: "temp1" },
      name: "all users",
      props: {
        gender: "all",
      },
      meta: { isList: true },
    },
    {
      path: "/male",
      component: { template: "temp2" },
      name: "male users",
      props: {
        gender: "male",
      },
      meta: { isList: true },
    },
    {
      path: "/female",
      component: { template: "temp3" },
      name: "female users",
      props: {
        gender: "female",
      },
      meta: { isList: true },
    },
    {
      path: "/users/:email",
      component: { template: "temp4" },
      name: "user profile",
      meta: { isList: false },
    },
  ];

  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        currentPage: () => 1,
        allUsers: () => new Array(20),
      },
    });
    router = new Router({
      routes: allRoutes,
    });
    defaultData = {
      store,
      router,
      localVue,
    };
  });

  describe("Nav Buttons", () => {
    let buttons = [
      { id: "all-nav-button", name: "all users" },
      { id: "male-nav-button", name: "male users" },
      { id: "female-nav-button", name: "female users" },
    ];

    buttons.forEach((btn) => {
      it(`${btn.name} nav button should route to path with name ${btn.name}`, async () => {
        const wrapper = mount(Home, { ...defaultData });

        let button = wrapper.find("#" + btn.id);
        await button.trigger("click");

        expect(wrapper.vm.$route.name).toBe(btn.name);
      });
    });
  });

  describe("Disabled", () => {
    let wrapper;
    afterEach(() => {
      wrapper.destroy();
    });
    describe("After Page Route", () => {
      describe("Text Input", () => {
        beforeEach(() => {
          wrapper = mount(Home, {
            ...defaultData,
          });
        });
        afterEach(() => {
          wrapper.vm.$router.push("/");
          wrapper.destroy();
        });

        it("should not be disabled when route is not in user profile", () => {
          let comp = wrapper.findComponent({ ref: "user-search" });

          expect(comp.find("#input-2").attributes("disabled")).toBe(undefined);
        });
        it("should be disabled when route is in user profile", async () => {
          let comp = wrapper.findComponent({ ref: "user-search" });

          await wrapper.vm.$router.push("/users/email");
          expect(comp.find("#input-2").attributes("disabled")).toBe("disabled");
        });
      });

      let buttons = [
        { selector: ".country-select", name: "Country Selcetion Input" },
        { selector: "#previous-page-button", name: "Previous Page Button" },
        { selector: "#next-page-button", name: "Next Page Button" },
        { selector: ".download-button", name: "Download Button" },
      ];

      buttons.forEach((button) => {
        describe(`${button.name}`, () => {
          beforeEach(() => {
            store = new Vuex.Store({
              getters: {
                currentPage: () => 2,
                allUsers: () => new Array(20),
              },
            });
            wrapper = mount(Home, {
              ...defaultData,
              store,
            });
          });
          afterEach(() => {
            wrapper.vm.$router.push("/");
            wrapper.destroy();
          });

          it("should not be disabled when route is not in user profile", () => {
            expect(
              wrapper.find(`${button.selector}`).attributes("disabled")
            ).toBe(undefined);
          });
          it("should be disabled when route is in user profile", async () => {
            await wrapper.vm.$router.push("/users/email");
            expect(
              wrapper.find(`${button.selector}`).attributes("disabled")
            ).toBe("disabled");
          });
        });
      });
    });

    describe("After pagination action", () => {
      describe("Previous Page Button", () => {
        let wrapper;
        it("Should be enabled when page number is greater than 1", () => {
          store = new Vuex.Store({
            getters: {
              currentPage: () => 2,
              allUsers: () => new Array(20),
            },
          });
          wrapper = mount(Home, {
            ...defaultData,
            store,
          });

          expect(
            wrapper.find("#previous-page-button").attributes("disabled")
          ).toBe(undefined);
        });
        it("Should be disabled when page number is less than or equal to 1", () => {
          wrapper = mount(Home, {
            ...defaultData,
            store,
          });

          expect(
            wrapper.find("#previous-page-button").attributes("disabled")
          ).toBe("disabled");
        });
      });

      describe("Next Page Button", () => {
        let wrapper;
        it("Should be enabled when page number is less than maximum allowable page(7)", () => {
          wrapper = mount(Home, {
            ...defaultData,
          });

          expect(wrapper.find("#next-page-button").attributes("disabled")).toBe(
            undefined
          );
        });
        it("Should be disabled when page number is greater than or equal to maximum allowable page(7)", () => {
          store = new Vuex.Store({
            getters: {
              currentPage: () => 7,
              allUsers: () => new Array(20),
            },
          });
          wrapper = mount(Home, {
            ...defaultData,
            store,
          });

          expect(wrapper.find("#next-page-button").attributes("disabled")).toBe(
            "disabled"
          );
        });
      });
    });
  });
  describe("Page Count", () => {
    let wrapper;
    afterEach(() => {
      wrapper.destroy();
    });
    it("Should increment when next page button is clicked", async () => {
      store = new Vuex.Store({
        state: {
          currentPage: 4,
        },
        mutations: {
          incrementCurrentPage: (state) => {
            state.currentPage++;
          },
        },
        getters: {
          currentPage: (state) => state.currentPage,
          allUsers: () => new Array(20),
        },
        actions: {
          incrementCurrentPage({ commit }) {
            commit("incrementCurrentPage");
          },
        },
      });

      wrapper = mount(Home, { ...defaultData, store });
      await wrapper.find("#next-page-button").trigger("click");

      expect(store.getters.currentPage).toBe(5);
    });
    it("Should decrement when previous page button is clicked", async () => {
      store = new Vuex.Store({
        state: {
          currentPage: 4,
        },
        mutations: {
          decrementCurrentPage: (state) => {
            state.currentPage--;
          },
        },
        getters: {
          currentPage: (state) => state.currentPage,
          allUsers: () => new Array(20),
        },
        actions: {
          decrementCurrentPage({ commit }) {
            commit("decrementCurrentPage");
          },
        },
      });
      wrapper = mount(Home, { ...defaultData, store });
      await wrapper.find("#previous-page-button").trigger("click");

      expect(store.getters.currentPage).toBe(3);
    });
  });
  describe("ShowCountry", () => {
    let wrapper, store;
    store = new Vuex.Store({
      state: {
        showCountry: false,
      },
      mutations: {
        toggleShowCountry(state) {
          state.showCountry = !state.showCountry;
        },
      },
      getters: {
        currentPage: () => 4,
        allUsers: () => new Array(20),
        showCountry: (state) => state.showCountry,
      },
      actions: {
        toggleShowCountry({ commit }) {
          commit("toggleShowCountry");
        },
      },
    });
    it("Should change when show country switch is alternated", async () => {
      wrapper = mount(Home, { ...defaultData, store });
      await wrapper.find("#show-country-button").trigger("click");

      expect(store.getters.showCountry).toBe(true);
    });
  });
});
