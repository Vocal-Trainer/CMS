import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    white: string;
    black: string;
    disabled: string;
    stroke: string;
    button: {
      primary: string;
      secondary: string;
      success: string;
      danger: string;
      paging: string;
      pending: string;
      draft: string;
      hover: string;
    };
    primary: string;
    secondary: string;
    text: {
      primary: string;
      danger: string;
    };
    hover: {
      menu: string;
    };
    input: {
      background: string;
    };
    active: {
      background: string;
    };
    icon: {
      gray: string;
      success: string;
    };
    red: string;
  }
}
