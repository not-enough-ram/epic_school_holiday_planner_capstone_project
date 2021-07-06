import HolidayBookingForm from "../components/HolidayBookingForm";
import useHolidays from "../hooks/useHolidays";
import useChildren from "../hooks/useChildren";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

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
  mybookings: {
    textAlign: "left",
    marginBottom: 10,
    justifySelf: "flex-start",
    marginLeft: 10,
  },
});

export default function BookingPage() {
  const classes = useStyles();
  const { data: holidays, isLoading, error } = useHolidays();
  const { data: children } = useChildren();
  const { token } = useContext(AuthContext);
  return (
    <section className={classes.root}>
      <Typography className={classes.mybookings} variant={"h5"}>
        Ferien buchen
      </Typography>
      {holidays && (
        <HolidayBookingForm
          holidays={holidays}
          children={children}
          token={token}
        />
      )}
    </section>
  );
}
