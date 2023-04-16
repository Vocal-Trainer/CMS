import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../styles/css/antd.css";
import "core-js";
import BJDatePicker from "../components/theme/atoms/BJDatePicker";

export default {
  title: "Atoms/Datepicker",
  component: BJDatePicker,
} as ComponentMeta<typeof BJDatePicker>;

const Template: ComponentStory<typeof BJDatePicker> = args => (
  <BJDatePicker {...args} />
);

export const Base = Template.bind({});
Base.argTypes = {};
