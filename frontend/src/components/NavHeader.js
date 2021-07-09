import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MainMenu from "./MainMenu";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    color: "primary",
    marginBottom: "10px",
  },
  toolbar: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-around",
    alignItems: "baseline",
    position: "relative",
  },
  title: {
    position: "absolute",
    top: 17,
    left: "32vw",
  },
  user: {
    marginRight: 10,
  },
});

export default function NavHeader() {
  const classes = useStyles();
  const { jwtDecoded } = useContext(AuthContext);

  return (
    <AppBar className={classes.root} color={"secondary"}>
      <Toolbar className={"toolbar"}>
        {jwtDecoded && <MainMenu />}
        <Typography variant="body1" className={classes.title}>
          Epic Holiday Planner
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
