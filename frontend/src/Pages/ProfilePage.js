import ProfileForm from "../forms/ProfileForm";
import useChildren from "../hooks/useChildren";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useUser from "../hooks/useUser";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Link } from "react-router-dom";
import { IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Child from "../components/Child";

const useStyles = makeStyles({
  root: {
    paddingTop: 10,
    display: "flex",
    flexFlow: "column nowrap",
    width: "100%",
    height: "100vh",
  },
  myprofile: {
    marginBottom: 10,
    marginLeft: 10,
  },
  addbutton: {
    width: "auto",
  },
  children: {
    marginLeft: 10,
  },
  child: {
    marginBottom: 10,
  },
  mychildren: {
    marginLeft: 10,
  },
  form: {
    marginLeft: 10,
    width: "100%",
  },
});

export default function ProfilePage() {
  const classes = useStyles();
  const { data: children } = useChildren();
  const { token } = useContext(AuthContext);
  const { data: user, isLoading, error } = useUser();

  if (isLoading) return "is loading ...";

  if (error) return "something went wrong";

  return (
    <section className={classes.root}>
      <Typography className={classes.myprofile} variant={"h5"}>
        Mein Profil
      </Typography>
      <ProfileForm token={token} user={user} className={classes.form} />
      {children && (
        <Typography className={classes.mychildren} variant={"h6"}>
          Kinder
        </Typography>
      )}
      {children &&
        children.map((child) => (
          <section className={classes.children}>
            <Child child={child} className={classes.child} />
          </section>
        ))}
      <IconButton
        className={classes.addbutton}
        variant="contained"
        color="primary"
        component={Link}
        to={"/children"}
        endIcon={<AddCircleOutlineIcon />}
      >
        <AddCircleIcon fontSize={"large"} />
      </IconButton>
    </section>
  );
}
