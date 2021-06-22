import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { grey } from "@material-ui/core/colors";
import { AccountCircle, AddCircle, Bookmarks } from "@material-ui/icons";

const useStyles = makeStyles({
  BottomNavigation: {
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
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Ferien buchen" icon={<AddCircle />} />
      <BottomNavigationAction label="Gebuchte Ferien" icon={<Bookmarks />} />
      <BottomNavigationAction label="Account" icon={<AccountCircle />} />
    </BottomNavigation>
  );
}
