import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth, useAuthToken } from "./context";
import { Providers } from "./Providers";
import "./styles/App.scss";
import { theme } from "./components/theme/util/theme";
import { BJMainLayout } from "./Layouts/MainLayout";
import { LoginPage } from "./pages";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components";

export const App = () => {
  const { user, loading } = useAuth();
  const { isAdmin, isModerator, isAnalytic, isnotificationHandler } =
    useAuthToken();

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
              <Route path="/*" element={<BJMainLayout />}>
                <Route path="*" element={<Navigate to="/cms" />} />
              </Route>
            )}
          </Routes>
        </Providers>
      </ThemeProvider>
    </Router>
  );
};
