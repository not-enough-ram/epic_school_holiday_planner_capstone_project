import "./App.css";
import NavHeader from "./components/NavHeader";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { ThemeProvider as PrimerThemeProvider } from "@primer/components";
import AuthProvider from "./context/AuthProvider";
import BottomNav from "./components/BottomNav";
import { createMuiTheme } from "@material-ui/core/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import PrivateRoute from "./routing/PrivateRoute";
import HomePage from "./Pages/HomePage";
import DetailsPage from "./Pages/DetailsPage";
import BookingPage from "./Pages/BookingPage";
import HolidaysPage from "./Pages/HolidaysPage";
import MyBookingList from "./components/MyBookingList";
import ProfilePage from "./Pages/ProfilePage";
import AddChildrenPage from "./Pages/AddChildrenPage";
import { Switch } from "@material-ui/core";

const queryClient = new QueryClient();

function App() {
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
          <QueryClientProvider client={queryClient}>
            <NavHeader />
            <Switch>
              <PrivateRoute path={"/home"} exact>
                <HomePage />
              </PrivateRoute>
              <PrivateRoute path={"/details/:name"} exact>
                <DetailsPage />
              </PrivateRoute>
              <PrivateRoute path={"/holidaybooking"} exact>
                <BookingPage />
              </PrivateRoute>
              <PrivateRoute path={"/holidays"} exact>
                <HolidaysPage />
              </PrivateRoute>
              <PrivateRoute path={"/mybookings"} exact>
                <MyBookingList />
              </PrivateRoute>
              <PrivateRoute path={"/profile"} exact>
                <ProfilePage />
              </PrivateRoute>
              <PrivateRoute path={"/children"} exact>
                <AddChildrenPage />
              </PrivateRoute>
              <Route path={"/"}>
                <LoginPage />
              </Route>
            </Switch>
            <BottomNav />
          </QueryClientProvider>
        </AuthProvider>
      </MaterialThemeProvider>
    </PrimerThemeProvider>
  );
}

export default App;
