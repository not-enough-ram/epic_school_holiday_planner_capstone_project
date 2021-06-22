import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { grey } from "@material-ui/core/colors";
import { AccountCircle, AddCircle, Bookmarks } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

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
      <BottomNavigationAction
        value={"/booking"}
        label="Ferien buchen"
        icon={<AddCircle />}
      />
      <BottomNavigationAction label="Gebuchte Ferien" icon={<Bookmarks />} />
      <BottomNavigationAction label="Account" icon={<AccountCircle />} />
    </BottomNavigation>
  );
}
