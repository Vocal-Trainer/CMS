import { ComponentStory, ComponentMeta } from "@storybook/react";
import BJButton, { ButtonTypes } from "../components/theme/atoms/Button";
import "antd/dist/antd.css";
import "core-js";

export default {
  title: "Atoms/Button",
  component: BJButton,
} as ComponentMeta<typeof BJButton>;

const Template: ComponentStory<typeof BJButton> = args => (
  <BJButton {...args} onClick={() => {}}>
    {args.children}
  </BJButton>
);

export const Base = Template.bind({});
Base.argTypes = {
  buttonType: {
    name: "buttonType",
    type: { name: "string", required: false },
    description: "Define button type using ButtonTypes enum",
    defaultValue: "primary",
    table: {
      type: { summary: "enum : ButtonTypes" },
      defaultValue: { summary: "primary" },
    },
    options: ButtonTypes,
    control: { type: "radio" },
  },
  children: {
    type: { name: "string", required: false },
    defaultValue: "Base Button",
  },
};

export const IconButton = Template.bind({});
IconButton.argTypes = {
  ...Base.argTypes,
  buttonType: { ...Base.argTypes.buttonType, defaultValue: "save" },
  icon: {
    description: "Can set any type of JSX Element here",
    table: {
      type: { summary: "JSX Element" },
      defaultValue: { summary: "<Blogpost />" },
    },
    control: null,
  },
};
