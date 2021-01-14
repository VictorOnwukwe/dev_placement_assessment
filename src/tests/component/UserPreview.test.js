// import { render } from "@testing-library/vue";
import { mount, createLocalVue } from "@vue/test-utils";
import UserPreview from "../../components/UserPreview";
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
  let defaultData;
  beforeEach(() => {
    defaultData = {
      propsData: { user: populatedUser },
      computed: { showCountry: jest.fn() },
      stubs: ["router-link"]
    }
  });

  it("Should not render component without user prop", async () => {
    const wrapper = mount(UserPreview);
    expect(wrapper).toBeEmpty;
  });

  it("Should render component when user prop is passed", () => {
    const wrapper = mount(UserPreview, {
      ...defaultData
    });
    expect(wrapper).not.toBeEmpty;
  });

  it("should render correctly when passed user prop", () => {
    const wrapper = mount(UserPreview, {
      ...defaultData
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
    defaultData = {
      propsData: { user: populatedUser },
      computed: { showCountry: jest.fn() },
    }

    const wrapper = mount(UserPreview, {
      localVue,
      router,
      ...defaultData
    });

    await wrapper.find("button").trigger("click");
    expect(wrapper.vm.$route.path).toBe("/users/email");
  });

  it("should show country when state value is true", async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      getters: {
        showCountry: () => true
      }
    });

    defaultData = {
      propsData: { user: populatedUser },
      stubs: ["router-link"]
    }

    const wrapper = mount(UserPreview, {
      store,
      localVue,
      ...defaultData
    });

    let elem = wrapper.find("p.location");
    expect(elem.text()).toContain("country");
  });

  it("should not show country when state value is false", async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      getters: {
        showCountry: () => false
      }
    });

    defaultData = {
      propsData: { user: populatedUser },
      stubs: ["router-link"]
    }

    const wrapper = mount(UserPreview, {
      store,
      localVue,
      ...defaultData
    });

    let elem = wrapper.find("p.location");
    expect(elem.text().includes("country")).toBe(false);
  });
});
