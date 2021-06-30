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
    alignContent: "space-between",
  },
  user: {
    position: "sticky",
    right: 10,
    top: 10,
  },
  title: {
    position: "relative",
  },
});

export default function NavHeader() {
  const classes = useStyles();
  const { jwtDecoded } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color={"primary"}>
        <Toolbar>
          {jwtDecoded && <MainMenu />}
          <Typography variant="body1" className={classes.title}>
            Epic Holiday Planner
          </Typography>
          {jwtDecoded && (
            <Typography variant="body2" className={classes.user}>
              Willkommen {jwtDecoded?.sub}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
    // <Header className={classes.root}>
    //   <Header.Item>{jwtDecoded && <MainMenu />}</Header.Item>
    //   <Header.Item full>Epic Holiday Planner</Header.Item>
    //   {jwtDecoded && (
    //     <Header.Item mr={0}>Willkommen {jwtDecoded.sub}</Header.Item>
    //   )}
    // </Header>
  );
}
