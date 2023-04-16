import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../styles/css/antd.css";
import "core-js";
import BJInput from "../components/theme/atoms/BJInput";

export default {
  title: "Atoms/Input",
  component: BJInput,
} as ComponentMeta<typeof BJInput>;

const Template: ComponentStory<typeof BJInput> = args => (
  <BJInput BJDefault {...args} />
);

export const Base = Template.bind({});
Base.argTypes = {
  BJDefault: {
    description:
      "This prop defines the input style that is used through out the BJ design",
    table: {
      defaultValue: { summary: false },
    },
  },
};
