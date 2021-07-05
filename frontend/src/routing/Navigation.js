import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../Pages/HomePage";
import DetailsPage from "../Pages/DetailsPage";
import BookingPage from "../Pages/BookingPage";
import HolidaysPage from "../Pages/HolidaysPage";
import MyBookingList from "../components/MyBookingList";
import ProfilePage from "../Pages/ProfilePage";
import AddChildrenPage from "../Pages/AddChildrenPage";
import ManagerHomePage from "../Pages/ManagerHomePage";

export default function Navigation() {
  const { jwtDecoded } = useContext(AuthContext);
  if (jwtDecoded) {
    console.log(jwtDecoded);
  }

  return (
    <Switch>
      <Route path={"/"} exact>
        <LoginPage />
      </Route>
      <PrivateRoute path={"/home"} exact>
        {jwtDecoded && jwtDecoded.role === "USER" && <HomePage />}
        {jwtDecoded && jwtDecoded.role === "ADMIN" && <ManagerHomePage />}
      </PrivateRoute>
      <PrivateRoute path={"/details/:name"} exact>
        <DetailsPage />
      </PrivateRoute>
      <PrivateRoute path={"/holidaybooking"} exact>
        {jwtDecoded && jwtDecoded.role === "USER" && <BookingPage />}
      </PrivateRoute>
      <PrivateRoute path={"/holidays"} exact>
        <HolidaysPage />
      </PrivateRoute>
      <PrivateRoute path={"/mybookings"} exact>
        {jwtDecoded && jwtDecoded.role === "USER" && <MyBookingList />}
      </PrivateRoute>
      <PrivateRoute path={"/profile"} exact>
        {jwtDecoded && jwtDecoded.role === "USER" && <ProfilePage />}
      </PrivateRoute>
      <PrivateRoute path={"/children"} exact>
        <AddChildrenPage />
      </PrivateRoute>
    </Switch>
  );
}
