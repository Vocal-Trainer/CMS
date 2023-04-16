import { FC } from "react";

import { ArticlesProvider, ApplicationCommonContextProvider } from "./context";

interface Props {
  children: any;
}

export const Providers = ({ children }: Props) => (
  <Compose components={[ArticlesProvider, ApplicationCommonContextProvider]}>
    {children}
  </Compose>
);

interface ComposeProps {
  components: any[];
}

export const Compose: FC<ComposeProps> = ({ components, children }) => (
  <>
    {components.reverse().reduce((acc, curr) => {
      const [Provider, props] = Array.isArray(curr)
        ? [curr[0], curr[1]]
        : [curr, {}];
      return <Provider {...props}>{acc}</Provider>;
    }, children)}
  </>
);
