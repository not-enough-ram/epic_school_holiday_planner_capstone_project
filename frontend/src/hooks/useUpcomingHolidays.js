import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useQuery } from "react-query";

export default function useUpcomingHolidays() {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getUpcomingHolidays = () => {
    return axios
      .get(`/api/holidays/upcoming`, config)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));
  };

  return useQuery("getUpcomingHolidays", () => getUpcomingHolidays());
}
