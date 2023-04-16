import { useEffect, useState } from "react";
import MDEditor, { commands, ICommand } from "@uiw/react-md-editor";
import styled from "styled-components";

type MarkdownEditorProps = {
  name: string;
  initialValue: string;
  onChange: (value: string) => void;
  customCommands?: ICommand[];
  narrow?: boolean;
  disabled?: boolean;
};

export const MarkdownEditor = ({
  name,
  initialValue,
  onChange,
  customCommands = [],
  ...rest
}: MarkdownEditorProps) => {
  const defaultCommands = [
    commands.bold,
    commands.italic,
    commands.strikethrough,
    commands.divider,
    commands.title1,
    commands.title2,
    commands.title3,
    commands.divider,
    commands.quote,
    commands.unorderedListCommand,
    commands.orderedListCommand,
    commands.code,
    commands.divider,
    commands.link,
    commands.image,
    commands.divider,
  ];

  return (
    <BJMarkdown
      {...rest}
      name={name}
      initialValue={initialValue}
      preview={"live"}
      extraCommands={[
        commands.codePreview,
        commands.codeEdit,
        commands.codeLive,
        commands.fullscreen,
      ]}
      commands={[...defaultCommands, ...customCommands]}
      value={initialValue}
      onChange={e => {
        onChange(e);
      }}
    />
  );
};

const BJMarkdown = styled(MDEditor)<MarkdownEditorProps>`
  font-family: "Circular Std Book, Circular Std, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji";
  background-color: ${props =>
    props.disabled ? props.theme.disabled : props.theme.white};
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;
