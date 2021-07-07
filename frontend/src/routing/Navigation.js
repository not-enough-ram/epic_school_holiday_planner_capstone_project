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
import ProfileForm from "../Pages/ProfilePage";
import AddChildrenForm from "../forms/AddChildrenForm";
import ManagerHomePage from "../Pages/ManagerHomePage";
import BottomNav from "../components/BottomNav";
import NavHeader from "../components/NavHeader";
import AddHolidaysForm from "../forms/AddHolidaysForm";
import NewAppUserForm from "../forms/NewAppUserForm";
import AllUsersPage from "../Pages/AllUsersPage";

export default function Navigation() {
  const { jwtDecoded } = useContext(AuthContext);
  if (jwtDecoded) {
    console.log(jwtDecoded);
  }

  return (
    <div>
      <NavHeader />
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
        <PrivateRoute path={"/addnewholidays"} exact>
          {jwtDecoded && jwtDecoded.role === "ADMIN" && <AddHolidaysForm />}
        </PrivateRoute>
        <PrivateRoute path={"/addnewuser"} exact>
          {jwtDecoded && jwtDecoded.role === "ADMIN" && <NewAppUserForm />}
        </PrivateRoute>
        <PrivateRoute path={"/showusers"} exact>
          {jwtDecoded && jwtDecoded.role === "ADMIN" && <AllUsersPage />}
        </PrivateRoute>
        <PrivateRoute path={"/holidays"} exact>
          <HolidaysPage />
        </PrivateRoute>
        <PrivateRoute path={"/mybookings"} exact>
          {jwtDecoded && jwtDecoded.role === "USER" && <MyBookingList />}
        </PrivateRoute>
        <PrivateRoute path={"/profile"} exact>
          {jwtDecoded && jwtDecoded.role === "USER" && <ProfileForm />}
        </PrivateRoute>
        <PrivateRoute path={"/children"} exact>
          <AddChildrenForm />
        </PrivateRoute>
      </Switch>
      <BottomNav />
    </div>
  );
}
