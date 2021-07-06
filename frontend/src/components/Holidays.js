import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    border: "1px darkgrey solid",
    borderRadius: 5,
    textAlign: "left",
    display: "flex",
    flexFlow: "column",
    padding: 5,
    marginBottom: 10,
  },
  holidayName: {
    fontWeight: "bold",
  },
});
export default function Holidays({ holidays }) {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Typography variant={"subtitle1"} className={classes.holidayName}>
        {holidays?.name}
      </Typography>
      <Typography variant={"body1"}>Beginnen: {holidays?.startDate}</Typography>
      <Typography variant={"body1"}>Enden: {holidays?.endDate}</Typography>
    </section>
  );
}
