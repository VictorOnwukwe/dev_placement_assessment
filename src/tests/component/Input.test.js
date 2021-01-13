import { mount } from "@vue/test-utils";
import Input from "../../components/Input";


describe("Text Box", () => {
    it("should emit its input value at key up", async () => {
        const wrapper = mount(Input);

        const input = wrapper.find("input");
        input.element.value = "good";
        await input.trigger("input");

        expect(wrapper.emitted().input[0]).toEqual(["good"]);
    })
})