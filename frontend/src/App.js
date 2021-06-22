import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavHeader from "./components/NavHeader";
import LoginPage from "./Pages/LoginPage";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { ThemeProvider as PrimerThemeProvider } from "@primer/components";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./routing/PrivateRoute";
import HolidaysPage from "./Pages/HolidaysPage";
import DetailsPage from "./Pages/DetailsPage";
import BottomNav from "./components/BottomNav";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, blueGrey, cyan, grey } from "@material-ui/core/colors";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { jwtDecoded } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blueGrey[500],
      },
      secondary: {
        light: cyan[200],
        main: cyan[500],
        contrastText: "#ffcc00",
      },
    },
    typography: { useNextVariants: true },
  });

  return (
    <PrimerThemeProvider>
      <MaterialThemeProvider theme={theme}>
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
          {<BottomNav />}
        </AuthProvider>
      </MaterialThemeProvider>
    </PrimerThemeProvider>
  );
}

export default App;
