import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Holidays from "../components/Holidays";
import useHolidays from "../hooks/useHolidays";

const useStyles = makeStyles({
  root: {
    padding: "10px",
    textAlign: "left",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    height: "100vh",
  },
  allholidays: {
    marginBottom: 10,
  },
});

export default function HolidaysPage() {
  const { data: holidays, isLoading, error } = useHolidays();
  const classes = useStyles();

  if (isLoading) return "is loading ...";
  if (error) return "Error";

  return (
    <section className={classes.root}>
      <Typography variant={"h5"} className={classes.allholidays}>
        Alle Ferien im Überblick
      </Typography>
      {holidays && (
        <section>
          {holidays.map((holidays) => (
            <Holidays key={holidays.name} holidays={holidays} />
          ))}
        </section>
      )}
    </section>
  );
}
