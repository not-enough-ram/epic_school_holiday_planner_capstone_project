import useBookingByChild from "../hooks/useBookingByChild";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    width: "94%",
    height: "100vh",
  },
  childname: {
    fontWeight: "bold",
  },
  child: {
    border: "1px solid darkgrey",
    borderRadius: "5px",
    marginBottom: "10px",
    padding: "5px",
    marginRight: "15px",
    marginLeft: "15px",
    width: "inherit",
  },
  holidayName: {
    fontWeight: "bold",
  },
  dates: {
    display: "flex",
    flexFlow: "column",
  },
});

export default function MyBookingList() {
  const { data: bookingsByChild, error, isLoading } = useBookingByChild();
  const classes = useStyles();

  if (isLoading) return "loading ...";
  return (
    <section className={classes.root}>
      {!isLoading &&
        !error &&
        bookingsByChild.map((child) => (
          <div key={child.id} className={classes.child}>
            <Typography variant={"subtitle1"} className={classes.childname}>
              {child.childName}
            </Typography>
            <div className={classes.booking}>
              {child.booking.map((booking) => (
                <div key={booking.id}>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.holidayName}
                  >
                    {booking.holidayName}
                  </Typography>
                  <Typography variant={"body1"} className={classes.dates}>
                    <div>von {booking.startDate}</div>
                    <div>bis {booking.endDate}</div>
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ))}
    </section>
  );
}
