import { mount } from "@vue/test-utils";
import Input from "../../components/Input";

describe("Text Box", () => {
  it("should emit its input value at key up", async () => {
    const wrapper = mount(Input);

    const input = wrapper.find("input");
    input.element.value = "good";
    await input.trigger("input");

    expect(wrapper.emitted().input[0]).toEqual(["good"]);
  });

  it("should render correctly when passed user prop", () => {
    const wrapper = mount(Input);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render placeholder text", () => {
      const wrapper = mount(Input, {propsData: {placeholder: "testing placeholder"}});

      expect(wrapper.text().includes("testing placeholder")).toBe(true);
  })

  describe("input", () => {
      it("should be disabled when disabled prop is true", () => {
        const wrapper = mount(Input, {propsData: {disabled: true}});

        expect(wrapper.find("input").attributes("disabled")).toBe("disabled");
      })
      it("should be enabled when disabled prop is false", () => {
        const wrapper = mount(Input, {propsData: {disabled: false}});

        expect(wrapper.find("input").attributes("disabled")).toBe(undefined);
      })
  })
});
