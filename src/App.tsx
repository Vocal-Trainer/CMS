import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./context";
import { Providers } from "./Providers";
import "./styles/App.scss";
import { theme } from "./components/theme/util/theme";
import { BJMainLayout } from "./Layouts/MainLayout";
import { LoginPage } from "./pages";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components";
import { CMSRoutes } from "./utils/routes";

export const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Providers>
          <Routes>
            {!user ? (
              <Route path="/*" element={<LoginPage />} />
            ) : (
              <Route path="*" element={<BJMainLayout />}>
                <Route path="cms/*" element={<CMSRoutes />} />
              </Route>
            )}
          </Routes>
        </Providers>
      </ThemeProvider>
    </Router>
  );
};
