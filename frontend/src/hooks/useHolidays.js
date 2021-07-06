import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useQuery } from "react-query";

export default function useHolidays() {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getHolidays = () => {
    return axios
      .get(`/api/holidays`, config)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));
  };

  return useQuery("getHolidays", () => getHolidays());
}
