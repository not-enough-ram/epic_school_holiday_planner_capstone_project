import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavHeader from "./components/NavHeader";
import LoginPage from "./Pages/LoginPage";
import { ThemeProvider } from "@primer/components";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./routing/PrivateRoute";
import HolidaysPage from "./Pages/HolidaysPage";
import DetailsPage from "./Pages/DetailsPage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavHeader />
        <Switch>
          <Route path={"/"} exact>
            <LoginPage />
          </Route>
          <PrivateRoute path={"/home"} exact>
            <HolidaysPage />
          </PrivateRoute>
          <PrivateRoute path={"/details/:name"} exact>
            <DetailsPage />
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
