import { mount, createLocalVue } from "@vue/test-utils";
import UserProfile from "../../pages/UserProfile";
import Vuex from "vuex";

describe("User Profile Page", () => {
  let populatedUser = {
    name: { first: "firstname", last: "lastname" },
    picture: { medium: "medium" },
    location: {
      street: { number: "streetnumber", name: "streetname" },
      city: "city",
      state: "state",
      country: "country",
    },
    email: "email",
    phone: "phone",
    cell: "cell",
    dob: { age: "age" },
    registered: { date: "registrationdate" },
  };
  let defaultData;
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        allUsers: () => [populatedUser],
      },
    });

    defaultData = {
      store,
      mocks: {
        $route: { params: { email: "email" } },
      },
      localVue,
    };
  });

  it("Should not render component without user prop", async () => {
    const wrapper = mount(UserProfile, { ...defaultData });
    expect(wrapper).toBeEmpty;
  });

  it("should render correctly when passed user prop", () => {
    const wrapper = mount(UserProfile, {
      computed: { showCountry: jest.fn() },
      ...defaultData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render correctly when passed user prop", () => {
    const wrapper = mount(UserProfile, {
      computed: { showCountry: jest.fn() },
      ...defaultData,
      data() {
        return {
          user: populatedUser,
        };
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should show country when state value is true", async () => {
    store = new Vuex.Store({
      getters: {
        allUsers: () => [populatedUser],
        showCountry: () => true,
      },
    });

    const wrapper = mount(UserProfile, {
      ...defaultData,
      store,
      data() {
        return {
          user: populatedUser,
        };
      },
    });

    let elem = wrapper.find("p.location");
    expect(elem.text()).toContain("country");
  });

  it("should not show country when state value is false", async () => {
    store = new Vuex.Store({
      getters: {
        allUsers: () => [populatedUser],
        showCountry: () => false,
      },
    });

    const wrapper = mount(UserProfile, {
      ...defaultData,
      store,
      data() {
        return {
          user: populatedUser,
        };
      },
    });

    let elem = wrapper.find("p.location");
    expect(elem.text().includes("country")).toBe(false);
  });
});
