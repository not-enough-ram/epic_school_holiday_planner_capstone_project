import useUpcomingHolidays from "../hooks/useUpcomingHolidays";
import Holidays from "../components/Holidays";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ChildrenByHolidayList from "../components/ChildrenByHolidayList";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    height: "100vh",
    padding: 10,
  },
  mybooking: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-around",
  },
  bookings: {
    marginTop: "10px",
  },
  attendingchildren: {
    display: "flex",
    flexWrap: "wrap",
  },
});

export default function ManagerHomePage() {
  const { data: upcomingHolidays, isLoading, error } = useUpcomingHolidays();
  const classes = useStyles();

  if (isLoading) return "is loading ...";
  if (error) return "something went wrong";
  return (
    <section className={classes.root}>
      <Typography variant={"h5"}>Die nächsten Ferien</Typography>
      {upcomingHolidays && <Holidays holidays={upcomingHolidays[0]} />}
      <Typography variant={"h6"}>Teilnehmende Kinder</Typography>
      <section className={classes.attendingchildren}>
        {upcomingHolidays && (
          <ChildrenByHolidayList upcomingHolidays={upcomingHolidays[0]?.name} />
        )}
      </section>
    </section>
  );
}
