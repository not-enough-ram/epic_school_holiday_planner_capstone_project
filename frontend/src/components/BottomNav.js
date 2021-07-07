import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { grey } from "@material-ui/core/colors";
import { AccountCircle, AddCircle, Bookmarks } from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    borderTop: "1px solid " + grey[100],
    justifyContent: "space-around",
  },
});

export default function BottomNavi() {
  const { jwtDecoded } = useContext(AuthContext);
  const classes = useStyles();
  const [page, setPage] = useState("");
  const history = useHistory();

  const handleChange = (event, newPage) => {
    history.push(newPage);
    setPage(newPage);
  };

  return (
    <BottomNavigation
      value={page}
      onChange={handleChange}
      showLabels
      className={classes.root}
      color={"primary"}
    >
      {jwtDecoded && (
        <BottomNavigationAction
          value={"/home"}
          label="Home"
          icon={<HomeIcon />}
        />
      )}
      {jwtDecoded && jwtDecoded.role === "USER" && (
        <BottomNavigationAction
          value={"/holidaybooking"}
          label="Ferien buchen"
          icon={<AddCircle />}
        />
      )}
      {jwtDecoded && jwtDecoded.role === "ADMIN" && (
        <BottomNavigationAction
          value={"/addnewholidays"}
          label="Neue Ferien"
          icon={<AddCircle />}
        />
      )}
      {jwtDecoded && jwtDecoded.role === "USER" && (
        <BottomNavigationAction
          value={"/mybookings"}
          label="Gebuchte Ferien"
          icon={<Bookmarks />}
        />
      )}
      {jwtDecoded && jwtDecoded.role === "ADMIN" && (
        <BottomNavigationAction
          value={"/holidays"}
          label="Alle Ferien"
          icon={<Bookmarks />}
        />
      )}
      {jwtDecoded && jwtDecoded.role === "USER" && (
        <BottomNavigationAction
          value={"/profile"}
          label="Profil"
          icon={<AccountCircle />}
        />
      )}
      {jwtDecoded && jwtDecoded.role === "ADMIN" && (
        <BottomNavigationAction
          value={"/showusers"}
          label="Alle Nutzer"
          icon={<AccountCircle />}
        />
      )}
    </BottomNavigation>
  );
}
