import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "column",
    border: "1px darkgrey solid",
    borderRadius: 5,
    width: "max-content",
    padding: 10,
    marginBottom: 10,
  },
});
export default function Child({ child }) {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Typography variant={"body1"}>
        {child?.firstName} {child?.lastName}
      </Typography>
      <Typography variant={"body2"}>{child?.schoolClass}</Typography>
      <Typography variant={"body2"}>{child?.notes}</Typography>
    </section>
  );
}
