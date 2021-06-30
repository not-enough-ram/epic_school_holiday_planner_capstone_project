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
    position: "sticky",
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
    >
      {jwtDecoded && (
        <BottomNavigationAction
          value={"/home"}
          label="Home"
          icon={<HomeIcon />}
        />
      )}
      {jwtDecoded && (
        <BottomNavigationAction
          value={"/booking"}
          label="Ferien buchen"
          icon={<AddCircle />}
        />
      )}
      {jwtDecoded && (
        <BottomNavigationAction
          value={"/booked"}
          label="Gebuchte Ferien"
          icon={<Bookmarks />}
        />
      )}
      {jwtDecoded && (
        <BottomNavigationAction
          value={"/profile"}
          label="Profil"
          icon={<AccountCircle />}
        />
      )}
    </BottomNavigation>
  );
}
