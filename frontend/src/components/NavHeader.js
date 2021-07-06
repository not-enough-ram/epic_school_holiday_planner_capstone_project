import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MainMenu from "./MainMenu";
import useUser from "../hooks/useUser";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    color: "primary",
  },
  toolbar: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  user: {},
  title: {
    paddingLeft: "8",
    paddingRight: "8",
  },
});

export default function NavHeader() {
  const classes = useStyles();
  const { jwtDecoded } = useContext(AuthContext);
  const { user } = useUser();

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        {jwtDecoded && <MainMenu />}
        <Typography variant="body1" className={classes.title}>
          Epic Holiday Planner
        </Typography>
        {jwtDecoded && (
          <Typography variant="body2" className={classes.user}>
            Willkommen {user?.firstName}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
