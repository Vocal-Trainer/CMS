import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BJTableHeader from "../components/theme/molecules/TableHeader";
import "../styles/css/antd.css";
import BJButton from "../components/theme/atoms/Button";

export default {
  title: "Molecule/Table Header",
  component: BJTableHeader,
} as ComponentMeta<typeof BJTableHeader>;

const Template: ComponentStory<typeof BJTableHeader> = args => (
  <BJTableHeader {...args} />
);

export const Base = Template.bind({});

Base.argTypes = {
  title: {
    defaultValue: "Blog Post",
    type: { name: "string", required: true },
    description: "Title field",
    table: {
      type: { summary: "title: string" },
      defaultValue: { summary: "Blog Post" },
    },
  },
  create: {
    defaultValue: true,
    type: { name: "boolean", required: false },
    description: "To enable disable create option",
    table: {
      type: { summary: "create: boolean" },
      defaultValue: { summary: "true" },
    },
  },
  createPlaceholder: {
    defaultValue: "New Select",
    type: { name: "string", required: false },
    description: "Placeholder for create",
    table: {
      type: { summary: "title: string" },
      defaultValue: { summary: "New Select" },
    },
  },
  createOptions: {
    defaultValue: [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
    ],
    type: { name: "boolean", required: false },
    description: "Create options",
    table: {
      type: { summary: "createOptions: OptionsProps" },
      defaultValue: {
        summary: `[
        { label: "One", value: "one" },
        { label: "Two", value: "two" },
      ]`,
      },
    },
  },
  inputPlaceholder: {
    defaultValue: "Place holder set",
    type: { name: "string", required: false },
    description: "Input placeholder",
    table: {
      type: { summary: "title: string" },
      defaultValue: { summary: "Place holder set" },
    },
  },
  suffixButton: {
    defaultValue: <BJButton onClick={() => {}}>Change Order</BJButton>,
    type: { name: "boolean", required: false },
    description: "Suffix item",
    table: {
      defaultValue: { summary: "<BJButton />" },
    },
  },
};
