// import { render } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
import UserPreview from "../../components/UserPreview";
import { isIterable } from "core-js";

describe("User Preview Component", () => {
  let user;
  let populatedUser = (user = {
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
  });
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

  // it("should route to user page when route button is clicked", async () => {
  //   const mockRoute = {
  //     params: {
  //       id: 1,
  //     },
  //   };
  //   const mockRouter = {
  //     push: jest.fn(),
  //   };

  //   const wrapper = mount(UserPreview, {
  //     propsData: {
  //       user: populatedUser,
  //     },
  //     mocks: {
  //       $route: mockRoute,
  //       $router: mockRouter,
  //     },
  //   });

  //   await wrapper.find("button").trigger("click");
  //   expect(mockRouter.push).toHaveBeenCalledWith('/users/email')
  // });
});
