// import { render } from "@testing-library/vue";
import { mount, createLocalVue } from "@vue/test-utils";
import UserPreview from "../../components/UserPreview";
import { isIterable } from "core-js";
import Router from "vue-router";

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
    expect(wrapper.isEmpty()).toBe(true);
  });

  it("Should render component when user prop is passed", () => {
    const wrapper = mount(UserPreview, {
      propsData: { user: populatedUser },
      computed: { showCountry: showCountry },
    });
    expect(wrapper.isEmpty()).toBe(false);
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
});
