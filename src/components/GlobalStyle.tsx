import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  .form-label {
  }

  .narrow-markdown-editor {
    .CodeMirror {
      min-height: 150px;
    }

    .CodeMirror-scroll {
	    min-height: 150px;
    }

  }

  .editor-statusbar {
    display: none;
  }

  .pointer {
    cursor: pointer;
  }
  ::selected {
    color: red;
  }

  body {
    .ant-tooltip-inner {
      color: ${props => props.theme.text.primary}
    }
  }
`;
export const GlobalWordSpacing = createGlobalStyle`
*{
  word-spacing: -0.313rem !important;
}
`;
