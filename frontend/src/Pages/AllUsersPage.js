import useAllAppUsers from "../hooks/useAllAppUsers";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    paddingTop: 10,
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "100vh",
    textAlign: "left",
  },
  user: {
    marginLeft: 10,
  },
});

export default function AllUsersPage() {
  const classes = useStyles();
  const { data: appUsers, isLoading, error } = useAllAppUsers();
  if (isLoading) return "is loading ...";
  if (error) return "something went wrong";
  return (
    <section className={classes.root}>
      {appUsers &&
        appUsers.map((user) => (
          <section key={user?.username} className={classes.user}>
            <Typography>Login: {user?.username}</Typography>
            <Typography>Rolle: {user?.role}</Typography>
            <span>- - - -</span>
          </section>
        ))}
    </section>
  );
}
