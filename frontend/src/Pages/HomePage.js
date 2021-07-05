import useUpcomingHolidays from "../hooks/useUpcomingHolidays";
import MyBookingList from "../components/MyBookingList";
import Holidays from "../components/Holidays";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    height: "100vh",
  },
  upcoming: {
    margin: "10px",
  },
  mybooking: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-around",
  },
  bookings: {
    marginTop: "10px",
  },
});

export default function HomePage() {
  const { data: upcomingHolidays, isLoading, error } = useUpcomingHolidays();
  const classes = useStyles();

  if (isLoading) return "is loading ...";
  if (error) return "Error";

  return (
    <section className={classes.root}>
      <section className={classes.upcoming}>
        <Typography variant={"h5"}>Die nächsten Ferien</Typography>
        {upcomingHolidays && <Holidays holidays={upcomingHolidays[0]} />}
      </section>
      <Divider variant={"middle"} className={classes.divider} />
      <section className={classes.mybooking}>
        <MyBookingList />
      </section>
    </section>
  );
}
