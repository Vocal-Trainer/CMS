import React, { createContext, useContext, useMemo, useState } from "react";

type ApplicationCommonContextState = {
  tableSearchQuery: any;
  setTableSearchQuery: (_value: object | null) => void;
};

const ApplicationCommonContext = createContext<ApplicationCommonContextState>({
  tableSearchQuery: {},
  setTableSearchQuery: null,
});

export const ApplicationCommonContextProvider = ({ ...rest }) => {
  const [tableSearchQuery, setTableSearchQuery] = useState({});
  const value = useMemo(
    () => ({ tableSearchQuery, setTableSearchQuery }),
    [tableSearchQuery]
  );

  return <ApplicationCommonContext.Provider value={value} {...rest} />;
};

export const useApplicationCommonContext = () => {
  const context = useContext(ApplicationCommonContext);
  return context;
};
