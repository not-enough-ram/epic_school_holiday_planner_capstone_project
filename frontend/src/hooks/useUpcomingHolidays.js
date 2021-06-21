import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function useUpcomingHolidays() {
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(`/api/holidays/upcoming`, config)
      .then((response) => response.data)
      .then(setUpcomingHolidays)
      .catch((error) => console.error(error.message));
  }, [token]);

  return { upcomingHolidays };
}
