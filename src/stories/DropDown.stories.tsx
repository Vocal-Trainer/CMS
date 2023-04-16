import { ComponentStory, ComponentMeta } from "@storybook/react";
import "antd/dist/antd.css";
import "core-js";
import BJSelect from "../components/theme/atoms/BJSelect";

enum SelectSize {
  Large = "large",
  Middle = "middle",
  Small = "small",
}

export default {
  title: "Atoms/Dropdown",
  component: BJSelect,
} as ComponentMeta<typeof BJSelect>;

const DropDownTemplate: ComponentStory<typeof BJSelect> = args => (
  <BJSelect {...args} />
);

export const Base = DropDownTemplate.bind({});
Base.argTypes = {
  options: {
    description: "Define the options that displayed on dropdown",
    table: {
      type: { summary: "{ label, value }[]" },
      defaultValue: { summary: "jack" },
    },
  },
  defaultValue: {
    description: "Define the default value",
  },
  size: {
    description: "Define the size of the Select",
    table: {
      type: { summary: "large | middle | small" },
      defaultValue: { summary: SelectSize.Middle },
    },
    options: SelectSize,
    defaultValue: SelectSize.Middle,
    control: { type: "radio" },
  },
};

Base.args = {
  options: [
    { label: "Jack", value: "jack" },
    { label: "Lucy", value: "lucy" },
  ],
  defaultValue: "jack",
};
