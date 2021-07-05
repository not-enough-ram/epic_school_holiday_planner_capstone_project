import ProfileForm from "../components/ProfileForm";
import useChildren from "../hooks/useChildren";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useUser from "../hooks/useUser";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  mychildren: {
    marginLeft: 10,
  },
});

export default function ProfilePage() {
  const classes = useStyles();
  const { data: children, isLoading, error } = useChildren();
  const { token } = useContext(AuthContext);
  const { data: user } = useUser();

  return (
    <section className={classes.root}>
      <Typography className={classes.myprofile} variant={"h5"}>
        Mein Profil
      </Typography>
      {user && <ProfileForm token={token} user={user} />}
      {children && (
        <Typography className={classes.mychildren} variant={"h6"}>
          Kinder
        </Typography>
      )}
      {children &&
        children.map((child) => (
          <section className={classes.children}>
            <p>
              {child?.firstName} {child?.schoolClass}
            </p>
          </section>
        ))}
      <Button
        className={classes.addbutton}
        variant="contained"
        color="primary"
        component={Link}
        to={"/children"}
        endIcon={<AddCircleOutlineIcon />}
      >
        Kind hinzufügen
      </Button>
    </section>
  );
}
