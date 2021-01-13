// import { render } from "@testing-library/vue";
import { mount, createLocalVue } from "@vue/test-utils";
import UserPreview from "../../components/UserPreview";
import { isIterable } from "core-js";
import Router from "vue-router";
import Vuex from "vuex";

describe("User Preview Component", () => {
  let populatedUser =  {
    name: { first: "first", last: "last" },
    picture: { medium: "medium" },
    location: {
      street: { number: "1", name: "name" },
      city: "city",
      state: "state",
      country: "country",
    },
    email: "email",
    phone: "112233",
  };
  const showCountry = jest.fn();
  beforeEach(() => {});

  it("Should not render component without user prop", async () => {
    const wrapper = mount(UserPreview);
    expect(wrapper).toBeEmpty;
  });

  it("Should render component when user prop is passed", () => {
    const wrapper = mount(UserPreview, {
      propsData: { user: populatedUser },
      computed: { showCountry: showCountry },
    });
    expect(wrapper).not.toBeEmpty;
  });

  it("should render correctly when passed user prop", () => {
    const wrapper = mount(UserPreview, {
      propsData: { user: populatedUser },
      computed: { showCountry: showCountry },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should route to user profile when route button is clicked", async () => {
    const localVue = createLocalVue();
    localVue.use(Router);
    const router = new Router({
      routes: [
        {
          path: "/users/:email",
          component: { template: `Just me` },
          name: "user",
        },
      ],
    });

    const wrapper = mount(UserPreview, {
      localVue,
      router,
      propsData: {
        user: populatedUser
      },
      computed: {
        showCountry: showCountry
      }
    });

    await wrapper.find("button").trigger("click");
    expect(wrapper.vm.$route.path).toBe("/users/email");
  });

  it("should show country when state value is true", async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const getters = {
      showCountry: () => true
    }
    const store = new Vuex.Store({
      getters
    });

    const wrapper = mount(UserPreview, {
      store,
      localVue,
      propsData: {
        user: populatedUser
      }
    });

    let elem = wrapper.find("p.location");
    expect(elem.text()).toContain("country");
  });

  it("should not show country when state value is false", async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const getters = {
      showCountry: () => false
    }
    const store = new Vuex.Store({
      getters
    });

    const wrapper = mount(UserPreview, {
      store,
      localVue,
      propsData: {
        user: populatedUser
      }
    });

    let elem = wrapper.find("p.location");
    expect(elem.text().includes("country")).toBe(false);
  });
});
