import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { useMutation } from "react-query";
import axios from "axios";

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

export default function Child({ child, token }) {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const mutation = useMutation(() =>
    axios
      .delete(
        `/api/user/children`,
        {
          firstName: child.firstName,
        },
        config
      )
      .catch((error) => console.error(error.message))
  );
  const handleClick = () => mutation.mutate;
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Typography variant={"body1"}>
        {child?.firstName} {child?.lastName}
      </Typography>
      <Typography variant={"body2"}>{child?.schoolClass}</Typography>
      <Typography variant={"body2"}>{child?.notes}</Typography>
      <IconButton
        className={classes.delete}
        variant="contained"
        color="primary"
        onClick={handleClick}
        icon={<RemoveCircleIcon />}
      />
    </section>
  );
}
