import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavHeader from "./components/NavHeader";
import LoginPage from "./Pages/LoginPage";
import { ThemeProvider } from "@primer/components";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./routing/PrivateRoute";
import HomePage from "./Pages/HomePage";
import HolidaysPage from "./Pages/HolidaysPage";

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
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
