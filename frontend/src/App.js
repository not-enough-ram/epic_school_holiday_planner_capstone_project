import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavHeader from "./components/NavHeader";
import LoginPage from "./Pages/LoginPage";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { ThemeProvider as PrimerThemeProvider } from "@primer/components";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./routing/PrivateRoute";
import HomePage from "./Pages/HomePage";
import DetailsPage from "./Pages/DetailsPage";
import BottomNav from "./components/BottomNav";
import { createMuiTheme } from "@material-ui/core/styles";
import BookingPage from "./Pages/BookingPage";
import HolidaysPage from "./Pages/HolidaysPage";
import MyBookingList from "./components/MyBookingList";
import ProfilePage from "./Pages/ProfilePage";
import useUser from "./hooks/useUser";

function App() {
  const { user } = useUser();
  const theme = createMuiTheme({
    palette: {
      primary: {
        dark: "#22272e",
        main: "#2d333b",
        light: "#adbac7",
      },
    },
    spacing: 2,
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
              <HomePage />
            </PrivateRoute>
            <PrivateRoute path={"/details/:name"} exact>
              <DetailsPage />
            </PrivateRoute>
            <PrivateRoute path={"/booking"} exact>
              <BookingPage />
            </PrivateRoute>
            <PrivateRoute path={"/holidays"} exact>
              <HolidaysPage />
            </PrivateRoute>
            <PrivateRoute path={"/booked"} exact>
              <MyBookingList />
            </PrivateRoute>
            <PrivateRoute path={"/profile"} exact>
              <ProfilePage user={user} />
            </PrivateRoute>
          </Switch>
          {<BottomNav />}
        </AuthProvider>
      </MaterialThemeProvider>
    </PrimerThemeProvider>
  );
}

export default App;
