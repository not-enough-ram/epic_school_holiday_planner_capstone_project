import HolidayBookingForm from "../components/HolidayBookingForm";
import useHolidays from "../hooks/useHolidays";
import styled from "styled-components/macro";
import useChildren from "../hooks/useChildren";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    paddingTop: "15px",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    width: "100%",
    margin: "10px",
    height: "100vh",
  },
});

export default function BookingPage() {
  const classes = useStyles();
  const { holidays } = useHolidays();
  const { children } = useChildren();
  const { token } = useContext(AuthContext);
  return (
    <section className={classes.root}>
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

const Wrapper = styled.section`
  padding: 10px;
  text-align: left;
  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;
  margin: 10px;
  height: inherit;
`;
